import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db as firestoreDb } from "@/lib/firebase";
import { ALL_QUESTIONS } from "@/lib/allQuestions";

// Helper to minify question data for the prompt
const minifyQuestions = (questions: any[]) => {
    return questions.map(q => ({
        id: q.id,
        t: q.title,         // title
        d: q.difficulty,    // difficulty
        tags: q.logicTags,  // tags
        cat: q.category     // category
    }));
};

const SYSTEM_PROMPT = `
You are the "AlgoSensei Intelligent Curriculum Engine."
Goal: Analyze the student's recent performance and select the single most effective next question.

[CURRICULUM ARCHITECTURE & EVOLUTIONARY TREES]
Use this map to guide "Smooth Transitions" and logical progression.

🌳 Tree 1: The Linear Solver (Arrays/Hashing)
Evolution: Iteration -> Pointers -> Windows -> Hashing
- Branch A (Two Pointers): Runnning Sum -> Two Sum II -> Remove Duplicates -> Container With Most Water -> 3Sum -> Trapping Rain Water
- Branch B (Sliding Window): Max Average Subarray -> Longest Substring No Repeats -> Max Consecutive Ones III -> Permutation in String -> Min Window Substring
- Branch C (Hashing): Two Sum -> Valid Anagram -> Group Anagrams -> Top K Frequent -> Longest Consecutive Sequence

🌳 Tree 2: The Structural Linker (Linked Lists)
Evolution: Memory Pointers -> LIFO/FIFO
- Branch A (Runner/Slow-Fast): Cycle -> Middle Node -> Cycle II -> Remove Nth Node -> Intersection
- Branch B (Manipulation): Reverse List -> Palindrome List -> Reorder List -> Reverse K-Group
- Branch C (Monotonic Stack): Next Greater Element I -> Daily Temperatures -> Largest Rectangle in Histogram

🌳 Tree 3: The Recursive Branch (Trees/Backtracking)
Evolution: DFS -> Backtracking
- Branch A (Tree Walker): Max Depth -> Invert Tree -> Same Tree -> Subtree of Another Tree -> LCA
- Branch B (BST Properties): Validate BST -> Kth Smallest -> Delete Node
- Branch C (Backtracking): Subsets -> Permutations -> Combination Sum -> Word Search -> N-Queens

🌳 Tree 4: The Graph Explorer
Evolution: Matrix -> Adjacency List -> Topology
- Branch A (Grid/Matrix): Flood Fill -> Number of Islands -> Max Area of Island -> Rotting Oranges
- Branch B (Explicit Graphs): Clone Graph -> Course Schedule I & II -> Word Ladder

🌳 Tree 5: The Optimizer (DP/Greedy)
Evolution: Memoization -> 1D Table -> 2D Table
- Branch A (1D DP): Climbing Stairs -> House Robber I & II -> Coin Change -> Word Break -> LIS
- Branch B (2D DP): Unique Paths -> Min Path Sum -> LCS -> Edit Distance

[DECISION LOGIC]

Scenario A: The "Speedrunner" (Solved Quickly & Optimal)
- Observation: User solved Easy/Medium in < 5 mins (300s) with Success.
- Action: Advance the "Evolution". Move to the next node in the current Branch (e.g., Two Sum -> Two Sum II).
- Reason: "You mastered [Current Concept]. Let's evolve to the next stage: [Next Concept]."

Scenario B: The "Struggler" (Failed, Struggled, or Stuck)
- Observation: User result is 'failed', 'struggled', or time > 20 mins.
- Action: DYNAMIC ADAPTATION (Reset Momentum).
  1. DO NOT simply repeat the same difficulty.
  2. Drop difficulty to 'Easy' if possible, or find a simpler logic variation in the same Tree.
  3. Give them "Space to Restart" - recommend a confidence-building question.
- Reason: "That was a tough one. Let's step back and build momentum with a foundational problem: [Question Name]."

Scenario C: The "Explorer" (Boredom Check)
- Observation: User has solved 5+ questions of the same Topic/Branch in a row.
- Action: Lateral Shift. Jump to a PARALLEL Branch in the SAME Tree, or a NEW Tree entirely.
- Reason: "You've done a lot of [Current Branch]. Let's try applying this logic to [New Branch]."

Output Format (JSON ONLY):
{
  "questionId": "string",
  "actionType": "speedrun" | "remedial" | "lateral" | "next_step",
  "trigger": "string (The specific observation that caused this, e.g. 'Solved < 5m', 'Failed 2x')",
  "logic": "string (The algorithmic rule applied, e.g. 'Vertical Progression', 'Backtracking to Simpler Node')",
  "treeContext": "string (The Tree and Branch name, e.g. 'Tree 1: Linear Solver > Branch A: Two Pointers')",
  "reasoning": "string (A human-readable summary)"
}
`;

export async function POST(req: Request) {
    const groq = getGroqClient();
    try {
        const { userId, currentQuestionId, result, timeTaken } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // 1. Fetch User Profile
        const userRef = doc(firestoreDb, "users", userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data() || {};

        const solvedIds = new Set(userData.solvedQuestionIds || []);

        // --- COLD START / DASHBOARD TRIGGER HANDLER ---
        // If request lacks context (e.g. from Dashboard button), infer from history
        let effectiveResult = result;
        let effectiveTime = timeTaken;
        let effectiveCurrentId = currentQuestionId;

        if (!effectiveResult && userData.solvedHistory && userData.solvedHistory.length > 0) {
            // Get most recent
            const sorted = [...userData.solvedHistory].sort((a: any, b: any) => b.completedAt - a.completedAt);
            const last = sorted[0];
            effectiveCurrentId = last.id;
            effectiveResult = "success"; // Assume success if in solvedHistory
            effectiveTime = last.timeTaken || 300; // Default if missing
        } else if (!effectiveResult) {
            // Brand new user
            effectiveResult = "neutral";
            effectiveTime = 0;
            effectiveCurrentId = "intro";
        }

        // 2. Filter Candidates (Skill Tree Logic acts as a Hard Filter first)
        const unsolvedQuestions = ALL_QUESTIONS.filter(q => !solvedIds.has(q.id));

        // Remove Locked Questions (Prerequisites not met)
        const availableCandidates = unsolvedQuestions.filter(q => {
            if (!q.prerequisites || q.prerequisites.length === 0) return true;
            return q.prerequisites.every(id => solvedIds.has(id));
        });

        if (availableCandidates.length === 0) {
            return NextResponse.json({ message: "All available questions solved!", questionId: null });
        }

        // 3. Prepare AI Context
        const currentQuestion = ALL_QUESTIONS.find(q => q.id === effectiveCurrentId);
        const minifiedCandidates = minifyQuestions(availableCandidates);

        const prompt = `
[STUDENT STATUS]
Just Finished: ${currentQuestion ? currentQuestion.title : "None (Startup)"} (ID: ${effectiveCurrentId})
Result: ${effectiveResult}
Time Taken: ${effectiveTime} seconds
Topic: ${currentQuestion ? currentQuestion.category : "N/A"}
Known Topics: ${JSON.stringify(userData.knownTopics || [])}

[CANDIDATE POOL]
${JSON.stringify(minifiedCandidates)}

[INSTRUCTION]
Select the best next question based on the logical scenarios. Return JSON only.
`;

        console.log("🧠 Navigator AI: Thinking...", { result: effectiveResult, timeTaken: effectiveTime, candidates: minifiedCandidates.length });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            response_format: { type: "json_object" }
        });

        const decisionJson = completion.choices[0]?.message?.content;
        if (!decisionJson) throw new Error("Empty AI Response");

        const decision = JSON.parse(decisionJson);
        console.log("🧠 Decision:", decision);

        // Update User's Recommended State
        await updateDoc(userRef, {
            recommendedNextQuestion: {
                id: decision.questionId,
                reason: decision.reasoning,
                timestamp: Date.now(),
                strategy: decision.actionType,
                trigger: decision.trigger,
                logic: decision.logic,
                treeContext: decision.treeContext
            }
        });

        return NextResponse.json(decision);

    } catch (error: any) {
        console.error("Navigator Recommend Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

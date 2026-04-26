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

const NAVIGATOR_SYSTEM_PROMPT = `
You are the AlgoSensei Curriculum Director.
Goal: Select the ONE best question for the student to solve next.

Input Data:
1. Student's "Known Topics" (topics they are comfortable with).
2. "Unsolved Candidates" (list of available questions).
3. "Recent Solved" (what they just finished).

Rules for Selection:
1. **Reinforce Weakness:** If they recently failed or struggled (not passed in MVP yet, but assume standard progression), pick a similar tag.
2. **Progress Logic:** If they are solid on a Level 1 topic, introduce a Level 2 topic (Example: Arrays -> Two Pointers).
3. **New Concept Rule:** If the best question requires a tag NOT in "Known Topics", you MUST set "isNewConcept" to true.
4. **Difficulty Flow:** Prefer Easy -> Medium -> Hard. Do not jump to Hard unless they have solved multiple Mediums in that category.

Output Format (JSON ONLY):
{
  "questionId": "string (id from candidate list)",
  "reason": "string (1 sentence explaining why)",
  "isNewConcept": boolean,
  "conceptBrief": "string (If isNewConcept is true, explain the concept in 2 sentences. Else null)"
}
`;

export async function POST(req: Request) {
    const groq = getGroqClient();
    try {
        const { uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // 1. Fetch User Profile
        // Note: In a real app, verify Auth Token.
        const userRef = doc(firestoreDb, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        const userData = userSnap.data();
        const solvedIds = new Set(userData.solvedQuestionIds || []);
        const knownTopics = userData.knownTopics || [];

        // 2. Filter Candidates & Apply Skill Tree Logic
        const unsolvedQuestions = ALL_QUESTIONS.filter(q => !solvedIds.has(q.id));

        if (unsolvedQuestions.length === 0) {
            return NextResponse.json({ message: "All questions solved!" });
        }

        // --- SKILL TREE: PREREQUISITE CHECK ---
        const availableCandidates = unsolvedQuestions.filter(q => {
            if (!q.prerequisites || q.prerequisites.length === 0) return true; // No prereqs -> Available
            // Check if ALL prereqs are solved
            return q.prerequisites.every(id => solvedIds.has(id));
        });

        // If strict path locks everything (edge case), fall back to all unsolved (or smallest prereq count)
        // But normally there's always something available (Easy ones).
        const candidatePool = availableCandidates.length > 0 ? availableCandidates : unsolvedQuestions;

        // --- SKILL TREE: DIRECT BRIDGE CHECK ---
        // Find the most recently solved question to see if it triggers a chain
        let lastSolvedId: string | null = null;
        if (userData.solvedHistory && userData.solvedHistory.length > 0) {
            // Sort to find latest
            const sortedHistory = [...userData.solvedHistory].sort((a: any, b: any) => b.completedAt - a.completedAt);
            lastSolvedId = sortedHistory[0].id;
        } else if (userData.solvedQuestionIds && userData.solvedQuestionIds.length > 0) {
            // Fallback for legacy data: pick random or last in array
            lastSolvedId = userData.solvedQuestionIds[userData.solvedQuestionIds.length - 1];
        }

        if (lastSolvedId) {
            const lastQuestion = ALL_QUESTIONS.find(q => q.id === lastSolvedId);
            if (lastQuestion && lastQuestion.nextQuestionId) {
                const nextId = lastQuestion.nextQuestionId;
                // Verify the user hasn't already solved it AND it's not locked (shouldn't be if it's a direct link, but safe to check)
                // Actually, if it's a direct link, we usually assume it IS the next step, but let's ensure it's in the candidate pool.
                const directNext = candidatePool.find(q => q.id === nextId);

                if (directNext) {
                    console.log(`🧭 Navigator: Direct Bridge Activated [${lastSolvedId} -> ${nextId}]`);
                    const decision = {
                        questionId: nextId,
                        reason: `Recommended next step after solving ${lastQuestion.title}.`,
                        isNewConcept: false, // Usually bridges extend the concept
                        conceptBrief: null
                    };
                    // Cache & Return
                    await updateDoc(userRef, {
                        recommendedNextQuestion: { ...decision, timestamp: Date.now() }
                    });
                    return NextResponse.json(decision);
                }
            }
        }

        // Optimization: Minify for AI
        const minifiedCandidates = minifyQuestions(candidatePool);

        // 3. Call Groq
        const prompt = `
[STUDENT PROFILE]
Known Topics: ${JSON.stringify(knownTopics)}
Solved Count: ${solvedIds.size}

[CANDIDATE QUESTIONS]
${JSON.stringify(minifiedCandidates)}

[INSTRUCTION]
Select the best next question based on the rules. Return JSON only.
`;

        console.log("🧭 Navigator: Asking Groq to pick from " + minifiedCandidates.length + " candidates...");

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: NAVIGATOR_SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3, // Low temp for logical decision
            response_format: { type: "json_object" }
        });

        const decisionJson = completion.choices[0]?.message?.content;

        if (!decisionJson) throw new Error("Empty response from Navigator AI");

        const decision = JSON.parse(decisionJson);
        console.log("🧭 Decision:", decision);

        // Optimization: Cache recommendation for "Navigator HQ" Banner
        if (decision.questionId) {
            await updateDoc(userRef, {
                recommendedNextQuestion: {
                    id: decision.questionId,
                    reason: decision.reason,
                    isNewConcept: decision.isNewConcept,
                    timestamp: Date.now()
                }
            });
        }

        return NextResponse.json(decision);

    } catch (error: any) {
        console.error("Navigator API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

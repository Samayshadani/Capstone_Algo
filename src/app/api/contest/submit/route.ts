import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc, arrayUnion, increment } from 'firebase/firestore';
import { formatCodeForExecution } from '@/lib/codeRunner';
import { getXPForDifficulty } from '@/lib/gamification';

const LANGUAGES = {
    javascript: { language: "javascript", version: "20.11.1" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
};

export async function POST(req: Request) {
    try {
        const { contestId, uid, questionId, language, code } = await req.json();

        if (!contestId || !uid || !questionId || !language || !code) {
            return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
        }

        // 1. Fetch Contest
        const contestRef = doc(db, "contests", contestId);
        const contestSnap = await getDoc(contestRef);
        if (!contestSnap.exists() || contestSnap.data().status !== "active") {
            return NextResponse.json({ success: false, error: "Contest is not active." }, { status: 403 });
        }
        const contest = contestSnap.data();

        // 2. Fetch Registration
        const regId = `${uid}_${contestId}`;
        const regRef = doc(db, "contestRegistrations", regId);
        let regSnap = await getDoc(regRef);
        
        if (!regSnap.exists()) {
            // First time submitting for this contest
            await setDoc(regRef, {
                id: regId,
                userId: uid,
                contestId: contestId,
                score: 0,
                penalties: 0,
                submissions: {}
            });
            regSnap = await getDoc(regRef); // Reload
        }
        
        const registration = regSnap!.data();
        if (registration?.submissions?.[questionId]?.status === "solved") {
            return NextResponse.json({ success: false, error: "You have already solved this problem in this contest." }, { status: 400 });
        }

        // 3. Fetch Question details securely on the backend
        const questionRef = doc(db, "questions", questionId);
        const questionSnap = await getDoc(questionRef);
        if (!questionSnap.exists()) {
             return NextResponse.json({ success: false, error: "Question not found." }, { status: 404 });
        }
        const question = questionSnap.data();
        const testCases = question.testCases || [];

        // 4. Execute Code against all test cases securely
        let allPassed = true;
        let failedReason = "";
        
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const executableCode = formatCodeForExecution(language, code, testCase.input);

            const payload = {
                language: LANGUAGES[language as keyof typeof LANGUAGES].language,
                version: LANGUAGES[language as keyof typeof LANGUAGES].version,
                files: [{ name: language === 'java' ? 'Main.java' : (language === 'python' ? 'main.py' : 'script.js'), content: executableCode }],
                stdin: typeof testCase.input === 'object' ? JSON.stringify(testCase.input) : String(testCase.input),
            };

            const response = await fetch("http://localhost:2000/api/v2/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            // Run error
            if (data.run && data.run.stderr) {
                allPassed = false;
                failedReason = testCase.isHidden ? "Failed on a hidden test case (Runtime Error)." : `Runtime Error on Test Case ${i + 1}:\n${data.run.stderr}`;
                break;
            }

            // Output mismatch
            if (data.run) {
                const actualRaw = data.run.stdout.trim();
                const expectedRaw = testCase.expectedOutput.trim();

                const checkOutputMatch = (act: string, exp: string) => {
                     // Basic trim comparison, ideally use the robust comparison from frontend
                     const norm = (s: string) => s.replace(/[\s"']/g, "");
                     return norm(act) === norm(exp);
                };

                if (!checkOutputMatch(actualRaw, expectedRaw)) {
                    allPassed = false;
                    failedReason = testCase.isHidden 
                        ? `Failed on hidden test case ${i + 1}.` 
                        : `Wrong Answer on Test Case ${i + 1}.\nExpected: ${expectedRaw}\nActual: ${actualRaw}`;
                    break;
                }
            } else {
                allPassed = false;
                failedReason = "Execution failed entirely.";
                break;
            }
        }

        // 5. Update Registration State based on Pass/Fail
        if (!allPassed) {
            await updateDoc(regRef, {
                penalties: increment(1),
                [`submissions.${questionId}.penaltyCount`]: increment(1)
            });
            return NextResponse.json({ success: false, error: failedReason });
        }

        // 6. User PASSED! Calculate score
        const basePoints = getXPForDifficulty(question.difficulty) * 10; // Contests give massive points
        const penaltyDeduction = (registration?.submissions?.[questionId]?.penaltyCount || 0) * 10; // 10 point reduction per wrong submit
        const finalScore = Math.max(10, basePoints - penaltyDeduction); // Minimum 10 points

        await updateDoc(regRef, {
             score: increment(finalScore),
             [`submissions.${questionId}.status`]: "solved",
             [`submissions.${questionId}.pointsEarned`]: finalScore
        });

        // Optional: Update global user XP as well
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
             xp: increment(finalScore)
        });

        return NextResponse.json({ success: true, message: "All test cases passed! Points awarded.", points: finalScore });

    } catch (error: any) {
        console.error("Contest submit error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

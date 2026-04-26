import { NextResponse } from 'next/server';
import { ALL_QUESTIONS } from '@/lib/allQuestions';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: questionId } = await params;
        
        if (!questionId) {
            return NextResponse.json({ error: "Missing question ID" }, { status: 400 });
        }

        const question = ALL_QUESTIONS.find(q => q.id === questionId);

        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        // Deep copy to avoid mutating the source
        const safeQuestion = JSON.parse(JSON.stringify(question));

        // Security check: Remove hidden test cases so they don't leak to the browser
        if (safeQuestion.testCases && Array.isArray(safeQuestion.testCases)) {
            safeQuestion.testCases = safeQuestion.testCases.filter((tc: any) => !tc.isHidden);
        }

        return NextResponse.json({ success: true, question: safeQuestion });

    } catch (error: any) {
        console.error("Error fetching secure question:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

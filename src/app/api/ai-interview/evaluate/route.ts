import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";

export interface QuestionAnswer {
    id: number;
    difficulty: string;
    question: string;
    answer: string;
}

export async function POST(req: Request) {
    const groq = getGroqClient();

    try {
        const { qa, keywords }: { qa: QuestionAnswer[]; keywords: string } = await req.json();

        if (!qa || qa.length === 0) {
            return NextResponse.json({ error: "No answers provided." }, { status: 400 });
        }

        const qaTranscript = qa.map((item, i) =>
            `Q${i + 1} [${item.difficulty}]: ${item.question}\nCandidate Answer: ${item.answer || "(No answer provided)"}`
        ).join("\n\n");

        const evaluation = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a senior technical hiring manager. Evaluate the candidate's performance in this structured interview.
Provide a professional, constructive, and specific evaluation.
Return ONLY a raw JSON object with NO markdown, NO code fences, NO explanation.
FORMAT:
{
  "overallScore": <number 0-100>,
  "verdict": "Strong Hire" | "Hire" | "Maybe" | "No Hire",
  "verdictJustification": "<1-2 sentence summary>",
  "answers": [
    {
      "id": <question id>,
      "score": <number 0-10>,
      "feedback": "<specific, constructive feedback referencing what they said>",
      "modelAnswer": "<brief ideal answer outline>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>", "<area 3>"]
}`
                },
                {
                    role: "user",
                    content: `Candidate Profile Keywords: ${keywords}\n\nInterview Transcript:\n${qaTranscript}\n\nEvaluate this candidate's performance objectively.`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            max_tokens: 2000
        });

        let result: any = null;

        try {
            const raw = evaluation.choices[0]?.message?.content || "{}";
            const start = raw.indexOf("{");
            const end = raw.lastIndexOf("}");
            if (start !== -1 && end > start) {
                result = JSON.parse(raw.slice(start, end + 1));
            }
        } catch {
            return NextResponse.json({ error: "Evaluation parsing failed. Please try again." }, { status: 500 });
        }

        if (!result) {
            return NextResponse.json({ error: "Empty evaluation response." }, { status: 500 });
        }

        return NextResponse.json({ evaluation: result });

    } catch (error: any) {
        console.error("AI Interview Evaluate Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

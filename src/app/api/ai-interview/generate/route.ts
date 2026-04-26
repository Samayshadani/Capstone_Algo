import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";

export async function POST(req: Request) {
    const groq = getGroqClient();

    try {
        const { resumeText } = await req.json();

        if (!resumeText || resumeText.trim().length < 50) {
            return NextResponse.json({ error: "Resume text is too short." }, { status: 400 });
        }

        // Step 1: Extract keywords
        const keywordCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a technical resume parser. Extract key skills, job roles, and technical expertise from the resume.
Return ONLY a raw JSON object with no markdown, no code fences, no explanation. Format:
{"skills": ["skill1", "skill2"], "roles": ["role1"], "expertise": ["area1", "area2"]}`
                },
                {
                    role: "user",
                    content: `Parse this resume and extract key technical skills, job roles, and areas of expertise:\n\n${resumeText.slice(0, 4000)}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 500
        });

        let keywords: { skills: string[]; roles: string[]; expertise: string[] } = {
            skills: [],
            roles: [],
            expertise: []
        };

        try {
            const rawKw = keywordCompletion.choices[0]?.message?.content || "{}";
            const start = rawKw.indexOf("{");
            const end = rawKw.lastIndexOf("}");
            if (start !== -1 && end > start) {
                keywords = JSON.parse(rawKw.slice(start, end + 1));
            }
        } catch {
            // fallback: use first 200 chars of resume as context
        }

        const keywordSummary = [
            ...(keywords.skills || []),
            ...(keywords.roles || []),
            ...(keywords.expertise || [])
        ].join(", ") || resumeText.slice(0, 300);

        // Step 2: Generate 5 interview questions
        const questionCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional senior technical interviewer. Generate exactly 5 interview questions tailored to the candidate's background.
RULES:
- 2 Easy questions (foundational concepts)
- 2 Medium questions (applied problem-solving)
- 1 Hard question (system design or advanced concept)
- Questions must be directly relevant to the skills/roles extracted
- Return ONLY a raw JSON object, no markdown, no code fences, no explanation
FORMAT: {"questions": [{"id": 1, "difficulty": "Easy", "text": "..."}, ...]}`
                },
                {
                    role: "user",
                    content: `Based on this candidate profile: ${keywordSummary}\n\nGenerate 5 interview questions (2 Easy, 2 Medium, 1 Hard).`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1000
        });

        let questions: { id: number; difficulty: string; text: string }[] = [];

        try {
            const rawQ = questionCompletion.choices[0]?.message?.content || "{}";
            const start = rawQ.indexOf("{");
            const end = rawQ.lastIndexOf("}");
            if (start !== -1 && end > start) {
                const parsed = JSON.parse(rawQ.slice(start, end + 1));
                questions = parsed.questions || [];
            }
        } catch {
            questions = [];
        }

        // Validate we have 5 questions
        if (questions.length !== 5) {
            return NextResponse.json({ error: "Question generation failed. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ keywords, questions });

    } catch (error: any) {
        console.error("AI Interview Generate Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

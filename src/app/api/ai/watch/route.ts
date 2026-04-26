import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";

const WATCH_SYSTEM_PROMPT = `
You are "Sensei Watch", a background AI observer.
Your Goal: Protect the student from bad practices without being annoying.
Analyze the code for CRITICAL issues only. 
Ignore small syntax errors (the compiler handles that).

Triggers for Warning:
1. **Time Complexity Disaster**: Nested loops O(n^3) or infinite loops.
2. **Security Risk**: Raw SQL injection type patterns (unlikely in algos, but good practice), or usage of \`eval()\`.
3. **Anti-Pattern**: Hardcoding test cases explicitly instead of solving the logic (e.g. \`if (input == 5) return 25\`).

Output JSON ONLY:
{
  "warning": "Short 1-sentence warning string" | null
}
If no issues, return: { "warning": null }
Make the warning sound like a wise mentor whispering.
`;

export async function POST(req: Request) {
    const groq = getGroqClient();
    try {
        const { code, language, questionTitle } = await req.json();

        // Skip short code
        if (!code || code.length < 50) {
            return NextResponse.json({ warning: null });
        }

        const prompt = `
Question: ${questionTitle}
Language: ${language}
Code:
\`\`\`
${code}
\`\`\`
`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: WATCH_SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            response_format: { type: "json_object" },
            max_tokens: 100
        });

        const result = completion.choices[0]?.message?.content;
        if (!result) return NextResponse.json({ warning: null });

        return NextResponse.json(JSON.parse(result));

    } catch (error: any) {
        console.error("Sensei Watch API Error:", error);
        return NextResponse.json({ warning: null }); // Fail silently
    }
}

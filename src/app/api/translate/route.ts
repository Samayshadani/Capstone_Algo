import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";

export async function POST(req: Request) {
    let groq;
    try {
        groq = getGroqClient();
    } catch (e) {
        return NextResponse.json({ error: "Groq API Key missing" }, { status: 500 });
    }

    try {
        const { sourceCode, sourceLang, targetLang, includeComments } = await req.json();

        if (!sourceCode || !targetLang) {
            return NextResponse.json({ error: "Missing code or target language" }, { status: 400 });
        }

        const systemPrompt = `
You are an expert Code Translator. 
Task: Convert the provided code${sourceLang ? ` from ${sourceLang}` : ''} into ${targetLang}.

**Strict Rules:**
1. Maintain exact logic and variable naming where possible.
2. **Output ONLY code.** Do not wrap in markdown blocks (no \`\`\`). Do not add conversational text. Just the raw code string.
3. ${includeComments
                ? "Add concise comments above complex lines explaining the syntax difference (e.g., '// In Java, use ArrayList')."
                : "Provide clean, production-ready code with no extra comments."}
`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: sourceCode }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2, // Low temp for precision
            max_tokens: 2048
        });

        const translatedCode = completion.choices[0]?.message?.content || "";

        // Cleanup: Sometimes models still add backticks despite instructions
        const cleanCode = translatedCode.replace(/^```[a-z]*\n/i, '').replace(/```$/, '');

        return NextResponse.json({ translatedCode: cleanCode });

    } catch (error: any) {
        console.error("Translation API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

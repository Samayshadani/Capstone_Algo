import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";

// The "Brain" - AlgoSensei v2.2 (Ultra-Minimalist)
// FIXED: Removed complex quoting in examples to prevent build errors.
const SYSTEM_PROMPT = `
You are **AlgoSensei**.
Your Goal: Guide the user efficiently.

### CRITICAL RULES:
1.  **LENGTH LIMIT**: Total response MUST be between 3 and 15 lines.
2.  **OFFSET**: Ignore line numbers > 50 (system wrapper).
3.  **NO YAPPING**: Do not lecture. Be direct and helpful.
4.  **SNIPPETS**: 1-3 line code patterns are highly encouraged.
5.  **VISUALS**: If explaining a structure (Tree, Graph, Linked List) or Flow, YOU MUST use a Mermaid diagram in a \`mermaid\` code block.
    - ALWAYS use \`graph TD\` or \`graph LR\`.
    - ALWAYS quote node labels: \`A["Start"]\`.
    - ALWAYS use \` -- "Text" --> \` for edge labels.
    - NEVER leave dangling edges.

### MERMAID EXAMPLES:
- **Flowchart**: \`graph TD; A["Start"] --> B{"Is Valid?"}; B -- "Yes" --> C["Run"]; B -- "No" --> D["Error"];\`
- **Linked List**: \`graph LR; A(("1")) --> B(("2")) --> C(("3")) --> null["null"];\`
- **Tree**: \`graph TD; A(("Root")) --> B(("L")); A --> C(("R"));\`

### RESPONSE TEMPLATES:

#### Scenario A (Error) or B (Logic)
**Observation**
{Explain the issue in 1-2 clear sentences.}

**Guidance**
{Give the specific fix. You CAN use code snippets.}
{Example: "Check for empty input: \`if (str.length == 0) return 0;\`"}

#### Scenario C (Success)
**Result**
Correct solution.

**Optimization**
{Brief challenging question or code pattern to optimize complexity.}
`;

export async function POST(req: Request) {
    let groq;
    try {
        groq = getGroqClient();
    } catch (e) {
        return NextResponse.json({ text: "System Error: Missing GROQ_API_KEY in .env.local" });
    }

    try {
        const { history, message, context } = await req.json();

        // 1. Construct Prompt Context
        let promptContext = "";

        // Check if this is an automated run result (Ghost Trigger)
        if (context?.executionResult) {
            promptContext = `
[System Log: Output="${context.executionResult.stdout || ''}", Error="${context.executionResult.stderr || ''}", Code="${context.code || ''}"]
Problem Context: ${context.questionTitle}
User Question: ${message || "Analyze this execution result."}
`;
        } else if (context) {
            // Standard Chat Context
            promptContext = `
[STUDENT CONTEXT]
Problem: ${context.questionTitle}
Current Code:
\`\`\`${context.language || 'text'}
${context.code}
\`\`\`
[/STUDENT CONTEXT]
User Question: ${message}
`;
        } else {
            promptContext = `User Question: ${message}`;
        }

        // 2. Prepare Messages for Groq (OpenAI Compatible)
        // Convert Gemini History (parts) to Groq History (content)
        const groqHistory = (history || []).map((msg: any) => ({
            role: msg.role === "model" ? "assistant" : "user",
            content: msg.parts?.[0]?.text || msg.content || ""
        }));

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...groqHistory,
            { role: "user", content: promptContext }
        ];

        // 3. Call Groq Llama 3
        console.log("🚀 Sending request to Groq (Llama3-8b)...");

        const completion = await groq.chat.completions.create({
            messages: messages as any,
            model: "llama-3.3-70b-versatile", // Latest Stable Llama 3.3
            temperature: 0.5, // Slightly lowered for more precision/mentor-like tone
            max_tokens: 1024,
            stream: false
        });

        const reply = completion.choices[0]?.message?.content || "";

        if (reply) {
            console.log("✅ Groq Response Received");
            return NextResponse.json({ text: reply });
        } else {
            throw new Error("Empty response from Groq");
        }

    } catch (error: any) {
        console.error("Groq API Error:", error);
        return NextResponse.json({ text: `System Error: ${error.message}` });
    }
}

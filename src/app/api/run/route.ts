import { NextResponse } from "next/server";

// Piston API Version Configuration
const LANGUAGES = {
    javascript: { language: "javascript", version: "20.11.1" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
};

export async function POST(request: Request) {
    try {
        const { language, code, input } = await request.json();

        // Validate Language
        const langConfig = LANGUAGES[language as keyof typeof LANGUAGES];
        if (!langConfig) {
            return NextResponse.json(
                { error: "Unsupported Language" },
                { status: 400 }
            );
        }

        // Construct Piston Payload
        const payload = {
            language: langConfig.language,
            version: langConfig.version,
            files: [
                {
                    name: language === 'java' ? 'Main.java' : (language === 'python' ? 'main.py' : 'script.js'),
                    content: code,
                },
            ],
            stdin: input || "",
        };

        // Call Piston API
        const response = await fetch("http://localhost:2000/api/v2/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Execution Error:", error);
        return NextResponse.json(
            { error: "Failed to execute code" },
            { status: 500 }
        );
    }
}

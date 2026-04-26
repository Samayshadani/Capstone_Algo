import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }

        const isPDF =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPDF) {
            return NextResponse.json(
                { error: "Only PDF files are supported by this endpoint." },
                { status: 400 }
            );
        }

        // Convert browser File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // pdf-parse v1 style
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require("pdf-parse/lib/pdf-parse.js");
        const data = await pdfParse(buffer);

        const text: string = data.text || "";

        if (text.trim().length < 30) {
            return NextResponse.json(
                {
                    error:
                        "Could not extract readable text from this PDF. It may be image-based (scanned). Please copy-paste your resume text instead.",
                },
                { status: 422 }
            );
        }

        return NextResponse.json({ text: text.trim() });
    } catch (error: any) {
        console.error("[parse-pdf] Error:", error?.message ?? error);
        return NextResponse.json(
            {
                error: "Failed to parse the PDF. Please try pasting your resume text directly. Debug info: " + (error?.message || String(error)),
            },
            { status: 500 }
        );
    }
}
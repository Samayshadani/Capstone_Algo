import { NextResponse } from "next/server";
import { seedQuestions } from "@/lib/seed";

export async function GET() {
    try {
        await seedQuestions();
        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

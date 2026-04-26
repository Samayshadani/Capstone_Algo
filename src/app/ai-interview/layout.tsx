import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Interview Practice | AlgoSensei",
    description: "Upload your resume and practice a personalized AI-driven technical interview. Get scored, get feedback, get hired.",
};

export default function AIInterviewLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

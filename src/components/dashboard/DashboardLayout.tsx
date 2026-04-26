"use client";

import { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import MobileNav from "./MobileNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [particles, setParticles] = useState<number[]>([]);

    useEffect(() => {
        setParticles([...Array(20)].map((_, i) => i));
    }, []);

    return (
        <div className="min-h-screen bg-transparent relative flex flex-col">
            <div className="aurora-bg fixed inset-0 z-0" />

            {/* Floating Particles */}
            <div className="particles-container fixed inset-0 z-0 pointer-events-none">
                {particles.map((i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                    />
                ))}
            </div>

            {/* Top Navigation */}
            <TopNavbar />

            {/* Main Content Area */}
            <main className="flex-1 w-full relative z-10">
                <div className="w-full pb-24 md:pb-12">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation (Optional, keeping for mobile fallback) */}
            <div className="md:hidden">
                <MobileNav />
            </div>
        </div>
    );
}

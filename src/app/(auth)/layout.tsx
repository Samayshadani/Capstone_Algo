"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";
import MatrixRain from "@/components/ui/MatrixRain"; // Import the new component

const SLIDES = [
    {
        image: "/auth/logic.png",
        title: "Capturing Logic,",
        highlight: "Building Future.",
        desc: "Join the platform designed to master algorithms through intelligent navigation and execution."
    },
    {
        image: "/auth/analytics.png",
        title: "Visualize Progress,",
        highlight: "Master Data.",
        desc: "Track your growth with advanced analytics and real-time performance metrics."
    },
    {
        image: "/auth/mastery.png",
        title: "Achievement Unlocked,",
        highlight: "Limitless Potential.",
        desc: "Reach new heights in your coding journey and showcase your mastery to the world."
    }
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Dynamic Matrix Rain Background */}
            <MatrixRain />

            {/* Background ambient glow (subtle) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            {/* Main Card Container */}
            {/* Removed main background to allow individual panel styling. kept border/shadow */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-transparent border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 transition-all duration-500">

                {/* Left Panel: Dynamic Carousel - Increased opacity for readability */}
                <div className="relative hidden md:flex flex-col justify-between p-12 bg-slate-900/80 backdrop-blur-xl overflow-hidden">

                    {/* Background Images with Fade Transition */}
                    {SLIDES.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover opacity-60 mix-blend-overlay"
                                priority={index === 0}
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                        </div>
                    ))}

                    {/* Persistent Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10"></div>

                    {/* Branding (Fixed) */}
                    <div className="relative z-20">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10">
                                <Code2 size={28} className="text-white" />
                            </div>
                            <span className="font-outfit font-extrabold text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                AlgoSensei
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Text Content */}
                    <div className="relative z-20 space-y-6 min-h-[180px]">
                        {SLIDES.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute bottom-0 left-0 right-0 transition-all duration-700 transform ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <h2 className="text-4xl font-bold text-white leading-tight font-outfit">
                                    {slide.title} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                        {slide.highlight}
                                    </span>
                                </h2>
                                <p className="text-slate-400 text-lg font-light leading-relaxed mt-4">
                                    {slide.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Slide Indicators */}
                    <div className="relative z-20 flex gap-2 mt-8">
                        {SLIDES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-blue-500" : "w-1.5 bg-slate-600 hover:bg-slate-500"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Panel: Dynamic Form Content - CRYSTAL GLASS */}
                {/* Low blur (backdrop-blur-sm) and low opacity (bg-slate-950/20) to see the Matrix Rain clearly */}
                <div className="p-8 md:p-12 bg-slate-950/20 backdrop-blur-sm flex flex-col justify-center min-h-[600px] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.2)]">
                    {children}
                </div>
            </div>
        </div>
    );
}

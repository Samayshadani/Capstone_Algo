"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import MatrixRain from "@/components/ui/MatrixRain"

export default function DashboardBranding() {
    return (
        <div className="w-full flex justify-center mb-0 relative z-50">
            {/* --- MATRIX RAIN BACKGROUND --- */}
            {/* Natively full width due to layout changes. */}
            {/* Starts at top-[-140px] to tuck behind the absolute TopNavbar (adjusted for pt-32) */}
            <div className="absolute inset-x-0 top-[-140px] bottom-[-100px] z-0 pointer-events-none overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
                }}>
                <MatrixRain className="absolute inset-0 w-full h-full opacity-20" color="#4ADE80" speed={75} />
            </div>

            <motion.div
                // ENTRANCE ANIMATION: Slide down from above
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1.2
                }}
                // HOVER EFFECTS: Zoom and Bloom
                whileHover={{ scale: 1.05 }}
                className="group relative flex flex-col md:flex-row items-center gap-0 md:gap-2 cursor-pointer transition-all duration-500 transform md:-translate-x-4 z-10 mb-16 md:mb-24"
            >
                {/* --- ICON: NEON CYBER-SENSEI MASCOT --- */}
                <motion.div
                    className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Breathing Glow Layer (Back) */}
                    <motion.div
                        className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.95, 1.05, 0.95]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Generated Mascot Image with Radial Mask & Screen Blend */}
                    <motion.div
                        className="relative w-full h-full mix-blend-screen"
                        style={{
                            maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
                        }}
                    >
                        <Image
                            src="/algo-logo.png"
                            alt="AlgoSensei Mascot"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* --- TEXT: ALGOSENSEI --- */}
                <div className="relative flex flex-col justify-center h-full pt-4 text-center md:text-left">

                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-black tracking-[0.05em] text-white font-mono uppercase relative z-10 transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(74,222,128,0.8)]"
                            style={{
                                textShadow: "0 0 25px rgba(var(--primary-rgb), 0.6)", // Constant Shadow
                            }}
                        >
                            ALGO<span className="text-white">SENSEI</span>
                        </h1>

                        {/* Soft Bloom Halo (Overlay) - Smoothly fades in on hover */}
                        <div className="absolute inset-0 text-primary blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none mix-blend-screen" aria-hidden="true">
                            <h1 className="text-5xl md:text-7xl font-black tracking-[0.05em] font-mono uppercase">
                                ALGOSENSEI
                            </h1>
                        </div>
                    </div>

                    {/* Tagline / Punchline - NEON GREEN */}
                    <motion.div
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 1, x: 2 }}
                        className="text-[#4ADE80] font-mono text-xs md:text-sm tracking-[0.3em] uppercase mt-2 pl-1 font-bold"
                        style={{ textShadow: "0 0 10px rgba(74, 222, 128, 0.4)" }}
                    >
                        Master the Code // Conquer the Interview
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

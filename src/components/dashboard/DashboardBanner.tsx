"use client"

import { useState, useEffect } from "react"

import { motion } from "framer-motion"
import { Trophy, Zap, Target, Sliders, Activity } from "lucide-react"
import { calculateLevel, getRankTitle, XP_REWARDS } from "@/lib/gamification"

interface DashboardBannerProps {
    xp: number
    level: number
    solved: number
    totalQuestions: number
}

export default function DashboardBanner({ xp, level, solved, totalQuestions }: DashboardBannerProps) {
    // Calculate Stats
    const { nextLevelXP, currentLevelXP, progressPercent } = calculateLevel(xp);
    const rankTitle = getRankTitle(level);

    // Calculate 10x10 grid illumination (ratio-based)
    const ratio = totalQuestions > 0 ? solved / totalQuestions : 0;
    const litCells = Math.floor(ratio * 100);

    const [randomRanks, setRandomRanks] = useState<number[]>([]);

    useEffect(() => {
        // Generate stable random ranks for grid cells [0..99]
        const ranks = Array.from({ length: 100 }, (_, i) => i);
        // Fisher-Yates shuffle
        for (let i = ranks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ranks[i], ranks[j]] = [ranks[j], ranks[i]];
        }
        setRandomRanks(ranks);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full rounded-3xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-visible group select-none"
        >
            {/* WRAPPER FOR CLIPPED BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
                {/* --- CHASSIS DECORATIONS --- */}

                {/* Active Circuitry Animation */}
                <div className="absolute top-10 inset-x-0 bottom-0 z-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M10 10 h80 v80 h-80 z" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                                <path d="M20 20 h60 v60 h-60 z" fill="none" />
                            </pattern>
                        </defs>
                        {/* Moving Data Packets - High Density */}
                        <rect x="0" y="15%" width="40" height="2" fill="var(--primary)" opacity="0.5">
                            <animate attributeName="x" from="-50" to="100%" dur="3s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="25%" width="20" height="2" fill="var(--chart-2)" opacity="0.5">
                            <animate attributeName="x" from="-50" to="100%" dur="5s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="35%" width="60" height="1" fill="var(--chart-3)" opacity="0.6">
                            <animate attributeName="x" from="100%" to="-50" dur="7s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="55%" width="90" height="2" fill="white" opacity="0.2">
                            <animate attributeName="x" from="-100" to="100%" dur="8s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="65%" width="30" height="2" fill="var(--primary)" opacity="0.4">
                            <animate attributeName="x" from="100%" to="-50" dur="4s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="75%" width="50" height="1" fill="var(--chart-2)" opacity="0.5">
                            <animate attributeName="x" from="-50" to="100%" dur="6s" repeatCount="indefinite" />
                        </rect>
                        <rect x="0" y="85%" width="25" height="2" fill="var(--chart-3)" opacity="0.5">
                            <animate attributeName="x" from="-50" to="100%" dur="4.5s" repeatCount="indefinite" />
                        </rect>
                    </svg>
                </div>

                {/* Top Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Command Center</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> ONLINE</span>
                        <span className="opacity-20">|</span>
                        <span className="flex items-center gap-1.5"><Sliders className="w-3 h-3" /> V.2.1</span>
                    </div>
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-3xl z-20" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white/10 rounded-tr-3xl z-20" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white/10 rounded-bl-3xl z-20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-3xl z-20" />

                {/* Side Accents */}
                <div className="absolute top-1/2 left-0 w-1 h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-1 h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-1/2" />

                {/* Background Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative pt-16 pb-8 px-8 flex flex-col md:flex-row items-center justify-between gap-12 z-10">

                {/* LEFT: RANK BADGE */}
                <div className="flex items-center gap-6 w-full md:w-1/3 justify-start">
                    <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-[var(--chart-4)]/30 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                        <div className="absolute inset-2 border border-[var(--chart-4)]/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div
                            className="absolute inset-4 bg-[var(--chart-4)]/10 border border-[var(--chart-4)] flex items-center justify-center shadow-[0_0_30px_var(--chart-4)]"
                            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        >
                            <Trophy className="w-8 h-8 text-[var(--chart-4)] drop-shadow-[0_0_10px_var(--chart-4)]" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--chart-4)] font-bold mb-1">Rank</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white font-mono tracking-tighter">LVL.{level}</span>
                        </div>
                    </div>
                </div>

                {/* CENTER: XP FLUX REACTOR (Larger) */}
                <div className="flex-1 w-full flex items-center justify-center relative group/xp">
                    <div className="relative flex items-center gap-6 scale-125 md:scale-150 cursor-help">
                        {/* Connecting beams */}
                        <div className="absolute top-1/2 left-[-80px] right-[-80px] h-px bg-gradient-to-r from-transparent via-[var(--chart-2)]/30 to-transparent hidden md:block" />

                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 border border-[var(--chart-2)]/30 rounded-full animate-[spin_8s_linear_infinite] border-t-transparent border-l-transparent" />
                            <div className="absolute inset-4 border-2 border-[var(--chart-2)]/50 rounded-full animate-[spin_4s_linear_infinite_reverse] border-b-transparent border-r-transparent" />
                            <div className="absolute inset-8 bg-[var(--chart-2)]/10 rounded-full blur-xl animate-pulse" />
                            <div className="relative z-10 text-center flex flex-col items-center justify-center bg-black/90 rounded-full w-20 h-20 backdrop-blur-md border border-[var(--chart-2)]/40 shadow-[0_0_30px_var(--chart-2)]">
                                <Zap className="w-5 h-5 text-[var(--chart-2)] mb-1 fill-current" />
                                <span className="text-xl font-bold font-mono text-white leading-none tracking-tighter">{xp}</span>
                                <span className="text-[7px] uppercase tracking-widest text-[var(--chart-2)] mt-0.5 font-bold">Total XP</span>
                            </div>
                        </div>
                    </div>

                    {/* HOVER INFO CARD */}
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-black/90 border border-[var(--chart-2)]/30 rounded-xl p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] opacity-0 group-hover/xp:opacity-100 transition-opacity pointer-events-none group-hover/xp:pointer-events-auto z-50">
                        <div className="text-center mb-3">
                            <div className="text-[var(--chart-2)] font-bold uppercase tracking-widest text-xs mb-1">{rankTitle}</div>
                            <div className="text-white font-mono text-lg font-bold">Level {level}</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-mono">
                                <span>Progress</span>
                                <span>{Math.round(currentLevelXP)} / {nextLevelXP} XP</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--chart-2)]" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>

                        {/* XP Info */}
                        <div className="text-[10px] space-y-2 border-t border-white/10 pt-3">
                            <div className="text-muted-foreground uppercase tracking-wider font-bold mb-1">XP Rewards</div>
                            <div className="flex justify-between text-white/70">
                                <span>Easy</span> <span className="text-emerald-400">+{XP_REWARDS.Easy}</span>
                            </div>
                            <div className="flex justify-between text-white/70">
                                <span>Medium</span> <span className="text-amber-400">+{XP_REWARDS.Medium}</span>
                            </div>
                            <div className="flex justify-between text-white/70">
                                <span>Hard</span> <span className="text-rose-400">+{XP_REWARDS.Hard}</span>
                            </div>
                            <div className="mt-2 text-[9px] text-white/30 italic leading-tight">
                                *Level cap increases by 20XP every 5 levels.
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SOLVED DATA HIVE */}
                <div className="flex items-center gap-6 w-full md:w-1/3 justify-end">
                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--chart-3)] font-bold mb-1 block">Solved</span>
                        <span className="text-4xl font-black text-white font-mono tracking-tighter block">{solved}</span>
                        <span className="text-[9px] text-muted-foreground mt-1 block">Solve more to illuminate more</span>
                    </div>

                    <div className="relative w-[104px] h-[104px] flex-shrink-0 bg-[var(--chart-3)]/20 rounded-lg border border-[var(--chart-3)]/30 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="grid grid-cols-10 grid-rows-10 gap-[2px] w-full h-full">
                            {[...Array(100)].map((_, i) => {
                                // Fallback to index if shuffle not ready (SSR/hydrating)
                                const rank = randomRanks[i] ?? i;
                                const isLit = rank < litCells;
                                return (
                                    <div
                                        key={i}
                                        className={`rounded-[1px] transition-all duration-500`}
                                        style={{
                                            backgroundColor: isLit ? 'var(--chart-3)' : '#000000',
                                            opacity: isLit ? 1 : 0.4,
                                            boxShadow: isLit ? '0 0 4px var(--chart-3)' : 'none'
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <Target className="absolute -bottom-2 -right-2 w-6 h-6 text-[var(--chart-3)] opacity-50" />
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

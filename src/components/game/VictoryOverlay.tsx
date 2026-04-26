"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { Home, Trophy, Activity, Scan, Cpu, List, AlertTriangle, FileOutput, CheckCircle2 } from "lucide-react";
import { calculateLevel } from "@/lib/gamification";

interface VictoryOverlayProps {
    show: boolean;
    questionTitle: string;
    xpEarned: number;
    currentXP: number;
    onClose?: () => void;
    userId: string;
    topicId?: string;
    elapsedTime?: number; // Time in seconds
}

export default function VictoryOverlay({
    show,
    questionTitle,
    xpEarned,
    currentXP,
    onClose,
    userId,
    topicId,
    elapsedTime
}: VictoryOverlayProps) {
    const router = useRouter();
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(false);
    const [navLoading, setNavLoading] = useState(false);

    // New Concept State
    const [briefing, setBriefing] = useState<{ id: string; text: string; title: string } | null>(null);

    // Calculate New Stats
    // We treat 'currentXP' as the state BEFORE the earn, or explicitly as the accumulation base.
    // For visual clarity, we'll calculate level based on (current + earned) to show the "future" state.
    const { currentLevel, nextLevelXP, currentLevelXP, progressPercent } = calculateLevel(currentXP + xpEarned);

    // Initialize window size
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Trigger confetti
    useEffect(() => {
        if (show) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 4s
            return () => clearTimeout(timer);
        }
    }, [show]);

    const handleNextChallenge = async () => {
        setNavLoading(true);
        try {
            // Call Smart Navigator AI
            const res = await fetch("/api/navigator", { // Ensure endpoint matches route.ts location
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: userId })
            });

            if (!res.ok) throw new Error("Navigation System Offline");

            const decision = await res.json();

            // Check for New Concept Intercept
            if (decision.questionId) {
                if (decision.isNewConcept && decision.conceptBrief) {
                    // Show Briefing
                    setBriefing({
                        id: decision.questionId,
                        text: decision.conceptBrief,
                        title: "New Paradigm Detected"
                    });
                } else {
                    // Direct Route
                    router.push(`/practice/${decision.questionId}`);
                }
            } else {
                router.push("/dashboard");
            }

        } catch (error) {
            router.push("/dashboard");
        } finally {
            setNavLoading(false);
        }
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center font-mono">
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* CONFETTI (Only on Victory Screen, not Briefing) */}
                    {showConfetti && !briefing && (
                        <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
                            <Confetti
                                width={windowSize.width}
                                height={windowSize.height}
                                numberOfPieces={150}
                                recycle={true}
                                colors={['#06b6d4', '#10b981', '#3b82f6']} // Cyan, Emerald, Blue
                            />
                        </div>
                    )}

                    {/* MODE SWITCHER: VICTORY OR BRIEFING */}
                    {briefing ? (
                        // --- BRIEFING MODE ---
                        <motion.div
                            key="briefing"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative z-20 w-full max-w-2xl mx-4"
                        >
                            <div className="bg-[#1a1100]/95 border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.2)]">
                                {/* Header */}
                                <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                                <div className="p-8 md:p-12 space-y-8 relative">
                                    {/* Background Grid */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                    <div className="flex items-start gap-6 relative z-10">
                                        <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 animate-pulse">
                                            <AlertTriangle className="w-10 h-10 text-amber-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                                                <span className="text-amber-500">New Concept</span> Discovered
                                            </h2>
                                            <div className="text-amber-500/60 text-xs font-mono uppercase tracking-widest">
                                                // Automatic Curriculum Intervention
                                            </div>
                                        </div>
                                    </div>

                                    {/* The Brief */}
                                    <div className="bg-black/40 border border-amber-500/20 rounded-xl p-6 font-mono text-amber-100/80 leading-relaxed relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
                                        <div className="flex gap-4">
                                            <FileOutput className="w-5 h-5 text-amber-500/50 flex-shrink-0 mt-1" />
                                            <div>
                                                {briefing.text}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <button
                                        onClick={() => router.push(`/practice/${briefing.id}`)}
                                        className="w-full group relative py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest rounded-xl transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <span>Acknowledge & Engage Protocol</span>
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // --- VICTORY MODE (Original) ---
                        <motion.div
                            key="victory"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="relative z-10 w-full max-w-lg mx-4"
                        >
                            {/* HOLOGRAPHIC CONTAINER */}
                            <div className="relative bg-black/80 border border-cyan-500/30 rounded-3xl p-1 overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">

                                {/* SCANNING LINE ANIMATION */}
                                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
                                    <motion.div
                                        className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee]"
                                        animate={{ top: ["0%", "100%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#06b6d405_2px)] bg-[size:100%_4px]" />
                                </div>

                                <div className="relative bg-[#0b1221]/90 rounded-[20px] p-8 md:p-10 border border-white/5 flex flex-col items-center text-center space-y-8">

                                    {/* HEADER ICON */}
                                    <div className="relative">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-4 border border-cyan-500/30 rounded-full border-dashed"
                                        />
                                        <motion.div
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-2 border border-blue-500/20 rounded-full"
                                        />
                                        <div className="relative w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                            <Trophy className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <div className="space-y-2">
                                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                            <span className="text-cyan-400">Mission</span> Complete
                                        </h2>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs tracking-wider uppercase">
                                            <Scan size={12} />
                                            <span>{questionTitle}</span>
                                        </div>
                                    </div>

                                    {/* XP STATS GRID */}
                                    <div className="grid grid-cols-3 gap-4 w-full">
                                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                                            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">XP Gained</div>
                                            <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">+{xpEarned}</div>
                                        </div>
                                        {elapsedTime !== undefined && (
                                            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Time Taken</div>
                                                <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                                    {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                                                </div>
                                            </div>
                                        )}
                                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                                            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current Level</div>
                                            <div className="text-3xl font-bold text-white">LVL.{currentLevel}</div>
                                        </div>
                                    </div>

                                    {/* LEVEL PROGRESS */}
                                    <div className="w-full space-y-2">
                                        <div className="flex justify-between text-[10px] text-cyan-200/60 uppercase tracking-wider">
                                            <span>Progress to Lvl {currentLevel + 1}</span>
                                            <span>{Math.round(currentLevelXP)} / {nextLevelXP} XP</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                            />
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex flex-col gap-3 w-full pt-2">
                                        {/* ADAPTIVE BUTTON */}
                                        <button
                                            onClick={handleNextChallenge}
                                            disabled={navLoading}
                                            className="group relative w-full h-14 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-300 uppercase font-bold tracking-widest text-sm rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] disabled:opacity-50 disabled:cursor-wait"
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center gap-3 relative z-10 group-hover:scale-105 transition-transform">
                                                {navLoading ? <Activity className="animate-spin" /> : <Cpu />}
                                                <span>Initialize Adaptive Sequence</span>
                                            </div>
                                            {/* Hover Glare */}
                                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 group-hover:animate-shine" />
                                        </button>

                                        {/* DASHBOARD BUTTON */}
                                        <div className="flex gap-2 w-full">
                                            {topicId && (
                                                <button
                                                    onClick={() => router.push(`/dashboard/topic/${topicId}`)}
                                                    className="flex-1 h-12 flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-xs uppercase tracking-widest transition-colors font-medium border border-white/5"
                                                >
                                                    <List size={14} />
                                                    <span>List</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => router.push("/dashboard")}
                                                className="flex-[2] h-12 flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-xs uppercase tracking-widest transition-colors font-medium border border-white/5"
                                            >
                                                <Home size={14} />
                                                <span>Return to Command</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
}

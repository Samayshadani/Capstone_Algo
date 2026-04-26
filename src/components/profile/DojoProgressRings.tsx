"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export interface DifficultyStats {
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
}

/* ─── Rank Tier Logic ─── */
function getRank(total: number): { title: string; color: string; glow: string } {
    if (total >= 200) return { title: "GRANDMASTER", color: "#f43f5e", glow: "rgba(244,63,94,0.4)" };
    if (total >= 120) return { title: "MASTER", color: "#a855f7", glow: "rgba(168,85,247,0.4)" };
    if (total >= 60) return { title: "EXPERT", color: "#facc15", glow: "rgba(250,204,21,0.4)" };
    if (total >= 25) return { title: "ADEPT", color: "#60a5fa", glow: "rgba(96,165,250,0.4)" };
    return { title: "INITIATE", color: "#94a3b8", glow: "rgba(148,163,184,0.3)" };
}

/* ─── Single Ring ─── */
function ProgressRing({
    radius,
    stroke,
    progress,
    color,
    trailColor = "rgba(255,255,255,0.04)",
    delay = 0,
}: {
    radius: number;
    stroke: number;
    progress: number;
    color: string;
    trailColor?: string;
    delay?: number;
}) {
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <g>
            {/* Trail */}
            <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="none"
                stroke={trailColor}
                strokeWidth={stroke}
                strokeLinecap="round"
            />
            {/* Progress Arc */}
            <motion.circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (clampedProgress / 100) * circumference }}
                transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    transformOrigin: `${radius}px ${radius}px`,
                    transform: "rotate(-90deg)",
                    filter: `drop-shadow(0 0 6px ${color}66)`,
                }}
            />
        </g>
    );
}

/* ─── Legend Dot ─── */
function LegendItem({ color, label, solved, total }: { color: string; label: string; solved: number; total: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}66` }} />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                {label}
            </span>
            <span className="text-[10px] font-mono text-white/80 ml-auto tabular-nums">
                {solved}/{total}
            </span>
        </div>
    );
}

/* ─── Main Export ─── */
export default function DojoProgressRings({ difficultyStats }: { difficultyStats?: DifficultyStats }) {
    const stats = difficultyStats || {
        easy: { solved: 15, total: 50 },
        medium: { solved: 8, total: 40 },
        hard: { solved: 3, total: 30 },
    };

    const totalSolved = stats.easy.solved + stats.medium.solved + stats.hard.solved;
    const rank = getRank(totalSolved);

    const easyPct = stats.easy.total > 0 ? (stats.easy.solved / stats.easy.total) * 100 : 0;
    const medPct = stats.medium.total > 0 ? (stats.medium.solved / stats.medium.total) * 100 : 0;
    const hardPct = stats.hard.total > 0 ? (stats.hard.solved / stats.hard.total) * 100 : 0;

    // Ring dimensions (outer → inner)
    const viewBox = 200;
    const outerR = 90, outerStroke = 10;
    const midR = 72, midStroke = 10;
    const innerR = 54, innerStroke = 10;
    const offsetX = viewBox / 2 - outerR;
    const offsetY = viewBox / 2 - outerR;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-2xl p-6 overflow-hidden"
        >
            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${rank.glow}, transparent 70%)`, filter: "blur(40px)", opacity: 0.3 }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-lg border border-white/[0.06]" style={{ background: `${rank.color}10` }}>
                    <Shield className="w-4 h-4" style={{ color: rank.color }} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 font-semibold">
                    Difficulty Progress
                </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Rings SVG */}
                <div className="relative w-[200px] h-[200px] shrink-0">
                    <svg viewBox={`0 0 ${viewBox} ${viewBox}`} className="w-full h-full">
                        {/* Outer: Easy (green) */}
                        <g transform={`translate(${offsetX}, ${offsetY})`}>
                            <ProgressRing radius={outerR} stroke={outerStroke} progress={easyPct} color="#4ade80" delay={0.1} />
                        </g>
                        {/* Middle: Medium (amber) */}
                        <g transform={`translate(${viewBox / 2 - midR}, ${viewBox / 2 - midR})`}>
                            <ProgressRing radius={midR} stroke={midStroke} progress={medPct} color="#fbbf24" delay={0.3} />
                        </g>
                        {/* Inner: Hard (rose) */}
                        <g transform={`translate(${viewBox / 2 - innerR}, ${viewBox / 2 - innerR})`}>
                            <ProgressRing radius={innerR} stroke={innerStroke} progress={hardPct} color="#f43f5e" delay={0.5} />
                        </g>
                    </svg>

                    {/* Center Rank Badge */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-3xl font-black font-mono text-white tabular-nums">{totalSolved}</span>
                        <span
                            className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] mt-0.5"
                            style={{ color: rank.color }}
                        >
                            {rank.title}
                        </span>
                    </motion.div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3 flex-1 w-full">
                    <LegendItem color="#4ade80" label="Easy" solved={stats.easy.solved} total={stats.easy.total} />
                    <LegendItem color="#fbbf24" label="Medium" solved={stats.medium.solved} total={stats.medium.total} />
                    <LegendItem color="#f43f5e" label="Hard" solved={stats.hard.solved} total={stats.hard.total} />

                    <div className="mt-2 pt-3 border-t border-white/[0.06]">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Total</span>
                            <span className="text-sm font-mono font-bold text-white tabular-nums">
                                {totalSolved}/{stats.easy.total + stats.medium.total + stats.hard.total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

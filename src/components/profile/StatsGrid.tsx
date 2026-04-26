"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Target, Percent, TrendingUp } from "lucide-react";

export interface UserStats {
    rank: number | string;
    solved: number;
    streak: number;
    level: string;
    acceptanceRate?: number;
    percentile?: number;
    easyCount?: number;
    mediumCount?: number;
    hardCount?: number;
    lastRankUpdate?: number;
}

/* ─── Animated Counter ─── */
function AnimatedValue({ value, suffix = "" }: { value: string | number; suffix?: string }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
        >
            {value}{suffix}
        </motion.span>
    );
}

/* ─── Single Bento Card ─── */
function BentoCard({
    label,
    value,
    icon: Icon,
    accentFrom,
    accentTo,
    glowColor,
    delay,
    children,
    className = "",
}: {
    label: string;
    value: string | number;
    icon: any;
    accentFrom: string;
    accentTo: string;
    glowColor: string;
    delay: number;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl ${className}`}
        >
            {/* Ambient glow on hover */}
            <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
            />

            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                {/* Icon + Label */}
                <div className="flex items-center gap-2 mb-3">
                    <div
                        className="p-2 rounded-lg border border-white/[0.06]"
                        style={{ background: `linear-gradient(135deg, ${accentFrom}15, ${accentTo}08)` }}
                    >
                        <Icon className="w-4 h-4" style={{ color: accentFrom }} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 font-semibold">
                        {label}
                    </span>
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-black font-mono text-white tracking-tight leading-none group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500"
                    style={{
                        // @ts-ignore
                        "--tw-gradient-from": accentFrom,
                        "--tw-gradient-to": accentTo,
                    } as React.CSSProperties}
                >
                    <span className="group-hover:bg-gradient-to-r group-hover:from-[var(--tw-gradient-from)] group-hover:to-[var(--tw-gradient-to)] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        <AnimatedValue value={value} />
                    </span>
                </div>

                {children}
            </div>
        </motion.div>
    );
}

/* ─── Streak Fire Animation ─── */
function StreakFire({ active }: { active: boolean }) {
    if (!active) return null;
    return (
        <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
        >
            <div className="relative">
                <motion.div
                    className="w-8 h-10 rounded-full"
                    style={{
                        background: "radial-gradient(ellipse at bottom, #f59e0b 0%, #ef4444 40%, transparent 70%)",
                        filter: "blur(6px)",
                    }}
                    animate={{ scaleY: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}

/* ─── Main Export ─── */
export default function StatsGrid({ stats }: { stats?: UserStats }) {
    const displayStats = {
        rank: stats?.rank || "N/A",
        solved: stats?.solved || 0,
        streak: stats?.streak || 0,
        level: stats?.level || process.env.NEXT_PUBLIC_APP_VERSION || "v1.0.0",
        acceptanceRate: stats?.acceptanceRate ?? 84,
        percentile: stats?.percentile ?? 12,
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {/* Rank */}
            <BentoCard
                label="Global Rank"
                value={`#${displayStats.rank.toLocaleString()}`}
                icon={Trophy}
                accentFrom="#facc15"
                accentTo="#f59e0b"
                glowColor="#facc15"
                delay={0.05}
            />

            {/* Problems Solved */}
            <BentoCard
                label="Problems Solved"
                value={displayStats.solved}
                icon={Target}
                accentFrom="#60a5fa"
                accentTo="#3b82f6"
                glowColor="#3b82f6"
                delay={0.12}
            />

            {/* Streak with Fire */}
            <BentoCard
                label="Current Streak"
                value={`${displayStats.streak}`}
                icon={Zap}
                accentFrom="#f97316"
                accentTo="#ef4444"
                glowColor="#f97316"
                delay={0.19}
                className="relative"
            >
                <span className="text-[10px] text-white/30 font-mono mt-1">DAYS</span>
                <StreakFire active={displayStats.streak > 0} />
            </BentoCard>

            {/* Acceptance Rate */}
            <BentoCard
                label="Acceptance Rate"
                value={`${displayStats.acceptanceRate}%`}
                icon={Percent}
                accentFrom="#4ade80"
                accentTo="#22c55e"
                glowColor="#4ade80"
                delay={0.26}
            >
                {/* Mini bar indicator */}
                <div className="mt-2 w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #4ade80, #22c55e)" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${displayStats.acceptanceRate}%` }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
            </BentoCard>
        </div>
    );
}

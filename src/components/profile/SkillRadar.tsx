"use client";

import { motion } from "framer-motion";

export interface UserSkills {
    algos: number;
    ds: number;
    system: number;
    debug: number;
    optim: number;
}

/* ─── Config ─── */
const LABELS = [
    { key: "algos", label: "ALGORITHMS", shortLabel: "ALGOS" },
    { key: "ds", label: "DATA STRUCTURES", shortLabel: "DS" },
    { key: "system", label: "SYSTEM DESIGN", shortLabel: "SYSTEM" },
    { key: "debug", label: "DEBUGGING", shortLabel: "DEBUG" },
    { key: "optim", label: "OPTIMIZATION", shortLabel: "OPTIM" },
] as const;

const GRID_LEVELS = [20, 40, 60, 80, 100];
const NUM_SIDES = LABELS.length;
const RADIUS = 100;
const CENTER = 150;
const ACCENT = "#4ade80";
const ACCENT_DIM = "rgba(74, 222, 128, 0.15)";

/* ─── Geometry Helpers ─── */
function getPoint(index: number, value: number) {
    const angle = (Math.PI * 2 * index) / NUM_SIDES - Math.PI / 2;
    const r = (value / 100) * RADIUS;
    return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

function pointsToString(indices: number[], values: number[]) {
    return indices.map((i) => {
        const p = getPoint(i, values[i]);
        return `${p.x},${p.y}`;
    }).join(" ");
}

/* ─── Glowing Data Point ─── */
function DataDot({ x, y, value, delay }: { x: number; y: number; value: number; delay: number }) {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Outer glow */}
            <circle cx={x} cy={y} r="8" fill={ACCENT} opacity="0.12" />
            {/* Core dot */}
            <circle cx={x} cy={y} r="4" fill={ACCENT} stroke="#0a0a0a" strokeWidth="1.5" />
            {/* Value label */}
            <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                className="fill-white/80 text-[8px] font-mono font-bold"
            >
                {value}
            </text>
        </motion.g>
    );
}

/* ─── Main Export ─── */
export default function SkillRadar({ skills }: { skills?: UserSkills }) {
    const displaySkills = LABELS.map((l) => ({
        ...l,
        value: skills?.[l.key] ?? 50,
    }));

    const values = displaySkills.map((s) => s.value);
    const indices = displaySkills.map((_, i) => i);

    const polyPoints = pointsToString(indices, values);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square max-w-[380px] flex items-center justify-center mx-auto"
        >
            {/* Background pulse */}
            <motion.div
                className="absolute inset-8 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${ACCENT}08, transparent 70%)` }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                <defs>
                    {/* Radar fill gradient */}
                    <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" />
                    </radialGradient>
                    {/* Glow filter */}
                    <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid Pentagons */}
                {GRID_LEVELS.map((level, idx) => {
                    const pts = indices.map((i) => {
                        const p = getPoint(i, level);
                        return `${p.x},${p.y}`;
                    }).join(" ");
                    return (
                        <polygon
                            key={idx}
                            points={pts}
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.8"
                        />
                    );
                })}

                {/* Axis Lines */}
                {indices.map((i) => {
                    const p = getPoint(i, 100);
                    return (
                        <line
                            key={i}
                            x1={CENTER} y1={CENTER}
                            x2={p.x} y2={p.y}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.8"
                        />
                    );
                })}

                {/* Data Polygon – filled */}
                <motion.polygon
                    points={polyPoints}
                    fill="url(#radarFill)"
                    stroke={ACCENT}
                    strokeWidth="2"
                    filter="url(#radarGlow)"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                />

                {/* Data Points */}
                {displaySkills.map((skill, i) => {
                    const p = getPoint(i, skill.value);
                    return <DataDot key={i} x={p.x} y={p.y} value={skill.value} delay={i * 0.1} />;
                })}

                {/* Labels */}
                {displaySkills.map((skill, i) => {
                    const angle = (Math.PI * 2 * i) / NUM_SIDES - Math.PI / 2;
                    const r = RADIUS + 30;
                    const x = CENTER + r * Math.cos(angle);
                    const y = CENTER + r * Math.sin(angle);

                    return (
                        <text
                            key={i}
                            x={x} y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-white/50 text-[9px] font-mono font-bold tracking-[0.15em]"
                        >
                            {skill.shortLabel}
                        </text>
                    );
                })}
            </svg>
        </motion.div>
    );
}

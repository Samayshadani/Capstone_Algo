"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface StatCardProps {
    type: "xp" | "rank" | "solved"
    icon: LucideIcon
    label: string
    value: string | number
    color: string
}

export default function StatCard({ type, icon: Icon, label, value, color }: StatCardProps) {

    // XP WIDGET: Energy Cell Aesthetic
    if (type === "xp") {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-default"
            >
                {/* Main Container - Tech Bar Shape */}
                <div className="relative bg-black/40 border border-white/5 p-4 rounded-lg overflow-hidden backdrop-blur-sm">
                    {/* Glowing Border effect */}
                    <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-[color:var(--color)] transition-colors duration-300" style={{ "--color": color } as any} />

                    <div className="flex justify-between items-end mb-2 relative z-10">
                        <div className="flex items-center gap-2 text-[color:var(--color)]" style={{ "--color": color } as any}>
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-bold tracking-widest uppercase opacity-80">{label}</span>
                        </div>
                        <div className="text-2xl font-bold font-mono tracking-tighter text-white">
                            {value}
                        </div>
                    </div>

                    {/* Segmented Progress Bar Visual */}
                    <div className="h-3 w-full bg-black/50 rounded-sm flex gap-1 p-0.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="h-full flex-1 rounded-[1px] opacity-80"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 5px ${color}`,
                                    opacity: i > 6 ? 0.2 : 0.8 // Simulated progress
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }

    // RANK WIDGET: Tactical Badge Aesthetic
    if (type === "rank") {
        return (
            <motion.div
                whileHover={{ y: -4 }}
                className="relative group flex items-center justify-center p-2"
            >
                {/* Hexagonal Glow Backdrop */}
                <div
                    className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ backgroundColor: color }}
                />

                {/* Badge Container */}
                <div className="relative bg-[#0A0A0A] border-2 border-white/10 p-6 rounded-xl flex flex-col items-center justify-center min-w-[180px] shadow-2xl group-hover:border-[color:var(--color)] transition-colors duration-300"
                    style={{
                        clipPath: "polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)",
                        "--color": color
                    } as any}
                >
                    <div className="absolute top-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Officer</div>

                    <div className="my-2 relative">
                        {/* Rotating Ring */}
                        <div className="absolute inset-[-10px] rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]" />
                        <Icon className="w-8 h-8 relative z-10" style={{ color }} />
                    </div>

                    <div className="text-3xl font-black font-mono mt-1 text-white tabular-nums tracking-tight">
                        {value}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider mt-1 text-[color:var(--color)] opacity-80" style={{ "--color": color } as any}>
                        {label}
                    </div>
                </div>
            </motion.div>
        )
    }

    // SOLVED WIDGET: Target Scope Aesthetic
    if (type === "solved") {
        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
            >
                <div className="relative bg-black/60 border border-white/10 rounded-full aspect-square flex items-center justify-center overflow-hidden hover:border-[color:var(--color)] transition-colors duration-300 max-h-[140px] mx-auto"
                    style={{ "--color": color } as any}
                >
                    {/* Crosshairs & Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    <div className="absolute inset-0 border rounded-full opacity-30 border-[color:var(--color)] scale-75" style={{ "--color": color } as any} />
                    <div className="absolute top-0 bottom-0 w-px bg-[color:var(--color)] opacity-20" style={{ "--color": color } as any} />
                    <div className="absolute left-0 right-0 h-px bg-[color:var(--color)] opacity-20" style={{ "--color": color } as any} />

                    <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-1">
                            <Icon className="w-5 h-5 opacity-80" style={{ color }} />
                        </div>
                        <div className="text-3xl font-bold font-mono text-white leading-none">
                            {value}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                            {label}
                        </div>
                    </div>

                    {/* Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--color)] to-transparent opacity-10 h-[20%] w-full animate-[scan_2s_linear_infinite]" style={{ "--color": color } as any} />
                </div>
            </motion.div>
        )
    }

    return null
}

"use client"

import { useRouter } from "next/navigation"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

import TopicBackground from "./TopicBackground"

interface LearningPathCardProps {
    id: string
    icon: LucideIcon
    title: string
    description: string
    progress: number
    total: number
    className?: string
}

export default function LearningPathCard({ id, icon: Icon, title, description, progress, total, className }: LearningPathCardProps) {
    const percentage = total > 0 ? (progress / total) * 100 : 0

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`glass-panel glow-card p-6 rounded-xl group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 hover:backdrop-blur-xl relative overflow-hidden h-full flex flex-col ${className || ''}`}
        >
            <TopicBackground topicId={id} />

            {/* Content Overlay */}
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                </div>

                <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors font-mono tracking-tight">{title}</h4>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{description}</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary font-mono">
                            {progress} / {total}
                        </span>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded-none overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className="h-full bg-primary shadow-[0_0_10px_var(--primary)]"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

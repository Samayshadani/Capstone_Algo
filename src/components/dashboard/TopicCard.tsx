import { LucideIcon, ArrowRight, CheckCircle2, List } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TopicCardProps {
    id: string;
    title: string;
    description: string;
    total: number;
    solved: number;
    icon: LucideIcon;
}

export default function TopicCard({
    id,
    title,
    description,
    total,
    solved,
    icon: Icon,
}: TopicCardProps) {
    const progress = Math.round((solved / total) * 100);
    const isCompleted = progress === 100;

    return (
        <div className="group relative p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-800/50 rounded-xl group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                        <Icon size={24} className="text-slate-400 group-hover:text-blue-400" />
                    </div>
                    {isCompleted && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide">
                            <CheckCircle2 size={12} />
                            <span>Mastered</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-100 font-outfit mb-1 group-hover:text-blue-200 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm h-10 line-clamp-2 mb-6">
                    {description}
                </p>

                {/* Footer / Progress */}
                <div className="space-y-3">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Progress</span>
                        <span className={cn(isCompleted ? "text-emerald-400" : "text-slate-400")}>
                            {solved} / {total}
                        </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-1000 ease-out",
                                isCompleted ? "bg-emerald-500" : "bg-blue-500"
                            )}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {/* Button 1: Quick Solve (IDE) */}
                        <Link href={`/practice/${id}`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-lg shadow-blue-900/20">
                                <span className="truncate">Quick Solve</span>
                                <ArrowRight size={14} />
                            </button>
                        </Link>

                        {/* Button 2: View List */}
                        <Link href={`/dashboard/topic/${id}`}>
                            <button className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors border border-white/5">
                                <div className="flex items-center gap-2">
                                    <List size={14} />
                                    <span className="truncate">View List</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

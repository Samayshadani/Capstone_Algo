"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Brain, Zap, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { Question } from "@/types/question";
import { ALL_QUESTIONS } from "@/lib/allQuestions";
import { useEffect, useState } from "react";

interface MissionBriefingModalProps {
    recommendation: {
        id: string;
        reason: string;
        strategy?: string;
        timestamp: number;
        trigger?: string;
        logic?: string;
        treeContext?: string;
    } | null;
    onClose: () => void;
    onLaunch: () => void;
}

export default function MissionBriefingModal({ recommendation, onClose, onLaunch }: MissionBriefingModalProps) {
    const [question, setQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (recommendation?.id) {
            const q = ALL_QUESTIONS.find(q => q.id === recommendation.id);
            if (q) setQuestion(q);
        }
    }, [recommendation]);

    if (!recommendation || !question) return null;

    // Strategy Formatting
    const getStrategyInfo = (strat?: string) => {
        switch (strat) {
            case 'speedrun': return { title: 'MOMENTUM ACCELERATION', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10', icon: Zap };
            case 'remedial': return { title: 'FOUNDATION REPAIR', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-500/10', icon: ShieldCheck };
            case 'lateral': return { title: 'LATERAL EXPANSION', color: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-500/10', icon: Activity };
            default: return { title: 'LOGICAL PROGRESSION', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', icon: Brain };
        }
    };

    const strategy = getStrategyInfo(recommendation.strategy);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[95vh] overflow-y-auto"
            >
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                <div className="absolute top-0 right-0 p-4 z-20">
                    <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition-colors rounded-full hover:bg-white/5">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* 1. Header */}
                    <div className="text-center space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            System Intelligence
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Mission Briefing</h2>
                        <p className="text-white/40 font-mono text-xs">Target selection logic decrypted.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 2. Target Card */}
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-3 h-full">
                            <div className="flex items-center gap-3 text-white/50 text-[10px] font-mono uppercase tracking-widest">
                                <Target size={14} />
                                Target Protocol
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{question.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${question.difficulty === 'Easy' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : question.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'}`}>
                                        {question.difficulty}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 text-white/40 bg-white/5">
                                        {question.category}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. System Analysis (Transparency Details) */}
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden h-full">
                            {/* Background Data Stream Effect */}
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Activity size={80} />
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Brain className="text-cyan-400" size={14} />
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Algorithm Logic</h3>
                                </div>

                                <div className="space-y-3">
                                    {/* Row 1: Context & Trigger */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                            <div className="text-[9px] text-white/40 uppercase tracking-wider font-mono mb-1">Observation Trigger</div>
                                            <div className="text-emerald-400 font-mono text-[10px] font-bold truncate" title={recommendation.trigger}>
                                                {recommendation.trigger || "System Initialization"}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                            <div className="text-[9px] text-white/40 uppercase tracking-wider font-mono mb-1">Evolutionary Strategy</div>
                                            <div className={`${strategy.color} font-mono text-[10px] font-bold truncate`} title={strategy.title}>
                                                {strategy.title}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Tree Context */}
                                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                        <div className="text-[9px] text-white/40 uppercase tracking-wider font-mono mb-1">Active Curriculum Node</div>
                                        <div className="text-white/80 font-mono text-[10px] flex items-center gap-2 truncate" title={recommendation.treeContext}>
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                                            {recommendation.treeContext || "Global Optimization Graph"}
                                        </div>
                                    </div>

                                    {/* Row 3: Logic/Reasoning */}
                                    <div className="bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/20">
                                        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider font-mono mb-1">AI Reasoning</div>
                                        <p className="text-cyan-100/80 text-xs leading-relaxed font-sans line-clamp-3">
                                            "{recommendation.reason}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Action */}
                    <button
                        onClick={onLaunch}
                        className="w-full group relative overflow-hidden rounded-xl bg-emerald-500 text-black font-bold p-4 transition-all hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            <span className="text-base uppercase tracking-tight">Accept Mission</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    <div className="text-center">
                        <p className="text-[9px] text-white/20 font-mono uppercase">
                            Warning: Direct Neural Interface Required.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


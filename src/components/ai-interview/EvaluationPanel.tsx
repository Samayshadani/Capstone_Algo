"use client";

import { motion } from "framer-motion";
import {
    Trophy, TrendingUp, TrendingDown, RotateCcw,
    ChevronDown, ChevronUp, CheckCircle2, XCircle, Minus
} from "lucide-react";
import { useState } from "react";
import { EvaluationResult, Question } from "@/hooks/useResumeInterview";

interface Props {
    evaluation: EvaluationResult;
    questions: Question[];
    onReset: () => void;
}

const VERDICT_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
    "Strong Hire": { color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", label: "Strong Hire" },
    "Hire":        { color: "text-primary",     bg: "bg-primary/15 border-primary/30",         label: "Hire" },
    "Maybe":       { color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/30",     label: "Maybe" },
    "No Hire":     { color: "text-rose-400",    bg: "bg-rose-500/15 border-rose-500/30",       label: "No Hire" },
};

function ScoreRing({ score }: { score: number }) {
    const r = 46;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;

    const color =
        score >= 75 ? "#4ade80" :
        score >= 50 ? "oklch(0.7 0.2 140)" :
        score >= 30 ? "#fbbf24" :
        "#f87171";

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                <motion.circle
                    cx="50" cy="50" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <div className="text-center">
                <motion.span
                    className="text-3xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {score}
                </motion.span>
                <p className="text-xs text-muted-foreground">/100</p>
            </div>
        </div>
    );
}

function AnswerCard({ qa, question }: { qa: EvaluationResult["answers"][0]; question: Question }) {
    const [open, setOpen] = useState(false);
    const scoreColor =
        qa.score >= 8 ? "text-emerald-400" :
        qa.score >= 5 ? "text-amber-400" :
        "text-rose-400";

    const Icon = qa.score >= 7 ? CheckCircle2 : qa.score >= 4 ? Minus : XCircle;
    const iconColor = qa.score >= 7 ? "text-emerald-400" : qa.score >= 4 ? "text-amber-400" : "text-rose-400";

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-3 p-4 text-left"
            >
                <Icon size={18} className={`shrink-0 ${iconColor}`} />
                <p className="flex-1 text-sm font-medium text-foreground line-clamp-2">{question?.text}</p>
                <div className="flex items-center gap-3 ml-auto shrink-0">
                    <span className={`text-sm font-bold ${scoreColor}`}>{qa.score}/10</span>
                    {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </div>
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3"
                >
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Feedback</p>
                        <p className="text-sm text-foreground/90 leading-relaxed">{qa.feedback}</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <p className="text-xs text-primary uppercase tracking-wide mb-1">Model Answer Outline</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{qa.modelAnswer}</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default function EvaluationPanel({ evaluation, questions, onReset }: Props) {
    const verdictCfg = VERDICT_CONFIG[evaluation.verdict] || VERDICT_CONFIG["Maybe"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="text-center space-y-2">
                <Trophy size={36} className="mx-auto text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Interview Complete</h2>
                <p className="text-muted-foreground text-sm">Here&apos;s your performance breakdown</p>
            </div>

            {/* Score + Verdict */}
            <div className="glow-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={evaluation.overallScore} />
                <div className="flex-1 space-y-3 text-center sm:text-left">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${verdictCfg.bg} ${verdictCfg.color}`}>
                        {verdictCfg.label}
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{evaluation.verdictJustification}</p>
                </div>
            </div>

            {/* Strengths + Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                        <TrendingUp size={14} />
                        Strengths
                    </div>
                    <ul className="space-y-1">
                        {evaluation.strengths?.map((s, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-1.5">
                                <span className="text-emerald-400 mt-0.5">›</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wide">
                        <TrendingDown size={14} />
                        Areas to Improve
                    </div>
                    <ul className="space-y-1">
                        {evaluation.improvements?.map((s, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-1.5">
                                <span className="text-amber-400 mt-0.5">›</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Per-Question Breakdown */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Question Breakdown
                </h3>
                {evaluation.answers?.map((qa) => {
                    const question = questions.find((q) => q.id === qa.id) || questions[qa.id - 1];
                    return <AnswerCard key={qa.id} qa={qa} question={question} />;
                })}
            </div>

            {/* Reset */}
            <button
                id="restart-interview-btn"
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
            >
                <RotateCcw size={16} />
                Start New Interview
            </button>
        </motion.div>
    );
}

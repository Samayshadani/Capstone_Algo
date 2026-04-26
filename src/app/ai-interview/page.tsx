"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Brain } from "lucide-react";
import { TechGridBackground } from "@/components/ui/tech-grid-background";
import { useResumeInterview } from "@/hooks/useResumeInterview";
import ResumeUploadPanel from "@/components/ai-interview/ResumeUploadPanel";
import QuestionPanel from "@/components/ai-interview/QuestionPanel";
import VoiceInterviewPanel from "@/components/ai-interview/VoiceInterviewPanel";
import EvaluationPanel from "@/components/ai-interview/EvaluationPanel";

// ── Loading overlay shown during AI calls ──────────────────────────────────────
function LoadingOverlay({ message }: { message: string }) {
    return (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-6 py-24"
        >
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    <Brain size={28} className="text-primary" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
            <div className="text-center space-y-1">
                <p className="text-foreground font-semibold">{message}</p>
                <p className="text-muted-foreground text-sm">This may take a few seconds…</p>
            </div>
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AIInterviewPage() {
    const {
        phase,
        questions,
        currentQuestionIndex,
        currentAnswer,
        setCurrentAnswer,
        evaluation,
        error,
        isLastQuestion,
        generateQuestions,
        submitAnswer,
        submitFinal,
        reset,
    } = useResumeInterview();

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <TechGridBackground blobColors={["bg-primary/5", "bg-accent/5"]} />
            </div>

            {/* Top Nav Bar */}
            <header className="relative z-10 border-b border-white/8 bg-background/80 backdrop-blur-lg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                            <Brain size={14} className="text-primary" />
                        </div>
                        <span className="font-bold text-sm tracking-tight">AI Interview Practice</span>
                    </div>

                    {/* Phase indicator */}
                    {phase === "interview" && questions.length > 0 && (
                        <span className="text-xs text-muted-foreground font-mono">
                            Q{currentQuestionIndex + 1}/{questions.length} · {questions[currentQuestionIndex]?.difficulty}
                        </span>
                    )}

                    {(phase === "interview" || phase === "results") && (
                        <button
                            id="new-interview-nav-btn"
                            onClick={reset}
                            className="text-xs text-muted-foreground hover:text-foreground border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
                        >
                            New Interview
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-10 sm:py-16">
                <AnimatePresence mode="wait">

                    {/* Upload Phase */}
                    {phase === "upload" && (
                        <motion.div key="upload" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ResumeUploadPanel
                                onSubmit={generateQuestions}
                                isLoading={false}
                                error={error}
                            />
                        </motion.div>
                    )}

                    {/* Generating Phase */}
                    {phase === "generating" && (
                        <motion.div key="generating" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingOverlay message="Analyzing your resume & crafting questions…" />
                        </motion.div>
                    )}

                    {/* Interview Phase */}
                    {phase === "interview" && questions.length > 0 && (
                        <motion.div key="interview" className="w-full flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VoiceInterviewPanel
                                questions={questions}
                                currentIndex={currentQuestionIndex}
                                currentAnswer={currentAnswer}
                                setCurrentAnswer={setCurrentAnswer}
                                onSubmit={submitAnswer}
                                onFinal={submitFinal}
                                isLast={isLastQuestion}
                            />
                        </motion.div>
                    )}

                    {/* Evaluating Phase */}
                    {phase === "evaluating" && (
                        <motion.div key="evaluating" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingOverlay message="AI is evaluating your performance…" />
                        </motion.div>
                    )}

                    {/* Results Phase */}
                    {phase === "results" && evaluation && (
                        <motion.div key="results" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <EvaluationPanel
                                evaluation={evaluation}
                                questions={questions}
                                onReset={reset}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, SendHorizonal, SkipForward } from "lucide-react";
import { Question } from "@/hooks/useResumeInterview";

interface Props {
    questions: Question[];
    currentIndex: number;
    currentAnswer: string;
    setCurrentAnswer: (val: string) => void;
    onSubmit: () => void;
    onFinal: () => void;
    isLast: boolean;
}

const DIFFICULTY_STYLES: Record<string, string> = {
    Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Hard: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export default function QuestionPanel({
    questions,
    currentIndex,
    currentAnswer,
    setCurrentAnswer,
    onSubmit,
    onFinal,
    isLast,
}: Props) {
    const question = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            if (isLast) onFinal();
            else onSubmit();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
                {/* Question dots */}
                <div className="flex gap-2 pt-1">
                    {questions.map((q, i) => (
                        <div
                            key={q.id}
                            className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                                i < currentIndex ? "bg-primary" :
                                i === currentIndex ? "bg-primary/50" :
                                "bg-white/10"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glow-card rounded-2xl p-6 space-y-4"
                >
                    {/* Difficulty badge + question number */}
                    <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${DIFFICULTY_STYLES[question.difficulty]}`}>
                            {question.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                            #{String(currentIndex + 1).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Question Text */}
                    <div className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-foreground font-medium leading-relaxed text-base">
                            {question.text}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Answer Input */}
            <div className="space-y-3">
                <label htmlFor="answer-input" className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                    Your Answer
                </label>
                <AnimatePresence mode="wait">
                    <motion.textarea
                        key={`answer-${currentIndex}`}
                        id="answer-input"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your answer here… (Ctrl+Enter to submit)"
                        rows={6}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 transition-all duration-200"
                    />
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-3">
                    {isLast ? (
                        <button
                            id="submit-final-btn"
                            onClick={onFinal}
                            disabled={currentAnswer.trim().length < 3}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/20"
                        >
                            <SendHorizonal size={16} />
                            Submit &amp; Get Evaluation
                        </button>
                    ) : (
                        <>
                            <button
                                id="submit-answer-btn"
                                onClick={onSubmit}
                                disabled={currentAnswer.trim().length < 3}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/20"
                            >
                                <SendHorizonal size={16} />
                                Submit Answer
                            </button>
                            <button
                                id="skip-question-btn"
                                onClick={() => { setCurrentAnswer(""); onSubmit(); }}
                                title="Skip this question"
                                className="px-4 py-3 rounded-xl text-muted-foreground border border-white/10 hover:border-white/20 hover:text-foreground transition-all duration-200"
                            >
                                <SkipForward size={16} />
                            </button>
                        </>
                    )}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                    Tip: Ctrl+Enter to submit · Skip to move on without answering
                </p>
            </div>
        </div>
    );
}

"use client";

import { useState, useCallback, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Question {
    id: number;
    difficulty: "Easy" | "Medium" | "Hard";
    text: string;
}

export interface Keywords {
    skills: string[];
    roles: string[];
    expertise: string[];
}

export interface AnswerEvaluation {
    id: number;
    score: number;
    feedback: string;
    modelAnswer: string;
}

export interface EvaluationResult {
    overallScore: number;
    verdict: "Strong Hire" | "Hire" | "Maybe" | "No Hire";
    verdictJustification: string;
    answers: AnswerEvaluation[];
    strengths: string[];
    improvements: string[];
}

type InterviewPhase =
    | "upload"
    | "generating"
    | "interview"
    | "evaluating"
    | "results";

const STORAGE_KEY = "ai_interview_session";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useResumeInterview() {
    const [phase, setPhase] = useState<InterviewPhase>("upload");
    const [resumeText, setResumeText] = useState("");
    const [keywords, setKeywords] = useState<Keywords | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // ── Restore from localStorage on mount ──
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const session = JSON.parse(saved);
                if (session.phase === "interview" && session.questions?.length > 0) {
                    setPhase(session.phase);
                    setResumeText(session.resumeText || "");
                    setKeywords(session.keywords || null);
                    setQuestions(session.questions || []);
                    setCurrentQuestionIndex(session.currentQuestionIndex || 0);
                    setAnswers(session.answers || []);
                }
            }
        } catch { /* ignore */ }
    }, []);

    // ── Persist interview state ──
    useEffect(() => {
        if (phase === "interview") {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    phase,
                    resumeText,
                    keywords,
                    questions,
                    currentQuestionIndex,
                    answers,
                }));
            } catch { /* ignore */ }
        }
    }, [phase, resumeText, keywords, questions, currentQuestionIndex, answers]);

    // ── Generate questions from resume ──
    const generateQuestions = useCallback(async (text: string) => {
        setResumeText(text);
        setError(null);
        setPhase("generating");

        try {
            const res = await fetch("/api/ai-interview/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText: text }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || "Failed to generate questions.");
            }

            setKeywords(data.keywords);
            setQuestions(data.questions);
            setAnswers(new Array(data.questions.length).fill(""));
            setCurrentQuestionIndex(0);
            setPhase("interview");
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            setPhase("upload");
        }
    }, []);

    // ── Submit answer and advance ──
    const submitAnswer = useCallback((overrideAnswer?: string) => {
        const answerToSave = overrideAnswer !== undefined ? overrideAnswer : currentAnswer;
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = answerToSave;
        setAnswers(updatedAnswers);
        setCurrentAnswer("");

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }, [answers, currentAnswer, currentQuestionIndex, questions.length]);

    // ── Submit final answer and evaluate ──
    const submitFinal = useCallback(async (overrideAnswer?: string) => {
        const answerToSave = overrideAnswer !== undefined ? overrideAnswer : currentAnswer;
        const finalAnswers = [...answers];
        finalAnswers[currentQuestionIndex] = answerToSave;
        setAnswers(finalAnswers);
        setCurrentAnswer("");
        setPhase("evaluating");

        const qa = questions.map((q, i) => ({
            id: q.id,
            difficulty: q.difficulty,
            question: q.text,
            answer: finalAnswers[i] || "(No answer provided)",
        }));

        const keywordSummary = keywords
            ? [...(keywords.skills || []), ...(keywords.roles || []), ...(keywords.expertise || [])].join(", ")
            : "";

        try {
            const res = await fetch("/api/ai-interview/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qa, keywords: keywordSummary }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || "Evaluation failed.");
            }

            setEvaluation(data.evaluation);
            // Clear saved session once done
            localStorage.removeItem(STORAGE_KEY);
            setPhase("results");
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            setPhase("interview");
        }
    }, [answers, currentAnswer, currentQuestionIndex, keywords, questions]);

    // ── Reset everything ──
    const reset = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setPhase("upload");
        setResumeText("");
        setKeywords(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setCurrentAnswer("");
        setEvaluation(null);
        setError(null);
    }, []);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return {
        // State
        phase,
        resumeText,
        keywords,
        questions,
        currentQuestionIndex,
        answers,
        currentAnswer,
        setCurrentAnswer,
        evaluation,
        error,
        isLastQuestion,
        // Actions
        generateQuestions,
        submitAnswer,
        submitFinal,
        reset,
    };
}

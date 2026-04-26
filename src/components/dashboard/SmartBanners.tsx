"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Clock, Calendar, ArrowRight, Zap, Target, History } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ALL_QUESTIONS } from "@/lib/allQuestions";
import { Question } from "@/types/question";
import MissionBriefingModal from "@/components/navigator/MissionBriefingModal";

export default function SmartBanners() {
    const { user } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [lastActiveQuestion, setLastActiveQuestion] = useState<Question | null>(null);
    const [recommendedId, setRecommendedId] = useState<string | null>(null);
    const [navLoading, setNavLoading] = useState(false);

    // Mission Briefing Modal State
    const [briefingRecommendation, setBriefingRecommendation] = useState<{ id: string, reason: string, strategy?: string, timestamp: number, trigger?: string, logic?: string, treeContext?: string } | null>(null);

    // Fetch User Data
    useEffect(() => {
        if (!user) return;
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUserData(data);

                // 2. Resolve Last Active Question
                if (data.lastActiveQuestionId) {
                    const q = ALL_QUESTIONS.find(q => q.id === data.lastActiveQuestionId);
                    if (q) setLastActiveQuestion(q);
                }

                // 3. Resolve Recommended Question
                if (data.recommendedNextQuestion?.id) {
                    setRecommendedId(data.recommendedNextQuestion.id);
                }
            }
        });
        return () => unsub();
    }, [user]);

    // Handle Smart Navigation
    const handleNavigatorClick = async () => {
        // Sticky Logic: Checks (1) Props/State or (2) API
        let finalDecision: { id: string, reason: string, strategy?: string, timestamp: number, trigger?: string, logic?: string, treeContext?: string } | null = null;

        // 1. Check Sticky State (Client-Side from Snapshot)
        if (userData?.recommendedNextQuestion?.id && userData?.solvedQuestionIds && !userData.solvedQuestionIds.includes(userData.recommendedNextQuestion.id)) {
            console.log("🧭 Using Active Recommendation:", userData.recommendedNextQuestion.id);
            finalDecision = userData.recommendedNextQuestion;
        }

        // 2. If No Valid Sticky, Fetch Fresh
        if (!finalDecision) {
            if (!user) {
                console.error("Navigator Error: User not authenticated");
                return;
            }
            setNavLoading(true);
            try {
                const res = await fetch("/api/navigator/recommend", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.uid })
                });
                const decision = await res.json();

                if (decision.questionId) {
                    finalDecision = {
                        id: decision.questionId,
                        reason: decision.reasoning || "No reason provided.",
                        strategy: decision.actionType,
                        timestamp: Date.now(),
                        trigger: decision.trigger,
                        logic: decision.logic,
                        treeContext: decision.treeContext
                    };
                } else {
                    router.push("/dashboard");
                    return;
                }
            } catch (e) {
                console.error("Navigator Error:", e);
                // Last ditch fallback
                if (recommendedId) router.push(`/practice/${recommendedId}`);
                return;
            } finally {
                setNavLoading(false);
            }
        }

        // 3. SHOW BRIEFING MODAL
        if (finalDecision) {
            setBriefingRecommendation(finalDecision);
        }
    };

    // Helper: Format Date
    const formatDate = (timestamp?: number) => {
        if (!timestamp) return "ACTIVE"; // Fallback for legacy data

        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";

        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }); // DD/MM
    };

    // Get Recent History - Prefer new "solvedHistory" array, fallback to legacy IDs
    const getHistoryItems = () => {
        if (userData?.solvedHistory && userData.solvedHistory.length > 0) {
            // Sort by completion date descending
            return [...userData.solvedHistory]
                .sort((a: any, b: any) => b.completedAt - a.completedAt)
                .slice(0, 10);
        }

        // Legacy Fallback
        return userData?.solvedQuestionIds
            ? userData.solvedQuestionIds
                .map((id: string) => ALL_QUESTIONS.find(q => q.id === id))
                .filter(Boolean)
                .slice(0, 10)
                .map((q: Question) => ({
                    id: q.id,
                    title: q.title,
                    completedAt: null
                }))
            : [];
    };

    const historyItems = getHistoryItems();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* 1. Navigator HQ Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative h-48 rounded-3xl overflow-hidden border border-white/10 cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all"
                onClick={handleNavigatorClick}
            >
                {/* Background Image - Reduced Opacity */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                    style={{ backgroundImage: `url('/assets/banners/navigator_bg.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-cyan-900/5 transition-colors" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/30">
                        <Sparkles className={`w-5 h-5 text-cyan-400 ${navLoading ? 'animate-spin' : ''}`} />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-6 bg-cyan-500 rounded-full" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                                {recommendedId ? "Target Acquired" : "Awaiting Command"}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-200 transition-colors drop-shadow-lg">
                            Navigator HQ
                        </h3>
                        {recommendedId && (
                            <p className="text-sm font-medium text-cyan-100/80 line-clamp-1">
                                Next: {ALL_QUESTIONS.find(q => q.id === recommendedId)?.title}
                            </p>
                        )}
                        {!recommendedId && (
                            <p className="text-xs text-cyan-100/60">
                                AI Analysis of optimal learning path.
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>


            {/* 2. Resume Previous Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`group relative h-48 rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-amber-500/20 transition-all ${lastActiveQuestion ? 'cursor-pointer' : 'grayscale opacity-80 cursor-not-allowed'}`}
                onClick={() => lastActiveQuestion && router.push(`/practice/${lastActiveQuestion.id}`)}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                    style={{ backgroundImage: `url('/assets/banners/continue_bg.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-amber-900/10 group-hover:bg-amber-900/5 transition-colors" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-amber-500/30">
                        <Play className="w-5 h-5 text-amber-400 fill-current" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-6 bg-amber-500 rounded-full" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                                Resume Question
                            </span>
                        </div>
                        {lastActiveQuestion ? (
                            <>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-amber-200 transition-colors line-clamp-1 drop-shadow-md">
                                    {lastActiveQuestion.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-amber-100/80 font-medium">
                                    <span className={`px-1.5 py-0.5 rounded bg-black/50 border border-white/10 ${lastActiveQuestion.difficulty === 'Easy' ? 'text-emerald-400' :
                                        lastActiveQuestion.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {lastActiveQuestion.difficulty}
                                    </span>
                                    <span>•</span>
                                    <span>{lastActiveQuestion.category}</span>
                                </div>
                            </>
                        ) : (
                            <h3 className="text-xl font-bold text-white/50 uppercase tracking-tight">
                                No Active Mission
                            </h3>
                        )}
                    </div>
                </div>
            </motion.div>


            {/* 3. History Ticker Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative h-48 rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                    style={{ backgroundImage: `url('/assets/banners/history_bg.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />

                <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-6 bg-emerald-500 rounded-full" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                                    Mission Log
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight drop-shadow-md">
                                Recent Solves
                            </h3>
                        </div>
                        <History className="w-5 h-5 text-emerald-500/50" />
                    </div>

                    {/* Vertical Scrolling List */}
                    <div className="relative flex-1 overflow-hidden mask-gradient-y">
                        <div className="absolute inset-0 overflow-hidden">
                            {historyItems.length > 0 ? (
                                <div className="animate-vertical-scroll space-y-4">
                                    {/* Duplicated list for seamless loop */}
                                    {[...historyItems, ...historyItems].map((q, i) => (
                                        <div key={`${q.id}-${i}`} className="flex items-center justify-between group/item border-b border-white/5 pb-2">
                                            <span className="text-sm font-medium text-emerald-100/90 truncate max-w-[200px] group-hover/item:text-emerald-300 transition-colors">
                                                {q.title}
                                            </span>
                                            <span className="text-emerald-500/60 font-mono text-[10px] uppercase tracking-wider">
                                                {formatDate(q.completedAt)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-emerald-500/30 text-xs italic">
                                    No records found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Mission Briefing Modal */}
            <AnimatePresence>
                {briefingRecommendation && (
                    <MissionBriefingModal
                        recommendation={briefingRecommendation}
                        onClose={() => setBriefingRecommendation(null)}
                        onLaunch={() => {
                            setBriefingRecommendation(null);
                            router.push(`/practice/${briefingRecommendation.id}`);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TOPICS } from "@/lib/topics";
import { ALL_QUESTIONS, getQuestionsByTopicId, TOPIC_ID_TO_CATEGORY } from "@/lib/allQuestions";
import { Question } from "@/types/question";
import { Zap, Trophy, BrainCircuit, Activity, ChevronRight, CheckCircle2, AlertCircle, TrendingUp, ChevronLeft, ChevronRight as ChevronNext, ArrowLeft } from "lucide-react";
import { TechGridBackground } from "@/components/ui/tech-grid-background";
import { motion, AnimatePresence } from "framer-motion";
import MissionBriefingModal from "@/components/navigator/MissionBriefingModal";

const formatSmartDate = (isoString?: string) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    // Check Yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

export default function NavigatorPage() {
    const { user } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [navLoading, setNavLoading] = useState(false);

    // Mission Briefing Modal
    const [briefingRecommendation, setBriefingRecommendation] = useState<{ id: string, reason: string, strategy?: string, timestamp: number, trigger?: string, logic?: string, treeContext?: string } | null>(null);

    // Pagination for History
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // --- NAVIGATION LOGIC ---
    // --- NAVIGATION LOGIC ---
    // --- NAVIGATION LOGIC ---
    const handleSmartStart = async () => {
        if (!user || !userData) return;
        setNavLoading(true);

        const currentSolved = new Set(userData.solvedQuestionIds || []);
        let finalDecision: { id: string, reason: string, strategy?: string, timestamp: number, trigger?: string, logic?: string, treeContext?: string } | null = null;

        try {
            // 1. Check Firestore (Server Truth)
            if (userData.recommendedNextQuestion?.id && !currentSolved.has(userData.recommendedNextQuestion.id)) {
                console.log("🧭 Using Server Recommendation:", userData.recommendedNextQuestion.id);
                finalDecision = userData.recommendedNextQuestion;
            } else {
                // 2. Fetch Fresh
                const res = await fetch("/api/navigator/recommend", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.uid })
                });

                const decision = await res.json();
                if (decision.error) {
                    alert("Navigator Error: " + decision.error);
                    return;
                }

                if (decision.message === "All questions solved!") {
                    alert("You have solved everything!");
                    return;
                }

                // Construct decision object compliant with interface
                if (decision.questionId) {
                    finalDecision = {
                        id: decision.questionId,
                        reason: decision.reasoning || "Optimized path selection.",
                        strategy: decision.actionType,
                        timestamp: Date.now(),
                        trigger: decision.trigger,
                        logic: decision.logic,
                        treeContext: decision.treeContext
                    };
                }
            }

            // 3. Launch Briefing
            if (finalDecision) {
                setBriefingRecommendation(finalDecision);
            }

        } catch (error) {
            console.error("Navigator Error:", error);
            alert("Failed to start session.");
        } finally {
            setNavLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return; // Wait for Auth

        const itemsRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(itemsRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUserData(data);

                // REDIRECT IF NEW USER (No Onboarding Flag)
                // We allow a small delay or check to ensure data is fully loaded
                if (data && !data.hasOnboarded) {
                    router.replace("/onboarding");
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, router]);

    if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading Navigator...</div>;

    // --- DERIVED STATS ---
    const solvedIds = new Set(userData?.solvedQuestionIds || []);
    const solvedCount = solvedIds.size;

    // Determine Level
    // Simple logic: < 10 Solved = Novice, 10-30 = Intermediate, 30+ = Advanced
    let levelTitle = "Novice";
    let levelColor = "text-blue-400";
    if (solvedCount >= 10) { levelTitle = "Apprentice"; levelColor = "text-indigo-400"; }
    if (solvedCount >= 30) { levelTitle = "Expert"; levelColor = "text-purple-400"; }
    if (solvedCount >= 50) { levelTitle = "Grandmaster"; levelColor = "text-amber-400"; }

    // --- SKILL MATRIX ---
    // Categorize topics based on solved count
    // Strong: >= 5 solved
    // Mid: 1-4 solved
    // Weak: 0 solved
    const skillMatrix = {
        strong: [] as typeof TOPICS,
        mid: [] as typeof TOPICS,
        weak: [] as typeof TOPICS
    };

    TOPICS.forEach(topic => {
        // Need to count REAL solved in this topic
        // We do this by cross-referencing ALL_QUESTIONS
        // Note: Ideally we'd have a map, but filter finding is fast enough for <1000 items
        const topicQs = ALL_QUESTIONS.filter(q => q.category === TOPIC_ID_TO_CATEGORY[topic.id]);
        const solvedInTopic = topicQs.filter(q => solvedIds.has(q.id)).length;

        if (solvedInTopic >= 5) skillMatrix.strong.push(topic);
        else if (solvedInTopic >= 1) skillMatrix.mid.push(topic);
        else skillMatrix.weak.push(topic);
    });

    // --- HISTORY LIST ---
    const solvedQuestionsList = ALL_QUESTIONS.filter(q => solvedIds.has(q.id)).reverse(); // Show newest first (mock reverse if array order isn't guaranteed)
    // Pagination
    const totalHistoryPages = Math.ceil(solvedQuestionsList.length / ITEMS_PER_PAGE);
    const visibleHistory = solvedQuestionsList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


    // --- ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <TechGridBackground activeColor="text-cyan-500" blobColors={["bg-cyan-500/10", "bg-teal-500/10"]} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
            </div>

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard")}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-widest hidden md:inline">Back to Command</span>
            </motion.button>

            <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-12 space-y-12">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-16"
                >
                    {/* 1. HEADER & HERO ACTION */}
                    <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/10 pb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                    <BrainCircuit className="text-cyan-400" size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-mono text-white" style={{ textShadow: "0 0 20px rgba(6,182,212,0.5)" }}>
                                            Navigator <span className="text-cyan-400">HQ</span>
                                        </h1>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-900/50 text-cyan-300 border border-cyan-700/50 uppercase tracking-widest">
                                            Online
                                        </span>
                                    </div>
                                    <p className="text-cyan-400/60 font-mono text-sm tracking-widest uppercase mt-1">
                                        Adaptive Learning System // v2.4.0
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSmartStart}
                            disabled={navLoading}
                            className={`
                                group relative overflow-hidden rounded-2xl bg-cyan-500/10 text-cyan-400 px-10 py-6 transition-all hover:bg-cyan-400 hover:text-black border border-cyan-500/50
                                ${navLoading ? 'opacity-50 cursor-wait' : 'hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]'}
                            `}
                        >
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="relative">
                                    {navLoading ? (
                                        <Activity className="animate-spin" size={32} />
                                    ) : (
                                        <>
                                            <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-50" size={40} />
                                            <Zap className="relative z-10" size={32} fill="currentColor" />
                                        </>
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-bold opacity-70 uppercase tracking-widest font-mono mb-1">Command Priority</div>
                                    <div className="text-2xl font-black uppercase tracking-tight">{navLoading ? "INITIALIZING..." : "INITIATE SESSION"}</div>
                                </div>
                                <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
                            </div>
                        </button>
                    </motion.div>

                    {/* 2. HUD STATS */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Total Solved", value: solvedCount, icon: CheckCircle2, color: "emerald" },
                            { label: "Current Rank", value: levelTitle, icon: Trophy, color: "amber", subtitle: "Level Status" },
                            { label: "Strong Sectors", value: skillMatrix.strong.length, icon: TrendingUp, color: "cyan" },
                            { label: "Critical Areas", value: skillMatrix.weak.length, icon: AlertCircle, color: "rose" }
                        ].map((stat, i) => (
                            <div key={i} className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all">
                                <div className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity text-${stat.color}-400`}>
                                    <stat.icon size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className={`text-${stat.color}-400 mb-2`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="text-3xl font-black font-mono text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest font-mono">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* 3. SKILL MATRIX DECK */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Strong */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-sm font-mono border-b border-emerald-500/20 pb-2">
                                <div className="w-2 h-2 rounded-none bg-emerald-400 shadow-[0_0_10px_var(--emerald-400)]" /> Mastery
                            </h3>
                            <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-4 min-h-[200px] space-y-2 backdrop-blur-xl">
                                {skillMatrix.strong.length === 0 && <div className="text-white/20 text-xs font-mono uppercase p-4 text-center border border-dashed border-white/10 rounded">No data available</div>}
                                {skillMatrix.strong.map(t => (
                                    <div key={t.id} className="flex items-center gap-3 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 hover:border-emerald-500/50 transition-colors group">
                                        <t.icon className="text-emerald-400 opacity-70 group-hover:opacity-100" size={16} />
                                        <span className="text-emerald-100/80 text-sm font-mono group-hover:text-emerald-300">{t.title}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mid */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-sm font-mono border-b border-cyan-500/20 pb-2">
                                <div className="w-2 h-2 rounded-none bg-cyan-400 shadow-[0_0_10px_var(--cyan-400)]" /> In Progress
                            </h3>
                            <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-4 min-h-[200px] space-y-2 backdrop-blur-xl">
                                {skillMatrix.mid.length === 0 && <div className="text-white/20 text-xs font-mono uppercase p-4 text-center border border-dashed border-white/10 rounded">No data available</div>}
                                {skillMatrix.mid.map(t => (
                                    <div key={t.id} className="flex items-center gap-3 bg-cyan-500/5 p-3 rounded-lg border border-cyan-500/10 hover:border-cyan-500/50 transition-colors group">
                                        <t.icon className="text-cyan-400 opacity-70 group-hover:opacity-100" size={16} />
                                        <span className="text-cyan-100/80 text-sm font-mono group-hover:text-cyan-300">{t.title}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Weak */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-sm font-mono border-b border-rose-500/20 pb-2">
                                <div className="w-2 h-2 rounded-none bg-rose-400 shadow-[0_0_10px_var(--rose-400)]" /> Attention Required
                            </h3>
                            <div className="bg-black/40 border border-rose-500/20 rounded-2xl p-4 min-h-[200px] space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar backdrop-blur-xl">
                                {skillMatrix.weak.map(t => (
                                    <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-rose-500/30 hover:bg-rose-500/5 transition-all group opacity-60 hover:opacity-100">
                                        <t.icon className="text-rose-400" size={16} />
                                        <span className="text-rose-100/80 text-sm font-mono group-hover:text-rose-300">{t.title}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 4. DATA LOG */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center justify-between border-l-4 border-cyan-500 pl-4">
                            <h2 className="text-2xl font-black font-mono uppercase tracking-widest text-white">Mission Log</h2>
                            <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest">
                                Segment {visibleHistory.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, solvedQuestionsList.length)} // {solvedQuestionsList.length} Total
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 font-mono">
                                        <th className="p-5 font-bold">Protocol Name</th>
                                        <th className="p-5 font-bold">Class</th>
                                        <th className="p-5 font-bold">Sector</th>
                                        <th className="p-5 font-bold">Timestamp</th>
                                        <th className="p-5 font-bold text-right">Cmd</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {visibleHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-10 text-center text-white/20 font-mono uppercase tracking-widest">No matching records found.</td>
                                        </tr>
                                    ) : (
                                        visibleHistory.map(q => (
                                            <tr key={q.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-5 font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">{q.title}</td>
                                                <td className="p-5">
                                                    <span className={`
                                                        px-2 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider border
                                                        ${q.difficulty === 'Easy' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                                            q.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}
                                                    `}>
                                                        {q.difficulty}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-white/60 text-xs uppercase tracking-wide">{q.category}</td>
                                                <td className="p-5 text-white/40 text-xs font-mono">
                                                    {formatSmartDate(userData?.solvedAt?.[q.id])}
                                                </td>
                                                <td className="p-5 text-right">
                                                    <button
                                                        onClick={() => router.push(`/practice/${q.id}`)}
                                                        className="text-cyan-500 hover:text-cyan-300 text-xs font-bold font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:underline decoration-cyan-500/50 underline-offset-4"
                                                    >
                                                        [Replay]
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {totalHistoryPages > 1 && (
                            <div className="flex justify-center gap-6 mt-8">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 disabled:opacity-30 disabled:cursor-not-allowed text-cyan-400 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="flex items-center font-mono text-xs text-white/40 uppercase tracking-widest">
                                    Page {currentPage} / {totalHistoryPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalHistoryPages, p + 1))}
                                    disabled={currentPage === totalHistoryPages}
                                    className="p-3 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 disabled:opacity-30 disabled:cursor-not-allowed text-cyan-400 transition-all"
                                >
                                    <ChevronNext size={20} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>

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

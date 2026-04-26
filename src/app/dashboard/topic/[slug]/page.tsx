"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle, Play, Lock, Cpu, Sparkles, X, FileText, Code } from "lucide-react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Question } from "@/types/question";
import SystemAuditModal from "@/components/workspace/SystemAuditModal";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { TechGridBackground } from "@/components/ui/tech-grid-background";
import { motion } from "framer-motion";

// Mapping from URL slug to Firestore 'category' field
const SLUG_TO_CATEGORY: Record<string, string> = {
    'math-logic': 'Basic Math & Logic',
    'arrays': 'Arrays',
    'strings': 'Strings',
    'linked-lists': 'Linked Lists',
    'two-pointers': 'Two Pointers',
    'sliding-window': 'Sliding Window',
    'binary-search': 'Binary Search',
    'sorting': 'Sorting Algorithms',
    'recursion': 'Recursion',
    'hashing': 'Hashing (HashMaps)',
    'stacks-queues': 'Stacks & Queues',
    'bit-manipulation': 'Bit Manipulation',
    'binary-trees': 'Binary Trees',
    'bst': 'Binary Search Trees',
    'heaps': 'Heaps',
    'greedy': 'Greedy Algorithms',
    'backtracking': 'Backtracking',
    'dp-1d': '1D Dynamic Programming',
    'dp-2d': '2D Dynamic Programming',
    'graphs': 'Graphs',
};

export default function TopicDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [topicName, setTopicName] = useState<string>("");
    const [solvedIds, setSolvedIds] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<Record<string, any>>({});
    const [selectedReport, setSelectedReport] = useState<any | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Determine Category Name
                const categoryName = SLUG_TO_CATEGORY[slug as string];
                setTopicName(categoryName || "Unknown Topic");

                if (categoryName) {
                    // Fetch Questions
                    const q = query(collection(db, "questions"), where("category", "==", categoryName));
                    const querySnapshot = await getDocs(q);

                    const fetchedQuestions: Question[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedQuestions.push(doc.data() as Question);
                        console.log(fetchedQuestions);
                    });

                    // Sort by order
                    fetchedQuestions.sort((a, b) => a.order - b.order);
                    setQuestions(fetchedQuestions);
                }

                // Fetch User Progress
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setSolvedIds(userDoc.data().solvedQuestionIds || []);
                    }

                    // Fetch Attempts (History)
                    const attemptsSnapshot = await getDocs(collection(db, "users", user.uid, "attempts"));
                    const attemptsMap: Record<string, any> = {};
                    attemptsSnapshot.forEach(doc => {
                        attemptsMap[doc.id] = doc.data();
                    });
                    setAttempts(attemptsMap);
                }

            } catch (error) {
                console.error("Error fetching topic data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
                <TechGridBackground activeColor="text-orange-500" blobColors={["bg-orange-500/10", "bg-amber-600/10"]} baseOpacity={0.2} />
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-400 rounded-full animate-spin" />
                    <div className="text-orange-400 font-mono animate-pulse tracking-widest uppercase">Initializing Stream...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-x-hidden selection:bg-orange-500/30">
            {/* Sci-Fi Background Layer - ORANGE THEME */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <TechGridBackground activeColor="text-orange-500" blobColors={["bg-orange-500/10", "bg-amber-600/10"]} baseOpacity={0.2} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-xl transition-all group backdrop-blur-md"
                        >
                            <ArrowLeft size={20} className="text-white/60 group-hover:text-orange-400 transition-colors" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-widest">
                                    Module Loaded
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white font-mono tracking-tighter uppercase" style={{ textShadow: "0 0 30px rgba(249,115,22,0.3)" }}>
                                {topicName}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
                        <div className="text-right">
                            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Protocol Status</p>
                            <p className="text-lg font-bold text-orange-400">
                                {questions.filter(q => solvedIds.includes(q.id)).length} / {questions.length} <span className="text-sm text-white/50 font-normal">Solved</span>
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 animate-pulse">
                            <Cpu className="w-5 h-5 text-orange-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Grid Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {questions.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center gap-4 bg-white/5 rounded-3xl border border-white/10">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                <Lock className="w-6 h-6 text-white/20" />
                            </div>
                            <p className="text-white/40 font-mono text-lg">No data protocols found for this sector.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {questions.map((q, idx) => {
                                const isSolved = solvedIds.includes(q.id);
                                return (
                                    <motion.div
                                        key={q.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 + 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/50 hover:bg-white/10 transition-all group relative overflow-hidden"
                                    >
                                        {/* Top Row: Status & Difficulty */}
                                        <div className="flex items-start justify-between">
                                            {/* Circle Check or Status */}
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isSolved ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                                                    attempts[q.id]?.verdict === 'NO HIRE' ? 'bg-red-500/20 border-red-500 text-red-400' :
                                                        'bg-white/5 border-white/10 text-white/20'
                                                    }`}>
                                                    {isSolved ? <CheckCircle size={16} /> :
                                                        attempts[q.id]?.verdict === 'NO HIRE' ? <X size={16} /> :
                                                            <Circle size={16} />}
                                                </div>
                                            </div>

                                            {/* Difficulty Badge (ALWAYS VISIBLE) */}
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`text-[10px] px-2 py-1 rounded bg-black/40 border uppercase tracking-wider font-bold ${q.difficulty === 'Easy' ? 'border-emerald-500/30 text-emerald-400' :
                                                    q.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-400' :
                                                        'border-red-500/30 text-red-400'
                                                    }`}>
                                                    {q.difficulty}
                                                </span>

                                                {/* Small Score Indicators (Optional - Keeping for context but removing big Verdict text) */}
                                                {attempts[q.id] && (
                                                    <div className="flex gap-1">
                                                        <span className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-white/60" title="Communication">
                                                            🗣️ {attempts[q.id].communication_score}
                                                        </span>
                                                        <span className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-white/60" title="Technical">
                                                            💻 {attempts[q.id].technical_accuracy}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors font-mono min-h-[56px] line-clamp-2">
                                            {q.title}
                                        </h3>

                                        {/* Bottom Row: Tags & Action */}
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                                            <div className="flex flex-wrap gap-1.5">
                                                {q.logicTags?.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded capitalize">
                                                        {tag.replace(/-/g, ' ')}
                                                    </span>
                                                ))}
                                                {(q.logicTags?.length || 0) > 2 && (
                                                    <span className="text-[10px] text-white/20 px-1">+{q.logicTags!.length - 2}</span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {attempts[q.id] && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedReport(attempts[q.id]);
                                                        }}
                                                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5 hover:border-white/20"
                                                        title="View Report"
                                                    >
                                                        <FileText size={16} />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => setSelectedQuestion(q)}
                                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_10px_rgba(249,115,22,0.0)] hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                                                >
                                                    <Play size={16} fill="currentColor" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div >
            {/* Mode Selection Modal */}
            {selectedQuestion && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedQuestion(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden group"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />

                        <h2 className="text-2xl font-bold text-white mb-2 font-mono">{selectedQuestion.title}</h2>
                        <p className="text-white/40 text-sm mb-8">Select your engagement protocol.</p>

                        <div className="grid grid-cols-1 gap-4">
                            <Link href={`/interview/${selectedQuestion.id}`} className="block">
                                <button className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/50 hover:scale-[1.02] transition-all flex items-center gap-4 group/btn">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-colors text-orange-400">
                                        <Sparkles size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold text-lg group-hover/btn:text-orange-400 transition-colors">AI Interview</div>
                                        <div className="text-white/40 text-xs">Voice & Video • Real-time Feedback</div>
                                    </div>
                                </button>
                            </Link>

                            <Link href={`/practice/${selectedQuestion.id}?mode=practice`} className="block">
                                <button className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:scale-[1.02] transition-all flex items-center gap-4 group/btn">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-colors text-emerald-400">
                                        <Code size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold text-lg group-hover/btn:text-emerald-400 transition-colors">Code Practice</div>
                                        <div className="text-white/40 text-xs">IDE Only • Self-Coded Solutions</div>
                                    </div>
                                </button>
                            </Link>
                        </div>

                        <button
                            onClick={() => setSelectedQuestion(null)}
                            className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}

            <SystemAuditModal
                feedback={selectedReport}
                onClose={() => setSelectedReport(null)}
            />
        </div >
    );
}

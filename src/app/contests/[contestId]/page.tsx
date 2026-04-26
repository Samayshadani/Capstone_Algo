"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Question } from "@/types/question";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Code, Clock, ZapOff, CheckCircle, XCircle, LayoutDashboard } from "lucide-react";
import ProblemDescription from "@/components/workspace/ProblemDescription";
import CodeEditor from "@/components/workspace/CodeEditor";
import { useAuth } from "@/context/AuthContext";
import LiveLeaderboard from "@/components/contests/LiveLeaderboard";
import ContestFooter from "@/components/contests/ContestFooter";

export default function ContestArenaPage() {
    const { user } = useAuth();
    const { contestId } = useParams();
    const router = useRouter();

    const [contest, setContest] = useState<any>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [activeQuestionId, setActiveQuestionId] = useState<string>("");
    
    // Track code per question
    const [codes, setCodes] = useState<Record<string, string>>({});
    const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
    
    // Status tracking per question
    const [solvedStatus, setSolvedStatus] = useState<Record<string, "solved" | "failed" | "unattempted">>({});
    const [currentScore, setCurrentScore] = useState(0);

    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    // Initial Load
    useEffect(() => {
        if (!user || !contestId) return;

        const loadContest = async () => {
            try {
                // Fetch Contest Info
                const cRef = doc(db, "contests", contestId as string);
                const cSnap = await getDoc(cRef);
                if (!cSnap.exists() || cSnap.data().status !== "active") {
                    alert("Contest is not active.");
                    router.push("/contests");
                    return;
                }
                const cData = cSnap.data();
                setContest(cData);

                // Fetch Question details securely (stripping hidden tests)
                const qPromises = cData.problems.map((id: string) =>
                    fetch(`/api/contest/question/${id}`).then(res => res.json())
                );
                const qResults = await Promise.all(qPromises);
                
                const validQuestions = qResults.filter(r => r.success).map(r => r.question);
                setQuestions(validQuestions);
                
                if (validQuestions.length > 0) {
                    setActiveQuestionId(validQuestions[0].id);
                    // Initialize code states
                    const initialCodes: Record<string, string> = {};
                    validQuestions.forEach(q => {
                        initialCodes[q.id] = q.defaultCode["javascript"] || "";
                    });
                    setCodes(initialCodes);
                }

            } catch (error) {
                console.error("Error loading arena:", error);
            } finally {
                setLoading(false);
            }
        };

        loadContest();
    }, [user, contestId, router]);

    // Live Snapshot of the User's Registration (for score and solved status)
    useEffect(() => {
        if (!user || !contestId) return;
        const regId = `${user.uid}_${contestId}`;
        const regRef = doc(db, "contestRegistrations", regId);

        const unsubscribe = onSnapshot(regRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCurrentScore(data.score || 0);
                
                if (data.submissions) {
                    const statuses: Record<string, any> = {};
                    Object.keys(data.submissions).forEach(qId => {
                         statuses[qId] = data.submissions[qId].status;
                    });
                    setSolvedStatus(statuses);
                }
            }
        });

        return () => unsubscribe();
    }, [user, contestId]);

    // Timer Logic
    useEffect(() => {
        if (!contest || !contest.endTime) return;
        const interval = setInterval(() => {
            let endTimeMs = contest.endTime.seconds ? contest.endTime.seconds * 1000 : new Date(contest.endTime).getTime();
            const diff = endTimeMs - Date.now();
            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }
            setTimeLeft({
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [contest]);

    // Handlers
    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
             setCodes(prev => ({ ...prev, [activeQuestionId]: newCode }));
        }
    };

    const handleLanguageChange = (newLang: "javascript" | "python" | "java") => {
        setLanguage(newLang);
        // Reset code for current question to new language default if haven't typed much? 
        // For simplicity, we just keep their typed code, but if they change language it might break. 
        // Since it's a contest, they are responsible.
    };

    if (loading) return <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-slate-400">Loading Arena...</div>;
    
    const activeQuestion = questions.find(q => q.id === activeQuestionId);

    return (
        <div className="h-screen w-full bg-[#050505] flex flex-col overflow-hidden text-slate-200">
            {/* Minimalist Top Contest Bar */}
            <div className="h-14 bg-[#0a0c10] border-b border-indigo-500/20 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push("/contests")} className="text-slate-400 hover:text-white transition-colors">
                        <LayoutDashboard size={18} />
                    </button>
                    <div className="h-5 w-px bg-white/10" />
                    <h1 className="font-bold text-white tracking-wide">{contest?.title}</h1>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-bold uppercase tracking-widest ml-4">
                        <ZapOff size={12} /> AI Disabled
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Score */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</span>
                        <span className="text-xl font-black text-emerald-400">{currentScore}</span>
                    </div>
                    <div className="h-5 w-px bg-white/10" />
                    {/* Timer */}
                    <div className="flex items-center gap-2 font-mono text-lg font-bold text-indigo-400">
                        <Clock size={16} />
                        {timeLeft ? (
                            <span>{String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}</span>
                        ) : "00:00:00"}
                    </div>
                    <button 
                         onClick={() => setShowLeaderboard(!showLeaderboard)}
                         className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all border ${showLeaderboard ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700'}`}
                    >
                        {showLeaderboard ? 'Hide Leaderboard' : 'Live Leaderboard'}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {showLeaderboard ? (
                    <LiveLeaderboard contestId={contestId as string} onClose={() => setShowLeaderboard(false)} />
                ) : (
                    <ResizablePanelGroup direction="horizontal">
                        
                        {/* LEFT PANEL: Problem Details */}
                        <ResizablePanel defaultSize={40} minSize={20}>
                            <div className="h-full flex flex-col bg-[#0a0c10]">
                                {/* Problem Tabs */}
                                <div className="flex bg-[#050505] p-2 gap-2 border-b border-white/5 overflow-x-auto custom-scrollbar shrink-0">
                                    {questions.map((q, idx) => (
                                        <button
                                            key={q.id}
                                            onClick={() => setActiveQuestionId(q.id)}
                                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                                                ${activeQuestionId === q.id 
                                                    ? 'bg-slate-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10' 
                                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 border border-transparent'}
                                            `}
                                        >
                                            <span className="text-xs opacity-50">#{(idx + 1)}</span>
                                            {q.title}
                                            {solvedStatus[q.id] === 'solved' && <CheckCircle size={14} className="text-emerald-500" />}
                                            {solvedStatus[q.id] === 'failed' && <XCircle size={14} className="text-red-500" />}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Problem Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    {/* Enforce overlay if disabled */}
                                    {solvedStatus[activeQuestionId] === 'solved' && (
                                        <div className="absolute inset-0 z-50 bg-emerald-950/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                                            <div className="bg-emerald-950/80 border border-emerald-500/30 px-6 py-3 rounded-full text-emerald-400 font-bold flex items-center gap-2 shadow-2xl">
                                                <CheckCircle size={20} /> Solved Successfully
                                            </div>
                                        </div>
                                    )}
                                    {activeQuestion && <ProblemDescription question={activeQuestion} />}
                                </div>
                            </div>
                        </ResizablePanel>

                        <ResizableHandle className="w-1.5 bg-slate-900 border-l border-r border-white/5 hover:bg-indigo-500/20 transition-colors" />

                        {/* RIGHT PANEL: Editor */}
                        <ResizablePanel defaultSize={60} minSize={30}>
                            <div className="h-full flex flex-col pt-2 bg-[#050505]">
                                <div className="flex-1 overflow-hidden">
                                     {activeQuestion && (
                                         <CodeEditor
                                            question={activeQuestion}
                                            language={language}
                                            setLanguage={handleLanguageChange}
                                            code={codes[activeQuestionId] || ""}
                                            setCode={(c) => handleCodeChange(c)}
                                            onFirstKeystroke={() => {}}
                                         />
                                     )}
                                </div>
                                <ContestFooter 
                                    contestId={contestId as string}
                                    question={activeQuestion}
                                    code={codes[activeQuestionId] || ""}
                                    language={language}
                                    isSolved={solvedStatus[activeQuestionId] === 'solved'}
                                />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </div>
    );
}

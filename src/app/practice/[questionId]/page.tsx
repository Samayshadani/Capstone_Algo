"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Question } from "@/types/question";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sparkles, Mic, Code } from "lucide-react";
import ProblemDescription from "@/components/workspace/ProblemDescription";
import CodeEditor from "@/components/workspace/CodeEditor";
import EditorFooter from "@/components/workspace/EditorFooter";
import { useRef } from "react";
import AIPanel from "@/components/workspace/AIPanel";
import AiTutorPanel from "@/components/workspace/AiTutorPanel";
import VictoryOverlay from "@/components/game/VictoryOverlay";
import { useAuth } from "@/context/AuthContext";
import { TOPIC_ID_TO_CATEGORY } from "@/lib/allQuestions";
import { getXPForDifficulty } from "@/lib/gamification";
import Timer from "@/components/workspace/Timer";

export default function PracticePage() {
    const { user } = useAuth();
    const { questionId } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [currentXP, setCurrentXP] = useState(0); // Real XP

    // Editor State
    const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
    const [code, setCode] = useState("");

    // UI State
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
    const [showVictory, setShowVictory] = useState(false); // Victory State
    const [showLobby, setShowLobby] = useState(mode !== "practice"); // Initial Mode Selection - Skip if mode is pre-defined

    // AI State
    const [history, setHistory] = useState<any[]>([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"problem" | "ai">("problem");
    const [hasUnreadAi, setHasUnreadAi] = useState(false); // Red Dot State
    const [hasStartedTyping, setHasStartedTyping] = useState(false); // Track first keystroke
    const timerRef = useRef<any>(null);

    // Fetch User XP (Real-time)
    useEffect(() => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setCurrentXP(data.xp || 0);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Fetch Question
    useEffect(() => {
        if (!questionId) return;

        const fetchQuestion = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "questions", questionId as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const qData = docSnap.data() as Question;
                    setQuestion(qData);
                    // Set default code based on current language
                    setCode(qData.defaultCode[language] || "");

                    // NEW: Track Last Active Question for "Resume" Banner
                    if (user) {
                        const userRef = doc(db, "users", user.uid);
                        await updateDoc(userRef, {
                            lastActiveQuestionId: questionId,
                            lastActiveTimestamp: serverTimestamp()
                        });
                    }

                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching question:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [questionId, user]);

    // Added: Update code when language changes
    useEffect(() => {
        if (question) {
            setCode(question.defaultCode[language] || "");
        }
    }, [language, question]);

    const handleRun = () => {
        alert("Running Code... (Logic coming soon)");
    };

    const handleSubmit = () => {
        alert("Submitting Code... (Logic coming soon)");
    };

    const handleSendMessage = async (userMessage: string) => {
        // Add User Message (Visible)
        const newHistory = [...history, { role: "user", text: userMessage }];
        setHistory(newHistory);
        setAiLoading(true);
        setActiveTab("ai"); // Force switch on manual chat
        setHasUnreadAi(false); // Clear dot if user is typing

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    history: newHistory.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
                    message: userMessage,
                    context: {
                        code,
                        language,
                        questionTitle: question?.title,
                    }
                }),
            });

            const data = await response.json();
            if (data.text) {
                setHistory(prev => [...prev, { role: "model", text: data.text }]);
            }
        } catch (error) {
            console.error("AI Error:", error);
            setHistory(prev => [...prev, { role: "model", text: "Something went wrong." }]);
        } finally {
            setAiLoading(false);
        }
    };

    // "Ghost" Trigger - Silent send
    const handleRunComplete = async (result: { stdout: string; stderr: string; isSuccess: boolean }) => {
        setAiLoading(true);
        // Do NOT add user message to history.
        // If Error -> Switch tab immediately.
        if (!result.isSuccess) {
            setActiveTab("ai");
            setHasUnreadAi(false);
        } else {
            // If Success -> Don't switch, just show Red Dot.
            setHasUnreadAi(true);
        }

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
                    message: "", // Empty message signals "System Event" to our updated API
                    context: {
                        code,
                        language,
                        questionTitle: question?.title,
                        executionResult: result // Pass the full result object
                    }
                }),
            });

            const data = await response.json();
            if (data.text) {
                // Append AI response ONLY
                setHistory(prev => [...prev, { role: "model", text: data.text }]);
            }
        } catch (error) {
            console.error("AI Ghost Error:", error);
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-slate-400">Loading Workspace...</div>;
    if (notFound || !question) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-white">Problem Not Found</div>;

    return (
        <div className="h-screen w-full bg-slate-950 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal">

                    {/* LEFT PANEL: Description OR AI */}
                    <ResizablePanel defaultSize={40} minSize={20}>
                        <div className="flex flex-col h-full relative">
                            {/* Tabs Switcher for Left Panel */}
                            <div className="absolute top-4 right-6 z-10 flex items-center gap-3">
                                {/* Timer Component */}
                                <Timer 
                                    questionId={questionId as string}
                                    onTimerStart={() => console.log("Timer started")}
                                    onTimerStop={(elapsed) => console.log("Timer stopped:", elapsed)}
                                />
                                
                                <div className="flex bg-slate-900/80 p-1 rounded-lg backdrop-blur-sm border border-white/5 shadow-lg">
                                <button
                                    onClick={() => setActiveTab("problem")}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'problem' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    Problem
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab("ai");
                                        setHasUnreadAi(false);
                                    }}
                                    className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-indigo-300'}`}
                                >
                                    <Sparkles size={12} />
                                    AI Tutor
                                    {/* Red Dot Notification */}
                                    {hasUnreadAi && activeTab !== 'ai' && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                            {activeTab === "problem" ? (
                                <ProblemDescription question={question} />
                            ) : (
                                <AiTutorPanel
                                    history={history}
                                    setHistory={setHistory}
                                    isLoading={aiLoading}
                                    onSendMessage={handleSendMessage}
                                />
                            )}
                        </div>
                    </ResizablePanel>

                    <ResizableHandle className="w-1.5 bg-slate-900 border-l border-r border-white/5 hover:bg-blue-500/20 transition-colors" />

                    {/* RIGHT PANEL: Editor & Tools */}
                    <ResizablePanel defaultSize={60} minSize={30}>
                        <div className="h-full flex flex-col">
                            {/* Top: Editor */}
                            <div className="flex-1 overflow-hidden">
                                <CodeEditor
                                    question={question}
                                    language={language}
                                    setLanguage={setLanguage}
                                    code={code}
                                    setCode={setCode}
                                    onFirstKeystroke={() => setHasStartedTyping(true)}
                                />
                            </div>

                            {/* Bottom: Footer */}
                            <EditorFooter
                                code={code}
                                language={language}
                                difficulty={question?.difficulty || "Easy"}
                                questionTitle={question?.title || "Unknown Problem"}
                                category={question?.category}
                                testCases={question?.testCases}
                                onSubmit={handleSubmit}
                                onAiToggle={() => setActiveTab(prev => prev === 'ai' ? 'problem' : 'ai')}
                                isAiOpen={activeTab === 'ai'}
                                onRunComplete={handleRunComplete}
                                onSuccess={() => setShowVictory(true)}
                                onHint={() => {
                                    setActiveTab("ai");
                                    handleSendMessage("Can you give me a small hint about the next step? Don't give me the answer.");
                                }}
                            />
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>

            <VictoryOverlay
                show={showVictory}
                questionTitle={question?.title || "Unknown Problem"}
                xpEarned={question ? getXPForDifficulty(question.difficulty) : 20}
                currentXP={currentXP} // Real User XP
                userId={user?.uid || ""}
                onClose={() => setShowVictory(false)}
                topicId={question ? Object.keys(TOPIC_ID_TO_CATEGORY).find(key => TOPIC_ID_TO_CATEGORY[key] === question.category) : undefined}
                elapsedTime={(window as any).timerControl?.getElapsed?.()}
            />

            {/* Pre-Lobby / Mode Selection Modal */}
            {showLobby && !loading && question && (
                <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-white">Choose Your Mode</h2>
                            <p className="text-slate-400">How would you like to tackle <span className="text-indigo-400 font-semibold">{question.title}</span>?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Option 1: Interview */}
                            <button
                                onClick={() => router.push(`/interview/${questionId}`)}
                                className="group relative p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all text-left space-y-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20"
                            >
                                <div className="p-3 bg-indigo-500/20 rounded-xl w-fit group-hover:bg-white/20 transition-colors">
                                    <Mic size={24} className="text-indigo-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Mock Interview</h3>
                                    <p className="text-sm text-slate-400 group-hover:text-indigo-100">Discuss approach logic via voice/chat before coding.</p>
                                </div>
                            </button>

                            {/* Option 2: Coding */}
                            <button
                                onClick={() => setShowLobby(false)}
                                className="group relative p-6 rounded-2xl bg-slate-800 border border-white/5 hover:bg-emerald-600 hover:border-emerald-500/50 hover:text-white transition-all text-left space-y-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20"
                            >
                                <div className="p-3 bg-slate-700 rounded-xl w-fit group-hover:bg-white/20 transition-colors">
                                    <Code size={24} className="text-emerald-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Code Directly</h3>
                                    <p className="text-sm text-slate-400 group-hover:text-emerald-100">Jump straight into the IDE and start solving.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Code, MessageSquare, Send, Keyboard, Mic as MicIcon, ArrowLeft, Sparkles } from "lucide-react";
import { useInterviewLogic, InterviewMode } from "@/hooks/useInterviewLogic";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import CodeEditor from "@/components/workspace/CodeEditor";
import ConfidenceCamera from "@/components/workspace/ConfidenceCamera";
import SystemAuditModal from "@/components/workspace/SystemAuditModal";
import { X } from "lucide-react";

export default function InterviewPage() {
    const { questionId } = useParams();
    const router = useRouter();
    const [questionTitle, setQuestionTitle] = useState("Loading...");

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
    const [showEditor, setShowEditor] = useState(false);

    const { user } = useAuth(); // Auth context

    // logic hook
    const {
        mode, setMode, messages, processing, sendMessage,
        isListening, isSpeaking, transcript, startListening, stopListening, hasBrowserSupport, error: voiceError,
        endInterview, feedback, updateViperStats
    } = useInterviewLogic(questionId as string, questionTitle, code, user?.uid || null);

    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showAnalysis, setShowAnalysis] = useState<'communication' | 'technical' | null>(null);

    // Fetch Question
    useEffect(() => {
        if (!questionId) return;
        const fetchQ = async () => {
            const snap = await getDoc(doc(db, "questions", questionId as string));
            if (snap.exists()) {
                setQuestionTitle(snap.data().title);
            }
        };
        fetchQ();
    }, [questionId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleTextSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim()) return;
        sendMessage(inputText);
        setInputText("");
    };

    // If no browser support for voice, force text mode
    useEffect(() => {
        if (!hasBrowserSupport && mode === "voice") {
            setMode("text");
        }
    }, [hasBrowserSupport, mode, setMode]);

    return (
        <div className="h-screen bg-[#050B14] flex flex-col items-center relative overflow-hidden font-outfit text-white selection:bg-cyan-500/30">

            {/* --- BACKGROUND EFFECTS --- */}
            {/* Deep Space Atmosphere - Subtle Blue Tint */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

            {/* Header */}
            <div className="z-20 w-full max-w-4xl p-6 flex items-center justify-between backdrop-blur-md bg-[#050B14]/80 border-b border-white/5 sticky top-0 rounded-b-3xl">
                <div className="flex items-center gap-4">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-950/30 transition-all"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">Back</span>
                    </button>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-500 text-[10px] font-bold tracking-[0.2em] uppercase">System Active</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-200 tracking-tight">{questionTitle}</h1>
                    </div>
                </div>

                {/* Mode Toggle - Sleek Segmented Control */}
                <div className="flex bg-black/40 rounded-full p-1 border border-white/10 backdrop-blur-sm relative">
                    {/* Sliding Background */}
                    <motion.div
                        initial={false}
                        animate={{ x: mode === 'voice' ? 0 : '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-cyan-900/30 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-full z-0"
                    />

                    <button
                        onClick={() => hasBrowserSupport && setMode("voice")}
                        disabled={!hasBrowserSupport}
                        title={!hasBrowserSupport ? "Voice not supported in this browser" : "Voice Mode"}
                        className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${mode === 'voice' ? 'text-cyan-100' : 'text-slate-500 hover:text-slate-300'} ${!hasBrowserSupport && 'opacity-50 cursor-not-allowed'}`}
                    >
                        <MicIcon size={12} />
                        Voice
                    </button>
                    <button
                        onClick={() => setMode("text")}
                        className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${mode === 'text' ? 'text-cyan-100' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Keyboard size={12} />
                        Text
                    </button>
                </div>

                <button
                    onClick={() => setShowEditor(true)}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-950/30 transition-all text-sm font-bold text-slate-300 hover:text-cyan-400"
                >
                    <Code size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <span>Open Editor</span>
                </button>
            </div>

            {/* --- CODE EDITOR MODAL (HAWKEYE) --- */}
            <AnimatePresence>
                {showEditor && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-4 z-50 bg-[#0a0a0a] border border-cyan-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-white/10">
                            <span className="text-sm font-bold text-cyan-400 tracking-wider uppercase">Live Coding Environment</span>
                            <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        {/* Editor Body */}
                        <div className="flex-1 relative">
                            <CodeEditor
                                question={{ title: questionTitle } as any}
                                language={language}
                                setLanguage={setLanguage}
                                code={code}
                                setCode={setCode}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="flex-1 w-full max-w-3xl relative flex flex-col z-10">

                {/* FEEDBACK OVERLAY - SYSTEM AUDIT REPORT */}
                <SystemAuditModal feedback={feedback} onClose={() => { }} showReturnButton={true} />



                {/* Voice Mode Visuals - The "Jarvis Core" */}
                <AnimatePresence mode="wait">
                    {mode === "voice" && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center -mt-10"
                        >
                            {/* JARVIS CORE */}
                            <div className="relative mb-20 group cursor-pointer" onClick={isListening ? stopListening : startListening}>

                                {/* Outer Ring (Static UI) */}
                                <div className="absolute -inset-8 border border-cyan-900/30 rounded-full scale-100 md:scale-125" />
                                <div className="absolute -inset-8 border border-t-cyan-500/20 border-r-transparent border-b-transparent border-l-transparent rounded-full scale-100 md:scale-125 rotate-45" />

                                {/* Core Container */}
                                <div className="relative w-40 h-40 flex items-center justify-center">

                                    {/* STATE: LISTENING (Breathing Pulse) */}
                                    {isListening && (
                                        <>
                                            <motion.div initial={{ scale: 1, opacity: 0.2 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute inset-0 bg-cyan-400 rounded-full blur-md" />
                                            <motion.div initial={{ scale: 1, opacity: 0.1 }} animate={{ scale: 2, opacity: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" }} className="absolute inset-0 bg-cyan-500 rounded-full blur-xl" />
                                        </>
                                    )}

                                    {/* STATE: PROCESSING (Segmented Rotation) */}
                                    {processing && (
                                        <>
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-b-cyan-400 rounded-full" />
                                            <motion.div animate={{ rotate: -180 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-2 border-2 border-transparent border-l-cyan-600 border-r-cyan-600 rounded-full opacity-50" />
                                        </>
                                    )}

                                    {/* STATE: SPEAKING (Waveform Ripple - Simulated) */}
                                    {isSpeaking && (
                                        <>
                                            <motion.div animate={{ scale: [1, 1.05, 1], borderColor: ["#06b6d44a", "#22d3ee", "#06b6d44a"] }} transition={{ repeat: Infinity, duration: 0.4 }} className="absolute inset-0 border-4 border-cyan-400/30 rounded-full" />
                                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 border border-cyan-500/20 rounded-full" />
                                        </>
                                    )}

                                    {/* INNER CORE (The Actual Button) */}
                                    <div className={`
                                        relative w-32 h-32 rounded-full flex items-center justify-center 
                                        bg-[#050B14] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]
                                        z-20 transition-all duration-300
                                        ${isListening ? 'shadow-[0_0_50px_rgba(6,182,212,0.4)] border-cyan-400/50' : ''}
                                        group-hover:scale-105 group-hover:border-cyan-400/50
                                    `}>
                                        {/* Core Glow */}
                                        <div className="absolute inset-0 rounded-full bg-radial-gradient from-cyan-500/10 to-transparent opacity-50" />

                                        {/* Icon - Logo with Screen Blend to remove black bg */}
                                        <div className={`relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${isListening ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'opacity-80 group-hover:opacity-100'}`}>
                                            <img
                                                src="/algo-logo.png"
                                                alt="AlgoSensei Logo"
                                                className="w-full h-full object-cover mix-blend-screen hover:mix-blend-normal transition-all duration-300 scale-110"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Status Text - Typewriter style */}
                            <div className="text-center h-32 px-4 w-full max-w-2xl mx-auto space-y-4 overflow-y-auto scrollbar-hide">
                                <AnimatePresence mode="wait">
                                    {isListening ? (
                                        <motion.div
                                            key="listening"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="space-y-2"
                                        >
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase animate-pulse">Listening</span>
                                            <p className="text-xl font-light text-slate-300 leading-relaxed">
                                                "{transcript}"
                                            </p>
                                        </motion.div>
                                    ) : processing ? (
                                        <motion.div
                                            key="processing"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="space-y-2"
                                        >
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase">Analyzing</span>
                                            <div className="flex justify-center gap-1">
                                                <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" />
                                                <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce delay-75" />
                                                <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </motion.div>
                                    ) : isSpeaking ? (
                                        <motion.div
                                            key="speaking"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="space-y-2"
                                        >
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase">Responding</span>
                                            {messages.length > 0 && (
                                                <p className="text-lg text-emerald-100/90 leading-relaxed font-light">
                                                    {messages[messages.length - 1].content}
                                                </p>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        >
                                            {voiceError ? (
                                                <>
                                                    <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">System Error</span>
                                                    <p className="text-red-400 mt-2 text-sm">{voiceError}</p>
                                                    <p className="text-slate-600 text-xs mt-1">Tap core to retry connection</p>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase">System Ready</span>
                                                    <p className="text-slate-500 mt-2 text-sm">Tap core to initiate sequence</p>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Text Mode Visuals - Clean Glass Panel */}
                <AnimatePresence>
                    {mode === "text" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                            className="absolute inset-0 flex flex-col z-10 mx-4 mt-2"
                        >
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
                                {messages.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                        <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-4">
                                            <MessageSquare size={20} className="text-slate-600" />
                                        </div>
                                        <p className="text-sm tracking-wide uppercase font-bold text-slate-700">Comms Link Established</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        key={i}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`p-4 max-w-[85%] text-sm leading-relaxed backdrop-blur-md ${msg.role === 'user'
                                            ? 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-100 rounded-2xl rounded-tr-sm'
                                            : 'bg-white/5 border border-white/5 text-slate-300 rounded-2xl rounded-tl-sm shadow-sm'
                                            }`}>
                                            <span className="block text-[10px] font-bold tracking-widest uppercase mb-1 opacity-50">
                                                {msg.role === 'user' ? 'Candidate' : 'System'}
                                            </span>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {processing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-pulse" />
                                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-pulse delay-150" />
                                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-pulse delay-300" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Bar - Industrial */}
                            <div className="p-4 bg-[#050B14]/80 border-t border-white/5 backdrop-blur-md">
                                <form onSubmit={handleTextSubmit} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Input query..."
                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-5 py-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all font-mono text-sm"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim() || processing}
                                        className="p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-lg hover:bg-cyan-900/40 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-cyan-400"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            {/* --- VIPER VISION CAMERA --- */}
            <ConfidenceCamera onConfidenceUpdate={updateViperStats} />

        </div>
    );
}

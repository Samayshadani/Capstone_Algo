"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MicIcon, Keyboard, MessageSquare, Send, Sparkles } from "lucide-react";
import { Question } from "@/hooks/useResumeInterview";
import { useVoiceInterface } from "@/hooks/useVoiceInterface";
import ConfidenceCamera from "@/components/workspace/ConfidenceCamera";

interface Props {
    questions: Question[];
    currentIndex: number;
    currentAnswer: string;
    setCurrentAnswer: (val: string) => void;
    onSubmit: (overrideAnswer?: string) => void;
    onFinal: (overrideAnswer?: string) => void;
    isLast: boolean;
}

export default function VoiceInterviewPanel({
    questions,
    currentIndex,
    currentAnswer,
    setCurrentAnswer,
    onSubmit,
    onFinal,
    isLast,
}: Props) {
    const question = questions[currentIndex];
    const {
        isListening,
        isSpeaking,
        transcript,
        startListening,
        stopListening,
        clearTranscript,
        speak,
        hasBrowserSupport,
        error: voiceError
    } = useVoiceInterface();

    const [mode, setMode] = useState<"voice" | "text">("voice");
    const [processing, setProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    // If no browser support, fallback to text
    useEffect(() => {
        if (!hasBrowserSupport && mode === "voice") {
            setMode("text");
        }
    }, [hasBrowserSupport, mode]);

    // When the question changes, reset processing, clear text input, and speak the question
    useEffect(() => {
        setProcessing(false);
        setCurrentAnswer("");
        clearTranscript();
        
        // Add the question to the chat history
        setMessages(prev => [...prev, { role: "system", content: question.text }]);
        
        // Speak the question if in voice mode
        if (mode === "voice") {
            speak(question.text);
        }
    }, [currentIndex, question.text, mode]); // removed speak/clear from dep array as it causes issues

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleVoiceSubmit = async (voiceText: string) => {
        setProcessing(true);
        setCurrentAnswer(voiceText);
        setMessages(prev => [...prev, { role: "user", content: voiceText }]);
        
        // Slight delay to simulate processing before moving to next question
        setTimeout(() => {
            if (isLast) onFinal(voiceText);
            else onSubmit(voiceText);
        }, 1000);
    };

    const handleTextSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!currentAnswer.trim()) return;

        setProcessing(true);
        const textToSubmit = currentAnswer;
        setMessages(prev => [...prev, { role: "user", content: textToSubmit }]);
        
        setTimeout(() => {
            if (isLast) onFinal(textToSubmit);
            else onSubmit(textToSubmit);
        }, 1000);
    };

    return (
        <div className="w-full flex flex-col items-center relative min-h-[600px] mt-8">
            
            {/* VIPER CAMERA OVERLAY */}
            <ConfidenceCamera onConfidenceUpdate={() => {}} />

            {/* HEADER - Mode Toggle & Status */}
            <div className="z-20 w-full max-w-4xl p-6 flex justify-between items-center bg-[#050B14]/80 border border-white/5 backdrop-blur-md rounded-3xl mb-8 shadow-2xl shadow-cyan-900/10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-cyan-500 text-[10px] font-bold tracking-[0.2em] uppercase">System Active</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-200">AI Evaluation: {question.difficulty}</h2>
                    <p className="text-xs text-slate-500 font-mono">Question {currentIndex + 1} of {questions.length}</p>
                </div>

                <div className="flex bg-black/40 rounded-full p-1 border border-white/10 backdrop-blur-sm relative">
                    <motion.div
                        initial={false}
                        animate={{ x: mode === 'voice' ? 0 : '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-cyan-900/30 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-full z-0"
                    />

                    <button
                        onClick={() => hasBrowserSupport && setMode("voice")}
                        disabled={!hasBrowserSupport}
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
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 w-full max-w-3xl relative flex flex-col z-10">
                
                <AnimatePresence mode="wait">
                    {mode === "voice" && (
                        <motion.div
                            key="voice-mode"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center mt-12"
                        >
                            {/* JARVIS CORE */}
                            <div className="relative mb-20 group cursor-pointer" onClick={isListening ? stopListening : startListening}>
                                {/* Outer Ring */}
                                <div className="absolute -inset-8 border border-cyan-900/30 rounded-full scale-100 md:scale-125" />
                                <div className="absolute -inset-8 border border-t-cyan-500/20 border-r-transparent border-b-transparent border-l-transparent rounded-full scale-100 md:scale-125 rotate-45" />

                                {/* Core */}
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    {isListening && (
                                        <>
                                            <motion.div initial={{ scale: 1, opacity: 0.2 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-cyan-400 rounded-full blur-md" />
                                            <motion.div initial={{ scale: 1, opacity: 0.1 }} animate={{ scale: 2, opacity: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute inset-0 bg-cyan-500 rounded-full blur-xl" />
                                        </>
                                    )}
                                    {processing && (
                                        <>
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-b-cyan-400 rounded-full" />
                                            <motion.div animate={{ rotate: -180 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-2 border-2 border-transparent border-l-cyan-600 border-r-cyan-600 rounded-full opacity-50" />
                                        </>
                                    )}
                                    {isSpeaking && (
                                        <>
                                            <motion.div animate={{ scale: [1, 1.05, 1], borderColor: ["#06b6d44a", "#22d3ee", "#06b6d44a"] }} transition={{ repeat: Infinity, duration: 0.4 }} className="absolute inset-0 border-4 border-cyan-400/30 rounded-full" />
                                        </>
                                    )}

                                    <div className={`relative w-32 h-32 rounded-full flex items-center justify-center bg-[#050B14] border border-cyan-500/30 z-20 transition-all duration-300 ${isListening ? 'shadow-[0_0_50px_rgba(6,182,212,0.4)] border-cyan-400/50' : ''}`}>
                                        <div className="absolute inset-0 rounded-full bg-radial-gradient from-cyan-500/10 to-transparent opacity-50" />
                                        <div className={`relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${isListening ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'opacity-80 group-hover:opacity-100'}`}>
                                            <img src="/algo-logo.png" alt="AlgoSensei Logo" className="w-full h-full object-cover mix-blend-screen scale-110" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Text */}
                            <div className="text-center h-32 px-4 w-full max-w-2xl mx-auto space-y-4">
                                <AnimatePresence mode="wait">
                                    {isListening ? (
                                        <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase animate-pulse">Listening</span>
                                            <p className="text-xl font-light text-slate-300">"{transcript}"</p>
                                        </motion.div>
                                    ) : processing ? (
                                        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase">Processing</span>
                                        </motion.div>
                                    ) : isSpeaking ? (
                                        <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase">Question #{currentIndex + 1}</span>
                                            <p className="text-lg text-emerald-100/90 font-light">{question.text}</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            {voiceError ? (
                                                <>
                                                    <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">System Error</span>
                                                    <p className="text-red-400 mt-2 text-sm">{voiceError}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase">System Ready</span>
                                                    <div className="flex flex-col items-center gap-4 mt-2">
                                                        {transcript ? (
                                                            <p className="text-xl font-light text-slate-300 line-clamp-2">"{transcript}"</p>
                                                        ) : (
                                                            <p className="text-slate-500 text-sm">Tap core to speak, or skip to the next question.</p>
                                                        )}
                                                        <button 
                                                            onClick={() => handleVoiceSubmit(transcript || "(Skipped)")}
                                                            className="px-6 py-2.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                                        >
                                                            {transcript ? "Submit Answer" : "Skip Question"}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {mode === "text" && (
                        <motion.div key="text-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col z-10 w-full h-[500px]">
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                                {messages.map((msg, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-4 max-w-[85%] text-sm leading-relaxed backdrop-blur-md ${msg.role === 'user' ? 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-100 rounded-2xl rounded-tr-sm' : 'bg-white/5 border border-white/5 text-slate-300 rounded-2xl rounded-tl-sm'}`}>
                                            <span className="block text-[10px] font-bold tracking-widest uppercase mb-1 opacity-50">{msg.role === 'user' ? 'Candidate' : 'System'}</span>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 bg-[#050B14]/80 border-t border-white/5 backdrop-blur-md">
                                <form onSubmit={handleTextSubmit} className="flex gap-3">
                                    <input type="text" value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} placeholder="Type your answer..." className="flex-1 bg-black/40 border border-white/10 rounded-lg px-5 py-4 text-white focus:border-cyan-500/50 outline-none" autoFocus />
                                    <button type="submit" disabled={!currentAnswer.trim() || processing} className="p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-900/40">
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

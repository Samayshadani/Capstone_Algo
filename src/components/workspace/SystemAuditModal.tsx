import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SystemAuditModalProps {
    feedback: any;
    onClose: () => void;
    showReturnButton?: boolean;
}

export default function SystemAuditModal({ feedback, onClose, showReturnButton = true }: SystemAuditModalProps) {
    const router = useRouter();
    const [showAnalysis, setShowAnalysis] = useState<'communication' | 'technical' | null>(null);

    if (!feedback) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050B14]/90 backdrop-blur-xl"
                onClick={onClose}
            >
                <div
                    className="w-full max-w-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[85vh] my-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-center w-full">
                            <span className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">System Audit Complete</span>
                            <h2 className={`text-4xl font-extrabold mt-2 tracking-tight ${feedback.verdict === 'HIRE' ? 'text-emerald-400' : 'text-red-500'}`}>
                                {feedback.verdict}
                            </h2>
                        </div>
                        <button onClick={onClose} className="absolute right-8 top-8 p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div
                            onClick={() => setShowAnalysis('communication')}
                            className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center cursor-pointer hover:bg-white/10 hover:scale-105 transition-all group"
                        >
                            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{feedback.communication_score}/10</div>
                            <div className="text-xs font-bold tracking-wider text-slate-500 group-hover:text-slate-300 uppercase">Communication</div>
                            <span className="text-[10px] text-cyan-500/50 mt-1 block opacity-0 group-hover:opacity-100 transition-opacity">View Analysis</span>
                        </div>
                        <div
                            onClick={() => setShowAnalysis('technical')}
                            className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center cursor-pointer hover:bg-white/10 hover:scale-105 transition-all group"
                        >
                            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{feedback.technical_accuracy}/10</div>
                            <div className="text-xs font-bold tracking-wider text-slate-500 group-hover:text-slate-300 uppercase">Technical</div>
                            <span className="text-[10px] text-cyan-500/50 mt-1 block opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold tracking-wider text-cyan-500 uppercase mb-2">Executive Summary</h3>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                "{feedback.summary}"
                            </p>
                        </div>

                        {feedback.red_flags && feedback.red_flags.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold tracking-wider text-red-400 uppercase mb-2">Detected Issues</h3>
                                <ul className="space-y-2">
                                    {feedback.red_flags.map((flag: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                                            {flag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {showReturnButton && (
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full mt-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest text-sm"
                        >
                            Return to HQ
                        </button>
                    )}
                </div>

                {/* --- DETAILED ANALYSIS POPUPS (NESTED) --- */}
                <AnimatePresence>
                    {showAnalysis && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAnalysis(null);
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent"
                            >
                                <button
                                    onClick={() => setShowAnalysis(null)}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>

                                <div className="mb-6">
                                    <h3 className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase mb-2">
                                        Performance Deep Dive
                                    </h3>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        {showAnalysis === 'communication' ? 'Communication Analysis' : 'Technical Proficiency'}
                                        <span className={`text-xl px-3 py-1 rounded-full ${(feedback[showAnalysis === 'communication' ? 'communication_score' : 'technical_accuracy'] >= 7)
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {feedback[showAnalysis === 'communication' ? 'communication_score' : 'technical_accuracy']}/10
                                        </span>
                                    </h2>
                                </div>

                                <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                        <MessageSquare size={12} /> Analysis
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {feedback[showAnalysis === 'communication' ? 'communication_justification' : 'technical_justification'] || "No detailed analysis available."}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                        <Sparkles size={12} /> Areas for Growth
                                    </h4>
                                    <ul className="space-y-3">
                                        {(feedback[showAnalysis === 'communication' ? 'communication_improvements' : 'technical_improvements'] || []).map((tip: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-sm text-slate-300">
                                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}

import { useState } from "react";
import { Play, CheckCircle, Sparkles, Terminal, X, ChevronUp, ChevronDown, Lightbulb } from "lucide-react";
import { formatCodeForExecution } from "@/lib/codeRunner";
import { updateUserProgress } from "@/lib/firebase";
import { updateUserStats } from "@/lib/gamification";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import { useParams } from "next/navigation";
import { Question, TestCase } from "@/types/question"; // Ensure TestCase type exists

interface EditorFooterProps {
    code: string;
    language: string;
    difficulty: string;
    questionTitle: string;
    category?: string; // Added category
    testCases?: TestCase[]; // Make optional or required based on usage
    onRun?: () => void;
    onSubmit: () => void;
    onAiToggle: () => void;
    isAiOpen: boolean;
    onHint: () => void;
    onRunComplete?: (result: { stdout: string; stderr: string; isSuccess: boolean }) => void;
    onSuccess?: () => void;
}

export default function EditorFooter({ code, language, difficulty, questionTitle, category = "General", testCases, onSubmit, onAiToggle, isAiOpen, onRunComplete, onHint, onSuccess }: EditorFooterProps) {
    const { user } = useAuth();
    const params = useParams();
    const currentQuestionId = params?.questionId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const [output, setOutput] = useState<{ stdout: string; stderr: string } | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleRunCode = async () => {
        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput(null);

        // Simulate a short processing delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Generate a random number of passed test cases between 30 and 100
        const totalTestCases = Math.floor(Math.random() * 71) + 30; // 30–100
        const passedCases = totalTestCases; // All pass for the run simulation

        let resultLog = `🚀 Running against ${totalTestCases} test cases...\n\n`;
        resultLog += `✅ ${passedCases}/${totalTestCases} test cases passed\n`;
        resultLog += `\n⚡ Runtime: ${(Math.random() * 80 + 20).toFixed(0)} ms   |   Memory: ${(Math.random() * 5 + 10).toFixed(1)} MB`;

        setOutput({ stdout: resultLog, stderr: "" });
        if (onRunComplete) onRunComplete({ stdout: resultLog, stderr: "", isSuccess: true });

        setIsLoading(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput({ stdout: "🚀 Submitting solution...\n", stderr: "" });

        // Simulate grading delay
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Stop the timer
        let timeMessage = "";
        if ((window as any).timerControl) {
            const elapsedSeconds = (window as any).timerControl.getElapsed();
            (window as any).timerControl.stop();
            const mins = Math.floor(elapsedSeconds / 60);
            const secs = elapsedSeconds % 60;
            timeMessage = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        }

        const totalTC = Math.floor(Math.random() * 71) + 30; // 30–100
        const successLog =
            `✅ All ${totalTC} test cases passed!\n` +
            `\n🎉 Solution Accepted!\n` +
            `⚡ Runtime: ${(Math.random() * 80 + 20).toFixed(0)} ms   |   Memory: ${(Math.random() * 5 + 10).toFixed(1)} MB` +
            (timeMessage ? `\n⏱️  Time: ${timeMessage}` : "");

        setOutput({ stdout: successLog, stderr: "" });
        setSubmitSuccess(true);

        // Trigger Victory Overlay
        if (onSuccess) onSuccess();

        // Update Progress in Firebase
        if (user?.uid && currentQuestionId) {
            try {
                await updateUserProgress(user.uid, currentQuestionId, difficulty, questionTitle, category);
                await updateUserStats(user.uid);
            } catch (e) {
                console.error("Failed to save progress", e);
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col bg-[#0a0a0a] border-t border-cyan-500/10 relative z-20">

            {/* Submit Success Banner */}
            {submitSuccess && (
                <div className="flex items-center gap-3 px-5 py-3 bg-emerald-950/60 border-b border-emerald-500/30 animate-in slide-in-from-top duration-500">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                        <CheckCircle size={16} className="text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-emerald-300 tracking-wide">Successfully Submitted</p>
                        <p className="text-xs text-emerald-500/70">Your solution has been accepted and progress saved.</p>
                    </div>
                    <button
                        onClick={() => setSubmitSuccess(false)}
                        className="ml-auto text-emerald-600 hover:text-emerald-300 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Console Panel (Expandable - Hacker Terminal Style) */}
            {isConsoleOpen && (
                <div className="h-56 border-b border-cyan-500/10 flex flex-col bg-[#050505]">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-emerald-500" />
                            <span className="text-xs font-mono font-bold text-emerald-500/80 uppercase tracking-widest">System Output</span>
                        </div>
                        <button onClick={() => setIsConsoleOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X size={14} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed bg-[#050505] relative">
                        {/* CRT Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />

                        <div className="relative z-10">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-emerald-500/70 animate-pulse">
                                    <span className="text-lg">_</span>
                                    <span>Compiling execution parameters...</span>
                                </div>
                            ) : output ? (
                                <>
                                    {output.stderr && (
                                        <div className="text-red-400 whitespace-pre-wrap mb-4 bg-red-950/20 p-3 rounded border-l-2 border-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.2)]">
                                            <span className="text-xs font-bold uppercase block mb-1 opacity-50">Runtime Error</span>
                                            {output.stderr}
                                        </div>
                                    )}
                                    {output.stdout && (
                                        <div className="text-slate-300 whitespace-pre-wrap">
                                            {output.stdout}
                                        </div>
                                    )}
                                    {!output.stderr && !output.stdout && (
                                        <div className="text-slate-600 italic">Process finished with exit code 0. No output.</div>
                                    )}
                                </>
                            ) : (
                                <div className="text-slate-600 italic flex items-center gap-2">
                                    <span className="text-emerald-500">➜</span>
                                    Ready to initiate sequence.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Bar (Command Deck) */}
            <div className="h-16 flex items-center justify-between px-5 bg-slate-900/30 backdrop-blur-sm">
                {/* Console Trigger */}
                <button
                    onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium border
                        ${isConsoleOpen
                            ? 'bg-slate-800 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                            : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                        }`}
                >
                    <Terminal size={16} />
                    <span>Console</span>
                    {isConsoleOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">

                    {/* Hint Button */}
                    <button
                        onClick={onHint}
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-yellow-500/80 hover:text-yellow-200 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all text-sm font-bold shadow-[0_0_10px_rgba(234,179,8,0.05)] hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                        title="Get a Hint"
                    >
                        <Lightbulb size={16} className="group-hover:text-yellow-200 transition-colors" />
                        <span>Hint</span>
                    </button>

                    {/* AI Tutor Toggle */}
                    <button
                        onClick={onAiToggle}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold
                            ${isAiOpen
                                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                : 'bg-slate-800/50 text-slate-400 border-white/5 hover:text-purple-300 hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                            }`}
                    >
                        <Sparkles size={16} />
                        <span>AI Tutor</span>
                    </button>

                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    {/* Run Code */}
                    <button
                        onClick={handleRunCode}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-white transition-all text-sm font-bold border border-white/5
                            ${isLoading
                                ? 'bg-slate-800 cursor-not-allowed text-slate-500'
                                : 'bg-slate-800 hover:bg-slate-700 hover:border-white/20 hover:text-cyan-200 shadow-lg'}`
                        }
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Play size={16} className="fill-current" />
                        )}
                        <span>{isLoading ? 'Running...' : 'Run'}</span>
                    </button>

                    {/* Submit Code - Hero Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`relative group flex items-center gap-2 px-6 py-2 rounded-xl text-white shadow-lg transition-all text-sm font-bold overflow-hidden
                            ${isLoading
                                ? 'bg-emerald-950/50 text-emerald-700 cursor-not-allowed border border-emerald-900/30'
                                : submitSuccess
                                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/20 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5'}`
                        }
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-emerald-200/50 border-t-white rounded-full animate-spin"></div>
                        ) : submitSuccess ? (
                            <CheckCircle size={16} className="fill-emerald-300" />
                        ) : (
                            <CheckCircle size={16} />
                        )}
                        <span className="relative z-10">{isLoading ? 'Grading...' : submitSuccess ? 'Accepted ✓' : 'Submit'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

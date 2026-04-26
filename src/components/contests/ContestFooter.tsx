import { useState } from "react";
import { Play, CheckCircle, Terminal, X, ChevronUp, ChevronDown, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Question } from "@/types/question";

interface ContestFooterProps {
    contestId: string;
    question?: Question | null;
    code: string;
    language: string;
    isSolved: boolean;
}

export default function ContestFooter({ contestId, question, code, language, isSolved }: ContestFooterProps) {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const [output, setOutput] = useState<{ stdout: string; stderr: string } | null>(null);

    // Run Code (Dry Run - No score penalty, only runs against public visible test cases)
    const handleRunCode = async () => {
        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput(null);

        try {
            // Find a visible test case
            const publicCase = question?.testCases?.find(tc => !tc.isHidden);
            const runInput = publicCase ? publicCase.input : "";

            const response = await fetch("/api/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language,
                    code,
                    input: typeof runInput === 'object' ? JSON.stringify(runInput) : String(runInput)
                }),
            });

            const data = await response.json();

            if (data.run) {
                setOutput({
                    stdout: data.run.stdout,
                    stderr: data.run.stderr,
                });
            } else {
                setOutput({ stdout: "", stderr: "Error: No output received." });
            }
        } catch (error: any) {
            setOutput({ stdout: "", stderr: "Execution Failed: " + error.message });
        } finally {
            setIsLoading(false);
        }
    };

    // Final Submit (Checked securely on backend)
    const handleSubmit = async () => {
        if (!user) {
             alert("Must be logged in to submit.");
             return;
        }
        if (!question) {
             alert("Question is still loading.");
             return;
        }

        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput({ stdout: "🚀 Transmitting code to secure grading server...\n", stderr: "" });

        try {
            const response = await fetch("/api/contest/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contestId,
                    uid: user.uid,
                    questionId: question.id,
                    language,
                    code
                }),
            });

            const data = await response.json();

            if (data.success) {
                 setOutput(prev => ({
                     stdout: prev!.stdout + `\n✅ ${data.message}\nPoints Earned: +${data.points} XP\n`,
                     stderr: ""
                 }));
            } else {
                 setOutput(prev => ({
                     stdout: prev!.stdout + `\n❌ Submission Rejected.\n`,
                     stderr: data.error
                 }));
            }
        } catch (error: any) {
             setOutput({ stdout: "", stderr: "Critical Failure connecting to grading server." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-[#050505] border-t border-indigo-500/10 relative z-20 shrink-0">
            {/* Console */}
            {isConsoleOpen && (
                <div className="h-56 border-b border-indigo-500/10 flex flex-col bg-[#0a0c10]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#050505] border-b border-white/5">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <Terminal size={14} />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest">Contest Terminal</span>
                        </div>
                        <button onClick={() => setIsConsoleOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X size={14} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed relative">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-indigo-500/70 animate-pulse">
                                <span className="text-lg">_</span>
                                <span>Evaluating code...</span>
                            </div>
                        ) : output ? (
                            <>
                                {output.stderr && (
                                    <div className="text-red-400 whitespace-pre-wrap mb-4 bg-red-950/20 p-3 rounded border-l-2 border-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.2)]">
                                        {output.stderr}
                                    </div>
                                )}
                                {output.stdout && (
                                    <div className="text-slate-300 whitespace-pre-wrap">{output.stdout}</div>
                                )}
                            </>
                        ) : (
                            <div className="text-slate-600 italic">Ready.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Footer Bar */}
            <div className="h-16 flex items-center justify-between px-5 bg-slate-900/30 backdrop-blur-sm">
                <button
                    onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium border border-transparent text-slate-400 hover:text-slate-200"
                >
                    <Terminal size={16} /> Console {isConsoleOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRunCode}
                        disabled={isLoading || isSolved}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl text-white transition-all text-sm font-bold border border-white/5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                    >
                        <Play size={16} className="fill-current" /> Run (Dry Run)
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || isSolved}
                        className="relative group flex items-center gap-2 px-6 py-2 rounded-xl text-white shadow-lg transition-all text-sm font-bold bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 border border-red-400/20 disabled:opacity-50"
                    >
                        {isSolved ? <Lock size={16} /> : <CheckCircle size={16} />}
                        <span>{isSolved ? 'Locked (Solved)' : 'Submit Answer'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

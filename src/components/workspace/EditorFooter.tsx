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

    const handleRunCode = async () => {
        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput(null);

        try {
            // Prepare code...
            const runInput = testCases && testCases.length > 0 ? testCases[0].input : "";
            const executableCode = formatCodeForExecution(language, code, runInput);

            const response = await fetch("/api/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language,
                    code: executableCode,
                    input: typeof runInput === 'object' ? JSON.stringify(runInput) : String(runInput)
                }),
            });

            const data = await response.json();

            if (data.run) {
                setOutput({
                    stdout: data.run.stdout,
                    stderr: data.run.stderr,
                });

                if (data.run.stderr) {
                    // Trigger AI on Error (Ghost)
                    if (onRunComplete) onRunComplete({ stdout: data.run.stdout, stderr: data.run.stderr, isSuccess: false });
                } else {
                    // Trigger AI on Success (Ghost - for optimization tips)
                    if (onRunComplete) onRunComplete({ stdout: data.run.stdout, stderr: "", isSuccess: true });
                }
            } else {
                setOutput({ stdout: "", stderr: "Error: No output received." });
            }

        } catch (error: any) {
            console.error("Execution error:", error);
            setOutput({ stdout: "", stderr: "Failed to connect to execution server." });
            if (onRunComplete) onRunComplete({ stdout: "", stderr: error.message || "Execution Failed", isSuccess: false });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!testCases || testCases.length === 0) {
            alert("No test cases available for this question.");
            return;
        }

        setIsLoading(true);
        setIsConsoleOpen(true);
        setOutput({ stdout: "🚀 Starting submission...\n", stderr: "" });

        let allPassed = true;

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const input = testCase.input;
            // Normalize expected output
            const expected = testCase.expectedOutput; // Already stringified in DB

            // Update console for progress
            setOutput(prev => ({
                stdout: (prev?.stdout || "") + `Test Case ${i + 1}/${testCases.length}: Running... `,
                stderr: prev?.stderr || ""
            }));

            // Prepare code
            const executableCode = formatCodeForExecution(language, code, input);

            try {
                const response = await fetch("/api/run", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        language,
                        code: executableCode,
                        input: typeof input === 'object' ? JSON.stringify(input) : String(input)
                    }),
                });

                const data = await response.json();

                if (data.run && data.run.stderr) {
                    setOutput(prev => ({
                        stdout: (prev?.stdout || "") + "❌ Error\n",
                        stderr: (prev?.stderr || "") + `\n[Test Case ${i + 1} Error]: ${data.run.stderr}`
                    }));
                    allPassed = false;
                    break;
                }

                if (data.run) {
                    const actualRaw = data.run.stdout.trim();
                    const expectedRaw = expected.trim();

                    // Robust Comparison Logic
                    // Robust Comparison Logic (Enhanced for Order-Independence)
                    const checkOutputMatch = (act: string, exp: string): boolean => {
                        const tryParse = (s: string) => {
                            try { return JSON.parse(s); } catch (e) { return null; }
                        };

                        const canonicalize = (obj: any): any => {
                            if (Array.isArray(obj)) {
                                // Recursively canonicalize elements, then sort string representations
                                return obj.map(canonicalize).sort((a, b) => {
                                    return JSON.stringify(a).localeCompare(JSON.stringify(b));
                                });
                            }
                            // Primitives (number, string, boolean) returned as is
                            return obj;
                        };

                        const parsedAct = tryParse(act);
                        const parsedExp = tryParse(exp);

                        // 1. JSON Structural Match (Bag Equality)
                        if (parsedAct !== null && parsedExp !== null) {
                            // If arrays/objects, use canonical sort comparison
                            const canonAct = JSON.stringify(canonicalize(parsedAct));
                            const canonExp = JSON.stringify(canonicalize(parsedExp));
                            return canonAct === canonExp;
                        }

                        // 2. Exact Match (Trimmed)
                        if (act === exp) return true;

                        // 3. Numeric Match (Handle 1024.0 vs 1024.00000)
                        const nAct = Number(act);
                        const nExp = Number(exp);
                        if (!isNaN(nAct) && !isNaN(nExp)) {
                            return Math.abs(nAct - nExp) < 1e-6;
                        }

                        // 4. Fallback String Normalization
                        const norm = (s: string) => s.replace(/[\s"']/g, "");
                        return norm(act) === norm(exp);
                    };

                    if (checkOutputMatch(actualRaw, expectedRaw)) {
                        setOutput(prev => ({
                            stdout: (prev?.stdout || "") + "✅ Passed\n",
                            stderr: prev?.stderr || ""
                        }));
                    } else {
                        // Show normalized failure for clarity if numbers differ
                        // But show raw for debug
                        setOutput(prev => ({
                            stdout: (prev?.stdout || "") + "❌ Failed\n",
                            stderr: (prev?.stderr || "") + `\n[Test Case ${i + 1} Failed]\nExpected: ${expectedRaw}\nActual:   ${actualRaw}`
                        }));
                        allPassed = false;
                        break;
                    }
                } else {
                    allPassed = false;
                    break;
                }

            } catch (err) {
                console.error(err);
                allPassed = false;
                break;
            }
        }

        if (allPassed) {
            // Stop the timer and get elapsed time
            let timeMessage = "";
            if ((window as any).timerControl) {
                const elapsedSeconds = (window as any).timerControl.getElapsed();
                (window as any).timerControl.stop();
                
                // Format time for display
                const mins = Math.floor(elapsedSeconds / 60);
                const secs = elapsedSeconds % 60;
                const timeFormatted = mins > 0 
                    ? `${mins}m ${secs}s`
                    : `${secs}s`;
                
                timeMessage = `\n⏱️  Time: ${timeFormatted}`;
            }

            setOutput(prev => ({
                stdout: (prev?.stdout || "") + `\n🎉 ALL TEST CASES PASSED! 🎉${timeMessage}\n`,
                stderr: prev?.stderr || ""
            }));

            // Victory Effect handled by parent overlay
            if (onSuccess) onSuccess();

            // Update Progress in Firebase
            if (user?.uid && currentQuestionId) {
                try {
                    await updateUserProgress(user.uid, currentQuestionId, difficulty, questionTitle, category);
                    // Update user stats (solved count, level)
                    await updateUserStats(user.uid);
                } catch (e) {
                    console.error("Failed to save progress", e);
                }
            }
        } else {
            setOutput(prev => ({
                stdout: (prev?.stdout || "") + "\nSubmission Failed. Check errors above.\n",
                stderr: prev?.stderr || ""
            }));
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col bg-[#0a0a0a] border-t border-cyan-500/10 relative z-20">

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
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/20 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5'}`
                        }
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-emerald-200/50 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <CheckCircle size={16} />
                        )}
                        <span className="relative z-10">{isLoading ? 'Grading...' : 'Submit'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

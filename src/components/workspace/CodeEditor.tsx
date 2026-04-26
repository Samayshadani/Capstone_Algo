import Editor, { OnMount } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import { Question } from "@/types/question";
import { ChevronDown, Code } from "lucide-react";
import { useSenseiWatch } from "@/hooks/useSenseiWatch";

interface CodeEditorProps {
    question: Question;
    language: "javascript" | "python" | "java";
    setLanguage: (lang: "javascript" | "python" | "java") => void;
    code: string;
    setCode: (code: string) => void;
    onFirstKeystroke?: () => void; // Callback for first keystroke
}

export default function CodeEditor({ question, language, setLanguage, code, setCode, onFirstKeystroke }: CodeEditorProps) {
    const editorRef = useRef<any>(null);
    const hasTypedRef = useRef(false); // Track if user has typed

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    // Auto-update code when language changes, usually handled by parent, 
    // but we need to ensure the parent is passing the correct 'code' prop.

    // 🤖 Proactive AI Watch
    useSenseiWatch({
        code,
        language,
        questionTitle: question?.title || "Unknown Problem"
    });

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border border-cyan-500/10 shadow-[0_0_50px_-20px_rgba(20,184,166,0.1)] overflow-hidden">
            {/* Editor Toolbar (Glass Header) */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 backdrop-blur-md border-b border-cyan-500/10">
                <div className="flex items-center gap-3">
                    {/* Language Selector (Futuristic Toggle) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center bg-slate-950 border border-cyan-500/30 rounded-lg px-3 py-1.5 shadow-sm">
                            <Code size={14} className="text-cyan-400 mr-2" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="appearance-none bg-transparent text-sm font-medium text-cyan-100 focus:outline-none cursor-pointer pr-6"
                            >
                                <option value="javascript" className="bg-slate-900">JavaScript</option>
                                <option value="python" className="bg-slate-900">Python</option>
                                <option value="java" className="bg-slate-900">Java</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 text-cyan-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-cyan-700/70">
                    <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-cyan-500/50" /> vim: off</span>
                    <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-cyan-500/50" /> tab: 4 spaces</span>
                </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 relative bg-[#0a0a0a]/50">
                {/* Inner Glow Effect */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10" />

                <Editor
                    height="100%"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={(value) => {
                        setCode(value || "");
                        // Trigger timer on first keystroke
                        if (!hasTypedRef.current && value !== code && onFirstKeystroke) {
                            hasTypedRef.current = true;
                            if ((window as any).timerControl) {
                                (window as any).timerControl.start();
                            }
                            onFirstKeystroke();
                        }
                    }}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: true },
                        fontSize: 15,
                        lineHeight: 26,
                        fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                        fontLigatures: true,
                        scrollBeyondLastLine: true,
                        automaticLayout: true,
                        padding: { top: 20, bottom: 20 },
                        wordWrap: "on",
                        tabSize: 4,
                        roundedSelection: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        smoothScrolling: true,
                    }}
                />
            </div>
        </div>
    );
}

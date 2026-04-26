"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import { ArrowRightLeft, Sparkles, Copy, Check, MessageSquare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { TechGridBackground } from "@/components/ui/tech-grid-background";

// Simple toggle component
const SimpleSwitch = ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (c: boolean) => void }) => (
    <button
        onClick={() => onCheckedChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-muted'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`} />
    </button>
);

const TARGET_LANGUAGES = [
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "javascript", label: "JavaScript" },
    { id: "cpp", label: "C++" },
    { id: "typescript", label: "TypeScript" },
];

const SOURCE_LANGUAGES = [
    { id: "auto", label: "✨ Auto Detect" },
    ...TARGET_LANGUAGES
];

export default function TranslatorPage() {
    const router = useRouter();
    const [sourceCode, setSourceCode] = useState("// Paste your code here...");
    const [sourceLang, setSourceLang] = useState("auto"); // Default Auto

    const [targetCode, setTargetCode] = useState("");
    const [targetLang, setTargetLang] = useState("python");

    const [isLoading, setIsLoading] = useState(false);
    const [includeComments, setIncludeComments] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleTranslate = async () => {
        if (!sourceCode.trim()) return;
        setIsLoading(true);

        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sourceCode,
                    sourceLang: sourceLang === 'auto' ? null : sourceLang,
                    targetLang,
                    includeComments
                })
            });
            const data = await res.json();

            if (data.translatedCode) {
                setTargetCode(data.translatedCode);
            } else {
                alert("Translation failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to translator.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(targetCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-mono relative overflow-hidden">
            <TechGridBackground />

            {/* Header / Config Bar */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-20 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20"
            >
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => router.push("/dashboard")}
                        className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors group"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                            <ArrowRightLeft className="text-primary" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight uppercase">Code Translator</h1>
                            <p className="text-xs text-muted-foreground tracking-widest uppercase">AI-Powered Syntax Conversion</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-3 bg-muted/20 py-2 px-4 rounded-full border border-white/5">
                        <MessageSquare size={16} className={includeComments ? "text-primary" : "text-muted-foreground"} />
                        <span className="text-sm font-medium text-muted-foreground">Explain Changes</span>
                        <SimpleSwitch checked={includeComments} onCheckedChange={setIncludeComments} />
                    </div>

                    <button
                        onClick={handleTranslate}
                        disabled={isLoading}
                        className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all uppercase tracking-wider text-sm
                            ${isLoading
                                ? 'bg-muted text-muted-foreground cursor-wait'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--primary)]'
                            }
                        `}
                    >
                        {isLoading ? (
                            <>Converting...</>
                        ) : (
                            <>
                                <Sparkles size={16} className="fill-current" />
                                Translate Code
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Main Content: Split View */}
            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative z-10">

                {/* LEFT: SOURCE */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-sm"
                >
                    <div className="h-12 flex items-center justify-between px-4 bg-white/5 border-b border-white/5">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Source (Auto-Detect)</span>
                        <select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            className="bg-black/40 border border-white/10 text-xs text-muted-foreground rounded px-2 py-1 focus:ring-1 focus:ring-primary outline-none uppercase font-mono"
                        >
                            {SOURCE_LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id} className="bg-background text-foreground">{lang.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            language={sourceLang === 'auto' ? undefined : sourceLang} 
                            theme="vs-dark"
                            value={sourceCode}
                            onChange={(val) => setSourceCode(val || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                renderLineHighlight: "none",
                                autoIndent: "full",
                                contextmenu: true, 
                            }}
                            className="bg-transparent"
                        />
                    </div>
                </motion.div>

                {/* RIGHT: TARGET */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex-1 flex flex-col bg-black/20 backdrop-blur-sm"
                >
                    <div className="h-12 flex items-center justify-between px-4 bg-primary/5 border-b border-primary/10">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Translated Output</span>
                            {targetCode && <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"/>}
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="bg-primary/10 border border-primary/20 text-xs text-primary rounded px-2 py-1 focus:ring-1 focus:ring-primary outline-none font-bold uppercase font-mono"
                            >
                                {TARGET_LANGUAGES.map(lang => (
                                    <option key={lang.id} value={lang.id} className="bg-background text-foreground">{lang.label}</option>
                                ))}
                            </select>

                            {targetCode && (
                                <button
                                    onClick={copyToClipboard}
                                    className="p-1.5 hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-white"
                                    title="Copy Source"
                                >
                                    {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0">
                            <Editor
                                height="100%"
                                language={targetLang}
                                theme="vs-dark"
                                value={targetCode}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    padding: { top: 20 },
                                    scrollBeyondLastLine: false,
                                    readOnly: true,
                                    renderLineHighlight: "none"
                                }}
                            />
                        </div>
                        {/* Empty State Overlay */}
                        {!targetCode && !isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center space-y-4 opacity-20">
                                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mx-auto">
                                        <ArrowRightLeft size={32} />
                                    </div>
                                    <p className="text-sm font-mono uppercase tracking-widest">Awaiting Input Stream...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

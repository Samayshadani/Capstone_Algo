"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, AlertCircle, Loader2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
    onSubmit: (text: string) => void;
    isLoading: boolean;
    error: string | null;
}

const ACCEPTED_TYPES: Record<string, boolean> = {
    "application/pdf": true,
    "text/plain": true,
    "text/markdown": true,
    "text/x-markdown": true,
};

export default function ResumeUploadPanel({ onSubmit, isLoading, error }: Props) {
    const [mode, setMode] = useState<"paste" | "upload">("paste");
    const [resumeText, setResumeText] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [parsing, setParsing] = useState(false);
    const [parseError, setParseError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Route PDF through the server API; read plain text directly ──────────
    const handleFile = useCallback(async (file: File) => {
        setParseError(null);
        setFileName(file.name);

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            // Server-side PDF extraction
            setParsing(true);
            try {
                const form = new FormData();
                form.append("file", file);
                const res = await fetch("/api/ai-interview/parse-pdf", {
                    method: "POST",
                    body: form,
                });
                const data = await res.json();
                if (!res.ok || data.error) {
                    setParseError(data.error || "Failed to parse PDF.");
                    setFileName(null);
                } else {
                    setResumeText(data.text);
                }
            } catch {
                setParseError("Network error while parsing PDF. Please try pasting the text instead.");
                setFileName(null);
            } finally {
                setParsing(false);
            }
        } else if (ACCEPTED_TYPES[file.type] || file.name.match(/\.(txt|md|text)$/i)) {
            // Plain text — read locally
            const reader = new FileReader();
            reader.onload = (e) => setResumeText((e.target?.result as string) || "");
            reader.readAsText(file);
        } else {
            setParseError("Unsupported file type. Please upload a PDF, .txt, or .md file.");
            setFileName(null);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        // Reset input so same file can be re-selected
        e.target.value = "";
    };

    const canSubmit = resumeText.trim().length >= 50 && !isLoading && !parsing;
    const activeError = parseError || error;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
                    <Sparkles size={12} />
                    AI-Powered Interview Prep
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                    Drop Your Resume.{" "}
                    <span className="text-gradient">Ace the Interview.</span>
                </h1>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Paste or upload your resume (PDF, .txt, .md) and our AI will craft 5 tailored questions, then score your performance.
                </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex rounded-lg border border-white/10 overflow-hidden bg-white/5 p-1 gap-1">
                {(["paste", "upload"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            mode === m
                                ? "bg-primary text-primary-foreground shadow"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {m === "paste" ? <FileText size={14} /> : <UploadCloud size={14} />}
                        {m === "paste" ? "Paste Text" : "Upload File"}
                    </button>
                ))}
            </div>

            {/* Paste Mode */}
            {mode === "paste" && (
                <motion.div key="paste" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <textarea
                        id="resume-text-input"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume content here… (skills, experience, education)"
                        rows={12}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 transition-all duration-200"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                        {resumeText.length} characters{" "}
                        {resumeText.length < 50 && resumeText.length > 0 && (
                            <span className="text-destructive">(minimum 50)</span>
                        )}
                    </p>
                </motion.div>
            )}

            {/* Upload Mode */}
            {mode === "upload" && (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => !parsing && fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-16 transition-all duration-200 ${
                            parsing
                                ? "border-primary/40 bg-primary/5 cursor-wait"
                                : dragOver
                                ? "border-primary bg-primary/10 cursor-copy"
                                : "border-white/20 bg-white/5 hover:border-primary/40 hover:bg-white/8 cursor-pointer"
                        }`}
                    >
                        {parsing ? (
                            <>
                                <Loader2 size={36} className="text-primary animate-spin" />
                                <p className="text-sm font-medium text-foreground">Extracting text from PDF…</p>
                                <p className="text-xs text-muted-foreground">This takes just a moment</p>
                            </>
                        ) : (
                            <>
                                <UploadCloud size={36} className={dragOver ? "text-primary" : "text-muted-foreground"} />
                                <p className="text-sm font-medium text-foreground">Drop your resume file here</p>
                                <p className="text-xs text-muted-foreground">
                                    Supports <span className="text-primary font-medium">.pdf</span>, .txt, .md
                                </p>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.txt,.md,.text,application/pdf,text/plain,text/markdown"
                            onChange={handleFileChange}
                            className="hidden"
                            id="resume-file-input"
                        />
                    </div>

                    {/* File loaded confirmation */}
                    {fileName && resumeText && !parsing && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/25 text-sm text-primary"
                        >
                            <CheckCircle2 size={14} className="shrink-0" />
                            <span className="flex-1 truncate">
                                <span className="font-medium">{fileName}</span> loaded — {resumeText.length.toLocaleString()} characters extracted
                            </span>
                            <button
                                onClick={() => { setResumeText(""); setFileName(null); setParseError(null); }}
                                className="text-primary/60 hover:text-primary ml-1 shrink-0 text-xs underline"
                            >
                                Clear
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Error banner */}
            {activeError && (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{activeError}</span>
                </motion.div>
            )}

            {/* Submit */}
            <button
                id="start-interview-btn"
                onClick={() => onSubmit(resumeText)}
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] shadow-lg shadow-primary/20"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing Resume &amp; Generating Questions…
                    </>
                ) : (
                    <>
                        Start AI Interview
                        <ArrowRight size={16} />
                    </>
                )}
            </button>
        </motion.div>
    );
}

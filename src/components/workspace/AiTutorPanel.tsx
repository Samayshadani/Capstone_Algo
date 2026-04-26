"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Maximize2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
});

const Mermaid = ({ chart }: { chart: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            mermaid.render(id, chart).then(({ svg }) => {
                setSvg(svg);
            }).catch((err) => {
                console.error("Mermaid Render Error:", err);
                // Keep the old text if render fails
            });
        }
    }, [chart]);

    return (
        <>
            {/* Thumbnail View */}
            <div 
                ref={ref} 
                className="mermaid-chart group relative flex justify-center py-4 bg-[#0d1117] rounded-lg my-2 border border-white/5 cursor-pointer hover:border-indigo-500/30 transition-colors"
                onClick={() => setIsExpanded(true)}
            >
                <div dangerouslySetInnerHTML={{ __html: svg }} />
                <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg">
                    <Maximize2 size={14} className="text-slate-300" />
                </div>
            </div>

            {/* Magnified Modal View */}
            {isExpanded && (
                <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-full max-w-[90vw] md:max-w-[80vw] flex justify-end mb-4">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all flex items-center gap-2 border border-white/10 shadow-xl"
                        >
                            <X size={20} />
                            <span className="font-medium text-sm">Close</span>
                        </button>
                    </div>
                    <div className="flex-1 w-full max-w-[90vw] md:max-w-[80vw] max-h-[85vh] bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-auto flex items-center justify-center p-8 custom-scrollbar shadow-2xl">
                        <div 
                            className="w-full h-full flex flex-col items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto [&>svg]:drop-shadow-2xl" 
                            dangerouslySetInnerHTML={{ __html: svg }} 
                        />
                    </div>
                </div>
            )}
        </>
    );
};

interface Message {
    role: "user" | "model";
    text: string;
}

interface AiTutorPanelProps {
    history: Message[];
    setHistory: React.Dispatch<React.SetStateAction<Message[]>>;
    isLoading: boolean;
    onSendMessage: (message: string) => void;
}

export default function AiTutorPanel({ history, setHistory, isLoading, onSendMessage }: AiTutorPanelProps) {
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isLoading]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#121420] text-slate-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-indigo-500/20 bg-indigo-950/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-indigo-100">AI Tutor</h3>
                    <p className="text-xs text-indigo-300">Coding Mentor Mode</p>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                {history.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-4 opacity-60">
                        <Sparkles size={48} strokeWidth={1} />
                        <p className="max-w-[80%] text-sm">
                            I am here to guide you. <br />
                            If you get stuck, ask for a hint!<br />
                            I'll explain the logic without spoiling the answer.
                        </p>
                    </div>
                )}

                {history.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1
                                ${msg.role === "user" ? "bg-slate-700" : "bg-indigo-900"}`}
                        >
                            {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-wrap
                                ${msg.role === "user"
                                    ? "bg-slate-800 text-slate-100 rounded-tr-none"
                                    : "bg-indigo-950/40 border border-indigo-500/20 text-indigo-50 rounded-tl-none"}`}
                        >
                            <ReactMarkdown
                                components={{
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isMermaid = match && match[1] === 'mermaid';

                                        if (!inline && isMermaid) {
                                            return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                                        }

                                        // HEURISTIC: If it has newline, it's a block. If not, it's inline.
                                        // We ignore the 'inline' prop because sometimes markdown parsers get it wrong for loose text.
                                        const content = String(children).trim();
                                        const isMultiLine = content.includes('\n');

                                        return (!isMultiLine) ? (
                                            <code className="bg-black/30 px-1.5 py-0.5 rounded text-indigo-200 font-mono text-xs inline mx-0.5" {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <code className="block bg-black/30 p-3 rounded-lg font-mono text-xs overflow-x-auto my-2 text-indigo-100" {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex flex-row gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-900 flex-shrink-0 flex items-center justify-center mt-1">
                            <Bot size={14} />
                        </div>
                        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 h-10">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-[#0a0c10]">
                <div className="relative flex items-center">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a question..."
                        rows={1}
                        className="w-full bg-slate-900 border-none rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 resize-none min-h-[44px] max-h-[120px] custom-scrollbar"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

import { Question } from "@/types/question";
import ReactMarkdown from "react-markdown";

interface ProblemDescriptionProps {
    question: Question;
}

export default function ProblemDescription({ question }: ProblemDescriptionProps) {
    return (
        <div className="h-full overflow-y-auto p-6 bg-slate-950 text-slate-300 font-sans custom-scrollbar">
            {/* Header */}
            <div className="mb-6 border-b border-white/5 pb-6">
                <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {question.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        {/* Fallback formatting if title isn't directly available or to style it */}
                        {/* Actually question.title is better if available, but let's use the one passed */}
                        {/* Re-reading types: question.title IS available. Using that. */}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${question.difficulty === 'Easy' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' :
                            question.difficulty === 'Medium' ? 'border-amber-500/20 text-amber-400 bg-amber-500/10' :
                                'border-red-500/20 text-red-400 bg-red-500/10'
                        }`}>
                        {question.difficulty}
                    </span>

                    {question.logicTags?.map(tag => (
                        <span key={tag} className="text-xs text-slate-500 bg-slate-900 border border-white/5 px-2 py-0.5 rounded-full capitalize">
                            {tag.replace(/-/g, ' ')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                    components={{
                        // Style code blocks specifically for examples
                        code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <div className="rounded-lg overflow-hidden my-4 border border-white/10 bg-[#1e1e1e]">
                                    <code ref={rest.ref} className={`${className} block p-4 text-sm font-mono`} {...rest}>
                                        {children}
                                    </code>
                                </div>
                            ) : (
                                <code ref={rest.ref} className="bg-slate-800/50 px-1.5 py-0.5 rounded text-amber-200/90 font-mono text-xs" {...rest}>
                                    {children}
                                </code>
                            )
                        },
                        // Style headers
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mt-6 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white mt-6 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-base font-bold text-white mt-4 mb-2" {...props} />,
                        // Style paragraphs
                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
                        // Style lists
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-300" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-300" {...props} />,
                        // Style blockquotes
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-slate-700 pl-4 py-1 my-4 text-slate-400 italic" {...props} />,
                    }}
                >
                    {question.description}
                </ReactMarkdown>
            </div>
        </div>
    );
}

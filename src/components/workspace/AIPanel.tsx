interface AIPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIPanel({ isOpen, onClose }: AIPanelProps) {
    if (!isOpen) return null;

    return (
        <div className="h-full bg-slate-900 border-l border-white/5 flex flex-col">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-slate-200">AI Tutor</h3>
                <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
                    &times;
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 mb-4 flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                </div>
                <h4 className="text-white font-medium mb-2">AI Tutor Module</h4>
                <p className="text-sm">
                    Waiting for integration... <br />
                    This panel will provide real-time hints and explanations.
                </p>
            </div>
        </div>
    );
}

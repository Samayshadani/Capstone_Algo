import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SenseiWatchProps {
    code: string;
    language: string;
    questionTitle: string;
    isEnabled?: boolean;
}

export function useSenseiWatch({ code, language, questionTitle, isEnabled = true }: SenseiWatchProps) {
    const lastAnalyzedCode = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        if (!isEnabled || !code || code.trim().length < 20) return;

        // Debounce: extensive analysis only after 45 seconds of inactivity
        // But also check if code has changed significantly to save API calls
        if (code === lastAnalyzedCode.current) return;

        // API Optimization: Skip if change is minor (< 10 chars)
        // This prevents hitting the API for every typo fix.
        const lenDiff = Math.abs(code.length - (lastAnalyzedCode.current?.length || 0));
        if (lastAnalyzedCode.current && lenDiff < 10) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            lastAnalyzedCode.current = code;
            setIsAnalyzing(true);

            try {
                // Call the Watch API
                const res = await fetch("/api/ai/watch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, language, questionTitle })
                });

                const data = await res.json();

                if (data.warning) {
                    toast.warning("Sensei Watch", {
                        description: data.warning,
                        duration: 6000,
                        action: {
                            label: "Fix",
                            onClick: () => console.log("Fix clicked") // Placeholder for future fix action
                        }
                    });
                }
            } catch (error) {
                console.error("Sensei Watch Error:", error);
            } finally {
                setIsAnalyzing(false);
            }
        }, 45000); // Increased to 45s to save API usage

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [code, language, questionTitle, isEnabled]);

    return { isAnalyzing };
}

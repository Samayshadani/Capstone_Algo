"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
    questionId: string;
    onTimerStart?: () => void;
    onTimerStop?: (elapsedSeconds: number) => void;
}

export default function Timer({ questionId, onTimerStart, onTimerStop }: TimerProps) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Track if paused due to visibility
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Load saved time from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(`timer_${questionId}`);
        if (savedData) {
            const { elapsed, running } = JSON.parse(savedData);
            // Simply use the saved elapsed time (already updated every second)
            setElapsedSeconds(elapsed || 0);
            if (running) {
                setIsRunning(true);
            }
        }
    }, [questionId]);

    // Page Visibility API - Pause/Resume on tab switch
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Tab is hidden - pause timer
                if (isRunning && !isPaused) {
                    setIsPaused(true);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            } else {
                // Tab is visible - resume timer
                if (isRunning && isPaused) {
                    setIsPaused(false);
                    // Timer will restart in the next useEffect
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isRunning, isPaused]);

    // Start timer interval
    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setElapsedSeconds(prev => {
                    const newValue = prev + 1;
                    // Save to localStorage periodically
                    localStorage.setItem(`timer_${questionId}`, JSON.stringify({
                        elapsed: newValue,
                        running: true
                    }));
                    return newValue;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused, questionId]);

    // Public method to start timer (called on first keystroke)
    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            if (onTimerStart) onTimerStart();
        }
    };

    // Public method to stop timer (called on successful submission)
    const stopTimer = () => {
        setIsRunning(false);
        localStorage.setItem(`timer_${questionId}`, JSON.stringify({
            elapsed: elapsedSeconds,
            running: false
        }));
        if (onTimerStop) onTimerStop(elapsedSeconds);
    };

    // Reset timer (called when switching problems)
    const resetTimer = () => {
        setElapsedSeconds(0);
        setIsRunning(false);
        localStorage.removeItem(`timer_${questionId}`);
    };

    // Format time as MM:SS or HH:MM:SS
    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Expose methods to parent via ref (alternative: use callback props)
    useEffect(() => {
        (window as any).timerControl = {
            start: startTimer,
            stop: stopTimer,
            reset: resetTimer,
            getElapsed: () => elapsedSeconds
        };
    }, [elapsedSeconds]);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
            <Clock size={14} className={
                isRunning && !isPaused ? "text-green-400" : 
                isPaused ? "text-yellow-400" : 
                "text-white/40"
            } />
            <span className={`font-mono text-sm transition-colors ${
                isRunning && !isPaused ? "text-white" : 
                isPaused ? "text-yellow-400" : 
                "text-white/40"
            }`}>
                {formatTime(elapsedSeconds)}
            </span>
            {isPaused && (
                <span className="text-[10px] text-yellow-400/70 font-mono">⏸</span>
            )}
        </div>
    );
}

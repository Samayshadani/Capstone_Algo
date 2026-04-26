"use client";

import { useState, useEffect, useRef } from "react";

export interface VoiceState {
    isListening: boolean;
    isSpeaking: boolean;
    transcript: string;
    hasBrowserSupport: boolean;
    error: string | null;
    isOnline: boolean;
    retryCount: number;
}

export function useVoiceInterface() {
    const [state, setState] = useState<VoiceState>({
        isListening: false,
        isSpeaking: false,
        transcript: "",
        hasBrowserSupport: false,
        error: null,
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        retryCount: 0
    });

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const maxRetries = 1; // Reduced from 3 - network errors are often persistent

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check Support
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const synthesis = window.speechSynthesis;

            if (SpeechRecognition && synthesis) {
                setState(prev => ({ ...prev, hasBrowserSupport: true }));

                // Init Recognition
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false; // Stop after silence
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = "en-US";

                // Log initialization for debugging
                console.log("[Voice] Speech Recognition initialized:", {
                    lang: recognitionRef.current.lang,
                    continuous: recognitionRef.current.continuous,
                    interimResults: recognitionRef.current.interimResults,
                    protocol: window.location.protocol,
                    isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost'
                });

                synthesisRef.current = synthesis;
            }

            // Online/Offline listeners
            const handleOnline = () => setState(prev => ({ ...prev, isOnline: true, error: null }));
            const handleOffline = () => setState(prev => ({
                ...prev,
                isOnline: false,
                error: "You are offline. Voice features require internet connection.",
                isListening: false
            }));

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
                if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            };
        }
    }, []);

    const speak = (text: string) => {
        if (!synthesisRef.current) return;

        // Cancel previous speech
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Find a natural confident male voice
        const voices = synthesisRef.current.getVoices();

        // Priority list for "Confident Male"
        const preferredVoice = voices.find(v =>
            v.name.includes("Google UK English Male") || // Deep, professional
            v.name.includes("Microsoft James") ||        // Standard Windows Male
            v.name.includes("Daniel") ||                 // Mac/iOS Male
            v.name.includes("Google US English")         // Fallback high quality
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            // Slight pitch drop for authority if it's a standard voice
            if (preferredVoice.name.includes("Google US English")) {
                utterance.pitch = 0.9;
                utterance.rate = 1.05; // Slightly faster for efficiency
            } else {
                utterance.pitch = 1.0;
                utterance.rate = 1.0;
            }
        }

        utterance.onstart = () => setState(prev => ({ ...prev, isSpeaking: true }));
        utterance.onend = () => setState(prev => ({ ...prev, isSpeaking: false }));
        utterance.onerror = () => setState(prev => ({ ...prev, isSpeaking: false }));

        synthesisRef.current.speak(utterance);
    };

    const startListeningInternal = (isRetry: boolean = false) => {
        if (!recognitionRef.current) return;

        // Clean previous state
        setState(prev => ({ ...prev, isListening: true, transcript: "", error: null }));

        recognitionRef.current.onresult = (event: any) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setState(prev => ({ ...prev, transcript: finalTranscript, retryCount: 0 }));
            }
        };

        recognitionRef.current.onend = () => {
            setState(prev => ({ ...prev, isListening: false }));
        };

        recognitionRef.current.onerror = (event: any) => {
            if (event.error === 'no-speech') return; // Simply ignore silence, don't log error

            // Log detailed error info for debugging
            console.error("[Voice] Speech Recognition Error:", {
                error: event.error,
                message: event.message,
                isOnline: navigator.onLine,
                protocol: window.location.protocol,
                retryCount: state.retryCount
            });

            // Handle network errors with limited retry
            if (event.error === 'network') {
                setState(prev => {
                    const newRetryCount = prev.retryCount + 1;

                    if (newRetryCount <= maxRetries && prev.isOnline) {
                        // Single retry with 2 second delay
                        const retryDelay = 2000;

                        const retryMessage = `Speech service error. Retrying... (${newRetryCount}/${maxRetries})`;
                        console.warn(`[Voice] ${retryMessage}`);

                        // Schedule retry
                        retryTimeoutRef.current = setTimeout(() => {
                            console.log("[Voice] Attempting retry...");
                            startListeningInternal(true);
                        }, retryDelay);

                        return {
                            ...prev,
                            isListening: false,
                            error: retryMessage,
                            retryCount: newRetryCount
                        };
                    } else {
                        // Max retries reached or offline
                        const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
                        const helpText = !isHTTPS
                            ? " (Speech Recognition requires HTTPS)"
                            : ". This may be due to browser settings, ad blockers, or Google's speech service being unavailable. Try refreshing the page.";

                        const finalError = `Speech recognition failed${helpText}`;

                        console.error(`[Voice] ${finalError}`);
                        return {
                            ...prev,
                            isListening: false,
                            error: finalError,
                            retryCount: 0
                        };
                    }
                });
                return;
            }

            // Handle other errors
            console.error("Speech Error:", event.error);
            let errorMessage = "Voice error occurred.";
            if (event.error === 'not-allowed') errorMessage = "Microphone access denied.";
            if (event.error === 'aborted') errorMessage = "Speech recognition aborted.";

            setState(prev => ({ ...prev, isListening: false, error: errorMessage, retryCount: 0 }));
        };

        try {
            recognitionRef.current.start();
        } catch (e) {
            console.warn("Recognition already started or failed", e);
        }
    };

    const startListening = () => {
        // Check offline status first
        if (!state.isOnline) {
            setState(prev => ({
                ...prev,
                error: "You are offline. Please connect to the internet to use voice features."
            }));
            return;
        }

        // Reset retry count on manual start
        setState(prev => ({ ...prev, retryCount: 0 }));
        startListeningInternal(false);
    };

    const stopListening = () => {
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        if (recognitionRef.current) recognitionRef.current.stop();
        setState(prev => ({ ...prev, isListening: false, retryCount: 0 }));
    };

    return {
        ...state,
        startListening,
        stopListening,
        speak
    };
}

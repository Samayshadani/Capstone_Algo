"use client";

import Webcam from "react-webcam";
import { useRef, useEffect } from "react";
import { useViper } from "@/hooks/useViper";
import { AlertTriangle, EyeOff, Users, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfidenceCameraProps {
    onConfidenceUpdate: (score: number, issues: string[]) => void;
}

export default function ConfidenceCamera({ onConfidenceUpdate }: ConfidenceCameraProps) {
    const webcamRef = useRef<Webcam>(null);
    const { confidenceScore, isDistracted, isAbsent, hasMultipleFaces, currentMood, status } = useViper(webcamRef);

    // Propagate signals to parent logic (throttled effect)
    useEffect(() => {
        const issues = [];
        if (isDistracted) issues.push("Distracted");
        if (isAbsent) issues.push("Absent");
        if (hasMultipleFaces) issues.push("Multiple Faces");

        onConfidenceUpdate(confidenceScore, issues);
    }, [confidenceScore, isDistracted, isAbsent, hasMultipleFaces]); // Parent must debounce this!

    // Color logic
    const getScoreColor = (score: number) => {
        if (score > 80) return "text-emerald-400 border-emerald-500/50";
        if (score > 50) return "text-amber-400 border-amber-500/50";
        return "text-red-500 border-red-500/50";
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-24 left-6 w-72 z-50 group cursor-grab active:cursor-grabbing"
        >
            {/* Main Container */}
            <div className={`relative rounded-2xl overflow-hidden bg-black border transition-colors duration-500 ${getScoreColor(confidenceScore).split(' ')[1]} shadow-2xl`}>

                {/* Webcam Feed */}
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />

                {/* Score Overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
                    <Activity size={12} className={getScoreColor(confidenceScore).split(' ')[0]} />
                    <span className={`text-xs font-bold font-mono ${getScoreColor(confidenceScore).split(' ')[0]}`}>
                        {confidenceScore}%
                    </span>
                </div>

                {/* Status Overlay (Loading/Error) */}
                {status !== 'READY' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <span className="text-xs text-cyan-500 animate-pulse">{status}...</span>
                    </div>
                )}

                {/* Warning Overlays */}
                <AnimatePresence>
                    {(isDistracted || isAbsent || hasMultipleFaces) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/40 backdrop-blur-[1px] text-red-200">
                            {isDistracted && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <EyeOff size={24} className="mb-1" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Focus</span>
                                </motion.div>
                            )}
                            {isAbsent && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <Users size={24} className="mb-1" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">No Face</span>
                                </motion.div>
                            )}
                            {hasMultipleFaces && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <Users size={24} className="mb-1" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Warning</span>
                                </motion.div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Label & Mood */}
            <div className="flex justify-between items-center mt-1 px-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Viper V2</span>
                <span className={`text-[9px] uppercase tracking-widest font-bold ${currentMood === 'Stressed' ? 'text-amber-500' :
                    currentMood === 'Confident' ? 'text-emerald-500' :
                        currentMood === 'Distracted' ? 'text-red-500' :
                            currentMood === 'Misbehaving' ? 'text-pink-500' : 'text-slate-500'
                    }`}>
                    {currentMood}
                </span>
            </div>
        </motion.div>
    );
}

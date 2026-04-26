"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

export interface ViperState {
    confidenceScore: number; // 0-100
    isDistracted: boolean;
    isAbsent: boolean;
    hasMultipleFaces: boolean;
    currentMood: "Neutral" | "Confident" | "Stressed" | "Distracted" | "Misbehaving";
    status: 'LOADING' | 'READY' | 'ERROR';
}

export function useViper(videoRef: any) {
    const [viperState, setViperState] = useState<ViperState>({
        confidenceScore: 100,
        isDistracted: false,
        isAbsent: false,
        hasMultipleFaces: false,
        currentMood: "Neutral",
        status: 'LOADING'
    });

    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const requestRef = useRef<number | null>(null);
    const lastVideoTimeRef = useRef<number>(-1);

    // Confidence Physics
    const scoreRef = useRef(100);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
                );

                faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                        delegate: "GPU"
                    },
                    outputFaceBlendshapes: true,
                    runningMode: "VIDEO",
                    numFaces: 2
                });

                setViperState(prev => ({ ...prev, status: 'READY' }));
                requestRef.current = requestAnimationFrame(predictWebcam);
            } catch (error) {
                console.error("Viper Init Error:", error);
                setViperState(prev => ({ ...prev, status: 'ERROR' }));
            }
        };

        loadModel();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const predictWebcam = useCallback(() => {
        const landmarker = faceLandmarkerRef.current;
        const video = videoRef.current?.video;

        if (landmarker && video && video.currentTime !== lastVideoTimeRef.current && !video.paused && !video.ended) {
            lastVideoTimeRef.current = video.currentTime;

            try {
                const results = landmarker.detectForVideo(video, performance.now());

                // --- VIPER LOGIC CORE (V2: EMOTION ENGINE) ---
                let currentScore = scoreRef.current;
                let distracted = false;
                let absent = false;
                let multiple = false;
                let stressLevel = 0; // Initialize stressLevel
                let misbehaviorLevel = 0; // Initialize misbehaviorLevel
                const blendshapes = results.faceBlendshapes?.[0];

                // DEBUG LOGGING (Throttle to every ~60 frames or 1 sec)
                if (Math.random() < 0.05) {
                    console.log("🐍 VIPER DEBUG:", {
                        score: currentScore,
                        blendshapes: !!blendshapes,
                        mood: viperState.currentMood
                    });
                }

                // 1. Presence Check
                if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
                    absent = true;
                    currentScore -= 2.0; // Rapid drain if absent
                } else if (results.faceLandmarks.length > 1) {
                    multiple = true;
                    currentScore -= 5.0; // Critical penalty
                } else {
                    const landmarks = results.faceLandmarks[0];

                    // 2. Gaze/Head Pose (YAW)
                    const nose = landmarks[1];
                    const leftEar = landmarks[234];
                    const rightEar = landmarks[454];
                    const midEarX = (leftEar.x + rightEar.x) / 2;
                    const yawOffset = Math.abs(nose.x - midEarX);

                    if (yawOffset > 0.12) { // Loosened threshold slightly
                        distracted = true;
                        currentScore -= 0.5;
                    }

                    // 3. EMOTION & MICRO-EXPRESSIONS (Blendshapes)
                    if (blendshapes && blendshapes.categories) {
                        const getShape = (name: string) => blendshapes.categories.find(c => c.categoryName === name)?.score || 0;

                        // Nervous Indicators
                        const browDown = (getShape('browDownLeft') + getShape('browDownRight')) / 2; // Confusion/Concern
                        const mouthPress = (getShape('mouthPressLeft') + getShape('mouthPressRight')) / 2; // Stress/Lips pressed
                        const eyeBlink = (getShape('eyeBlinkLeft') + getShape('eyeBlinkRight')) / 2; // Blinking

                        // Misbehavior Indicators (Tongue/Funny Faces)
                        const jawOpen = getShape('jawOpen');
                        const mouthPucker = getShape('mouthPucker');
                        const mouthFunnel = getShape('mouthFunnel');
                        const cheekPuff = getShape('cheekPuff');

                        // Confidence Indicators
                        const smile = (getShape('mouthSmileLeft') + getShape('mouthSmileRight')) / 2;
                        const eyeWide = (getShape('eyeWideLeft') + getShape('eyeWideRight')) / 2;

                        // Calculations
                        stressLevel = (browDown * 0.5) + (mouthPress * 0.4) + (eyeBlink * 0.3);
                        const misbehaviorLevel = (jawOpen * 0.3) + (mouthPucker * 0.5) + (mouthFunnel * 0.5) + (cheekPuff * 0.5);

                        // Confidence Boosters
                        const confidenceBoost = (smile * 0.2) + (eyeWide * 0.1);

                        // Physics Update
                        if (misbehaviorLevel > 0.4) { // Detect "Tongue" or "Weird Face"
                            currentScore -= 2.0; // Fast drain for misbehavior
                            multiple = false; // Override multiple (priority)
                            distracted = false; // Override distraction
                        } else if (stressLevel > 0.2) { // Lowered threshold (was 0.3)
                            currentScore -= 0.8; // Stress drains confidence
                        } else if (distracted) {
                            // Already handled
                        } else {
                            // Recovery (Boosted by positive expressions)
                            currentScore += (0.2 + confidenceBoost);
                        }
                    }
                }

                // Clamp Score 0-100
                currentScore = Math.max(0, Math.min(100, currentScore));
                scoreRef.current = currentScore;

                // Determine Mood (Updated Logic)
                let mood: ViperState['currentMood'] = "Neutral";

                if (misbehaviorLevel > 0.4) mood = "Misbehaving";
                else if (distracted) mood = "Distracted";
                else if (stressLevel > 0.2) mood = "Stressed";
                else if (currentScore > 80) mood = "Confident";

                setViperState({
                    confidenceScore: Math.round(currentScore),
                    isDistracted: distracted,
                    isAbsent: absent,
                    hasMultipleFaces: multiple,
                    currentMood: mood,
                    status: 'READY'
                });

            } catch (e) {
                console.warn("Viper Inference Error", e);
            }
        }

        requestRef.current = requestAnimationFrame(predictWebcam);
    }, [videoRef]);

    return viperState;
}

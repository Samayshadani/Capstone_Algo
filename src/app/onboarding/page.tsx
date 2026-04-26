"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TOPICS } from "@/lib/topics";
import { Check, Sparkles, BrainCircuit } from "lucide-react";

export default function OnboardingPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If no user, redirect to login
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    const toggleTopic = (topicId: string) => {
        setSelectedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const handleComplete = async () => {
        if (!user) return;
        setIsSubmitting(true);

        try {
            // Save known topics to user profile
            const userRef = doc(db, "users", user.uid);

            // We use updateDoc but fall back to setDoc (merge) if user doc doesn't strictly exist yet
            // Assuming user doc is created on signup, but let's be safe.
            await setDoc(userRef, {
                knownTopics: selectedTopics,
                hasOnboarded: true
            }, { merge: true });

            // Redirect to Navigator HQ for the first time
            router.push("/navigator");

        } catch (error) {
            console.error("Onboarding Error:", error);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (authLoading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading...</div>;

    return (
        <div className="h-screen w-full bg-slate-950 relative overflow-y-auto custom-scrollbar">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Content Container - Natural Flow */}
            <div className="relative z-10 flex flex-col items-center min-h-screen py-20 px-6">
                <div className="max-w-4xl w-full space-y-10">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <BrainCircuit className="text-white" size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-outfit text-white tracking-tight">
                            Customize Your Path
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            AlgoSensei uses AI to adapt to your skill level.
                            Select the topics you are already comfortable with, and we'll fast-track you to harder problems.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {TOPICS.map((topic) => {
                            const isSelected = selectedTopics.includes(topic.id);
                            return (
                                <button
                                    key={topic.id}
                                    onClick={() => toggleTopic(topic.id)}
                                    className={`
                                    relative group p-4 rounded-xl border transition-all duration-200 text-left
                                    ${isSelected
                                            ? 'bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                            : 'bg-slate-900/50 border-white/5 hover:border-white/10 hover:bg-slate-800/50'
                                        }
                                `}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <topic.icon className={`${isSelected ? 'text-indigo-400' : 'text-slate-500'} transition-colors`} size={20} />
                                        <div className={`
                                        w-5 h-5 rounded-full border flex items-center justify-center transition-all
                                        ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 bg-slate-800'}
                                    `}>
                                            {isSelected && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <h3 className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                        {topic.title}
                                    </h3>
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleComplete}
                            disabled={isSubmitting}
                            className={`
                            px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all
                            ${isSubmitting
                                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                    : 'bg-white text-indigo-950 hover:bg-indigo-50 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                }
                        `}
                        >
                            {isSubmitting ? "Personalizing..." : (
                                <>
                                    <Sparkles size={20} className="text-indigo-600" />
                                    Start My Journey
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

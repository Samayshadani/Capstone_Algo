"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TOPICS, LEVELS } from "@/lib/topics";
import { getQuestionsByTopicId } from "@/lib/allQuestions";
import { Question } from "@/types/question";
import StatCard from "@/components/dashboard/StatCard";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import LearningPathCard from "@/components/dashboard/LearningPathCard";
import { Trophy, Target, Zap, Sparkles } from "lucide-react";
import LevelSection from "@/components/dashboard/LevelSection";
import DashboardBranding from "@/components/dashboard/DashboardBranding";
import { motion, AnimatePresence } from "framer-motion";
import { TechGridBackground } from "@/components/ui/tech-grid-background";
import SmartBanners from "@/components/dashboard/SmartBanners";

import { calculateLevel } from "@/lib/gamification";

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        const itemsRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(itemsRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUserData(data);

                // REDIRECT CHECK: If user hasn't onboarded, send them there
                // We check for 'hasOnboarded' flag OR existence of knownTopics to support legacy users
                if (!data.hasOnboarded && !data.knownTopics) {
                    console.log("Redirecting to Onboarding...");
                    router.push("/onboarding");
                    return;
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, router]);

    // Derived Stats
    const currentXP = userData?.xp || 0;
    const { currentLevel } = calculateLevel(currentXP);
    const solvedCount = userData?.solvedQuestionIds?.length || 0;

    const getSolvedForTopic = (topicId: string) => {
        if (!userData?.solvedQuestionIds) return 0;
        const topicQuestions = getQuestionsByTopicId(topicId);
        if (!topicQuestions.length) return 0;
        const topicQuestionIds = new Set(topicQuestions.map((q: Question) => q.id));
        const solvedInTopic = userData.solvedQuestionIds.filter((id: string) => topicQuestionIds.has(id));
        return solvedInTopic.length;
    };

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse max-w-6xl mx-auto mt-10 p-6">
                <div className="flex justify-between items-end">
                    <div className="h-10 w-48 bg-white/5 rounded-lg"></div>
                    <div className="h-14 w-48 bg-white/5 rounded-2xl"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white/5 rounded-3xl"></div>)}
                </div>
                <div className="space-y-12">
                    <div className="h-8 w-64 bg-white/5 rounded-lg"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white/5 rounded-3xl"></div>)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex-1 overflow-hidden h-full select-none">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <TechGridBackground />
            </div>

            <div className="relative z-10 h-full overflow-y-auto custom-scrollbar focus-mode-wrapper">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Header Branding - Full Width */}
                    {/* No padding or max-width constraint here */}
                    <div className="w-full pt-32 pb-6">
                        <DashboardBranding />
                    </div>

                    {/* Main Content Area - Constrained & Centered */}
                    {/* Added mt-8 to bring content lower as requested */}
                    <div className="max-w-7xl md:max-w-[90rem] mx-auto px-6 md:px-12 space-y-16 pb-20 mt-8">

                        {/* Command Deck Banner */}
                        <div className="w-full relative z-30">
                            <DashboardBanner
                                xp={currentXP}
                                level={currentLevel}
                                solved={solvedCount}
                                totalQuestions={TOPICS.reduce((acc, topic) => acc + getQuestionsByTopicId(topic.id).length, 0)}
                            />
                        </div>

                        {/* Smart Banners (Navigator, Continue, History) */}
                        <div className="w-full relative z-20 mt-12">
                            <SmartBanners />
                        </div>

                        {/* Learning Path */}
                        <div className="space-y-16">
                            {LEVELS.map((level, levelIndex) => {
                                const levelTopics = TOPICS.filter(t => t.level === level.id);

                                // Industrial Color Mapping
                                const levelColorClass =
                                    level.id === 1 ? 'bg-[var(--chart-1)]' :
                                        level.id === 2 ? 'bg-[var(--chart-2)]' :
                                            level.id === 3 ? 'bg-[var(--chart-3)]' :
                                                level.id === 4 ? 'bg-[var(--chart-4)]' :
                                                    'bg-[var(--chart-5)]';

                                return (
                                    <LevelSection
                                        key={level.id}
                                        level={level}
                                        topics={levelTopics}
                                        getSolvedForTopic={getSolvedForTopic}
                                        levelColorClass={levelColorClass}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

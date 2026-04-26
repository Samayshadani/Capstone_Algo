"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import LearningPathCard from "@/components/dashboard/LearningPathCard";

interface LevelSectionProps {
    level: {
        id: number;
        title: string;
        description?: string;
    };
    topics: any[];
    getSolvedForTopic: (topicId: string) => number;
    levelColorClass: string;
}

export default function LevelSection({ level, topics, getSolvedForTopic, levelColorClass }: LevelSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of view
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isDown.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        if (isDragging) setIsDragging(false);
    };

    const handleMouseUp = () => {
        isDown.current = false;
        if (isDragging) {
            // Defer turning off drag state slightly to ensure click events are suppressed if needed
            setTimeout(() => setIsDragging(false), 10);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !scrollContainerRef.current) return;

        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1;

        // Threshold check to distinguish click from drag
        if (Math.abs(walk) > 5) {
            e.preventDefault();
            if (!isDragging) setIsDragging(true);
            scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    const isScrollable = topics.length > 3;

    return (
        <motion.section
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center gap-4">
                <div className={`h-8 w-1.5 ${levelColorClass}`} />
                <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-wide">{level.title}</h3>
                <div className="h-px bg-white/10 flex-1" />

                {/* Scroll Controls for large lists */}
                {isScrollable && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {isScrollable ? (
                // Horizontal Scroll Layout
                <div className="relative group">
                    {/* Gradient Masks for scroll indication */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div
                        ref={scrollContainerRef}
                        className={`flex gap-6 overflow-x-auto pb-8 -mb-4 scrollbar-hide px-1 cursor-grab items-stretch ${isDragging ? "cursor-grabbing snap-none" : "snap-x snap-mandatory"}`}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: isDragging ? 'auto' : 'smooth' }}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {topics.map((topic, topicIndex) => {
                            const solved = getSolvedForTopic(topic.id);
                            const total = 10; // Ideally this should come from topic data
                            return (
                                <motion.div
                                    key={topic.id}
                                    className={`min-w-[85vw] md:min-w-[40%] lg:min-w-[30%] snap-start select-none h-full ${isDragging ? 'pointer-events-none' : ''}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: topicIndex * 0.05, duration: 0.4 }}
                                >
                                    <Link href={`/dashboard/topic/${topic.id}`} className="block h-full" draggable={false}>
                                        <LearningPathCard
                                            id={topic.id}
                                            icon={topic.icon}
                                            title={topic.title}
                                            description={topic.description}
                                            progress={solved}
                                            total={total}
                                            className="h-full"
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                // Standard Grid Layout (Max 3 items)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic, topicIndex) => {
                        const solved = getSolvedForTopic(topic.id);
                        const total = 10;
                        return (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: topicIndex * 0.1, duration: 0.4 }}
                            >
                                <Link href={`/dashboard/topic/${topic.id}`} className="block h-full" draggable={false}>
                                    <LearningPathCard
                                        id={topic.id}
                                        icon={topic.icon}
                                        title={topic.title}
                                        description={topic.description}
                                        progress={solved}
                                        total={total}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.section>
    );
}

"use client";

import React from "react";

interface TopicBackgroundProps {
    topicId: string;
}

export default function TopicBackground({ topicId }: TopicBackgroundProps) {
    const getPattern = (id: string) => {
        // Normalize id
        const type = id.toLowerCase();

        // MATH & LOGIC
        if (type.includes('math') || type.includes('logic')) {
            return (
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <g className="opacity-50 group-hover:opacity-10 transition-opacity duration-500" fill="currentColor">
                        <text x="50" y="40" fontSize="24" fontFamily="monospace">∫</text>
                        <text x="300" y="50" fontSize="20" fontFamily="monospace">∑</text>
                        <text x="150" y="150" fontSize="24" fontFamily="monospace">π</text>
                        <text x="340" y="160" fontSize="30" fontFamily="monospace">∞</text>
                        <text x="80" y="120" fontSize="18" fontFamily="monospace">√x</text>
                        <path d="M200 40 Q250 10 300 40 T400 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        <text x="20" y="180" fontSize="14" fontFamily="monospace">x² + y² = z²</text>
                    </g>
                </svg>
            );
        }

        // ARRAYS & GRIDS
        if (type.includes('array') || type.includes('matrix') || type.includes('dp-2d') || type.includes('sliding') || type.includes('window')) {
            return (
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <g className="opacity-50 group-hover:opacity-10 transition-opacity duration-500" fill="currentColor">
                        {/* Minimal Dot Matrix */}
                        <circle cx="50" cy="50" r="2" />
                        <circle cx="100" cy="50" r="2" />
                        <circle cx="150" cy="50" r="2" />
                        <circle cx="200" cy="50" r="2" />
                        <circle cx="250" cy="50" r="2" />

                        <circle cx="50" cy="90" r="2" />
                        <circle cx="100" cy="90" r="2" />
                        <circle cx="150" cy="90" r="2" />
                        <circle cx="200" cy="90" r="2" />
                        <circle cx="250" cy="90" r="2" />

                        <circle cx="50" cy="130" r="2" />
                        <circle cx="100" cy="130" r="2" />
                        <circle cx="150" cy="130" r="2" />
                        <circle cx="200" cy="130" r="2" />
                        <circle cx="250" cy="130" r="2" />

                        {/* Subtle Sliding Window Highlight (optional, very faint) */}
                        <rect x="90" y="40" width="120" height="20" rx="4" fill="currentColor" fillOpacity="0.1" />
                    </g>
                </svg>
            );
        }

        // BINARY & BIT MANIPULATION
        if (type.includes('bit') || type.includes('binary-search')) {
            return (
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <g className="opacity-50 group-hover:opacity-10 transition-opacity duration-500" fontSize="14" fontFamily="monospace" fill="currentColor">
                        <text x="20" y="30">10110</text>
                        <text x="100" y="50">01001</text>
                        <text x="300" y="20">11100</text>
                        <text x="50" y="100">00010</text>
                        <text x="250" y="80">10101</text>
                        <text x="200" y="150">01111</text>
                        <text x="320" y="120">&lt;&lt; 1</text>
                        <text x="350" y="180">XOR</text>
                    </g>
                </svg>
            );
        }

        // TREES, GRAPHS & POINTERS (Connections)
        if (type.includes('tree') || type.includes('graph') || type.includes('pointer') || type.includes('link') || type.includes('heap')) {
            return (
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <g className="opacity-50 group-hover:opacity-10 transition-opacity duration-500" stroke="currentColor" strokeWidth="1" fill="none">
                        <circle cx="200" cy="50" r="4" />
                        <circle cx="150" cy="100" r="4" />
                        <circle cx="250" cy="100" r="4" />
                        <circle cx="120" cy="150" r="4" />
                        <circle cx="180" cy="150" r="4" />

                        <line x1="200" y1="54" x2="150" y2="96" />
                        <line x1="200" y1="54" x2="250" y2="96" />
                        <line x1="150" y1="104" x2="120" y2="146" />
                        <line x1="150" y1="104" x2="180" y2="146" />

                        {/* Dotted lines for abstract flow */}
                        <path d="M 300 50 Q 350 100 320 150" strokeDasharray="4 4" />
                        <circle cx="300" cy="50" r="2" fill="currentColor" stroke="none" />
                        <circle cx="320" cy="150" r="2" fill="currentColor" stroke="none" />
                    </g>
                </svg>
            );
        }

        // SORTING & STACKS (Structure)
        if (type.includes('sort') || type.includes('stack') || type.includes('queue')) {
            return (
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <g className="opacity-50 group-hover:opacity-10 transition-opacity duration-500" fill="currentColor">
                        {/* Bar Chart / Sorting visualization */}
                        <rect x="300" y="100" width="10" height="50" />
                        <rect x="315" y="80" width="10" height="70" />
                        <rect x="330" y="110" width="10" height="40" />
                        <rect x="345" y="60" width="10" height="90" />

                        {/* Stack layers */}
                        <rect x="50" y="120" width="60" height="10" rx="2" />
                        <rect x="50" y="135" width="60" height="10" rx="2" />
                        <rect x="50" y="150" width="60" height="10" rx="2" />

                        <path d="M 60 100 L 60 115" stroke="currentColor" strokeWidth="1" />
                        <path d="M 100 100 L 100 115" stroke="currentColor" strokeWidth="1" />
                    </g>
                </svg>
            );
        }

        // DEFAULT CODE PATTERN
        return (
            <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <g className="opacity-40 group-hover:opacity-10 transition-opacity duration-500" fill="currentColor" fontFamily="monospace" fontSize="14">
                    <text x="30" y="40">const fn = () ={'>'} {'{'}</text>
                    <text x="50" y="70">return data;</text>
                    <text x="30" y="100">{'}'}</text>
                    <text x="250" y="50">[]</text>
                    <text x="270" y="50">{ }</text>
                    <text x="290" y="50">;</text>
                    <text x="320" y="150">{'</>'}</text>
                </g>
            </svg>
        );
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden text-white/40" aria-hidden="true">
            {/* Gradient fade to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80 z-10" />
            <div className="w-full h-full transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out">
                {getPattern(topicId)}
            </div>
        </div>
    );
}

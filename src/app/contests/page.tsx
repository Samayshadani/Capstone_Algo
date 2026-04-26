"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Trophy, Clock, Zap, ArrowRight, Activity, Award } from "lucide-react";
import TopNavbar from "@/components/dashboard/TopNavbar";

export default function ContestsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [contest, setContest] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);

    // Fetch Today's Contest
    useEffect(() => {
        const fetchDailyContest = async () => {
            try {
                const res = await fetch("/api/contest/daily");
                const data = await res.json();
                if (data.success) {
                    setContest(data.contest);
                }
            } catch (error) {
                console.error("Failed to fetch contest:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDailyContest();
    }, []);

    // Countdown Timer Logic
    useEffect(() => {
        if (!contest || !contest.endTime) return;

        const interval = setInterval(() => {
            // Firebase timestamps have seconds and nanoseconds.
            // If it's a raw ISO string (from our mock), parse it.
            let endTimeMs = 0;
            if (contest.endTime.seconds) {
                endTimeMs = contest.endTime.seconds * 1000;
            } else {
                endTimeMs = new Date(contest.endTime).getTime();
            }

            const now = Date.now();
            const diff = endTimeMs - now;

            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }

            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [contest]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-slate-200 font-sans flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">
            <TopNavbar />

            <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8 space-y-16">
                
                {/* Hero Section */}
                <div className="relative isolate overflow-hidden">
                    <div className="mx-auto max-w-2xl text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                            <Trophy size={16} className="text-indigo-400" />
                            <span>Global Coding Arena</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
                            Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Contests</span>
                        </h1>
                        <p className="text-lg leading-8 text-slate-400 font-light max-w-xl mx-auto">
                            Battle against time, solve curated problems without AI assistance, and climb the global leaderboard. Earn massive XP and prove your algorithmic mastery.
                        </p>
                    </div>
                </div>

                {/* Active Contest Card */}
                {contest && (
                    <div className="max-w-4xl mx-auto relative group">
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        
                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
                            
                            <div className="flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
                                
                                {/* Info Side */}
                                <div className="space-y-6 flex-1 text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                        <Activity size={14} className="animate-pulse" />
                                        Live Now
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{contest.title}</h2>
                                        <p className="text-indigo-300 font-medium tracking-wide">3 Problems • Closed Book • Global Rating</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                        <div className="flex items-center gap-2 text-slate-400 bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                                            <Award size={18} className="text-amber-400" />
                                            <span className="text-sm font-medium">Ranked Mode</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                                            <Zap size={18} className="text-yellow-400" />
                                            <span className="text-sm font-medium">No AI Assistance</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Timer & Action Side */}
                                <div className="flex flex-col items-center gap-6 min-w-[300px]">
                                    {/* Massive glowing timer */}
                                    <div className="bg-black/40 border border-indigo-500/30 rounded-2xl p-6 w-full shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] text-center">
                                        <div className="text-slate-400 text-xs tracking-widest uppercase font-bold mb-3 flex items-center justify-center gap-2">
                                            <Clock size={14} /> Ends In
                                        </div>
                                        {timeLeft ? (
                                            <div className="flex items-center justify-center gap-3 text-4xl font-black font-mono text-white tracking-tight">
                                                <div className="flex flex-col items-center justify-center bg-indigo-950/40 w-16 h-16 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                                    {String(timeLeft.hours).padStart(2, '0')}
                                                </div>
                                                <span className="text-indigo-500/50 animate-pulse">:</span>
                                                <div className="flex flex-col items-center justify-center bg-indigo-950/40 w-16 h-16 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                                    {String(timeLeft.minutes).padStart(2, '0')}
                                                </div>
                                                <span className="text-indigo-500/50 animate-pulse">:</span>
                                                <div className="flex flex-col items-center justify-center bg-indigo-950/40 w-16 h-16 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] text-indigo-300">
                                                    {String(timeLeft.seconds).padStart(2, '0')}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-xl font-bold text-slate-500 h-16 flex items-center justify-center">Calculating...</div>
                                        )}
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            if (!user) {
                                                alert("Please log in to enter the contest arena.");
                                                return;
                                            }
                                            router.push(`/contests/${contest.id}`);
                                        }}
                                        className="w-full relative group/btn flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg overflow-hidden bg-gradient-to-r from-indigo-600 to-cyan-600 border border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                                        <span className="relative z-10">Enter Arena</span>
                                        <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

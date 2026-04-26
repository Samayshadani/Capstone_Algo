import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trophy, Medal, X, Activity, User as UserIcon } from "lucide-react";

interface LeaderboardProps {
    contestId: string;
    onClose: () => void;
}

interface Registration {
    id: string;
    userId: string;
    score: number;
    penalties: number;
}

export default function LiveLeaderboard({ contestId, onClose }: LeaderboardProps) {
    const [players, setPlayers] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "contestRegistrations"),
            where("contestId", "==", contestId),
            orderBy("score", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: Registration[] = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() } as Registration);
            });
            
            // Sort by score (desc), then penalties (asc) for tiebreakers
            data.sort((a, b) => {
                 if (b.score !== a.score) return b.score - a.score;
                 return a.penalties - b.penalties;
            });
            
            setPlayers(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [contestId]);

    return (
        <div className="absolute inset-0 z-40 bg-[#050505]/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in slide-in-from-bottom-10 duration-300">
            <div className="max-w-4xl w-full mx-auto h-full flex flex-col bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
                
                {/* Decorative glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl rounded-tr-none border border-yellow-500/20">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Live Leaderboard</h2>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1">
                                <Activity size={12} className="animate-pulse" /> Top Ranked Players
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center gap-3 text-slate-500 justify-center py-20">
                            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            Calculating Standings...
                        </div>
                    ) : players.length === 0 ? (
                        <div className="text-center text-slate-500 py-20 font-medium">
                            No one has submitted a solution yet.<br/>Be the first to claim the #1 spot!
                        </div>
                    ) : (
                        players.map((player, index) => {
                            const isFirst = index === 0;
                            const isSecond = index === 1;
                            const isThird = index === 2;

                            return (
                                <div 
                                    key={player.id} 
                                    className={`relative flex items-center justify-between p-4 rounded-xl border transition-all
                                        ${isFirst ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 
                                          isSecond ? 'bg-slate-300/10 border-slate-300/20' : 
                                          isThird ? 'bg-amber-700/10 border-amber-700/20' : 
                                          'bg-black/40 border-white/5 hover:bg-white/5'}` 
                                    }
                                >
                                    <div className="flex items-center gap-4 text-white">
                                        {/* Rank Badge */}
                                        <div className={`w-10 h-10 flex items-center justify-center font-black rounded-lg
                                            ${isFirst ? 'bg-amber-500/20 text-amber-400' : 
                                              isSecond ? 'bg-slate-300/20 text-slate-300' : 
                                              isThird ? 'bg-amber-700/20 text-amber-600' : 
                                              'bg-white/5 text-slate-500'}`
                                        }>
                                            {isFirst || isSecond || isThird ? <Medal size={20} /> : `#${index + 1}`}
                                        </div>
                                        
                                        {/* Name */}
                                        <div className="flex flex-col">
                                            <span className="font-bold flex items-center gap-2">
                                                 <UserIcon size={14} className="text-slate-500" />
                                                 {player.userId === "Anonymous" ? "Guest User" : player.userId.substring(0,8) + "..."}
                                            </span>
                                            <div className="flex gap-4 mt-1 text-xs font-semibold text-slate-500">
                                                <span className="text-red-400/80">{player.penalties} Penalties</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="text-right">
                                        <span className={`text-2xl font-black tabular-nums 
                                            ${isFirst ? 'text-amber-400' : 'text-emerald-400'}`}>
                                            {player.score}
                                        </span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">PTS</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

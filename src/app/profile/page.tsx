"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Save, User, Loader2, Github, Linkedin, Globe, FileText, Info, Activity, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import DashboardBranding from "@/components/dashboard/DashboardBranding"; // Kept for reference
import { TechGridBackground } from "@/components/ui/tech-grid-background";
import StatsGrid, { UserStats } from "@/components/profile/StatsGrid";
import SkillRadar, { UserSkills } from "@/components/profile/SkillRadar";
import DojoProgressRings, { DifficultyStats } from "@/components/profile/DojoProgressRings";

// Helper Component for Section Headers
function SectionHeader({ icon: Icon, title, info }: { icon: any, title: string, info: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
            <div className="flex items-center gap-2 text-green-400">
                <Icon className="w-5 h-5" />
                <h3 className="font-mono font-bold tracking-wider uppercase text-sm">{title}</h3>
            </div>
            <div className="relative group">
                <Info className="w-4 h-4 text-white/20 hover:text-green-400 transition-colors cursor-help" />
                {/* Simple Custom Tooltip */}
                <div className="absolute right-0 top-6 w-48 bg-black/90 border border-white/10 rounded-md p-2 text-[10px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md shadow-xl">
                    {info}
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [nickname, setNickname] = useState("");
    const [avatarIndex, setAvatarIndex] = useState<number | null>(null);
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState({
        github: "",
        linkedin: "",
        website: ""
    });

    // Stats & Skills State
    const [stats, setStats] = useState<UserStats | undefined>(undefined);
    const [skills, setSkills] = useState<UserSkills | undefined>(undefined);
    const [difficultyStats, setDifficultyStats] = useState<DifficultyStats | undefined>(undefined);
    const [rankLoading, setRankLoading] = useState(false);

    // Load User Data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.nickname) setNickname(data.nickname);
                    if (typeof data.avatarIndex === 'number') setAvatarIndex(data.avatarIndex);
                    if (data.bio) setBio(data.bio);
                    if (data.links) setLinks({ ...links, ...data.links });
                    
                    // Load Stats & Skills if they exist, otherwise undefined (child components handle defaults)
                    if (data.stats) setStats(data.stats);
                    if (data.skills) setSkills(data.skills);
                    if (data.difficultyStats) setDifficultyStats(data.difficultyStats);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchUserData();
        else router.push("/login");
    }, [user, router]);

    // Fetch rankings from API
    useEffect(() => {
        const fetchRankings = async () => {
            if (!user?.uid) return;
            
            // Check if we already have recent rank data
            if (stats?.rank && stats?.lastRankUpdate) {
                const age = Date.now() - stats.lastRankUpdate;
                if (age < 3600000) return; // Less than 1 hour old, skip
            }

            setRankLoading(true);
            try {
                const response = await fetch(`/api/rankings?uid=${user.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    // Update stats with new rank
                    setStats(prev => ({
                        ...prev,
                        rank: data.rank,
                        solved: prev?.solved || 0,
                        streak: prev?.streak || 0,
                        level: prev?.level || `v${process.env.NEXT_PUBLIC_APP_VERSION}`,
                    }));
                }
            } catch (error) {
                console.error("Error fetching rankings:", error);
            } finally {
                setRankLoading(false);
            }
        };

        // Only fetch if we have user data loaded
        if (user && !loading) {
            fetchRankings();
        }
    }, [user, loading]);

    const handleSave = async () => {
        if (!user || user.uid === undefined) return;
        setSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                nickname,
                avatarIndex,
                bio,
                links
                // Note: Stats and Skills are typically updated by the system (e.g. after solving problems), 
                // not manually by the user here. So we don't save them back.
            });
            
            router.push("/dashboard");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-y-auto overflow-x-hidden bg-background text-foreground flex flex-col items-center">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <TechGridBackground />
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col space-y-8">
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold font-mono tracking-wider text-white">
                            IDENTITY <span className="text-green-500">PROTOCOL</span>
                        </h1>
                        <p className="text-white/40 font-mono text-sm uppercase tracking-widest mt-1">
                            Operative Dossier // Status: Active
                        </p>
                    </div>
                    {/* Stats Grid integrated at top */}
                    <div className="w-full md:w-auto flex-1 md:pl-12">
                         <StatsGrid stats={stats} />
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: IDENTITY & AVATAR (4 Cols) */}
                    <motion.div 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                         className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
                            
                            <SectionHeader 
                                icon={User} 
                                title="Visual Signature" 
                                info="Your public appearance in the AlgoVerse. Choose an avatar and callsign." 
                            />

                            {/* Nickname Input */}
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-white/60 uppercase tracking-widest pl-1">
                                    Operative Callsign
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-green-500 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        placeholder="Enter codename..."
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-lg"
                                    />
                                </div>
                            </div>

                            {/* Avatar Selection */}
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-white/60 uppercase tracking-widest pl-1">
                                    Avatar Signal
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[...Array(9)].map((_, idx) => {
                                        const row = Math.floor(idx / 3);
                                        const col = idx % 3;
                                        const isSelected = avatarIndex === idx;

                                        return (
                                            <motion.div
                                                key={idx}
                                                onClick={() => setAvatarIndex(idx)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'border-white/5 hover:border-white/20'}`}
                                            >
                                                <div
                                                    className="w-full h-full bg-cover"
                                                    style={{
                                                        backgroundImage: 'url(/avatars_grid.png)',
                                                        backgroundSize: '300% 300%',
                                                        backgroundPosition: `${col * 50}% ${row * 50}%`
                                                    }}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>


                             {/* Save Button */}
                             <button
                                 onClick={handleSave}
                                 disabled={saving || !nickname}
                                 className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed group"
                             >
                                 {saving ? (
                                     <>
                                         <Loader2 className="w-5 h-5 animate-spin" />
                                         <span>Saving...</span>
                                     </>
                                 ) : (
                                     <>
                                         <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                         <span>Confirm Identity</span>
                                     </>
                                 )}
                             </button>
                         </div>
                     </motion.div>

                    {/* RIGHT COLUMN: NEURAL METRICS & SETTINGS (7 Cols) */}
                     <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 }}
                         className="lg:col-span-7 space-y-6"
                    >
                        {/* Dojo Progress Rings */}
                        <DojoProgressRings difficultyStats={difficultyStats} />

                        {/* Upper Right: Radar Chart & Bio Split */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Skill Radar */}
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-2xl flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-full">
                                    <SectionHeader 
                                        icon={Activity}
                                        title="Neural Metrics" 
                                        info="A radar visualization of your technical proficiencies." 
                                    />
                                </div>
                                <SkillRadar skills={skills} />
                            </div>

                            {/* Bio Textarea */}
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-2xl flex flex-col">
                                <SectionHeader 
                                    icon={FileText} 
                                    title="Mission Protocol" 
                                    info="Define your personal mission, goals, or operational directives." 
                                />
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Define your operational directives (Bio)..."
                                    className="flex-1 w-full bg-black/40 border border-white/[0.06] rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-sm resize-none"
                                />
                            </div>
                        </div>

                        {/* Lower Right: Uplinks */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
                            <SectionHeader 
                                icon={Globe} 
                                title="Deep Uplinks" 
                                info="Connect your external networks and portfolios." 
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                                        <Github className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={links.github}
                                        onChange={(e) => setLinks({ ...links, github: e.target.value })}
                                        placeholder="GitHub Frequency"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-sm"
                                    />
                                </div>
                                
                                <div className="relative group">
                                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={links.linkedin}
                                        onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                                        placeholder="LinkedIn Network"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-sm"
                                    />
                                </div>

                                <div className="relative group md:col-span-2">
                                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={links.website}
                                        onChange={(e) => setLinks({ ...links, website: e.target.value })}
                                        placeholder="Personal Node (Website)"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-sm"
                                    />
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

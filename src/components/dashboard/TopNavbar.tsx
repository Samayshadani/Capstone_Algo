"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    LayoutDashboard,
    Compass,
    Languages,
    User,
    LogOut,
    Code2,
    ShieldCheck,
    Zap,
    Activity,
    Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Compass, label: "Navigator", href: "/navigator" },
    { icon: Trophy, label: "Contests", href: "/contests" },
    { icon: Languages, label: "Translator", href: "/translator" },
    { icon: User, label: "Profile", href: "/profile" },
];

const systemIcons = [
    { icon: ShieldCheck, label: "SECURE" },
    { icon: Zap, label: "ONLINE" },
    { icon: Activity, label: "STABLE" },
    { icon: Code2, label: "v2.0" },
];

export default function TopNavbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (!user) return;
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            if (doc.exists()) {
                setProfile(doc.data());
            }
        });
        return () => unsub();
    }, [user]);

    // Avatar Sprite Logic
    const avatarIndex = profile?.avatarIndex ?? null;
    const hasAvatar = typeof avatarIndex === 'number';
    const row = hasAvatar ? Math.floor(avatarIndex / 3) : 0;
    const col = hasAvatar ? avatarIndex % 3 : 0;

    // Only show on main dashboard
    if (pathname !== "/dashboard") return null;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            // Changed from sticky to absolute so it scrolls away ("vanishes")
            className="absolute top-0 z-[100] w-full border-b border-white/10 bg-black/60 backdrop-blur-2xl"
        >
            <div className="w-full px-8 h-20 flex items-center justify-between">
                {/* --- LEFT: SYSTEM STATUS --- */}
                <div className="flex items-center gap-8">
                    {/* "Logo Upper Bar Things" - System Status Icons that Popup */}
                    <div className="hidden lg:flex items-center gap-3">
                        {systemIcons.map((sys, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0.5, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1.2, y: -2 }}
                                className="p-2 rounded-full bg-white/5 hover:bg-green-500/20 text-white/40 hover:text-green-400 cursor-help transition-colors"
                                title={sys.label}
                            >
                                <sys.icon className="w-4 h-4" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CENTER: NAVIGATION --- */}
                <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/5">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        // Highlight Profile tab if on /profile
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                                    isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={cn("w-4 h-4", isActive ? "text-green-400" : "")} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* --- RIGHT: ACTIONS --- */}
                <div className="flex items-center gap-4">
                    {/* User Profile Pill */}
                    <div className="hidden sm:flex items-center gap-4">

                        {/* Avatar Circle - Larger w-12 h-12 */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-inner overflow-hidden relative border border-white/10">
                            {hasAvatar ? (
                                <div
                                    className="w-full h-full bg-cover"
                                    style={{
                                        backgroundImage: 'url(/avatars_grid.png)',
                                        backgroundSize: '300% 300%',
                                        backgroundPosition: `${col * 50}% ${row * 50}%`
                                    }}
                                />
                            ) : (
                                <span>{profile?.nickname?.[0]?.toUpperCase() || "OP"}</span>
                            )}
                        </div>

                        <div className="flex flex-col pr-2">
                            <span className="text-white font-bold text-base max-w-[120px] truncate leading-tight">
                                {profile?.nickname || "Operative"}
                            </span>
                            <span className="text-white/50 text-xs font-mono uppercase tracking-wider">Level {Math.floor((profile?.xp || 0) / 100) + 1}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => logout()}
                        className="p-3 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-full hover:rotate-90 duration-300"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}

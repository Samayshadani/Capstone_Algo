"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Compass, Languages, User, LogOut, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Compass, label: "Navigator", href: "/navigator" },
    { icon: Languages, label: "Translator", href: "/translator" },
    { icon: User, label: "Profile", href: "/profile" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="w-64 h-[calc(100vh-2rem)] glass-panel m-4 rounded-3xl flex flex-col p-6 hidden md:flex sticky top-4">
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-violet-600 flex items-center justify-center">
                    <Code2 className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold gradient-text">AlgoSensei</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                isActive ? "text-white" : "text-slate-400 hover:text-white",
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon
                                className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-400" : "group-hover:text-blue-400")}
                            />
                            <span className="font-medium relative z-10">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <button
                onClick={() => logout()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 transition-colors mt-auto group"
            >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sign Out</span>
            </button>
        </div>
    );
}

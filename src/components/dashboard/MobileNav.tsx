"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Practice", href: "/practice", icon: Code2 },
    { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 z-50 px-6 flex items-center justify-between">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                            isActive ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <Icon size={24} className={cn(isActive && "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}

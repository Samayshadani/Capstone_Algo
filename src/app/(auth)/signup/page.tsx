"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Mail, Lock, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            await signup(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to create an account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white font-outfit">
                    Create an account
                </h3>
                <p className="text-slate-400 mt-2 text-sm">
                    Enter your details below to get started.
                </p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-3 mb-6 text-sm animate-pulse">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <div className="relative group">
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3.5 pl-11 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                            <Mail size={18} />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative group">
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3.5 pl-11 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                            <Lock size={18} />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative group">
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3.5 pl-11 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                            <CheckCircle2 size={18} />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 group mt-4"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            Create Account
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-white/5">
                <p className="text-slate-400 text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-white hover:text-blue-300 font-semibold transition-colors hover:underline decoration-blue-400/30 underline-offset-4"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </>
    );
}

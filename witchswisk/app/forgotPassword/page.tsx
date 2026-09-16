'use client'

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    function validateEmail() {
        const emailParts = email.split("@");
        if (!email.includes("@") || email.trim() === "" || emailParts.length !== 2 || emailParts[0] === "" || emailParts[1] === "") {
            return "Invalid email";
        }
        return "";
    }

    const isFilled = email.trim() !== "";

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();

        const validationError = validateEmail();
        setError(validationError);
        if (validationError) return;

        if (loading) return;
        setLoading(true);

        try {
            // const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
            //     redirectTo: `${window.location.origin}/resetPassword`,
            // });

            // if (supabaseError) {
            //     setError("Something went wrong. Please try again.");
            //     return;
            // }

            setSent(true);
        } catch (err) {
            console.log("RESET PASSWORD FAILED", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)]">
            <div className="bg-brand w-full max-w-md rounded-xl p-6 sm:p-8">

                {sent ? (
                    <div className="flex flex-col items-center text-center gap-3">
                        <h1 className="text-2xl font-bold font-dancing">CHECK YOUR EMAIL</h1>
                        <p className="text-sm text-white/80">
                            If an account exists for that address, we've sent a password reset link.
                        </p>
                        <Link href="/resetPassword">RESET PAGE</Link>
                        <Link href="/signUp" className="mt-2 text-sm underline underline-offset-2 text-white/80 hover:text-white">
                            Back to login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-center mb-2">
                            FORGOT PASSWORD
                        </h1>
                        <p className="text-sm text-white/80 text-center mb-6">
                            Enter your email and we'll send you a reset link.
                        </p>

                        <form onSubmit={handleEmailSubmit} className="flex flex-col">
                            <label className="text-sm mb-1">Email:</label>
                            <input
                                className={`w-full bg-input text-white rounded-md h-9 border px-2 ${error ? "border-red-500" : "border-black"}`}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className={`text-red-300 text-sm h-5 ${error ? "visible" : "invisible"}`}>
                                {error || " "}
                            </p>

                            <button
                                type="submit"
                                disabled={loading || !isFilled}
                                className={`w-full px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 mt-2
                                ${loading || !isFilled ? "bg-gray-400 cursor-not-allowed" : "bg-white text-brand"}`}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>

                        <div className="flex justify-center mt-4">
                            <Link href="/signUp" className="text-sm underline underline-offset-2 text-white/80 hover:text-white">
                                Back to login
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}
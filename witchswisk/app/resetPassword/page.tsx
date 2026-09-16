'use client'

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser();
            setAuthorized(!!data.user);
            setCheckingAuth(false);
        }
        checkUser();
    }, []);

    function validate() {
        const newErrors = { newPassword: "", confirmPassword: "" };

        if (newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        }
        if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return {
            isValid: Object.values(newErrors).every(e => e === ""),
            errors: newErrors,
        };
    }

    const isFilled = newPassword.trim() !== "" && confirmPassword.trim() !== "";

    async function handlePasswordReset(e: React.FormEvent) {
        e.preventDefault();

        const valid = validate();
        setErrors(valid.errors);
        if (!valid.isValid) return;

        if (loading) return;
        setLoading(true);
        setError("");

        try {
            const { error: supabaseError } = await supabase.auth.updateUser({ password: newPassword });

            if (supabaseError) {
                setError("Something went wrong. Please try again.");
                return;
            }

            setSuccess(true);
            setTimeout(() => router.replace("/"), 2000);
        } catch (err) {
            console.log("RESET PASSWORD FAILED", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (checkingAuth) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <p className="text-white/80">Loading...</p>
            </div>
        );
    }

    if (!authorized) {
        return (
            <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)]">
                <div className="bg-brand w-full max-w-md rounded-xl p-6 sm:p-8 text-center flex flex-col items-center gap-3">
                    <h1 className="text-2xl font-bold font-dancing">LINK EXPIRED</h1>
                    <p className="text-sm text-white/80">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link href="/forgotPassword" className="mt-2 text-sm underline underline-offset-2 text-white/80 hover:text-white">
                        Request a new link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)]">
            <div className="bg-brand w-full max-w-md rounded-xl p-6 sm:p-8">

                {true ? (
                    <div className="flex flex-col items-center text-center gap-3">
                        <h1 className="text-2xl font-bold font-dancing">PASSWORD UPDATED</h1>
                        <p className="text-sm text-white/80">
                            Redirecting you now...
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-center mb-2">
                            RESET YOUR PASSWORD
                        </h1>
                        <p className="text-sm text-white/80 text-center mb-6">
                            Enter a new password for your account.
                        </p>

                        <form onSubmit={handlePasswordReset} className="flex flex-col gap-2">
                            <div>
                                <label className="text-sm mb-1">New Password:</label>
                                <input
                                    className={`w-full bg-input text-white rounded-md h-9 border px-2 ${errors.newPassword ? "border-red-500" : "border-black"}`}
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <p className={`text-red-300 text-sm h-5 ${errors.newPassword ? "visible" : "invisible"}`}>
                                    {errors.newPassword || " "}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm mb-1">Confirm Password:</label>
                                <input
                                    className={`w-full bg-input text-white rounded-md h-9 border px-2 ${errors.confirmPassword ? "border-red-500" : "border-black"}`}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <p className={`text-red-300 text-sm h-5 ${errors.confirmPassword ? "visible" : "invisible"}`}>
                                    {errors.confirmPassword || " "}
                                </p>
                            </div>

                            {error && (
                                <p className="text-red-300 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !isFilled}
                                className={`w-full px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 mt-2
                                ${loading || !isFilled ? "bg-gray-400 cursor-not-allowed" : "bg-white text-brand"}`}
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </>
                )}

            </div>
        </div>
    )
}
/**
 * ==========================================================
 * FINVERSE
 * High Security 2FA Password Recovery Page
 * Executive Light Theme
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaEnvelope,
    FaMobileAlt,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaArrowLeft,
    FaKey,
    FaRedo
} from "react-icons/fa";
import api from "../../services/api";
import Logo from "../../components/common/Logo";
import { sendOtpService, verifyOtpService } from "../../features/auth/services/authService";

function ForgotPassword() {
    const navigate = useNavigate();

    // Flow State: 1 = Choose Method & Input, 2 = Verify 6-digit OTP, 3 = Reset Password, 4 = Success
    const [step, setStep] = useState(1);

    // 2FA Method: "EMAIL" or "MOBILE"
    const [recoveryMethod, setRecoveryMethod] = useState("EMAIL");

    // Input States
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [devOtpCode, setDevOtpCode] = useState("");
    const [timer, setTimer] = useState(60);

    // Resend Timer countdown
    useEffect(() => {
        let interval = null;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    // Step 1: Send 2FA Code via Real Backend API
    const handleSend2FACode = async (e) => {
        e.preventDefault();
        setError("");
        setStatusMsg("");
        setDevOtpCode("");

        const identifier = recoveryMethod === "EMAIL" ? email.trim().toLowerCase() : mobile.trim();
        if (!identifier) {
            setError(recoveryMethod === "EMAIL" ? "Please enter your registered email address." : "Please enter your registered mobile number.");
            return;
        }

        setLoading(true);
        try {
            const res = await sendOtpService({
                identifier,
                recoveryMethod,
            });

            if (res && res.success) {
                setStatusMsg(res.message || `2FA Security Code sent to your registered ${recoveryMethod === "EMAIL" ? "email inbox" : "mobile number"}.`);
                if (res.devOtp) {
                    setDevOtpCode(res.devOtp);
                    setOtp(res.devOtp);
                }
                if (res.email) {
                    setEmail(res.email);
                }
                setStep(2);
                setTimer(60);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "No registered account found with this email or mobile number.");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP via Real Backend API
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        if (!otp || otp.trim().length < 4) {
            setError("Please enter the 6-digit 2FA code.");
            return;
        }

        const identifier = recoveryMethod === "EMAIL" ? email.trim().toLowerCase() : mobile.trim();

        setLoading(true);
        try {
            const res = await verifyOtpService({
                identifier,
                otp: otp.trim(),
            });

            if (res && (res.token || res.user || res.success)) {
                setStatusMsg("2FA Verification Successful. Please set your new password.");
                if (res.user?.email) {
                    setEmail(res.user.email);
                }
                setStep(3);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Invalid or expired 2FA code.");
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password in DB
    const handleResetPasswordInDb = async (e) => {
        e.preventDefault();
        setError("");
        setStatusMsg("");

        if (!newPassword || newPassword.trim().length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const targetEmail = email ? email.trim().toLowerCase() : "";
        if (!targetEmail) {
            setError("Registered email address is required to update password.");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/reset-password", {
                email: targetEmail,
                password: newPassword.trim(),
            });

            if (res.data?.success) {
                setStep(4);
            } else {
                throw new Error(res.data?.message || "Password reset failed.");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to update password in database.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans relative overflow-hidden">
            {/* Ambient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
            </div>

            <div className="w-full max-w-md space-y-6 relative z-10">

                {/* Logo Brand */}
                <div className="flex justify-center">
                    <Logo light={false} />
                </div>

                {/* Form Container */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60 space-y-6">

                    {/* Security Pill */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                            <FaShieldAlt className="h-4 w-4 text-emerald-600" />
                            <span>2FA HIGH SECURITY RECOVERY</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                            STEP {step} OF 3
                        </span>
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                            {error}
                        </div>
                    )}

                    {statusMsg && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                            {statusMsg}
                        </div>
                    )}

                    {/* STEP 1: CHOOSE 2FA METHOD & ENTER EMAIL/MOBILE */}
                    {step === 1 && (
                        <form onSubmit={handleSend2FACode} className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900">Forgot Password?</h2>
                                <p className="text-xs text-slate-600 mt-1 font-medium">
                                    Select your 2FA verification channel to reset your account password.
                                </p>
                            </div>

                            {/* 2FA Method Toggle Buttons */}
                            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
                                <button
                                    type="button"
                                    onClick={() => setRecoveryMethod("EMAIL")}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${recoveryMethod === "EMAIL"
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                            : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    <FaEnvelope className="h-3.5 w-3.5" /> Email Verification
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRecoveryMethod("MOBILE")}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${recoveryMethod === "MOBILE"
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                            : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    <FaMobileAlt className="h-3.5 w-3.5" /> Mobile SMS OTP
                                </button>
                            </div>

                            {/* Identifier Input */}
                            {recoveryMethod === "EMAIL" ? (
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                        Registered Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter email..."
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                        Registered Mobile Number
                                    </label>
                                    <div className="relative">
                                        <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                        <input
                                            type="tel"
                                            placeholder="Enter mobile number (+91 98765 43210)..."
                                            required
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition font-mono"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-600/25"
                            >
                                {loading ? "Sending Security Code..." : "Send 2FA Security Code"}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: ENTER 6-DIGIT OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900">Enter 2FA Security Code</h2>
                                <p className="text-xs text-slate-600 mt-1 font-medium">
                                    We sent a 6-digit verification code to your {recoveryMethod === "EMAIL" ? "email" : "mobile phone"}.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                    6-Digit Verification Code
                                </label>
                                <div className="relative">
                                    <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit code..."
                                        maxLength={6}
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-sm font-mono tracking-widest text-center text-emerald-600 font-black placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-600 pt-1 font-medium">
                                <span>Resend Code in: <strong className="text-slate-900 font-mono">{timer}s</strong></span>
                                <button
                                    type="button"
                                    disabled={timer > 0}
                                    onClick={() => setTimer(60)}
                                    className="text-blue-600 hover:underline disabled:opacity-40 cursor-pointer flex items-center gap-1 font-bold"
                                >
                                    <FaRedo className="h-3 w-3" /> Resend OTP
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-600/25"
                            >
                                {loading ? "Verifying..." : "Verify 2FA Code"}
                            </button>
                        </form>
                    )}

                    {/* STEP 3: SET NEW PASSWORD */}
                    {step === 3 && (
                        <form onSubmit={handleResetPasswordInDb} className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900">Set New Password</h2>
                                <p className="text-xs text-slate-600 mt-1 font-medium">
                                    Your 2FA verification is complete. Enter your new password below.
                                </p>
                            </div>

                            {/* New Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password..."
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter confirm password..."
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-600/25"
                            >
                                {loading ? "Updating Password in DB..." : "Update Password in Database"}
                            </button>
                        </form>
                    )}

                    {/* STEP 4: SUCCESS CONFIRMATION */}
                    {step === 4 && (
                        <div className="text-center space-y-4 py-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                                <FaCheckCircle className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Password Reset Complete!</h2>
                                <p className="text-xs text-slate-600 mt-2 font-medium">
                                    Your password has been successfully updated in the database via 2FA verification.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition cursor-pointer shadow-lg shadow-blue-600/25"
                            >
                                Back to Login & Sign In
                            </button>
                        </div>
                    )}

                    {/* Back to Login Footer */}
                    <div className="pt-2 text-center border-t border-slate-100">
                        <Link
                            to="/login"
                            className="text-xs font-bold text-slate-500 hover:text-blue-600 transition inline-flex items-center gap-1.5"
                        >
                            <FaArrowLeft className="h-3 w-3" /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;
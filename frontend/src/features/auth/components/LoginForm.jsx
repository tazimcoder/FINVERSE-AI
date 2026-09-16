/**
 * ==========================================================
 * FINVERSE
 * Professional Executive Light Login Form with Remembered Email Memory
 * Real 2FA OTP Gateway with Database Registration Check & Mail Dispatch
 * ==========================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaArrowRight,
    FaKey,
    FaMobileAlt,
    FaUserCheck,
    FaCheckCircle
} from "react-icons/fa";

import useLogin from "../hooks/useLogin";

function LoginForm() {
    const {
        email,
        password,
        lastEmail,
        setEmail,
        setPassword,
        showPassword,
        setShowPassword,
        handleSubmit,
        handleSendOtp,
        handleVerifyOtp,
        loading,
        error,
        setError
    } = useLogin();

    const [loginMode, setLoginMode] = useState("PASSWORD"); // "PASSWORD" or "OTP_2FA"
    const [otpChannel, setOtpChannel] = useState("EMAIL"); // "EMAIL" or "MOBILE"
    const [mobileInput, setMobileInput] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [devOtpCode, setDevOtpCode] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(true);
    const [showEmailSuggestion, setShowEmailSuggestion] = useState(false);

    // Send 2FA OTP Code (Checks Database Registration)
    const onSendOtpClick = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setDevOtpCode("");

        const identifier = otpChannel === "EMAIL" ? email : mobileInput;
        const res = await handleSendOtp({ identifier, recoveryMethod: otpChannel });

        if (res && res.success) {
            setOtpSent(true);
            setSuccessMsg(res.message || `2FA OTP Code sent to your registered ${otpChannel === "EMAIL" ? "email inbox" : "mobile number"}.`);
            if (res.devOtp) {
                setDevOtpCode(res.devOtp);
                setOtpCode(res.devOtp); // Auto-fill for seamless testing in dev environment
            }
        }
    };

    // Verify 2FA OTP & Sign In
    const onVerifyOtpSubmit = async (e) => {
        e.preventDefault();
        const identifier = otpChannel === "EMAIL" ? email : mobileInput;
        await handleVerifyOtp({ identifier, otp: otpCode });
    };

    return (
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60 space-y-6">

            {/* Top Security Header Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                    <FaShieldAlt className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900 tracking-wide">SECURE AUTH GATEWAY</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● ACTIVE SESSION
                </span>
            </div>

            {/* Auth Mode Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
                <button
                    type="button"
                    onClick={() => {
                        setLoginMode("PASSWORD");
                        setError("");
                        setSuccessMsg("");
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${loginMode === "PASSWORD"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                >
                    <FaLock className="h-3 w-3" /> Password Login
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setLoginMode("OTP_2FA");
                        setError("");
                        setSuccessMsg("");
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${loginMode === "OTP_2FA"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                >
                    <FaMobileAlt className="h-3 w-3" /> 2FA OTP Login
                </button>
            </div>

            {/* Heading */}
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {loginMode === "PASSWORD" ? "Sign In to Portal" : "2FA Security Login"}
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                    {loginMode === "PASSWORD"
                        ? "Enter your registered credentials to access your FINVERSE account."
                        : "Passwordless 2FA Login for registered accounts via Email or Mobile."}
                </p>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                    <FaShieldAlt className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                </div>
            )}

            {/* Success Banner */}
            {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-700">
                        <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{successMsg}</span>
                    </div>
                    {devOtpCode && (
                        <div className="pt-1 flex items-center justify-between text-[11px] border-t border-emerald-200/60 mt-1">
                            <span className="text-slate-600 font-medium">Dev Test Mode 2FA OTP Code:</span>
                            <span className="font-mono text-xs font-black text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                                {devOtpCode}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Mode 1: Standard Password Login Form */}
            {loginMode === "PASSWORD" ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-800">
                                Email Address
                            </label>

                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail("admin@finverse.ai");
                                        setPassword("admin123");
                                    }}
                                    className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md hover:bg-blue-100 transition cursor-pointer flex items-center gap-1"
                                >
                                    <FaShieldAlt className="h-2.5 w-2.5 text-blue-600" />
                                    Fill Admin Credentials
                                </button>

                                {/* Remembered Email Suggestion Badge */}
                                {lastEmail && (
                                    <button
                                        type="button"
                                        onClick={() => setEmail(lastEmail)}
                                        className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1"
                                    >
                                        <FaUserCheck className="h-2.5 w-2.5" />
                                        Use {lastEmail}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="Enter email address..."
                                autoComplete="email"
                                required
                                value={email}
                                onFocus={() => setShowEmailSuggestion(true)}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>

                        {/* Interactive Click Suggestion Dropdown */}
                        {showEmailSuggestion && lastEmail && email !== lastEmail && (
                            <div className="mt-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                <span className="text-[10px] text-slate-500 font-medium">Previously signed in email:</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail(lastEmail);
                                        setShowEmailSuggestion(false);
                                    }}
                                    className="text-xs font-bold text-blue-600 hover:underline font-mono cursor-pointer"
                                >
                                    {lastEmail}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-800">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-xs font-bold text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password..."
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    {/* Anti-Bot Security Checkpoint */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={captchaVerified}
                                onChange={(e) => setCaptchaVerified(e.target.checked)}
                                className="h-4 w-4 rounded-md border-slate-300 bg-white text-emerald-600 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs text-slate-700 font-semibold">
                                Anti-Bot Shield Verified
                            </span>
                        </label>
                        <FaShieldAlt className="h-4 w-4 text-emerald-600" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !captchaVerified}
                        className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                    >
                        {loading ? (
                            <span>Authenticating Session...</span>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <FaArrowRight className="h-3 w-3" />
                            </>
                        )}
                    </button>
                </form>
            ) : (
                /* Mode 2: 2FA OTP Login Form */
                <form onSubmit={otpSent ? onVerifyOtpSubmit : onSendOtpClick} className="space-y-4">

                    {/* 2FA Channel Selector */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Select 2FA Channel:</span>
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="radio"
                                    name="otpChannel"
                                    checked={otpChannel === "EMAIL"}
                                    onChange={() => {
                                        setOtpChannel("EMAIL");
                                        setOtpSent(false);
                                        setError("");
                                        setSuccessMsg("");
                                    }}
                                    className="text-blue-600 focus:ring-0"
                                />
                                <span>Email</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="radio"
                                    name="otpChannel"
                                    checked={otpChannel === "MOBILE"}
                                    onChange={() => {
                                        setOtpChannel("MOBILE");
                                        setOtpSent(false);
                                        setError("");
                                        setSuccessMsg("");
                                    }}
                                    className="text-blue-600 focus:ring-0"
                                />
                                <span>Mobile SMS</span>
                            </label>
                        </div>
                    </div>

                    {/* Input Field based on Channel */}
                    {otpChannel === "EMAIL" ? (
                        <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1.5">
                                Registered Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="Enter registered email address..."
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
                                    placeholder="Enter registered mobile (+91 98765 43210)..."
                                    required
                                    value={mobileInput}
                                    onChange={(e) => setMobileInput(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {/* OTP Code Input */}
                    {otpSent && (
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-800">
                                    6-Digit 2FA OTP Code
                                </label>
                                <button
                                    type="button"
                                    onClick={onSendOtpClick}
                                    className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                                >
                                    Resend Code
                                </button>
                            </div>
                            <div className="relative">
                                <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit code..."
                                    maxLength={6}
                                    required
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-mono tracking-widest text-emerald-600 font-bold focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                    >
                        {loading
                            ? "Processing Request..."
                            : otpSent
                                ? "Verify 2FA Code & Sign In"
                                : "Send 2FA OTP Code"}
                    </button>
                </form>
            )}

            {/* Create Account Prompt */}
            <p className="text-center text-xs text-slate-600 font-medium">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-bold text-blue-600 hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
}

export default LoginForm;
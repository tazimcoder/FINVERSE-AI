/**
 * ==========================================================
 * FINVERSE AI — Executive Dark Login Form Component
 * Password & 2FA OTP Auth Gateway with Micro-Interactions & Animation
 * ==========================================================
 */

import React, { useState } from "react";
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

  const [loginMode, setLoginMode] = useState("PASSWORD");
  const [otpChannel, setOtpChannel] = useState("EMAIL");
  const [mobileInput, setMobileInput] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [devOtpCode, setDevOtpCode] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(true);
  const [showEmailSuggestion, setShowEmailSuggestion] = useState(false);

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
        setOtpCode(res.devOtp);
      }
    }
  };

  const onVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    const identifier = otpChannel === "EMAIL" ? email : mobileInput;
    await handleVerifyOtp({ identifier, otp: otpCode });
  };

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0F172A]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 font-sans animate-scale-pop">
      {/* Top Security Banner */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold text-white tracking-wide">SECURE AUTH GATEWAY</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE SESSION
        </span>
      </div>

      {/* Auth Mode Selector */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
        <button
          type="button"
          onClick={() => {
            setLoginMode("PASSWORD");
            setError("");
            setSuccessMsg("");
          }}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
            loginMode === "PASSWORD"
              ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md font-extrabold"
              : "text-slate-400 hover:text-white"
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
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
            loginMode === "OTP_2FA"
              ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md font-extrabold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FaMobileAlt className="h-3 w-3" /> 2FA OTP Login
        </button>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {loginMode === "PASSWORD" ? "Sign In to Portal" : "2FA Security Login"}
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          {loginMode === "PASSWORD"
            ? "Enter your registered credentials to access your FINVERSE AI account."
            : "Passwordless 2FA Login for registered accounts via Email or Mobile."}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-2.5 animate-toast-slide">
          <FaShieldAlt className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-100 text-xs font-semibold space-y-1 animate-toast-slide">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          {devOtpCode && (
            <div className="pt-1 flex items-center justify-between text-[11px] border-t border-emerald-500/30 mt-1">
              <span className="text-slate-300 font-medium">Dev Mode 2FA Code:</span>
              <span className="font-mono text-xs font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                {devOtpCode}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Password Mode */}
      {loginMode === "PASSWORD" ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Email Address
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@finverse.ai");
                    setPassword("admin123");
                  }}
                  className="text-[10px] font-bold text-cyan-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md hover:bg-slate-800 transition cursor-pointer flex items-center gap-1"
                >
                  <FaShieldAlt className="h-2.5 w-2.5 text-cyan-400" />
                  Fill Admin Credentials
                </button>

                {lastEmail && (
                  <button
                    type="button"
                    onClick={() => setEmail(lastEmail)}
                    className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md hover:bg-emerald-900/60 transition cursor-pointer flex items-center gap-1"
                  >
                    <FaUserCheck className="h-2.5 w-2.5" />
                    Use {lastEmail}
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="email"
                placeholder="Enter email address..."
                autoComplete="email"
                required
                value={email}
                onFocus={() => setShowEmailSuggestion(true)}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
              />
            </div>

            {showEmailSuggestion && lastEmail && email !== lastEmail && (
              <div className="mt-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Previous session email:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(lastEmail);
                    setShowEmailSuggestion(false);
                  }}
                  className="text-xs font-bold text-cyan-400 hover:underline font-mono cursor-pointer"
                >
                  {lastEmail}
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-bold text-cyan-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-10 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer p-1"
              >
                {showPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={captchaVerified}
                onChange={(e) => setCaptchaVerified(e.target.checked)}
                className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-cyan-400 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-semibold">
                Anti-Bot Shield Verified
              </span>
            </label>
            <FaShieldAlt className="h-4 w-4 text-emerald-400" />
          </div>

          <button
            type="submit"
            disabled={loading || !captchaVerified}
            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold py-3.5 text-xs transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 fin-btn-press"
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
        /* Mode 2: 2FA OTP Form */
        <form onSubmit={otpSent ? onVerifyOtpSubmit : onSendOtpClick} className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
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
                  className="text-cyan-400 focus:ring-0"
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
                  className="text-cyan-400 focus:ring-0"
                />
                <span>Mobile SMS</span>
              </label>
            </div>
          </div>

          {otpChannel === "EMAIL" ? (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter registered email address..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Registered Mobile Number
              </label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="tel"
                  placeholder="Enter registered mobile (+91 98765 43210)..."
                  required
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200 font-mono"
                />
              </div>
            </div>
          )}

          {otpSent && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  6-Digit 2FA OTP Code
                </label>
                <button
                  type="button"
                  onClick={onSendOtpClick}
                  className="text-[10px] font-bold text-cyan-400 hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              </div>
              <div className="relative">
                <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Enter 6-digit code..."
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-mono tracking-widest text-cyan-300 font-bold focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold py-3.5 text-xs transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 fin-btn-press"
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
      <p className="text-center text-xs text-slate-400 font-medium">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-cyan-400 hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
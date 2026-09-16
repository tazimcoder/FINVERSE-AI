/**
 * ==========================================================
 * FINVERSE AI — Executive Dark Register Form Component
 * Dark glass card with micro-interactions, floating focus rings & validation
 * ==========================================================
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";
import useRegister from "../hooks/useRegister";

function RegisterForm() {
  const {
    full_name,
    email,
    mobile,
    password,
    confirm_password,
    acceptedTerms,
    setFullName,
    setEmail,
    setMobile,
    setPassword,
    setConfirmPassword,
    setAcceptedTerms,
    loading,
    errors,
    serverError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSubmit,
  } = useRegister();

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0F172A]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 font-sans animate-scale-pop">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Open your FINVERSE account for banking, loans & wealth intelligence.
        </p>
      </div>

      {/* Error Alert */}
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-2.5 animate-toast-slide">
          <FaShieldAlt className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Enter full name..."
              required
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
            />
          </div>
          {errors?.full_name && (
            <p className="mt-1 text-[10px] font-bold text-rose-400">{errors.full_name}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="email"
              placeholder="Enter email address..."
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
            />
          </div>
          {errors?.email && (
            <p className="mt-1 text-[10px] font-bold text-rose-400">{errors.email}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Mobile Number (For 2FA SMS & Alerts)
          </label>
          <div className="relative">
            <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="tel"
              placeholder="Enter mobile number (+91 98765 43210)..."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200 font-mono"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
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
          {errors?.password && (
            <p className="mt-1 text-[10px] font-bold text-rose-400">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter confirm password..."
              required
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3 pl-10 pr-10 text-xs font-medium text-white placeholder-slate-500 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer p-1"
            >
              {showConfirmPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors?.confirm_password && (
            <p className="mt-1 text-[10px] font-bold text-rose-400">{errors.confirm_password}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-800 bg-slate-900 text-cyan-400 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-slate-400 font-medium leading-relaxed">
              I accept the Terms of Service and Privacy Policy.
            </span>
          </label>
          {errors?.terms && (
            <p className="mt-1 text-[10px] font-bold text-rose-400">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold py-3.5 text-xs transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 fin-btn-press"
        >
          {loading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Create Account</span>
              <FaArrowRight className="h-3 w-3" />
            </>
          )}
        </button>
      </form>

      {/* Login Prompt */}
      <p className="text-center text-xs text-slate-400 font-medium">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-cyan-400 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
/**
 * ==========================================================
 * FINVERSE
 * Professional Clean Light Register Form
 * Supports Full Name, Email Address, Mobile Number & Password
 * ==========================================================
 */

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
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60 space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Create Account
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                    Open your FINVERSE account for banking, loans & investments.
                </p>
            </div>

            {/* Error */}
            {serverError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                    <FaShieldAlt className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{serverError}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Full Name
                    </label>
                    <div className="relative">
                        <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Enter full name..."
                            required
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                        />
                    </div>
                    {errors?.full_name && (
                        <p className="mt-1 text-[10px] font-bold text-rose-600">{errors.full_name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type="email"
                            placeholder="Enter email address..."
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                        />
                    </div>
                    {errors?.email && (
                        <p className="mt-1 text-[10px] font-bold text-rose-600">{errors.email}</p>
                    )}
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Mobile Number (For 2FA SMS & Alerts)
                    </label>
                    <div className="relative">
                        <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type="tel"
                            placeholder="Enter mobile number (+91 98765 43210)..."
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition font-mono"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password..."
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
                            {showPassword ? (
                                <FaEyeSlash className="h-3.5 w-3.5" />
                            ) : (
                                <FaEye className="h-3.5 w-3.5" />
                            )}
                        </button>
                    </div>
                    {errors?.password && (
                        <p className="mt-1 text-[10px] font-bold text-rose-600">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter confirm password..."
                            required
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="h-3.5 w-3.5" />
                            ) : (
                                <FaEye className="h-3.5 w-3.5" />
                            )}
                        </button>
                    </div>
                    {errors?.confirm_password && (
                        <p className="mt-1 text-[10px] font-bold text-rose-600">{errors.confirm_password}</p>
                    )}
                </div>

                {/* Terms Acceptance */}
                <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded-md border-slate-300 bg-white text-blue-600 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 font-medium">
                            I accept the Terms of Service and Privacy Policy.
                        </span>
                    </label>
                    {errors?.terms && (
                        <p className="mt-1 text-[10px] font-bold text-rose-600">{errors.terms}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
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
            <p className="text-center text-xs text-slate-600 font-medium">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
}

export default RegisterForm;
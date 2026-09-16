/**
 * ==========================================================
 * FINVERSE AI
 * Interactive Loan Eligibility & Financial Capacity Engine
 * ==========================================================
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalculator, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";

function LoanEligibilityCard({ onApplyWithEligibility }) {
    const [monthlyIncome, setMonthlyIncome] = useState(75000);
    const [existingEmi, setExistingEmi] = useState(10000);
    const [requestedAmount, setRequestedAmount] = useState(500000);
    const [tenureMonths, setTenureMonths] = useState(36);
    const [creditScore, setCreditScore] = useState(750);
    const [interestRate, setInterestRate] = useState(11.5);

    const [evaluating, setEvaluating] = useState(false);
    const [result, setResult] = useState(null);

    // Perform financial evaluation via backend API
    const evaluate = async () => {
        setEvaluating(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:5000/api/v1/loan-eligibility/evaluate",
                {
                    monthly_income: monthlyIncome,
                    existing_emi: existingEmi,
                    requested_amount: requestedAmount,
                    tenure_months: tenureMonths,
                    credit_score: creditScore,
                    interest_rate: interestRate
                },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );
            if (res.data?.success) {
                setResult(res.data.data);
            }
        } catch (err) {
            console.error("Eligibility evaluation error:", err);
        } finally {
            setEvaluating(false);
        }
    };

    // Auto evaluate on load & parameter changes
    useEffect(() => {
        evaluate();
    }, [monthlyIncome, existingEmi, requestedAmount, tenureMonths, creditScore, interestRate]);

    // Financial formulas for instant local feedback
    const r = interestRate / 12 / 100;
    const estimatedEmi = Math.round((requestedAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)) || 0;
    const totalObligation = existingEmi + estimatedEmi;
    const foir = Math.round((totalObligation / (monthlyIncome || 1)) * 100);
    const maxEmiCapacity = Math.max(0, Math.round(monthlyIncome * 0.50 - existingEmi));
    const maxLoanCapacity = maxEmiCapacity > 0
        ? Math.round((maxEmiCapacity * (Math.pow(1 + r, tenureMonths) - 1)) / (r * Math.pow(1 + r, tenureMonths)))
        : 0;

    const evalData = result || {
        is_eligible: foir <= 50 && creditScore >= 650 && maxLoanCapacity >= requestedAmount,
        eligibility_score: Math.min(100, Math.round((creditScore / 850) * 50 + (foir <= 50 ? 50 : 20))),
        max_eligible_amount: maxLoanCapacity,
        proposed_emi: estimatedEmi,
        max_allowed_emi: maxEmiCapacity,
        foir_percent: foir,
        checks: [
            { name: "Minimum Income Requirement (₹25k+)", passed: monthlyIncome >= 25000, value: `₹${monthlyIncome.toLocaleString("en-IN")}` },
            { name: "Credit Bureau Rating (650+)", passed: creditScore >= 650, value: `${creditScore} (${creditScore >= 750 ? "EXCELLENT" : "AVERAGE"})` },
            { name: "FOIR Fixed Obligation Cap (Max 50%)", passed: foir <= 50, value: `${foir}%` },
            { name: "Net Disposable Cashflow", passed: monthlyIncome - totalObligation >= 15000, value: `₹${(monthlyIncome - totalObligation).toLocaleString("en-IN")}` },
            { name: "Debt Service Capacity Check", passed: maxLoanCapacity >= requestedAmount, value: `Limit: ₹${maxLoanCapacity.toLocaleString("en-IN")}` }
        ]
    };

    const finalApprovedLimit = evalData.max_eligible_amount || maxLoanCapacity || requestedAmount;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                        <FaCalculator className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Authoritative FinTech Engine
                        </span>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                            Instant Loan Capacity & FOIR Calculator
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-sm ${
                        evalData.is_eligible 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                    }`}>
                        {evalData.is_eligible ? <FaCheckCircle className="h-4 w-4" /> : <FaTimesCircle className="h-4 w-4" />}
                        {evalData.is_eligible ? "Eligible for Instant Credit" : "High Financial Risk / Ineligible"}
                    </span>

                    <button
                        onClick={evaluate}
                        disabled={evaluating}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                    >
                        {evaluating ? "Evaluating..." : "Recalculate"}
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Interactive Sliders */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Monthly Income Slider */}
                    <div>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-slate-700 dark:text-slate-300">Monthly Net Income (₹)</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">₹ {Number(monthlyIncome).toLocaleString("en-IN")}</span>
                        </div>
                        <input
                            type="range"
                            min="15000"
                            max="500000"
                            step="5000"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-700"
                        />
                    </div>

                    {/* Existing Monthly EMI Slider */}
                    <div>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-slate-700 dark:text-slate-300">Existing Monthly EMI Obligations (₹)</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">₹ {Number(existingEmi).toLocaleString("en-IN")}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="2000"
                            value={existingEmi}
                            onChange={(e) => setExistingEmi(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-amber-600 dark:bg-slate-700"
                        />
                    </div>

                    {/* Requested Amount Slider */}
                    <div>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-slate-700 dark:text-slate-300">Desired Loan Amount (₹)</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">₹ {Number(requestedAmount).toLocaleString("en-IN")}</span>
                        </div>
                        <input
                            type="range"
                            min="25000"
                            max="5000000"
                            step="25000"
                            value={requestedAmount}
                            onChange={(e) => setRequestedAmount(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-700"
                        />
                    </div>

                    {/* Tenure & Credit Score Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-slate-700 dark:text-slate-300">Tenure (Months)</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{tenureMonths} Mo</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="84"
                                step="6"
                                value={tenureMonths}
                                onChange={(e) => setTenureMonths(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-slate-700 dark:text-slate-300">Credit Score (CIBIL)</span>
                                <span className="font-bold text-purple-600 dark:text-purple-400">{creditScore}</span>
                            </div>
                            <input
                                type="range"
                                min="300"
                                max="900"
                                step="10"
                                value={creditScore}
                                onChange={(e) => setCreditScore(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-purple-600 dark:bg-slate-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Calculated Results & Financial Metrics */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/50">
                    <div className="space-y-4">
                        {/* Max Eligible Credit Line Card */}
                        <div className="rounded-xl border border-blue-100 bg-blue-50/80 p-4 dark:border-blue-900/50 dark:bg-blue-950/40">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                                Maximum Eligible Loan Line
                            </span>
                            <div className="mt-1 text-2xl font-black text-blue-900 dark:text-blue-100">
                                ₹ {Number(finalApprovedLimit).toLocaleString("en-IN")}
                            </div>
                            <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                                Max allowed monthly EMI capacity: <strong>₹ {Number(evalData.max_allowed_emi || maxEmiCapacity).toLocaleString("en-IN")}</strong>
                            </p>

                            {/* Direct Action Button to Apply with calculated parameters */}
                            <button
                                type="button"
                                onClick={() => onApplyWithEligibility && onApplyWithEligibility({
                                    requested_amount: finalApprovedLimit,
                                    tenure_months: tenureMonths,
                                    monthly_income: monthlyIncome
                                })}
                                className="mt-3.5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <FaPlus className="h-3.5 w-3.5" />
                                <span>Apply Now with Calculated Limit (₹ {Number(finalApprovedLimit).toLocaleString("en-IN")})</span>
                            </button>
                        </div>

                        {/* Proposed EMI & FOIR Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
                                <span className="text-xs text-slate-500">Estimated EMI</span>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    ₹ {Number(evalData.proposed_emi || estimatedEmi).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
                                <span className="text-xs text-slate-500">FOIR Obligation</span>
                                <div className={`text-lg font-bold ${foir <= 50 ? "text-emerald-600" : "text-rose-600"}`}>
                                    {evalData.foir_percent || foir}%
                                </div>
                            </div>
                        </div>

                        {/* Financial Checks Breakdown */}
                        <div className="space-y-2 border-t border-slate-200/60 pt-3 dark:border-slate-700">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Underwriting Compliance Checks
                            </span>
                            {evalData.checks.map((c, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs py-1">
                                    <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                                    <span className={`font-bold ${c.passed ? "text-emerald-600" : "text-rose-600"}`}>
                                        {c.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoanEligibilityCard;

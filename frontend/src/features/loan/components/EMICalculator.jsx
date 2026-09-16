import React, { useState, useMemo } from "react";
import { FaCalculator, FaArrowRight, FaCheckCircle, FaChartLine } from "react-icons/fa";

export default function EMICalculator({ onApplyWithParams }) {
    const [amount, setAmount] = useState(2500000); // ₹25 Lakhs
    const [rate, setRate] = useState(8.5); // 8.5%
    const [tenureYears, setTenureYears] = useState(15); // 15 years
    const [loanType, setLoanType] = useState("Home Loan");

    const stats = useMemo(() => {
        const principal = Number(amount);
        const monthlyRate = Number(rate) / 12 / 100;
        const totalMonths = Number(tenureYears) * 12;

        if (monthlyRate === 0) {
            const emi = principal / totalMonths;
            return {
                emi: Math.round(emi),
                totalInterest: 0,
                totalPayment: principal,
                interestPercentage: 0,
            };
        }

        const emi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

        const totalPayment = emi * totalMonths;
        const totalInterest = totalPayment - principal;
        const interestPercentage = Math.round((totalInterest / totalPayment) * 100);

        return {
            emi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment),
            interestPercentage,
        };
    }, [amount, rate, tenureYears]);

    const formatINR = (val) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaCalculator className="w-4 h-4" /> Smart Loan Calculator
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        EMI & Loan Eligibility Simulator
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Adjust parameters to calculate your exact monthly installment and interest schedule.
                    </p>
                </div>

                {/* Loan Type Selector */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    {["Home Loan", "Personal Loan", "Car Loan", "Business Loan"].map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                setLoanType(type);
                                if (type === "Home Loan") setRate(8.5);
                                else if (type === "Personal Loan") setRate(11.5);
                                else if (type === "Car Loan") setRate(9.2);
                                else if (type === "Business Loan") setRate(13.0);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                loanType === type
                                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Left Sliders */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Loan Amount Slider */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Loan Amount
                            </label>
                            <span className="text-base font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-900/50">
                                {formatINR(amount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={100000}
                            max={10000000}
                            step={50000}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>₹1 Lakh</span>
                            <span>₹50 Lakhs</span>
                            <span>₹1 Crore</span>
                        </div>
                    </div>

                    {/* Interest Rate Slider */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Interest Rate (% p.a.)
                            </label>
                            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                                {rate}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min={6.0}
                            max={20.0}
                            step={0.1}
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>6.0%</span>
                            <span>12.5%</span>
                            <span>20.0%</span>
                        </div>
                    </div>

                    {/* Loan Tenure Slider */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Loan Tenure (Years)
                            </label>
                            <span className="text-base font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-lg border border-violet-100 dark:border-violet-900/50">
                                {tenureYears} Years ({tenureYears * 12} Months)
                            </span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={30}
                            step={1}
                            value={tenureYears}
                            onChange={(e) => setTenureYears(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>1 Year</span>
                            <span>15 Years</span>
                            <span>30 Years</span>
                        </div>
                    </div>
                </div>

                {/* Right Results & Breakdown */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Estimated Monthly Installment
                        </span>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 text-blue-600 dark:text-blue-400">
                            {formatINR(stats.emi)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ month</span>
                        </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-700 dark:text-slate-300">Principal Amount</span>
                            <span className="text-emerald-600 dark:text-emerald-400">Interest Payable ({stats.interestPercentage}%)</span>
                        </div>
                        <div className="h-3 w-full bg-emerald-500 rounded-full overflow-hidden flex">
                            <div
                                style={{ width: `${100 - stats.interestPercentage}%` }}
                                className="bg-blue-600 h-full transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                            <span className="text-slate-500 dark:text-slate-400">Principal Amount:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{formatINR(amount)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                            <span className="text-slate-500 dark:text-slate-400">Total Interest Payable:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatINR(stats.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 font-bold text-slate-900 dark:text-white">
                            <span>Total Payable Amount:</span>
                            <span>{formatINR(stats.totalPayment)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onApplyWithParams?.({ loanType, amount, rate, tenureYears, emi: stats.emi })}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <span>Apply Loan with these Parameters</span>
                        <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

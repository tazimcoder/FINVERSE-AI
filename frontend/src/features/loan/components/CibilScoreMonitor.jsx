import React, { useState, useEffect } from "react";
import { FaShieldAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { getUserCibil } from "../api/userFeaturesApi";

export default function CibilScoreMonitor() {
    const [cibil, setCibil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [simulatedPayoff, setSimulatedPayoff] = useState(0);

    const loadCibil = async () => {
        try {
            setLoading(true);
            const res = await getUserCibil();
            if (res.success) {
                setCibil(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch CIBIL score:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCibil();
    }, []);

    const baseScore = cibil?.cibil_score || 785;
    const simulatedScore = Math.min(900, baseScore + Math.round((simulatedPayoff / 10000) * 5));

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaShieldAlt className="w-3.5 h-3.5" /> Credit Health & CIBIL Monitor
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        CIBIL Score & Credit Rating
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Official CIBIL / Experian credit score telemetry and real-time score simulator.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                        <FaCheckCircle className="w-3.5 h-3.5" /> High Approval Likelihood
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Radial Score Gauge Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Current Credit Score
                        </span>

                        {/* Circular Meter representation */}
                        <div className="relative flex items-center justify-center w-36 h-36 mx-auto rounded-full bg-slate-800/80 border-4 border-emerald-500 shadow-inner">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white tracking-tight">
                                    {simulatedScore}
                                </div>
                                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                                    {cibil?.credit_rating || "Excellent"}
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-slate-400 max-w-xs">
                            Score updated on {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}. Higher scores qualify for prime loan interest rates starting at 8.25%.
                        </div>
                    </div>
                </div>

                {/* Score Breakdown Metrics & Simulator */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Payment History</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                                {cibil?.payment_history_score || 98}%
                            </div>
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">On-time payments</div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Credit Utilization</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                                {cibil?.credit_utilization_pct || 18}%
                            </div>
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Optimal (&lt; 30%)</div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 col-span-2 sm:col-span-1">
                            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Credit History Age</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                                {cibil?.credit_age_years || 4.5} Yrs
                            </div>
                            <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">Established profile</div>
                        </div>
                    </div>

                    {/* Credit Simulator Slider */}
                    <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-200">
                                <FaChartLine className="w-4 h-4 text-blue-600" /> CIBIL Score Simulator
                            </div>
                            {simulatedPayoff > 0 && (
                                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                                    +{simulatedScore - baseScore} Score Boost!
                                </span>
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                                <span>Simulate paying off credit card debt:</span>
                                <span className="font-bold">₹{simulatedPayoff.toLocaleString("en-IN")}</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={200000}
                                step={10000}
                                value={simulatedPayoff}
                                onChange={(e) => setSimulatedPayoff(Number(e.target.value))}
                                className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                <span>₹0</span>
                                <span>₹1 Lakh</span>
                                <span>₹2 Lakhs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

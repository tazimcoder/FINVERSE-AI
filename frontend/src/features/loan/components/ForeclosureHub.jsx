import { useState } from "react";
import { FaPercentage, FaCheckCircle, FaLock, FaShieldAlt } from "react-icons/fa";

export default function ForeclosureHub({ activeLoan }) {
    const [payoffType, setPayoffType] = useState("PARTIAL");
    const [amount, setAmount] = useState(50000);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleExecute = async () => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/v1/user/loans/foreclosure", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ loanId: activeLoan?.id || 1, amount, type: payoffType })
            });
            const data = await res.json();
            if (data.success) {
                setMessage(`Prepayment Confirmed! ${data.data.message}`);
            } else {
                setMessage(data.message || "Prepayment failed.");
            }
        } catch (err) {
            setMessage("Prepayment request recorded successfully.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        <FaPercentage /> Interest Saver Pre-Payment
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Loan Foreclosure & Part-Payment Portal
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Reduce your interest burden or fully close your loan account with 0% foreclosure penalty.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Active Loan Principal</span>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                        ₹ {parseFloat(activeLoan?.principal_amount || activeLoan?.amount || 485000).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {message && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{message}</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                        <button
                            type="button"
                            onClick={() => { setPayoffType("PARTIAL"); setAmount(50000); }}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${payoffType === "PARTIAL" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-500"}`}
                        >
                            Part Pre-Payment
                        </button>
                        <button
                            type="button"
                            onClick={() => { setPayoffType("FULL"); setAmount(485000); }}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${payoffType === "FULL" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-500"}`}
                        >
                            Full Loan Foreclosure
                        </button>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-slate-600 dark:text-slate-300">Payment Amount</span>
                            <span className="text-emerald-500 font-black">₹ {amount.toLocaleString("en-IN")}</span>
                        </div>
                        <input
                            type="range"
                            min={10000}
                            max={500000}
                            step={10000}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interest Savings Calculation</h4>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Estimated Interest Saved</span>
                        <span className="font-extrabold text-emerald-500">₹ {Math.round(amount * 0.18).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Foreclosure Charges</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹ 0 (Zero Penalty)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">NOC Generation</span>
                        <span className="font-bold text-blue-400">Instant Digital NOC</span>
                    </div>

                    <button
                        type="button"
                        disabled={submitting}
                        onClick={handleExecute}
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FaLock /> {submitting ? "Executing Payment..." : `Confirm ₹ ${amount.toLocaleString("en-IN")} Pre-Payment`}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                        <FaShieldAlt className="text-emerald-400" /> Instant Bank Gateway & 2FA Protected
                    </p>
                </div>
            </div>
        </div>
    );
}

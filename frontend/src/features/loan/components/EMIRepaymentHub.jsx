import React, { useState, useEffect } from "react";
import { FaCreditCard, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaSync, FaExternalLinkAlt, FaShieldAlt, FaCheck } from "react-icons/fa";
import { getUserEmis, payUserEmi } from "../api/userFeaturesApi";

export default function EMIRepaymentHub() {
    const [emis, setEmis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payingId, setPayingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loadEmis = async () => {
        try {
            setLoading(true);
            const res = await getUserEmis();
            if (res.success) {
                setEmis(res.data || []);
            }
        } catch (err) {
            console.error("Failed to load EMIs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmis();
    }, []);

    const handlePayNow = async (emiId) => {
        try {
            setPayingId(emiId);
            setErrorMessage("");
            setSuccessMessage("");
            const txnRef = `UPI_${Date.now()}_FINVERSE`;
            const res = await payUserEmi(emiId, txnRef);
            if (res.success) {
                setSuccessMessage(`Payment Successful! Transaction Ref: ${res.data?.transactionRef}`);
                await loadEmis();
            } else {
                setErrorMessage(res.message || "Payment failed");
            }
        } catch (err) {
            setErrorMessage(err.message || "Payment processing error.");
        } finally {
            setPayingId(null);
        }
    };

    const formatINR = (val) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaCreditCard className="w-3.5 h-3.5" /> EMI Repayment & Auto-Pay Hub
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Upcoming & Paid Installments
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Manage loan repayments, enable e-NACH auto-debit, and pay upcoming dues instantly.
                    </p>
                </div>

                <button
                    onClick={loadEmis}
                    className="self-start sm:self-auto p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
                    title="Refresh Schedule"
                >
                    <FaSync className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {/* Alert Notifications */}
            {successMessage && (
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium rounded-xl flex items-center gap-2">
                    <FaExclamationTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* EMI Cards List */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="py-12 text-center text-slate-400 text-xs animate-pulse">
                        Loading repayment schedule...
                    </div>
                ) : emis.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                        No active EMI repayment schedules found.
                    </div>
                ) : (
                    emis.map((item) => {
                        const isPaid = item.status === "PAID";
                        return (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all gap-4"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className={`p-3 rounded-xl ${
                                            isPaid
                                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                                                : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                        }`}
                                    >
                                        <FaCreditCard className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            {item.loan_type}
                                            <span
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                                    isPaid
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300"
                                                }`}
                                            >
                                                {isPaid ? "PAID" : "DUE"}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 mt-0.5">
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="w-3 h-3" /> Due:{" "}
                                                {new Date(item.due_date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            {item.transaction_ref && (
                                                <span className="font-mono text-[11px] text-slate-400">
                                                    Ref: {item.transaction_ref}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 dark:border-slate-700">
                                    <div className="text-right">
                                        <div className="text-base font-extrabold text-slate-900 dark:text-white">
                                            {formatINR(item.amount)}
                                        </div>
                                        <div className="text-[10px] text-slate-400">Monthly EMI</div>
                                    </div>

                                    {isPaid ? (
                                        <button
                                            disabled
                                            className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold text-xs rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 cursor-default"
                                        >
                                            <FaCheck className="w-3.5 h-3.5" /> Paid
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handlePayNow(item.id)}
                                            disabled={payingId === item.id}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                                        >
                                            {payingId === item.id ? (
                                                <>
                                                    <FaSync className="w-3 h-3 animate-spin" /> Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <span>Pay Now</span>
                                                    <FaExternalLinkAlt className="w-3 h-3" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Auto-pay Banner */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FaShieldAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            e-NACH Auto-Debit Protection Enabled
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Avoid late payment penalties with automatic debit on the 5th of every month.
                        </div>
                    </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    Active
                </span>
            </div>
        </div>
    );
}

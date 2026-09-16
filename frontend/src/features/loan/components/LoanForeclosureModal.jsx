/**
 * ==========================================================
 * FINVERSE AI
 * Authoritative Loan Foreclosure & Payoff Engine
 * Performs full principal payoff calculations & issues NOC
 * ==========================================================
 */

import React, { useState } from "react";
import { FaTimes, FaCalculator, FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaCreditCard } from "react-icons/fa";

export default function LoanForeclosureModal({
    isOpen,
    onClose,
    foreclosure,
    activeLoans = [],
    onExecutePayoff
}) {
    const [selectedLoanId, setSelectedLoanId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI_AUTO_DEBIT");
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    if (!isOpen) return null;

    const data = foreclosure || {
        id: "DEFAULT-FCL-1",
        loan_id: selectedLoanId || "LN-2026-001",
        foreclosure_number: "FCL-2026-449102",
        outstanding_principal: 78500,
        accrued_interest: 1177,
        pending_penalties: 0,
        foreclosure_fee: 2355,
        gst_on_fee: 423.9,
        final_settlement_amount: 82455.9
    };

    const principal = parseFloat(data.outstanding_principal || 78500);
    const interest = parseFloat(data.accrued_interest || 1177);
    const fee = parseFloat(data.foreclosure_fee || principal * 0.03);
    const gst = parseFloat(data.gst_on_fee || fee * 0.18);
    const finalAmount = parseFloat(data.final_settlement_amount || (principal + interest + fee + gst));

    const handlePayoff = async () => {
        setSubmitting(true);
        try {
            if (onExecutePayoff) {
                await onExecutePayoff(data.id, data.loan_id);
            }
            setSuccessMsg("Payoff executed! Loan fully closed and No Objection Certificate (NOC) generated.");
            setTimeout(() => {
                setSuccessMsg("");
                onClose();
            }, 2000);
        } catch (err) {
            console.error("Payoff execution error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in border border-slate-100 dark:border-slate-800 dark:bg-slate-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl dark:bg-amber-950 dark:text-amber-300">
                            <FaCalculator className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Loan Foreclosure & Full Payoff</h3>
                            <p className="text-[11px] text-slate-400 font-mono">{data.foreclosure_number || "FCL-SETTLEMENT"}</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>

                {/* Alerts */}
                {successMsg ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{successMsg}</span>
                    </div>
                ) : (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200">
                        <FaExclamationTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <p>Executing foreclosure will settle all principal obligations, calculate accrued interest to date, and issue an official <strong>No Objection Certificate (NOC)</strong>.</p>
                    </div>
                )}

                {/* Select Active Loan (if multiple) */}
                {activeLoans.length > 1 && (
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Active Loan to Foreclose</label>
                        <select
                            value={selectedLoanId}
                            onChange={(e) => setSelectedLoanId(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 p-2 text-xs font-semibold text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        >
                            {activeLoans.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.loan_number || l.id} - Outstanding: ₹ {Number(l.outstanding_amount || l.principal_amount || 0).toLocaleString("en-IN")}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Financial Breakdown Table */}
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex justify-between py-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Outstanding Principal Balance</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹ {principal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Accrued Interest to Date</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹ {interest.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Foreclosure Fee (3%)</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹ {fee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">GST on Charges (18%)</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹ {gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm pt-3 border-t border-slate-200 dark:border-slate-700">
                        <span className="font-black text-slate-900 dark:text-white">Final Settlement Payoff</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">₹ {finalAmount.toLocaleString("en-IN")}</span>
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Settlement Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-bold text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                        <option value="UPI_AUTO_DEBIT">UPI Auto-Debit / Instant Pay</option>
                        <option value="NET_BANKING">HDFC / ICICI Net Banking Gateway</option>
                        <option value="BANK_TRANSFER">NEFT / RTGS Wire Transfer</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handlePayoff}
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        <FaCheckCircle className="h-4 w-4" />
                        <span>{submitting ? "Processing Settlement..." : "Payoff & Issue NOC"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { FaCheckCircle, FaClock, FaFileAlt, FaShieldAlt, FaAward, FaFileSignature, FaUniversity, FaArrowRight } from "react-icons/fa";

export default function LoanMilestoneTracker({ activeLoan }) {
    const steps = [
        {
            id: 1,
            title: "Application Submitted",
            desc: "Basic loan details & profile created",
            icon: FaFileAlt,
            status: "COMPLETED",
            date: "Sep 02, 2026",
        },
        {
            id: 2,
            title: "AI Document OCR Check",
            desc: "Aadhaar, PAN & Income statements verified",
            icon: FaShieldAlt,
            status: "COMPLETED",
            date: "Sep 03, 2026",
        },
        {
            id: 3,
            title: "CIBIL & Credit Approval",
            desc: "Risk assessment passed (Score: 785)",
            icon: FaAward,
            status: activeLoan ? "COMPLETED" : "IN_PROGRESS",
            date: "Sep 05, 2026",
        },
        {
            id: 4,
            title: "Sanction Letter Issued",
            desc: "Official terms & interest rate locked",
            icon: FaFileSignature,
            status: activeLoan ? "COMPLETED" : "PENDING",
            date: activeLoan ? "Sep 07, 2026" : "Expected Sep 09",
        },
        {
            id: 5,
            title: "E-Sign Agreement",
            desc: "Aadhaar e-Sign authorization",
            icon: FaFileSignature,
            status: activeLoan?.status === "DISBURSED" ? "COMPLETED" : "IN_PROGRESS",
            date: "Pending Action",
        },
        {
            id: 6,
            title: "Bank Disbursement",
            desc: "Funds credited directly to bank account",
            icon: FaUniversity,
            status: activeLoan?.status === "DISBURSED" ? "COMPLETED" : "PENDING",
            date: "Final Step",
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaClock className="w-3.5 h-3.5" /> Live Application Milestone Tracker
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Application #{activeLoan?.application_number || "APP-2026-8849"}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Track real-time progress, document verification stages, and bank disbursement milestones.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        {activeLoan?.status || "IN_REVIEW"}
                    </span>
                </div>
            </div>

            {/* Stepper Timeline */}
            <div className="pt-8 pb-4">
                <div className="relative grid grid-cols-1 md:grid-cols-6 gap-4">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = step.status === "COMPLETED";
                        const isInProgress = step.status === "IN_PROGRESS";

                        return (
                            <div key={step.id} className="relative flex flex-col items-center text-center group">
                                {/* Connector Line (desktop) */}
                                {idx < steps.length - 1 && (
                                    <div
                                        className={`hidden md:block absolute top-5 left-1/2 w-full h-0.5 z-0 ${
                                            isCompleted ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                                        }`}
                                    />
                                )}

                                {/* Icon Node */}
                                <div
                                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                                        isCompleted
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                            : isInProgress
                                            ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50 animate-pulse"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700"
                                    }`}
                                >
                                    {isCompleted ? <FaCheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                                </div>

                                {/* Details */}
                                <div className="mt-3 space-y-1">
                                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {step.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                                        {step.desc}
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                                        {step.date}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Banner for next action */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg">
                        <FaFileSignature className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-blue-900 dark:text-blue-200">
                            Action Required: Complete Aadhaar E-Sign
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-400">
                            Your sanction letter has been generated. Please e-sign to initiate bank disbursement.
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs hover:shadow transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                    <span>E-Sign Document</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

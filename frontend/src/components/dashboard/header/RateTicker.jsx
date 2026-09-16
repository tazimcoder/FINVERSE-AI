import React from "react";
import { FaChartLine, FaCheckCircle, FaPercent } from "react-icons/fa";

export default function RateTicker() {
    const rates = [
        { label: "RBI Repo Rate", value: "6.50%", status: "STABLE", color: "text-emerald-500" },
        { label: "Home Loan Rate", value: "8.50% p.a.", status: "PRIME", color: "text-blue-500" },
        { label: "Car Loan Rate", value: "9.20% p.a.", status: "INSTANT", color: "text-indigo-500" },
        { label: "Personal Loan", value: "11.50% p.a.", status: "PAPERLESS", color: "text-violet-500" },
        { label: "Gold Loan", value: "8.90% p.a.", status: "LOWEST", color: "text-amber-500" },
        { label: "CIBIL Score Check", value: "FREE", status: "VERIFIED", color: "text-emerald-500" },
    ];

    return (
        <div className="hidden xl:flex items-center overflow-hidden max-w-md h-7 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 px-3 text-[11px] font-medium text-slate-600 dark:text-slate-400 select-none">
            <div className="flex items-center gap-1.5 shrink-0 text-blue-600 dark:text-blue-400 font-bold pr-2 border-r border-slate-200 dark:border-slate-800 mr-2">
                <FaChartLine className="w-3 h-3" />
                <span>RATES</span>
            </div>

            <div className="overflow-hidden relative w-full">
                <div className="animate-rate-ticker flex items-center gap-6 whitespace-nowrap">
                    {/* Double list for infinite seamless loop */}
                    {[...rates, ...rates].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-slate-500 dark:text-slate-400">{item.label}:</span>
                            <span className={`font-bold font-mono ${item.color}`}>{item.value}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 rounded-sm text-slate-700 dark:text-slate-300">
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from "react";

function LoanSummaryCard({ title, value, description }) {
    return (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs smooth-hover-card animate-fade-in-up transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {title}
            </p>

            <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {value}
            </p>

            {description && (
                <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}

export default LoanSummaryCard;

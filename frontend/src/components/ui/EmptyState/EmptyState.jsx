/**
 * ==========================================================
 * FINVERSE AI — EmptyState Primitive
 * Clean empty state placeholder for modules and search results
 * ==========================================================
 */
import React from "react";
import Button from "../Button/Button";

function EmptyState({
    title = "No Data Found",
    description = "There are currently no records to display in this view.",
    icon = null,
    actionLabel = null,
    onAction = null,
    className = "",
}) {
    return (
        <div
            className={`
                w-full p-8 sm:p-12 text-center rounded-2xl bg-[#0F172A]/70 border border-slate-800/80
                flex flex-col items-center justify-center ${className}
            `}
        >
            <div className="h-16 w-16 rounded-2xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 text-2xl mb-4 shadow-lg shadow-blue-950/50">
                {icon || "📂"}
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
                {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-1 mb-6 font-medium">
                {description}
            </p>

            {actionLabel && onAction && (
                <Button variant="primary" size="sm" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}

export default EmptyState;

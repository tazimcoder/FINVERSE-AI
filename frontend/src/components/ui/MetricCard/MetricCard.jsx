/**
 * ==========================================================
 * FINVERSE AI — MetricCard Primitive
 * Executive Financial Metric Card with Trend Badges & Formatting
 * ==========================================================
 */
import React from "react";
import Badge from "../Badge/Badge";

function MetricCard({
    title,
    value,
    change = null,
    changeType = "positive", // positive, negative, neutral
    icon = null,
    subtitle = null,
    badgeText = null,
    badgeVariant = "info",
    className = "",
    loading = false,
}) {
    if (loading) {
        return (
            <div className={`p-5 rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl ${className}`}>
                <div className="h-4 w-28 bg-slate-800 rounded animate-shimmer mb-3" />
                <div className="h-8 w-36 bg-slate-800 rounded animate-shimmer mb-2" />
                <div className="h-3 w-20 bg-slate-800 rounded animate-shimmer" />
            </div>
        );
    }

    return (
        <div
            className={`
                p-5 sm:p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800/90
                shadow-xl relative overflow-hidden backdrop-blur-md fin-card-hover transition-all duration-200 ${className}
            `}
        >
            {/* Background Ambient Glow */}
            <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

            {/* Header: Title + Icon / Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {title}
                </p>

                <div className="flex items-center gap-2">
                    {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
                    {icon && (
                        <div className="p-2 rounded-xl bg-slate-800/90 text-blue-400 border border-slate-700/60 shadow-xs shrink-0">
                            {icon}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Value Display */}
            <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white financial-num">
                    {value}
                </h2>

                {change && (
                    <div
                        className={`
                            inline-flex items-center gap-1 text-xs font-extrabold px-2 py-0.5 rounded-md border shadow-xs
                            ${
                                changeType === "positive"
                                    ? "text-emerald-400 bg-emerald-950/70 border-emerald-800/60"
                                    : changeType === "negative"
                                    ? "text-rose-400 bg-rose-950/70 border-rose-800/60"
                                    : "text-slate-300 bg-slate-800 border-slate-700"
                            }
                        `}
                    >
                        <span>{changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "•"}</span>
                        <span>{change}</span>
                    </div>
                )}
            </div>

            {/* Subtitle / Additional Metadata */}
            {subtitle && (
                <p className="text-xs text-slate-400 font-medium mt-2">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default MetricCard;

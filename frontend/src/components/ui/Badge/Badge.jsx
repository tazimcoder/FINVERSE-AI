/**
 * ==========================================================
 * FINVERSE AI — Badge Primitive
 * Semantic financial status badges
 * ==========================================================
 */
import React from "react";

function Badge({
    children,
    variant = "info", // success, danger, warning, info, ai, neutral
    size = "sm", // xs, sm, md
    dot = false,
    className = "",
}) {
    const sizeStyles = {
        xs: "px-1.5 py-0.2 text-[9px] font-extrabold tracking-wider uppercase",
        sm: "px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
        md: "px-2.5 py-1 text-xs font-bold tracking-tight",
    }[size] || "px-2 py-0.5 text-[10px]";

    const variantStyles = {
        success: "bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 shadow-xs",
        danger: "bg-rose-950/90 text-rose-400 border border-rose-800/80 shadow-xs",
        warning: "bg-amber-950/90 text-amber-400 border border-amber-800/80 shadow-xs",
        info: "bg-blue-950/90 text-blue-400 border border-blue-800/80 shadow-xs",
        ai: "bg-purple-950/90 text-cyan-300 border border-purple-800/80 shadow-xs",
        neutral: "bg-slate-800 text-slate-300 border border-slate-700 shadow-xs",
    }[variant] || "bg-slate-800 text-slate-300";

    const dotColors = {
        success: "bg-emerald-400",
        danger: "bg-rose-400",
        warning: "bg-amber-400",
        info: "bg-blue-400",
        ai: "bg-cyan-400 animate-pulse",
        neutral: "bg-slate-400",
    }[variant] || "bg-slate-400";

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 rounded-md select-none ${sizeStyles} ${variantStyles} ${className}
            `}
        >
            {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors} shrink-0`} />}
            {children}
        </span>
    );
}

export default Badge;

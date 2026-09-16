/**
 * ==========================================================
 * FINVERSE AI — Premium Card Primitive & Sub-components
 * Executive container with subtle borders & backdrop glass
 * ==========================================================
 */
import React from "react";

export function Card({
    children,
    className = "",
    hover = false,
    gradient = false,
    padding = "normal",
    ...props
}) {
    const paddingStyles = {
        none: "p-0",
        compact: "p-4 sm:p-5",
        normal: "p-5 sm:p-6",
        spacious: "p-6 sm:p-8",
    }[padding] || "p-5 sm:p-6";

    const baseStyles =
        "w-full rounded-2xl bg-[#0F172A]/90 dark:bg-[#0F172A]/90 border border-slate-800/90 text-slate-100 shadow-xl relative overflow-hidden backdrop-blur-md";

    const hoverStyle = hover ? "fin-card-hover cursor-pointer" : "";

    const gradientStyle = gradient
        ? "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-600/5 before:via-transparent before:to-emerald-500/5 before:pointer-events-none"
        : "";

    return (
        <div
            className={`${baseStyles} ${hoverStyle} ${paddingStyles} ${gradientStyle} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "", action = null }) {
    return (
        <div className={`flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5 ${className}`}>
            <div>{children}</div>
            {action && <div className="shrink-0 ml-4">{action}</div>}
        </div>
    );
}

export function CardTitle({ children, className = "", icon = null }) {
    return (
        <h3 className={`text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2.5 ${className}`}>
            {icon && <span className="text-blue-400 shrink-0">{icon}</span>}
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = "" }) {
    return (
        <p className={`text-xs sm:text-sm text-slate-400 mt-1 font-medium ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = "" }) {
    return <div className={`w-full ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
    return (
        <div className={`pt-4 border-t border-slate-800/80 mt-5 flex items-center justify-between ${className}`}>
            {children}
        </div>
    );
}

export default Card;
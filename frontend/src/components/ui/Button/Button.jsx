/**
 * ==========================================================
 * FINVERSE AI — Premium Button Primitive
 * Stripe/Linear quality button with micro-interactions
 * ==========================================================
 */
import React from "react";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = "left",
    fullWidth = false,
    className = "",
    ...props
}) {
    const baseStyles =
        "inline-flex items-center justify-center font-semibold transition-all duration-200 select-none rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
        xs: "px-2.5 py-1 text-xs gap-1.5 shadow-xs",
        sm: "px-3.5 py-1.5 text-xs gap-2 shadow-xs",
        md: "px-4 py-2.5 text-sm gap-2 shadow-sm",
        lg: "px-5 py-3 text-base gap-2.5 shadow-md",
    }[size] || "px-4 py-2.5 text-sm gap-2";

    const variantStyles = {
        primary:
            "bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/25 border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20",
        emerald:
            "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/25 border border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20",
        secondary:
            "bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border border-slate-700/80 shadow-xs",
        outline:
            "bg-transparent hover:bg-slate-800/50 text-slate-200 border border-slate-700/80 hover:border-slate-600",
        ghost:
            "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent",
        danger:
            "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/25 border border-rose-500/30",
        ai:
            "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-600/30 border border-cyan-400/30 hover:shadow-xl hover:shadow-purple-500/25 animate-glow-pulse",
    }[variant] || "bg-blue-600 hover:bg-blue-700 text-white";

    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        className="animate-spin h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
                    {children}
                    {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
                </>
            )}
        </button>
    );
}

export default Button;
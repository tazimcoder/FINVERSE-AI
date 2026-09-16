/**
 * ==========================================================
 * FINVERSE AI — ErrorState Primitive
 * Executive error container with retry trigger
 * ==========================================================
 */
import React from "react";
import Button from "../Button/Button";

function ErrorState({
    title = "System Request Error",
    message = "Failed to load financial records. Please verify network connectivity and try again.",
    onRetry = null,
    className = "",
}) {
    return (
        <div
            className={`
                w-full p-8 text-center rounded-2xl bg-rose-950/20 border border-rose-800/40
                flex flex-col items-center justify-center ${className}
            `}
        >
            <div className="h-14 w-14 rounded-2xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 text-xl mb-4 shadow-lg">
                ⚠️
            </div>

            <h3 className="text-base sm:text-lg font-bold text-rose-200 tracking-tight">
                {title}
            </h3>

            <p className="text-xs sm:text-sm text-rose-300/80 max-w-md mt-1 mb-5 font-medium">
                {message}
            </p>

            {onRetry && (
                <Button variant="danger" size="sm" onClick={onRetry}>
                    Retry Request
                </Button>
            )}
        </div>
    );
}

export default ErrorState;

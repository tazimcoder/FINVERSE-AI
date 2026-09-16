/**
 * ==========================================================
 * FINVERSE AI — Modal Dialog Primitive
 * Accessible popup modal with backdrop blur & ESC listener
 * ==========================================================
 */
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({
    isOpen,
    onClose,
    title,
    subtitle = null,
    children,
    maxWidth = "max-w-xl",
    showCloseButton = true,
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fade-in-up"
            />

            {/* Modal Dialog Card */}
            <div
                className={`
                    relative w-full ${maxWidth} rounded-2xl bg-[#0F172A] border border-slate-800
                    p-6 sm:p-8 text-slate-100 shadow-2xl z-10 animate-scale-pop my-auto
                `}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xs text-slate-400 mt-1 font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer shrink-0"
                            title="Close Modal (Esc)"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}

export default Modal;

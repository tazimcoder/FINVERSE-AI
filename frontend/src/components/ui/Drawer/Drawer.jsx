/**
 * ==========================================================
 * FINVERSE AI — Slide-over Drawer Primitive
 * Accessible side panel overlay for details and quick actions
 * ==========================================================
 */
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Drawer({
    isOpen,
    onClose,
    title,
    subtitle = null,
    children,
    position = "right", // right, left
    size = "max-w-md",
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

    const slideAnim = position === "left" ? "-translate-x-full" : "translate-x-full";

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            />

            <div className={`fixed inset-y-0 ${position === "left" ? "left-0" : "right-0"} flex max-w-full z-10`}>
                <div
                    className={`
                        w-screen ${size} bg-[#0F172A] border-${position === "left" ? "r" : "l"} border-slate-800
                        p-6 text-slate-100 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out
                    `}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-white">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            title="Close Drawer"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto py-6 font-sans">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drawer;

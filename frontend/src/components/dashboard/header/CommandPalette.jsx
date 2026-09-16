import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaShieldAlt, FaCreditCard, FaCalculator, FaFileAlt, FaArrowRight, FaMagic, FaUser, FaPercentage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CommandPalette({ isOpen, onClose, onSelectAction }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (isOpen) onClose();
            } else if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const quickActions = [
        {
            id: "apply-loan",
            icon: FaPercentage,
            title: "Apply for New Loan",
            desc: "Explore Home, Personal, Vehicle & Business Loans",
            action: () => {
                onSelectAction?.("apply");
                onClose();
            },
            badge: "Instant Approval"
        },
        {
            id: "emi-calc",
            icon: FaCalculator,
            title: "EMI & Eligibility Calculator",
            desc: "Simulate monthly installments with live rates",
            action: () => {
                onSelectAction?.("calculator");
                onClose();
            },
        },
        {
            id: "cibil-score",
            icon: FaShieldAlt,
            title: "Check CIBIL Credit Score",
            desc: "View credit health & score simulator",
            action: () => {
                onSelectAction?.("cibil");
                onClose();
            },
            badge: "Free Analysis"
        },
        {
            id: "pay-emi",
            icon: FaCreditCard,
            title: "Pay Pending EMI",
            desc: "Autopay hub & instant repayment",
            action: () => {
                onSelectAction?.("emi-repay");
                onClose();
            },
        },
        {
            id: "ocr-docs",
            icon: FaFileAlt,
            title: "AI Document Scanner (OCR)",
            desc: "Upload Aadhaar, PAN, & Bank Statements",
            action: () => {
                onSelectAction?.("documents");
                onClose();
            },
        },
        {
            id: "ai-assistant",
            icon: FaMagic,
            title: "AI Financial Assistant",
            desc: "Ask Gemini AI about loan terms & advice",
            action: () => {
                navigate("/ai");
                onClose();
            },
        },
        {
            id: "profile",
            icon: FaUser,
            title: "My Profile & KYC",
            desc: "View personal details and verification status",
            action: () => {
                navigate("/profile");
                onClose();
            },
        }
    ];

    const filtered = quickActions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
            <div
                className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Header */}
                <div className="relative flex items-center px-4 border-b border-slate-100 dark:border-slate-800/80">
                    <FaSearch className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-3" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or search loans, eligibility, CIBIL..."
                        className="w-full py-4 text-slate-800 dark:text-slate-100 bg-transparent text-sm sm:text-base outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        autoFocus
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                        ESC
                    </kbd>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {query ? "Matching Actions" : "Suggested Quick Actions"}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                            No matching commands found for "<span className="font-semibold text-slate-600 dark:text-slate-300">{query}</span>"
                        </div>
                    ) : (
                        filtered.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={item.action}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors duration-150 group"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-150">
                                            <IconComponent className="w-4 h-4" />
                                        </div>
                                        <div className="truncate">
                                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-2">
                                                {item.title}
                                                {item.badge && (
                                                    <span className="text-[10px] font-medium px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                    <FaArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer bar */}
                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>FINVERSE AI Command Palette</span>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">⌘K</kbd> to open</span>
                        <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">ESC</kbd> to close</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

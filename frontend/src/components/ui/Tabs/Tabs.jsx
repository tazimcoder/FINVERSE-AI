/**
 * ==========================================================
 * FINVERSE AI — Tabs Primitive
 * Sleek tab switcher with underline and pill variants
 * ==========================================================
 */
import React from "react";

function Tabs({
    tabs = [], // [{ id: 'tab1', label: 'Overview', icon: <FaIcon />, badge: 'NEW' }]
    activeTab,
    onChange,
    variant = "pill", // pill, underline
    size = "md",
    className = "",
}) {
    const sizeStyles = {
        sm: "text-xs px-3 py-1.5 gap-1.5",
        md: "text-sm px-4 py-2 gap-2",
        lg: "text-base px-5 py-2.5 gap-2.5",
    }[size] || "text-sm px-4 py-2";

    if (variant === "underline") {
        return (
            <div className={`flex border-b border-slate-800/80 gap-6 overflow-x-auto no-scrollbar ${className}`}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`
                                flex items-center font-bold tracking-tight pb-3 transition-colors relative cursor-pointer select-none shrink-0 ${sizeStyles}
                                ${isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"}
                            `}
                        >
                            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                            <span>{tab.label}</span>
                            {tab.badge && (
                                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] bg-blue-950 text-blue-400 border border-blue-800">
                                    {tab.badge}
                                </span>
                            )}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        );
    }

    // Default Pill Variant
    return (
        <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 overflow-x-auto ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            flex items-center font-bold rounded-lg transition-all cursor-pointer select-none shrink-0 ${sizeStyles}
                            ${
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                            }
                        `}
                    >
                        {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                        <span>{tab.label}</span>
                        {tab.badge && (
                            <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default Tabs;

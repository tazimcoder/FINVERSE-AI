/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin Multi-Toggle & Theme Mode Control Center
 * ==========================================================
 * Location: src/admin/components/toggles/AdminFeatureTogglesModal.jsx
 * Responsibility:
 * - Multi-Toggle Control Panel for System Feature Flags & Multiple Theme Modes
 * - Allows switching between 7 Theme Modes (Light, Dark, Midnight, Cyberpunk, Emerald, Solarized, OLED Black)
 * - Real-Time Toggle Switches for System Modules, API Engines, Security, & Maintenance
 * - Persistent LocalStorage State & Real-Time Admin Notifications
 */

import { useState, useEffect } from "react";
import {
    FaToggleOn,
    FaTimes,
    FaMapMarkedAlt,
    FaRobot,
    FaBolt,
    FaCreditCard,
    FaChartLine,
    FaFileInvoice,
    FaPiggyBank,
    FaGift,
    FaBell,
    FaTools,
    FaCheckCircle,
    FaExclamationTriangle,
    FaPalette,
    FaCheck
} from "react-icons/fa";
import { ADMIN_THEMES, getAdminTheme } from "../theme/AdminThemeToggle";

// Default Initial Multi-Toggle Configurations
const initialToggles = [
    {
        id: "maintenance_mode",
        name: "System Maintenance Mode",
        category: "SYSTEM & SECURITY",
        description: "Puts user application in read-only maintenance mode. Suppresses new transactions.",
        icon: FaTools,
        enabled: false,
        critical: true
    },
    {
        id: "finverse_map_engine",
        name: "FinverseMap Property Valuation Engine",
        category: "API & ENGINE",
        description: "Enables live OpenStreetMap GIS property appraisal, geocoding, & circle rate calculator.",
        icon: FaMapMarkedAlt,
        enabled: true,
        critical: false
    },
    {
        id: "ai_assistant",
        name: "Finverse AI Advisor & Chatbot",
        category: "AI & COMPUTING",
        description: "Enables Gemini AI conversational advisor, credit eligibility bot, & financial insights.",
        icon: FaRobot,
        enabled: true,
        critical: false
    },
    {
        id: "instant_disbursements",
        name: "Instant Loan Auto-Disbursement Engine",
        category: "BANKING GATEWAY",
        description: "Processes instant approved loan payouts directly to user bank accounts.",
        icon: FaBolt,
        enabled: true,
        critical: true
    },
    {
        id: "virtual_cards",
        name: "Dynamic CVV Virtual Security Cards",
        category: "FINTECH MODULE",
        description: "Allows users to generate single-use virtual Visa cards with dynamic CVV security.",
        icon: FaCreditCard,
        enabled: true,
        critical: false
    },
    {
        id: "cibil_monitor",
        name: "CIBIL Credit Score Monitor & Simulator",
        category: "API & ENGINE",
        description: "Syncs real-time 785 credit scores & simulates credit score improvement actions.",
        icon: FaChartLine,
        enabled: true,
        critical: false
    },
    {
        id: "ocr_scanner",
        name: "AI Document OCR Scanner & Verifier",
        category: "AI & COMPUTING",
        description: "Parses PAN, Aadhaar, salary slips, & bank statements with automated document OCR.",
        icon: FaFileInvoice,
        enabled: true,
        critical: false
    },
    {
        id: "savings_vaults",
        name: "7.5% High-Yield Emergency Savings Vaults",
        category: "FINTECH MODULE",
        description: "Enables emergency fund reserves & goal-based savings vault management.",
        icon: FaPiggyBank,
        enabled: true,
        critical: false
    },
    {
        id: "rewards_hub",
        name: "Finverse Rewards & Cashback Store",
        category: "FINTECH MODULE",
        description: "Enables FinCoins points accumulation, EMI cashback vouchers, & fee waivers.",
        icon: FaGift,
        enabled: true,
        critical: false
    },
    {
        id: "realtime_push",
        name: "Real-Time WebSockets Push Alerts",
        category: "SYSTEM & SECURITY",
        description: "Dispatches instant WebSockets push notifications for transactions, loans, & risk alerts.",
        icon: FaBell,
        enabled: true,
        critical: false
    }
];

export default function AdminFeatureTogglesModal({ isOpen, onClose, currentThemeId = "dark", onSelectTheme }) {
    const [activeTab, setActiveTab] = useState("THEMES"); // "THEMES" or "MODULES"
    const [toggles, setToggles] = useState(() => {
        try {
            const saved = localStorage.getItem("finverse_admin_toggles");
            return saved ? JSON.parse(saved) : initialToggles;
        } catch (e) {
            return initialToggles;
        }
    });

    const [toastMessage, setToastMessage] = useState("");
    const [filterCategory, setFilterCategory] = useState("ALL");

    useEffect(() => {
        localStorage.setItem("finverse_admin_toggles", JSON.stringify(toggles));
    }, [toggles]);

    if (!isOpen) return null;

    const handleToggleChange = (id) => {
        setToggles((prev) =>
            prev.map((t) => {
                if (t.id === id) {
                    const nextState = !t.enabled;
                    setToastMessage(
                        `${t.name} set to ${nextState ? "ACTIVE (ENABLED)" : "SUSPENDED (DISABLED)"}`
                    );
                    setTimeout(() => setToastMessage(""), 3500);
                    return { ...t, enabled: nextState };
                }
                return t;
            })
        );
    };

    const handleThemeSelection = (themeId) => {
        if (onSelectTheme) {
            onSelectTheme(themeId);
            const themeObj = getAdminTheme(themeId);
            setToastMessage(`Theme switched to ${themeObj.name} Mode!`);
            setTimeout(() => setToastMessage(""), 3500);
        }
    };

    const categories = ["ALL", "SYSTEM & SECURITY", "API & ENGINE", "FINTECH MODULE", "AI & COMPUTING", "BANKING GATEWAY"];

    const filteredToggles = filterCategory === "ALL"
        ? toggles
        : toggles.filter((t) => t.category === filterCategory);

    const activeCount = toggles.filter((t) => t.enabled).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md font-sans">
            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden animate-fade-in text-slate-100">
                
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                            <FaToggleOn className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-black text-white tracking-tight">
                                    Admin Multi-Toggle & Theme Control Center
                                </h2>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
                                    {ADMIN_THEMES.length} THEME MODES ACTIVE
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Switch theme display modes (Light/Dark/Neon/Midnight) & real-time system operational toggles.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                </div>

                {toastMessage && (
                    <div className="bg-blue-900/40 border-b border-blue-500/40 px-6 py-2.5 text-xs font-bold text-blue-300 flex items-center gap-2 shadow-inner">
                        <FaCheckCircle className="text-blue-400 text-sm shrink-0" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* MAIN CONTROL TABS: THEMES VS MODULES */}
                <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("THEMES")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-black text-xs transition border-t border-x cursor-pointer ${
                            activeTab === "THEMES"
                                ? "bg-slate-900 border-slate-800 text-white shadow-md"
                                : "bg-transparent border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <FaPalette className="text-blue-400" />
                        <span>🎨 Theme & Display Modes ({ADMIN_THEMES.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("MODULES")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-black text-xs transition border-t border-x cursor-pointer ${
                            activeTab === "MODULES"
                                ? "bg-slate-900 border-slate-800 text-white shadow-md"
                                : "bg-transparent border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <FaToggleOn className="text-emerald-400" />
                        <span>⚡ System Operational Switches ({activeCount}/{toggles.length})</span>
                    </button>
                </div>

                {/* TAB CONTENT 1: MULTIPLE THEME MODES */}
                {activeTab === "THEMES" && (
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="mb-2">
                            <p className="text-xs font-bold text-slate-300">Select Active Admin Theme Mode:</p>
                            <p className="text-[11px] text-slate-400">Instantly applies across all Admin layout navigation, headers, panels, & widgets.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                            {ADMIN_THEMES.map((theme) => {
                                const isSelected = theme.id === currentThemeId;
                                return (
                                    <div
                                        key={theme.id}
                                        onClick={() => handleThemeSelection(theme.id)}
                                        className={`relative rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
                                            isSelected
                                                ? "border-blue-500 bg-blue-600/10 ring-2 ring-blue-500/40 shadow-lg"
                                                : "border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl">{theme.icon}</span>
                                            {isSelected ? (
                                                <span className="flex items-center gap-1 rounded-full bg-blue-500 px-2 py-0.5 text-[9px] font-black text-white shadow-xs">
                                                    <FaCheck className="text-[8px]" /> ACTIVE MODE
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                                    SELECT
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-sm font-black text-white leading-tight">
                                            {theme.name}
                                        </h3>
                                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                                            {theme.subtitle}
                                        </p>

                                        {/* COLOR PREVIEW BADGE BAR */}
                                        <div className={`mt-3 h-2 w-full rounded-full bg-gradient-to-r ${theme.previewGradient} border border-slate-700/60`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT 2: SYSTEM OPERATIONAL TOGGLES */}
                {activeTab === "MODULES" && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* CATEGORY FILTER CHIPS */}
                        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 bg-slate-950/40 px-6 py-3 shrink-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition cursor-pointer ${
                                        filterCategory === cat
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                            : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* MULTI-TOGGLE SWITCHES LIST */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-800/60">
                            {filteredToggles.map((toggle) => {
                                const IconComponent = toggle.icon;
                                return (
                                    <div
                                        key={toggle.id}
                                        className="pt-4 first:pt-0 flex items-center justify-between gap-4 group"
                                    >
                                        <div className="flex items-start gap-3.5">
                                            <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                                                toggle.enabled
                                                    ? "bg-blue-600/10 text-blue-400 border-blue-500/30"
                                                    : "bg-slate-800/60 text-slate-500 border-slate-700/60"
                                            }`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-extrabold text-white">
                                                        {toggle.name}
                                                    </span>
                                                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[9px] font-bold text-slate-400 border border-slate-700">
                                                        {toggle.category}
                                                    </span>
                                                    {toggle.critical && (
                                                        <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[9px] font-bold text-rose-400 border border-rose-500/20 flex items-center gap-1">
                                                            <FaExclamationTriangle className="text-[8px]" /> CRITICAL
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 max-w-xl">
                                                    {toggle.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* iOS-STYLE SLIDER TOGGLE BUTTON */}
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-wider ${
                                                toggle.enabled ? "text-emerald-400" : "text-rose-400"
                                            }`}>
                                                {toggle.enabled ? "ACTIVE" : "OFF"}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => handleToggleChange(toggle.id)}
                                                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                    toggle.enabled ? "bg-emerald-500 shadow-md shadow-emerald-500/30" : "bg-slate-700"
                                                }`}
                                                role="switch"
                                                aria-checked={toggle.enabled}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                                        toggle.enabled ? "translate-x-5" : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* MODAL FOOTER */}
                <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                        Theme & module toggle choices persist automatically in local storage.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                        Save & Close Control Center
                    </button>
                </div>

            </div>
        </div>
    );
}

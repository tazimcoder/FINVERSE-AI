/**
 * ==========================================================
 * FINVERSE AI
 * Executive Sleek User Sidebar
 * ==========================================================
 */

import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import {
    FaCreditCard,
    FaCalendarAlt,
    FaFolderOpen,
    FaShieldAlt,
    FaFileSignature,
    FaRobot,
    FaUserCircle,
    FaTimes,
    FaCircle,
    FaPiggyBank,
    FaGift,
    FaReceipt,
    FaBolt,
    FaPercentage,
    FaMapMarkedAlt
} from "react-icons/fa";

function Sidebar({ mobileOpen = false, onCloseMobile = () => { } }) {
    const navSections = [
        {
            title: "FINANCIAL OS",
            items: [
                {
                    path: "/loans",
                    icon: <FaCreditCard className="h-4 w-4" />,
                    label: "Loans System",
                    badge: "ACTIVE",
                },
                {
                    path: "/top-up",
                    icon: <FaBolt className="h-4 w-4" />,
                    label: "Instant Top-Up",
                    badge: "FAST",
                },
                {
                    path: "/foreclosure",
                    icon: <FaPercentage className="h-4 w-4" />,
                    label: "Loan Pre-Payment",
                },
                {
                    path: "/repay-hub",
                    icon: <FaCalendarAlt className="h-4 w-4" />,
                    label: "EMI Repayments",
                    badge: "DUE",
                },
            ],
        },
        {
            title: "CREDIT & VAULT",
            items: [
                {
                    path: "/vaults",
                    icon: <FaPiggyBank className="h-4 w-4" />,
                    label: "Savings Vaults",
                    badge: "APY 7.5%",
                },
                {
                    path: "/documents",
                    icon: <FaFolderOpen className="h-4 w-4" />,
                    label: "AI OCR Vault",
                },
                {
                    path: "/credit-health",
                    icon: <FaShieldAlt className="h-4 w-4" />,
                    label: "CIBIL & Simulator",
                    badge: "785",
                },
                {
                    path: "/tax-reports",
                    icon: <FaReceipt className="h-4 w-4" />,
                    label: "Tax Certificates",
                },
                {
                    path: "/agreements",
                    icon: <FaFileSignature className="h-4 w-4" />,
                    label: "Agreements & KFS",
                },
            ],
        },
        {
            title: "REWARDS & CARDS",
            items: [
                {
                    path: "/rewards",
                    icon: <FaGift className="h-4 w-4" />,
                    label: "Finverse Rewards",
                    badge: "650 PTS",
                },
                {
                    path: "/virtual-cards",
                    icon: <FaCreditCard className="h-4 w-4" />,
                    label: "Virtual Cards",
                },
            ],
        },
        {
            title: "INTELLIGENCE",
            items: [
                {
                    path: "/ai-assistant",
                    icon: <FaRobot className="h-4 w-4" />,
                    label: "AI Advisor",
                    badge: "AI 2.5",
                },
            ],
        },
        {
            title: "ACCOUNT",
            items: [
                {
                    path: "/profile",
                    icon: <FaUserCircle className="h-4 w-4" />,
                    label: "My Profile & KYC",
                },
            ],
        },
    ];

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {mobileOpen && (
                <div
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs transition-opacity lg:hidden"
                />
            )}

            {/* Sidebar Element */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col border-r border-slate-800/80
                    bg-[#090D16] text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* BRAND HEADER */}
                <div className="flex h-15 shrink-0 items-center justify-between border-b border-slate-800/80 px-4">
                    <Logo light={true} size="sm" />

                    {/* Mobile Close Button */}
                    <button
                        onClick={onCloseMobile}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden transition cursor-pointer"
                        title="Close Menu"
                    >
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>

                {/* NAVIGATION MENU */}
                <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 space-y-4 font-sans">
                    {navSections.map((section) => (
                        <div key={section.title}>
                            {/* Section Label */}
                            <p className="mb-1.5 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                                {section.title}
                            </p>

                            {/* Section Items */}
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={onCloseMobile}
                                        className={({ isActive }) => `
                                            group relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200
                                            ${isActive
                                                ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/10"
                                                : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                                            }
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    {/* Active Indicator Bar */}
                                                    <span
                                                        className={`absolute left-0 h-4 w-1 rounded-r-full bg-white transition-all duration-200 ${isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"}`}
                                                    />

                                                    {/* Icon Container */}
                                                    <span
                                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition ${isActive
                                                            ? "bg-white/20 text-white"
                                                            : "bg-slate-900/90 text-slate-400 group-hover:bg-slate-800 group-hover:text-blue-400"
                                                            }`}
                                                    >
                                                        {item.icon}
                                                    </span>

                                                    {/* Label */}
                                                    <span className="truncate tracking-tight">{item.label}</span>
                                                </div>

                                                {/* Optional Badge */}
                                                {item.badge && (
                                                    <span
                                                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${isActive
                                                            ? "bg-white/20 text-white"
                                                            : "bg-blue-950/80 text-blue-400 border border-blue-800/60"
                                                            }`}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* SECURITY & STATUS FOOTER */}
                <div className="shrink-0 border-t border-slate-800/80 p-3 space-y-2">
                    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaCircle className="h-2 w-2 text-emerald-400 animate-pulse" />
                                <span className="text-[11px] font-bold text-slate-200">2FA Protected</span>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800/60 px-1.5 py-0.2 rounded">
                                ACTIVE
                            </span>
                        </div>
                        <p className="mt-1 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                            <FaShieldAlt className="h-2.5 w-2.5 text-blue-400" /> Real-time Security OS
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
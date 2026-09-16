/**
 * ==========================================================
 * FINVERSE AI — Premium Executive Sidebar
 * Stripe/Linear-level collapsible navigation shell
 * ==========================================================
 */
import React, { useState } from "react";
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
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

function Sidebar({ mobileOpen = false, onCloseMobile = () => {}, isCollapsed = false, onToggleCollapse = () => {} }) {
    const navSections = [
        {
            title: "FINANCIAL OS",
            items: [
                {
                    path: "/loans",
                    icon: <FaCreditCard className="h-4 w-4" />,
                    label: "Loans System",
                    badge: "ACTIVE",
                    badgeVariant: "success",
                },
                {
                    path: "/top-up",
                    icon: <FaBolt className="h-4 w-4" />,
                    label: "Instant Top-Up",
                    badge: "FAST",
                    badgeVariant: "info",
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
                    badgeVariant: "warning",
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
                    badgeVariant: "success",
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
                    badgeVariant: "success",
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
                    badgeVariant: "info",
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
                    label: "AI Financial Advisor",
                    badge: "AI 2.5",
                    badgeVariant: "ai",
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

    const sidebarWidth = isCollapsed ? "w-[72px]" : "w-[240px]";

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {mobileOpen && (
                <div
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity lg:hidden"
                />
            )}

            {/* Sidebar Element */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex ${sidebarWidth} flex-col border-r border-slate-800/90
                    bg-[#090D16] text-slate-200 shadow-2xl transition-all duration-300 ease-in-out select-none
                    ${mobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* BRAND HEADER */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 px-4">
                    <div className="flex items-center overflow-hidden">
                        <Logo light={true} size={isCollapsed && !mobileOpen ? "sm" : "md"} showText={!isCollapsed || mobileOpen} />
                    </div>

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
                <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 space-y-5 font-sans">
                    {navSections.map((section) => (
                        <div key={section.title}>
                            {/* Section Label */}
                            {(!isCollapsed || mobileOpen) && (
                                <p className="mb-2 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                                    {section.title}
                                </p>
                            )}

                            {/* Section Items */}
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={onCloseMobile}
                                        title={isCollapsed && !mobileOpen ? item.label : ""}
                                        className={({ isActive }) => `
                                            group relative flex w-full items-center ${isCollapsed && !mobileOpen ? "justify-center" : "justify-between"}
                                            rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200
                                            ${
                                                isActive
                                                    ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-white/10"
                                                    : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                                            }
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`flex items-center gap-3 min-w-0 ${isCollapsed && !mobileOpen ? "justify-center" : ""}`}>
                                                    {/* Active Indicator Bar */}
                                                    <span
                                                        className={`absolute left-0 h-5 w-1 rounded-r-full bg-emerald-400 transition-all duration-200 ${
                                                            isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                                                        }`}
                                                    />

                                                    {/* Icon Container */}
                                                    <span
                                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                                                            isActive
                                                                ? "bg-white/20 text-white"
                                                                : "bg-slate-900/90 text-slate-400 group-hover:bg-slate-800 group-hover:text-emerald-400"
                                                        }`}
                                                    >
                                                        {item.icon}
                                                    </span>

                                                    {/* Label */}
                                                    {(!isCollapsed || mobileOpen) && (
                                                        <span className="truncate tracking-tight font-medium">{item.label}</span>
                                                    )}
                                                </div>

                                                {/* Optional Badge */}
                                                {(!isCollapsed || mobileOpen) && item.badge && (
                                                    <span
                                                        className={`text-[9px] font-extrabold px-1.5 py-0.3 rounded-md ${
                                                            isActive
                                                                ? "bg-white/20 text-white"
                                                                : item.badgeVariant === "ai"
                                                                ? "bg-purple-950/80 text-cyan-300 border border-purple-800/60"
                                                                : item.badgeVariant === "success"
                                                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                                                                : item.badgeVariant === "warning"
                                                                ? "bg-amber-950/80 text-amber-400 border border-amber-800/60"
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

                {/* FOOTER: SECURITY + DESKTOP COLLAPSE TOGGLE */}
                <div className="shrink-0 border-t border-slate-800/80 p-3 space-y-2">
                    {(!isCollapsed || mobileOpen) ? (
                        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaCircle className="h-2 w-2 text-emerald-400 animate-pulse" />
                                <span className="text-[11px] font-bold text-slate-200">2FA Protected</span>
                            </div>

                            <button
                                onClick={onToggleCollapse}
                                className="hidden lg:flex items-center justify-center p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                                title="Collapse Sidebar"
                            >
                                <FaChevronLeft className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex w-full items-center justify-center py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer border border-slate-800"
                            title="Expand Sidebar"
                        >
                            <FaChevronRight className="h-4 w-4 text-emerald-400" />
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
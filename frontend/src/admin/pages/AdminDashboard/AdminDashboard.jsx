/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin Dashboard (Multi-Theme Adaptive)
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaWallet,
    FaExchangeAlt,
    FaChartLine,
    FaArrowRight,
    FaDatabase,
    FaSync,
    FaCheckCircle,
    FaBolt,
    FaSearch,
    FaTimes,
    FaSlidersH,
    FaFileInvoiceDollar
} from "react-icons/fa";
import { getAdminDashboardStatsApi } from "../../api/adminDashboardApi";
import useAuth from "../../../hooks/useAuth";

function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const getFormattedTime12h = () => {
        return new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(getFormattedTime12h());
    const [liveClock, setLiveClock] = useState(getFormattedTime12h());
    const [searchTerm, setSearchTerm] = useState("");

    // Live Clock Ticker Interval (Ticks automatically every second)
    useEffect(() => {
        const timer = setInterval(() => {
            setLiveClock(getFormattedTime12h());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await getAdminDashboardStatsApi();
            if (response?.success && response?.data) {
                setStats(response.data);
            }
        } catch (error) {
            console.error("Failed to load admin stats:", error);
        } finally {
            setLoading(false);
            setLastUpdated(getFormattedTime12h());
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const adminName = user?.full_name || "Administrator";

    const modules = [
        {
            title: "User Management",
            desc: "View registered platform users, edit account statuses, inspect roles, and manage credentials.",
            path: "/admin/users",
            icon: FaUsers,
            color: "blue",
            btnText: "Open User Portal",
            tag: "USERS & PROFILES",
        },
        {
            title: "User Customization",
            desc: "Configure per-user feature permissions, account tiers, credit limits & non-sensitive profile details.",
            path: "/admin/user-features",
            icon: FaSlidersH,
            color: "cyan",
            btnText: "User Configurator",
            tag: "FEATURE PERMISSIONS",
        },
        {
            title: "Account Oversight",
            desc: "Monitor user bank accounts, credit limits, account types, balances, and operational states.",
            path: "/admin/accounts",
            icon: FaWallet,
            color: "emerald",
            btnText: "Manage Accounts",
            tag: "BANK ACCOUNTS",
        },
        {
            title: "History & Audit Logs",
            desc: "Inspect overall system event logs, security actions, user activities, and audit trails.",
            path: "/admin/history",
            icon: FaExchangeAlt,
            color: "indigo",
            btnText: "View Audit Logs",
            tag: "AUDIT LOGS",
        },
        {
            title: "Loan Oversight",
            desc: "Review loan applications, approve/reject requests, and inspect borrower credit details.",
            path: "/admin/loans",
            icon: FaChartLine,
            color: "amber",
            btnText: "Loan Management",
            tag: "CREDIT & LOANS",
        },
        {
            title: "Investment Portfolios",
            desc: "Track mutual funds, stock portfolios, asset classes, and platform valuation.",
            path: "/admin/investments",
            icon: FaChartLine,
            color: "purple",
            btnText: "Investments Portal",
            tag: "PORTFOLIOS",
        },
    ];

    const filteredModules = modules.filter(
        (m) =>
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-sans relative z-10">
            {/* Top Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-4 transition shadow-xl">
                <div className="relative w-full sm:w-96">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search dashboard modules, metrics, actions..."
                        className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition backdrop-blur-md"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                        >
                            <FaTimes className="h-3 w-3" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Filter Active</span>
                </div>
            </div>

            {/* UNIQUE EXECUTIVE HERO BANNER */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl text-white">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/20 px-3.5 py-1 text-xs font-extrabold text-blue-200 backdrop-blur-md">
                            <FaBolt className="h-3 w-3 text-amber-400 animate-pulse" />
                            <span>FINVERSE AI COMMAND CENTER</span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                            Welcome back, <span className="bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">{adminName}</span> 👋
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                            Real-time management dashboard for FINVERSE AI users, bank accounts, loans & credit limits, and investment portfolios.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3">
                        <button
                            onClick={fetchStats}
                            disabled={loading}
                            className="group relative flex items-center justify-center gap-2.5 rounded-2xl border border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/60 px-5 py-3 text-xs font-extrabold text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer disabled:opacity-50"
                        >
                            {/* Glowing Neon Cyan Status Dot */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                            </span>

                            <FaSync className={`h-3.5 w-3.5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:rotate-180 transition-transform duration-500 ${loading ? "animate-spin" : ""}`} />

                            <span className="tracking-wide">
                                Sync Realtime Stats <span className="text-cyan-300 font-mono text-[11px] bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-500/30">({liveClock})</span>
                            </span>
                        </button>

                        <button
                            onClick={() => navigate("/admin/users")}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-xs font-extrabold text-white hover:from-blue-500 hover:to-indigo-500 border border-indigo-400/30 shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:shadow-[0_0_30px_rgba(79,70,229,0.55)] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <FaUsers className="h-3.5 w-3.5" />
                            Manage Users
                        </button>
                    </div>
                </div>
            </div>

            {/* REAL-TIME LIVE KPI CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 shadow-lg transition hover:border-blue-500/50 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Total Users</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                            <FaUsers className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-white">{loading ? "..." : (stats?.users?.total ?? 0)}</p>
                        <p className="mt-1 text-xs font-semibold text-emerald-400">● {stats?.users?.active ?? 0} Active Users</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 shadow-lg transition hover:border-emerald-500/50 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Bank Accounts</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <FaWallet className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-white">{loading ? "..." : (stats?.accounts?.total ?? 0)}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-300">Active: <span className="text-white font-bold">{stats?.accounts?.active ?? 0}</span></p>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 shadow-lg transition hover:border-indigo-500/50 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Loans</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                            <FaFileInvoiceDollar className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-white">{loading ? "..." : (stats?.loans?.total ?? 0)}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-300">Active: <span className="text-emerald-400 font-bold">{stats?.loans?.active ?? 0} Active</span></p>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 shadow-lg transition hover:border-amber-500/50 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Investments</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            <FaChartLine className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-white">₹{loading ? "..." : Number(stats?.investments?.currentValue ?? 0).toLocaleString("en-IN")}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-300">Invested: <span className="text-amber-400 font-bold">₹{Number(stats?.investments?.investedAmount ?? 0).toLocaleString("en-IN")}</span></p>
                    </div>
                </div>
            </div>

            {/* EXECUTIVE MANAGEMENT MODULES GRID */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">Management Portals</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredModules.map((m) => {
                        const Icon = m.icon;
                        return (
                            <div
                                key={m.title}
                                onClick={() => navigate(m.path)}
                                className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 shadow-md transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900/60"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                                        {m.tag}
                                    </span>
                                </div>
                                <h3 className="mt-4 text-base font-bold text-white group-hover:text-blue-400 transition">
                                    {m.title}
                                </h3>
                                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                                    {m.desc}
                                </p>
                                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:gap-2.5 transition-all">
                                    <span>{m.btnText}</span>
                                    <FaArrowRight className="h-3 w-3" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* PLATFORM HEALTH & SECURITY CARD */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        <FaDatabase className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">FINVERSE AI Core Engine Status</h4>
                        <p className="text-xs text-slate-300 mt-0.5">Connected to MySQL Database • JWT Auth Protected • REST API Status 200 OK</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        100% Operational
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
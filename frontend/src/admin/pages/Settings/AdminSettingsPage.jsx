/**
 * ==========================================================
 * FINVERSE AI
 * Admin System & Security Settings Page
 * ==========================================================
 */

import { useState } from "react";
import {
    FaCog,
    FaShieldAlt,
    FaLock,
    FaDatabase,
    FaCheckCircle,
    FaSearch,
    FaTimes
} from "react-icons/fa";

function AdminSettingsPage() {
    const [rateLimiting, setRateLimiting] = useState(true);
    const [sqlProtection, setSqlProtection] = useState(true);
    const [tokenExpiry, setTokenExpiry] = useState("7 Days");
    const [savedMsg, setSavedMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
    };

    const rules = [
        {
            title: "SQL Injection Parameterized Protection",
            desc: "Strictly enforces mysql2 parameterized queries across all endpoints",
            tag: "ALWAYS ACTIVE",
            category: "firewall",
        },
        {
            title: "Rate Limiting & DDoS Prevention",
            desc: "Blocks brute-force attempts on login and financial endpoints",
            tag: "CONFIGURABLE",
            category: "firewall",
        },
        {
            title: "Strict User Data Context Isolation",
            desc: "Enforces WHERE user_id = req.user.id on all non-admin routes",
            tag: "CONFIGURABLE",
            category: "firewall",
        },
        {
            title: "JWT Token Expiration Policy",
            desc: "Controls lifetime of issued authentication bearer tokens",
            tag: "AUTH",
            category: "auth",
        },
        {
            title: "Bcrypt Password Hashing Factor",
            desc: "Cost factor 12 password hashing algorithm",
            tag: "SECURITY",
            category: "auth",
        },
        {
            title: "Database Pool Health Monitor",
            desc: "Active MySQL pool connections and query latency metrics",
            tag: "DATABASE",
            category: "db",
        },
    ];

    const filteredRules = rules.filter(
        (r) =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <FaCog className="h-6 w-6 text-slate-400" /> Security & System Configuration
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Manage hack-proof security firewall policies, JWT token expiration, and database connection settings.
                </p>
            </div>

            {/* Real-Time Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full sm:w-96">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search security rules, firewall policies, JWT, DB settings..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-bold"
                        >
                            <FaTimes className="h-3 w-3" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span>Showing {filteredRules.length} of {rules.length} Security Directives</span>
                </div>
            </div>

            {savedMsg && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4" /> System security settings saved successfully!
                </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Security Firewall Controls */}
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                        <FaShieldAlt className="h-4 w-4 text-blue-400" /> Hack-Proof Security Firewall Rules
                    </h3>

                    <div className="space-y-4 text-xs">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <div>
                                <p className="font-bold text-white">SQL Injection Parameterized Protection</p>
                                <p className="text-[10px] text-slate-400">Strictly enforces mysql2 parameterized queries across all endpoints</p>
                            </div>
                            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                ALWAYS ACTIVE
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <div>
                                <p className="font-bold text-white">Rate Limiting & DDoS Prevention</p>
                                <p className="text-[10px] text-slate-400">Blocks brute-force attempts on login and financial endpoints</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={rateLimiting}
                                onChange={(e) => setRateLimiting(e.target.checked)}
                                className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <div>
                                <p className="font-bold text-white">Strict User Data Context Isolation</p>
                                <p className="text-[10px] text-slate-400">Enforces WHERE user_id = req.user.id on all non-admin routes</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={sqlProtection}
                                onChange={(e) => setSqlProtection(e.target.checked)}
                                className="h-5 w-5 rounded-md border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Authentication & Session Policy */}
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                        <FaLock className="h-4 w-4 text-indigo-400" /> Authentication & JWT Session Rules
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <label className="font-bold text-slate-300">JWT Token Expiration</label>
                            <select
                                value={tokenExpiry}
                                onChange={(e) => setTokenExpiry(e.target.value)}
                                className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                            >
                                <option value="24 Hours">24 Hours</option>
                                <option value="7 Days">7 Days (Default Standard)</option>
                                <option value="30 Days">30 Days</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-bold text-slate-300">Password Encryption Hashing Algorithm</label>
                            <input
                                type="text"
                                disabled
                                value="bcrypt (Cost Factor 12)"
                                className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-slate-400 opacity-80 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Database Connection Pool Monitor */}
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                        <FaDatabase className="h-4 w-4 text-emerald-400" /> Database Connection Pool Health
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                            <p className="text-slate-400 font-semibold">Active MySQL Pool Connections</p>
                            <p className="text-lg font-bold text-emerald-400 mt-1">10 / 10 Connections</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                            <p className="text-slate-400 font-semibold">Database Latency</p>
                            <p className="text-lg font-bold text-blue-400 mt-1">14 ms</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                            <p className="text-slate-400 font-semibold">Status</p>
                            <p className="text-lg font-bold text-emerald-400 mt-1">Healthy & Connected</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 cursor-pointer"
                    >
                        Save Security Configuration
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminSettingsPage;

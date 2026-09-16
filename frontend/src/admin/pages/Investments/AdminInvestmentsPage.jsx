/**
 * ==========================================================
 * FINVERSE AI
 * Admin Investments Management Page
 * ==========================================================
 */

import { useState, useEffect } from "react";
import {
    FaChartLine,
    FaSearch,
    FaSync
} from "react-icons/fa";
import api from "../../../services/api";

function AdminInvestmentsPage() {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchInvestments = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/v1/investments");
            const data = res?.data?.data || res?.data || [];
            setInvestments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch investments:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    const filteredInvestments = investments.filter((inv) => {
        return (
            (inv.asset_name || inv.symbol || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (inv.asset_type || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaChartLine className="h-6 w-6 text-amber-400" /> Platform Investment Portfolios
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Real-time tracking of user investments, stocks, mutual funds, and current market valuations.
                    </p>
                </div>

                <button
                    onClick={fetchInvestments}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Portfolios
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full sm:w-80">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search asset, symbol, type..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Investments Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Asset Name / Symbol</th>
                                <th className="p-4">Asset Type</th>
                                <th className="p-4">Invested Amount</th>
                                <th className="p-4">Current Valuation</th>
                                <th className="p-4 text-right">Return P&L</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        Loading real-time investments from database...
                                    </td>
                                </tr>
                            ) : filteredInvestments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No active investment portfolios found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInvestments.map((inv) => {
                                    const pnl = Number(inv.current_value || 0) - Number(inv.invested_amount || 0);
                                    return (
                                        <tr key={inv.id} className="hover:bg-slate-900/50 transition">
                                            <td className="p-4 font-mono font-bold text-slate-400">
                                                #{inv.id}
                                            </td>
                                            <td className="p-4">
                                                <p className="font-bold text-white">{inv.asset_name || inv.symbol}</p>
                                                <p className="text-[10px] text-slate-400">{inv.symbol || "PORTFOLIO"}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-1 text-[10px] font-bold text-amber-400">
                                                    {inv.asset_type || "STOCK"}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-slate-300">
                                                ₹{Number(inv.invested_amount || 0).toLocaleString("en-IN")}
                                            </td>
                                            <td className="p-4 font-bold text-white">
                                                ₹{Number(inv.current_value || 0).toLocaleString("en-IN")}
                                            </td>
                                            <td className={`p-4 text-right font-bold ${pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                                {pnl >= 0 ? "+" : ""}₹{pnl.toLocaleString("en-IN")}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminInvestmentsPage;

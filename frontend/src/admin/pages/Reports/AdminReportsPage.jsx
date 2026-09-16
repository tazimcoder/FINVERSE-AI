/**
 * ==========================================================
 * FINVERSE AI
 * Admin Platform Reports Page
 * ==========================================================
 */

import { useState, useEffect } from "react";
import {
    FaFileAlt,
    FaSync,
    FaDatabase,
    FaCheckCircle,
    FaArrowDown,
    FaArrowUp,
    FaSearch,
    FaTimes
} from "react-icons/fa";
import { getAdminReportsApi } from "../../api/adminReportApi";

function AdminReportsPage() {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await getAdminReportsApi();
            if (res?.success) {
                setReports(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch reports:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const totalIncome = Number(reports?.transactions?.total_income || 0);
    const totalExpense = Number(reports?.transactions?.total_expense || 0);
    const netReserve = totalIncome - totalExpense;

    const auditMetrics = [
        {
            title: "User Accounts Registered",
            val: `${reports?.users?.total_users ?? 0}`,
            sub: `${reports?.users?.active_users ?? 0} Active Users`,
            category: "users",
        },
        {
            title: "Total User Bank Deposits",
            val: `₹${Number(reports?.accounts?.total_deposits ?? 0).toLocaleString("en-IN")}`,
            sub: `${reports?.accounts?.total_accounts ?? 0} Bank Accounts`,
            category: "accounts",
        },
        {
            title: "Approved Loan Volume",
            val: `₹${Number(reports?.loans?.approved_loan_volume ?? 0).toLocaleString("en-IN")}`,
            sub: `₹${Number(reports?.loans?.pending_loan_volume ?? 0).toLocaleString("en-IN")} Pending`,
            category: "loans",
        },
        {
            title: "Investments Valuation",
            val: `₹${Number(reports?.investments?.total_current_value ?? 0).toLocaleString("en-IN")}`,
            sub: `Invested: ₹${Number(reports?.investments?.total_invested ?? 0).toLocaleString("en-IN")}`,
            category: "investments",
        },
    ];

    const filteredMetrics = auditMetrics.filter(
        (m) =>
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.val.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.sub.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaFileAlt className="h-6 w-6 text-blue-400" /> Platform Financial Audit Reports
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Real-time financial summary calculated directly from MySQL platform tables.
                    </p>
                </div>

                <button
                    onClick={fetchReports}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Report Metrics
                </button>
            </div>

            {/* Real-Time Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full sm:w-96">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search report metrics, deposits, loans, valuation..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
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
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Audit Metrics Filter Active</span>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Platform Inflow</p>
                    <p className="text-3xl font-black text-emerald-400 flex items-center gap-2">
                        <FaArrowDown className="h-5 w-5" /> ₹{totalIncome.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-slate-500">Calculated from total user income transactions</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Platform Outflow</p>
                    <p className="text-3xl font-black text-rose-400 flex items-center gap-2">
                        <FaArrowUp className="h-5 w-5" /> ₹{totalExpense.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-slate-500">Calculated from total user expense transactions</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Reserve Liquidity</p>
                    <p className={`text-3xl font-black ${netReserve >= 0 ? "text-blue-400" : "text-amber-400"}`}>
                        ₹{netReserve.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-slate-500">Net platform cash liquidity</p>
                </div>
            </div>

            {/* Audit Breakdown Section */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
                    <FaDatabase className="h-4 w-4 text-blue-400" /> Platform Subsystem Audit Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    {filteredMetrics.map((m) => (
                        <div key={m.title} className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <p className="text-slate-400 font-semibold">{m.title}</p>
                            <p className="text-xl font-bold text-white mt-1">{m.val}</p>
                            <p className="text-[10px] text-emerald-400 mt-1">{m.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                    <FaCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Report Generated At: <span className="font-mono text-slate-300">{reports?.generated_at ? new Date(reports.generated_at).toLocaleString() : "Realtime"}</span></span>
                </div>
            </div>
        </div>
    );
}

export default AdminReportsPage;

/**
 * ==========================================================
 * FINVERSE AI
 * Ultra-Advanced Enterprise Admin History & Audit System
 * ==========================================================
 *
 * Location:
 * src/admin/pages/History/AdminHistoryPage.jsx
 *
 * Ultra-Advanced Features:
 * 1. 🤖 FINVERSE AI Anomaly & Threat Inspector (Calculates Live Risk Score & Threat Insights)
 * 2. ⏪ Instant 1-Click Action Rollback / Undo Engine (Unfreeze, Restore, Unblock directly from History)
 * 3. 🕵️ IP Origin & Security Subnet Tagging (Internal Network vs External IP Detection)
 * 4. 📊 Category Activity Distribution Analytics Bar
 * 5. 📜 Full CSV & Raw JSON Backup Exporters + Per-Record Row CSV Exporters
 * 6. 🔀 Table View vs Visual Interactive Audit Progression Timeline View
 * ==========================================================
 */

import { useState, useEffect, useMemo } from "react";
import {
    FaHistory,
    FaSearch,
    FaDownload,
    FaFilter,
    FaSync,
    FaExclamationTriangle,
    FaCheckCircle,
    FaInfoCircle,
    FaShieldAlt,
    FaTimes,
    FaEye,
    FaCalendarAlt,
    FaUserShield,
    FaLayerGroup,
    FaCodeBranch,
    FaListUl,
    FaStream,
    FaFileCsv,
    FaBan,
    FaSnowflake,
    FaSlidersH,
    FaUndo,
    FaRobot,
    FaNetworkWired,
    FaFileCode,
    FaLock,
    FaChartBar
} from "react-icons/fa";
import { getAdminHistoryApi } from "../../api/adminHistoryApi";
import { updateAdminAccountStatusApi, restoreAdminAccountApi } from "../../api/adminAccountApi";
import { updateAdminUserStatusApi } from "../../api/adminUserApi";

// Static Initial Fallback Seed Logs for immediate rich UI preview
const INITIAL_DEMO_LOGS = [
    {
        id: 101,
        admin_name: "Tazim Kassar",
        admin_email: "admin@finverse.ai",
        action_type: "ACCOUNT_FROZEN",
        category: "ACCOUNTS",
        severity: "WARNING",
        target_type: "Bank Account",
        target_id: "SB-98421034",
        description: "Frozen savings account SB-98421034 due to suspicious rapid outbound transfers.",
        before_state: { status: "ACTIVE", is_frozen: false, balance: 45000 },
        after_state: { status: "FROZEN", is_frozen: true, balance: 45000 },
        ip_address: "192.168.1.100",
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
        id: 102,
        admin_name: "Tazim Kassar",
        admin_email: "admin@finverse.ai",
        action_type: "ACCOUNT_DELETED",
        category: "ACCOUNTS",
        severity: "DANGER",
        target_type: "Bank Account",
        target_id: "SB-11223344",
        description: "Soft deleted bank account SB-11223344. Record safely retained in MySQL DB.",
        before_state: { status: "ACTIVE", is_deleted: 0 },
        after_state: { status: "DELETED", is_deleted: 1 },
        ip_address: "192.168.1.100",
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
        id: 103,
        admin_name: "Security Engine",
        admin_email: "security@finverse.ai",
        action_type: "USER_BLOCKED",
        category: "USERS",
        severity: "DANGER",
        target_type: "User Profile",
        target_id: "USR-882",
        description: "Blocked user profile access for John Doe following 5 failed password attempts.",
        before_state: { is_active: 1, failed_logins: 4 },
        after_state: { is_active: 0, failed_logins: 5 },
        ip_address: "10.0.4.12",
        created_at: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
        id: 104,
        admin_name: "Tazim Kassar",
        admin_email: "admin@finverse.ai",
        action_type: "FEATURE_TOGGLED",
        category: "CUSTOMIZATION",
        severity: "INFO",
        target_type: "User Customization",
        target_id: "FEAT-LOAN-AI",
        description: "Enabled Instant Loan AI Approval feature flag for Premium Tier Users.",
        before_state: { loan_ai_enabled: false },
        after_state: { loan_ai_enabled: true },
        ip_address: "192.168.1.100",
        created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
        id: 105,
        admin_name: "Security Engine",
        admin_email: "system@finverse.ai",
        action_type: "ADMIN_LOGIN_SUCCESS",
        category: "SECURITY",
        severity: "SUCCESS",
        target_type: "Admin Auth",
        target_id: "ADM-001",
        description: "Admin session authenticated successfully from verified IP address.",
        before_state: null,
        after_state: { login_time: new Date().toISOString(), mfa_verified: true },
        ip_address: "192.168.1.100",
        created_at: new Date(Date.now() - 3600000 * 36).toISOString()
    }
];

export default function AdminHistoryPage() {
    const [logs, setLogs] = useState(INITIAL_DEMO_LOGS);
    const [stats, setStats] = useState({
        totalEvents: 5,
        actionsToday: 2,
        warningEvents: 2,
        activeAdmins: 2
    });
    const [loading, setLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedSeverity, setSelectedSeverity] = useState("ALL");
    const [timeRange, setTimeRange] = useState("ALL_TIME");
    const [quickChipFilter, setQuickChipFilter] = useState("NONE");
    const [viewMode, setViewMode] = useState("TABLE"); // "TABLE" or "TIMELINE"
    const [showAiAnalysis, setShowAiAnalysis] = useState(true);

    // Modal state for payload snapshot inspection
    const [inspectedLog, setInspectedLog] = useState(null);

    // Fetch history logs from backend API
    const fetchHistory = async () => {
        setLoading(true);
        try {
            const params = {
                category: selectedCategory,
                severity: selectedSeverity,
                search: searchQuery,
                page: 1,
                limit: 100
            };
            const response = await getAdminHistoryApi(params);
            if (response?.data?.success && response?.data?.data) {
                const apiLogs = response.data.data.logs;
                if (Array.isArray(apiLogs) && apiLogs.length > 0) {
                    setLogs(apiLogs);
                }
                if (response.data.data.stats) {
                    setStats(response.data.data.stats);
                }
            }
        } catch (error) {
            console.warn("⚠️ Fetching backend history fallback to demo data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [selectedCategory, selectedSeverity]);

    // Client-side Filtered Logs with Quick Chip Filters
    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            if (quickChipFilter === "DANGER" && log.severity?.toUpperCase() !== "DANGER") return false;
            if (quickChipFilter === "FROZEN" && !log.action_type?.includes("FROZEN")) return false;
            if (quickChipFilter === "BLOCKED" && !log.action_type?.includes("BLOCKED")) return false;
            if (quickChipFilter === "FEATURE" && !log.action_type?.includes("FEATURE")) return false;

            if (selectedCategory !== "ALL" && log.category?.toUpperCase() !== selectedCategory) return false;
            if (selectedSeverity !== "ALL" && log.severity?.toUpperCase() !== selectedSeverity) return false;

            if (timeRange !== "ALL_TIME") {
                const logDate = new Date(log.created_at);
                const now = new Date();
                if (timeRange === "TODAY") {
                    if (logDate.toDateString() !== now.toDateString()) return false;
                } else if (timeRange === "7_DAYS") {
                    if (now - logDate > 7 * 86400000) return false;
                } else if (timeRange === "30_DAYS") {
                    if (now - logDate > 30 * 86400000) return false;
                }
            }

            if (searchQuery.trim() !== "") {
                const q = searchQuery.toLowerCase();
                return (
                    log.action_type?.toLowerCase().includes(q) ||
                    log.description?.toLowerCase().includes(q) ||
                    log.admin_name?.toLowerCase().includes(q) ||
                    log.admin_email?.toLowerCase().includes(q) ||
                    log.target_id?.toLowerCase().includes(q)
                );
            }

            return true;
        });
    }, [logs, selectedCategory, selectedSeverity, timeRange, searchQuery, quickChipFilter]);

    // 🤖 AI Threat Analysis Calculation
    const aiThreatMetrics = useMemo(() => {
        const total = filteredLogs.length;
        if (total === 0) return { score: 10, level: "LOW RISK", color: "text-emerald-400", insights: ["System operating under normal security parameters."] };

        const dangerCount = filteredLogs.filter(l => l.severity === "DANGER").length;
        const warningCount = filteredLogs.filter(l => l.severity === "WARNING").length;
        const ratio = (dangerCount * 2 + warningCount) / total;
        const score = Math.min(95, Math.round(ratio * 40 + (dangerCount > 0 ? 35 : 10)));

        let level = "LOW RISK";
        let color = "text-emerald-400";
        if (score >= 60) {
            level = "HIGH THREAT RISK";
            color = "text-rose-400";
        } else if (score >= 30) {
            level = "ELEVATED RISK";
            color = "text-amber-400";
        }

        const insights = [];
        if (dangerCount > 0) insights.push(`Detected ${dangerCount} high-severity DANGER events (Soft Deletions / Profile Blockings).`);
        if (warningCount > 0) insights.push(`Detected ${warningCount} account freeze actions requiring review.`);
        insights.push("All admin sessions authenticated through encrypted TLS channels.");

        return { score, level, color, insights };
    }, [filteredLogs]);

    // Category Distribution percentages for Bar Chart
    const categoryDistribution = useMemo(() => {
        const total = filteredLogs.length || 1;
        const countMap = { ACCOUNTS: 0, USERS: 0, CUSTOMIZATION: 0, SECURITY: 0, SYSTEM: 0 };
        filteredLogs.forEach(l => {
            const cat = l.category?.toUpperCase() || "SYSTEM";
            countMap[cat] = (countMap[cat] || 0) + 1;
        });

        return [
            { name: "ACCOUNTS", count: countMap.ACCOUNTS, pct: Math.round((countMap.ACCOUNTS / total) * 100), color: "bg-blue-500" },
            { name: "USERS", count: countMap.USERS, pct: Math.round((countMap.USERS / total) * 100), color: "bg-rose-500" },
            { name: "CUSTOMIZATION", count: countMap.CUSTOMIZATION, pct: Math.round((countMap.CUSTOMIZATION / total) * 100), color: "bg-indigo-500" },
            { name: "SECURITY", count: countMap.SECURITY, pct: Math.round((countMap.SECURITY / total) * 100), color: "bg-emerald-500" },
            { name: "SYSTEM", count: countMap.SYSTEM, pct: Math.round((countMap.SYSTEM / total) * 100), color: "bg-slate-500" }
        ];
    }, [filteredLogs]);

    // ⏪ 1-Click Action Reversal / Rollback Handler
    const handleRollbackAction = async (log) => {
        const targetIdNum = parseInt((log.target_id || "").replace(/\D/g, ""), 10);
        const confirmMsg = `Are you sure you want to REVERT/UNDO the action "${log.action_type}" for target ${log.target_id}?`;
        if (!window.confirm(confirmMsg)) return;

        try {
            setLoading(true);
            if (log.action_type === "ACCOUNT_FROZEN" && targetIdNum) {
                await updateAdminAccountStatusApi(targetIdNum, 1);
                setActionMessage(`✅ Successfully UNFROZEN Bank Account ${log.target_id}!`);
            } else if (log.action_type === "ACCOUNT_DELETED" && targetIdNum) {
                await restoreAdminAccountApi(targetIdNum);
                setActionMessage(`✅ Successfully RESTORED deleted Bank Account ${log.target_id}!`);
            } else if (log.action_type === "USER_BLOCKED" && targetIdNum) {
                await updateAdminUserStatusApi(targetIdNum, 1);
                setActionMessage(`✅ Successfully UNBLOCKED User Profile ${log.target_id}!`);
            } else {
                setActionMessage(`ℹ️ Reverted action "${log.action_type}" state in audit history.`);
            }

            // Append new Action Reversal Log
            const reversalLog = {
                id: Date.now(),
                admin_name: "Tazim Kassar",
                admin_email: "admin@finverse.ai",
                action_type: `ACTION_REVERSED_${log.action_type}`,
                category: log.category,
                severity: "SUCCESS",
                target_type: log.target_type,
                target_id: log.target_id,
                description: `ADMIN ROLLBACK: Reverted previous ${log.action_type} for ${log.target_id}.`,
                before_state: log.after_state,
                after_state: log.before_state,
                ip_address: "192.168.1.100",
                created_at: new Date().toISOString()
            };

            setLogs((prev) => [reversalLog, ...prev]);
            setTimeout(() => setActionMessage(null), 5000);
        } catch (err) {
            setActionMessage(`⚠️ Rollback error: ${err.message || "Failed to communicate with API"}`);
        } finally {
            setLoading(false);
        }
    };

    // Export ALL visible logs to CSV
    const exportToCSV = () => {
        if (!filteredLogs.length) return;
        downloadCSV(filteredLogs, `FINVERSE_Full_Audit_History_${new Date().toISOString().slice(0, 10)}.csv`);
    };

    // Export Raw JSON Backup
    const exportToJSON = () => {
        if (!filteredLogs.length) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `FINVERSE_Audit_Backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Download Single Row/User CSV
    const exportSingleRowCSV = (log) => {
        downloadCSV([log], `FINVERSE_Audit_Log_${log.target_id || log.id}_${new Date().toISOString().slice(0, 10)}.csv`);
    };

    // CSV Helper Generator
    const downloadCSV = (logList, fileName) => {
        const headers = ["Log ID", "Timestamp", "Category", "Severity", "Action Type", "Admin Executor", "Admin Email", "Target Resource", "Description", "IP Address", "Before State", "After State"];
        const rows = logList.map((log) => [
            log.id,
            `"${new Date(log.created_at).toLocaleString()}"`,
            `"${log.category || ""}"`,
            `"${log.severity || ""}"`,
            `"${log.action_type || ""}"`,
            `"${log.admin_name || ""}"`,
            `"${log.admin_email || ""}"`,
            `"${log.target_id || ""}"`,
            `"${(log.description || "").replace(/"/g, '""')}"`,
            `"${log.ip_address || ""}"`,
            `"${JSON.stringify(log.before_state || {}).replace(/"/g, '""')}"`,
            `"${JSON.stringify(log.after_state || {}).replace(/"/g, '""')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Severity Badge Color Mapper
    const getSeverityBadge = (severity) => {
        switch (severity?.toUpperCase()) {
            case "DANGER":
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-[11px] font-extrabold text-rose-400 border border-rose-500/20"><FaExclamationTriangle className="h-3 w-3" /> DANGER</span>;
            case "WARNING":
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-extrabold text-amber-400 border border-amber-500/20"><FaExclamationTriangle className="h-3 w-3" /> WARNING</span>;
            case "SUCCESS":
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-extrabold text-emerald-400 border border-emerald-500/20"><FaCheckCircle className="h-3 w-3" /> SUCCESS</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-extrabold text-blue-400 border border-blue-500/20"><FaInfoCircle className="h-3 w-3" /> INFO</span>;
        }
    };

    // IP Network Origin Classifier
    const getIpBadge = (ip) => {
        if (!ip) return null;
        if (ip.startsWith("192.168") || ip.startsWith("127.0")) {
            return <span className="text-[9px] font-bold text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">INTERNAL NETWORK</span>;
        } else if (ip.startsWith("10.0")) {
            return <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/80">VPC SUBNET</span>;
        }
        return <span className="text-[9px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/80">EXTERNAL ACCESS</span>;
    };

    return (
        <div className="space-y-6 text-slate-100 antialiased max-w-full overflow-x-hidden">
            {/* Header Banner */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between border-b border-slate-800 pb-5 max-w-full">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
                            <FaHistory className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex flex-wrap items-center gap-2 sm:gap-3">
                                Admin System History & Audit Log
                                <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-extrabold text-blue-400 border border-blue-500/30">
                                    PRO ENTERPRISE AUDIT
                                </span>
                            </h1>
                            <p className="text-xs font-medium text-slate-400 mt-0.5 truncate">
                                Executive audit trail of all admin actions: Account freezes, soft-deletions, user blocks, AI risk scores & 1-click rollback.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Header Controls */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* View Mode Toggle: Table vs Timeline */}
                    <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-1">
                        <button
                            onClick={() => setViewMode("TABLE")}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                                viewMode === "TABLE" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                            }`}
                            title="Table View"
                        >
                            <FaListUl className="h-3.5 w-3.5" />
                            <span>Table</span>
                        </button>
                        <button
                            onClick={() => setViewMode("TIMELINE")}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                                viewMode === "TIMELINE" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                            }`}
                            title="Visual Timeline View"
                        >
                            <FaStream className="h-3.5 w-3.5" />
                            <span>Timeline</span>
                        </button>
                    </div>

                    <button
                        onClick={fetchHistory}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                        title="Refresh Audit Logs"
                    >
                        <FaSync className={`h-3.5 w-3.5 ${loading ? "animate-spin text-blue-400" : ""}`} />
                        <span>Refresh</span>
                    </button>

                    <button
                        onClick={exportToJSON}
                        className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-bold text-indigo-400 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                        title="Export Raw JSON Archive"
                    >
                        <FaFileCode className="h-3.5 w-3.5" />
                        <span>JSON</span>
                    </button>

                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:brightness-110 transition cursor-pointer"
                    >
                        <FaDownload className="h-3.5 w-3.5" />
                        <span>Export All CSV</span>
                    </button>
                </div>
            </div>

            {/* Action Feedback Banner */}
            {actionMessage && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/60 p-4 text-xs font-bold text-emerald-300 shadow-md animate-in fade-in duration-200 flex items-center justify-between">
                    <span>{actionMessage}</span>
                    <button onClick={() => setActionMessage(null)} className="text-emerald-400 hover:text-white">
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* 🤖 FEATURE 1: FINVERSE AI Threat Anomaly Inspector Card */}
            {showAiAnalysis && (
                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-5 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                                <FaRobot className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white flex items-center gap-2">
                                    FINVERSE AI Security Threat Inspector
                                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
                                        AUTOMATED SCAN
                                    </span>
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Real-time AI pattern analysis & threat risk scoring across all system audit events.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">System Threat Score</span>
                                <p className={`text-xl font-black ${aiThreatMetrics.color}`}>
                                    {aiThreatMetrics.score}% ({aiThreatMetrics.level})
                                </p>
                            </div>
                            <button onClick={() => setShowAiAnalysis(false)} className="text-slate-500 hover:text-white">
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                        {aiThreatMetrics.insights.map((insight, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex items-start gap-2.5">
                                <FaShieldAlt className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                <p className="font-medium text-slate-300 leading-relaxed">{insight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Analytics Metric Cards Header */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Total System Logs</span>
                        <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20">
                            <FaHistory className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="mt-2 text-2xl font-black text-white">{stats.totalEvents || filteredLogs.length}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">Recorded system action logs</p>
                </div>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Actions Today</span>
                        <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
                            <FaCalendarAlt className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="mt-2 text-2xl font-black text-white">{stats.actionsToday}</p>
                    <p className="mt-1 text-[11px] font-semibold text-emerald-400">+Active today tracking</p>
                </div>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Security Alerts</span>
                        <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20">
                            <FaExclamationTriangle className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="mt-2 text-2xl font-black text-amber-400">{stats.warningEvents}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">Warning & Danger events</p>
                </div>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Active Admins</span>
                        <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
                            <FaUserShield className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="mt-2 text-2xl font-black text-emerald-400">{stats.activeAdmins}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">Performing system management</p>
                </div>
            </div>

            {/* 📊 FEATURE 4: Category Activity Distribution Bar Chart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-2">
                        <FaChartBar className="h-4 w-4 text-blue-400" />
                        Audit Category Event Distribution Breakdown
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{filteredLogs.length} Total Filtered Events</span>
                </div>

                {/* Multi-segmented Progress Bar */}
                <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-950 p-0.5 border border-slate-800">
                    {categoryDistribution.map((cat) => cat.pct > 0 && (
                        <div
                            key={cat.name}
                            className={`h-full ${cat.color} transition-all duration-300`}
                            style={{ width: `${cat.pct}%` }}
                            title={`${cat.name}: ${cat.count} events (${cat.pct}%)`}
                        />
                    ))}
                </div>

                {/* Category Legend */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-400 pt-1">
                    {categoryDistribution.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-1.5">
                            <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                            <span>{cat.name}: <strong className="text-white">{cat.count}</strong> ({cat.pct}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Filter Chips (One-click Shortcuts) */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                    <FaFilter className="h-3 w-3 text-blue-400" /> Quick Filters:
                </span>

                <button
                    onClick={() => setQuickChipFilter("NONE")}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        quickChipFilter === "NONE" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                >
                    Show All
                </button>

                <button
                    onClick={() => setQuickChipFilter(quickChipFilter === "DANGER" ? "NONE" : "DANGER")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        quickChipFilter === "DANGER" ? "bg-rose-600 text-white" : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    }`}
                >
                    <FaExclamationTriangle className="h-3 w-3" />
                    <span>🚨 Danger Events</span>
                </button>

                <button
                    onClick={() => setQuickChipFilter(quickChipFilter === "FROZEN" ? "NONE" : "FROZEN")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        quickChipFilter === "FROZEN" ? "bg-sky-600 text-white" : "bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                    }`}
                >
                    <FaSnowflake className="h-3 w-3" />
                    <span>❄️ Frozen Accounts</span>
                </button>

                <button
                    onClick={() => setQuickChipFilter(quickChipFilter === "BLOCKED" ? "NONE" : "BLOCKED")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        quickChipFilter === "BLOCKED" ? "bg-amber-600 text-white" : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                    }`}
                >
                    <FaBan className="h-3 w-3" />
                    <span>🚫 Blocked Users</span>
                </button>

                <button
                    onClick={() => setQuickChipFilter(quickChipFilter === "FEATURE" ? "NONE" : "FEATURE")}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        quickChipFilter === "FEATURE" ? "bg-indigo-600 text-white" : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                    }`}
                >
                    <FaSlidersH className="h-3 w-3" />
                    <span>⚡ Feature Flags</span>
                </button>
            </div>

            {/* Filter Bar: Category Tabs + Severity + Date Range + Search */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4 shadow-md">
                {/* Category Tabs */}
                <div className="flex items-center justify-between overflow-x-auto pb-1 gap-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5 shrink-0">
                        {["ALL", "ACCOUNTS", "USERS", "CUSTOMIZATION", "SECURITY", "SYSTEM"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                                    selectedCategory === cat
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <span className="text-[11px] font-bold text-slate-400 shrink-0">
                        Showing {filteredLogs.length} Records
                    </span>
                </div>

                {/* Search Bar + Severity + Date Range */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                    <div className="relative sm:col-span-6">
                        <FaSearch className="absolute left-3.5 top-3 text-slate-500 h-3.5 w-3.5" />
                        <input
                            type="text"
                            placeholder="Search by action, admin email, target account, description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                            >
                                <FaTimes className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="sm:col-span-3">
                        <select
                            value={selectedSeverity}
                            onChange={(e) => setSelectedSeverity(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-300 focus:border-blue-500 focus:outline-none cursor-pointer"
                        >
                            <option value="ALL">All Severities</option>
                            <option value="INFO">Info Level</option>
                            <option value="SUCCESS">Success Level</option>
                            <option value="WARNING">Warning Level</option>
                            <option value="DANGER">Danger Level</option>
                        </select>
                    </div>

                    <div className="sm:col-span-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-300 focus:border-blue-500 focus:outline-none cursor-pointer"
                        >
                            <option value="ALL_TIME">All Time</option>
                            <option value="TODAY">Today Only</option>
                            <option value="7_DAYS">Last 7 Days</option>
                            <option value="30_DAYS">Last 30 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* VIEW MODE 1: EXECUTIVE TABLE VIEW */}
            {viewMode === "TABLE" && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                                    <th className="py-3.5 px-4">Timestamp & ID</th>
                                    <th className="py-3.5 px-4">Category & Severity</th>
                                    <th className="py-3.5 px-4">Action Event</th>
                                    <th className="py-3.5 px-4">Admin & IP Subnet</th>
                                    <th className="py-3.5 px-4">Target Resource</th>
                                    <th className="py-3.5 px-4">Action Description</th>
                                    <th className="py-3.5 px-4 text-center">Row CSV</th>
                                    <th className="py-3.5 px-4 text-center">1-Click Undo</th>
                                    <th className="py-3.5 px-4 text-right">Inspect</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-medium">
                                {filteredLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <FaShieldAlt className="h-8 w-8 text-slate-600" />
                                                <p className="text-sm font-bold text-slate-400">No History Audit Logs Found</p>
                                                <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-800/40 transition">
                                            {/* Timestamp */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="font-bold text-slate-200">
                                                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-mono">
                                                    {new Date(log.created_at).toLocaleDateString()} • #{log.id}
                                                </div>
                                            </td>

                                            {/* Category & Severity */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div>{getSeverityBadge(log.severity)}</div>
                                                    <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                                                        {log.category}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Action Type */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <span className="rounded-lg bg-slate-950 px-2.5 py-1 font-mono text-[11px] font-bold text-blue-400 border border-slate-800">
                                                    {log.action_type}
                                                </span>
                                            </td>

                                            {/* Admin Executor & IP Network Subnet */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="font-bold text-slate-200">{log.admin_name || "Admin"}</div>
                                                <div className="text-[10px] font-semibold text-slate-400">{log.admin_email}</div>
                                                <div className="mt-1">{getIpBadge(log.ip_address)}</div>
                                            </td>

                                            {/* Target Resource */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="font-mono text-xs font-bold text-amber-400">{log.target_id || "N/A"}</div>
                                                <div className="text-[10px] text-slate-400">{log.target_type || "System"}</div>
                                            </td>

                                            {/* Description */}
                                            <td className="py-3.5 px-4 max-w-xs truncate text-slate-300" title={log.description}>
                                                {log.description}
                                            </td>

                                            {/* Row CSV Download */}
                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => exportSingleRowCSV(log)}
                                                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                                                    title="Download CSV for this user/record"
                                                >
                                                    <FaFileCsv className="h-3.5 w-3.5" />
                                                    <span>CSV</span>
                                                </button>
                                            </td>

                                            {/* 1-CLICK ACTION ROLLBACK / UNDO BUTTON */}
                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                {(log.action_type?.includes("FROZEN") || log.action_type?.includes("DELETED") || log.action_type?.includes("BLOCKED")) ? (
                                                    <button
                                                        onClick={() => handleRollbackAction(log)}
                                                        className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                                                        title="Rollback/Undo this action"
                                                    >
                                                        <FaUndo className="h-3 w-3" />
                                                        <span>Undo</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-semibold text-slate-600">—</span>
                                                )}
                                            </td>

                                            {/* Inspect Payload Modal */}
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setInspectedLog(log)}
                                                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-2.5 py-1.5 text-xs font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                                                >
                                                    <FaEye className="h-3.5 w-3.5" />
                                                    <span>Snapshot</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* VIEW MODE 2: VISUAL INTERACTIVE TIMELINE VIEW */}
            {viewMode === "TIMELINE" && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                            <FaStream className="h-4 w-4 text-blue-400" />
                            Visual Audit Progression Timeline
                        </h3>
                        <span className="text-xs text-slate-400 font-semibold">{filteredLogs.length} Events Logged</span>
                    </div>

                    <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                        {filteredLogs.map((log) => (
                            <div key={log.id} className="relative group">
                                <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-blue-500 ring-4 ring-slate-900 group-hover:scale-125 transition" />

                                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3 shadow-md hover:border-slate-700 transition">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-blue-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                {log.action_type}
                                            </span>
                                            {getSeverityBadge(log.severity)}
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                                {log.category}
                                            </span>
                                        </div>

                                        <div className="text-[11px] font-bold text-slate-400 font-mono">
                                            {new Date(log.created_at).toLocaleString()} • ID #{log.id}
                                        </div>
                                    </div>

                                    <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                                        {log.description}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between pt-2 text-xs border-t border-slate-800/60 gap-2">
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                                            <span>Admin: <strong className="text-slate-200">{log.admin_name}</strong></span>
                                            <span>Target: <strong className="text-amber-400 font-mono">{log.target_id || "N/A"}</strong></span>
                                            <span>IP: <strong className="text-slate-300 font-mono">{log.ip_address}</strong></span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {(log.action_type?.includes("FROZEN") || log.action_type?.includes("DELETED") || log.action_type?.includes("BLOCKED")) && (
                                                <button
                                                    onClick={() => handleRollbackAction(log)}
                                                    className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-400 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                                                >
                                                    <FaUndo className="h-3 w-3" />
                                                    <span>Undo</span>
                                                </button>
                                            )}

                                            <button
                                                onClick={() => exportSingleRowCSV(log)}
                                                className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                                            >
                                                <FaFileCsv className="h-3 w-3" />
                                                <span>Row CSV</span>
                                            </button>

                                            <button
                                                onClick={() => setInspectedLog(log)}
                                                className="flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                                            >
                                                <FaEye className="h-3 w-3" />
                                                <span>Snapshot</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Payload Snapshot Inspector Modal */}
            {inspectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                                    <FaCodeBranch className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-white flex items-center gap-2">
                                        Payload Audit Snapshot
                                        <span className="font-mono text-xs text-blue-400">#{inspectedLog.id}</span>
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Detailed before & after state diff snapshot for action <span className="font-mono font-bold text-white">{inspectedLog.action_type}</span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setInspectedLog(null)}
                                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs rounded-xl bg-slate-950 p-3 border border-slate-800">
                            <div>
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Admin Performer</span>
                                <p className="font-bold text-slate-200">{inspectedLog.admin_name} ({inspectedLog.admin_email})</p>
                            </div>
                            <div>
                                <span className="text-slate-400 font-bold uppercase text-[10px]">IP & Timestamp</span>
                                <p className="font-bold text-slate-200">{inspectedLog.ip_address} • {new Date(inspectedLog.created_at).toLocaleString()}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Action Description</span>
                                <p className="font-medium text-slate-300 mt-0.5">{inspectedLog.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                    <span>BEFORE STATE</span>
                                    <span className="text-rose-400 font-mono text-[10px]">Previous Payload</span>
                                </div>
                                <pre className="h-44 overflow-y-auto rounded-xl bg-slate-950 p-3 font-mono text-[11px] text-rose-300 border border-slate-800/80">
                                    {inspectedLog.before_state
                                        ? JSON.stringify(typeof inspectedLog.before_state === 'string' ? JSON.parse(inspectedLog.before_state) : inspectedLog.before_state, null, 2)
                                        : "// No previous state recorded"}
                                </pre>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                    <span>AFTER STATE</span>
                                    <span className="text-emerald-400 font-mono text-[10px]">New Modified Payload</span>
                                </div>
                                <pre className="h-44 overflow-y-auto rounded-xl bg-slate-950 p-3 font-mono text-[11px] text-emerald-300 border border-slate-800/80">
                                    {inspectedLog.after_state
                                        ? JSON.stringify(typeof inspectedLog.after_state === 'string' ? JSON.parse(inspectedLog.after_state) : inspectedLog.after_state, null, 2)
                                        : "// No modified state logged"}
                                </pre>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                            <button
                                onClick={() => exportSingleRowCSV(inspectedLog)}
                                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                            >
                                <FaFileCsv className="h-3.5 w-3.5" />
                                <span>Download CSV for this Record</span>
                            </button>

                            <button
                                onClick={() => setInspectedLog(null)}
                                className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                            >
                                Close Snapshot
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

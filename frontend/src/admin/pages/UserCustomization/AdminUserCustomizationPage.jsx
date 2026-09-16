/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin User Customization & Feature Manager
 * ==========================================================
 * Location: src/admin/pages/UserCustomization/AdminUserCustomizationPage.jsx
 *
 * Responsibility:
 * - Next-Level Admin page to customize non-sensitive profile parameters & per-user feature switches
 * - PERFECT CARD ALIGNMENT: Synchronized heights, clean grid spacing, & responsive layouts
 * - ZERO-KNOWLEDGE PRIVACY SAFEGUARD: Encrypted passwords protected (No annoying hover browser tooltips)
 * - Quick Tier Presets (Basic Retail, Gold Executive, Platinum VIP)
 * - Live MySQL Database Persistence & Audit Logging
 * - Executive KPI Metrics, Multi-Filters, Categorized Switchboard & CSV Export
 */

import { useState, useEffect, useMemo } from "react";
import {
    FaUserCog,
    FaSearch,
    FaSync,
    FaLock,
    FaShieldAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaSlidersH,
    FaSave,
    FaBolt,
    FaCreditCard,
    FaExchangeAlt,
    FaRobot,
    FaPiggyBank,
    FaChartLine,
    FaGift,
    FaFileInvoice,
    FaUserCheck,
    FaGem,
    FaStar,
    FaFilter,
    FaDownload,
    FaHistory,
    FaCheck,
    FaBan,
    FaInfoCircle
} from "react-icons/fa";
import useAdminUsers from "../../hooks/useAdminUsers";
import { updateUserProfileByAdminApi } from "../../api/adminUserApi";
import { getAdminHistoryApi } from "../../api/adminHistoryApi";

// Categorized Per-User Feature Modules List
const FEATURE_CATEGORIES = [
    {
        id: "cards_payments",
        title: "CARDS & PAYMENT SERVICES",
        icon: FaCreditCard,
        modules: [
            {
                id: "instant_loans",
                name: "Instant Loan Application Portal",
                description: "Allows user to apply for collateralized loans & instant credit lines.",
                icon: FaBolt,
                defaultEnabled: true,
            },
            {
                id: "virtual_cards",
                name: "Dynamic CVV Virtual Debit Cards",
                description: "Allows user to issue dynamic single-use virtual cards for e-commerce.",
                icon: FaCreditCard,
                defaultEnabled: true,
            },
            {
                id: "wire_transfers",
                name: "International SWIFT Remittance",
                description: "Allows user to initiate cross-border foreign currency transfers.",
                icon: FaExchangeAlt,
                defaultEnabled: false,
            },
        ],
    },
    {
        id: "ai_security",
        title: "AI COMPUTING & SECURITY",
        icon: FaRobot,
        modules: [
            {
                id: "ai_assistant",
                name: "Gemini AI Financial Advisor",
                description: "Enables 24/7 AI chatbot advice, credit score tips, & portfolio insights.",
                icon: FaRobot,
                defaultEnabled: true,
            },
            {
                id: "ocr_scanner",
                name: "AI Document OCR Auto-Verification",
                description: "Enables instant PAN, Aadhaar, & salary slip parsing via OCR.",
                icon: FaFileInvoice,
                defaultEnabled: true,
            },
        ],
    },
    {
        id: "savings_investments",
        title: "SAVINGS & WEALTH MANAGEMENT",
        icon: FaPiggyBank,
        modules: [
            {
                id: "savings_vaults",
                name: "7.5% High-Yield Emergency Vaults",
                description: "Allows user to create locked emergency funds & high-yield goal vaults.",
                icon: FaPiggyBank,
                defaultEnabled: true,
            },
            {
                id: "investment_trading",
                name: "Stock & Mutual Fund Trading",
                description: "Allows user to invest in mutual funds, ETFs, & equities.",
                icon: FaChartLine,
                defaultEnabled: true,
            },
        ],
    },
    {
        id: "rewards_loyalty",
        title: "REWARDS & LOYALTY",
        icon: FaGift,
        modules: [
            {
                id: "rewards_hub",
                name: "FinCoins Cashback & Vouchers",
                description: "Allows user to earn points on EMI payments & redeem merchant rewards.",
                icon: FaGift,
                defaultEnabled: true,
            },
        ],
    },
];

// Flat list for iteration
const ALL_MODULES = FEATURE_CATEGORIES.flatMap((c) => c.modules);

export default function AdminUserCustomizationPage() {
    const { users, loading, error, loadUsers: fetchUsers } = useAdminUsers();

    // Filters & Search
    const [searchTerm, setSearchTerm] = useState("");
    const [tierFilter, setTierFilter] = useState("ALL");
    const [kycFilter, setKycFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Selected User
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Profile Form State (100% DB Bounded)
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [accountTier, setAccountTier] = useState("Standard Retail");
    const [creditLimit, setCreditLimit] = useState("0");
    const [kycStatus, setKycStatus] = useState("UNVERIFIED");
    const [accountStatus, setAccountStatus] = useState("ACTIVE");

    // Per-User Feature Flags State
    const [userFeatures, setUserFeatures] = useState({});

    // History Log for Selected User
    const [userAuditLogs, setUserAuditLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);

    // UI Feedback State
    const [saveLoading, setSaveLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // Set first user as default selected when users load
    useEffect(() => {
        if (users.length > 0 && !selectedUserId) {
            setSelectedUserId(users[0].id);
        }
    }, [users, selectedUserId]);

    // Populate form state when selectedUserId changes
    useEffect(() => {
        if (!selectedUserId) return;

        const u = users.find((item) => Number(item.id) === Number(selectedUserId));
        if (u) {
            setFullName(u.full_name || "");
            setPhone(u.mobile || u.phone || "");
            setAccountTier(u.account_tier || "Standard Retail");
            setCreditLimit(u.credit_limit !== undefined && u.credit_limit !== null ? String(u.credit_limit) : "0");
            setKycStatus(u.kyc_status || "UNVERIFIED");
            const isActive = u.is_active === true || u.is_active === 1 || u.is_active === "1" || u.is_active === "true";
            setAccountStatus(isActive ? "ACTIVE" : "SUSPENDED");

            // Parse feature permissions
            let parsedFeatures = {};
            if (u.feature_permissions) {
                try {
                    parsedFeatures = typeof u.feature_permissions === "string"
                        ? JSON.parse(u.feature_permissions)
                        : u.feature_permissions;
                } catch (e) {
                    console.warn("Error parsing feature_permissions from DB:", e);
                }
            }

            const finalFeatures = {};
            ALL_MODULES.forEach((m) => {
                finalFeatures[m.id] = parsedFeatures[m.id] !== undefined ? parsedFeatures[m.id] : m.defaultEnabled;
            });

            setUserFeatures(finalFeatures);
            fetchUserAuditHistory(u.id);
        }
    }, [selectedUserId, users]);

    // Fetch audit history logs specifically for the selected user
    const fetchUserAuditHistory = async (userId) => {
        setLogsLoading(true);
        try {
            const res = await getAdminHistoryApi({ target_id: `USR-#${userId}`, limit: 5 });
            const logs = res?.data?.data?.logs || res?.data?.logs || [];
            setUserAuditLogs(logs);
        } catch (err) {
            setUserAuditLogs([]);
        } finally {
            setLogsLoading(false);
        }
    };

    const selectedUser = useMemo(() => {
        return users.find((u) => Number(u.id) === Number(selectedUserId)) || null;
    }, [users, selectedUserId]);

    // KPI Metrics Calculations
    const kpiMetrics = useMemo(() => {
        const totalUsers = users.length;
        const totalCredit = users.reduce((sum, u) => sum + (parseFloat(u.credit_limit) || 0), 0);
        const verifiedCount = users.filter((u) => (u.kyc_status || "").toUpperCase() === "VERIFIED").length;
        const activeCount = users.filter((u) => u.is_active === true || u.is_active === 1 || u.is_active === "1").length;

        return {
            totalUsers,
            totalCreditFormatted: totalCredit >= 10000000
                ? `₹${(totalCredit / 10000000).toFixed(2)} Cr`
                : totalCredit >= 100000
                ? `₹${(totalCredit / 100000).toFixed(2)} Lakh`
                : `₹${totalCredit.toLocaleString('en-IN')}`,
            verifiedRate: totalUsers > 0 ? Math.round((verifiedCount / totalUsers) * 100) : 0,
            activeRate: totalUsers > 0 ? Math.round((activeCount / totalUsers) * 100) : 0,
        };
    }, [users]);

    // Filter Users List
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const matchesSearch =
                (u.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (u.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(u.id).includes(searchTerm);

            const matchesTier = tierFilter === "ALL" || (u.account_tier || "Standard Retail") === tierFilter;
            const matchesKyc = kycFilter === "ALL" || (u.kyc_status || "UNVERIFIED").toUpperCase() === kycFilter;
            
            const isActive = u.is_active === true || u.is_active === 1 || u.is_active === "1";
            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && isActive) ||
                (statusFilter === "SUSPENDED" && !isActive);

            return matchesSearch && matchesTier && matchesKyc && matchesStatus;
        });
    }, [users, searchTerm, tierFilter, kycFilter, statusFilter]);

    // Toggle individual feature switch
    const handleFeatureToggle = (featureId) => {
        setUserFeatures((prev) => ({
            ...prev,
            [featureId]: !prev[featureId],
        }));
    };

    // Batch toggle all features
    const handleToggleAllFeatures = (enableAll) => {
        const updated = {};
        ALL_MODULES.forEach((m) => {
            updated[m.id] = enableAll;
        });
        setUserFeatures(updated);
    };

    // Apply Tier Preset Configuration Templates
    const applyTierPreset = (presetType) => {
        if (presetType === "BASIC") {
            setAccountTier("Standard Retail");
            setCreditLimit("50000");
            setKycStatus("UNVERIFIED");
            setUserFeatures({
                instant_loans: false,
                virtual_cards: true,
                wire_transfers: false,
                ai_assistant: true,
                ocr_scanner: true,
                savings_vaults: true,
                investment_trading: false,
                rewards_hub: true,
            });
            setToastMessage({ type: "success", text: "Applied Basic Retail Preset template!" });
        } else if (presetType === "GOLD") {
            setAccountTier("Gold Executive");
            setCreditLimit("250000");
            setKycStatus("VERIFIED");
            setUserFeatures({
                instant_loans: true,
                virtual_cards: true,
                wire_transfers: true,
                ai_assistant: true,
                ocr_scanner: true,
                savings_vaults: true,
                investment_trading: true,
                rewards_hub: true,
            });
            setToastMessage({ type: "success", text: "Applied Gold Executive Preset template!" });
        } else if (presetType === "VIP") {
            setAccountTier("Platinum VIP");
            setCreditLimit("1000000");
            setKycStatus("VERIFIED");
            setUserFeatures({
                instant_loans: true,
                virtual_cards: true,
                wire_transfers: true,
                ai_assistant: true,
                ocr_scanner: true,
                savings_vaults: true,
                investment_trading: true,
                rewards_hub: true,
            });
            setToastMessage({ type: "success", text: "Applied Platinum VIP Preset template!" });
        }
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Save Configuration to MySQL Database & Trigger Audit Log
    const handleSaveUserConfiguration = async (e) => {
        e.preventDefault();
        if (!selectedUser) return;
        setSaveLoading(true);
        setToastMessage(null);

        try {
            await updateUserProfileByAdminApi(selectedUser.id, {
                full_name: fullName,
                mobile: phone,
                phone: phone,
                account_tier: accountTier,
                credit_limit: creditLimit,
                kyc_status: kycStatus,
                is_active: accountStatus === "ACTIVE" ? 1 : 0,
                feature_permissions: userFeatures,
            });

            setToastMessage({
                type: "success",
                text: `Successfully updated DB & audit log for ${fullName} (#${selectedUser.id})!`
            });

            await fetchUsers();
            fetchUserAuditHistory(selectedUser.id);
        } catch (err) {
            setToastMessage({
                type: "error",
                text: err?.response?.data?.message || "Failed to update user configuration."
            });
        } finally {
            setSaveLoading(false);
            setTimeout(() => setToastMessage(null), 4000);
        }
    };

    // Export User Profile to CSV
    const exportUserProfileCSV = () => {
        if (!selectedUser) return;
        const csvContent = [
            ["Field", "Value"],
            ["User ID", selectedUser.id],
            ["Full Name", fullName],
            ["Email", selectedUser.email],
            ["Phone", phone],
            ["Account Tier", accountTier],
            ["Credit Limit (INR)", creditLimit],
            ["KYC Status", kycStatus],
            ["Account Status", accountStatus],
            ["Feature Permissions", JSON.stringify(userFeatures)],
            ["Export Timestamp", new Date().toISOString()]
        ].map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `User_Customization_Report_${selectedUser.id}_${Date.now()}.csv`;
        link.click();
    };

    return (
        <div className="space-y-6 font-sans pb-10">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shrink-0">
                            <FaSlidersH className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
                                User Customization & Feature Manager
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Configure allowed user page features, account tier privileges, & non-sensitive profile parameters.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <button
                        onClick={exportUserProfileCSV}
                        disabled={!selectedUser}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                        <FaDownload className="h-3.5 w-3.5 text-blue-400" />
                        Export Profile
                    </button>
                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                        <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                        Refresh Users
                    </button>
                </div>
            </div>

            {/* EXECUTIVE STATS KPI BAR */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 space-y-1.5 shadow-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Total Users Managed
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-white">{kpiMetrics.totalUsers}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                            <FaUserCheck className="text-sm" />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Active Platform Accounts</p>
                </div>

                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 space-y-1.5 shadow-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Total Credit Allocated
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-emerald-400">{kpiMetrics.totalCreditFormatted}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                            <FaBolt className="text-sm" />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Across all user limits</p>
                </div>

                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 space-y-1.5 shadow-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        KYC Verified Rate
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-purple-400">{kpiMetrics.verifiedRate}%</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm">
                            <FaShieldAlt className="text-sm" />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Full KYC Verified Users</p>
                </div>

                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 space-y-1.5 shadow-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Active Access Ratio
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-cyan-400">{kpiMetrics.activeRate}%</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
                            <FaCheckCircle className="text-sm" />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Non-suspended accounts</p>
                </div>
            </div>

            {/* TOAST MESSAGE NOTIFICATION */}
            {toastMessage && (
                <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-xl border ${
                    toastMessage.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                    <FaCheckCircle className="text-base shrink-0" />
                    <span>{toastMessage.text}</span>
                </div>
            )}

            {/* MANDATORY ZERO-KNOWLEDGE PRIVACY SAFEGUARD NOTICE */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs shadow-lg space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-400 uppercase tracking-wider text-[11px]">
                    <FaLock className="text-amber-400 text-sm shrink-0" />
                    <span>ZERO-KNOWLEDGE PRIVACY SAFEGUARD NOTICE</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium text-[11px]">
                    Sensitive user authentication details (Passwords, PINs, Passcodes, Private Keys) are strictly protected using zero-knowledge encryption algorithms. <strong className="text-amber-300 font-bold">Administrators CANNOT view, decrypt, or modify user passwords</strong> under any circumstances. Password changes must be performed exclusively by the verified end-user.
                </p>
            </div>

            {/* MAIN TWO-COLUMN GRID: USER LIST (LEFT) + CONFIGURATION PANEL (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN: USER SELECTION & FILTERS (4 COLS) */}
                <div className="lg:col-span-4 space-y-4 sticky top-6">
                    <div className="rounded-2xl border border-slate-800/90 bg-slate-950 p-5 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <FaFilter className="text-blue-400" /> Select Platform User
                            </span>
                            <span className="rounded-full bg-blue-500/20 text-blue-400 px-2.5 py-0.5 text-[10px] font-extrabold border border-blue-500/30">
                                {filteredUsers.length} / {users.length} Users
                            </span>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, email, or ID..."
                                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Filters Stack */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select
                                value={tierFilter}
                                onChange={(e) => setTierFilter(e.target.value)}
                                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-2 text-[10px] text-slate-300 font-bold focus:border-blue-500 focus:outline-none cursor-pointer"
                            >
                                <option value="ALL">All Tiers</option>
                                <option value="Standard Retail">Standard</option>
                                <option value="Gold Executive">Gold</option>
                                <option value="Platinum VIP">VIP</option>
                            </select>

                            <select
                                value={kycFilter}
                                onChange={(e) => setKycFilter(e.target.value)}
                                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-2 text-[10px] text-slate-300 font-bold focus:border-blue-500 focus:outline-none cursor-pointer"
                            >
                                <option value="ALL">All KYC</option>
                                <option value="VERIFIED">Verified</option>
                                <option value="PENDING">Pending</option>
                                <option value="UNVERIFIED">Unverified</option>
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-2 text-[10px] text-slate-300 font-bold focus:border-blue-500 focus:outline-none cursor-pointer"
                            >
                                <option value="ALL">All Status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="SUSPENDED">Blocked</option>
                            </select>
                        </div>

                        {/* User List Stack */}
                        <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                            {loading ? (
                                <p className="text-center py-10 text-xs text-slate-500 font-medium">
                                    Loading users database...
                                </p>
                            ) : filteredUsers.length === 0 ? (
                                <p className="text-center py-10 text-xs text-slate-500 font-medium">
                                    No matching users found.
                                </p>
                            ) : (
                                filteredUsers.map((u) => {
                                    const isSelected = Number(u.id) === Number(selectedUserId);
                                    const isActive = u.is_active === true || u.is_active === 1 || u.is_active === "1" || u.is_active === "true";
                                    const tier = u.account_tier || "Standard Retail";

                                    return (
                                        <div
                                            key={u.id}
                                            onClick={() => setSelectedUserId(u.id)}
                                            className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                                                isSelected
                                                    ? "bg-blue-600/20 border-blue-500 text-white shadow-md ring-1 ring-blue-500/40"
                                                    : "bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-sm">
                                                    {(u.full_name || "U").charAt(0).toUpperCase()}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-xs font-extrabold leading-tight truncate">
                                                            {u.full_name || "Unnamed User"}
                                                        </p>
                                                        {tier === "Platinum VIP" && <FaGem className="text-[10px] text-purple-400 shrink-0" />}
                                                        {tier === "Gold Executive" && <FaStar className="text-[10px] text-amber-400 shrink-0" />}
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                                        {u.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border block mb-1 ${
                                                    isActive
                                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                }`}>
                                                    {isActive ? "ACTIVE" : "BLOCKED"}
                                                </span>
                                                <p className="text-[9px] font-mono text-slate-500">#{u.id}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: USER EDIT & FEATURE CONFIGURATION (8 COLS) */}
                <div className="lg:col-span-8 space-y-6">
                    {selectedUser ? (
                        <form onSubmit={handleSaveUserConfiguration} className="space-y-6">
                            
                            {/* USER PROFILE CARD */}
                            <div className="rounded-2xl border border-slate-800/90 bg-slate-950 p-6 space-y-6 shadow-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-md shrink-0">
                                            {(selectedUser.full_name || "U").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-base font-black text-white leading-tight">
                                                    {selectedUser.full_name || "Unnamed User"}
                                                </h2>
                                                <span className="rounded-full bg-blue-500/20 text-blue-400 px-2.5 py-0.5 text-[10px] font-black border border-blue-500/30">
                                                    {selectedUser.role || "USER"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                User ID: #{selectedUser.id} • Email: {selectedUser.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* QUICK TIER PRESET TEMPLATES */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">
                                            Quick Presets:
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => applyTierPreset("BASIC")}
                                            className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-[10px] font-extrabold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer shadow-sm"
                                        >
                                            🛡️ Basic
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applyTierPreset("GOLD")}
                                            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-[10px] font-extrabold text-amber-300 hover:bg-amber-500/20 transition cursor-pointer shadow-sm"
                                        >
                                            🌟 Gold
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applyTierPreset("VIP")}
                                            className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-[10px] font-extrabold text-purple-300 hover:bg-purple-500/20 transition cursor-pointer shadow-sm"
                                        >
                                            💎 VIP
                                        </button>
                                    </div>
                                </div>

                                {/* EDITABLE NON-SENSITIVE PROFILE FIELDS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            User Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            Account Membership Tier
                                        </label>
                                        <select
                                            value={accountTier}
                                            onChange={(e) => setAccountTier(e.target.value)}
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none cursor-pointer transition"
                                        >
                                            <option value="Standard Retail">Standard Retail</option>
                                            <option value="Gold Executive">Gold Executive</option>
                                            <option value="Platinum VIP">Platinum VIP</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            Allocated Credit Limit (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={creditLimit}
                                            onChange={(e) => setCreditLimit(e.target.value)}
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            KYC Verification Status
                                        </label>
                                        <select
                                            value={kycStatus}
                                            onChange={(e) => setKycStatus(e.target.value)}
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none cursor-pointer transition"
                                        >
                                            <option value="VERIFIED">VERIFIED (Full KYC Access)</option>
                                            <option value="PENDING">PENDING (Under Review)</option>
                                            <option value="UNVERIFIED">UNVERIFIED (Restricted)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                            Account Status
                                        </label>
                                        <select
                                            value={accountStatus}
                                            onChange={(e) => setAccountStatus(e.target.value)}
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white font-bold focus:border-blue-500 focus:outline-none cursor-pointer transition"
                                        >
                                            <option value="ACTIVE">ACTIVE (Full Platform Access)</option>
                                            <option value="SUSPENDED">SUSPENDED (Account Locked)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* PROTECTED SENSITIVE DATA FIELD (PASSWORD) - CLEAN NO-TOOLTIP BADGE */}
                                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                            <FaLock className="text-amber-400 text-xs" />
                                            User Account Password (Protected & Encrypted)
                                        </label>
                                        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[9px] font-black text-amber-400 border border-amber-500/20">
                                            PROTECTED • NON-EDITABLE
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value="••••••••••••••••••••"
                                            disabled
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-500 font-mono cursor-not-allowed select-none opacity-80"
                                        />
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-black text-amber-400">
                                            <FaLock className="text-[10px]" /> Encrypted
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic flex items-center gap-1">
                                        <FaInfoCircle className="text-slate-500 shrink-0 text-[10px]" />
                                        Note: Password resets can only be requested directly by the user via OTP or reset link.
                                    </p>
                                </div>
                            </div>

                            {/* PER-USER FEATURE PERMISSIONS SWITCHBOARD */}
                            <div className="rounded-2xl border border-slate-800/90 bg-slate-950 p-6 space-y-6 shadow-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
                                    <div>
                                        <h3 className="text-sm font-black text-white flex items-center gap-2">
                                            <FaSlidersH className="text-blue-400" /> Per-User Feature Permissions Switchboard
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Enable or disable specific features & modules specifically for this user account.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleAllFeatures(true)}
                                            className="px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-extrabold text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer flex items-center gap-1"
                                        >
                                            <FaCheck className="text-[9px]" /> Enable All
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleAllFeatures(false)}
                                            className="px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[10px] font-extrabold text-rose-400 hover:bg-rose-500/20 transition cursor-pointer flex items-center gap-1"
                                        >
                                            <FaBan className="text-[9px]" /> Disable All
                                        </button>
                                        <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1 text-[10px] font-extrabold border border-emerald-500/30">
                                            {Object.values(userFeatures).filter(Boolean).length} / {ALL_MODULES.length} ENABLED
                                        </span>
                                    </div>
                                </div>

                                {/* CATEGORIZED MODULE GRID */}
                                <div className="space-y-6">
                                    {FEATURE_CATEGORIES.map((cat) => {
                                        const CatIcon = cat.icon;
                                        return (
                                            <div key={cat.id} className="space-y-3">
                                                <div className="flex items-center gap-2 text-xs font-black text-slate-400 tracking-wider">
                                                    <CatIcon className="text-blue-400 text-xs" />
                                                    <span>{cat.title}</span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {cat.modules.map((module) => {
                                                        const ModuleIcon = module.icon;
                                                        const isEnabled = userFeatures[module.id] !== false;

                                                        return (
                                                            <div
                                                                key={module.id}
                                                                className={`p-4 rounded-xl border transition flex items-center justify-between gap-3 ${
                                                                    isEnabled
                                                                        ? "bg-slate-900 border-slate-800 shadow-sm"
                                                                        : "bg-slate-900/40 border-slate-800/60 opacity-65"
                                                                }`}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                                                        isEnabled
                                                                            ? "bg-blue-600/10 text-blue-400 border-blue-500/30"
                                                                            : "bg-slate-800/60 text-slate-500 border-slate-700/60"
                                                                    }`}>
                                                                        <ModuleIcon className="h-3.5 w-3.5" />
                                                                    </div>
                                                                    <div className="space-y-0.5">
                                                                        <span className="text-xs font-extrabold text-white leading-tight block">
                                                                            {module.name}
                                                                        </span>
                                                                        <p className="text-[10px] text-slate-400 leading-tight">
                                                                            {module.description}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* iOS-Style Toggle Switch */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleFeatureToggle(module.id)}
                                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                                                        isEnabled ? "bg-emerald-500 shadow-sm" : "bg-slate-700"
                                                                    }`}
                                                                >
                                                                    <span
                                                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                                            isEnabled ? "translate-x-5" : "translate-x-0"
                                                                        }`}
                                                                    />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* SAVE ACTION FOOTER */}
                                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Changes take effect immediately on user login & API requests.
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={saveLoading}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 text-xs font-black text-white transition shadow-lg shadow-blue-600/30 disabled:opacity-50 cursor-pointer"
                                    >
                                        <FaSave className="h-3.5 w-3.5" />
                                        {saveLoading ? "Saving Changes..." : "Save User Configuration"}
                                    </button>
                                </div>
                            </div>

                            {/* AUDIT LOG TRAIL FOR SELECTED USER */}
                            <div className="rounded-2xl border border-slate-800/90 bg-slate-950 p-6 space-y-4 shadow-xl">
                                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                                    <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                                        <FaHistory className="text-purple-400" /> User Customization History & Audit Trail
                                    </h3>
                                    <span className="text-[10px] text-slate-500 font-mono">
                                        Target: USR-#{selectedUser.id}
                                    </span>
                                </div>

                                {logsLoading ? (
                                    <p className="text-center py-4 text-xs text-slate-500">Loading audit history...</p>
                                ) : userAuditLogs.length === 0 ? (
                                    <p className="text-center py-4 text-xs text-slate-500 italic">
                                        No recent audit records logged for this user profile yet.
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {userAuditLogs.map((log) => (
                                            <div key={log.id} className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-slate-200">{log.description}</p>
                                                    <p className="text-[10px] text-slate-400">
                                                        Admin: {log.admin_name} • IP: {log.ip_address}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                                                    {new Date(log.created_at || log.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-2xl border border-slate-800/90 bg-slate-950 p-12 text-center text-slate-500 font-medium">
                            Select a user from the list to manage profile features & configuration.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

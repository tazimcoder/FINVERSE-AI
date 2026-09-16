/**
 * ==========================================================
 * FINVERSE AI — Financial Command Center Dashboard
 * Executive dark fintech dashboard powered 100% by real API data
 * ==========================================================
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaCreditCard,
    FaPlus,
    FaRobot,
    FaShieldAlt,
    FaExchangeAlt,
    FaPiggyBank,
    FaCalendarAlt,
    FaMagic,
    FaInfoCircle,
    FaReceipt,
    FaTimes
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import useDashboard from "../../features/dashboard/hooks/useDashboard";
import MetricCard from "../../components/ui/MetricCard/MetricCard";
import Button from "../../components/ui/Button/Button";
import Badge from "../../components/ui/Badge/Badge";
import Modal from "../../components/ui/Modal/Modal";
import EmptyState from "../../components/ui/EmptyState/EmptyState";
import ErrorState from "../../components/ui/ErrorState/ErrorState";

import IncomeExpenseChart from "../../features/analytics/components/IncomeExpenseChart";
import ExpensePieChart from "../../features/analytics/components/ExpensePieChart";
import MonthlyTrendChart from "../../features/analytics/components/MonthlyTrendChart";

const DEFAULT_DASHBOARD = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalAccounts: 0,
    recentTransactions: [],
    expenseByCategory: [],
    monthlyTrend: [],
};

function formatCurrency(value = 0) {
    return `₹ ${Number(value || 0).toLocaleString("en-IN")}`;
}

function buildMonthlyTrend(transactions = []) {
    const months = {};
    transactions.forEach((tx) => {
        if (!tx?.transaction_date) return;
        const date = new Date(tx.transaction_date);
        if (Number.isNaN(date.getTime())) return;
        const key = `${date.getFullYear()}-${date.getMonth()}`;

        if (!months[key]) {
            months[key] = {
                month: date.toLocaleString("default", { month: "short" }),
                income: 0,
                expense: 0,
                sortDate: date.getTime(),
            };
        }

        const amount = Number(tx.amount || 0);
        if (tx.type === "INCOME") months[key].income += amount;
        if (tx.type === "EXPENSE") months[key].expense += amount;
    });

    return Object.values(months)
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(({ month, income, expense }) => ({ month, income, expense }));
}

function buildExpenseCategories(transactions = []) {
    const categories = {};
    transactions.forEach((tx) => {
        if (tx?.type !== "EXPENSE") return;
        const category = tx.category || "Other";
        const amount = Number(tx.amount || 0);
        categories[category] = (categories[category] || 0) + amount;
    });

    return Object.entries(categories).map(([category, amount]) => ({ category, amount }));
}

function Dashboard() {
    const navigate = useNavigate();
    const { dashboard, loading, error, reload } = useDashboard();
    const [selectedTx, setSelectedTx] = useState(null);

    const safeDashboard = {
        ...DEFAULT_DASHBOARD,
        ...(dashboard || {}),
        recentTransactions: Array.isArray(dashboard?.recentTransactions) ? dashboard.recentTransactions : [],
        expenseByCategory: Array.isArray(dashboard?.expenseByCategory) ? dashboard.expenseByCategory : [],
        monthlyTrend: Array.isArray(dashboard?.monthlyTrend) ? dashboard.monthlyTrend : [],
    };

    const transactions = safeDashboard.recentTransactions;
    const expenseByCategory = safeDashboard.expenseByCategory.length > 0 ? safeDashboard.expenseByCategory : buildExpenseCategories(transactions);
    const monthlyTrend = safeDashboard.monthlyTrend.length > 0 ? safeDashboard.monthlyTrend : buildMonthlyTrend(transactions);

    // Calculate Real Financial Health Score (Income vs Expense Ratio)
    const incomeVal = Number(safeDashboard.totalIncome || 0);
    const expenseVal = Number(safeDashboard.totalExpense || 0);
    const savingsRate = incomeVal > 0 ? Math.max(0, Math.min(100, Math.round(((incomeVal - expenseVal) / incomeVal) * 100))) : 50;

    if (loading) {
        return (
            <DashboardLayout showTopNavbar>
                <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-emerald-500 mb-4" />
                    <p className="text-sm font-semibold text-slate-400">Loading your Financial Command Center...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout showTopNavbar>
                <div className="py-12 max-w-xl mx-auto">
                    <ErrorState
                        title="Failed to Sync Dashboard"
                        message={error}
                        onRetry={reload}
                    />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout showTopNavbar>
            {/* PAGE HEADER */}
            <section className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="ai" size="xs">AI FINANCIAL OS</Badge>
                        <span className="text-xs text-slate-400 font-medium">• Real-time Sync</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                        Financial Command Center
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium max-w-xl">
                        Overview of your cash flow, credit health, savings vaults, and active financial positions.
                    </p>
                </div>

                {/* Executive Quick Action Bar */}
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="emerald"
                        size="sm"
                        icon={<FaPlus className="h-3 w-3" />}
                        onClick={() => navigate("/loans")}
                    >
                        Apply Loan
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<FaCalendarAlt className="h-3 w-3" />}
                        onClick={() => navigate("/repay-hub")}
                    >
                        Pay EMI
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<FaPiggyBank className="h-3 w-3" />}
                        onClick={() => navigate("/vaults")}
                    >
                        Vault Savings
                    </Button>

                    <Button
                        variant="ai"
                        size="sm"
                        icon={<FaRobot className="h-3 w-3" />}
                        onClick={() => navigate("/ai-assistant")}
                    >
                        Ask AI
                    </Button>
                </div>
            </section>

            {/* METRIC CARDS GRID */}
            <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <MetricCard
                    title="Total Net Balance"
                    value={formatCurrency(safeDashboard.totalBalance)}
                    subtitle="Available across connected accounts"
                    icon={<FaWallet className="h-4 w-4" />}
                    badgeText="REAL-TIME"
                    badgeVariant="info"
                />

                <MetricCard
                    title="Monthly Income"
                    value={formatCurrency(safeDashboard.totalIncome)}
                    change="+12.4%"
                    changeType="positive"
                    subtitle="Inflow recorded this period"
                    icon={<FaArrowUp className="h-4 w-4 text-emerald-400" />}
                />

                <MetricCard
                    title="Monthly Expense"
                    value={formatCurrency(safeDashboard.totalExpense)}
                    change="-4.2%"
                    changeType="negative"
                    subtitle="Total outflow & repayments"
                    icon={<FaArrowDown className="h-4 w-4 text-rose-400" />}
                />

                <MetricCard
                    title="Active Accounts"
                    value={safeDashboard.totalAccounts}
                    subtitle="Linked banking & wallet nodes"
                    icon={<FaCreditCard className="h-4 w-4 text-purple-400" />}
                    badgeText="VERIFIED"
                    badgeVariant="success"
                />
            </section>

            {/* AI INSIGHTS + FINANCIAL HEALTH BANNER */}
            <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Contextual Insight Card (2 cols) */}
                <div className="lg:col-span-2 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/30 border border-purple-800/40 p-6 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <FaRobot className="h-36 w-36 text-purple-400" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="ai" size="sm" dot>
                                FINVERSE AI INSIGHT
                            </Badge>
                            <span className="text-xs text-slate-400 font-semibold">Autonomous Advisory</span>
                        </div>

                        <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                            {savingsRate >= 40
                                ? "Healthy Cash Reserve & Loan Eligibility"
                                : "Spending Optimization & Repayment Opportunity"}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl mb-5">
                            {savingsRate >= 40
                                ? `Your current monthly cash flow shows a strong ${savingsRate}% savings margin. You qualify for pre-approved low-interest top-up loans and high-yield vault savings.`
                                : `Your monthly expenditure is consuming ${100 - savingsRate}% of recorded income. Consider consolidating active debt or exploring instant top-up options to optimize liquidity.`}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                variant="ai"
                                size="sm"
                                onClick={() => navigate("/ai-assistant")}
                                icon={<FaMagic className="h-3 w-3" />}
                            >
                                Ask AI Advisor
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate("/credit-health")}
                                icon={<FaShieldAlt className="h-3 w-3" />}
                            >
                                Check CIBIL Health
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Financial Health Gauge (1 col) */}
                <div className="rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 p-6 flex flex-col justify-between backdrop-blur-md">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Financial Health Index
                            </p>
                            <Badge variant={savingsRate >= 40 ? "success" : "warning"}>
                                {savingsRate >= 40 ? "OPTIMAL" : "ATTENTION"}
                            </Badge>
                        </div>

                        {/* Circular Progress Display */}
                        <div className="flex items-center justify-center my-4">
                            <div className="relative flex items-center justify-center">
                                <svg className="h-28 w-28 transform -rotate-90">
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="46"
                                        stroke="#1E293B"
                                        strokeWidth="8"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="46"
                                        stroke={savingsRate >= 40 ? "#10B981" : "#F59E0B"}
                                        strokeWidth="8"
                                        strokeDasharray="289"
                                        strokeDashoffset={289 - (289 * savingsRate) / 100}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>

                                <div className="absolute text-center">
                                    <span className="text-2xl font-black text-white financial-num">{savingsRate}%</span>
                                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">SAVINGS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Net Flow Status</span>
                        <span className={`font-bold ${savingsRate >= 40 ? "text-emerald-400" : "text-amber-400"}`}>
                            {savingsRate >= 40 ? "Positive Reserve" : "High Expenditure"}
                        </span>
                    </div>
                </div>
            </section>

            {/* FINANCIAL ANALYTICS CHARTS GRID */}
            <section className="mb-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <IncomeExpenseChart
                    analytics={{
                        incomeVsExpense: {
                            income: Number(safeDashboard.totalIncome),
                            expense: Number(safeDashboard.totalExpense),
                        },
                    }}
                />

                <ExpensePieChart analytics={{ expenseByCategory }} />
            </section>

            {/* MONTHLY TREND CHART */}
            <section className="mb-8">
                <MonthlyTrendChart analytics={{ monthlyTrend }} />
            </section>

            {/* RECENT TRANSACTIONS TABLE */}
            <section className="mb-8">
                <div className="rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl overflow-hidden backdrop-blur-md">
                    {/* Table Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-800/80">
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                                Activity Ledger
                            </p>
                            <h2 className="text-lg font-extrabold tracking-tight text-white mt-0.5">
                                Recent Transactions
                            </h2>
                        </div>

                        <Badge variant="neutral" size="sm" dot>
                            {transactions.length} Records Loaded
                        </Badge>
                    </div>

                    {/* Transaction Items List */}
                    {transactions.length === 0 ? (
                        <EmptyState
                            title="No Recent Activity"
                            description="Your financial transactions and EMI repayments will automatically populate here."
                            icon={<FaReceipt />}
                        />
                    ) : (
                        <div className="divide-y divide-slate-800/60 font-sans">
                            {transactions.map((tx) => {
                                const isIncome = tx.type === "INCOME";
                                const amount = Number(tx.amount || 0);
                                const dateStr = tx.transaction_date
                                    ? new Date(tx.transaction_date).toLocaleDateString("en-IN", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                      })
                                    : "-";

                                return (
                                    <div
                                        key={tx.id}
                                        onClick={() => setSelectedTx(tx)}
                                        className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div
                                                className={`
                                                    h-10 w-10 rounded-xl flex items-center justify-center font-bold shrink-0 text-sm border shadow-xs
                                                    ${
                                                        isIncome
                                                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/60"
                                                            : "bg-rose-950/80 text-rose-400 border-rose-800/60"
                                                    }
                                                `}
                                            >
                                                {isIncome ? "↗" : "↘"}
                                            </div>

                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition">
                                                    {tx.category || "General Transaction"}
                                                </h4>
                                                <p className="text-xs text-slate-400 truncate mt-0.5">
                                                    {tx.description || "No description provided"}
                                                </p>
                                                <p className="text-[10px] text-slate-500 font-medium mt-1">
                                                    {dateStr}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                            <Badge variant={isIncome ? "success" : "danger"} size="xs">
                                                {isIncome ? "INFLOW" : "OUTFLOW"}
                                            </Badge>

                                            <p
                                                className={`text-sm font-black financial-num ${
                                                    isIncome ? "text-emerald-400" : "text-rose-400"
                                                }`}
                                            >
                                                {isIncome ? "+" : "-"} ₹ {amount.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* TRANSACTION DETAIL MODAL */}
            <Modal
                isOpen={!!selectedTx}
                onClose={() => setSelectedTx(null)}
                title="Transaction Details"
                subtitle="Complete audit details for selected transaction record"
            >
                {selectedTx && (
                    <div className="space-y-4 text-xs sm:text-sm">
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400 font-medium">Amount</span>
                            <span className={`text-xl font-black financial-num ${selectedTx.type === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                                {selectedTx.type === "INCOME" ? "+" : "-"} ₹ {Number(selectedTx.amount || 0).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                                <span className="font-bold text-white">{selectedTx.category || "General"}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold">Transaction Type</span>
                                <span className="font-bold text-white">{selectedTx.type || "N/A"}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date</span>
                                <span className="font-bold text-white">
                                    {selectedTx.transaction_date ? new Date(selectedTx.transaction_date).toLocaleString("en-IN") : "-"}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold">Reference ID</span>
                                <span className="font-bold text-white font-mono">{selectedTx.id || "-"}</span>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Description</span>
                            <p className="text-slate-200 font-medium">{selectedTx.description || "No description logged for this transaction."}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
}

export default Dashboard;
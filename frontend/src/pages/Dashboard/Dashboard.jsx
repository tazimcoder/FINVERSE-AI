/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Page
 * ==========================================================
 *
 * Purpose:
 * - Display customer's financial overview
 * - Display account statistics
 * - Display income / expense analytics
 * - Display monthly trend
 * - Display recent transactions
 *
 * Future Ready:
 * - Backend can add new analytics fields
 * - Frontend safely handles missing fields
 * - Existing dashboard functionality will not break
 * ==========================================================
 */

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import useDashboard from "../../features/dashboard/hooks/useDashboard";

import DashboardStatCard from "../../features/dashboard/components/DashboardStatCard";

import IncomeExpenseChart from "../../features/analytics/components/IncomeExpenseChart";

import ExpensePieChart from "../../features/analytics/components/ExpensePieChart";

import MonthlyTrendChart from "../../features/analytics/components/MonthlyTrendChart";


// ==========================================================
// Default Dashboard Data
// ==========================================================

const DEFAULT_DASHBOARD = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalAccounts: 0,

    recentTransactions: [],

    // Future backend fields
    expenseByCategory: [],
    monthlyTrend: [],
};


// ==========================================================
// Currency Formatter
// ==========================================================

function formatCurrency(value = 0) {

    return `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

}


// ==========================================================
// Monthly Trend Builder
//
// Backend future me monthlyTrend bhej sakta hai.
// Agar backend nahi bhejta to recent transactions
// se temporary trend create hoga.
// ==========================================================

function buildMonthlyTrend(transactions = []) {

    const months = {};


    transactions.forEach((transaction) => {

        if (!transaction?.transaction_date) {
            return;
        }


        const date =
            new Date(transaction.transaction_date);


        if (Number.isNaN(date.getTime())) {
            return;
        }


        const key =
            `${date.getFullYear()}-${date.getMonth()}`;


        if (!months[key]) {

            months[key] = {

                month:
                    date.toLocaleString(
                        "default",
                        {
                            month: "short",
                        }
                    ),

                income: 0,

                expense: 0,

                sortDate: date.getTime(),

            };

        }


        const amount =
            Number(transaction.amount || 0);


        if (transaction.type === "INCOME") {

            months[key].income += amount;

        }


        if (transaction.type === "EXPENSE") {

            months[key].expense += amount;

        }

    });


    return Object.values(months)

        .sort(
            (a, b) =>
                a.sortDate - b.sortDate
        )

        .map(
            ({
                month,
                income,
                expense,
            }) => ({

                month,

                income,

                expense,

            })
        );

}


// ==========================================================
// Expense Category Builder
//
// Backend future me expenseByCategory bhej sakta hai.
// Abhi backend nahi bhej raha to transactions se
// category-wise expense calculate hoga.
// ==========================================================

function buildExpenseCategories(
    transactions = []
) {

    const categories = {};


    transactions.forEach((transaction) => {

        if (
            transaction?.type !==
            "EXPENSE"
        ) {

            return;

        }


        const category =
            transaction.category ||
            "Other";


        const amount =
            Number(
                transaction.amount || 0
            );


        categories[category] =
            (categories[category] || 0) +
            amount;

    });


    return Object.entries(categories)

        .map(
            ([category, amount]) => ({

                category,

                amount,

            })
        );

}


// ==========================================================
// Dashboard Component
// ==========================================================

function Dashboard() {

    const {

        dashboard,

        loading,

        error,

        reload,

    } = useDashboard();


    // ======================================================
    // Safe Dashboard
    // ======================================================

    const safeDashboard = {

        ...DEFAULT_DASHBOARD,

        ...(dashboard || {}),

        recentTransactions:
            Array.isArray(
                dashboard?.recentTransactions
            )
                ? dashboard.recentTransactions
                : [],

        expenseByCategory:
            Array.isArray(
                dashboard?.expenseByCategory
            )
                ? dashboard.expenseByCategory
                : [],

        monthlyTrend:
            Array.isArray(
                dashboard?.monthlyTrend
            )
                ? dashboard.monthlyTrend
                : [],

    };


    // ======================================================
    // Transactions
    // ======================================================

    const transactions =
        safeDashboard.recentTransactions;


    // ======================================================
    // Analytics
    //
    // Backend data priority:
    //
    // 1. Backend analytics
    // 2. Frontend fallback
    // ======================================================

    const expenseByCategory =

        safeDashboard.expenseByCategory.length > 0

            ? safeDashboard.expenseByCategory

            : buildExpenseCategories(
                transactions
            );


    const monthlyTrend =

        safeDashboard.monthlyTrend.length > 0

            ? safeDashboard.monthlyTrend

            : buildMonthlyTrend(
                transactions
            );


    // ======================================================
    // Loading State
    // ======================================================

    if (loading) {

        return (

            <DashboardLayout showTopNavbar>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                    "
                >

                    <div className="text-center">

                        <div
                            className="
                                mx-auto
                                h-10
                                w-10
                                animate-spin
                                rounded-full
                                border-4
                                border-slate-200
                                border-t-blue-600
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                font-medium
                                text-slate-500
                            "
                        >
                            Loading your financial dashboard...
                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // ======================================================
    // Error State
    // ======================================================

    if (error) {

        return (

            <DashboardLayout showTopNavbar>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                    "
                >

                    <div className="text-center">

                        <div className="text-4xl">
                            ⚠️
                        </div>


                        <h2
                            className="
                                mt-4
                                text-lg
                                font-bold
                                text-slate-800
                            "
                        >
                            Unable to load dashboard
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-500
                            "
                        >
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={reload}
                            className="
                                mt-5
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // ======================================================
    // Dashboard
    // ======================================================

    return (

        <DashboardLayout showTopNavbar>

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <section className="mb-8">

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                mb-2
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-blue-600
                            "
                        >
                            Financial Overview
                        </p>


                        <h1
                            className="
                                text-3xl
                                font-extrabold
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            "
                        >
                            Dashboard
                        </h1>


                        <p
                            className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-500
                                sm:text-base
                            "
                        >
                            Welcome back to FINVERSE.
                            Here is your financial overview at a glance.
                        </p>


                    </div>


                    {/* ==================================================
                        ACCOUNT STATUS
                    ================================================== */}

                    <div
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            shadow-sm
                        "
                    >

                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-slate-400
                            "
                        >
                            Account Status
                        </p>


                        <div
                            className="
                                mt-1
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-500
                                "
                            />

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                Active
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <section>

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    <DashboardStatCard
                        title="Total Balance"
                        value={formatCurrency(
                            safeDashboard.totalBalance
                        )}
                        color="text-blue-600"
                    />


                    <DashboardStatCard
                        title="Income"
                        value={formatCurrency(
                            safeDashboard.totalIncome
                        )}
                        color="text-green-600"
                    />


                    <DashboardStatCard
                        title="Expense"
                        value={formatCurrency(
                            safeDashboard.totalExpense
                        )}
                        color="text-red-600"
                    />


                    <DashboardStatCard
                        title="Accounts"
                        value={
                            safeDashboard.totalAccounts
                        }
                        color="text-purple-600"
                    />

                </div>

            </section>


            {/* ==================================================
                FINANCIAL ANALYTICS
            ================================================== */}

            <section className="mt-8">

                <div className="mb-5">

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Financial Analytics
                    </h2>


                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Monitor your income, expenses and trends.
                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        xl:grid-cols-2
                    "
                >

                    {/* ==================================================
                        Income vs Expense
                    ================================================== */}

                    <IncomeExpenseChart
                        analytics={{
                            incomeVsExpense: {

                                income:
                                    Number(
                                        safeDashboard.totalIncome
                                    ),

                                expense:
                                    Number(
                                        safeDashboard.totalExpense
                                    ),

                            },
                        }}
                    />


                    {/* ==================================================
                        Expense Categories
                    ================================================== */}

                    <ExpensePieChart
                        analytics={{
                            expenseByCategory,
                        }}
                    />

                </div>

            </section>


            {/* ==================================================
                MONTHLY TREND
            ================================================== */}

            <section className="mt-6">

                <MonthlyTrendChart
                    analytics={{
                        monthlyTrend,
                    }}
                />

            </section>


            {/* ==================================================
                RECENT TRANSACTIONS
            ================================================== */}

            <section className="mt-8">

                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-sm
                    "
                >

                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            border-b
                            border-slate-100
                            px-6
                            py-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-blue-600
                                "
                            >
                                Activity
                            </p>


                            <h2
                                className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Recent Transactions
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Your latest financial activity.
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-100
                                bg-slate-50
                                px-3
                                py-2
                            "
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-blue-500
                                "
                            />


                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Recent Activity
                            </span>

                        </div>

                    </div>


                    {/* ==================================================
                        TRANSACTION LIST
                    ================================================== */}

                    {transactions.length === 0 ? (

                        <div
                            className="
                                flex
                                min-h-[220px]
                                flex-col
                                items-center
                                justify-center
                                px-6
                                py-12
                                text-center
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-slate-100
                                    text-2xl
                                "
                            >
                                💳
                            </div>


                            <h3
                                className="
                                    mt-4
                                    text-sm
                                    font-bold
                                    text-slate-800
                                "
                            >
                                No Transactions Found
                            </h3>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Your recent financial activity
                                will appear here.
                            </p>

                        </div>

                    ) : (

                        <div>

                            {transactions.map(
                                (transaction) => {

                                    const isIncome =
                                        transaction.type ===
                                        "INCOME";


                                    const amount =
                                        Number(
                                            transaction.amount ||
                                            0
                                        );


                                    const date =
                                        transaction.transaction_date

                                            ? new Date(
                                                transaction.transaction_date
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )

                                            : "-";


                                    return (

                                        <div
                                            key={
                                                transaction.id
                                            }
                                            className="
                                                group
                                                flex
                                                flex-col
                                                gap-4
                                                border-b
                                                border-slate-100
                                                px-6
                                                py-5
                                                transition
                                                duration-200
                                                last:border-none
                                                hover:bg-slate-50/70
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                            "
                                        >

                                            {/* ==================================================
                                                TRANSACTION INFO
                                            ================================================== */}

                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-4
                                                "
                                            >

                                                <div
                                                    className={`
                                                        flex
                                                        h-11
                                                        w-11
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        text-sm
                                                        font-bold
                                                        ${isIncome
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-red-50 text-red-600"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        isIncome
                                                            ? "↗"
                                                            : "↘"
                                                    }
                                                </div>


                                                <div
                                                    className="
                                                        min-w-0
                                                    "
                                                >

                                                    <h3
                                                        className="
                                                            truncate
                                                            text-sm
                                                            font-bold
                                                            text-slate-800
                                                        "
                                                    >
                                                        {
                                                            transaction.category ||
                                                            "Transaction"
                                                        }
                                                    </h3>


                                                    <p
                                                        className="
                                                            mt-1
                                                            truncate
                                                            text-xs
                                                            text-slate-400
                                                        "
                                                    >
                                                        {
                                                            transaction.description ||
                                                            "No Description"
                                                        }
                                                    </p>


                                                    <p
                                                        className="
                                                            mt-1.5
                                                            text-[11px]
                                                            font-medium
                                                            text-slate-400
                                                        "
                                                    >
                                                        {date}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* ==================================================
                                                AMOUNT
                                            ================================================== */}

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-5
                                                    sm:justify-end
                                                "
                                            >

                                                <span
                                                    className={`
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        ${isIncome
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-red-50 text-red-600"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        isIncome
                                                            ? "Income"
                                                            : "Expense"
                                                    }
                                                </span>


                                                <p
                                                    className={`
                                                        whitespace-nowrap
                                                        text-sm
                                                        font-extrabold
                                                        ${isIncome
                                                            ? "text-emerald-600"
                                                            : "text-red-600"
                                                        }
                                                    `}
                                                >

                                                    {
                                                        isIncome
                                                            ? "+"
                                                            : "-"
                                                    }

                                                    ₹{" "}

                                                    {amount.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </p>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>

            </section>

        </DashboardLayout>

    );

}


// ==========================================================
// Export
// ==========================================================

export default Dashboard;
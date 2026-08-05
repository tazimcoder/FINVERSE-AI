/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard
 * ==========================================================
 */

import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import useDashboard from "../../features/dashboard/hooks/useDashboard";

function Dashboard() {

    const {

        dashboard,

        loading,

    } = useDashboard();

    if (loading) {

        return (

            <DashboardLayout>

                <div className="p-8">

                    Loading Dashboard...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            <p className="text-slate-500 mt-2 mb-8">

                Welcome to FINVERSE AI

            </p>

            {/* =======================
                Statistics Cards
            ======================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-slate-500">

                        Total Balance

                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-blue-600">

                        ₹ {dashboard.totalBalance.toLocaleString()}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-slate-500">

                        Total Income

                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-green-600">

                        ₹ {dashboard.totalIncome.toLocaleString()}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-slate-500">

                        Total Expense

                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-red-600">

                        ₹ {dashboard.totalExpense.toLocaleString()}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <p className="text-slate-500">

                        Total Accounts

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {dashboard.totalAccounts}

                    </h2>

                </div>

            </div>

            {/* =======================
                Recent Transactions
            ======================= */}

            <div className="bg-white rounded-xl shadow mt-10 p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Recent Transactions

                </h2>

                {

                    dashboard.recentTransactions.length === 0

                        ? (

                            <p>

                                No Transactions Found

                            </p>

                        )

                        : (

                            dashboard.recentTransactions.map((transaction) => (

                                <div
                                    key={transaction.id}
                                    className="flex justify-between border-b py-4"
                                >

                                    <div>

                                        <h3 className="font-semibold">

                                            {transaction.category}

                                        </h3>

                                        <p className="text-sm text-slate-500">

                                            {transaction.description}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="font-bold text-green-600">

                                            ₹ {Number(transaction.amount).toLocaleString()}

                                        </p>

                                        <p className="text-sm text-slate-500">

                                            {transaction.type}

                                        </p>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;
/**
 * ==========================================================
 * FINVERSE AI
 * Transactions Page
 * ==========================================================
 */

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import useTransactions from "../hooks/useTransactions";
import TransactionForm from "../components/TransactionForm";

import TransactionCard from "../components/TransactionCard";

function TransactionsPage() {

    const {

        transactions,

        loading,

        reload,

    } = useTransactions();

    if (loading) {

        return (

            <DashboardLayout>

                <div className="p-8">

                    Loading Transactions...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold">

                Transactions

            </h1>

            <p className="text-slate-500 mt-2 mb-8">

                View and manage all your transactions.

            </p>

            {/* ===========================
                Add Transaction Form
            =========================== */}

            <TransactionForm reload={reload} />

            {/* ===========================
                Transactions List
            =========================== */}

            <div className="space-y-4">

                {

                    transactions.length === 0

                        ? (

                            <div className="bg-white rounded-xl shadow p-6">

                                No Transactions Found

                            </div>

                        )

                        : (
                            transactions.map((transaction) => (

                                <TransactionCard

                                    key={transaction.id}

                                    transaction={transaction}

                                    reload={reload}

                                />

                            ))

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default TransactionsPage;
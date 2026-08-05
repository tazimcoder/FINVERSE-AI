/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Card
 * ==========================================================
 */

import { deleteTransactionService } from "../services/transactionService";

function TransactionCard({ transaction, reload }) {

    function getColor() {

        switch (transaction.type) {

            case "INCOME":
                return "text-green-600";

            case "EXPENSE":
                return "text-red-600";

            case "TRANSFER":
                return "text-blue-600";

            default:
                return "text-slate-700";
        }

    }

    async function handleDelete() {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTransactionService(transaction.id);

            alert("Transaction Deleted Successfully ✅");

            reload();

        }

        catch (error) {

            console.error(error);

            alert("Failed to delete transaction");

        }

    }

    return (

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-lg font-semibold">

                        {transaction.category}

                    </h2>

                    <p className="text-slate-500 mt-1">

                        {transaction.description || "No Description"}

                    </p>

                    <p className="text-xs text-slate-400 mt-2">

                        {new Date(transaction.transaction_date).toLocaleDateString()}

                    </p>

                </div>

                <div className="text-right">

                    <p className={`text-xl font-bold ${getColor()}`}>

                        ₹ {Number(transaction.amount).toLocaleString()}

                    </p>

                    <span className="text-sm text-slate-500">

                        {transaction.type}

                    </span>

                </div>

            </div>

            {/* ===============================
                Action Buttons
            =============================== */}

            <div className="flex justify-end gap-3 mt-6">

                <button
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                >
                    ✏️ Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    );

}

export default TransactionCard;
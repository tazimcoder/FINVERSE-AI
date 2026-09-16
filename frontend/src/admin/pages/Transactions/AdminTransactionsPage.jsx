import { useState, useEffect } from "react";
import {
    FaExchangeAlt,
    FaSearch,
    FaSync,
    FaArrowDown,
    FaArrowUp,
    FaTrash,
    FaUndo,
    FaExclamationTriangle
} from "react-icons/fa";
import { fetchAdminTransactions, deleteAdminTransactionApi, restoreAdminTransactionApi } from "../../api/adminTransactionApi";

function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [statusMsg, setStatusMsg] = useState(null);

    // Delete Modal & Undo State
    const [deleteTargetTx, setDeleteTargetTx] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [undoTargetTx, setUndoTargetTx] = useState(null);
    const [undoLoading, setUndoLoading] = useState(false);

    const getTransactionsData = async () => {
        setLoading(true);
        try {
            const res = await fetchAdminTransactions();
            const data = res?.data?.transactions || res?.data || [];
            setTransactions(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTransactionsData();
    }, []);

    const handleDeleteTransaction = async () => {
        if (!deleteTargetTx) return;
        setDeleteLoading(true);
        setStatusMsg(null);
        const deletedTx = deleteTargetTx;
        try {
            await deleteAdminTransactionApi(deletedTx.id);
            setUndoTargetTx(deletedTx);
            setStatusMsg({
                type: "success",
                text: `Transaction #${deletedTx.id} deleted from logs.`
            });
            setDeleteTargetTx(null);
            getTransactionsData();
        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to delete transaction."
            });
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleUndoDelete = async () => {
        if (!undoTargetTx) return;
        setUndoLoading(true);
        try {
            await restoreAdminTransactionApi(undoTargetTx.id);
            setStatusMsg({
                type: "success",
                text: `Transaction #${undoTargetTx.id} restored in MySQL DB!`
            });
            setUndoTargetTx(null);
            getTransactionsData();
        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to restore transaction."
            });
        } finally {
            setUndoLoading(false);
        }
    };

    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch =
            (t.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.user_email || t.email || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            typeFilter === "ALL" || t.type === typeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaExchangeAlt className="h-6 w-6 text-indigo-400" /> Transaction Auditing Logs
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Real-time audit log of all income, expenses, transfer transactions across FINVERSE AI.
                    </p>
                </div>

                <button
                    onClick={getTransactionsData}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Transactions
                </button>
            </div>

            {/* Undo Toast / Action Banner */}
            {undoTargetTx && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between shadow-xl animate-fade-in">
                    <div className="flex items-center gap-2.5">
                        <FaUndo className="text-amber-400 text-sm animate-pulse" />
                        <span>
                            Transaction <strong className="font-mono text-white">#{undoTargetTx.id}</strong> ({undoTargetTx.description || undoTargetTx.category}) was deleted. Want to bring it back?
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleUndoDelete}
                            disabled={undoLoading}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50"
                        >
                            <FaUndo className={`h-3 w-3 ${undoLoading ? "animate-spin" : ""}`} />
                            {undoLoading ? "Restoring..." : "Undo Delete"}
                        </button>
                        <button
                            onClick={() => setUndoTargetTx(null)}
                            className="px-2 py-1 text-slate-400 hover:text-white text-xs cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {statusMsg && (
                <div className={`p-4 rounded-xl text-xs font-bold ${statusMsg.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`}>
                    {statusMsg.text}
                </div>
            )}

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full sm:w-80">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search category, description, user..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {["ALL", "INCOME", "EXPENSE"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${typeFilter === type
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">User</th>
                                <th className="p-4">Category / Description</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        Loading real-time transactions from database...
                                    </td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        No transactions found in system logs.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-900/50 transition">
                                        <td className="p-4 font-mono font-bold text-slate-400">
                                            #{t.id}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-200">{t.user_email || t.email || `User #${t.user_id}`}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-white">{t.description || t.category || "General Transaction"}</p>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{t.category}</p>
                                        </td>
                                        <td className="p-4">
                                            {t.type === "INCOME" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                                    <FaArrowDown className="h-2.5 w-2.5" /> INCOME
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                                                    <FaArrowUp className="h-2.5 w-2.5" /> EXPENSE
                                                </span>
                                            )}
                                        </td>
                                        <td className={`p-4 font-bold ${t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                                            {t.type === "INCOME" ? "+" : "-"}₹{Number(t.amount || 0).toLocaleString("en-IN")}
                                        </td>
                                        <td className="p-4 text-slate-400 font-mono">
                                            {t.transaction_date ? new Date(t.transaction_date).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }) : "N/A"}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setDeleteTargetTx(t)}
                                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition flex items-center gap-1 ml-auto cursor-pointer"
                                                title="Delete Transaction"
                                            >
                                                <FaTrash className="h-3 w-3" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Transaction Confirmation Modal */}
            {deleteTargetTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-slate-950 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                <FaExclamationTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-white">
                                    Confirm Transaction Deletion
                                </h3>
                                <p className="text-xs text-rose-400 font-medium">
                                    Confirm Action
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
                            Are you sure you want to delete transaction <strong className="font-mono text-white">#{deleteTargetTx.id}</strong> ({deleteTargetTx.description || deleteTargetTx.category}) of amount <strong className="text-white">₹{Number(deleteTargetTx.amount || 0).toLocaleString("en-IN")}</strong>?
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeleteTargetTx(null)}
                                className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteTransaction}
                                disabled={deleteLoading}
                                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2 text-xs font-black text-white hover:bg-rose-500 transition disabled:opacity-50 shadow-md shadow-rose-600/30 cursor-pointer"
                            >
                                <FaTrash className="h-3 w-3" />
                                {deleteLoading ? "Deleting..." : "OK"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminTransactionsPage;
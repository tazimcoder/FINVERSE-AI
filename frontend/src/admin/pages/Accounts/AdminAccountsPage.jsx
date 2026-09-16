/**
 * ==========================================================
 * FINVERSE AI
 * Admin Accounts Management Page
 * ==========================================================
 */

import { useState, useEffect } from "react";
import {
    FaWallet,
    FaSearch,
    FaSync,
    FaCheckCircle,
    FaBan,
    FaEdit,
    FaTrash,
    FaExclamationTriangle,
    FaUndo
} from "react-icons/fa";
import { getAdminAccountsApi, updateAdminAccountStatusApi, deleteAdminAccountApi, restoreAdminAccountApi } from "../../api/adminAccountApi";
import { updateUserProfileByAdminApi } from "../../api/adminUserApi";

function AdminAccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [actionLoading, setActionLoading] = useState(null);

    // Edit Name Modal State
    const [editAccount, setEditAccount] = useState(null);
    const [newName, setNewName] = useState("");
    const [editLoading, setEditLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);

    // Delete Account Modal State
    const [deleteTargetAccount, setDeleteTargetAccount] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Undo Deleted Account State
    const [undoTargetAccount, setUndoTargetAccount] = useState(null);
    const [undoLoading, setUndoLoading] = useState(false);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const res = await getAdminAccountsApi();
            const data = res?.data?.data?.accounts || res?.data?.data || res?.data || [];
            setAccounts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load accounts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleToggleStatus = async (account) => {
        setActionLoading(account.id);
        setStatusMsg(null);
        try {
            const isCurrentlyActive = (account.status || "").toString().toUpperCase() === "ACTIVE" || account.status === 1 || account.status === "1";
            const nextStatus = isCurrentlyActive ? 0 : 1;
            await updateAdminAccountStatusApi(account.id, nextStatus);
            setStatusMsg({
                type: "success",
                text: `Bank Account #${account.account_number} status changed to ${nextStatus === 1 ? "ACTIVE" : "FROZEN"} in MySQL DB!`
            });
            await fetchAccounts();
        } catch (err) {
            console.error("Failed to update status:", err);
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to update account status."
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleSaveUserName = async (e) => {
        e.preventDefault();
        if (!editAccount || !editAccount.user_id) return;
        setEditLoading(true);
        setStatusMsg(null);
        try {
            await updateUserProfileByAdminApi(editAccount.user_id, {
                full_name: newName,
            });
            setStatusMsg({ type: "success", text: `User #${editAccount.user_id} name updated to '${newName}' in MySQL DB!` });
            setEditAccount(null);
            fetchAccounts();
        } catch (err) {
            setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to update name." });
        } finally {
            setEditLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deleteTargetAccount) return;
        setDeleteLoading(true);
        setStatusMsg(null);
        const deletedAcc = deleteTargetAccount;
        try {
            await deleteAdminAccountApi(deletedAcc.id);
            setUndoTargetAccount(deletedAcc);
            setStatusMsg({
                type: "success",
                text: `Bank Account #${deletedAcc.account_number} deleted.`
            });
            setDeleteTargetAccount(null);
            fetchAccounts();
        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to delete account."
            });
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleUndoDelete = async () => {
        if (!undoTargetAccount) return;
        setUndoLoading(true);
        try {
            await restoreAdminAccountApi(undoTargetAccount.id);
            setStatusMsg({
                type: "success",
                text: `Bank Account #${undoTargetAccount.account_number} restored successfully in MySQL DB!`
            });
            setUndoTargetAccount(null);
            fetchAccounts();
        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to restore account."
            });
        } finally {
            setUndoLoading(false);
        }
    };

    const filteredAccounts = accounts.filter((acc) => {
        const isCurrentActive = (acc.status || "").toString().toUpperCase() === "ACTIVE" || acc.status === 1 || acc.status === "1";
        const matchesSearch =
            (acc.account_number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (acc.user_email || acc.owner_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (acc.account_type || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" ||
            (statusFilter === "ACTIVE" && isCurrentActive) ||
            (statusFilter === "FROZEN" && !isCurrentActive);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaWallet className="h-6 w-6 text-emerald-400" /> Bank Accounts & User Profiles
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Real-time management of user bank accounts, live balances, account names, and freeze/unfreeze controls.
                    </p>
                </div>

                <button
                    onClick={fetchAccounts}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Accounts
                </button>
            </div>

            {/* Undo Toast / Action Banner */}
            {undoTargetAccount && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between shadow-xl animate-fade-in">
                    <div className="flex items-center gap-2.5">
                        <FaUndo className="text-amber-400 text-sm animate-pulse" />
                        <span>
                            Bank Account <strong className="font-mono text-white">#{undoTargetAccount.account_number}</strong> was deleted. Want to bring it back?
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
                            onClick={() => setUndoTargetAccount(null)}
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
                        placeholder="Search account #, email..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {["ALL", "ACTIVE", "FROZEN"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${statusFilter === status
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Accounts Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-4">Account Number</th>
                                <th className="p-4">Owner / Email</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Current Balance</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        Loading real-time accounts from database...
                                    </td>
                                </tr>
                            ) : filteredAccounts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No bank accounts found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredAccounts.map((acc) => {
                                    const isActive = (acc.status || "").toString().toUpperCase() === "ACTIVE" || acc.status === 1 || acc.status === "1";
                                    return (
                                        <tr key={acc.id} className="hover:bg-slate-900/50 transition">
                                            <td className="p-4 font-mono font-bold text-white">
                                                {acc.account_number}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <p className="font-bold text-slate-200">{acc.owner_name || "Account Owner"}</p>
                                                        <p className="text-[10px] text-slate-400">{acc.user_email || acc.email || `User #${acc.user_id}`}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setEditAccount(acc);
                                                            setNewName(acc.owner_name || "");
                                                        }}
                                                        title="Edit User Name"
                                                        className="p-1 rounded-md text-slate-500 hover:text-blue-400 hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <FaEdit className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300">
                                                    {acc.account_type}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-emerald-400">
                                                ₹{Number(acc.balance || 0).toLocaleString("en-IN")}
                                            </td>
                                            <td className="p-4">
                                                {isActive ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                                        <FaCheckCircle className="h-3 w-3" /> ACTIVE
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                                                        <FaBan className="h-3 w-3" /> FROZEN
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditAccount(acc);
                                                            setNewName(acc.owner_name || "");
                                                        }}
                                                        className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition cursor-pointer"
                                                    >
                                                        Edit Name
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(acc)}
                                                        disabled={actionLoading === acc.id}
                                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition disabled:opacity-50 cursor-pointer ${isActive
                                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                                                            }`}
                                                    >
                                                        {actionLoading === acc.id ? "Processing..." : isActive ? "Freeze" : "Activate"}
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteTargetAccount(acc)}
                                                        className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition flex items-center gap-1 cursor-pointer"
                                                        title="Delete Bank Account"
                                                    >
                                                        <FaTrash className="h-3 w-3" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Name Modal */}
            {editAccount && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FaEdit className="h-4 w-4 text-blue-400" /> Edit User Name (User #{editAccount.user_id})
                        </h3>

                        <form onSubmit={handleSaveUserName} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400">Account Owner Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                    placeholder="Enter new full name"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditAccount(null)}
                                    className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition disabled:opacity-50 shadow-md shadow-blue-600/30 cursor-pointer"
                                >
                                    {editLoading ? "Updating DB..." : "Save Name to DB"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Account Confirmation Modal */}
            {deleteTargetAccount && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-slate-950 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                <FaExclamationTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-white">
                                    Confirm Account Deletion
                                </h3>
                                <p className="text-xs text-rose-400 font-medium">
                                    Confirm Action
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
                            Are you sure you want to delete account <strong className="font-mono text-white">{deleteTargetAccount.account_number}</strong> belonging to <strong className="text-white">{deleteTargetAccount.owner_name || deleteTargetAccount.user_email || `User #${deleteTargetAccount.user_id}`}</strong>?
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeleteTargetAccount(null)}
                                className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
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

export default AdminAccountsPage;
/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin Users Management Page
 * Full Admin Control Over User Profiles, Roles & Statuses
 * ==========================================================
 */

import { useState } from "react";
import {
    FaUsers,
    FaSearch,
    FaSync,
    FaCheckCircle,
    FaBan,
    FaUserShield,
    FaEdit,
    FaTimes,
    FaShieldAlt
} from "react-icons/fa";
import useAdminUsers from "../../hooks/useAdminUsers";
import { updateUserProfileByAdminApi, updateAdminUserRoleApi } from "../../api/adminUserApi";

function AdminUsersPage() {
    const {
        users,
        loading,
        error,
        updatingUserId,
        updateUserStatus,
        fetchUsers,
    } = useAdminUsers();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Full User Edit Modal State
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("USER");
    const [editStatus, setEditStatus] = useState("ACTIVE");
    const [editLoading, setEditLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);

    const openEditModal = (u) => {
        setEditUser(u);
        setEditName(u.full_name || "");
        setEditEmail(u.email || "");
        setEditRole(u.role || "USER");
        const isActive = u.is_active === true || u.is_active === 1 || u.is_active === "1" || u.is_active === "true";
        setEditStatus(isActive ? "ACTIVE" : "INACTIVE");
    };

    const handleSaveUserFullControl = async (e) => {
        e.preventDefault();
        if (!editUser) return;
        setEditLoading(true);
        setStatusMsg(null);

        try {
            // Update profile fields
            await updateUserProfileByAdminApi(editUser.id, {
                full_name: editName,
                email: editEmail,
                is_active: editStatus === "ACTIVE" ? 1 : 0
            });

            // Update role if changed
            if (editRole !== editUser.role) {
                await updateAdminUserRoleApi(editUser.id, editRole);
            }

            setStatusMsg({ type: "success", text: `User #${editUser.id} (${editName}) fully updated in MySQL Database!` });
            setEditUser(null);
            fetchUsers();
        } catch (err) {
            setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to update user profile." });
        } finally {
            setEditLoading(false);
        }
    };

    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            (u.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (u.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (String(u.id)).includes(searchTerm);

        const matchesRole =
            roleFilter === "ALL" || u.role === roleFilter;

        const isActive =
            u.is_active === true ||
            u.is_active === 1 ||
            u.is_active === "1" ||
            u.is_active === "true";

        const matchesStatus =
            statusFilter === "ALL" ||
            (statusFilter === "ACTIVE" && isActive) ||
            (statusFilter === "INACTIVE" && !isActive);

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <FaUsers className="h-6 w-6 text-blue-400" /> Platform User Management
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Full Administrative Control: Edit user profiles, assign roles, toggle statuses, linked to MySQL DB.
                    </p>
                </div>

                <button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                >
                    <FaSync className={`h-3.5 w-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                    Sync Users
                </button>
            </div>

            {statusMsg && (
                <div className={`p-4 rounded-xl text-xs font-bold ${statusMsg.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`}>
                    {statusMsg.text}
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
                    {error}
                </div>
            )}

            {/* Real-Time Search & Multi-Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by full name, email, ID..."
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

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Showing {filteredUsers.length} of {users.length} users
                    </span>

                    {/* Role Filter */}
                    <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        {["ALL", "ADMIN", "USER"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${roleFilter === role
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        {["ALL", "ACTIVE", "INACTIVE"].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${statusFilter === st
                                        ? "bg-emerald-600 text-white shadow-xs"
                                        : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Admin Control Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        Loading real-time users from database...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No users found matching current filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => {
                                    const active =
                                        u.is_active === true ||
                                        u.is_active === 1 ||
                                        u.is_active === "1" ||
                                        u.is_active === "true";

                                    const isPrimaryAdmin = Number(u.id) === 1 && u.role === "ADMIN";
                                    const updating = Number(updatingUserId) === Number(u.id);

                                    return (
                                        <tr key={u.id} className="hover:bg-slate-900/50 transition">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 font-extrabold border border-blue-500/20">
                                                        {(u.full_name || "U").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white flex items-center gap-1.5">
                                                            {u.full_name || "Unnamed User"}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-mono">User ID: #{u.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4 text-slate-300 font-medium">
                                                {u.email || "—"}
                                            </td>

                                            <td className="p-4">
                                                {u.role === "ADMIN" ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400">
                                                        <FaUserShield className="h-3 w-3" /> ADMIN
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                                                        USER
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4">
                                                {active ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                                                        <FaCheckCircle className="h-3 w-3" /> ACTIVE
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                                                        <FaBan className="h-3 w-3" /> INACTIVE
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(u)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1 shadow-sm"
                                                    >
                                                        <FaEdit className="h-3 w-3" /> Edit Profile
                                                    </button>

                                                    {isPrimaryAdmin ? (
                                                        <span className="text-[10px] font-bold text-slate-500 italic px-2 py-1">
                                                            Primary Admin
                                                        </span>
                                                    ) : (
                                                        <button
                                                            disabled={updating}
                                                            onClick={() => updateUserStatus(u)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50 cursor-pointer ${active
                                                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                                                                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                                                                }`}
                                                        >
                                                            {updating ? "..." : active ? "Deactivate" : "Activate"}
                                                        </button>
                                                    )}
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

            {/* FULL ADMIN USER EDIT CONTROL MODAL */}
            {editUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <FaShieldAlt className="h-5 w-5 text-blue-400" /> Admin User Control Panel (User #{editUser.id})
                            </h3>
                            <button
                                onClick={() => setEditUser(null)}
                                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveUserFullControl} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white font-bold focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white font-bold focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Assigned System Role</label>
                                    <select
                                        value={editRole}
                                        onChange={(e) => setEditRole(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-bold text-white focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="USER">USER (Standard Customer)</option>
                                        <option value="ADMIN">ADMIN (System Supervisor)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Account Active Status</label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs font-bold text-white focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="ACTIVE">ACTIVE (Enabled)</option>
                                        <option value="INACTIVE">INACTIVE (Blocked / Suspended)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setEditUser(null)}
                                    className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="rounded-xl bg-blue-600 px-6 py-2 text-xs font-bold text-white hover:bg-blue-500 transition disabled:opacity-50 shadow-md shadow-blue-600/30 cursor-pointer"
                                >
                                    {editLoading ? "Saving to Database..." : "Save User Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsersPage;

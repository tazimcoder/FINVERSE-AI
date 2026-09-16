/**
 * ==========================================================
 * FINVERSE AI
 * User Profile & Settings Page
 * ==========================================================
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaIdBadge,
    FaCheckCircle,
    FaSignOutAlt,
    FaLock,
    FaEdit,
    FaSync,
    FaDatabase
} from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../auth/api/authApi";
import api from "../../../services/api";

function UserProfilePage() {
    const { user, token, logout, reloadUser } = useAuth();
    const navigate = useNavigate();

    const [liveProfile, setLiveProfile] = useState(user);
    const [loading, setLoading] = useState(false);
    const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Form states
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);

    const fetchLiveProfile = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMeApi(token);
            const data = response?.data?.data || response?.data || response;
            if (data && data.id) {
                setLiveProfile(data);
                if (reloadUser) reloadUser();
            }
        } catch (error) {
            console.error("Failed to fetch live user profile:", error);
        } finally {
            setLoading(false);
            setLastRefreshed(new Date().toLocaleTimeString());
        }
    }, [token, reloadUser]);


    useEffect(() => {
        fetchLiveProfile();
    }, [fetchLiveProfile]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setStatusMsg(null);
        try {
            const res = await api.patch("/api/v1/auth/profile", {
                full_name: editName,
                current_password: currentPassword.trim().length > 0 ? currentPassword : undefined,
                password: newPassword.trim().length > 0 ? newPassword : undefined,
            });

            if (res?.data?.success) {
                const updatedUser = res?.data?.data;
                if (updatedUser) {
                    setLiveProfile(updatedUser);
                    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                    localStorage.setItem("user", JSON.stringify({ ...existingUser, ...updatedUser }));
                    if (reloadUser) reloadUser();
                }

                setStatusMsg({
                    type: "success",
                    text: "Your profile and password have been successfully updated in MySQL database!",
                });
                setShowEditModal(false);
                setCurrentPassword("");
                setNewPassword("");
                fetchLiveProfile();
            }

        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err?.response?.data?.message || "Failed to update profile. Please verify your current password.",
            });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const name = liveProfile?.full_name || user?.full_name || "User";
    const email = liveProfile?.email || user?.email || "";
    const role = liveProfile?.role || user?.role || "USER";
    const userId = liveProfile?.id || user?.id;
    const createdAt = liveProfile?.created_at
        ? new Date(liveProfile.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "N/A";
    const updatedAt = liveProfile?.updated_at
        ? new Date(liveProfile.updated_at).toLocaleString()
        : "Initial Profile";

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <FaUser className="h-6 w-6 text-blue-600" /> My Profile & Security Settings
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Manage your account information, update full name, and change password securely.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setEditName(name);
                            setShowEditModal(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                    >
                        <FaEdit className="h-3.5 w-3.5" /> Edit Profile & Password
                    </button>

                    <button
                        onClick={fetchLiveProfile}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm disabled:opacity-50"
                    >
                        <FaSync className={`h-3.5 w-3.5 text-blue-600 ${loading ? "animate-spin" : ""}`} />
                        Sync DB ({lastRefreshed})
                    </button>
                </div>
            </div>

            {statusMsg && (
                <div
                    className={`p-4 rounded-xl text-xs font-bold ${statusMsg.type === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-rose-50 border border-rose-200 text-rose-700"
                        }`}
                >
                    {statusMsg.text}
                </div>
            )}

            {/* User Hero Header Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-3xl font-black text-white shadow-lg shadow-blue-500/20">
                                {name.charAt(0).toUpperCase()}
                            </div>
                            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-white" title="Active Account">
                                <FaCheckCircle className="h-3.5 w-3.5" />
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-extrabold text-slate-900">
                                    {name}
                                </h2>
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-bold text-blue-700">
                                    {role}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                <FaEnvelope className="h-3 w-3 text-slate-400" />
                                {email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs text-slate-700">
                        <FaDatabase className="h-4 w-4 text-blue-600" />
                        <div>
                            <p className="font-bold text-slate-900">Real-Time Database Sync</p>
                            <p className="text-[10px] text-slate-500">Last updated in DB: {updatedAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FaIdBadge className="h-4 w-4 text-blue-600" /> Account Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 font-semibold">Full Name</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{name}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 font-semibold">Email Address</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{email}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 font-semibold">Account ID</span>
                        <p className="text-sm font-mono font-bold text-blue-600 mt-1">#{userId}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 font-semibold">Member Since</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{createdAt}</p>
                    </div>
                </div>
            </div>

            {/* Edit Profile & Password Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <FaEdit className="h-4 w-4 text-blue-600" /> Edit Profile & Change Password
                        </h3>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                    <FaLock className="h-3 w-3 text-slate-400" /> Current Password (Required to change password)
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                    className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                    <FaLock className="h-3 w-3 text-slate-400" /> New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password (min 6 chars)"
                                    className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saveLoading}
                                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 shadow-md shadow-blue-600/20"
                                >
                                    {saveLoading ? "Saving to DB..." : "Save Profile & Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Logout Shortcut */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition"
                >
                    <FaSignOutAlt className="h-3.5 w-3.5" /> Logout Session
                </button>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center space-y-4 shadow-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
                            <FaSignOutAlt className="h-7 w-7" />
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900">Logout Session?</h3>
                            <p className="text-xs text-slate-500 mt-1">Are you sure you want to log out?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-700"
                            >
                                Confirm Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfilePage;

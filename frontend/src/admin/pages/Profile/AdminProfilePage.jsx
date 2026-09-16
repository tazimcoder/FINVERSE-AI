/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin Profile & Credentials Page
 * ==========================================================
 *
 * Location:
 * src/admin/pages/Profile/AdminProfilePage.jsx
 *
 * Features:
 * - Real-time Admin Profile sync with MySQL Database
 * - Live Photo Upload (Custom image file / Base64 / Image URL)
 * - 12 HD Executive Avatar Presets gallery
 * - Update Full Name, Email, Mobile, Password with live DB persistence
 * - Security Privileges & System Audit Capabilities overview
 * ==========================================================
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUserShield,
    FaEnvelope,
    FaIdBadge,
    FaCheckCircle,
    FaSignOutAlt,
    FaShieldAlt,
    FaDatabase,
    FaSync,
    FaEdit,
    FaLock,
    FaSearch,
    FaTimes,
    FaCamera,
    FaUpload,
    FaLink,
    FaUserCheck,
    FaKey,
    FaPhone,
    FaSlidersH,
    FaFileInvoiceDollar,
    FaExchangeAlt,
    FaUsers,
    FaCheck,
    FaBolt,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../features/auth/api/authApi";
import { updateAdminProfileApi } from "../../api/adminUserApi";

// Curated 12 HD Professional Executive Avatar Presets
const AVATAR_PRESETS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
];

function AdminProfilePage() {
    const { user, token, logout, reloadUser, updateUser } = useAuth();
    const navigate = useNavigate();

    const [liveProfile, setLiveProfile] = useState(user);
    const [loading, setLoading] = useState(false);
    const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("overview"); // "overview" | "avatar" | "security" | "permissions"

    // Edit Profile state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editMobile, setEditMobile] = useState("");
    const [editPassword, setEditPassword] = useState("");

    // Photo / Avatar state
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [avatarInput, setAvatarInput] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);
    const fileInputRef = useRef(null);

    // Fetch fresh real-time profile data directly from Database
    const fetchLiveProfile = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMeApi(token);
            const data = response?.data?.data || response?.data || response;
            if (data && data.id) {
                setLiveProfile(data);
            }
        } catch (error) {
            console.error("Failed to fetch live admin profile:", error);
        } finally {
            setLoading(false);
            setLastRefreshed(new Date().toLocaleTimeString());
        }
    }, [token]);

    useEffect(() => {
        fetchLiveProfile();
    }, []);

    const handleOpenEditModal = () => {
        setEditName(liveProfile?.full_name || user?.full_name || "");
        setEditEmail(liveProfile?.email || user?.email || "");
        setEditMobile(liveProfile?.mobile || user?.mobile || "");
        setEditPassword("");
        setShowEditModal(true);
    };

    const handleOpenPhotoModal = () => {
        setAvatarInput(liveProfile?.avatar_url || user?.avatar_url || user?.avatar || "");
        setShowPhotoModal(true);
    };

    // Custom Image File upload (Convert to Base64 Data URL)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setStatusMsg({ type: "error", text: "Image file size must be less than 5MB." });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarInput(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Save profile changes (Name, Email, Mobile, Password, Avatar)
    const handleSaveProfile = async (e) => {
        if (e) e.preventDefault();
        setSaveLoading(true);
        setStatusMsg(null);
        try {
            const payload = {
                full_name: editName || liveProfile?.full_name || user?.full_name,
                email: editEmail || liveProfile?.email || user?.email,
                mobile: editMobile || liveProfile?.mobile || user?.mobile,
                avatar_url: avatarInput,
            };
            if (editPassword && editPassword.trim().length > 0) {
                payload.password = editPassword.trim();
            }

            const res = await updateAdminProfileApi(payload);
            const updatedUser = res?.data?.data || res?.data;

            if (updatedUser) {
                setLiveProfile(updatedUser);
                if (updateUser) {
                    updateUser(updatedUser);
                } else {
                    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                    localStorage.setItem("user", JSON.stringify({ ...existingUser, ...updatedUser }));
                    if (reloadUser) reloadUser();
                }

                setStatusMsg({ type: "success", text: "Admin Profile & Avatar updated successfully in MySQL DB!" });
                setShowEditModal(false);
                setShowPhotoModal(false);
                setEditPassword("");
            }
        } catch (err) {
            console.error("Admin Profile Edit Error:", err);
            setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to update admin profile." });
        } finally {
            setSaveLoading(false);
        }
    };

    // Quick save for photo modal
    const handleSavePhotoOnly = async (selectedAvatarUrl) => {
        const urlToSave = selectedAvatarUrl || avatarInput;
        setSaveLoading(true);
        setStatusMsg(null);
        try {
            const payload = {
                full_name: liveProfile?.full_name || user?.full_name || "Admin",
                email: liveProfile?.email || user?.email || "admin@finverse.ai",
                avatar_url: urlToSave,
            };

            const res = await updateAdminProfileApi(payload);
            const updatedUser = res?.data?.data || res?.data;

            if (updatedUser) {
                setLiveProfile(updatedUser);
                if (updateUser) {
                    updateUser(updatedUser);
                } else {
                    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                    localStorage.setItem("user", JSON.stringify({ ...existingUser, ...updatedUser }));
                    if (reloadUser) reloadUser();
                }

                setStatusMsg({ type: "success", text: "New Profile Avatar applied & saved to MySQL DB!" });
                setShowPhotoModal(false);
            }
        } catch (err) {
            console.error("Avatar Save Error:", err);
            setStatusMsg({ type: "error", text: err?.response?.data?.message || "Failed to save avatar image." });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const name = liveProfile?.full_name || user?.full_name || "System Admin";
    const email = liveProfile?.email || user?.email || "admin@finverse.ai";
    const mobile = liveProfile?.mobile || user?.mobile || "+91 98765 43210";
    const role = liveProfile?.role || user?.role || "ADMIN";
    const avatarUrl = liveProfile?.avatar_url || user?.avatar_url || user?.avatar || null;
    const userId = liveProfile?.id || user?.id || 1;
    const createdAt = liveProfile?.created_at
        ? new Date(liveProfile.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        : "System Root Deployment";

    const overviewItems = [
        { label: "Full Name", value: name },
        { label: "Email Address", value: email },
        { label: "Phone / Mobile", value: mobile },
        { label: "System Role", value: role === "ADMIN" ? "SUPER ADMINISTRATOR" : role },
        { label: "Admin ID", value: `#${userId}` },
        { label: "Account Registered", value: createdAt },
        { label: "Database Table", value: "users (MySQL)" },
    ].filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6 font-sans">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <FaUserShield className="h-7 w-7 text-blue-500" />
                        Admin Profile & Identity Command
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Executive credentials, profile photo customization & administrative privileges synchronized with MySQL.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleOpenPhotoModal}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white hover:from-purple-500 hover:to-indigo-500 transition shadow-lg shadow-purple-600/30 cursor-pointer"
                    >
                        <FaCamera className="h-3.5 w-3.5" />
                        Upload / Change Photo
                    </button>

                    <button
                        onClick={handleOpenEditModal}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/30 cursor-pointer"
                    >
                        <FaEdit className="h-3.5 w-3.5" />
                        Edit Info
                    </button>

                    <button
                        onClick={fetchLiveProfile}
                        disabled={loading}
                        className="group relative flex items-center justify-center gap-2 rounded-2xl border border-cyan-500/50 bg-gradient-to-r from-cyan-950/80 via-slate-950/90 to-blue-950/80 px-4 py-2.5 text-xs font-extrabold text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer disabled:opacity-50"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                        </span>

                        <FaSync className={`h-3.5 w-3.5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:rotate-180 transition-transform duration-500 ${loading ? "animate-spin" : ""}`} />

                        <span>Sync ({lastRefreshed})</span>
                    </button>

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center gap-2 rounded-xl bg-rose-600/90 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition shadow-lg shadow-rose-600/30 cursor-pointer"
                    >
                        <FaSignOutAlt className="h-3.5 w-3.5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Status Alert Toast */}
            {statusMsg && (
                <div className={`p-4 rounded-2xl text-xs font-extrabold flex items-center justify-between shadow-lg ${statusMsg.type === "success" ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300" : "bg-rose-950/80 border border-rose-500/40 text-rose-300"}`}>
                    <div className="flex items-center gap-2">
                        {statusMsg.type === "success" ? <FaCheckCircle className="h-4 w-4 text-emerald-400" /> : <FaTimes className="h-4 w-4 text-rose-400" />}
                        <span>{statusMsg.text}</span>
                    </div>
                    <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-white font-bold text-sm cursor-pointer">✕</button>
                </div>
            )}

            {/* EXECUTIVE HERO BANNER */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 p-6 sm:p-8 shadow-2xl">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        {/* Interactive Avatar Frame */}
                        <div className="relative group cursor-pointer" onClick={handleOpenPhotoModal}>
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={name}
                                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl object-cover ring-4 ring-blue-500/60 shadow-2xl shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-4xl font-black text-white ring-4 ring-blue-500/50 shadow-2xl shadow-blue-600/30">
                                    {name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Hover Camera Overlay */}
                            <div className="absolute inset-0 rounded-3xl bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs">
                                <FaCamera className="h-6 w-6 text-blue-400 mb-1" />
                                <span className="text-[10px] font-black tracking-wider uppercase">Change Photo</span>
                            </div>

                            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-slate-950 shadow-md">
                                <FaCheckCircle className="h-4 w-4" />
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    {name}
                                </h2>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 px-3.5 py-1 text-xs font-black text-blue-300">
                                    <FaUserShield className="h-3.5 w-3.5 text-blue-400" />
                                    {role === "ADMIN" ? "SUPER ADMINISTRATOR" : role}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-2">
                                <FaEnvelope className="h-3.5 w-3.5 text-blue-400" />
                                {email}
                            </p>

                            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                                <FaPhone className="h-3.5 w-3.5 text-emerald-400" />
                                {mobile}
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl">
                                    ADMIN ID: #{userId}
                                </span>
                                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    LIVE SESSION CONNECTED
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 shrink-0">
                        <button
                            onClick={handleOpenPhotoModal}
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-black text-white hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 shadow-lg shadow-blue-600/30 transition cursor-pointer"
                        >
                            <FaCamera className="h-4 w-4" /> Change Profile Avatar
                        </button>

                        <button
                            onClick={handleOpenEditModal}
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-extrabold text-blue-400 hover:bg-slate-800 hover:border-blue-500/40 transition cursor-pointer"
                        >
                            <FaEdit className="h-4 w-4" /> Edit Account Info
                        </button>
                    </div>
                </div>
            </div>

            {/* TAB NAVIGATION HEADER */}
            <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-black border-b-2 transition cursor-pointer whitespace-nowrap ${activeTab === "overview" ? "border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-xl" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                    <FaIdBadge className="h-4 w-4" /> Overview & Identity
                </button>

                <button
                    onClick={() => setActiveTab("avatar")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-black border-b-2 transition cursor-pointer whitespace-nowrap ${activeTab === "avatar" ? "border-purple-500 text-purple-400 bg-purple-500/10 rounded-t-xl" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                    <FaCamera className="h-4 w-4" /> Avatar & Photo Gallery
                </button>

                <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-black border-b-2 transition cursor-pointer whitespace-nowrap ${activeTab === "security" ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-xl" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                    <FaShieldAlt className="h-4 w-4" /> Security & Password
                </button>

                <button
                    onClick={() => setActiveTab("permissions")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-black border-b-2 transition cursor-pointer whitespace-nowrap ${activeTab === "permissions" ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-xl" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                    <FaSlidersH className="h-4 w-4" /> Admin System Powers
                </button>
            </div>

            {/* TAB CONTENT: 1. OVERVIEW & IDENTITY */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Overview Card */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <FaIdBadge className="h-4.5 w-4.5 text-blue-400" />
                                Account Details
                            </h3>
                            <button
                                onClick={handleOpenEditModal}
                                className="text-xs font-extrabold text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                <FaEdit className="h-3 w-3" /> Edit Info
                            </button>
                        </div>

                        <div className="space-y-3.5 text-xs">
                            {overviewItems.map((item) => (
                                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-900">
                                    <span className="text-slate-400 font-medium">{item.label}</span>
                                    <span className="font-extrabold text-slate-100 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick System Summary Card */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3.5">
                            <FaDatabase className="h-4.5 w-4.5 text-emerald-400" />
                            Live System Session Status
                        </h3>

                        <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                                <div>
                                    <p className="font-bold text-white">MySQL Database Connection</p>
                                    <p className="text-[10px] text-slate-400">Authenticated via REST API pool</p>
                                </div>
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                            </div>

                            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                                <div>
                                    <p className="font-bold text-white">JWT Bearer Token Security</p>
                                    <p className="text-[10px] text-slate-400">Header authorization active</p>
                                </div>
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                            </div>

                            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                                <div>
                                    <p className="font-bold text-white">Profile Photo Persistence</p>
                                    <p className="text-[10px] text-slate-400">{avatarUrl ? "Custom Avatar Enabled" : "Default Initial Avatar"}</p>
                                </div>
                                <button
                                    onClick={handleOpenPhotoModal}
                                    className="text-[10px] font-bold text-purple-400 hover:underline cursor-pointer"
                                >
                                    Manage Photo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: 2. AVATAR & PHOTO GALLERY */}
            {activeTab === "avatar" && (
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                        <div>
                            <h3 className="text-base font-black text-white flex items-center gap-2">
                                <FaCamera className="h-5 w-5 text-purple-400" />
                                Admin Profile Avatar Customization
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Choose from executive photo presets or upload your own custom image file.
                            </p>
                        </div>

                        <button
                            onClick={handleOpenPhotoModal}
                            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer"
                        >
                            <FaUpload className="h-3.5 w-3.5" /> Upload File
                        </button>
                    </div>

                    {/* Presets Gallery Grid */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <FaBolt className="h-3.5 w-3.5 text-amber-400" />
                            Executive Avatar Presets
                        </h4>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {AVATAR_PRESETS.map((presetUrl, idx) => {
                                const isSelected = avatarUrl === presetUrl;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleSavePhotoOnly(presetUrl)}
                                        className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-200 ${isSelected ? "border-purple-500 ring-4 ring-purple-500/40 scale-105" : "border-slate-800 hover:border-purple-500/60 hover:scale-102"}`}
                                    >
                                        <img src={presetUrl} alt={`Preset ${idx}`} className="h-24 w-full object-cover" />
                                        {isSelected && (
                                            <div className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
                                                <FaCheck className="h-3 w-3" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-[10px] font-black text-white bg-purple-600 px-2 py-1 rounded-lg">Apply</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: 3. SECURITY & PASSWORD */}
            {activeTab === "security" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3.5">
                            <FaLock className="h-4.5 w-4.5 text-indigo-400" />
                            Change Admin Password
                        </h3>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400">New Password</label>
                                <input
                                    type="password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    placeholder="Enter new password (min 6 chars)"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saveLoading || !editPassword}
                                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-black text-white hover:bg-indigo-500 transition disabled:opacity-50 shadow-md shadow-indigo-600/30 cursor-pointer"
                            >
                                {saveLoading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3.5">
                            <FaShieldAlt className="h-4.5 w-4.5 text-indigo-400" />
                            Active Security Firewall Status
                        </h3>

                        <div className="space-y-3 text-xs">
                            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                                <p className="font-bold text-white flex items-center justify-between">
                                    <span>SQL Injection Shield</span>
                                    <span className="text-emerald-400 font-extrabold text-[11px]">ACTIVE</span>
                                </p>
                                <p className="text-[10px] text-slate-400">Parameterized queries enforced via MySQL pool</p>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                                <p className="font-bold text-white flex items-center justify-between">
                                    <span>Role-Based Access Control</span>
                                    <span className="text-blue-400 font-extrabold text-[11px]">ADMINISTRATOR</span>
                                </p>
                                <p className="text-[10px] text-slate-400">Full administrative permission granted</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: 4. ADMIN SYSTEM POWERS */}
            {activeTab === "permissions" && (
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-xl">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-4">
                        <FaSlidersH className="h-5 w-5 text-emerald-400" />
                        Administrative Privileges & Control Scope
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <FaUsers className="h-5 w-5 text-blue-400" />
                                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">ENABLED</span>
                            </div>
                            <h4 className="text-xs font-extrabold text-white">User Management</h4>
                            <p className="text-[10px] text-slate-400">Activate, deactivate, view user profiles & manage security credentials.</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <FaFileInvoiceDollar className="h-5 w-5 text-amber-400" />
                                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">ENABLED</span>
                            </div>
                            <h4 className="text-xs font-extrabold text-white">Loan Oversight</h4>
                            <p className="text-[10px] text-slate-400">Approve loan applications, inspect borrower risk & update loan statuses.</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <FaExchangeAlt className="h-5 w-5 text-purple-400" />
                                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">ENABLED</span>
                            </div>
                            <h4 className="text-xs font-extrabold text-white">Audit History Logs</h4>
                            <p className="text-[10px] text-slate-400">Track system activities, administrative operations & user event logs.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT PROFILE MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
                    <div className="w-full max-w-lg rounded-3xl border border-blue-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                <FaEdit className="h-5 w-5 text-blue-400" /> Edit Admin Profile Details
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-300">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    placeholder="Enter full name"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                    placeholder="Enter email address"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-300">Mobile / Phone Number</label>
                                <input
                                    type="text"
                                    value={editMobile}
                                    onChange={(e) => setEditMobile(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                                    <FaLock className="h-3 w-3 text-slate-500" /> New Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    placeholder="Leave blank to keep existing password"
                                    className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saveLoading}
                                    className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black text-white hover:bg-blue-500 transition disabled:opacity-50 shadow-md shadow-blue-600/30 cursor-pointer"
                                >
                                    {saveLoading ? "Saving to MySQL..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* UPLOAD / CHANGE PHOTO MODAL */}
            {showPhotoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
                    <div className="w-full max-w-2xl rounded-3xl border border-purple-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                <FaCamera className="h-5 w-5 text-purple-400" /> Upload / Select Admin Avatar Photo
                            </h3>
                            <button
                                onClick={() => setShowPhotoModal(false)}
                                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Live Avatar Preview Box */}
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20">
                            {avatarInput ? (
                                <img
                                    src={avatarInput}
                                    alt="Preview"
                                    className="h-28 w-28 rounded-3xl object-cover ring-4 ring-purple-500 shadow-xl"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-4xl font-black text-white shadow-xl">
                                    {name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="text-xs font-bold text-purple-300 mt-3">Live Avatar Preview</p>
                        </div>

                        {/* Upload Controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* File Upload Button */}
                            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2 text-center">
                                <FaUpload className="h-6 w-6 text-purple-400 mx-auto" />
                                <h4 className="text-xs font-bold text-white">Upload Image File</h4>
                                <p className="text-[10px] text-slate-400">Select PNG, JPG, or WEBP file from your device</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full mt-2 rounded-xl bg-purple-600 py-2 text-xs font-bold text-white hover:bg-purple-500 cursor-pointer"
                                >
                                    Choose File
                                </button>
                            </div>

                            {/* Direct Image URL Input */}
                            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                                <div className="flex items-center gap-2">
                                    <FaLink className="h-4 w-4 text-blue-400" />
                                    <h4 className="text-xs font-bold text-white">Paste Image URL</h4>
                                </div>
                                <p className="text-[10px] text-slate-400">Enter a direct HTTPS image URL link</p>
                                <input
                                    type="url"
                                    value={avatarInput}
                                    onChange={(e) => setAvatarInput(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full mt-2 rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Executive Presets Selector */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Or Pick an Executive Preset</h4>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                {AVATAR_PRESETS.map((presetUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={presetUrl}
                                        alt={`Preset ${idx}`}
                                        onClick={() => setAvatarInput(presetUrl)}
                                        className={`h-16 w-full rounded-xl object-cover cursor-pointer border-2 transition ${avatarInput === presetUrl ? "border-purple-500 ring-2 ring-purple-500 scale-105" : "border-slate-800 hover:border-purple-400"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                            <button
                                type="button"
                                onClick={() => setShowPhotoModal(false)}
                                className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-900 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSavePhotoOnly(avatarInput)}
                                disabled={saveLoading}
                                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-xs font-black text-white hover:from-purple-500 hover:to-indigo-500 transition disabled:opacity-50 shadow-md shadow-purple-600/30 cursor-pointer"
                            >
                                {saveLoading ? "Saving to DB..." : "Apply & Save Avatar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* LOGOUT CONFIRMATION MODAL */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-950 p-6 text-center space-y-4 shadow-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <FaSignOutAlt className="h-7 w-7" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-white">Logout Admin Session?</h3>
                            <p className="text-xs text-slate-400 mt-1">Are you sure you want to log out of the admin portal?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full rounded-xl border border-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-900 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-xl bg-rose-600 py-2.5 text-xs font-extrabold text-white hover:bg-rose-500 cursor-pointer"
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

export default AdminProfilePage;

/**
 * ==========================================================
 * FINVERSE AI
 * Executive Admin Profile Dropdown Component
 * ==========================================================
 *
 * Location:
 * src/admin/components/profile/AdminProfileDropdown.jsx
 * ==========================================================
 */

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaSignOutAlt,
    FaUserCircle,
    FaChevronDown,
    FaCog,
    FaCamera,
    FaShieldAlt,
    FaKey,
    FaCheckCircle,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function AdminProfileDropdown() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsOpen(false);
        logout();
        navigate("/login");
    };

    const fullName = user?.full_name || "Admin User";
    const email = user?.email || "admin@finverse.ai";
    const role = user?.role || "ADMIN";
    const avatarUrl = user?.avatar_url || user?.avatar || null;

    // Initial avatar letter
    const initial = fullName.charAt(0).toUpperCase();

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-900/30
                    p-1.5
                    pr-3.5
                    text-left
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:bg-slate-800/50
                    hover:border-blue-500/40
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                    focus:outline-none
                    cursor-pointer
                "
            >
                {/* Avatar Display */}
                <div className="relative shrink-0">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={fullName}
                            className="h-9 w-9 rounded-xl object-cover ring-2 ring-blue-500/50 shadow-md"
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-tr
                                from-blue-600
                                via-indigo-600
                                to-purple-600
                                text-sm
                                font-black
                                text-white
                                shadow-md
                                ring-2
                                ring-blue-500/30
                            "
                        >
                            {initial}
                        </div>
                    )}
                    {/* Live Online Badge Dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950 shadow-[0_0_8px_#34d399]" />
                </div>

                <div className="hidden sm:block">
                    <p className="text-xs font-extrabold leading-tight text-white flex items-center gap-1.5">
                        {fullName}
                    </p>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        {role === "ADMIN" ? "SYSTEM ADMIN" : role}
                    </p>
                </div>

                <FaChevronDown
                    className={`
                        h-3
                        w-3
                        text-slate-400
                        transition-transform
                        duration-300
                        ${isOpen ? "rotate-180 text-blue-400" : ""}
                    `}
                />
            </button>

            {/* Next-Level Translucent Glassmorphic Dropdown Menu */}
            {isOpen && (
                <div
                    className="
                        absolute
                        right-0
                        mt-2.5
                        w-72
                        origin-top-right
                        rounded-3xl
                        border
                        border-blue-500/30
                        bg-slate-950/90
                        p-2.5
                        shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                        backdrop-blur-2xl
                        z-50
                        animate-in
                        fade-in
                        zoom-in-95
                        duration-150
                    "
                >
                    {/* Executive Header Details (Translucent Glass Card) */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 p-3.5 border border-slate-800/80 mb-1.5 backdrop-blur-md shadow-inner">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 border border-emerald-500/30">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider">
                                    LIVE SESSION ACTIVE
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/60 backdrop-blur-xs">
                                SECURE
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={fullName}
                                        className="h-11 w-11 rounded-xl object-cover ring-2 ring-blue-400/60 shadow-md"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-lg font-black text-white shadow-md">
                                        {initial}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-black text-white truncate flex items-center gap-1">
                                    {fullName}
                                    <FaCheckCircle className="h-3 w-3 text-blue-400 shrink-0" />
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                    {email}
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/admin/profile"
                            onClick={() => setIsOpen(false)}
                            className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600/25 border border-blue-500/40 py-1.5 text-[11px] font-bold text-blue-200 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-md backdrop-blur-xs"
                        >
                            <FaCamera className="h-3 w-3" />
                            Update Profile & Avatar Photo
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-1 py-1">
                        <Link
                            to="/admin/profile"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                px-3.5
                                py-2.5
                                text-xs
                                font-bold
                                text-slate-200
                                hover:bg-blue-600/20
                                hover:text-blue-300
                                hover:border
                                hover:border-blue-500/30
                                transition-all
                                backdrop-blur-xs
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                                    <FaUserCircle className="h-4 w-4" />
                                </div>
                                <span>Admin Profile Settings</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-normal">Edit</span>
                        </Link>

                        <Link
                            to="/admin/settings"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                px-3.5
                                py-2.5
                                text-xs
                                font-bold
                                text-slate-200
                                hover:bg-indigo-600/20
                                hover:text-indigo-300
                                hover:border
                                hover:border-indigo-500/30
                                transition-all
                                backdrop-blur-xs
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <FaCog className="h-4 w-4" />
                                </div>
                                <span>System Configuration</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-normal">Core</span>
                        </Link>

                        <Link
                            to="/admin/history"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                px-3.5
                                py-2.5
                                text-xs
                                font-bold
                                text-slate-200
                                hover:bg-purple-600/20
                                hover:text-purple-300
                                hover:border
                                hover:border-purple-500/30
                                transition-all
                                backdrop-blur-xs
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                                    <FaShieldAlt className="h-4 w-4" />
                                </div>
                                <span>Security Audit Logs</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-normal">Logs</span>
                        </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-white/10 pt-1.5 mt-1">
                        <button
                            onClick={handleLogout}
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-xl
                                px-3.5
                                py-2.5
                                text-xs
                                font-bold
                                text-rose-400
                                hover:bg-rose-500/20
                                hover:text-rose-300
                                hover:border
                                hover:border-rose-500/30
                                transition-all
                                cursor-pointer
                                backdrop-blur-xs
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
                                    <FaSignOutAlt className="h-4 w-4" />
                                </div>
                                <span>Logout Admin Session</span>
                            </div>
                            <span className="text-[10px] text-rose-400 font-mono">EXIT</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProfileDropdown;

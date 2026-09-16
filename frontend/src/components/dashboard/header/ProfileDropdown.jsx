/**
 * ==========================================================
 * Dashboard Profile Dropdown
 * ==========================================================
 */

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaShieldAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function ProfileDropdown() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const initial = user?.full_name?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 shadow-xs hover:bg-slate-100 hover:border-blue-300 transition text-left cursor-pointer"
            >
                {/* User Avatar Badge */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 ring-1 ring-white/20">
                    {initial}
                </div>

                {/* User Info Label */}
                <div className="hidden sm:block">
                    <p className="font-bold text-xs text-slate-900 leading-tight truncate max-w-[120px]">
                        {user?.full_name || "User"}
                    </p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                        <FaShieldAlt className="h-2 w-2" />
                        {user?.role || "USER"}
                    </p>
                </div>

                <FaChevronDown
                    className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                />
            </button>

            {/* Dropdown Menu Popup */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 p-3 text-white shadow-sm mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.full_name || "User Account"}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                    </div>

                    <div className="space-y-0.5 border-t border-slate-100 pt-1">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                            <FaUserCircle className="h-4 w-4 text-blue-600" />
                            My Profile & Security
                        </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                            <FaSignOutAlt className="h-4 w-4 text-rose-500" />
                            Logout Session
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
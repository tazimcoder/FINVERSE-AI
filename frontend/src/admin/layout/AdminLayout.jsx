/**
 * ==========================================================
 * FINVERSE AI
 * Professional Executive Admin Layout with Multi-Theme Engine
 * ==========================================================
 *
 * Location:
 * src/admin/layout/AdminLayout.jsx
 *
 * Responsibility:
 * - Single Unified Top Executive Navbar
 * - Multi-Theme Mode Switcher (7 distinct themes: Light, Dark, Midnight, Cyberpunk, Emerald, Solarized, OLED Black)
 * - Unique Modern Executive Sidebar
 * - Mobile responsive drawer navigation
 * - Consistent nested layout via Outlet
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
    FaChartPie,
    FaUsers,
    FaWallet,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaChartLine,
    FaFileAlt,
    FaCog,
    FaUserShield,
    FaBars,
    FaTimes,
    FaBell,
    FaShieldAlt,
    FaSignOutAlt,
    FaMapMarkedAlt,
    FaSlidersH,
    FaHistory
} from "react-icons/fa";
import AdminProfileDropdown from "../components/profile/AdminProfileDropdown";
import AdminGlobalSearch from "../components/search/AdminGlobalSearch";
import AdminThemeToggle, { getAdminTheme } from "../components/theme/AdminThemeToggle";
import AdminNotificationDropdown from "../components/notifications/AdminNotificationDropdown";
import BackgroundFXEngine from "../../components/common/BackgroundFXEngine";
import useAuth from "../../hooks/useAuth";


// ==========================================================
// GROUPED ADMIN NAVIGATION
// ==========================================================

const adminNavGroups = [
    {
        groupTitle: "OVERVIEW",
        items: [
            {
                name: "Dashboard",
                path: "/admin",
                icon: FaChartPie,
                exact: true,
            },
        ],
    },
    {
        groupTitle: "MANAGEMENT",
        items: [
            {
                name: "Users",
                path: "/admin/users",
                icon: FaUsers,
            },
            {
                name: "User Customization",
                path: "/admin/user-features",
                icon: FaSlidersH,
            },
            {
                name: "Accounts",
                path: "/admin/accounts",
                icon: FaWallet,
            },
            {
                name: "History",
                path: "/admin/history",
                icon: FaHistory,
            },
            {
                name: "Loans",
                path: "/admin/loans",
                icon: FaFileInvoiceDollar,
            },
            {
                name: "Investments",
                path: "/admin/investments",
                icon: FaChartLine,
            },
            {
                name: "Property Valuation",
                path: "/admin/property-valuation",
                icon: FaMapMarkedAlt,
            },
        ],
    },
    {
        groupTitle: "SYSTEM",
        items: [
            {
                name: "Admin Profile",
                path: "/admin/profile",
                icon: FaUserShield,
            },
            {
                name: "Audit Logs",
                path: "/admin/audit-logs",
                icon: FaShieldAlt,
            },
            {
                name: "Reports",
                path: "/admin/reports",
                icon: FaFileAlt,
            },
            {
                name: "Settings",
                path: "/admin/settings",
                icon: FaCog,
            },
        ],
    },
];


function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [themeId, setThemeId] = useState(() => {
        return localStorage.getItem("finverse_admin_theme_mode") || "dark";
    });
    const [bgFx, setBgFx] = useState(() => {
        return localStorage.getItem("finverse_bg_animation") || "particles";
    });

    const { user, logout } = useAuth();

    useEffect(() => {
        const handleFxChange = (e) => {
            if (e?.detail) {
                setBgFx(e.detail);
            } else {
                setBgFx(localStorage.getItem("finverse_bg_animation") || "particles");
            }
        };

        window.addEventListener("finverse_bg_fx_changed", handleFxChange);
        return () => window.removeEventListener("finverse_bg_fx_changed", handleFxChange);
    }, []);

    const handleSelectTheme = (newThemeId) => {
        setThemeId(newThemeId);
        localStorage.setItem("finverse_admin_theme_mode", newThemeId);
    };

    const currentTheme = getAdminTheme(themeId);
    const isLight = themeId === "light";

    return (
        <div className={`relative min-h-screen flex flex-col font-sans antialiased transition-colors duration-500 overflow-x-hidden w-full ${currentTheme.bgClass}`}>
            {/* Dynamic Theme Ambient Gradient Mesh Layer */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 transition-all duration-700 bg-gradient-to-br ${currentTheme.previewGradient || "from-slate-950 via-slate-900 to-slate-950"} opacity-40`}
            />

            {/* Theme Reactive Ambient Accent Glow Orbs */}
            <div
                className="fixed -top-44 -left-44 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-700 opacity-30"
                style={{ backgroundColor: currentTheme.accentColor || "#3b82f6" }}
            />
            <div
                className="fixed -bottom-44 -right-44 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-700 opacity-25"
                style={{ backgroundColor: currentTheme.accentColor || "#6366f1" }}
            />

            {/* Live 60FPS Background FX Animation Engine */}
            <BackgroundFXEngine activeFx={bgFx} />

            {/* ==================================================
                SINGLE UNIFIED EXECUTIVE TOP NAVBAR
            ================================================== */}
            <header className={`sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 sm:px-6 backdrop-blur-md shadow-md transition-colors duration-300 ${currentTheme.headerClass}`}>
                
                {/* Left Area: Mobile Menu Toggle + Brand */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`rounded-xl p-2 transition lg:hidden cursor-pointer ${
                            isLight ? "text-slate-600 hover:bg-slate-200" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                        aria-label="Toggle Mobile Menu"
                    >
                        {mobileOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                    </button>

                    {/* Logo Banner */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-600/30 shrink-0">
                            <FaShieldAlt className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-black tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>
                                    FINVERSE <span className="text-blue-500">AI</span>
                                </span>
                                <span className="hidden sm:inline-flex rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-black text-blue-400 border border-blue-500/30">
                                    PRO ADMIN
                                </span>
                            </div>
                            <p className={`text-[10px] font-semibold hidden sm:block ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                                Executive Administration Portal
                            </p>
                        </div>
                    </div>
                </div>

                {/* Middle Area: Global Live Search Bar */}
                <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
                    <AdminGlobalSearch />
                </div>

                {/* Right Area: Health Status + Theme Switcher + Notifications + Profile Dropdown */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                    {/* Multi-Theme Mode Switcher (12 Distinct Modes) */}
                    <AdminThemeToggle
                        currentThemeId={themeId}
                        onSelectTheme={handleSelectTheme}
                    />

                    {/* Notification Bell Dropdown */}
                    <AdminNotificationDropdown isLight={isLight} />

                    {/* Single Profile Dropdown Component */}
                    <div className={`border-l pl-2.5 sm:pl-3 ${isLight ? "border-slate-200" : "border-slate-800"}`}>
                        <AdminProfileDropdown />
                    </div>
                </div>
            </header>

            {/* ==================================================
                LAYOUT BODY: SIDEBAR + MAIN CONTENT
            ================================================== */}
            <div className="flex flex-1 relative">

                {/* Desktop Executive Sidebar */}
                <aside
                    className={`
                        hidden
                        w-64
                        shrink-0
                        flex-col
                        justify-between
                        border-r
                        p-4
                        lg:flex
                        backdrop-blur-xl
                        transition-all duration-300
                        z-30
                        ${currentTheme.sidebarClass}
                    `}
                >
                    <div className="space-y-6 overflow-y-auto pr-1 custom-scrollbar">
                        {/* Navigation Groups */}
                        {adminNavGroups.map((group) => (
                            <div key={group.groupTitle} className="space-y-1.5">
                                <div className="flex items-center justify-between px-3 mb-1">
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                                        isLight ? "text-slate-400" : "text-slate-500"
                                    }`}>
                                        {group.groupTitle}
                                    </p>
                                    <span className="h-1 w-1 rounded-full bg-blue-500/50" />
                                </div>

                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                end={item.exact}
                                                className={({ isActive }) =>
                                                    `
                                                        group
                                                        relative
                                                        flex
                                                        items-center
                                                        justify-between
                                                        rounded-2xl
                                                        px-3.5
                                                        py-2.5
                                                        text-xs
                                                        font-extrabold
                                                        transition-all
                                                        duration-200
                                                        cursor-pointer
                                                        ${isActive
                                                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] border border-blue-400/30 scale-[1.02]"
                                                            : isLight
                                                                ? "text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 hover:translate-x-1"
                                                                : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100 hover:border hover:border-slate-800/80 hover:translate-x-1 hover:shadow-md"
                                                        }
                                                    `
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={`
                                                                flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-200 shrink-0
                                                                ${isActive
                                                                    ? "bg-white/20 text-white shadow-inner"
                                                                    : isLight
                                                                        ? "bg-slate-200/50 text-slate-500 group-hover:bg-blue-600/10 group-hover:text-blue-600"
                                                                        : "bg-slate-800/60 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400"
                                                                }
                                                            `}>
                                                                <IconComponent className="h-3.5 w-3.5" />
                                                            </div>
                                                            <span className="truncate tracking-wide">{item.name}</span>
                                                        </div>

                                                        {/* Active Status Beacon Indicator */}
                                                        {isActive ? (
                                                            <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] shrink-0" />
                                                        ) : (
                                                            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                                                                &rarr;
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Live AI Engine Core Status Card */}
                        <div className={`rounded-2xl border p-3 border-blue-500/20 backdrop-blur-md relative overflow-hidden ${
                            isLight ? "bg-blue-50/70 border-blue-200" : "bg-gradient-to-b from-slate-900/80 to-blue-950/40 border-blue-500/20"
                        }`}>
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${isLight ? "text-blue-900" : "text-blue-300"}`}>
                                        FINVERSE ENGINE
                                    </span>
                                </div>
                                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                    99.9% LIVE
                                </span>
                            </div>
                            <p className={`text-[10px] leading-tight ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                AI Neural Analytics & DB sync operational.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Footer User Profile Card */}
                    <div className={`rounded-2xl border p-3 mt-4 transition-all duration-200 shadow-lg ${
                        isLight
                            ? "border-slate-200 bg-slate-50/90 hover:bg-slate-100"
                            : "border-slate-800/90 bg-slate-950/80 hover:border-blue-500/40 hover:bg-slate-900/90 backdrop-blur-md"
                    }`}>
                        <div className="flex items-center justify-between">
                            <Link to="/admin/profile" className="flex items-center gap-2.5 overflow-hidden group cursor-pointer flex-1">
                                <div className="relative shrink-0">
                                    {user?.avatar_url || user?.avatar ? (
                                        <img
                                            src={user?.avatar_url || user?.avatar}
                                            alt={user?.full_name || "Admin"}
                                            className="h-9 w-9 rounded-xl object-cover ring-2 ring-blue-500/50 shadow-md group-hover:scale-105 group-hover:ring-blue-400 transition-all"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-xs font-black text-white shadow-md group-hover:scale-105 transition-transform">
                                            {(user?.full_name || "A").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                                </div>
                                <div className="overflow-hidden min-w-0">
                                    <p className={`text-xs font-black truncate group-hover:text-blue-400 transition ${isLight ? "text-slate-800" : "text-white"}`}>
                                        {user?.full_name || "Admin"}
                                    </p>
                                    <p className={`text-[10px] font-semibold truncate ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                                        {user?.email || "admin@finverse.ai"}
                                    </p>
                                </div>
                            </Link>

                            <button
                                onClick={logout}
                                className="rounded-xl p-2 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border hover:border-rose-500/30 transition-all cursor-pointer shrink-0 ml-1"
                                title="Logout Admin Session"
                            >
                                <FaSignOutAlt className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Drawer Sidebar */}
                {mobileOpen && (
                    <div className="fixed inset-0 z-50 flex lg:hidden">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Content */}
                        <div className={`relative flex w-72 max-w-xs flex-1 flex-col p-4 border-r z-50 shadow-2xl backdrop-blur-2xl ${currentTheme.sidebarClass}`}>
                            <div className={`flex items-center justify-between border-b pb-4 mb-4 ${isLight ? "border-slate-200" : "border-slate-800"}`}>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-black text-xs">
                                        F
                                    </div>
                                    <span className={`text-sm font-black tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>FINVERSE ADMIN</span>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 text-white"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-6 overflow-y-auto">
                                {adminNavGroups.map((group) => (
                                    <div key={group.groupTitle} className="space-y-1.5">
                                        <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            {group.groupTitle}
                                        </p>
                                        <div className="space-y-1">
                                            {group.items.map((item) => {
                                                const IconComponent = item.icon;
                                                return (
                                                    <NavLink
                                                        key={item.path}
                                                        to={item.path}
                                                        end={item.exact}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={({ isActive }) =>
                                                            `
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-xl
                                                                px-3.5
                                                                py-2.5
                                                                text-xs
                                                                font-extrabold
                                                                transition-all
                                                                ${isActive
                                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                                                    : isLight
                                                                        ? "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                                                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                                                                }
                                                            `
                                                        }
                                                    >
                                                        <IconComponent className="h-4 w-4 shrink-0" />
                                                        <span>{item.name}</span>
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Viewport */}
                <main className="relative z-10 flex-1 min-w-0 max-w-full overflow-x-hidden min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 transition-colors duration-300 bg-transparent">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default AdminLayout;
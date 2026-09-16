/**
 * ==========================================================
 * FINVERSE AI — Premium Top Navbar / Header
 * Revolut/Stripe-level top navigation bar with breadcrumb & actions
 * ==========================================================
 */
import React, { useState } from "react";
import { FaBars, FaPlus, FaChevronRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import CommandPalette from "./CommandPalette";
import CurrencySelector from "./CurrencySelector";
import AIQuickButton from "./AIQuickButton";
import Logo from "../../common/Logo";

function DashboardHeader({ onToggleMobileSidebar = () => {}, onSelectAction }) {
    const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Generate dynamic breadcrumb from location path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentPageName = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].replace(/-/g, " ").toUpperCase()
        : "LOANS SYSTEM";

    const handleApplyClick = () => {
        if (onSelectAction) {
            onSelectAction("apply");
        } else {
            navigate("/loans");
        }
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#090D16]/90 px-3 sm:px-6 backdrop-blur-md shadow-xs transition-colors duration-200">
                {/* Left Section: Mobile Menu Trigger + Desktop Breadcrumb */}
                <div className="flex items-center gap-3">
                    {/* Mobile Sidebar Hamburger Toggle */}
                    <button
                        onClick={onToggleMobileSidebar}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden transition cursor-pointer"
                        title="Open Menu"
                    >
                        <FaBars className="h-4 w-4" />
                    </button>

                    {/* Mobile Logo Branding (Visible only on < lg) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Logo size="sm" />
                    </div>

                    {/* Desktop Breadcrumb Context */}
                    <div className="hidden lg:flex items-center gap-2 text-xs font-bold select-none">
                        <span className="text-slate-400 uppercase tracking-widest text-[10px]">FINANCIAL OS</span>
                        <FaChevronRight className="h-2.5 w-2.5 text-slate-400" />
                        <span className="text-white tracking-wide text-xs bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md font-extrabold text-cyan-400">
                            {currentPageName}
                        </span>
                    </div>
                </div>

                {/* Middle Section: Command Search Bar Trigger */}
                <div className="hidden md:block max-w-xs w-full px-2">
                    <SearchBar onClick={() => setIsCmdPaletteOpen(true)} />
                </div>

                {/* Right Section: AI Ask + Currency + Apply CTA + Theme + Notifications + Profile */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <AIQuickButton />
                    <CurrencySelector />

                    {/* Quick Apply CTA Button */}
                    <button
                        onClick={handleApplyClick}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 border border-emerald-500/30 transition-all duration-150 cursor-pointer active:scale-95"
                    >
                        <FaPlus className="h-3 w-3" />
                        <span>Apply Loan</span>
                    </button>

                    <ThemeToggle />
                    <NotificationBell />
                    <ProfileDropdown />
                </div>
            </header>

            {/* Global Command Palette Modal */}
            <CommandPalette
                isOpen={isCmdPaletteOpen}
                onClose={() => setIsCmdPaletteOpen(false)}
                onSelectAction={onSelectAction}
            />
        </>
    );
}

export default DashboardHeader;
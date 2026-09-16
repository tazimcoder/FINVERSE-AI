import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

    const handleApplyClick = () => {
        if (onSelectAction) {
            onSelectAction("apply");
        } else {
            navigate("/loans");
        }
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-3 sm:px-6 backdrop-blur-md shadow-xs transition-colors duration-200">
                {/* Left Section: Mobile Menu Trigger + Brand */}
                <div className="flex items-center gap-3">
                    {/* Mobile Sidebar Hamburger Toggle */}
                    <button
                        onClick={onToggleMobileSidebar}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition cursor-pointer"
                        title="Open Menu"
                    >
                        <FaBars className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </button>

                    {/* Mobile Logo Branding (Visible only on < lg) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Logo size="sm" />
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

                    {/* Quick Apply Loan CTA Button */}
                    <button
                        onClick={handleApplyClick}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs hover:shadow transition-all duration-150 cursor-pointer active:scale-95"
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
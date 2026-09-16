/**
 * ==========================================================
 * FINVERSE AI
 * Executive Home Landing Navigation Bar
 * Features Subsystem Mega-Menu, Live Health Badge, and Responsive Mobile Drawer
 * ==========================================================
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaWallet,
    FaHandHoldingUsd,
    FaExchangeAlt,
    FaChartLine,
    FaRobot,
    FaShieldAlt,
    FaChevronDown,
    FaArrowRight,
    FaBars,
    FaTimes
} from "react-icons/fa";
import Logo from "../common/Logo";
import ThemeToggle from "../dashboard/header/ThemeToggle";

function HomeNavbar() {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const subsystems = [
        {
            title: "Digital Banking & Accounts",
            desc: "Checking, savings & multi-currency wallets.",
            icon: FaWallet,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Smart Loans Marketplace",
            desc: "Paperless loans with automated credit scoring.",
            icon: FaHandHoldingUsd,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Audit Logs & History",
            desc: "System audit logs & security tracking.",
            icon: FaExchangeAlt,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Investment Portfolios",
            desc: "Stock tracking, mutual funds & net worth.",
            icon: FaChartLine,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Smart Financial Assistant",
            desc: "Intelligent expense advisory & budget alerts.",
            icon: FaRobot,
            color: "text-cyan-600",
            bg: "bg-cyan-50"
        },
        {
            title: "Enterprise Audit & Security",
            desc: "Role-based controls & immutable audit logs.",
            icon: FaShieldAlt,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        }

    ];

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md shadow-slate-200/50 border-b border-slate-200"
                    : "bg-white/70 backdrop-blur-sm border-b border-slate-200/60"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Logo light={false} />
                    </Link>
                </div>


                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">

                    {/* Subsystems Mega Menu Trigger */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                        <button
                            type="button"
                            className="flex items-center gap-1.5 py-2 text-slate-700 hover:text-blue-600 transition cursor-pointer"
                        >
                            <span>Subsystems</span>
                            <FaChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                        </button>

                        {/* Mega Menu Dropdown */}
                        {isMegaMenuOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 grid grid-cols-2 gap-4 animate-message-fadeIn">
                                {subsystems.map((sub) => {
                                    const SubIcon = sub.icon;
                                    return (
                                        <div
                                            key={sub.title}
                                            onClick={() => scrollToSection("core-components")}
                                            className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-100"
                                        >
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sub.bg} border border-slate-200/60 group-hover:scale-105 transition-transform`}>
                                                <SubIcon className={`h-4 w-4 ${sub.color}`} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                                                    {sub.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                                                    {sub.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollToSection("core-components")}
                        className="hover:text-blue-600 transition cursor-pointer"
                    >
                        Modules
                    </button>

                    <Link
                        to="/login"
                        className="hover:text-blue-600 transition cursor-pointer"
                    >
                        Banking
                    </Link>

                    <Link
                        to="/login"
                        className="hover:text-blue-600 transition cursor-pointer"
                    >
                        Loans
                    </Link>

                    <Link
                        to="/login"
                        className="hover:text-blue-600 transition cursor-pointer"
                    >
                        Investments
                    </Link>
                </nav>

                {/* Right Action Buttons */}
                <div className="hidden sm:flex items-center gap-3">
                    <ThemeToggle />

                    <Link
                        to="/login"
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition cursor-pointer"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                    >
                        <span>Create Account</span>
                        <FaArrowRight className="h-3 w-3" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition cursor-pointer"
                >
                    {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                </button>

            </div>

            {/* Mobile Drawer Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 animate-message-fadeIn shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-700">Theme Mode</span>
                        <ThemeToggle />
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                            FINVERSE Subsystems
                        </p>
                        {subsystems.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                                <button
                                    key={sub.title}
                                    type="button"
                                    onClick={() => scrollToSection("core-components")}
                                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-left cursor-pointer"
                                >
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${sub.bg}`}>
                                        <SubIcon className={`h-4 w-4 ${sub.color}`} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{sub.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                        <Link
                            to="/login"
                            className="w-full text-center rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="w-full text-center rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <span>Create Account</span>
                            <FaArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default HomeNavbar;

/**
 * ==========================================================
 * FINVERSE AI — Executive Landing Navigation Bar
 * Dark glass navbar with subsystem mega-menu, live health badge & ambient glow
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

function HomeNavbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subsystems = [
    {
      title: "Digital Banking & Accounts",
      desc: "Checking, savings & multi-currency wallets.",
      icon: FaWallet,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Smart Loans Marketplace",
      desc: "Paperless loans with automated credit scoring.",
      icon: FaHandHoldingUsd,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Audit Ledger & History",
      desc: "System audit logs & security tracking.",
      icon: FaExchangeAlt,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Investment Portfolios",
      desc: "Stock tracking, mutual funds & net worth.",
      icon: FaChartLine,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "AI Financial Advisor",
      desc: "Autonomous advisory & cash flow optimization.",
      icon: FaRobot,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Enterprise Security",
      desc: "Role-based controls & encrypted data flow.",
      icon: FaShieldAlt,
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl shadow-slate-950/80"
          : "bg-[#090D16]/70 backdrop-blur-md border-b border-slate-800/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo light={true} />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          {/* Subsystems Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 py-2 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <span>Subsystems</span>
              <FaChevronDown
                className={`h-2.5 w-2.5 transition-transform duration-200 ${
                  isMegaMenuOpen ? "rotate-180 text-cyan-400" : "text-slate-500"
                }`}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-[#0F172A]/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-slate-800 grid grid-cols-2 gap-3 animate-scale-pop">
                {subsystems.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                    <div
                      key={sub.title}
                      onClick={() => scrollToSection("core-components")}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition cursor-pointer border border-transparent hover:border-slate-700/60"
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${sub.bg}`}>
                        <SubIcon className={`h-4 w-4 ${sub.color}`} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
                          {sub.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-snug">
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
            className="hover:text-white transition cursor-pointer"
          >
            Modules
          </button>

          <Link to="/login" className="hover:text-white transition cursor-pointer">
            Banking
          </Link>

          <Link to="/login" className="hover:text-white transition cursor-pointer">
            Loans
          </Link>

          <Link to="/login" className="hover:text-white transition cursor-pointer">
            Investments
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold px-5 py-2 text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer fin-btn-press"
          >
            <span>Launch App</span>
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition cursor-pointer"
        >
          {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0F172A] px-6 py-6 space-y-4 shadow-2xl animate-fade-in-up">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              FINVERSE Subsystems
            </p>
            {subsystems.map((sub) => {
              const SubIcon = sub.icon;
              return (
                <button
                  key={sub.title}
                  type="button"
                  onClick={() => scrollToSection("core-components")}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 text-left cursor-pointer"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${sub.bg}`}>
                    <SubIcon className={`h-4 w-4 ${sub.color}`} />
                  </div>
                  <span className="text-xs font-bold text-white">{sub.title}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link
              to="/login"
              className="w-full text-center rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-full text-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-2.5 text-xs font-extrabold text-slate-950 flex items-center justify-center gap-2"
            >
              <span>Launch App</span>
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default HomeNavbar;

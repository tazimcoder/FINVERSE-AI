/**
 * ==========================================================
 * FINVERSE AI — Executive Home Landing Footer
 * Dark glass footer with team authorship & security badges
 * ==========================================================
 */

import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie, FaArrowRight, FaLock, FaShieldAlt } from "react-icons/fa";
import Logo from "../common/Logo";

function HomeFooter() {
  const companyAuthors = [
    { name: "Firoz Khan", role: "Founder & Lead Architect" },
    { name: "Imran Khan", role: "Core Systems Engineer" },
    { name: "Sharukh Khan", role: "Security & Infrastructure" },
    { name: "Arshad Khan", role: "Fintech Ledger Engineer" },
    { name: "Nadeem Khan", role: "Full-Stack Developer" },
    { name: "Tazim Kassar", role: "Platform Intelligence" },
    { name: "Salman Khan", role: "Manager" },
    { name: "Danish Khan", role: "Builder & Director" },
  ];

  const subsystems = [
    { name: "Digital Banking & Accounts", path: "/login" },
    { name: "Smart Loans Marketplace", path: "/login" },
    { name: "Real-Time Transactions", path: "/login" },
    { name: "Investment Portfolios", path: "/login" },
    { name: "Smart Financial Assistant", path: "/login" },
    { name: "Enterprise Security", path: "/login" },
  ];

  return (
    <footer className="relative z-20 border-t border-slate-800/80 bg-[#090D16] pt-16 pb-8 text-slate-400 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Security */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-xs text-slate-400 leading-relaxed font-medium mt-3">
              FINVERSE AI is an executive financial operating system unifying digital banking, automated credit scoring, real-time transaction ledgers, and autonomous AI advisory.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-emerald-400 font-mono">
              <FaShieldAlt className="text-emerald-400 h-3 w-3" />
              <span>256-BIT ENTERPRISE SSL ENCRYPTED</span>
            </div>
          </div>

          {/* Column 2: Subsystems */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform Subsystems
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              {subsystems.map((sub) => (
                <li key={sub.name}>
                  <Link
                    to={sub.path}
                    className="hover:text-cyan-400 transition flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                    <span>{sub.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Authorship */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <FaUserTie className="text-cyan-400" />
              <span>Company Authors</span>
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 text-xs">
              {companyAuthors.map((author) => (
                <li key={author.name} className="flex items-center gap-2.5 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white group-hover:text-cyan-400 transition block leading-tight">
                      {author.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {author.role}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Gateway Buttons */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Workspace Gateways
            </h4>
            <div className="space-y-2.5">
              <Link
                to="/login"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition flex items-center justify-between group"
              >
                <span>Banking Portal</span>
                <FaArrowRight className="h-3 w-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register"
                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-xs font-extrabold text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/20 flex items-center justify-between group"
              >
                <span>Launch Application</span>
                <FaArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p className="text-[11px]">
            © {new Date().getFullYear()} FINVERSE AI. All rights reserved. Executive Financial Operating System.
          </p>

          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/" className="hover:text-cyan-400 transition">Privacy Policy</Link>
            <Link to="/" className="hover:text-cyan-400 transition">Terms of Service</Link>
            <Link to="/" className="hover:text-cyan-400 transition">Security Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;

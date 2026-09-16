/**
 * ==========================================================
 * FINVERSE
 * Executive Home Landing Page Footer Component
 * Features Company Authors & Leadership, Subsystem Navigation & Security Badges
 * ==========================================================
 */

import { Link } from "react-router-dom";
import {
    FaUserTie,
    FaArrowRight,
    FaLock
} from "react-icons/fa";
import Logo from "../common/Logo";

function HomeFooter() {
    const companyAuthors = [
        { name: "Firoz Khan", role: "Founder & Lead Architect" },
        { name: "Imran Khan", role: "Core Systems Engineer" },
        { name: "Sharukh Khan", role: "Security & Infrastructure" },
        { name: "Arshad Khan", role: "Fintech Ledger Engineer" },
        { name: "Nadeem Khan", role: "Full-Stack Developer" },
        { name: "Tazim Kassar", role: "Platform Intelligence" },
        {name: "Salman khan", role: "Manager"},
        {name:"Danish khan", role:"Builder & Director"}
    ];

    const subsystems = [
        { name: "Digital Banking & Accounts", path: "/login" },
        { name: "Smart Loans Marketplace", path: "/login" },
        { name: "Real-Time Transactions", path: "/login" },
        { name: "Investment Portfolios", path: "/login" },
        { name: "Smart Financial Assistant", path: "/login" },
        { name: "Enterprise Audit & Security", path: "/login" }
    ];

    return (
        <footer className="relative z-50 border-t border-slate-200 bg-white pt-16 pb-8 text-slate-600">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-100">

                    {/* Column 1: Brand & Overview */}
                    <div className="space-y-4">
                        <Logo light={false} />
                        <p className="text-xs text-slate-500 leading-relaxed font-medium mt-3">
                            FINVERSE is an executive financial operating system unifying digital banking, automated credit assessment, real-time transaction ledgers, and enterprise audit security.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                            <FaLock className="text-blue-600 h-3 w-3" />
                            <span>Enterprise 256-Bit SSL Encrypted</span>
                        </div>
                    </div>

                    {/* Column 2: Platform Subsystems */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
                            Platform Subsystems
                        </h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                            {subsystems.map((sub) => (
                                <li key={sub.name}>
                                    <Link
                                        to={sub.path}
                                        className="hover:text-blue-600 transition flex items-center gap-1.5 group"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-blue-600 transition" />
                                        <span>{sub.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company Authors & Leadership */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                            <FaUserTie className="text-blue-600" />
                            <span>Company Authors</span>
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5 text-xs font-semibold text-slate-700">
                            {companyAuthors.map((author) => (
                                <li key={author.name} className="flex items-center gap-2 group">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition">
                                        {author.name.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition block leading-tight">
                                            {author.name}
                                        </span>
                                        <span className="text-[10px] font-normal text-slate-600 block">
                                            {author.role}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Quick Portal Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
                            Workspace Gateways
                        </h4>
                        <div className="space-y-2.5">
                            <Link
                                to="/login"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-800 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 transition flex items-center justify-between group"
                            >
                                <span>User Banking Portal</span>
                                <FaArrowRight className="h-3 w-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/register"
                                className="w-full rounded-xl bg-blue-600 p-3 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm flex items-center justify-between group"
                            >
                                <span>Create Account</span>
                                <FaArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright & Rights */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                    <p className="text-[11px]">
                        © {new Date().getFullYear()} FINVERSE. All rights reserved. Executive Financial Operating System.
                    </p>

                    <div className="flex items-center gap-6 text-[11px]">
                        <Link to="/" className="hover:text-blue-600 transition">Privacy Policy</Link>
                        <Link to="/" className="hover:text-blue-600 transition">Terms of Service</Link>
                        <Link to="/" className="hover:text-blue-600 transition">Security Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default HomeFooter;

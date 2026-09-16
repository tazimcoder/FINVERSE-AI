/**
 * ==========================================================
 * FINVERSE
 * Executive Auth Brand Component (FINVERSE Feature Showcase)
 * Premium Light Theme with Curated Palette
 * ==========================================================
 */

import Logo from "../common/Logo";
import {
    FaShieldAlt,
    FaWallet,
    FaHandHoldingUsd,
    FaExchangeAlt,
    FaChartLine,
    FaRobot
} from "react-icons/fa";

function AuthBrand() {
    const features = [
        {
            title: "Digital Banking & Accounts",
            desc: "Multi-account management, checking, savings & live balance tracking.",
            icon: FaWallet,
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
        },
        {
            title: "Smart Loans Marketplace",
            desc: "Instant credit scoring, loan applications & approval status auditing.",
            icon: FaHandHoldingUsd,
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
        },
        {
            title: "Real-Time Transactions",
            desc: "Instant money transfers, income/expense auditing & category analytics.",
            icon: FaExchangeAlt,
            color: "text-indigo-600",
            bg: "bg-indigo-50 border-indigo-100",
        },
        {
            title: "Investment Portfolios",
            desc: "Stock market tracking, mutual funds, asset allocation & net valuation.",
            icon: FaChartLine,
            color: "text-purple-600",
            bg: "bg-purple-50 border-purple-100",
        },
        {
            title: "Smart Financial Assistant",
            desc: "Intelligent spend analysis, budget recommendations & fraud alerts.",
            icon: FaRobot,
            color: "text-cyan-600",
            bg: "bg-cyan-50 border-cyan-100",
        },
    ];

    return (
        <div className="flex flex-col justify-between h-full text-slate-900 space-y-8 py-2">
            {/* Brand Header */}
            <div>
                <Logo light={false} />

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
                    <FaShieldAlt className="h-3 w-3 text-emerald-600" />
                    <span>ENTERPRISE BANKING ENGINE</span>
                </div>

                <h1 className="mt-4 text-3xl xl:text-4xl font-black leading-tight tracking-tight text-slate-900">
                    Global Financial <br />
                    <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                        Operating System
                    </span>
                </h1>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-md font-medium">
                    Integrated platform for personal & corporate banking, loans, investments, analytics, and smart wealth decisions.
                </p>
            </div>

            {/* FINVERSE Active Module List */}
            <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Core Platform Subsystems
                </p>

                <div className="space-y-2">
                    {features.map((feat) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={feat.title}
                                className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-3 shadow-xs transition hover:border-blue-300 hover:shadow-md"
                            >
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${feat.bg}`}>
                                    <Icon className={`h-4 w-4 ${feat.color}`} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                        {feat.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 leading-tight font-medium">
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500">
                <p>FINVERSE • Digital Financial System</p>
            </div>
        </div>
    );
}

export default AuthBrand;
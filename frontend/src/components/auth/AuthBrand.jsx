/**
 * ==========================================================
 * FINVERSE AI — Executive Auth Brand Component
 * Dark glass feature showcase with subsystem badges & AI orb indicator
 * ==========================================================
 */

import React from "react";
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
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Smart Loans Marketplace",
      desc: "Instant credit scoring, loan applications & approval status auditing.",
      icon: FaHandHoldingUsd,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Real-Time Transactions",
      desc: "Instant money transfers, income/expense auditing & category analytics.",
      icon: FaExchangeAlt,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Investment Portfolios",
      desc: "Stock market tracking, mutual funds, asset allocation & net valuation.",
      icon: FaChartLine,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Smart Financial Assistant",
      desc: "Intelligent spend analysis, budget recommendations & fraud alerts.",
      icon: FaRobot,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full text-slate-100 space-y-8 py-2 font-sans animate-fade-in-up">
      {/* Brand Header */}
      <div>
        <Logo light={true} />

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/90 px-3.5 py-1 text-xs font-bold text-cyan-300">
          <FaShieldAlt className="h-3 w-3 text-emerald-400" />
          <span>ENTERPRISE BANKING ENGINE</span>
        </div>

        <h1 className="mt-4 text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight text-white">
          Global Financial <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400">
            Operating System
          </span>
        </h1>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-md font-medium">
          Integrated platform for personal & corporate banking, loans, investments, analytics, and smart wealth decisions.
        </p>
      </div>

      {/* FINVERSE Active Module List */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
          Core Platform Subsystems
        </p>

        <div className="space-y-2.5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex items-center gap-3.5 rounded-xl border border-slate-800/90 bg-slate-900/80 p-3 shadow-md transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-800/90"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${feat.bg}`}>
                  <Icon className={`h-4 w-4 ${feat.color}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-tight font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/80 pt-4 text-xs font-semibold text-slate-400 flex items-center justify-between">
        <p>FINVERSE • Digital Financial System</p>
        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
          SSL SECURED
        </span>
      </div>
    </div>
  );
}

export default AuthBrand;
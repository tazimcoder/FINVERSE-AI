/**
 * ==========================================================
 * FINVERSE AI — Live Financial Context Sidebar
 * Executive 3rd-column context panel for AI Financial Assistant
 * Pulls live account metrics, active loans, and cash flow ratios
 * ==========================================================
 */

import React from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaHeartbeat,
  FaLightbulb,
  FaChevronRight,
  FaShieldAlt
} from "react-icons/fa";
import useDashboard from "../../dashboard/hooks/useDashboard";
import useLoans from "../../loan/hooks/useLoans";

export default function AIContextSidebar({ onQuickPrompt }) {
  const { dashboardData, loading: dashLoading } = useDashboard();
  const { activeLoans, loading: loansLoading } = useLoans();

  const balance = Number(dashboardData?.balance || 0);
  const income = Number(dashboardData?.monthlyIncome || 0);
  const expenses = Number(dashboardData?.monthlyExpense || 0);
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  const totalActiveLoanAmount = (activeLoans || []).reduce(
    (sum, l) => sum + Number(l.amount || l.loan_amount || 0),
    0
  );

  return (
    <aside className="w-full h-full bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto space-y-5 text-slate-200">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live Financial Context
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full border border-slate-700">
            REAL-TIME
          </span>
        </div>

        {/* Live Metrics Grid */}
        <div className="space-y-3">
          {/* Total Balance */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <FaWallet className="text-cyan-400 h-3 w-3" /> Total Liquidity
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>
            </div>
            <p className="text-xl font-extrabold text-white tabular-nums tracking-tight">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Cashflow Summary */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-1">
                <FaArrowUp className="text-emerald-400 h-2.5 w-2.5" /> Income
              </span>
              <p className="text-sm font-bold text-white tabular-nums">
                ${income.toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-1">
                <FaArrowDown className="text-rose-400 h-2.5 w-2.5" /> Expenses
              </span>
              <p className="text-sm font-bold text-white tabular-nums">
                ${expenses.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Savings Health & Active Loans */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <FaHeartbeat className="text-rose-400 h-3 w-3" /> Cash Savings Margin
              </span>
              <span className="font-bold text-emerald-400 tabular-nums">{savingsRate}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(savingsRate, 0), 100)}%` }}
              />
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <FaCreditCard className="text-violet-400 h-3 w-3" /> Active Debt Obligation
              </span>
              <span className="font-bold text-white tabular-nums">
                ${totalActiveLoanAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Context Prompts */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2.5">
          <FaLightbulb className="text-amber-400 h-3 w-3" /> Suggested AI Queries
        </div>

        <div className="space-y-2">
          {[
            "How can I increase my monthly savings margin?",
            "Am I eligible for a $10,000 top-up loan?",
            "Analyze my cash flow & expense breakdown",
            "Generate an optimal EMI repayment strategy",
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onQuickPrompt && onQuickPrompt(prompt)}
              className="w-full text-left p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate pr-2">{prompt}</span>
              <FaChevronRight className="text-slate-500 group-hover:text-cyan-400 h-2.5 w-2.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Security badge */}
      <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1 font-mono">
        <FaShieldAlt className="text-emerald-500/70 h-2.5 w-2.5" /> 256-BIT ENCRYPTED CONTEXT STREAM
      </div>
    </aside>
  );
}

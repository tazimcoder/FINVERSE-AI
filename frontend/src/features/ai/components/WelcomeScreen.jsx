/**
 * ==========================================================
 * FINVERSE AI — Welcome Screen
 * Executive dark AI starter workspace with glowing orb & prompt cards
 * ==========================================================
 */

import React from "react";
import { FaRobot, FaLightbulb, FaShieldAlt, FaChartLine, FaPiggyBank, FaCreditCard } from "react-icons/fa";

function WelcomeScreen({ onPromptClick }) {
  const prompts = [
    {
      title: "Evaluate Loan Eligibility",
      description: "Check if my current cash flow supports a $15,000 top-up loan.",
      icon: <FaCreditCard className="text-cyan-400 h-4 w-4" />,
    },
    {
      title: "Analyze Monthly Expenditures",
      description: "Break down top spending categories and highlight recurring anomalies.",
      icon: <FaChartLine className="text-emerald-400 h-4 w-4" />,
    },
    {
      title: "Optimize Wealth & Savings",
      description: "Suggest high-yield vault strategies to grow my excess liquidity.",
      icon: <FaPiggyBank className="text-violet-400 h-4 w-4" />,
    },
    {
      title: "Tax Savings Advisory",
      description: "Identify potential deductions based on my financial profile.",
      icon: <FaShieldAlt className="text-amber-400 h-4 w-4" />,
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-10 my-auto">
      {/* Animated AI Pulse Orb */}
      <div className="w-16 h-16 rounded-full fin-ai-orb flex items-center justify-center text-white mb-6 shadow-2xl">
        <FaRobot className="h-8 w-8 text-white drop-shadow" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        FINVERSE AI Autonomous Advisor
      </h2>

      <p className="text-xs sm:text-sm text-slate-400 mt-2 mb-8 max-w-xl font-medium leading-relaxed">
        Powered by Gemini 2.5 Flash. Ask complex questions about loan servicing, debt consolidation, budget optimization, and yield strategies.
      </p>

      {/* Suggested Executive Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-2xl">
        {prompts.map((item, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(item.description)}
            className="group p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-800/90 hover:border-cyan-500/40 text-left transition-all duration-200 fin-card-hover cursor-pointer"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              {item.icon}
              <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
                {item.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-normal line-clamp-2">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
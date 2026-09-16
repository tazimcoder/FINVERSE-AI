/**
 * ==========================================================
 * FINVERSE AI — Subsystem Process Tree Modal
 * Executive dark process tree modal with expandable architecture flow
 * ==========================================================
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaCheckCircle,
  FaArrowRight,
  FaSitemap,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaShieldAlt
} from "react-icons/fa";

function ModuleProcessTreeModal({ module, isOpen, onClose }) {
  const [expandedNode, setExpandedNode] = useState(null);

  if (!isOpen || !module) return null;

  const Icon = module.icon;

  const toggleNode = (index) => {
    setExpandedNode(expandedNode === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-scale-pop">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 text-slate-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-4 pt-2">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${module.lightBg} shadow-lg shrink-0`}>
              <Icon className={`h-6 w-6 ${module.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700">
                  {module.tag}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <FaSitemap className="h-3 w-3" /> Process Tree Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {module.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="my-5 overflow-y-auto pr-2 space-y-5 font-sans">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-3.5 text-xs text-slate-300 leading-relaxed font-medium">
            <p className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
              <FaCog className="text-cyan-400" /> Architecture Overview
            </p>
            {module.desc}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FaSitemap className="text-cyan-400" /> Execution Process Flow
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">4-Stage Pipeline</span>
          </div>

          {/* Process Steps Tree */}
          <div className="relative pl-6 space-y-5 border-l-2 border-slate-800 ml-3">
            {module.treeSteps?.map((step, idx) => {
              const isExpanded = expandedNode === idx;

              return (
                <div key={step.stepNumber} className="relative group">
                  <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F172A] border-2 border-cyan-500 text-cyan-400 text-[10px] font-bold shadow-md">
                    {idx + 1}
                  </div>

                  <div
                    onClick={() => toggleNode(idx)}
                    className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-800/90 cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[10px] font-bold px-2 py-0.5">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      </div>
                      <span className="text-slate-400 text-xs">
                        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-300 font-medium leading-relaxed">
                      {step.action}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-cyan-400 font-semibold">├── Input:</span>
                        <span className="text-slate-200">{step.input}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-violet-400 font-semibold">├── Engine:</span>
                        <span className="text-slate-200">{step.engine}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-emerald-400 font-semibold">└── Output:</span>
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          {step.output}
                        </span>
                      </div>
                    </div>

                    {isExpanded && step.subNodes && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 animate-fade-in-up">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Sub-Process Verifications
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium">
                          {step.subNodes.map((sub, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1.5">
                              <FaCheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <FaShieldAlt className="text-emerald-400 h-3 w-3" />
            <span>FINVERSE AI Module Pipeline Architecture</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
            >
              Close
            </button>
            <Link
              to="/login"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 text-xs font-extrabold text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Access Module</span>
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleProcessTreeModal;

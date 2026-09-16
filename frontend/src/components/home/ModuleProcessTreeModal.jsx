/**
 * ==========================================================
 * FINVERSE AI
 * Subsystem Process Tree Modal Component
 * Displays Step-by-Step Tree Process Diagrams for Modules
 * ==========================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaTimes,
    FaCheckCircle,
    FaArrowRight,
    FaSitemap,
    FaChevronDown,
    FaChevronRight,
    FaCog,
    FaDatabase,
    FaShieldAlt,
    FaRocket
} from "react-icons/fa";

function ModuleProcessTreeModal({ module, isOpen, onClose }) {
    const [expandedNode, setExpandedNode] = useState(null);

    if (!isOpen || !module) return null;

    const Icon = module.icon;


    const toggleNode = (index) => {
        setExpandedNode(expandedNode === index ? null : index);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-messageFadeIn">
            <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">

                {/* Ambient Top Light Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-500" />

                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-5 pt-2">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${module.lightBg} shadow-xs`}>
                            <Icon className={`h-6 w-6 ${module.iconColor}`} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                    {module.tag}
                                </span>
                                <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                                    <FaSitemap className="h-3 w-3" /> Process Tree Active
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                                {module.title}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body: Process Tree Diagram */}
                <div className="my-6 overflow-y-auto pr-2 space-y-6">

                    {/* Subsystem Description Box */}
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-xs text-slate-700 leading-relaxed font-medium">
                        <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                            <FaCog className="text-blue-600" /> Architecture Overview
                        </p>
                        {module.desc}
                    </div>

                    {/* Tree Process Diagram Title */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <FaSitemap className="text-blue-600" /> Module Execution Process Tree
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">
                            4-Stage Sequential Flow
                        </span>
                    </div>

                    {/* Vertical Connected Tree Nodes */}
                    <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 ml-3">
                        {module.treeSteps?.map((step, idx) => {
                            const isExpanded = expandedNode === idx;

                            return (
                                <div key={step.stepNumber} className="relative group">
                                    {/* Tree Node Point Marker */}
                                    <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-blue-600 text-blue-600 text-[10px] font-bold shadow-xs">
                                        {idx + 1}
                                    </div>

                                    {/* Tree Card Box */}
                                    <div
                                        onClick={() => toggleNode(idx)}
                                        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-md cursor-pointer select-none"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <span className="rounded-md bg-blue-600 text-white font-mono text-[10px] font-bold px-2 py-0.5">
                                                    {step.stepNumber}
                                                </span>
                                                <h4 className="text-sm font-extrabold text-slate-900">
                                                    {step.title}
                                                </h4>
                                            </div>
                                            <span className="text-slate-400 text-xs">
                                                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
                                            {step.action}
                                        </p>

                                        {/* Sub-Tree Branches (Expandable Process Nodes) */}
                                        <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 font-mono text-[11px]">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="text-blue-500 font-bold">├── Input Data:</span>
                                                <span className="text-slate-800 font-semibold">{step.input}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="text-indigo-500 font-bold">├── Engine Action:</span>
                                                <span className="text-slate-800 font-semibold">{step.engine}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <span className="text-emerald-600 font-bold">└── Result Output:</span>
                                                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                    {step.output}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Extra Nested Details when Expanded */}
                                        {isExpanded && step.subNodes && (
                                            <div className="mt-3 p-3 rounded-xl bg-white border border-blue-100 space-y-2 animate-messageFadeIn">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Nested Sub-Processes
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium">
                                                    {step.subNodes.map((sub, sIdx) => (
                                                        <div key={sIdx} className="flex items-center gap-1.5">
                                                            <FaCheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
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

                {/* Modal Footer Actions */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <FaShieldAlt className="text-emerald-500" />
                        <span>FINVERSE AI Module Architecture • Verified Flow</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        >
                            Close Tree
                        </button>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
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

/**
 * ==========================================================
 * FINVERSE AI — Success State Primitive
 * Executive post-action confirmation moment with subtle micro-animations
 * ==========================================================
 */

import React from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../Button/Button";

export default function SuccessState({
  title = "Action Successful",
  description = "Your transaction or application has been processed cleanly.",
  details = [],
  actionLabel = "Continue to Dashboard",
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-slate-900/90 border border-emerald-500/20 rounded-2xl shadow-2xl backdrop-blur-xl animate-scale-pop max-w-md mx-auto">
      {/* Subtle Glowing Emerald Emblem */}
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10 animate-glow-pulse">
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
          <FaCheck className="h-5 w-5" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white tracking-tight mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 font-medium leading-relaxed">
        {description}
      </p>

      {details.length > 0 && (
        <div className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 mb-6 text-left space-y-2">
          {details.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">{item.label}</span>
              <span className="text-white font-semibold tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {onAction && (
        <Button variant="emerald" size="md" onClick={onAction} className="w-full justify-center">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

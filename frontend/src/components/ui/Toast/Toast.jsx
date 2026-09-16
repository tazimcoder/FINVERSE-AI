/**
 * ==========================================================
 * FINVERSE AI — Toast Notification Primitive
 * Executive non-blocking toast notifications (Success, Warning, Error, Info)
 * ==========================================================
 */

import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const TOAST_STYLES = {
  success: {
    bg: "bg-emerald-950/90 border-emerald-500/40 text-emerald-100",
    icon: <FaCheckCircle className="text-emerald-400 shrink-0 h-4 w-4" />,
  },
  warning: {
    bg: "bg-amber-950/90 border-amber-500/40 text-amber-100",
    icon: <FaExclamationTriangle className="text-amber-400 shrink-0 h-4 w-4" />,
  },
  error: {
    bg: "bg-rose-950/90 border-rose-500/40 text-rose-100",
    icon: <FaTimesCircle className="text-rose-400 shrink-0 h-4 w-4" />,
  },
  info: {
    bg: "bg-cyan-950/90 border-cyan-500/40 text-cyan-100",
    icon: <FaInfoCircle className="text-cyan-400 shrink-0 h-4 w-4" />,
  },
};

export default function Toast({ type = "info", title, message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!duration || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const style = TOAST_STYLES[type] || TOAST_STYLES.info;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        fixed bottom-5 right-5 z-50 max-w-sm w-full p-4 rounded-xl border backdrop-blur-md shadow-2xl
        flex items-start gap-3.5 animate-toast-slide ${style.bg}
      `}
    >
      <div className="pt-0.5">{style.icon}</div>

      <div className="flex-1 min-w-0">
        {title && <h4 className="text-sm font-semibold tracking-tight">{title}</h4>}
        {message && <p className="text-xs text-slate-300 mt-0.5 leading-snug">{message}</p>}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 shrink-0"
          aria-label="Close notification"
        >
          <FaTimes className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

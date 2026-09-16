/**
 * ==========================================================
 * FINVERSE AI — Executive Chat Input Component
 * Dark glass input bar with micro-interactions & enter trigger
 * ==========================================================
 */

import React, { useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim() || loading) return;
    onSend(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Ask FINVERSE AI (e.g., 'Am I eligible for a $10,000 loan?')..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        className="
          w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/60
          rounded-xl px-4 py-3.5 pr-24 text-xs sm:text-sm text-white placeholder-slate-500
          outline-none transition shadow-inner font-sans disabled:opacity-50
        "
      />

      <div className="absolute right-2 flex items-center gap-1.5">
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="
            bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400
            text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs transition-all duration-150
            flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed fin-btn-press cursor-pointer
          "
        >
          {loading ? (
            <FaSpinner className="animate-spin h-3.5 w-3.5" />
          ) : (
            <>
              <span>Send</span>
              <FaPaperPlane className="h-3 w-3" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
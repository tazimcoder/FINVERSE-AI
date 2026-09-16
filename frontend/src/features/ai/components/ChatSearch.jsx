/**
 * ==========================================================
 * FINVERSE AI — Chat Search Component
 * Executive dark search bar with magnifying glass icon
 * ==========================================================
 */

import React from "react";
import { FaSearch } from "react-icons/fa";

function ChatSearch({ value, onChange }) {
  return (
    <div className="relative w-full">
      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-3 w-3" />
      <input
        type="text"
        placeholder="Filter sessions..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50
          rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500
          outline-none transition font-sans
        "
      />
    </div>
  );
}

export default ChatSearch;
/**
 * ==========================================================
 * FINVERSE AI — Chat Session Item Component
 * Dark glass button with active glow indicator & context options
 * ==========================================================
 */

import React, { useState } from "react";
import ChatOptions from "./ChatOptions";
import { FaCommentAlt, FaStar, FaEllipsisV } from "react-icons/fa";

function ChatItem({ chat, active, onClick, onRename, onDelete, onFavorite }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between text-xs cursor-pointer
          ${
            active
              ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-cyan-500/50 text-white font-semibold shadow-md"
              : "bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/80 text-slate-300 hover:text-white"
          }
        `}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          {chat.is_favorite ? (
            <FaStar className="text-amber-400 shrink-0 h-3 w-3" />
          ) : (
            <FaCommentAlt className={`shrink-0 h-3 w-3 ${active ? "text-cyan-400" : "text-slate-500"}`} />
          )}
          <span className="truncate">{chat.title}</span>
        </div>

        <button
          onClick={(event) => {
            event.stopPropagation();
            setOpenMenu(!openMenu);
          }}
          className="p-1 text-slate-400 hover:text-white transition rounded hover:bg-white/10 shrink-0"
          title="Session Options"
        >
          <FaEllipsisV className="h-2.5 w-2.5" />
        </button>
      </button>

      {openMenu && (
        <ChatOptions
          onRename={() => {
            setOpenMenu(false);
            onRename(chat);
          }}
          onDelete={() => {
            setOpenMenu(false);
            onDelete(chat);
          }}
          onFavorite={() => {
            setOpenMenu(false);
            onFavorite(chat);
          }}
        />
      )}
    </div>
  );
}

export default ChatItem;
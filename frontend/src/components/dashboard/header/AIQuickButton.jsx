import React from "react";
import { FaMagic } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AIQuickButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/ai")}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/10 to-indigo-600/10 hover:from-violet-600/20 hover:to-indigo-600/20 border border-violet-200 dark:border-violet-800/60 text-xs font-bold text-violet-700 dark:text-violet-300 transition-all cursor-pointer shadow-2xs group"
            title="Ask AI Financial Assistant"
        >
            <FaMagic className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 group-hover:rotate-12 transition-transform" />
            <span>Ask AI</span>
        </button>
    );
}

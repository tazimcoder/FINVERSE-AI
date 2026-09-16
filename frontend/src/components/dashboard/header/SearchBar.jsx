import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer group"
        >
            <div className="flex items-center gap-2">
                <FaSearch className="h-3 w-3 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
                <span>Search loan, EMI, CIBIL...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
                ⌘K
            </kbd>
        </button>
    );
}

export default SearchBar;
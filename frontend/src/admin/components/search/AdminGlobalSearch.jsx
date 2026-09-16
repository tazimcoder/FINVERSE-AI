/**
 * ==========================================================
 * FINVERSE AI
 * Real-Time Global Search Component
 * ==========================================================
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaUsers,
    FaWallet,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaSpinner,
    FaTimes
} from "react-icons/fa";
import { searchAdminPlatformApi } from "../../api/adminSearchApi";

function AdminGlobalSearch() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Debounced search
    useEffect(() => {
        if (!query.trim() || query.trim().length < 2) {
            setResults(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await searchAdminPlatformApi(query.trim());
                if (res?.success) {
                    setResults(res.data);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (path) => {
        setIsOpen(false);
        setQuery("");
        navigate(path);
    };

    const hasResults =
        results &&
        (results.users?.length > 0 ||
            results.accounts?.length > 0 ||
            results.transactions?.length > 0 ||
            results.loans?.length > 0);

    return (
        <div ref={containerRef} className="relative w-72 lg:w-96">
            <div className="relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (query.trim().length >= 2) setIsOpen(true);
                    }}
                    placeholder="Search users, accounts, transactions..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-1.5 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-500 transition focus:border-blue-500 focus:bg-slate-900 focus:outline-none"
                />

                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                        <FaTimes className="h-3 w-3" />
                    </button>
                )}

                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FaSpinner className="h-3 w-3 text-blue-400 animate-spin" />
                    </div>
                )}
            </div>

            {/* Dropdown Results Modal */}
            {isOpen && query.trim().length >= 2 && (
                <div className="absolute left-0 top-full mt-2 w-full max-h-96 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl z-50">
                    {!loading && !hasResults && (
                        <div className="p-4 text-center text-xs text-slate-500">
                            No matching results found for "{query}".
                        </div>
                    )}

                    {/* Users */}
                    {results?.users?.length > 0 && (
                        <div className="mb-3">
                            <p className="px-2 py-1 text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaUsers className="h-3 w-3" /> Users ({results.users.length})
                            </p>
                            <div className="space-y-1 mt-1">
                                {results.users.map((u) => (
                                    <div
                                        key={u.id}
                                        onClick={() => handleSelect("/admin/users")}
                                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 cursor-pointer transition"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">{u.full_name}</p>
                                            <p className="text-[10px] text-slate-400">{u.email}</p>
                                        </div>
                                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                                            {u.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Accounts */}
                    {results?.accounts?.length > 0 && (
                        <div className="mb-3">
                            <p className="px-2 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaWallet className="h-3 w-3" /> Bank Accounts ({results.accounts.length})
                            </p>
                            <div className="space-y-1 mt-1">
                                {results.accounts.map((a) => (
                                    <div
                                        key={a.id}
                                        onClick={() => handleSelect("/admin/accounts")}
                                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 cursor-pointer transition"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">{a.account_number}</p>
                                            <p className="text-[10px] text-slate-400">{a.owner_name} ({a.account_type})</p>
                                        </div>
                                        <span className="text-xs font-bold text-emerald-400">₹{a.balance}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Transactions */}
                    {results?.transactions?.length > 0 && (
                        <div className="mb-3">
                            <p className="px-2 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaExchangeAlt className="h-3 w-3" /> Transactions ({results.transactions.length})
                            </p>
                            <div className="space-y-1 mt-1">
                                {results.transactions.map((t) => (
                                    <div
                                        key={t.id}
                                        onClick={() => handleSelect("/admin/history")}
                                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 cursor-pointer transition"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">{t.description || t.category}</p>
                                            <p className="text-[10px] text-slate-400">{t.user_email}</p>
                                        </div>
                                        <span className={`text-xs font-bold ${t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                                            {t.type === "INCOME" ? "+" : "-"}₹{t.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Loans */}
                    {results?.loans?.length > 0 && (
                        <div>
                            <p className="px-2 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaFileInvoiceDollar className="h-3 w-3" /> Loans ({results.loans.length})
                            </p>
                            <div className="space-y-1 mt-1">
                                {results.loans.map((l) => (
                                    <div
                                        key={l.id}
                                        onClick={() => handleSelect("/admin/loans")}
                                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 cursor-pointer transition"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">#{l.application_number}</p>
                                            <p className="text-[10px] text-slate-400">{l.borrower_name} ({l.purpose})</p>
                                        </div>
                                        <span className="text-xs font-bold text-amber-400">₹{l.requested_amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminGlobalSearch;

import React, { useState, useEffect } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

export default function CurrencySelector() {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem("finverse_currency") || "INR";
    });
    const [isOpen, setIsOpen] = useState(false);

    const currencies = [
        { code: "INR", symbol: "₹", label: "INR (₹)" },
        { code: "USD", symbol: "$", label: "USD ($)" },
        { code: "EUR", symbol: "€", label: "EUR (€)" },
    ];

    const handleSelect = (code) => {
        setCurrency(code);
        localStorage.setItem("finverse_currency", code);
        setIsOpen(false);
    };

    return (
        <div className="relative hidden sm:block">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
                <FaGlobe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{currency}</span>
                <FaChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden animate-scale-pop p-1 space-y-0.5">
                    {currencies.map((item) => (
                        <button
                            key={item.code}
                            onClick={() => handleSelect(item.code)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                currency === item.code
                                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            <span>{item.label}</span>
                            <span className="font-mono text-[11px] font-bold">{item.symbol}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

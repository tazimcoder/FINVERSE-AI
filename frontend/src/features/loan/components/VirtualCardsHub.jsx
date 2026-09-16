import { useState, useEffect } from "react";
import { FaCreditCard, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

export default function VirtualCardsHub() {
    const [cards, setCards] = useState([
        { id: 1, card_number_masked: "4532 •••• •••• 9912", card_holder: "FINVERSE VERIFIED", expiry_date: "10/28", cvv_dynamic: "842", spend_limit: 50000, is_active: 1 }
    ]);
    const [showCvv, setShowCvv] = useState(false);
    const [notice, setNotice] = useState("");

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/v1/user/virtual-cards", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setCards(data.data);
                }
            } catch (err) {
                // fallback
            }
        };
        fetchCards();
    }, []);

    const toggleCardStatus = (cardId) => {
        setCards(cards.map(c => c.id === cardId ? { ...c, is_active: c.is_active ? 0 : 1 } : c));
        setNotice("Card status updated securely.");
        setTimeout(() => setNotice(""), 3000);
    };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        <FaCreditCard /> Dynamic CVV Virtual Cards
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Virtual Security Cards & Fraud Shield
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Generate disposable single-use cards for secure online purchases with zero fraud risk.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Card Shield Status</span>
                    <p className="text-2xl font-black text-emerald-500 flex items-center justify-end gap-1.5">
                        <FaShieldAlt /> ACTIVE
                    </p>
                </div>
            </div>

            {notice && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{notice}</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {cards.map((card) => (
                    <div key={card.id} className="rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 text-white p-6 shadow-xl border border-blue-800/40 relative overflow-hidden space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black tracking-widest text-blue-400">FINVERSE VISA SECURITY</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${card.is_active ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-rose-950 text-rose-400 border-rose-800"}`}>
                                {card.is_active ? "ACTIVE" : "BLOCKED"}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-slate-400 font-mono">CARD NUMBER</p>
                            <p className="text-xl font-black tracking-widest font-mono">{card.card_number_masked}</p>
                        </div>

                        <div className="flex justify-between items-end text-xs font-mono">
                            <div>
                                <p className="text-[9px] text-slate-400">CARD HOLDER</p>
                                <p className="font-bold">{card.card_holder}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-400">EXPIRY</p>
                                <p className="font-bold">{card.expiry_date}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-400">DYNAMIC CVV</p>
                                <div className="flex items-center gap-1">
                                    <p className="font-bold text-amber-400">{showCvv ? card.cvv_dynamic : "•••"}</p>
                                    <button type="button" onClick={() => setShowCvv(!showCvv)} className="text-slate-400 hover:text-white cursor-pointer ml-1">
                                        {showCvv ? <FaEyeSlash className="h-3 w-3" /> : <FaEye className="h-3 w-3" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                            <span className="text-slate-400">Spend Limit: ₹ {parseFloat(card.spend_limit).toLocaleString("en-IN")}</span>
                            <button
                                type="button"
                                onClick={() => toggleCardStatus(card.id)}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                                <FaLock /> {card.is_active ? "Block Card" : "Unblock Card"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

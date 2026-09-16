import { useState, useEffect } from "react";
import { FaGift, FaCoins, FaCheckCircle } from "react-icons/fa";

export default function FinverseRewardsHub() {
    const [rewards, setRewards] = useState({ coin_balance: 650, tier: "PLATINUM", total_earned: 1500 });
    const [notice, setNotice] = useState("");

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/v1/user/rewards", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && data.data) {
                    setRewards(data.data);
                }
            } catch (err) {
                // fallback
            }
        };
        fetchRewards();
    }, []);

    const handleRedeem = (rewardName, cost) => {
        if (rewards.coin_balance < cost) {
            setNotice("Insufficient FinCoins balance!");
            return;
        }
        setRewards({ ...rewards, coin_balance: rewards.coin_balance - cost });
        setNotice(`Redeemed "${rewardName}" successfully! Code applied.`);
        setTimeout(() => setNotice(""), 4000);
    };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        <FaGift /> On-Time EMI Payment Rewards
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Finverse FinCoins & Cashback Hub
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Earn FinCoins on every on-time EMI payment. Redeem coins for EMI cashback and zero processing fee vouchers.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">FinCoins Balance</span>
                    <p className="text-2xl font-black text-amber-500 flex items-center justify-end gap-1.5">
                        <FaCoins /> {rewards.coin_balance} <span className="text-xs text-slate-400">PTS</span>
                    </p>
                </div>
            </div>

            {notice && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                    <span>{notice}</span>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">₹ 500 EMI Cashback Voucher</h4>
                            <p className="text-xs text-slate-400">Directly credited to next EMI</p>
                        </div>
                        <FaGift className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Cost</span>
                        <span className="text-amber-500">250 FinCoins</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRedeem("₹ 500 EMI Cashback Voucher", 250)}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                        Redeem Voucher
                    </button>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Processing Fee Pass</h4>
                            <p className="text-xs text-slate-400">Valid for any new loan</p>
                        </div>
                        <FaGift className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Cost</span>
                        <span className="text-amber-500">400 FinCoins</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRedeem("Zero Processing Fee Pass", 400)}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                        Redeem Voucher
                    </button>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Amazon Gift Voucher ₹ 1,000</h4>
                            <p className="text-xs text-slate-400">Instant digital code delivery</p>
                        </div>
                        <FaGift className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500">Cost</span>
                        <span className="text-amber-500">500 FinCoins</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRedeem("Amazon Gift Voucher ₹ 1,000", 500)}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                        Redeem Voucher
                    </button>
                </div>
            </div>
        </div>
    );
}

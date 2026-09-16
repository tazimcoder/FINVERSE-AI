/**
 * ==========================================================
 * FINVERSE AI — Income vs Expense Chart
 * Executive dark theme Recharts Bar Chart
 * ==========================================================
 */
import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";

function IncomeExpenseChart({ analytics }) {
    const data = [
        {
            name: "Income",
            amount: Number(analytics?.incomeVsExpense?.income || 0),
            color: "#10B981",
        },
        {
            name: "Expense",
            amount: Number(analytics?.incomeVsExpense?.expense || 0),
            color: "#EF4444",
        },
    ];

    const totalIncome = data[0].amount;
    const totalExpense = data[1].amount;
    const difference = totalIncome - totalExpense;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            return (
                <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3 text-xs shadow-2xl backdrop-blur-md">
                    <p className="font-extrabold uppercase tracking-wider text-slate-400">
                        {item.payload.name}
                    </p>
                    <p className="mt-1 text-base font-black text-white financial-num">
                        ₹ {Number(item.value).toLocaleString("en-IN")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl overflow-hidden backdrop-blur-md fin-card-hover transition-all duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-800/80">
                <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                        Cash Flow Analysis
                    </p>
                    <h2 className="text-lg font-extrabold tracking-tight text-white mt-0.5">
                        Income vs Expense
                    </h2>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Net Operating Savings
                    </p>
                    <p className={`text-sm font-black financial-num mt-0.5 ${difference >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {difference >= 0 ? "+" : "-"} ₹ {Math.abs(difference).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Recharts Bar Chart */}
            <div className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 700 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748B", fontSize: 11 }}
                            tickFormatter={(val) => {
                                if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
                                if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
                                return `₹${val}`;
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" radius={[8, 8, 2, 2]} maxBarSize={60}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Breakdown */}
            <div className="grid grid-cols-2 border-t border-slate-800/80 bg-slate-900/40">
                <div className="p-4 border-r border-slate-800/80">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-bold text-slate-400">Total Income</span>
                    </div>
                    <p className="text-base font-black text-white financial-num mt-1">
                        ₹ {totalIncome.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="text-xs font-bold text-slate-400">Total Expense</span>
                    </div>
                    <p className="text-base font-black text-white financial-num mt-1">
                        ₹ {totalExpense.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default IncomeExpenseChart;
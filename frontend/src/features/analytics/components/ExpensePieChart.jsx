/**
 * ==========================================================
 * FINVERSE AI — Expense By Category Chart
 * Executive Donut Pie Chart with Category Breakdown
 * ==========================================================
 */
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#06B6D4", "#EC4899"];

function ExpensePieChart({ analytics }) {
    const data = analytics?.expenseByCategory || [];

    if (data.length === 0) {
        return (
            <div className="w-full rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl p-6 text-center flex flex-col items-center justify-center min-h-[360px]">
                <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-xl mb-3">
                    📊
                </div>
                <h3 className="text-base font-bold text-white">No Expense Categories Found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Your expense breakdown will automatically populate here as transactions occur.
                </p>
            </div>
        );
    }

    const totalExpense = data.reduce((total, item) => total + Number(item.amount || 0), 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            const amount = Number(item.value || 0);
            const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : 0;

            return (
                <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3 text-xs shadow-2xl backdrop-blur-md">
                    <p className="font-extrabold uppercase tracking-wider text-slate-400">
                        {item.name}
                    </p>
                    <p className="mt-1 text-sm font-black text-white financial-num">
                        ₹ {amount.toLocaleString("en-IN")} ({percentage}%)
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
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                        Category Allocation
                    </p>
                    <h2 className="text-lg font-extrabold tracking-tight text-white mt-0.5">
                        Expense By Category
                    </h2>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Total Categorized
                    </p>
                    <p className="text-sm font-black text-rose-400 financial-num mt-0.5">
                        ₹ {totalExpense.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Recharts Pie Chart Container */}
            <div className="p-4 sm:p-6 relative">
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={3}
                            stroke="#0F172A"
                            strokeWidth={2}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Donut Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Total
                    </p>
                    <p className="text-base font-black text-white financial-num">
                        ₹ {totalExpense.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Category Breakdown Grid */}
            <div className="p-5 border-t border-slate-800/80 bg-slate-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {data.map((item, index) => {
                        const amount = Number(item.amount || 0);
                        const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;

                        return (
                            <div
                                key={`${item.category}-${index}`}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-xs font-bold text-slate-300 truncate">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs font-black text-white financial-num">
                                        ₹ {amount.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                                        {percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ExpensePieChart;
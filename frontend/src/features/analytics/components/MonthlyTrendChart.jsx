/**
 * ==========================================================
 * FINVERSE AI — Monthly Financial Trend Chart
 * Executive Dark Line Chart for Income vs Expense Trends
 * ==========================================================
 */
import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function MonthlyTrendChart({ analytics }) {
    const data = analytics?.monthlyTrend || [];

    if (data.length === 0) {
        return (
            <div className="w-full rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-xl p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-xl mb-3">
                    📈
                </div>
                <h3 className="text-base font-bold text-white">No Monthly Trend Available</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Monthly income and expense historical trends will plot here as transaction data builds up.
                </p>
            </div>
        );
    }

    const chartData = data.map((item) => ({
        ...item,
        income: Number(item.income || 0),
        expense: Number(item.expense || 0),
    }));

    const totalIncome = chartData.reduce((acc, item) => acc + item.income, 0);
    const totalExpense = chartData.reduce((acc, item) => acc + item.expense, 0);
    const netFlow = totalIncome - totalExpense;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 text-xs shadow-2xl backdrop-blur-md min-w-[160px]">
                    <p className="font-extrabold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-800 pb-1">
                        {label}
                    </p>
                    {payload.map((item) => (
                        <div key={item.dataKey} className="flex items-center justify-between gap-4 py-1">
                            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.dataKey === "income" ? "Income" : "Expense"}
                            </span>
                            <span className="font-black text-white financial-num">
                                ₹ {Number(item.value).toLocaleString("en-IN")}
                            </span>
                        </div>
                    ))}
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
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                        Historical Trajectory
                    </p>
                    <h2 className="text-lg font-extrabold tracking-tight text-white mt-0.5">
                        Monthly Trend
                    </h2>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Net Period Flow
                    </p>
                    <p className={`text-sm font-black financial-num mt-0.5 ${netFlow >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {netFlow >= 0 ? "+" : "-"} ₹ {Math.abs(netFlow).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Recharts Line Chart Container */}
            <div className="p-4 sm:p-6">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                        <XAxis
                            dataKey="month"
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
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#0F172A" }}
                            activeDot={{ r: 6, fill: "#34D399", strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#EF4444"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#EF4444", strokeWidth: 2, stroke: "#0F172A" }}
                            activeDot={{ r: 6, fill: "#F87171", strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Summary Grid */}
            <div className="grid grid-cols-2 border-t border-slate-800/80 bg-slate-900/40">
                <div className="p-4 border-r border-slate-800/80">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-bold text-slate-400">Total Period Income</span>
                    </div>
                    <p className="text-base font-black text-white financial-num mt-1">
                        ₹ {totalIncome.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="text-xs font-bold text-slate-400">Total Period Expense</span>
                    </div>
                    <p className="text-base font-black text-white financial-num mt-1">
                        ₹ {totalExpense.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MonthlyTrendChart;
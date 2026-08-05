/**
 * ==========================================================
 * FINVERSE AI
 * Income vs Expense Chart
 * ==========================================================
 */

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import ChartCard from "./ChartCard";
import { incomeExpenseData } from "../../../data/chartData";

function IncomeExpenseChart() {

    return (

        <ChartCard title="Income vs Expense">

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={incomeExpenseData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#22c55e"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </ChartCard>

    );

}

export default IncomeExpenseChart;
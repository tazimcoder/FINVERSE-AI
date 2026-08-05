/**
 * ==========================================================
 * FINVERSE AI
 * Monthly Expense Chart
 * ==========================================================
 */

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";
import { incomeExpenseData } from "../../../data/chartData";

function ExpenseChart() {

    return (

        <ChartCard title="Monthly Expense">

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <AreaChart data={incomeExpenseData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        fill="#fecaca"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </ChartCard>

    );

}

export default ExpenseChart;
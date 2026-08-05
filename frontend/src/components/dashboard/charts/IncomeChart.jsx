/**
 * ==========================================================
 * FINVERSE AI
 * Monthly Income Chart
 * ==========================================================
 */

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";
import { incomeExpenseData } from "../../../data/chartData";

function IncomeChart() {

    return (

        <ChartCard title="Monthly Income">

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={incomeExpenseData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="income"
                        fill="#22c55e"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </ChartCard>

    );

}

export default IncomeChart;
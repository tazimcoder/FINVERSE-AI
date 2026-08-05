/**
 * ==========================================================
 * FINVERSE AI
 * Investment Growth Chart
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
} from "recharts";

import ChartCard from "./ChartCard";

import { investmentGrowthData } from "../../../data/chartData";

function InvestmentChart() {

    return (

        <ChartCard title="Investment Growth">

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={investmentGrowthData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="investment"
                        stroke="#7c3aed"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </ChartCard>

    );

}

export default InvestmentChart;
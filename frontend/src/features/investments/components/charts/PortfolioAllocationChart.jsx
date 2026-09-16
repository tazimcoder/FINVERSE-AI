/**
 * ==========================================================
 * FINVERSE AI
 * Portfolio Allocation Chart
 * ==========================================================
 */

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#7c3aed",
    "#0891b2",
    "#ea580c",
    "#db2777",
];

function PortfolioAllocationChart({

    allocation,

}) {

    if (!allocation?.length) {

        return (

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">

                    Portfolio Allocation

                </h2>

                <p className="text-slate-500">

                    No allocation data found.

                </p>

            </div>

        );

    }

    const chartData = allocation.map(item => ({

        name: item.type,

        value: Number(item.amount),

    }));

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">

                Portfolio Allocation

            </h2>

            <div className="h-96">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            innerRadius={60}
                            label
                        >

                            {

                                chartData.map(

                                    (entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index % COLORS.length
                                                ]
                                            }
                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default PortfolioAllocationChart;
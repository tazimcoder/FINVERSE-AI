/**
 * ==========================================================
 * FINVERSE AI
 * Financial Chart
 * ==========================================================
 */

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid,

} from "recharts";

function FinancialChart({ summary }) {

    if (!summary) return null;

    const data = [

        {

            name: "Income",

            amount: summary.income,

        },

        {

            name: "Expense",

            amount: summary.expense,

        },

        {

            name: "Balance",

            amount: summary.balance,

        },

        {

            name: "Savings",

            amount:

                summary.income -

                summary.expense,

        },

    ];

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow
                mt-5
                p-4
            "
        >

            <h3
                className="
                    font-semibold
                    mb-4
                "
            >

                Financial Overview

            </h3>

            <ResponsiveContainer

                width="100%"

                height={250}

            >

                <BarChart

                    data={data}

                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                    />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar

                        dataKey="amount"

                        radius={[8, 8, 0, 0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default FinancialChart;
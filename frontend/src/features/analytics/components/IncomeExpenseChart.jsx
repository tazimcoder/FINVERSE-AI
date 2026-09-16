/**
 * ==========================================================
 * FINVERSE AI
 * Income vs Expense Chart
 * ==========================================================
 */

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip,

} from "recharts";


function IncomeExpenseChart({ analytics }) {

    const data = [

        {
            name: "Income",
            amount: Number(
                analytics?.incomeVsExpense?.income || 0
            ),
        },

        {
            name: "Expense",
            amount: Number(
                analytics?.incomeVsExpense?.expense || 0
            ),
        },

    ];


    const totalIncome = data[0].amount;

    const totalExpense = data[1].amount;

    const difference = totalIncome - totalExpense;


    return (

        <div
            className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:shadow-lg
            "
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-slate-100
                    px-6
                    py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-blue-600
                        "
                    >
                        Cash Flow
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        Income vs Expense
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Compare your total income and expenses.
                    </p>

                </div>


                {/* ==================================================
                    BALANCE INDICATOR
                ================================================== */}

                <div
                    className="
                        w-fit
                        rounded-xl
                        border
                        border-slate-100
                        bg-slate-50
                        px-4
                        py-2.5
                    "
                >

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                        "
                    >
                        Net Difference
                    </p>

                    <p
                        className={`
                            mt-0.5
                            text-sm
                            font-bold

                            ${difference >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }
                        `}
                    >

                        {difference >= 0 ? "+" : "-"} ₹{" "}

                        {Math.abs(
                            difference
                        ).toLocaleString()}

                    </p>

                </div>

            </div>


            {/* ==================================================
                CHART
            ================================================== */}

            <div className="px-4 pb-5 pt-6 sm:px-6">

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                        barCategoryGap="35%"
                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="#e2e8f0"
                        />


                        <XAxis

                            dataKey="name"

                            axisLine={false}

                            tickLine={false}

                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                                fontWeight: 600,
                            }}

                            dy={10}

                        />


                        <YAxis

                            axisLine={false}

                            tickLine={false}

                            tick={{
                                fill: "#94a3b8",
                                fontSize: 11,
                            }}

                            tickFormatter={(value) => {

                                if (value >= 1000000) {

                                    return `₹${(
                                        value / 1000000
                                    ).toFixed(1)}M`;

                                }

                                if (value >= 1000) {

                                    return `₹${(
                                        value / 1000
                                    ).toFixed(0)}K`;

                                }

                                return `₹${value}`;

                            }}

                        />


                        <Tooltip

                            cursor={{
                                fill: "#f8fafc",
                            }}

                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow:
                                    "0 10px 30px rgba(15, 23, 42, 0.10)",
                                padding: "10px 14px",
                            }}

                            formatter={(value) => [

                                `₹ ${Number(
                                    value
                                ).toLocaleString()}`,

                                "Amount",

                            ]}

                        />


                        <Bar

                            dataKey="amount"

                            radius={[
                                10,
                                10,
                                2,
                                2,
                            ]}

                            maxBarSize={80}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>


            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div
                className="
                    grid
                    grid-cols-2
                    border-t
                    border-slate-100
                "
            >

                <div
                    className="
                        border-r
                        border-slate-100
                        px-6
                        py-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-500
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                text-slate-500
                            "
                        >
                            Income
                        </span>

                    </div>


                    <p
                        className="
                            mt-1
                            text-base
                            font-bold
                            text-slate-800
                        "
                    >
                        ₹ {totalIncome.toLocaleString()}
                    </p>

                </div>


                <div
                    className="
                        px-6
                        py-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                text-slate-500
                            "
                        >
                            Expense
                        </span>

                    </div>


                    <p
                        className="
                            mt-1
                            text-base
                            font-bold
                            text-slate-800
                        "
                    >
                        ₹ {totalExpense.toLocaleString()}
                    </p>

                </div>

            </div>

        </div>

    );

}


export default IncomeExpenseChart;
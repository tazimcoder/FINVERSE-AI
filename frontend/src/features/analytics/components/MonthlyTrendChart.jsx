/**
 * ==========================================================
 * FINVERSE AI
 * Monthly Trend Chart
 * ==========================================================
 */

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";


function MonthlyTrendChart({ analytics }) {

    const data = analytics?.monthlyTrend || [];


    /* ==========================================================
       EMPTY STATE
    ========================================================== */

    if (data.length === 0) {

        return (

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                <div
                    className="
                        border-b
                        border-slate-100
                        px-6
                        py-5
                    "
                >

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-blue-600
                        "
                    >
                        Financial Overview
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
                        Monthly Trend
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Track your income and expenses over time.
                    </p>

                </div>


                <div
                    className="
                        flex
                        min-h-[320px]
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                            text-2xl
                        "
                    >
                        📈
                    </div>


                    <h3
                        className="
                            mt-5
                            text-base
                            font-bold
                            text-slate-800
                        "
                    >
                        No Trend Data Available
                    </h3>


                    <p
                        className="
                            mt-2
                            max-w-sm
                            text-sm
                            leading-6
                            text-slate-400
                        "
                    >
                        Add more transactions to see your
                        monthly financial trend.
                    </p>

                </div>

            </div>

        );

    }


    /* ==========================================================
       SAFE NUMBERS
    ========================================================== */

    const chartData = data.map((item) => ({

        ...item,

        income: Number(item.income || 0),

        expense: Number(item.expense || 0),

    }));


    /* ==========================================================
       TOTALS
    ========================================================== */

    const totalIncome = chartData.reduce(

        (total, item) => {

            return total + item.income;

        },

        0

    );


    const totalExpense = chartData.reduce(

        (total, item) => {

            return total + item.expense;

        },

        0

    );


    const netFlow =
        totalIncome - totalExpense;


    /* ==========================================================
       CUSTOM TOOLTIP
    ========================================================== */

    const CustomTooltip = ({
        active,
        payload,
        label,
    }) => {

        if (
            !active ||
            !payload ||
            payload.length === 0
        ) {

            return null;

        }


        return (

            <div
                className="
                    min-w-[170px]
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    shadow-xl
                "
            >

                <p
                    className="
                        mb-3
                        text-xs
                        font-bold
                        text-slate-800
                    "
                >
                    {label}
                </p>


                {

                    payload.map(
                        (item) => (

                            <div
                                key={item.dataKey}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-6
                                    py-1
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
                                        "
                                        style={{
                                            backgroundColor:
                                                item.color,
                                        }}
                                    />

                                    <span
                                        className="
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        {
                                            item.dataKey ===
                                                "income"
                                                ? "Income"
                                                : "Expense"
                                        }
                                    </span>

                                </div>


                                <span
                                    className="
                                        text-xs
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    ₹{" "}

                                    {Number(
                                        item.value || 0
                                    ).toLocaleString()}

                                </span>

                            </div>

                        )

                    )

                }

            </div>

        );

    };


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
                        Financial Overview
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
                        Monthly Trend
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Track your income and expenses over time.
                    </p>

                </div>


                {/* ==================================================
                    NET FLOW
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
                        Net Flow
                    </p>


                    <p
                        className={`
                            mt-0.5
                            text-sm
                            font-bold

                            ${netFlow >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }
                        `}
                    >

                        {netFlow >= 0
                            ? "+"
                            : "-"
                        }

                        ₹{" "}

                        {Math.abs(
                            netFlow
                        ).toLocaleString()}

                    </p>

                </div>

            </div>


            {/* ==================================================
                CHART
            ================================================== */}

            <div
                className="
                    px-4
                    pb-5
                    pt-6
                    sm:px-6
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height={340}
                >

                    <LineChart

                        data={chartData}

                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}

                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="#e2e8f0"
                        />


                        <XAxis

                            dataKey="month"

                            axisLine={false}

                            tickLine={false}

                            tick={{
                                fill: "#64748b",
                                fontSize: 11,
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

                                if (
                                    value >= 1000000
                                ) {

                                    return `₹${(
                                        value / 1000000
                                    ).toFixed(1)}M`;

                                }


                                if (
                                    value >= 1000
                                ) {

                                    return `₹${(
                                        value / 1000
                                    ).toFixed(0)}K`;

                                }


                                return `₹${value}`;

                            }}

                        />


                        <Tooltip
                            content={
                                <CustomTooltip />
                            }
                        />


                        <Line

                            type="monotone"

                            dataKey="income"

                            stroke="#16a34a"

                            strokeWidth={3}

                            dot={{
                                r: 4,
                                strokeWidth: 2,
                                fill: "#ffffff",
                            }}

                            activeDot={{
                                r: 6,
                                strokeWidth: 2,
                            }}

                            connectNulls

                        />


                        <Line

                            type="monotone"

                            dataKey="expense"

                            stroke="#dc2626"

                            strokeWidth={3}

                            dot={{
                                r: 4,
                                strokeWidth: 2,
                                fill: "#ffffff",
                            }}

                            activeDot={{
                                r: 6,
                                strokeWidth: 2,
                            }}

                            connectNulls

                        />

                    </LineChart>

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

                {/* Income */}

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
                            Total Income
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


                {/* Expense */}

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
                            Total Expense
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


export default MonthlyTrendChart;
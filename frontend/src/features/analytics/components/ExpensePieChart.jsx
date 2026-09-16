/**
 * ==========================================================
 * FINVERSE AI
 * Expense By Category Chart
 * ==========================================================
 */

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Cell,
} from "recharts";


const COLORS = [

    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2",

];


function ExpensePieChart({ analytics }) {

    const data = analytics?.expenseByCategory || [];


    /* ==========================================================
       EMPTY STATE
    ========================================================== */

    if (data.length === 0) {

        return (

            <div
                className="
                    flex
                    min-h-[420px]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                {/* Header */}

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
                        Spending Analysis
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
                        Expense By Category
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Understand where your money is going.
                    </p>

                </div>


                {/* Empty State */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        items-center
                        justify-center
                        px-6
                        py-10
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
                        📊
                    </div>


                    <h3
                        className="
                            mt-5
                            text-base
                            font-bold
                            text-slate-800
                        "
                    >
                        No Expense Data Available
                    </h3>


                    <p
                        className="
                            mt-2
                            max-w-xs
                            text-sm
                            leading-6
                            text-slate-400
                        "
                    >
                        Once you start recording expenses,
                        your category breakdown will appear here.
                    </p>

                </div>

            </div>

        );

    }


    /* ==========================================================
       TOTAL EXPENSE
    ========================================================== */

    const totalExpense = data.reduce(

        (total, item) => {

            return total + Number(item.amount || 0);

        },

        0

    );


    /* ==========================================================
       CUSTOM TOOLTIP
    ========================================================== */

    const CustomTooltip = ({ active, payload }) => {

        if (!active || !payload || !payload.length) {

            return null;

        }


        const item = payload[0];

        const amount = Number(
            item.value || 0
        );


        return (

            <div
                className="
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
                        text-xs
                        font-semibold
                        text-slate-500
                    "
                >
                    {item.name}
                </p>


                <p
                    className="
                        mt-1
                        text-sm
                        font-bold
                        text-slate-900
                    "
                >
                    ₹ {amount.toLocaleString()}
                </p>

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
                        Spending Analysis
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
                        Expense By Category
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Understand where your money is going.
                    </p>

                </div>


                {/* Total */}

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
                        Total Expense
                    </p>


                    <p
                        className="
                            mt-0.5
                            text-sm
                            font-bold
                            text-red-600
                        "
                    >
                        ₹ {totalExpense.toLocaleString()}
                    </p>

                </div>

            </div>


            {/* ==================================================
                CHART
            ================================================== */}

            <div
                className="
                    px-4
                    pt-5
                    sm:px-6
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="amount"

                            nameKey="category"

                            cx="50%"

                            cy="50%"

                            innerRadius={72}

                            outerRadius={108}

                            paddingAngle={3}

                            stroke="none"

                        >

                            {

                                data.map(
                                    (entry, index) => (

                                        <Cell

                                            key={`${entry.category}-${index}`}

                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }

                                        />

                                    )
                                )

                            }

                        </Pie>


                        <Tooltip
                            content={<CustomTooltip />}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>


            {/* ==================================================
                CENTER SUMMARY
            ================================================== */}

            <div
                className="
                    -mt-[188px]
                    mb-[150px]
                    flex
                    justify-center
                    pointer-events-none
                "
            >

                <div
                    className="
                        text-center
                    "
                >

                    <p
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-400
                        "
                    >
                        Total
                    </p>

                    <p
                        className="
                            mt-1
                            text-lg
                            font-extrabold
                            text-slate-800
                        "
                    >
                        ₹ {totalExpense.toLocaleString()}
                    </p>

                </div>

            </div>


            {/* ==================================================
                CATEGORY LEGEND
            ================================================== */}

            <div
                className="
                    border-t
                    border-slate-100
                    px-6
                    py-5
                "
            >

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                    "
                >

                    {

                        data.map(
                            (item, index) => {

                                const amount =
                                    Number(
                                        item.amount || 0
                                    );


                                const percentage =
                                    totalExpense === 0

                                        ? 0

                                        : (
                                            amount /
                                            totalExpense
                                        ) * 100;


                                return (

                                    <div
                                        key={`${item.category}-${index}`}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            rounded-xl
                                            bg-slate-50
                                            px-3
                                            py-2.5
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                min-w-0
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <span
                                                className="
                                                    h-2.5
                                                    w-2.5
                                                    shrink-0
                                                    rounded-full
                                                "
                                                style={{
                                                    backgroundColor:
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ],
                                                }}
                                            />


                                            <span
                                                className="
                                                    truncate
                                                    text-xs
                                                    font-semibold
                                                    text-slate-600
                                                "
                                            >
                                                {item.category}
                                            </span>

                                        </div>


                                        <div
                                            className="
                                                flex
                                                shrink-0
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <span
                                                className="
                                                    text-xs
                                                    font-bold
                                                    text-slate-800
                                                "
                                            >
                                                ₹ {amount.toLocaleString()}
                                            </span>

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-semibold
                                                    text-slate-400
                                                "
                                            >
                                                {percentage.toFixed(1)}%
                                            </span>

                                        </div>

                                    </div>

                                );

                            }

                        )

                    }

                </div>

            </div>

        </div>

    );

}


export default ExpensePieChart;
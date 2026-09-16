/**
 * ==========================================================
 * FINVERSE AI
 * Portfolio Allocation
 * ==========================================================
 */

function PortfolioAllocation({ allocation = [] }) {

    const data = Array.isArray(allocation)
        ? allocation
        : [];

    /* ==========================================================
       Empty State
    ========================================================== */

    if (data.length === 0) {

        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                <h2 className="text-xl font-bold text-slate-800">
                    🥧 Portfolio Allocation
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Distribution of your investments by type.
                </p>

                <div className="h-48 flex items-center justify-center">

                    <p className="text-slate-400">
                        No allocation data available yet.
                    </p>

                </div>

            </div>
        );
    }


    /* ==========================================================
       Total Investment
    ========================================================== */

    const totalAmount = data.reduce(

        (sum, item) => {

            return (
                sum +
                Number(item.amount ?? 0)
            );

        },

        0

    );


    /* ==========================================================
       Currency Formatter
    ========================================================== */

    const formatCurrency = (value) => {

        return `₹ ${Number(
            value ?? 0
        ).toLocaleString("en-IN")}`;

    };


    /* ==========================================================
       Percentage
    ========================================================== */

    const getPercentage = (amount) => {

        if (totalAmount === 0) {

            return 0;

        }

        return (

            (
                Number(amount ?? 0) /
                totalAmount
            ) * 100

        ).toFixed(2);

    };


    /* ==========================================================
       Colors
    ========================================================== */

    const colors = [

        "bg-blue-500",

        "bg-green-500",

        "bg-yellow-500",

        "bg-purple-500",

        "bg-pink-500",

        "bg-orange-500",

        "bg-cyan-500",

        "bg-indigo-500",

    ];


    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

            {/* ==================================================
               Header
            ================================================== */}

            <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-800">

                    🥧 Portfolio Allocation

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                    Distribution of your investments by type.

                </p>

            </div>


            {/* ==================================================
               Total
            ================================================== */}

            <div className="mb-6">

                <p className="text-sm text-slate-500">

                    Total Invested

                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">

                    {formatCurrency(totalAmount)}

                </h3>

            </div>


            {/* ==================================================
               Allocation Bars
            ================================================== */}

            <div className="space-y-5">

                {data.map(

                    (item, index) => {

                        const amount =
                            Number(
                                item.amount ?? 0
                            );

                        const percentage =
                            Number(
                                getPercentage(
                                    amount
                                )
                            );

                        return (

                            <div
                                key={
                                    item.type ??
                                    index
                                }
                            >

                                {/* =========================
                                   Label
                                ========================= */}

                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-3">

                                        <span
                                            className={`w-3 h-3 rounded-full ${colors[
                                                index %
                                                colors.length
                                                ]
                                                }`}
                                        />

                                        <span className="font-medium text-slate-700">

                                            {item.type}

                                        </span>

                                    </div>


                                    <div className="text-right">

                                        <span className="font-semibold text-slate-800">

                                            {formatCurrency(
                                                amount
                                            )}

                                        </span>

                                        <span className="text-sm text-slate-500 ml-2">

                                            {percentage}%

                                        </span>

                                    </div>

                                </div>


                                {/* =========================
                                   Progress Bar
                                ========================= */}

                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${colors[
                                            index %
                                            colors.length
                                            ]
                                            }`}
                                        style={{
                                            width:
                                                `${percentage}%`,
                                        }}
                                    />

                                </div>


                                {/* =========================
                                   Count
                                ========================= */}

                                <p className="text-xs text-slate-400 mt-2">

                                    {Number(
                                        item.totalInvestments ??
                                        0
                                    )}{" "}

                                    {Number(
                                        item.totalInvestments ??
                                        0
                                    ) === 1
                                        ? "investment"
                                        : "investments"
                                    }

                                </p>

                            </div>

                        );

                    }

                )}

            </div>

        </div>

    );

}

export default PortfolioAllocation;
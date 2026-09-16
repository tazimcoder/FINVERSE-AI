/**
 * ==========================================================
 * FINVERSE AI
 * Investment Performance
 * ==========================================================
 */

function InvestmentPerformance({ summary }) {

    /* ==========================================================
       Safe Values
    ========================================================== */

    const totalAssets = Number(
        summary?.totalAssets ?? 0
    );

    const totalInvestment = Number(
        summary?.totalInvestment ?? 0
    );

    const currentValue = Number(
        summary?.currentValue ?? 0
    );

    const profit = Number(
        summary?.profit ?? 0
    );

    const roi = Number(
        summary?.roi ?? 0
    );

    const bestInvestment =
        summary?.bestInvestment || null;

    const worstInvestment =
        summary?.worstInvestment || null;


    /* ==========================================================
       Calculate Investment ROI
    ========================================================== */

    const calculateROI = (investment) => {

        if (!investment) {
            return 0;
        }

        const invested = Number(
            investment.invested_amount ?? 0
        );

        const investmentProfit = Number(
            investment.profit ?? 0
        );

        if (invested === 0) {
            return 0;
        }

        return (
            (investmentProfit / invested) * 100
        ).toFixed(2);

    };


    const bestROI = calculateROI(
        bestInvestment
    );

    const worstROI = calculateROI(
        worstInvestment
    );


    /* ==========================================================
       Render
    ========================================================== */

    return (

        <div className="space-y-6">

            {/* ==================================================
               Header
            ================================================== */}

            <div>

                <h2 className="text-2xl font-bold text-slate-800">

                    📊 Investment Performance

                </h2>

                <p className="text-slate-500 mt-1">

                    Detailed overview of your investment performance.

                </p>

            </div>


            {/* ==================================================
               Main Performance Cards
            ================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


                {/* Total Assets */}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                    <p className="text-sm text-slate-500">

                        Total Assets

                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-2">

                        {totalAssets}

                    </h3>

                    <p className="text-sm text-slate-400 mt-2">

                        Active investments

                    </p>

                </div>


                {/* Total Investment */}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                    <p className="text-sm text-slate-500">

                        Total Invested

                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-2">

                        ₹ {totalInvestment.toLocaleString("en-IN")}

                    </h3>

                    <p className="text-sm text-slate-400 mt-2">

                        Total capital invested

                    </p>

                </div>


                {/* Current Value */}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                    <p className="text-sm text-slate-500">

                        Current Value

                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-2">

                        ₹ {currentValue.toLocaleString("en-IN")}

                    </h3>

                    <p className="text-sm text-slate-400 mt-2">

                        Current portfolio value

                    </p>

                </div>


                {/* ROI */}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                    <p className="text-sm text-slate-500">

                        Overall ROI

                    </p>

                    <h3
                        className={`text-3xl font-bold mt-2 ${roi >= 0
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >

                        {roi.toFixed(2)}%

                    </h3>

                    <p className="text-sm text-slate-400 mt-2">

                        Portfolio return

                    </p>

                </div>

            </div>


            {/* ==================================================
               Profit / Loss
            ================================================== */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm text-slate-500">

                            Total Profit / Loss

                        </p>

                        <h3
                            className={`text-4xl font-bold mt-2 ${profit >= 0
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >

                            {profit >= 0 ? "+" : "-"}₹{" "}

                            {Math.abs(profit).toLocaleString("en-IN")}

                        </h3>

                    </div>

                    <div
                        className={`text-4xl ${profit >= 0
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    >

                        {profit >= 0
                            ? "📈"
                            : "📉"
                        }

                    </div>

                </div>

            </div>


            {/* ==================================================
               Best / Worst Investments
            ================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


                {/* ==================================================
                   Best Investment
                ================================================== */}

                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <p className="text-sm text-slate-500">

                                Best Investment

                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-1">

                                🏆 {bestInvestment?.name || "No data"}

                            </h3>

                        </div>

                        <div className="text-green-600 font-bold">

                            +{bestROI}%

                        </div>

                    </div>


                    {bestInvestment ? (

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Invested

                                </p>

                                <p className="font-semibold text-slate-800">

                                    ₹{" "}

                                    {Number(
                                        bestInvestment.invested_amount
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    Current Value

                                </p>

                                <p className="font-semibold text-slate-800">

                                    ₹{" "}

                                    {Number(
                                        bestInvestment.current_value
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    Profit

                                </p>

                                <p className="font-semibold text-green-600">

                                    +₹{" "}

                                    {Number(
                                        bestInvestment.profit
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    ROI

                                </p>

                                <p className="font-semibold text-green-600">

                                    +{bestROI}%

                                </p>

                            </div>

                        </div>

                    ) : (

                        <p className="text-slate-400">

                            No investment data available.

                        </p>

                    )}

                </div>


                {/* ==================================================
                   Worst Investment
                ================================================== */}

                <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <p className="text-sm text-slate-500">

                                Lowest Performance

                            </p>

                            <h3 className="text-xl font-bold text-slate-800 mt-1">

                                ⚠️ {worstInvestment?.name || "No data"}

                            </h3>

                        </div>

                        <div
                            className={`font-bold ${worstROI >= 0
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >

                            {worstROI >= 0 ? "+" : ""}

                            {worstROI}%

                        </div>

                    </div>


                    {worstInvestment ? (

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Invested

                                </p>

                                <p className="font-semibold text-slate-800">

                                    ₹{" "}

                                    {Number(
                                        worstInvestment.invested_amount
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    Current Value

                                </p>

                                <p className="font-semibold text-slate-800">

                                    ₹{" "}

                                    {Number(
                                        worstInvestment.current_value
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    Profit / Loss

                                </p>

                                <p
                                    className={`font-semibold ${Number(
                                        worstInvestment.profit
                                    ) >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >

                                    {Number(
                                        worstInvestment.profit
                                    ) >= 0
                                        ? "+"
                                        : "-"
                                    }

                                    ₹{" "}

                                    {Math.abs(
                                        Number(
                                            worstInvestment.profit
                                        )
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">

                                    ROI

                                </p>

                                <p
                                    className={`font-semibold ${worstROI >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >

                                    {worstROI >= 0
                                        ? "+"
                                        : ""
                                    }

                                    {worstROI}%

                                </p>

                            </div>

                        </div>

                    ) : (

                        <p className="text-slate-400">

                            No investment data available.

                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}

export default InvestmentPerformance;



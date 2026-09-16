/**
 * ==========================================================
 * FINVERSE AI
 * Portfolio Growth Chart
 * ==========================================================
 */

function PortfolioGrowthChart({ growth = [] }) {

    /* ==========================================================
       Safe Data
    ========================================================== */

    const data = Array.isArray(growth)
        ? growth
        : [];


    /* ==========================================================
       Empty State
    ========================================================== */

    if (data.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                <div className="mb-5">

                    <h2 className="text-xl font-bold text-slate-800">

                        📈 Portfolio Growth

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                        Track your investment growth over time.

                    </p>

                </div>

                <div className="h-64 flex items-center justify-center">

                    <p className="text-slate-400">

                        No portfolio growth data available yet.

                    </p>

                </div>

            </div>

        );

    }


    /* ==========================================================
       Number Formatter
    ========================================================== */

    const formatCurrency = (value) => {

        return `₹ ${Number(
            value ?? 0
        ).toLocaleString("en-IN")}`;

    };


    /* ==========================================================
       Maximum Value
    ========================================================== */

    const maxValue = Math.max(

        ...data.map(
            item => Number(item.currentValue ?? 0)
        ),

        ...data.map(
            item => Number(item.investment ?? 0)
        ),

        1

    );


    /* ==========================================================
       Chart Dimensions
    ========================================================== */

    const width = 900;

    const height = 320;

    const paddingLeft = 70;

    const paddingRight = 30;

    const paddingTop = 30;

    const paddingBottom = 55;

    const chartWidth =
        width -
        paddingLeft -
        paddingRight;

    const chartHeight =
        height -
        paddingTop -
        paddingBottom;


    /* ==========================================================
       Create Points
    ========================================================== */

    const getX = (index) => {

        if (data.length === 1) {

            return (
                paddingLeft +
                chartWidth / 2
            );

        }

        return (
            paddingLeft +
            (
                index /
                (data.length - 1)
            ) *
            chartWidth
        );

    };


    const getY = (value) => {

        return (
            paddingTop +
            chartHeight -
            (
                Number(value ?? 0) /
                maxValue
            ) *
            chartHeight
        );

    };


    const investmentPoints = data.map(

        (item, index) => ({

            x: getX(index),

            y: getY(
                item.investment
            ),

            value: Number(
                item.investment ?? 0
            ),

        })

    );


    const currentValuePoints = data.map(

        (item, index) => ({

            x: getX(index),

            y: getY(
                item.currentValue
            ),

            value: Number(
                item.currentValue ?? 0
            ),

        })

    );


    /* ==========================================================
       SVG Path
    ========================================================== */

    const createPath = (points) => {

        if (!points.length) {

            return "";

        }

        return points
            .map(
                (point, index) =>
                    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
            )
            .join(" ");

    };


    const investmentPath =
        createPath(
            investmentPoints
        );


    const currentValuePath =
        createPath(
            currentValuePoints
        );


    /* ==========================================================
       Grid Lines
    ========================================================== */

    const gridLines = 4;


    /* ==========================================================
       Render
    ========================================================== */

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

            {/* ==================================================
               Header
            ================================================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-xl font-bold text-slate-800">

                        📈 Portfolio Growth

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                        Investment value over time.

                    </p>

                </div>


                {/* Legend */}

                <div className="flex items-center gap-5 text-sm">

                    <div className="flex items-center gap-2">

                        <span className="w-3 h-3 rounded-full bg-blue-600" />

                        <span className="text-slate-600">

                            Invested

                        </span>

                    </div>


                    <div className="flex items-center gap-2">

                        <span className="w-3 h-3 rounded-full bg-green-500" />

                        <span className="text-slate-600">

                            Current Value

                        </span>

                    </div>

                </div>

            </div>


            {/* ==================================================
               Chart
            ================================================== */}

            <div className="w-full overflow-x-auto">

                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full min-w-[650px]"
                    preserveAspectRatio="none"
                >

                    {/* ==================================================
                       Horizontal Grid
                    ================================================== */}

                    {Array.from({
                        length: gridLines + 1
                    }).map(
                        (_, index) => {

                            const y =
                                paddingTop +
                                (
                                    index /
                                    gridLines
                                ) *
                                chartHeight;

                            const value =
                                maxValue -
                                (
                                    index /
                                    gridLines
                                ) *
                                maxValue;

                            return (

                                <g key={index}>

                                    <line
                                        x1={paddingLeft}
                                        x2={
                                            width -
                                            paddingRight
                                        }
                                        y1={y}
                                        y2={y}
                                        stroke="#e2e8f0"
                                        strokeDasharray="4 4"
                                    />

                                    <text
                                        x={paddingLeft - 10}
                                        y={y + 4}
                                        textAnchor="end"
                                        fontSize="11"
                                        fill="#94a3b8"
                                    >

                                        {Number(
                                            value
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </text>

                                </g>

                            );

                        }
                    )}


                    {/* ==================================================
                       X Axis
                    ================================================== */}

                    <line
                        x1={paddingLeft}
                        x2={
                            width -
                            paddingRight
                        }
                        y1={
                            paddingTop +
                            chartHeight
                        }
                        y2={
                            paddingTop +
                            chartHeight
                        }
                        stroke="#cbd5e1"
                    />


                    {/* ==================================================
                       Investment Line
                    ================================================== */}

                    <path
                        d={investmentPath}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />


                    {/* ==================================================
                       Current Value Line
                    ================================================== */}

                    <path
                        d={currentValuePath}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />


                    {/* ==================================================
                       Investment Points
                    ================================================== */}

                    {investmentPoints.map(
                        (point, index) => (

                            <g key={`investment-${index}`}>

                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="5"
                                    fill="#2563eb"
                                    stroke="white"
                                    strokeWidth="2"
                                />

                                <title>

                                    Invested:{" "}
                                    {formatCurrency(
                                        point.value
                                    )}

                                </title>

                            </g>

                        )
                    )}


                    {/* ==================================================
                       Current Value Points
                    ================================================== */}

                    {currentValuePoints.map(
                        (point, index) => (

                            <g key={`current-${index}`}>

                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="5"
                                    fill="#22c55e"
                                    stroke="white"
                                    strokeWidth="2"
                                />

                                <title>

                                    Current Value:{" "}
                                    {formatCurrency(
                                        point.value
                                    )}

                                </title>

                            </g>

                        )
                    )}


                    {/* ==================================================
                       Month Labels
                    ================================================== */}

                    {data.map(
                        (item, index) => (

                            <text
                                key={`month-${index}`}
                                x={getX(index)}
                                y={
                                    paddingTop +
                                    chartHeight +
                                    28
                                }
                                textAnchor="middle"
                                fontSize="11"
                                fill="#64748b"
                            >

                                {item.month}

                            </text>

                        )
                    )}

                </svg>

            </div>


            {/* ==================================================
               Latest Performance
            ================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100">

                <div>

                    <p className="text-xs text-slate-500">

                        Latest Investment

                    </p>

                    <p className="font-semibold text-slate-800 mt-1">

                        {formatCurrency(
                            data[data.length - 1]
                                ?.investment
                        )}

                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">

                        Latest Value

                    </p>

                    <p className="font-semibold text-slate-800 mt-1">

                        {formatCurrency(
                            data[data.length - 1]
                                ?.currentValue
                        )}

                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">

                        Latest Profit

                    </p>

                    <p
                        className={`font-semibold mt-1 ${Number(
                            data[data.length - 1]
                                ?.profit ?? 0
                        ) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >

                        {Number(
                            data[data.length - 1]
                                ?.profit ?? 0
                        ) >= 0
                            ? "+"
                            : ""
                        }

                        {formatCurrency(
                            data[data.length - 1]
                                ?.profit
                        )}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default PortfolioGrowthChart;
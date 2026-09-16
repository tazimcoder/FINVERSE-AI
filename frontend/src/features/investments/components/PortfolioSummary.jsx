/**
 * ==========================================================
 * FINVERSE AI
 * Portfolio Summary
 * ==========================================================
 */

function PortfolioSummary({ investments }) {

    const totalInvestment = investments.reduce(

        (total, investment) =>

            total + Number(investment.invested_amount),

        0

    );

    const currentValue = investments.reduce(

        (total, investment) =>

            total + Number(investment.current_value),

        0

    );

    const profit = currentValue - totalInvestment;

    const totalAssets = investments.length;

    const cards = [

        {

            title: "Total Investment",

            value: `₹${totalInvestment.toLocaleString()}`,

            color: "bg-blue-500",

        },

        {

            title: "Current Value",

            value: `₹${currentValue.toLocaleString()}`,

            color: "bg-green-500",

        },

        {

            title: "Profit / Loss",

            value: `₹${profit.toLocaleString()}`,

            color: profit >= 0
                ? "bg-emerald-500"
                : "bg-red-500",

        },

        {

            title: "Assets",

            value: totalAssets,

            color: "bg-purple-500",

        },

    ];

    return (

        <div

            className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-4

                gap-6

                mb-8

            "

        >

            {

                cards.map(card => (

                    <div

                        key={card.title}

                        className="

                            bg-white

                            rounded-xl

                            shadow-md

                            p-6

                            border

                            hover:shadow-xl

                            transition

                        "

                    >

                        <div

                            className={`

                                w-12

                                h-12

                                rounded-lg

                                ${card.color}

                                mb-4

                            `}

                        />

                        <h3

                            className="

                                text-slate-500

                                text-sm

                            "

                        >

                            {card.title}

                        </h3>

                        <h2

                            className="

                                text-3xl

                                font-bold

                                mt-2

                            "

                        >

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}

export default PortfolioSummary;
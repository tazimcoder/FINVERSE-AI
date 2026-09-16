/**
 * ==========================================================
 * FINVERSE AI
 * Financial Summary Cards
 * ==========================================================
 */

function FinancialSummaryCards({ summary }) {

    if (!summary) return null;

    const savings = summary.income - summary.expense;

    const healthScore = Math.max(
        0,
        Math.min(
            100,
            Math.round((savings / Math.max(summary.income, 1)) * 100)
        )
    );

    const cards = [

        {
            title: "Balance",
            value: `₹${summary.balance.toLocaleString()}`,
            color: "bg-blue-500",
        },

        {
            title: "Income",
            value: `₹${summary.income.toLocaleString()}`,
            color: "bg-green-500",
        },

        {
            title: "Expense",
            value: `₹${summary.expense.toLocaleString()}`,
            color: "bg-red-500",
        },

        {
            title: "Savings",
            value: `₹${savings.toLocaleString()}`,
            color: "bg-purple-500",
        },

        {
            title: "Health Score",
            value: `${healthScore}%`,
            color: "bg-emerald-600",
        },

    ];

    return (

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-5">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className="bg-white rounded-xl shadow border p-5"
                    >

                        <div
                            className={`w-3 h-3 rounded-full ${card.color} mb-3`}
                        />

                        <h3 className="text-sm text-slate-500">

                            {card.title}

                        </h3>

                        <p className="text-2xl font-bold mt-2">

                            {card.value}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default FinancialSummaryCards;
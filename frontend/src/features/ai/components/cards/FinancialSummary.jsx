/**
 * ==========================================================
 * FINVERSE AI
 * Financial Summary
 * ==========================================================
 */

import FinancialCard from "./FinancialCard";

function FinancialSummary({ summary }) {

    if (!summary) return null;

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
                mb-6
            "
        >

            <FinancialCard

                icon="💰"

                title="Total Balance"

                value={`₹${Number(summary.balance).toLocaleString()}`}

                color="blue"

            />

            <FinancialCard

                icon="📈"

                title="Total Income"

                value={`₹${Number(summary.income).toLocaleString()}`}

                color="green"

            />

            <FinancialCard

                icon="📉"

                title="Total Expense"

                value={`₹${Number(summary.expense).toLocaleString()}`}

                color="red"

            />

        </div>

    );

}

export default FinancialSummary;
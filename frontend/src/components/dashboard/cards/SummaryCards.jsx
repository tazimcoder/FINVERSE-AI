/**
 * ==========================================================
 * FINVERSE AI
 * Summary Cards
 * ==========================================================
 */

import TotalBalanceCard from "./TotalBalanceCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import InvestmentCard from "./InvestmentCard";

function SummaryCards() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <TotalBalanceCard />

            <IncomeCard />

            <ExpenseCard />

            <InvestmentCard />

        </div>

    );

}

export default SummaryCards;
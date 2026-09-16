/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Service
 * ==========================================================
 */

import {
    getIncomeExpenseAnalytics,
    getExpenseByCategory,
    getMonthlyAnalytics,
} from "../models/analytics.model.js";


/* ==========================================================
   Get Analytics
========================================================== */

export async function getAnalyticsService(userId) {

    /* --------------------------------------------------
       Get User Analytics
    -------------------------------------------------- */

    const incomeExpense =
        await getIncomeExpenseAnalytics(userId);


    const expenseByCategory =
        await getExpenseByCategory(userId);


    const monthlyAnalytics =
        await getMonthlyAnalytics(userId);


    /* --------------------------------------------------
       Return Analytics
    -------------------------------------------------- */

    return {

        incomeVsExpense: {

            income: Number(
                incomeExpense?.totalIncome || 0
            ),

            expense: Number(
                incomeExpense?.totalExpense || 0
            ),

        },

        expenseByCategory,

        monthlyTrend: monthlyAnalytics,

    };

}
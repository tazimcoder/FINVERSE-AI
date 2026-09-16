/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Combine dashboard model queries
 * - Prepare one clean dashboard response
 * - Easy to extend in future
 *
 * ==========================================================
 */

import {
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    getTotalAccounts,
    getRecentTransactions,
    getExpenseByCategory,
    getMonthlyTrend,
} from "../models/dashboard.model.js";


/**
 * ==========================================================
 * GET DASHBOARD SUMMARY
 * ==========================================================
 */

export async function getDashboardSummaryService(userId) {

    const [
        balance,
        income,
        expense,
        accounts,
        recentTransactions,
        expenseByCategory,
        monthlyTrend,
    ] = await Promise.all([

        getTotalBalance(userId),

        getTotalIncome(userId),

        getTotalExpense(userId),

        getTotalAccounts(userId),

        getRecentTransactions(userId),

        getExpenseByCategory(userId),

        getMonthlyTrend(userId),

    ]);


    /**
     * ======================================================
     * RETURN DASHBOARD
     * ======================================================
     */

    return {

        /**
         * Summary
         */

        totalBalance:
            Number(balance?.totalBalance || 0),

        totalIncome:
            Number(income?.totalIncome || 0),

        totalExpense:
            Number(expense?.totalExpense || 0),

        totalAccounts:
            Number(accounts?.totalAccounts || 0),


        /**
         * Transactions
         */

        recentTransactions:
            Array.isArray(recentTransactions)
                ? recentTransactions
                : [],


        /**
         * Analytics
         */

        expenseByCategory:
            Array.isArray(expenseByCategory)
                ? expenseByCategory
                : [],

        monthlyTrend:
            Array.isArray(monthlyTrend)
                ? monthlyTrend
                : [],

    };
}
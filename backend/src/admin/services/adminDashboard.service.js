/**
 * ==========================================================
 * FINVERSE AI
 * Admin Dashboard Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin dashboard business logic
 * - Combine platform statistics
 * - Prepare dashboard response
 *
 * IMPORTANT:
 *
 * - No Express logic
 * - No HTTP response
 * - No SQL directly
 *
 * ==========================================================
 */

import {
    getTotalUsers,
    getActiveUsers,

    getTotalAccounts,
    getActiveAccounts,

    getTotalTransactions,
    getTotalIncome,
    getTotalExpense,

    getTotalLoans,
    getActiveLoans,

    getTotalInvestments,
    getTotalInvestedAmount,
    getTotalCurrentInvestmentValue,

} from "../models/adminDashboard.model.js";


// ==========================================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================================

export async function getAdminDashboardStats() {

    const [

        totalUsers,
        activeUsers,

        totalAccounts,
        activeAccounts,

        totalTransactions,
        totalIncome,
        totalExpense,

        totalLoans,
        activeLoans,

        totalInvestments,
        totalInvestedAmount,
        totalCurrentInvestmentValue,

    ] = await Promise.all([

        getTotalUsers(),
        getActiveUsers(),

        getTotalAccounts(),
        getActiveAccounts(),

        getTotalTransactions(),
        getTotalIncome(),
        getTotalExpense(),

        getTotalLoans(),
        getActiveLoans(),

        getTotalInvestments(),
        getTotalInvestedAmount(),
        getTotalCurrentInvestmentValue(),

    ]);


    return {

        users: {

            total: totalUsers,

            active: activeUsers,

        },


        accounts: {

            total: totalAccounts,

            active: activeAccounts,

        },


        transactions: {

            total: totalTransactions,

            income: totalIncome,

            expense: totalExpense,

        },


        loans: {

            total: totalLoans,

            active: activeLoans,

        },


        investments: {

            total: totalInvestments,

            investedAmount:
                totalInvestedAmount,

            currentValue:
                totalCurrentInvestmentValue,

        },

    };

}
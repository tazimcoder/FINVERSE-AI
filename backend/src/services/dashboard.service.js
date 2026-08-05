/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Service
 * ==========================================================
 */

import {

    getTotalBalance,

    getTotalIncome,

    getTotalExpense,

    getTotalAccounts,

    getRecentTransactions,

} from "../models/dashboard.model.js";

/* ==========================================================
   Dashboard Summary
========================================================== */

export async function getDashboardSummaryService() {

    const balance = await getTotalBalance();

    const income = await getTotalIncome();

    const expense = await getTotalExpense();

    const accounts = await getTotalAccounts();

    const recentTransactions = await getRecentTransactions();

    return {

        totalBalance: Number(balance.totalBalance),

        totalIncome: Number(income.totalIncome),

        totalExpense: Number(expense.totalExpense),

        totalAccounts: Number(accounts.totalAccounts),

        recentTransactions,

    };

}
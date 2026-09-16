/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Service
 * ==========================================================
 */

import {
    getAnalyticsApi,
} from "../api/analyticsApi";


/* ==========================================================
   Get Analytics
========================================================== */

export async function getAnalyticsService() {

    const response =
        await getAnalyticsApi();


    return response?.data || {

        incomeVsExpense: {

            income: 0,

            expense: 0,

        },

        expenseByCategory: [],

        monthlyTrend: [],

    };

}
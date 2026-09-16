/**
 * ==========================================================
 * FINVERSE AI
 * AI Service
 * Production Version
 * ==========================================================
 */

import { generateAIResponse } from "../managers/aiManager.js";

import {
    getDashboardSummaryService,
} from "./dashboard.service.js";

import {
    getAnalyticsService,
} from "./analytics.service.js";

/* ==========================================================
   Send Message Service
========================================================== */

export async function sendMessageService(message, userId) {

    try {

        /* =========================================
           Load Dashboard + Analytics
        ========================================= */

        const [

            dashboard,

            analytics,

        ] = await Promise.all([

            getDashboardSummaryService(userId),

            getAnalyticsService(userId),

        ]);

        /* =========================================
           Recent Transactions
        ========================================= */

        const recentTransactions = dashboard.recentTransactions

            .slice(0, 5)

            .map(item =>

                `${item.type} | ₹${item.amount} | ${item.category}`

            )

            .join("\n");

        /* =========================================
           Expense Categories
        ========================================= */

        const expenseCategories = analytics.expenseByCategory

            .slice(0, 5)

            .map(item =>

                `${item.category}: ₹${item.amount}`

            )

            .join("\n");

        /* =========================================
           Monthly Trend
        ========================================= */

        const monthlyTrend = analytics.monthlyTrend

            .slice(-3)

            .map(item =>

                `${item.month} | Income ₹${item.income} | Expense ₹${item.expense}`

            )

            .join("\n");

        /* =========================================
           Financial Context
        ========================================= */

        const financialContext = `

Balance: ₹${dashboard.totalBalance}

Income: ₹${dashboard.totalIncome}

Expense: ₹${dashboard.totalExpense}

Accounts: ${dashboard.totalAccounts}

Expense Categories:
${expenseCategories}

Recent Transactions:
${recentTransactions}

Monthly Trend:
${monthlyTrend}

`;

        /* =========================================
           AI Prompt
        ========================================= */

        const prompt = `

You are FINVERSE AI.

You are a professional financial advisor.

Always answer professionally.

Use the financial data below whenever relevant.

${financialContext}

User Question:

${message}

Instructions:

- Keep answers short unless user requests details.
- Use ₹ currency.
- Give practical financial advice.
- Suggest savings opportunities when possible.
- Use markdown formatting.

`;

        /* =========================================
           AI Response
        ========================================= */

        const reply = await generateAIResponse(prompt);

        /* =========================================
           Return Response
        ========================================= */

        return {

            reply,

            summary: {

                balance: dashboard.totalBalance,

                income: dashboard.totalIncome,

                expense: dashboard.totalExpense,

            },

        };

    }

    catch (error) {

        console.error("AI Service Error:", error);

        throw new Error(error.message);

    }

}
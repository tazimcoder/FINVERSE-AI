/**
 * ==========================================================
 * FINVERSE AI
 * Budget Service
 * ==========================================================
 */

import {
    createBudgetModel,
    getBudgetsModel,
    getBudgetByIdModel,
    updateBudgetModel,
    deleteBudgetModel,
} from "../models/budget.model.js";


/* ==========================================================
   Create Budget
========================================================== */

export async function createBudgetService(
    userId,
    data
) {

    const {
        month,
        year,
        budget_amount,
    } = data;


    if (
        !month ||
        !year ||
        !budget_amount
    ) {

        throw new Error(
            "All fields are required."
        );

    }


    return await createBudgetModel(
        userId,
        data
    );

}


/* ==========================================================
   Get All Budgets
========================================================== */

export async function getBudgetsService(
    userId
) {

    return await getBudgetsModel(
        userId
    );

}


/* ==========================================================
   Get Budget By Id
========================================================== */

export async function getBudgetByIdService(
    id,
    userId
) {

    const budget =
        await getBudgetByIdModel(
            id,
            userId
        );


    if (!budget) {

        throw new Error(
            "Budget not found."
        );

    }


    return budget;

}


/* ==========================================================
   Update Budget
========================================================== */

export async function updateBudgetService(
    id,
    userId,
    data
) {

    const budget =
        await getBudgetByIdModel(
            id,
            userId
        );


    if (!budget) {

        throw new Error(
            "Budget not found."
        );

    }


    await updateBudgetModel(
        id,
        userId,
        data
    );

}


/* ==========================================================
   Delete Budget
========================================================== */

export async function deleteBudgetService(
    id,
    userId
) {

    const budget =
        await getBudgetByIdModel(
            id,
            userId
        );


    if (!budget) {

        throw new Error(
            "Budget not found."
        );

    }


    await deleteBudgetModel(
        id,
        userId
    );

}
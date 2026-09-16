/**
 * ==========================================================
 * FINVERSE AI
 * Budget Service
 * ==========================================================
 */

import {

    createBudgetApi,

    getBudgetsApi,

    getBudgetByIdApi,

    updateBudgetApi,

    deleteBudgetApi,

} from "../api/budgetApi";

/* ==========================================================
   Create Budget
========================================================== */

export async function createBudgetService(data) {

    const response = await createBudgetApi(data);

    return response.data;

}

/* ==========================================================
   Get All Budgets
========================================================== */

export async function getBudgetsService() {

    const response = await getBudgetsApi();

    return response.data;

}

/* ==========================================================
   Get Budget By Id
========================================================== */

export async function getBudgetByIdService(id) {

    const response = await getBudgetByIdApi(id);

    return response.data;

}

/* ==========================================================
   Update Budget
========================================================== */

export async function updateBudgetService(id, data) {

    const response = await updateBudgetApi(

        id,

        data

    );

    return response.data;

}

/* ==========================================================
   Delete Budget
========================================================== */

export async function deleteBudgetService(id) {

    const response = await deleteBudgetApi(id);

    return response.data;

}
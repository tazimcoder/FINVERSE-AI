/**
 * ==========================================================
 * FINVERSE AI
 * Budget API
 * ==========================================================
 */

import api from "../../../services/api";


/* ==========================================================
   Create Budget
========================================================== */

export function createBudgetApi(data) {

    return api.post(

        "/budgets",

        data

    );

}


/* ==========================================================
   Get All Budgets
========================================================== */

export function getBudgetsApi() {

    return api.get(

        "/budgets"

    );

}


/* ==========================================================
   Get Budget By Id
========================================================== */

export function getBudgetByIdApi(id) {

    return api.get(

        `/budgets/${id}`

    );

}


/* ==========================================================
   Update Budget
========================================================== */

export function updateBudgetApi(id, data) {

    return api.put(

        `/budgets/${id}`,

        data

    );

}


/* ==========================================================
   Delete Budget
========================================================== */

export function deleteBudgetApi(id) {

    return api.delete(

        `/budgets/${id}`

    );

}
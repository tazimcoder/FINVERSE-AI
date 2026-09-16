/**
 * ==========================================================
 * FINVERSE AI
 * Investment Service
 * ==========================================================
 */

import {

    getInvestmentsApi,

    getInvestmentTypesApi,

    createInvestmentApi,

    updateInvestmentApi,

    deleteInvestmentApi,

    getPortfolioSummaryApi,

    getPortfolioAllocationApi,

    getPortfolioGrowthApi,

} from "../api/investmentApi";

/* ========================================================== */

export async function getInvestments() {

    const response = await getInvestmentsApi();

    return response.data.data;

}

/* ========================================================== */

export async function getInvestmentTypes() {

    const response = await getInvestmentTypesApi();

    return response.data.data;

}

/* ========================================================== */

export async function createInvestment(data) {

    const response = await createInvestmentApi(data);

    return response.data.data;

}

/* ========================================================== */

export async function updateInvestment(id, data) {

    const response = await updateInvestmentApi(id, data);

    return response.data;

}

/* ========================================================== */

export async function deleteInvestment(id) {

    const response = await deleteInvestmentApi(id);

    return response.data;

}

/* ==========================================================
Portfolio Growth
========================================================== */

export async function getPortfolioGrowth() {

    const response = await getPortfolioGrowthApi();

    return response.data.data;

}

/* ==========================================================
Portfolio Summary
========================================================== */

export async function getPortfolioSummary() {

    const response = await getPortfolioSummaryApi();

    return response.data.data;

}

/* ==========================================================
Portfolio Allocation
========================================================== */

export async function getPortfolioAllocation() {

    const response = await getPortfolioAllocationApi();

    return response.data.data;

}
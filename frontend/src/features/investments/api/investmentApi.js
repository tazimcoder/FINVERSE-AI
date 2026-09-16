/**
 * ==========================================================
 * FINVERSE AI
 * Investment API
 * ==========================================================
 */

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/investments";

export function getInvestmentsApi() {
    return axios.get(BASE_URL);
}

export function getInvestmentTypesApi() {
    return axios.get(`${BASE_URL}/types`);
}

export function createInvestmentApi(data) {
    return axios.post(BASE_URL, data);
}

export function updateInvestmentApi(id, data) {
    return axios.put(`${BASE_URL}/${id}`, data);
}

export function deleteInvestmentApi(id) {
    return axios.delete(`${BASE_URL}/${id}`);
}

/* ==========================================================
Portfolio Growth
========================================================== */

export function getPortfolioGrowthApi() {
    return axios.get(`${BASE_URL}/growth`);
}

/* ==========================================================
Portfolio Summary
========================================================== */

export function getPortfolioSummaryApi() {
    return axios.get(`${BASE_URL}/summary`);
}

/* ==========================================================
Portfolio Allocation
========================================================== */

export function getPortfolioAllocationApi() {
    return axios.get(`${BASE_URL}/allocation`);
}


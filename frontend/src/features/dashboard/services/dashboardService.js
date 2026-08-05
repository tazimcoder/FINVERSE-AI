/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Service
 * ==========================================================
 */

import { getDashboardApi } from "../api/dashboardApi";

/* ==========================================================
   Dashboard Summary
========================================================== */

export async function getDashboardService() {

    const response = await getDashboardApi();

    return response.data;

}
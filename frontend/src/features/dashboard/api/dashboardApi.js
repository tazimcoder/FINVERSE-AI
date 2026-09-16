/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard API
 * ==========================================================
 */

import api from "../../../services/api";


/**
 * ==========================================================
 * GET DASHBOARD
 * ==========================================================
 */

export async function getDashboardApi() {

    const response =
        await api.get("/dashboard");

    return response.data;
}
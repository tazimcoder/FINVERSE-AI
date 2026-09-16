/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Service
 * ==========================================================
 *
 * API layer aur Hook ke beech business/data layer.
 *
 * ==========================================================
 */

import {
    getDashboardApi,
} from "../api/dashboardApi";


/**
 * ==========================================================
 * GET DASHBOARD
 * ==========================================================
 */

export async function getDashboardService() {

    const response =
        await getDashboardApi();


    /**
     * Backend:
     *
     * {
     *   success: true,
     *   data: {...}
     * }
     *
     * API layer response.data return karti hai.
     *
     * Isliye yahan:
     *
     * response.data
     *
     * actual dashboard object hai.
     */

    return response?.data ?? {};
}
/**
 * ==========================================================
 * FINVERSE AI
 * Admin Dashboard API Service
 * ==========================================================
 *
 * Location:
 * src/admin/api/adminDashboardApi.js
 *
 * Responsibility:
 * - Fetch live admin platform statistics from backend
 * ==========================================================
 */

import api from "../../services/api";

export async function getAdminDashboardStatsApi() {
    const response = await api.get("/admin/dashboard");
    return response.data;
}

/**
 * ==========================================================
 * FINVERSE AI
 * Admin History API
 * ==========================================================
 *
 * Location:
 * frontend/src/admin/api/adminHistoryApi.js
 *
 * Responsibility:
 * - Admin History & Audit Log API calls
 * ==========================================================
 */

import api from "../../services/api";

// GET ALL HISTORY LOGS WITH FILTERS
export const getAdminHistoryApi = (params = {}) => {
    return api.get("/admin/history", { params });
};

// POST MANUAL AUDIT LOG EVENT
export const logAdminEventApi = (payload) => {
    return api.post("/admin/history/log", payload);
};

export default {
    getAdminHistoryApi,
    logAdminEventApi
};

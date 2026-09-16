/**
 * ==========================================================
 * FINVERSE AI
 * Admin Reports API
 * ==========================================================
 */

import api from "../../services/api";

export async function getAdminReportsApi() {
    const response = await api.get("/admin/reports");
    return response.data;
}

/**
 * ==========================================================
 * FINVERSE AI
 * Admin Global Search API
 * ==========================================================
 */

import api from "../../services/api";

export async function searchAdminPlatformApi(query) {
    const response = await api.get(`/admin/search?q=${encodeURIComponent(query)}`);
    return response.data;
}

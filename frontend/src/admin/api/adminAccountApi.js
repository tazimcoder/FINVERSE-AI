/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account API
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin Account API endpoints
 * - Communicate with FINVERSE AI backend
 * - Keep endpoint definitions separate from services
 *
 * IMPORTANT:
 *
 * - No React logic
 * - No UI logic
 * - No business logic
 * - Authentication token is attached by Axios interceptor
 *
 * Backend Base URL:
 *
 * /api/v1
 *
 * Admin Account Endpoints:
 *
 * GET   /admin/accounts
 * GET   /admin/accounts/:id
 * PATCH /admin/accounts/:id/status
 *
 * ==========================================================
 */

import api from "../../services/api";

// ==========================================================
// GET ALL ADMIN ACCOUNTS
// ==========================================================

export const getAdminAccountsApi = () => {
    return api.get("/admin/accounts");
};

// ==========================================================
// GET SINGLE ADMIN ACCOUNT
// ==========================================================

export const getAdminAccountByIdApi = (id) => {
    return api.get(`/admin/accounts/${id}`);
};

// ==========================================================
// UPDATE ACCOUNT STATUS
// ==========================================================

export const updateAdminAccountStatusApi = (id, isActive) => {
    return api.patch(
        `/admin/accounts/${id}/status`,
        {
            is_active: isActive,
        }
    );
};

export const deleteAdminAccountApi = (id) => {
    return api.delete(`/admin/accounts/${id}`);
};

export const restoreAdminAccountApi = (id) => {
    return api.patch(`/admin/accounts/${id}/restore`);
};

// ==========================================================
// EXPORT
// ==========================================================

export default {
    getAdminAccountsApi,
    getAdminAccountByIdApi,
    updateAdminAccountStatusApi,
    deleteAdminAccountApi,
    restoreAdminAccountApi,
};
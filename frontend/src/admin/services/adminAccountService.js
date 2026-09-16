/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin Account API communication
 * - Keep API calls separate from UI
 * - Provide reusable Admin Account methods
 *
 * IMPORTANT:
 *
 * - No React logic
 * - No UI logic
 * - No business logic
 * - Axios configuration stays inside services/api
 *
 * ==========================================================
 */

import {
    getAdminAccountsApi,
    getAdminAccountByIdApi,
    updateAdminAccountStatusApi,
} from "../api/adminAccountApi";

// ==========================================================
// GET ALL ACCOUNTS
// ==========================================================

export async function getAdminAccountsService() {

    const response =
        await getAdminAccountsApi();

    return response.data;

}


// ==========================================================
// GET SINGLE ACCOUNT
// ==========================================================

export async function getAdminAccountByIdService(id) {

    const response =
        await getAdminAccountByIdApi(id);

    return response.data;

}


// ==========================================================
// UPDATE ACCOUNT STATUS
// ==========================================================

export async function updateAdminAccountStatusService(
    id,
    isActive
) {

    const response =
        await updateAdminAccountStatusApi(
            id,
            isActive
        );

    return response.data;

}
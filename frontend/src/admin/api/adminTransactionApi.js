/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction API
 * ==========================================================
 *
 * Responsibility:
 *
 * - Communicate with Admin Transaction backend APIs
 * - Fetch all transactions
 * - Fetch single transaction
 *
 * Architecture:
 *
 * AdminTransactionsPage
 *        ↓
 * useAdminTransactions
 *        ↓
 * adminTransactionService
 *        ↓
 * adminTransactionApi
 *        ↓
 * Axios
 *        ↓
 * Backend
 *
 * ==========================================================
 */

import api from "../../services/api.js";


// ==========================================================
// GET ALL ADMIN TRANSACTIONS
// ==========================================================
//
// GET
// /api/v1/admin/transactions
//
// ==========================================================

export async function fetchAdminTransactions() {

    const response =
        await api.get(
            "/admin/transactions"
        );

    return response.data;
}


// ==========================================================
// GET SINGLE ADMIN TRANSACTION
// ==========================================================
//
// GET
// /api/v1/admin/transactions/:id
//
// ==========================================================

export async function fetchAdminTransactionById(
    id
) {

    const response =
        await api.get(
            `/admin/transactions/${id}`
        );

    return response.data;
}


export async function deleteAdminTransactionApi(id) {
    const response = await api.delete(`/admin/transactions/${id}`);
    return response.data;
}

export async function restoreAdminTransactionApi(id) {
    const response = await api.patch(`/admin/transactions/${id}/restore`);
    return response.data;
}

// ==========================================================
// EXPORT
// ==========================================================

export default {
    fetchAdminTransactions,
    fetchAdminTransactionById,
    deleteAdminTransactionApi,
    restoreAdminTransactionApi,
};
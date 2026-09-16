/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin Transaction business/service layer
 * - Fetch all platform transactions
 * - Fetch individual transaction
 * - Keep API communication separate from React components
 *
 * Architecture:
 *
 * Component
 *     ↓
 * Hook
 *     ↓
 * Service
 *     ↓
 * API
 *     ↓
 * Backend
 *
 * ==========================================================
 */

import {
    fetchAdminTransactions,
    fetchAdminTransactionById,
} from "../api/adminTransactionApi.js";


// ==========================================================
// GET ALL ADMIN TRANSACTIONS
// ==========================================================

export async function getAdminTransactions() {

    const response =
        await fetchAdminTransactions();

    return response;
}


// ==========================================================
// GET SINGLE ADMIN TRANSACTION
// ==========================================================

export async function getAdminTransactionById(
    id
) {

    const response =
        await fetchAdminTransactionById(
            id
        );

    return response;
}


// ==========================================================
// EXPORT
// ==========================================================

export default {
    getAdminTransactions,
    getAdminTransactionById,
};
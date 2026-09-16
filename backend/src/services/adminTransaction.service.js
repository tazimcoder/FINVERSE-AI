/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Service
 * ==========================================================
 *
 * Responsibility:
 * - Admin transaction business logic
 * - Communicate with transaction model
 * - Keep database logic outside service
 *
 * ==========================================================
 */

import {
    findAllTransactions,
    findTransactionById,
} from "../models/adminTransaction.model.js";

// ==========================================================
// GET ALL TRANSACTIONS
// ==========================================================

export async function getAllTransactions(filters = {}) {
    return await findAllTransactions(filters);
}

// ==========================================================
// GET SINGLE TRANSACTION
// ==========================================================

export async function getTransaction(id) {
    const transaction = await findTransactionById(id);

    if (!transaction) {
        throw new Error("Transaction not found.");
    }

    return transaction;
}
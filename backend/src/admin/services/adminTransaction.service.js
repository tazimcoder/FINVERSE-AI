/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Service
 * ==========================================================
 *
 * Responsibility:
 *
 * - Admin transaction business logic
 * - Fetch all platform transactions
 * - Fetch individual transaction
 * - Validate transaction requests
 * - Keep database logic inside model
 * - Keep HTTP logic inside controller
 *
 * IMPORTANT:
 *
 * - No Express logic
 * - No HTTP response handling
 * - No frontend logic
 * - Existing USER transaction service remains untouched
 *
 * Architecture:
 *
 * Controller
 *      ↓
 * Service
 *      ↓
 * Model
 *      ↓
 * MySQL
 *
 * ==========================================================
 */

import {
    findAllTransactions,
    findTransactionById,
    deleteTransactionById,
    restoreTransactionById,
} from "../models/adminTransaction.model.js";

// ==========================================================
// GET ALL TRANSACTIONS
// ==========================================================

export async function getAllTransactions() {
    const transactions =
        await findAllTransactions();

    return transactions;
}

// ==========================================================
// GET SINGLE TRANSACTION
// ==========================================================

export async function getTransaction(id) {
    if (
        id === undefined ||
        id === null ||
        Number.isNaN(Number(id)) ||
        Number(id) <= 0
    ) {
        throw new Error(
            "Valid transaction ID is required."
        );
    }

    const transaction =
        await findTransactionById(
            Number(id)
        );

    if (!transaction) {
        throw new Error(
            "Transaction not found."
        );
    }

    return transaction;
}

// ==========================================================
// REMOVE TRANSACTION
// ==========================================================

export async function removeTransactionService(id) {
    const affectedRows = await deleteTransactionById(id);
    if (affectedRows === 0) {
        throw new Error("Transaction not found.");
    }
    return true;
}

// ==========================================================
// RESTORE TRANSACTION
// ==========================================================

export async function restoreTransactionService(id) {
    const affectedRows = await restoreTransactionById(id);
    if (affectedRows === 0) {
        throw new Error("Transaction not found.");
    }
    return true;
}
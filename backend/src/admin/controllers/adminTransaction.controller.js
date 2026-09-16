/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin Transaction HTTP requests
 * - Validate transaction ID
 * - Return standardized API responses
 * - Keep business logic inside service
 *
 * IMPORTANT:
 *
 * - Authentication is handled by middleware
 * - ADMIN authorization is handled by middleware
 * - Database access is handled by model
 * - Business logic is handled by service
 * - Existing USER transaction controller is untouched
 *
 * Architecture:
 *
 * Request
 *    ↓
 * Admin Routes
 *    ↓
 * Middleware
 *    ↓
 * Controller
 *    ↓
 * Service
 *    ↓
 * Model
 *    ↓
 * MySQL
 *
 * ==========================================================
 */

import {
    getAllTransactions,
    getTransaction,
} from "../services/adminTransaction.service.js";

// ==========================================================
// GET ALL TRANSACTIONS
// ==========================================================
//
// GET
// /api/v1/admin/transactions
//
// ==========================================================

export async function getTransactions(req, res) {

    try {

        const transactions =
            await getAllTransactions();

        return res.status(200).json({

            success: true,

            message:
                "Transactions fetched successfully.",

            data: {

                transactions,

                count:
                    transactions.length,

            },

        });

    }

    catch (error) {

        console.error(
            "Admin Get Transactions Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch transactions.",

        });

    }
}

// ==========================================================
// GET SINGLE TRANSACTION
// ==========================================================
//
// GET
// /api/v1/admin/transactions/:id
//
// ==========================================================

export async function getTransactionById(
    req,
    res
) {

    try {

        const { id } =
            req.params;

        // --------------------------------------------------
        // Validate Transaction ID
        // --------------------------------------------------

        if (
            !id ||
            Number.isNaN(Number(id)) ||
            Number(id) <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid transaction ID is required.",

            });

        }

        // --------------------------------------------------
        // Get Transaction
        // --------------------------------------------------

        const transaction =
            await getTransaction(
                Number(id)
            );

        return res.status(200).json({

            success: true,

            message:
                "Transaction fetched successfully.",

            data: transaction,

        });

    }

    catch (error) {

        console.error(
            "Admin Get Transaction Error:",
            error.message
        );

        // --------------------------------------------------
        // Validation Error
        // --------------------------------------------------

        if (
            error.message ===
            "Valid transaction ID is required."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message,

            });

        }

        // --------------------------------------------------
        // Transaction Not Found
        // --------------------------------------------------

        if (
            error.message ===
            "Transaction not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Transaction not found.",

            });

        }

        // --------------------------------------------------
        // Server Error
        // --------------------------------------------------

        return res.status(500).json({
            success: false,
            message: "Unable to fetch transaction.",
        });
    }
}

// ==========================================================
// DELETE TRANSACTION
// DELETE /api/v1/admin/transactions/:id
// ==========================================================

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid transaction ID is required.",
            });
        }

        await removeTransactionService(Number(id));
        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully.",
        });
    } catch (error) {
        console.error("Admin Delete Transaction Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Unable to delete transaction.",
        });
    }
}

// ==========================================================
// RESTORE TRANSACTION
// PATCH /api/v1/admin/transactions/:id/restore
// ==========================================================

export async function restoreTransaction(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid transaction ID is required.",
            });
        }

        await restoreTransactionService(Number(id));
        return res.status(200).json({
            success: true,
            message: "Transaction restored successfully.",
        });
    } catch (error) {
        console.error("Admin Restore Transaction Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Unable to restore transaction.",
        });
    }
}
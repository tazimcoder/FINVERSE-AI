/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin Account Management HTTP requests
 * - Validate basic request parameters
 * - Return standardized API responses
 *
 * IMPORTANT:
 *
 * - Authentication handled by middleware
 * - Role authorization handled by middleware
 * - Business logic stays inside service
 *
 * ==========================================================
 */

import {
    getAllAccounts,
    getAccount,
    changeAccountStatus,
    removeAccountService,
    restoreAccountService,
} from "../services/adminAccount.service.js";

import { createAuditLogRecord } from "../models/adminHistory.model.js";

// ==========================================================
// GET ALL ACCOUNTS
// GET /api/v1/admin/accounts
// ==========================================================

export async function getAccounts(
    req,
    res
) {

    try {

        const accounts =
            await getAllAccounts();

        return res.status(200).json({

            success: true,

            message:
                "Accounts fetched successfully.",

            data: {

                accounts,

                count: accounts.length,

            },

        });

    }

    catch (error) {

        console.error(
            "Admin Get Accounts Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch accounts.",

        });

    }
}

// ==========================================================
// GET SINGLE ACCOUNT
// GET /api/v1/admin/accounts/:id
// ==========================================================

export async function getAccountById(
    req,
    res
) {

    try {

        const { id } =
            req.params;

        if (
            !id ||
            Number.isNaN(Number(id))
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid account ID is required.",

            });

        }

        const account =
            await getAccount(
                Number(id)
            );

        return res.status(200).json({

            success: true,

            message:
                "Account fetched successfully.",

            data: account,

        });

    }

    catch (error) {

        console.error(
            "Admin Get Account Error:",
            error.message
        );

        if (
            error.message ===
            "Account not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Account not found.",

            });

        }

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch account.",

        });

    }
}

// ==========================================================
// UPDATE ACCOUNT STATUS
// PATCH /api/v1/admin/accounts/:id/status
// ==========================================================

export async function updateAccountStatus(
    req,
    res
) {

    try {

        const { id } =
            req.params;

        const { is_active } =
            req.body;

        if (
            !id ||
            Number.isNaN(Number(id))
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid account ID is required.",

            });

        }

        if (
            is_active !== 0 &&
            is_active !== 1 &&
            is_active !== true &&
            is_active !== false
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "is_active must be 0, 1, true or false.",

            });

        }

        const normalizedStatus =
            Number(Boolean(is_active));

        const account =
            await changeAccountStatus(
                Number(id),
                normalizedStatus
            );

        createAuditLogRecord({
            admin_id: req.user?.id || 1,
            admin_name: req.user?.full_name || "Super Admin",
            admin_email: req.user?.email || "admin@finverse.ai",
            action_type: normalizedStatus === 1 ? "ACCOUNT_UNFROZEN" : "ACCOUNT_FROZEN",
            category: "ACCOUNTS",
            severity: normalizedStatus === 1 ? "SUCCESS" : "WARNING",
            target_type: "Bank Account",
            target_id: `ACC-#${id}`,
            description: `Bank account #${id} status updated to ${normalizedStatus === 1 ? "ACTIVE" : "FROZEN"}.`,
            after_state: { account_id: id, is_active: normalizedStatus },
            ip_address: req.ip || "127.0.0.1"
        }).catch(err => console.error("Audit log error:", err.message));

        return res.status(200).json({

            success: true,

            message:
                normalizedStatus === 1
                    ? "Account activated successfully."
                    : "Account deactivated successfully.",

            data: account,

        });

    }

    catch (error) {

        console.error(
            "Admin Change Account Status Error:",
            error.message
        );

        if (
            error.message ===
            "Account not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Account not found.",

            });

        }

        return res.status(500).json({

            success: false,

            message:
                "Unable to update account status.",

        });

    }
}

// ==========================================================
// DELETE ACCOUNT
// DELETE /api/v1/admin/accounts/:id
// ==========================================================

export async function deleteAccount(req, res) {
    try {
        const { id } = req.params;

        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid account ID is required.",
            });
        }

        await removeAccountService(Number(id));

        createAuditLogRecord({
            admin_id: req.user?.id || 1,
            admin_name: req.user?.full_name || "Super Admin",
            admin_email: req.user?.email || "admin@finverse.ai",
            action_type: "ACCOUNT_DELETED",
            category: "ACCOUNTS",
            severity: "DANGER",
            target_type: "Bank Account",
            target_id: `ACC-#${id}`,
            description: `Soft deleted bank account #${id}. Account retained in MySQL DB for audit trail.`,
            after_state: { account_id: id, is_deleted: 1, status: "deleted" },
            ip_address: req.ip || "127.0.0.1"
        }).catch(err => console.error("Audit log error:", err.message));

        return res.status(200).json({
            success: true,
            message: "Bank account deleted successfully from MySQL DB.",
        });
    } catch (error) {
        console.error("Admin Delete Account Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Unable to delete account.",
        });
    }
}

// ==========================================================
// RESTORE ACCOUNT
// PATCH /api/v1/admin/accounts/:id/restore
// ==========================================================

export async function restoreAccount(req, res) {
    try {
        const { id } = req.params;

        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid account ID is required.",
            });
        }

        await restoreAccountService(Number(id));

        createAuditLogRecord({
            admin_id: req.user?.id || 1,
            admin_name: req.user?.full_name || "Super Admin",
            admin_email: req.user?.email || "admin@finverse.ai",
            action_type: "ACCOUNT_RESTORED",
            category: "ACCOUNTS",
            severity: "SUCCESS",
            target_type: "Bank Account",
            target_id: `ACC-#${id}`,
            description: `Restored soft-deleted bank account #${id} to ACTIVE state in MySQL DB.`,
            after_state: { account_id: id, is_deleted: 0, status: "ACTIVE" },
            ip_address: req.ip || "127.0.0.1"
        }).catch(err => console.error("Audit log error:", err.message));

        return res.status(200).json({
            success: true,
            message: "Bank account restored successfully in MySQL DB.",
        });
    } catch (error) {
        console.error("Admin Restore Account Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Unable to restore account.",
        });
    }
}
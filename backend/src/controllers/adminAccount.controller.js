/**
 * ==========================================================
 * FINVERSE AI
 * Admin Account Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin Account HTTP requests
 * - Validate request parameters
 * - Return standardized API responses
 *
 * IMPORTANT:
 *
 * - Authentication handled by middleware
 * - Admin authorization handled by middleware
 * - Business logic stays inside service
 *
 * ==========================================================
 */

import {

    getAllAdminAccounts,

    getAdminAccount,

    changeAdminAccountStatus,

} from "../services/adminAccount.service.js";


// ==========================================================
// GET ALL ACCOUNTS
// GET /api/v1/admin/accounts
// ==========================================================

export async function getAdminAccounts(
    req,
    res
) {

    try {

        const accounts =
            await getAllAdminAccounts();


        return res.status(200).json({

            success: true,

            message:
                "Admin accounts fetched successfully.",

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
                "Unable to fetch admin accounts.",

        });

    }

}


// ==========================================================
// GET SINGLE ACCOUNT
// GET /api/v1/admin/accounts/:id
// ==========================================================

export async function getAdminAccountById(
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
            await getAdminAccount(
                Number(id)
            );


        return res.status(200).json({

            success: true,

            message:
                "Admin account fetched successfully.",

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

export async function updateAdminAccountStatusController(
    req,
    res
) {

    try {

        const { id } =
            req.params;

        const { is_active } =
            req.body;


        // --------------------------------------------------
        // Validate ID
        // --------------------------------------------------

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


        // --------------------------------------------------
        // Validate Status
        // --------------------------------------------------

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
            await changeAdminAccountStatus(

                Number(id),

                normalizedStatus

            );


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
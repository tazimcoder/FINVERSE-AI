/**
 * ==========================================================
 * FINVERSE AI
 * Admin Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin HTTP requests
 * - Validate request data
 * - Return API responses
 *
 * No database queries here.
 *
 * ==========================================================
 */

import {
    getUsers,
    getUser,
    changeUserStatus,
} from "../services/admin.service.js";


// ==========================================================
// GET ALL USERS
// GET /api/v1/admin/users
// ==========================================================

export async function getAllUsersController(
    req,
    res
) {

    try {

        const users =
            await getUsers();


        return res.status(200).json({

            success: true,

            message:
                "Users fetched successfully.",

            count: users.length,

            data: users,

        });

    }

    catch (error) {

        console.error(
            "Admin Get Users Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch users.",

        });

    }
}


// ==========================================================
// GET USER BY ID
// GET /api/v1/admin/users/:id
// ==========================================================

export async function getUserController(
    req,
    res
) {

    try {

        const {
            id,
        } = req.params;


        const user =
            await getUser(id);


        return res.status(200).json({

            success: true,

            message:
                "User fetched successfully.",

            data: user,

        });

    }

    catch (error) {

        console.error(
            "Admin Get User Error:",
            error.message
        );


        if (
            error.message ===
            "User not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found.",

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch user.",

        });

    }
}


// ==========================================================
// UPDATE USER STATUS
// PATCH /api/v1/admin/users/:id/status
// ==========================================================

export async function updateUserStatusController(
    req,
    res
) {

    try {

        const {
            id,
        } = req.params;


        const {
            is_active,
        } = req.body;


        // --------------------------------------------------
        // Validate Status
        // --------------------------------------------------

        if (
            typeof is_active !==
            "boolean"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "is_active must be a boolean.",

            });

        }


        const user =
            await changeUserStatus(
                id,
                is_active
            );


        return res.status(200).json({

            success: true,

            message:
                is_active
                    ? "User activated successfully."
                    : "User deactivated successfully.",

            data: user,

        });

    }

    catch (error) {

        console.error(
            "Admin Update User Status Error:",
            error.message
        );


        if (
            error.message ===
            "User not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found.",

            });

        }


        if (
            error.message.includes(
                "Admin account"
            )
        ) {

            return res.status(403).json({

                success: false,

                message:
                    error.message,

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to update user status.",

        });

    }
}
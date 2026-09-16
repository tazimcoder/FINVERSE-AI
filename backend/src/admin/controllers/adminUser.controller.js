/**
 * ==========================================================
 * FINVERSE AI
 * Admin User Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin User Management HTTP requests
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
    getAllUsers,
    getUser,
    changeUserStatus,
    updateAdminProfileService,
    changeUserRoleService,
    updateUserProfileByAdminService,
} from "../services/adminUser.service.js";

import { createAuditLogRecord } from "../models/adminHistory.model.js";




// ==========================================================
// GET ALL USERS
// GET /api/v1/admin/users
// ==========================================================

export async function getUsers(req, res) {

    try {

        const users =
            await getAllUsers();

        return res.status(200).json({

            success: true,

            message:
                "Users fetched successfully.",

            data: {

                users,

                count: users.length,

            },

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
// GET SINGLE USER
// GET /api/v1/admin/users/:id
// ==========================================================

export async function getUserById(req, res) {

    try {

        const { id } =
            req.params;


        // --------------------------------------------------
        // Validate ID
        // --------------------------------------------------

        if (!id || Number.isNaN(Number(id))) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid user ID is required.",

            });

        }


        const user =
            await getUser(Number(id));


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
// CHANGE USER STATUS
// PATCH /api/v1/admin/users/:id/status
// ==========================================================
//
// Body:
//
// {
//     "is_active": 1
// }
//
// or
//
// {
//     "is_active": 0
// }
//
// ==========================================================

export async function updateUserStatus(
    req,
    res
) {

    try {

        const { id } =
            req.params;

        const { is_active } =
            req.body;


        // --------------------------------------------------
        // Validate User ID
        // --------------------------------------------------

        if (!id || Number.isNaN(Number(id))) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid user ID is required.",

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


        const user =
            await changeUserStatus(

                Number(id),

                normalizedStatus

            );


        return res.status(200).json({

            success: true,

            message:
                normalizedStatus === 1

                    ? "User activated successfully."

                    : "User deactivated successfully.",

            data: user,

        });

    }

    catch (error) {

        console.error(
            "Admin Change User Status Error:",
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
            error.message ===
            "Primary admin account cannot be deactivated."
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

// ==========================================================
// UPDATE ADMIN PROFILE
// PATCH /api/v1/admin/profile
// ==========================================================

export async function updateAdminProfile(req, res) {
    try {
        const userId = req.user.id;
        const { full_name, email, avatar_url, avatar, password } = req.body;

        if (!full_name || full_name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Full name cannot be empty.",
            });
        }

        const updatedUser = await updateAdminProfileService(userId, {
            full_name,
            email,
            avatar_url: avatar_url || avatar,
            password
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Admin Profile Update Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update profile.",
        });
    }
}


// ==========================================================
// UPDATE USER PROFILE (ADMIN ACCESS)
// PATCH /api/v1/admin/users/:id/profile
// ==========================================================

export async function updateUserProfileByAdmin(req, res) {
    try {
        const { id } = req.params;
        const {
            full_name,
            email,
            mobile,
            phone,
            account_tier,
            credit_limit,
            kyc_status,
            is_active,
            feature_permissions,
            password
        } = req.body;

        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid user ID is required.",
            });
        }

        if (!full_name || full_name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Full name is required.",
            });
        }

        const updatedUser = await updateUserProfileByAdminService(Number(id), {
            full_name,
            email,
            mobile,
            phone,
            account_tier,
            credit_limit,
            kyc_status,
            is_active,
            feature_permissions,
            password
        });

        createAuditLogRecord({
            admin_id: req.user?.id || 1,
            admin_name: req.user?.full_name || "Super Admin",
            admin_email: req.user?.email || "admin@finverse.ai",
            action_type: "USER_CUSTOMIZATION_UPDATED",
            category: "CUSTOMIZATION",
            severity: "INFO",
            target_type: "User Profile",
            target_id: `USR-#${id}`,
            description: `Updated customization parameters for ${full_name} (#${id}): Tier=${account_tier || 'Standard'}, Credit Limit=₹${credit_limit || 0}, KYC=${kyc_status || 'UNVERIFIED'}.`,
            after_state: { user_id: id, full_name, account_tier, credit_limit, kyc_status, is_active },
            ip_address: req.ip || "127.0.0.1"
        }).catch(err => console.error("Audit log error:", err.message));

        return res.status(200).json({
            success: true,
            message: "User profile & customization updated successfully in database.",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Admin User Profile Update Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update user profile.",
        });
    }
}

// ==========================================================
// UPDATE USER ROLE
// PATCH /api/v1/admin/users/:id/role
// ==========================================================

export async function updateUserRole(req, res) {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid user ID is required.",
            });
        }

        const updatedUser = await changeUserRoleService(Number(id), role);

        return res.status(200).json({
            success: true,
            message: `Role changed to ${role} successfully.`,
            data: updatedUser,
        });
    } catch (error) {
        console.error("Admin User Role Update Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update role.",
        });
    }
}
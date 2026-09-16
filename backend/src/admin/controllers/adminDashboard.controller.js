/**
 * ==========================================================
 * FINVERSE AI
 * Admin Dashboard Controller
 * ==========================================================
 *
 * Responsibility:
 *
 * - Handle Admin Dashboard HTTP requests
 * - Validate request at controller level when required
 * - Return standardized API responses
 *
 * Business logic belongs to Service.
 * Database queries belong to Model.
 *
 * ==========================================================
 */

import {
    getAdminDashboardStats,
} from "../services/adminDashboard.service.js";


// ==========================================================
// GET ADMIN DASHBOARD
// ==========================================================
//
// GET /api/v1/admin/dashboard
//
// Protected:
// ADMIN only
//
// ==========================================================

export async function getAdminDashboard(req, res) {

    try {

        const stats =
            await getAdminDashboardStats();


        return res.status(200).json({

            success: true,

            message:
                "Admin dashboard data fetched successfully.",

            data: stats,

        });

    }

    catch (error) {

        console.error(
            "Admin Dashboard Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch admin dashboard data.",

        });

    }

}
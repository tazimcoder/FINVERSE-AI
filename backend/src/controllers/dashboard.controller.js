/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Controller
 * ==========================================================
 *
 * Responsibility:
 * - Request receive karna
 * - Authenticated user identify karna
 * - Dashboard service call karna
 * - API response return karna
 *
 * ==========================================================
 */

import {
    getDashboardSummaryService,
} from "../services/dashboard.service.js";


/**
 * ==========================================================
 * GET DASHBOARD SUMMARY
 * ==========================================================
 */

export async function getDashboardSummary(req, res) {

    try {

        /**
         * JWT middleware se authenticated user.
         */

        const userId = req.user.id;


        /**
         * Dashboard data.
         */

        const dashboard =
            await getDashboardSummaryService(userId);


        /**
         * Success response.
         */

        return res.status(200).json({

            success: true,

            data: dashboard,

        });

    }

    catch (error) {

        console.error(
            "Dashboard Controller Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to load dashboard.",

        });

    }
}
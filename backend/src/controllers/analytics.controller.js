/**
 * ==========================================================
 * FINVERSE AI
 * Analytics Controller
 * ==========================================================
 */

import {
    getAnalyticsService,
} from "../services/analytics.service.js";


/* ==========================================================
   Get Analytics
========================================================== */

export async function getAnalytics(req, res) {

    try {

        /* --------------------------------------------------
           Logged-in User
        -------------------------------------------------- */

        const userId = req.user.id;


        /* --------------------------------------------------
           Get User Analytics
        -------------------------------------------------- */

        const analytics =
            await getAnalyticsService(userId);


        return res.status(200).json({

            success: true,

            data: analytics,

        });

    }

    catch (error) {

        console.error(
            "Analytics Controller Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}
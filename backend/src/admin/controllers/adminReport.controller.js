/**
 * ==========================================================
 * FINVERSE AI
 * Admin Reports Controller
 * ==========================================================
 */

import { getAdminPlatformReports } from "../models/adminReport.model.js";

export async function getAdminReports(req, res) {
    try {
        const reports = await getAdminPlatformReports();

        return res.status(200).json({
            success: true,
            data: reports,
        });
    } catch (error) {
        console.error("Admin Reports Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch platform financial reports.",
        });
    }
}

/**
 * ==========================================================
 * FINVERSE AI
 * Admin Search Controller
 * ==========================================================
 */

import { searchAdminPlatformService } from "../services/adminSearch.service.js";

export async function searchAdminPlatform(req, res) {
    try {
        const { q } = req.query;

        const results = await searchAdminPlatformService(q);

        return res.status(200).json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.error("Admin Search Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to execute platform search.",
        });
    }
}

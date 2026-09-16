/**
 * ==========================================================
 * FINVERSE AI
 * Admin History Controller
 * ==========================================================
 *
 * Location:
 * backend/src/admin/controllers/adminHistory.controller.js
 *
 * Responsibility:
 * - Express controller for Admin History & Audit Logs
 * - Handles filtering (category, severity, search, date range, pagination)
 * - Returns history summary metrics
 * ==========================================================
 */

import {
    findAllHistoryLogs,
    getHistoryStatsSummary,
    createAuditLogRecord
} from "../models/adminHistory.model.js";

// GET /api/v1/admin/history
export async function getAdminHistory(req, res) {
    try {
        const {
            category = "ALL",
            severity = "ALL",
            search = "",
            startDate = null,
            endDate = null,
            page = 1,
            limit = 20
        } = req.query;

        const [historyData, stats] = await Promise.all([
            findAllHistoryLogs({ category, severity, search, startDate, endDate, page, limit }),
            getHistoryStatsSummary()
        ]);

        return res.status(200).json({
            success: true,
            message: "Admin history logs fetched successfully.",
            data: {
                logs: historyData.logs,
                pagination: historyData.pagination,
                stats
            }
        });
    } catch (error) {
        console.error("Admin Get History Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch history logs."
        });
    }
}

// POST /api/v1/admin/history/log (Manual system event logger endpoint if needed)
export async function logAdminEvent(req, res) {
    try {
        const {
            action_type,
            category,
            severity,
            target_type,
            target_id,
            description,
            before_state,
            after_state
        } = req.body;

        if (!action_type || !description) {
            return res.status(400).json({
                success: false,
                message: "action_type and description are required."
            });
        }

        const logId = await createAuditLogRecord({
            admin_id: req.user?.id || 1,
            admin_name: req.user?.full_name || "Super Admin",
            admin_email: req.user?.email || "admin@finverse.ai",
            action_type,
            category: category || "SYSTEM",
            severity: severity || "INFO",
            target_type,
            target_id,
            description,
            before_state,
            after_state,
            ip_address: req.ip || "127.0.0.1"
        });

        return res.status(201).json({
            success: true,
            message: "Audit log recorded successfully.",
            data: { logId }
        });
    } catch (error) {
        console.error("Admin Log Event Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to record history log."
        });
    }
}

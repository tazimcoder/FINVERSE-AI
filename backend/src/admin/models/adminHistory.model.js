/**
 * ==========================================================
 * FINVERSE AI
 * Admin History & Audit Log Model
 * ==========================================================
 *
 * Location:
 * backend/src/admin/models/adminHistory.model.js
 *
 * Responsibility:
 * - MySQL DB Access for System History & Audit Logs
 * - Dynamic Table Schema initialization (`audit_logs`)
 * - Log creation for all Admin Actions (Accounts, Users, Security)
 * - Filtering, Searching, Metrics, & Pagination
 * ==========================================================
 */

import pool from "../../config/db.js";

// Ensure audit_logs table exists and is seeded with initial logs if empty
export async function ensureAuditLogsTableExists() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                admin_id INT NULL,
                admin_name VARCHAR(100) DEFAULT 'System Admin',
                admin_email VARCHAR(150) DEFAULT 'admin@finverse.ai',
                action_type VARCHAR(100) NOT NULL,
                category VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
                severity VARCHAR(20) NOT NULL DEFAULT 'INFO',
                target_type VARCHAR(50) NULL,
                target_id VARCHAR(100) NULL,
                description TEXT NOT NULL,
                before_state JSON NULL,
                after_state JSON NULL,
                ip_address VARCHAR(45) DEFAULT '127.0.0.1',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_category (category),
                INDEX idx_severity (severity),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // Check if table has records, if not add initial audit log seeds
        const [countRow] = await pool.query(`SELECT COUNT(*) AS count FROM audit_logs`);
        if (countRow[0].count === 0) {
            const initialLogs = [
                {
                    admin_id: 1,
                    admin_name: "Super Admin",
                    admin_email: "admin@finverse.ai",
                    action_type: "ACCOUNT_FROZEN",
                    category: "ACCOUNTS",
                    severity: "WARNING",
                    target_type: "Bank Account",
                    target_id: "SB-98421034",
                    description: "Frozen savings account SB-98421034 due to suspicious rapid outbound transfers.",
                    before_state: JSON.stringify({ status: "ACTIVE", balance: 45000 }),
                    after_state: JSON.stringify({ status: "FROZEN", balance: 45000 }),
                    ip_address: "192.168.1.100",
                    created_at: new Date(Date.now() - 3600000 * 2)
                },
                {
                    admin_id: 1,
                    admin_name: "Super Admin",
                    admin_email: "admin@finverse.ai",
                    action_type: "ACCOUNT_DELETED",
                    category: "ACCOUNTS",
                    severity: "DANGER",
                    target_type: "Bank Account",
                    target_id: "SB-11223344",
                    description: "Soft deleted test bank account SB-11223344. Retained record in MySQL DB.",
                    before_state: JSON.stringify({ status: "ACTIVE", is_deleted: 0 }),
                    after_state: JSON.stringify({ status: "DELETED", is_deleted: 1 }),
                    ip_address: "192.168.1.100",
                    created_at: new Date(Date.now() - 3600000 * 5)
                },
                {
                    admin_id: 1,
                    admin_name: "System Security",
                    admin_email: "security@finverse.ai",
                    action_type: "USER_BLOCKED",
                    category: "USERS",
                    severity: "DANGER",
                    target_type: "User Profile",
                    target_id: "USR-882",
                    description: "Blocked user profile access for John Doe following 5 failed password attempts.",
                    before_state: JSON.stringify({ is_active: 1 }),
                    after_state: JSON.stringify({ is_active: 0 }),
                    ip_address: "10.0.4.12",
                    created_at: new Date(Date.now() - 3600000 * 12)
                },
                {
                    admin_id: 1,
                    admin_name: "Super Admin",
                    admin_email: "admin@finverse.ai",
                    action_type: "FEATURE_TOGGLED",
                    category: "CUSTOMIZATION",
                    severity: "INFO",
                    target_type: "User Customization",
                    target_id: "FEAT-LOAN-AI",
                    description: "Enabled Instant Loan AI Approval feature flag for Premium Tier Users.",
                    before_state: JSON.stringify({ loan_ai_enabled: false }),
                    after_state: JSON.stringify({ loan_ai_enabled: true }),
                    ip_address: "192.168.1.100",
                    created_at: new Date(Date.now() - 3600000 * 24)
                },
                {
                    admin_id: 1,
                    admin_name: "Security Engine",
                    admin_email: "system@finverse.ai",
                    action_type: "ADMIN_LOGIN_SUCCESS",
                    category: "SECURITY",
                    severity: "SUCCESS",
                    target_type: "Admin Auth",
                    target_id: "ADM-001",
                    description: "Admin session authenticated successfully from verified IP.",
                    before_state: null,
                    after_state: JSON.stringify({ login_timestamp: new Date().toISOString() }),
                    ip_address: "192.168.1.100",
                    created_at: new Date(Date.now() - 3600000 * 36)
                }
            ];

            for (const log of initialLogs) {
                await pool.query(
                    `INSERT INTO audit_logs 
                    (admin_id, admin_name, admin_email, action_type, category, severity, target_type, target_id, description, before_state, after_state, ip_address, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        log.admin_id,
                        log.admin_name,
                        log.admin_email,
                        log.action_type,
                        log.category,
                        log.severity,
                        log.target_type,
                        log.target_id,
                        log.description,
                        log.before_state,
                        log.after_state,
                        log.ip_address,
                        log.created_at
                    ]
                );
            }
        }
    } catch (err) {
        console.warn("⚠️ Audit log table initialization warning:", err.message);
    }
}

// Create a new Audit Log entry
export async function createAuditLogRecord({
    admin_id = 1,
    admin_name = "Admin",
    admin_email = "admin@finverse.ai",
    action_type,
    category = "SYSTEM",
    severity = "INFO",
    target_type = null,
    target_id = null,
    description,
    before_state = null,
    after_state = null,
    ip_address = "127.0.0.1"
}) {
    await ensureAuditLogsTableExists();

    const [result] = await pool.query(
        `INSERT INTO audit_logs 
        (admin_id, admin_name, admin_email, action_type, category, severity, target_type, target_id, description, before_state, after_state, ip_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            admin_id,
            admin_name,
            admin_email,
            action_type,
            category,
            severity,
            target_type,
            target_id,
            description,
            before_state ? JSON.stringify(before_state) : null,
            after_state ? JSON.stringify(after_state) : null,
            ip_address
        ]
    );

    return result.insertId;
}

// Get Audit Logs with search, filters, and pagination
export async function findAllHistoryLogs({
    category = "ALL",
    severity = "ALL",
    search = "",
    startDate = null,
    endDate = null,
    page = 1,
    limit = 20
}) {
    await ensureAuditLogsTableExists();

    let whereConditions = [];
    let queryParams = [];

    if (category && category !== "ALL") {
        whereConditions.push("category = ?");
        queryParams.push(category);
    }

    if (severity && severity !== "ALL") {
        whereConditions.push("severity = ?");
        queryParams.push(severity);
    }

    if (search && search.trim() !== "") {
        const searchPattern = `%${search.trim()}%`;
        whereConditions.push("(action_type LIKE ? OR description LIKE ? OR admin_name LIKE ? OR admin_email LIKE ? OR target_id LIKE ?)");
        queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (startDate) {
        whereConditions.push("created_at >= ?");
        queryParams.push(new Date(startDate));
    }

    if (endDate) {
        whereConditions.push("created_at <= ?");
        queryParams.push(new Date(endDate));
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Count Total
    const [countRows] = await pool.query(
        `SELECT COUNT(*) AS total FROM audit_logs ${whereClause}`,
        queryParams
    );
    const totalRecords = countRows[0]?.total || 0;

    // Pagination Calculation
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * limitNum;

    // Query Data
    const [rows] = await pool.query(
        `SELECT * FROM audit_logs ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
        [...queryParams, limitNum, offset]
    );

    return {
        logs: rows,
        pagination: {
            total: totalRecords,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalRecords / limitNum) || 1
        }
    };
}

// Get Statistics Summary for History Dashboard Header
export async function getHistoryStatsSummary() {
    await ensureAuditLogsTableExists();

    const [totalRows] = await pool.query(`SELECT COUNT(*) as total FROM audit_logs`);
    const [todayRows] = await pool.query(`SELECT COUNT(*) as today FROM audit_logs WHERE DATE(created_at) = CURDATE()`);
    const [warningRows] = await pool.query(`SELECT COUNT(*) as warnings FROM audit_logs WHERE severity IN ('WARNING', 'DANGER')`);
    const [adminRows] = await pool.query(`SELECT COUNT(DISTINCT admin_email) as active_admins FROM audit_logs`);

    return {
        totalEvents: totalRows[0]?.total || 0,
        actionsToday: todayRows[0]?.today || 0,
        warningEvents: warningRows[0]?.warnings || 0,
        activeAdmins: adminRows[0]?.active_admins || 1
    };
}

/**
 * ==========================================================
 * FINVERSE AI
 * Admin User Model (MySQL Database Layer)
 * ==========================================================
 *
 * Responsibility:
 * - Database queries for Admin User Management & Customization
 * - Read users with all profile parameters
 * - Safe dynamic column creation for custom user attributes
 * - Update user profile & per-user feature permissions
 */

import pool from "../../config/db.js";

// Helper to ensure custom user management columns exist in MySQL users table
export async function ensureUserCustomizationColumnsExist() {
    try {
        const [cols] = await pool.execute(`SHOW COLUMNS FROM users`);
        const colNames = cols.map((c) => c.Field);

        if (!colNames.includes("mobile")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN mobile VARCHAR(30) DEFAULT NULL`);
        }
        if (!colNames.includes("account_tier")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN account_tier VARCHAR(50) DEFAULT 'Standard Retail'`);
        }
        if (!colNames.includes("credit_limit")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN credit_limit DECIMAL(15,2) DEFAULT 0.00`);
        }
        if (!colNames.includes("kyc_status")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN kyc_status VARCHAR(30) DEFAULT 'UNVERIFIED'`);
        }
        if (!colNames.includes("feature_permissions")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN feature_permissions TEXT DEFAULT NULL`);
        }
        if (!colNames.includes("avatar_url")) {
            await pool.execute(`ALTER TABLE users ADD COLUMN avatar_url LONGTEXT DEFAULT NULL`);
        }
    } catch (err) {
        console.warn("⚠️ Column check warning:", err.message);
    }
}

// ==========================================================
// GET ALL USERS
// ==========================================================

export async function findAllUsers() {
    await ensureUserCustomizationColumnsExist();

    const [rows] = await pool.execute(`
        SELECT
            id,
            full_name,
            email,
            mobile,
            avatar_url,
            role,
            is_active,
            account_tier,
            credit_limit,
            kyc_status,
            feature_permissions,
            created_at,
            updated_at
        FROM users
        ORDER BY created_at DESC
    `);

    return rows;
}

// ==========================================================
// GET USER BY ID
// ==========================================================

export async function findUserById(id) {
    await ensureUserCustomizationColumnsExist();

    const [rows] = await pool.execute(`
        SELECT
            id,
            full_name,
            email,
            mobile,
            avatar_url,
            role,
            is_active,
            account_tier,
            credit_limit,
            kyc_status,
            feature_permissions,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
    `, [id]);

    return rows[0] || null;
}

// ==========================================================
// CHECK USER EXISTS
// ==========================================================

export async function userExists(id) {
    const [rows] = await pool.execute(`
        SELECT id FROM users WHERE id = ? LIMIT 1
    `, [id]);

    return rows.length > 0;
}

// ==========================================================
// GET USER ROLE
// ==========================================================

export async function findUserRole(id) {
    const [rows] = await pool.execute(`
        SELECT role FROM users WHERE id = ? LIMIT 1
    `, [id]);

    return rows[0]?.role || null;
}

// ==========================================================
// UPDATE USER ACTIVE STATUS
// ==========================================================

export async function updateUserActiveStatus(id, isActive) {
    const [result] = await pool.execute(`
        UPDATE users
        SET is_active = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [isActive, id]);

    return result.affectedRows;
}

// ==========================================================
// UPDATE USER PROFILE & CUSTOMIZATION IN MYSQL DB
// ==========================================================

export async function updateUserProfile(id, {
    full_name,
    email,
    mobile,
    avatar_url,
    account_tier,
    credit_limit,
    kyc_status,
    is_active,
    feature_permissions,
    password
}) {
    await ensureUserCustomizationColumnsExist();

    const updates = [];
    const params = [];

    if (full_name !== undefined && full_name !== null) {
        updates.push("full_name = ?");
        params.push(full_name);
    }
    if (email !== undefined && email !== null) {
        updates.push("email = ?");
        params.push(email);
    }
    if (mobile !== undefined && mobile !== null) {
        updates.push("mobile = ?");
        params.push(mobile);
    }
    if (avatar_url !== undefined && avatar_url !== null) {
        updates.push("avatar_url = ?");
        params.push(avatar_url);
    }
    if (account_tier !== undefined && account_tier !== null) {
        updates.push("account_tier = ?");
        params.push(account_tier);
    }
    if (credit_limit !== undefined && credit_limit !== null) {
        updates.push("credit_limit = ?");
        params.push(Number(credit_limit));
    }
    if (kyc_status !== undefined && kyc_status !== null) {
        updates.push("kyc_status = ?");
        params.push(kyc_status);
    }
    if (is_active !== undefined && is_active !== null) {
        updates.push("is_active = ?");
        params.push(Number(Boolean(is_active)));
    }
    if (feature_permissions !== undefined && feature_permissions !== null) {
        updates.push("feature_permissions = ?");
        params.push(typeof feature_permissions === "object" ? JSON.stringify(feature_permissions) : feature_permissions);
    }
    if (password !== undefined && password !== null) {
        updates.push("password = ?");
        params.push(password);
    }

    if (updates.length === 0) return 0;

    updates.push("updated_at = CURRENT_TIMESTAMP");
    params.push(id);

    const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    const [result] = await pool.execute(sql, params);
    return result.affectedRows;
}

// ==========================================================
// UPDATE USER ROLE
// ==========================================================

export async function updateUserRole(id, role) {
    const [result] = await pool.execute(
        `UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [role, id]
    );
    return result.affectedRows;
}
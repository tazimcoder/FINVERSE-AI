/**
 * ==========================================================
 * FINVERSE AI
 * Admin Search Model
 * ==========================================================
 *
 * Responsibility:
 * - Execute parameterized SQL searches across platform data
 * - Hack-proof against SQL injection via mysql2 placeholders
 * ==========================================================
 */

import pool from "../../config/db.js";

export async function searchGlobalPlatform(query) {
    const searchPattern = `%${query}%`;

    const [users] = await pool.query(
        `
        SELECT id, full_name, email, role, is_active, created_at
        FROM users
        WHERE full_name LIKE ? OR email LIKE ?
        LIMIT 5
        `,
        [searchPattern, searchPattern]
    );

    const [accounts] = await pool.query(
        `
        SELECT a.id, a.account_number, a.account_type, a.balance, a.status, u.full_name as owner_name, u.email as owner_email
        FROM accounts a
        JOIN users u ON a.user_id = u.id
        WHERE a.account_number LIKE ? OR a.account_type LIKE ?
        LIMIT 5
        `,
        [searchPattern, searchPattern]
    );

    const [transactions] = await pool.query(
        `
        SELECT t.id, t.type, t.category, t.amount, t.description, t.transaction_date, u.email as user_email
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        WHERE t.description LIKE ? OR t.category LIKE ? OR t.type LIKE ?
        ORDER BY t.transaction_date DESC
        LIMIT 5
        `,
        [searchPattern, searchPattern, searchPattern]
    );

    const [loans] = await pool.query(
        `
        SELECT l.id, l.application_number, l.requested_amount, l.purpose, l.status, u.full_name as borrower_name
        FROM loan_applications l
        JOIN users u ON l.user_id = u.id
        WHERE l.application_number LIKE ? OR l.purpose LIKE ? OR l.status LIKE ?
        ORDER BY l.created_at DESC
        LIMIT 5
        `,
        [searchPattern, searchPattern, searchPattern]
    );

    return {
        users,
        accounts,
        transactions,
        loans,
    };
}

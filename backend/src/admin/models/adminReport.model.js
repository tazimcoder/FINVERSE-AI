/**
 * ==========================================================
 * FINVERSE AI
 * Admin Reports Model
 * ==========================================================
 */

import pool from "../../config/db.js";

export async function getAdminPlatformReports() {
    const [[usersStats]] = await pool.query(
        `SELECT COUNT(*) as total_users, SUM(is_active) as active_users FROM users`
    );

    const [[accountsStats]] = await pool.query(
        `SELECT COUNT(*) as total_accounts, COALESCE(SUM(balance), 0) as total_deposits FROM accounts WHERE status = 'ACTIVE'`
    );

    const [[transactionsStats]] = await pool.query(
        `
        SELECT 
            COUNT(*) as total_transactions,
            COALESCE(SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END), 0) as total_income,
            COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0) as total_expense
        FROM transactions
        `
    );

    const [[loansStats]] = await pool.query(
        `
        SELECT 
            COUNT(*) as total_applications,
            COALESCE(SUM(CASE WHEN status = 'APPROVED' THEN requested_amount ELSE 0 END), 0) as approved_loan_volume,
            COALESCE(SUM(CASE WHEN status = 'PENDING' THEN requested_amount ELSE 0 END), 0) as pending_loan_volume
        FROM loan_applications
        `
    );

    const [[investmentsStats]] = await pool.query(
        `
        SELECT 
            COUNT(*) as total_investments,
            COALESCE(SUM(invested_amount), 0) as total_invested,
            COALESCE(SUM(current_value), 0) as total_current_value
        FROM investments
        `
    );

    return {
        users: usersStats,
        accounts: accountsStats,
        transactions: transactionsStats,
        loans: loansStats,
        investments: investmentsStats,
        generated_at: new Date().toISOString(),
    };
}

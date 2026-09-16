/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Model
 * User-Specific & Financially Secure
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
   Create Transaction
   ========================================================== */

export async function createTransaction(userId, data) {

    const {
        account_id,
        type,
        category,
        amount,
        description,
        transaction_date,
    } = data;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // ------------------------------------------------------
        // Check Account Ownership & Lock Row
        // ------------------------------------------------------

        const [accounts] = await connection.query(
            `
            SELECT
                id,
                balance,
                status
            FROM accounts
            WHERE id = ?
            AND user_id = ?
            FOR UPDATE
            `,
            [
                account_id,
                userId,
            ]
        );

        if (accounts.length === 0) {
            throw new Error("Account not found.");
        }

        const account = accounts[0];

        // ------------------------------------------------------
        // Account Status Check
        // ------------------------------------------------------

        if (account.status !== "ACTIVE") {
            throw new Error("Account is not active.");
        }

        // ------------------------------------------------------
        // Amount Validation
        // ------------------------------------------------------

        if (!amount || Number(amount) <= 0) {
            throw new Error("Transaction amount must be greater than 0.");
        }

        // ------------------------------------------------------
        // Transaction Type Validation
        // ------------------------------------------------------

        if (type !== "INCOME" && type !== "EXPENSE") {
            throw new Error("Invalid transaction type.");
        }

        // ------------------------------------------------------
        // Expense Balance Check
        // ------------------------------------------------------

        if (type === "EXPENSE" && Number(account.balance) < Number(amount)) {
            throw new Error("Insufficient account balance.");
        }

        // ------------------------------------------------------
        // Update Account Balance
        // ------------------------------------------------------

        const balanceQuery = type === "INCOME"
            ? `UPDATE accounts SET balance = balance + ? WHERE id = ? AND user_id = ?`
            : `UPDATE accounts SET balance = balance - ? WHERE id = ? AND user_id = ?`;

        await connection.query(
            balanceQuery,
            [
                amount,
                account_id,
                userId,
            ]
        );

        // ------------------------------------------------------
        // Create Transaction
        // ------------------------------------------------------

        const [result] = await connection.query(
            `
            INSERT INTO transactions
            (
                user_id,
                account_id,
                type,
                category,
                amount,
                description,
                transaction_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                userId,
                account_id,
                type,
                category,
                amount,
                description,
                transaction_date,
            ]
        );

        await connection.commit();
        return result.insertId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }


}

// Helper to ensure is_deleted column exists in MySQL transactions table
export async function ensureTransactionSoftDeleteColumnExist() {
    try {
        const [cols] = await pool.query(`SHOW COLUMNS FROM transactions`);
        const colNames = cols.map((c) => c.Field);

        if (!colNames.includes("is_deleted")) {
            await pool.query(`ALTER TABLE transactions ADD COLUMN is_deleted TINYINT(1) DEFAULT 0`);
        }
    } catch (err) {
        console.warn("⚠️ Transaction column check warning:", err.message);
    }
}

/* ==========================================================
   Get All Transactions
   Only Logged-in User Transactions
   ========================================================== */

export async function getAllTransactions(userId) {
    await ensureTransactionSoftDeleteColumnExist();

    const [rows] = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE user_id = ?
          AND (is_deleted IS NULL OR is_deleted = 0)
        ORDER BY transaction_date DESC
        `,
        [
            userId,
        ]
    );

    return rows;

}

/* ==========================================================
   Get Transaction By Id
   User-Specific
   ========================================================== */

export async function getTransactionById(
    id,
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE id = ?
        AND user_id = ?
        `,
        [
            id,
            userId,
        ]
    );

    return rows[0];

}

/* ==========================================================
   Update Transaction
   User-Specific
   ========================================================== */

export async function updateTransaction(
    id,
    userId,
    data
) {

    const {
        account_id,
        type,
        category,
        amount,
        description,
        transaction_date,
    } = data;

    // ------------------------------------------------------
    // Get Existing Transaction
    // ------------------------------------------------------

    const oldTransaction =
        await getTransactionById(
            id,
            userId
        );

    if (!oldTransaction) {

        throw new Error(
            "Transaction not found"
        );

    }

    // ------------------------------------------------------
    // Validate New Amount
    // ------------------------------------------------------

    if (!amount || Number(amount) <= 0) {

        throw new Error(
            "Transaction amount must be greater than 0."
        );

    }

    // ------------------------------------------------------
    // Validate New Type
    // ------------------------------------------------------

    if (
        type !== "INCOME" &&
        type !== "EXPENSE"
    ) {

        throw new Error(
            "Invalid transaction type."
        );

    }

    // ------------------------------------------------------
    // Check New Account Ownership
    // ------------------------------------------------------

    const [accounts] = await pool.query(
        `
        SELECT
            id,
            balance,
            status
        FROM accounts
        WHERE id = ?
        AND user_id = ?
        `,
        [
            account_id,
            userId,
        ]
    );

    if (accounts.length === 0) {

        throw new Error(
            "Account not found."
        );

    }

    const newAccount = accounts[0];

    if (newAccount.status !== "ACTIVE") {

        throw new Error(
            "Account is not active."
        );

    }

    // ------------------------------------------------------
    // Reverse Old Transaction Effect
    // ------------------------------------------------------

    if (
        oldTransaction.type === "INCOME"
    ) {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance - ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                oldTransaction.amount,
                oldTransaction.account_id,
                userId,
            ]
        );

    } else {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance + ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                oldTransaction.amount,
                oldTransaction.account_id,
                userId,
            ]
        );

    }

    // ------------------------------------------------------
    // Get Updated New Account Balance
    // ------------------------------------------------------

    const [updatedAccounts] =
        await pool.query(
            `
            SELECT balance
            FROM accounts
            WHERE id = ?
            AND user_id = ?
            `,
            [
                account_id,
                userId,
            ]
        );

    const currentBalance =
        Number(
            updatedAccounts[0].balance
        );

    // ------------------------------------------------------
    // Check New Expense Balance
    // ------------------------------------------------------

    if (
        type === "EXPENSE" &&
        currentBalance < Number(amount)
    ) {

        // Restore old transaction effect

        if (
            oldTransaction.type === "INCOME"
        ) {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance + ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    oldTransaction.amount,
                    oldTransaction.account_id,
                    userId,
                ]
            );

        } else {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance - ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    oldTransaction.amount,
                    oldTransaction.account_id,
                    userId,
                ]
            );

        }

        throw new Error(
            "Insufficient account balance."
        );

    }

    // ------------------------------------------------------
    // Apply New Transaction Effect
    // ------------------------------------------------------

    if (type === "INCOME") {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance + ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                amount,
                account_id,
                userId,
            ]
        );

    } else {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance - ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                amount,
                account_id,
                userId,
            ]
        );

    }

    // ------------------------------------------------------
    // Update Transaction
    // ------------------------------------------------------

    try {

        const [result] = await pool.query(
            `
            UPDATE transactions
            SET
                account_id = ?,
                type = ?,
                category = ?,
                amount = ?,
                description = ?,
                transaction_date = ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                account_id,
                type,
                category,
                amount,
                description,
                transaction_date,
                id,
                userId,
            ]
        );

        return result;

    } catch (error) {

        // --------------------------------------------------
        // Rollback New Balance
        // --------------------------------------------------

        if (type === "INCOME") {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance - ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    amount,
                    account_id,
                    userId,
                ]
            );

        } else {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance + ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    amount,
                    account_id,
                    userId,
                ]
            );

        }

        // Restore Old Transaction Effect

        if (
            oldTransaction.type === "INCOME"
        ) {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance + ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    oldTransaction.amount,
                    oldTransaction.account_id,
                    userId,
                ]
            );

        } else {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance - ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    oldTransaction.amount,
                    oldTransaction.account_id,
                    userId,
                ]
            );

        }

        throw error;

    }

}

/* ==========================================================
   Delete Transaction
   User-Specific
   ========================================================== */

export async function deleteTransaction(
    id,
    userId
) {

    // ------------------------------------------------------
    // Get Existing Transaction
    // ------------------------------------------------------

    const transaction =
        await getTransactionById(
            id,
            userId
        );

    if (!transaction) {

        throw new Error(
            "Transaction not found"
        );

    }

    // ------------------------------------------------------
    // Reverse Transaction Effect
    // ------------------------------------------------------

    if (
        transaction.type === "INCOME"
    ) {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance - ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                transaction.amount,
                transaction.account_id,
                userId,
            ]
        );

    } else {

        await pool.query(
            `
            UPDATE accounts
            SET balance = balance + ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                transaction.amount,
                transaction.account_id,
                userId,
            ]
        );

    }

    // ------------------------------------------------------
    // Delete Transaction
    // ------------------------------------------------------

    try {

        await ensureTransactionSoftDeleteColumnExist();

        const [result] = await pool.query(
            `
            UPDATE transactions
            SET is_deleted = 1
            WHERE id = ?
            AND user_id = ?
            `,
            [
                id,
                userId,
            ]
        );

        return result;

    } catch (error) {

        // --------------------------------------------------
        // Restore Balance
        // --------------------------------------------------

        if (
            transaction.type === "INCOME"
        ) {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance + ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    transaction.amount,
                    transaction.account_id,
                    userId,
                ]
            );

        } else {

            await pool.query(
                `
                UPDATE accounts
                SET balance = balance - ?
                WHERE id = ?
                AND user_id = ?
                `,
                [
                    transaction.amount,
                    transaction.account_id,
                    userId,
                ]
            );

        }

        throw error;

    }

}
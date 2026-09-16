/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanRepaymentScheduleModel.js
 *
 * Database Table:
 * loan_repayment_schedules
 *
 * Responsibility:
 *
 * - Fetch all repayment schedules
 * - Fetch schedule by ID
 * - Fetch schedules by loan
 * - Fetch pending schedules
 * - Fetch overdue schedules
 * - Fetch schedules by status
 * - Create repayment schedule
 * - Update repayment schedule
 * - Update repayment status
 * - Delete repayment schedule
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Repayment Schedules
// ==========================================================

export async function getAllLoanRepaymentSchedules() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at,
            created_at,
            updated_at
        FROM loan_repayment_schedules
        ORDER BY
            due_date ASC,
            installment_number ASC
        `
    );

    return rows;
}


// ==========================================================
// Get Repayment Schedule By ID
// ==========================================================

export async function getLoanRepaymentScheduleById(
    scheduleId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at,
            created_at,
            updated_at
        FROM loan_repayment_schedules
        WHERE id = ?
        LIMIT 1
        `,
        [scheduleId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Repayment Schedules By Loan
// ==========================================================

export async function getLoanRepaymentSchedulesByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at,
            created_at,
            updated_at
        FROM loan_repayment_schedules
        WHERE loan_id = ?
        ORDER BY
            installment_number ASC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// Get Repayment Schedules By Status
// ==========================================================

export async function getLoanRepaymentSchedulesByStatus(
    status
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at,
            created_at,
            updated_at
        FROM loan_repayment_schedules
        WHERE status = ?
        ORDER BY
            due_date ASC,
            installment_number ASC
        `,
        [status]
    );

    return rows;
}


// ==========================================================
// Get Pending Repayment Schedules
// ==========================================================

export async function getPendingLoanRepaymentSchedules() {

    return await getLoanRepaymentSchedulesByStatus(
        "PENDING"
    );

}


// ==========================================================
// Get Overdue Repayment Schedules
// ==========================================================

export async function getOverdueLoanRepaymentSchedules() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at,
            created_at,
            updated_at
        FROM loan_repayment_schedules
        WHERE
            status = 'OVERDUE'
            OR (
                status = 'PENDING'
                AND due_date < CURRENT_DATE
            )
        ORDER BY
            due_date ASC,
            installment_number ASC
        `
    );

    return rows;
}


// ==========================================================
// Create Repayment Schedule
// ==========================================================

export async function createLoanRepaymentSchedule(
    scheduleData
) {

    const {
        loan_id,
        installment_number,
        due_date,
        principal_amount,
        interest_amount,
        total_amount,
        paid_principal,
        paid_interest,
        status,
        paid_at
    } = scheduleData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_repayment_schedules
        (
            loan_id,
            installment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount,
            paid_principal,
            paid_interest,
            status,
            paid_at
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?
        )
        `,
        [
            loan_id,
            installment_number,
            due_date,
            principal_amount ?? 0,
            interest_amount ?? 0,
            total_amount ?? 0,
            paid_principal ?? 0,
            paid_interest ?? 0,
            status ?? "PENDING",
            paid_at ?? null
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Repayment Schedule
// ==========================================================

export async function updateLoanRepaymentSchedule(
    scheduleId,
    scheduleData
) {

    const {
        due_date,
        principal_amount,
        interest_amount,
        total_amount,
        paid_principal,
        paid_interest
    } = scheduleData;


    const [result] = await pool.query(
        `
        UPDATE loan_repayment_schedules
        SET
            due_date = ?,
            principal_amount = ?,
            interest_amount = ?,
            total_amount = ?,
            paid_principal = ?,
            paid_interest = ?
        WHERE id = ?
        `,
        [
            due_date,
            principal_amount ?? 0,
            interest_amount ?? 0,
            total_amount ?? 0,
            paid_principal ?? 0,
            paid_interest ?? 0,
            scheduleId
        ]
    );

    return result;
}


// ==========================================================
// Update Repayment Status
// ==========================================================

export async function updateLoanRepaymentScheduleStatus(
    scheduleId,
    status
) {

    let query = `
        UPDATE loan_repayment_schedules
        SET
            status = ?
    `;

    const values = [
        status
    ];


    // ======================================================
    // Paid
    // ======================================================

    if (status === "PAID") {

        query += `,
            paid_at = CURRENT_TIMESTAMP
        `;

    }


    // ======================================================
    // Other Statuses
    // ======================================================

    else {

        query += `,
            paid_at = NULL
        `;

    }


    query += `
        WHERE id = ?
    `;

    values.push(
        scheduleId
    );


    const [result] = await pool.query(
        query,
        values
    );

    return result;
}


// ==========================================================
// Delete Repayment Schedule
// ==========================================================

export async function deleteLoanRepaymentSchedule(
    scheduleId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_repayment_schedules
        WHERE id = ?
        `,
        [scheduleId]
    );

    return result;
}


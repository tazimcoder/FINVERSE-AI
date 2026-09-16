/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanPenaltyModel.js
 *
 * Database Table:
 * loan_penalties
 *
 * Responsibility:
 *
 * - Fetch all loan penalties
 * - Fetch penalty by ID
 * - Fetch penalties by loan
 * - Fetch penalties by repayment schedule
 * - Fetch penalties by user
 * - Fetch penalties by type
 * - Fetch penalties by status
 * - Create penalty
 * - Update penalty
 * - Update penalty status
 * - Waive penalty
 * - Delete penalty
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// SELECT COLUMNS
// ==========================================================

const PENALTY_COLUMNS = `
    id,
    loan_id,
    repayment_schedule_id,
    user_id,
    penalty_type,
    penalty_reason,
    penalty_amount,
    waived_amount,
    payable_amount,
    penalty_status,
    due_date,
    applied_at,
    paid_at,
    waived_by_user_id,
    waiver_reason,
    notes,
    created_at,
    updated_at
`;


// ==========================================================
// GET ALL LOAN PENALTIES
// ==========================================================

export async function getAllLoanPenalties() {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// GET PENALTY BY ID
// ==========================================================

export async function getLoanPenaltyById(
    penaltyId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE id = ?
        LIMIT 1
        `,
        [penaltyId]
    );

    return rows[0] || null;
}


// ==========================================================
// GET PENALTIES BY LOAN
// ==========================================================

export async function getLoanPenaltiesByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE loan_id = ?
        ORDER BY created_at DESC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// GET PENALTIES BY REPAYMENT SCHEDULE
// ==========================================================

export async function getLoanPenaltiesByScheduleId(
    scheduleId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE repayment_schedule_id = ?
        ORDER BY created_at DESC
        `,
        [scheduleId]
    );

    return rows;
}


// ==========================================================
// GET PENALTIES BY USER
// ==========================================================

export async function getLoanPenaltiesByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// GET PENALTIES BY TYPE
// ==========================================================

export async function getLoanPenaltiesByType(
    penaltyType
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE penalty_type = ?
        ORDER BY created_at DESC
        `,
        [penaltyType]
    );

    return rows;
}


// ==========================================================
// GET PENALTIES BY STATUS
// ==========================================================

export async function getLoanPenaltiesByStatus(
    penaltyStatus
) {

    const [rows] = await pool.query(
        `
        SELECT
            ${PENALTY_COLUMNS}
        FROM loan_penalties
        WHERE penalty_status = ?
        ORDER BY created_at DESC
        `,
        [penaltyStatus]
    );

    return rows;
}


// ==========================================================
// CREATE LOAN PENALTY
// ==========================================================

export async function createLoanPenalty(
    penaltyData
) {

    const {

        loan_id,
        repayment_schedule_id,
        user_id,

        penalty_type,
        penalty_reason,

        penalty_amount,
        waived_amount,
        payable_amount,

        penalty_status,

        due_date,

        applied_at,
        paid_at,

        waived_by_user_id,
        waiver_reason,

        notes

    } = penaltyData;


    const [result] = await pool.query(
        `
        INSERT INTO loan_penalties
        (
            loan_id,
            repayment_schedule_id,
            user_id,

            penalty_type,
            penalty_reason,

            penalty_amount,
            waived_amount,
            payable_amount,

            penalty_status,

            due_date,

            applied_at,
            paid_at,

            waived_by_user_id,
            waiver_reason,

            notes
        )
        VALUES
        (
            ?, ?, ?,
            ?, ?,
            ?, ?, ?,
            ?,
            ?,
            ?, ?,
            ?, ?,
            ?
        )
        `,
        [

            loan_id,
            repayment_schedule_id ?? null,
            user_id,

            penalty_type,
            penalty_reason ?? null,

            penalty_amount ?? 0,
            waived_amount ?? 0,
            payable_amount ?? 0,

            penalty_status ?? "PENDING",

            due_date ?? null,

            applied_at ?? null,
            paid_at ?? null,

            waived_by_user_id ?? null,
            waiver_reason ?? null,

            notes ?? null

        ]
    );

    return result.insertId;
}


// ==========================================================
// UPDATE LOAN PENALTY
// ==========================================================

export async function updateLoanPenalty(
    penaltyId,
    penaltyData
) {

    const {

        repayment_schedule_id,

        penalty_type,
        penalty_reason,

        penalty_amount,
        waived_amount,
        payable_amount,

        penalty_status,

        due_date,

        applied_at,
        paid_at,

        waived_by_user_id,
        waiver_reason,

        notes

    } = penaltyData;


    const [result] = await pool.query(
        `
        UPDATE loan_penalties
        SET

            repayment_schedule_id = ?,

            penalty_type = ?,
            penalty_reason = ?,

            penalty_amount = ?,
            waived_amount = ?,
            payable_amount = ?,

            penalty_status = ?,

            due_date = ?,

            applied_at = ?,
            paid_at = ?,

            waived_by_user_id = ?,
            waiver_reason = ?,

            notes = ?

        WHERE id = ?
        `,
        [

            repayment_schedule_id ?? null,

            penalty_type,
            penalty_reason ?? null,

            penalty_amount ?? 0,
            waived_amount ?? 0,
            payable_amount ?? 0,

            penalty_status,

            due_date ?? null,

            applied_at ?? null,
            paid_at ?? null,

            waived_by_user_id ?? null,
            waiver_reason ?? null,

            notes ?? null,

            penaltyId

        ]
    );

    return result;
}


// ==========================================================
// UPDATE PENALTY STATUS
// ==========================================================

export async function updateLoanPenaltyStatus(
    penaltyId,
    penaltyStatus
) {

    const [result] = await pool.query(
        `
        UPDATE loan_penalties
        SET
            penalty_status = ?
        WHERE id = ?
        `,
        [
            penaltyStatus,
            penaltyId
        ]
    );

    return result;
}


// ==========================================================
// WAIVE PENALTY
// ==========================================================

export async function waiveLoanPenalty(
    penaltyId,
    waivedAmount,
    waivedByUserId,
    waiverReason
) {

    const [result] = await pool.query(
        `
        UPDATE loan_penalties
        SET

            waived_amount = ?,

            payable_amount =
                GREATEST(
                    penalty_amount - ?,
                    0
                ),

            penalty_status = 'WAIVED',

            waived_by_user_id = ?,

            waiver_reason = ?

        WHERE id = ?
        `,
        [
            waivedAmount,
            waivedAmount,
            waivedByUserId,
            waiverReason ?? null,
            penaltyId
        ]
    );

    return result;
}


// ==========================================================
// MARK PENALTY AS PAID
// ==========================================================

export async function markLoanPenaltyAsPaid(
    penaltyId
) {

    const [result] = await pool.query(
        `
        UPDATE loan_penalties
        SET

            penalty_status = 'PAID',

            paid_at = CURRENT_TIMESTAMP

        WHERE id = ?
        `,
        [penaltyId]
    );

    return result;
}


// ==========================================================
// DELETE LOAN PENALTY
// ==========================================================

export async function deleteLoanPenalty(
    penaltyId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_penalties
        WHERE id = ?
        `,
        [penaltyId]
    );

    return result;
}
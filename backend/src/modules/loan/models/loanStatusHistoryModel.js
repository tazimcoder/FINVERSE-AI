import pool from "../../../config/db.js";


// ==========================================================
// CREATE STATUS HISTORY
// ==========================================================

const createStatusHistory = async ({
    loanApplicationId = null,
    loanId = null,
    oldStatus = null,
    newStatus,
    changedByUserId = null,
    remarks = null,
}) => {

    const [result] = await pool.execute(
        `
        INSERT INTO loan_status_history
        (
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            loanApplicationId,
            loanId,
            oldStatus,
            newStatus,
            changedByUserId,
            remarks,
        ]
    );

    return result.insertId;
};


// ==========================================================
// GET ALL STATUS HISTORY
// ==========================================================

const getAllStatusHistory = async () => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        ORDER BY created_at DESC
        `
    );

    return rows;
};


// ==========================================================
// GET BY ID
// ==========================================================

const getStatusHistoryById = async (id) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows[0] || null;
};


// ==========================================================
// GET BY LOAN APPLICATION ID
// ==========================================================

const getByApplicationId = async (applicationId) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
};


// ==========================================================
// GET LATEST BY LOAN APPLICATION ID
// ==========================================================

const getLatestByApplicationId = async (applicationId) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE loan_application_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT 1
        `,
        [applicationId]
    );

    return rows[0] || null;
};


// ==========================================================
// GET BY LOAN ID
// ==========================================================

const getByLoanId = async (loanId) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE loan_id = ?
        ORDER BY created_at DESC, id DESC
        `,
        [loanId]
    );

    return rows;
};


// ==========================================================
// GET LATEST BY LOAN ID
// ==========================================================

const getLatestByLoanId = async (loanId) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE loan_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT 1
        `,
        [loanId]
    );

    return rows[0] || null;
};


// ==========================================================
// GET BY USER
// ==========================================================

const getByChangedByUserId = async (userId) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE changed_by_user_id = ?
        ORDER BY created_at DESC, id DESC
        `,
        [userId]
    );

    return rows;
};


// ==========================================================
// GET BY STATUS
// ==========================================================

const getByNewStatus = async (newStatus) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            loan_application_id,
            loan_id,
            old_status,
            new_status,
            changed_by_user_id,
            remarks,
            created_at
        FROM loan_status_history
        WHERE new_status = ?
        ORDER BY created_at DESC, id DESC
        `,
        [newStatus]
    );

    return rows;
};


// ==========================================================
// DELETE
// ==========================================================

const deleteStatusHistory = async (id) => {

    const [result] = await pool.execute(
        `
        DELETE FROM loan_status_history
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};


// ==========================================================
// DEFAULT EXPORT
// ==========================================================
//
// IMPORTANT:
// loanStatusHistoryService.js imports this model as:
//
// import loanStatusHistoryModel
//     from "../models/loanStatusHistoryModel.js";
//
// Therefore this DEFAULT EXPORT is required.
//
// ==========================================================

const loanStatusHistoryModel = {

    createStatusHistory,

    getAllStatusHistory,

    getStatusHistoryById,

    getByApplicationId,

    getLatestByApplicationId,

    getByLoanId,

    getLatestByLoanId,

    getByChangedByUserId,

    getByNewStatus,

    deleteStatusHistory,

};

export default loanStatusHistoryModel;
import pool from "../../../config/db.js";

// ==========================================================
// FINVERSE AI
// Loan Lifecycle Model
// ==========================================================
//
// Database Source:
// loan_status_history
//
// Responsibility:
//
// - Read complete loan application lifecycle
// - Read complete loan lifecycle
// - Read latest application state
// - Read latest loan state
// - Read user-related lifecycle history
// - Read status timeline
// - Provide reusable lifecycle queries
//
// IMPORTANT:
//
// This model does NOT create a separate lifecycle table.
//
// Existing loan_status_history is used as the source of truth.
//
// ==========================================================

// ==========================================================
// COMMON SELECT
// ==========================================================

const STATUS_HISTORY_SELECT = `    SELECT
        id,
        loan_application_id,
        loan_id,
        old_status,
        new_status,
        changed_by_user_id,
        remarks,
        created_at
    FROM loan_status_history`;

// ==========================================================
// GET APPLICATION LIFECYCLE
// ==========================================================

const getApplicationLifecycle = async (
    applicationId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_application_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            applicationId,
        ]
    );

    return rows;


};

// ==========================================================
// GET LOAN LIFECYCLE
// ==========================================================

const getLoanLifecycle = async (
    loanId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            loanId,
        ]
    );

    return rows;


};

// ==========================================================
// GET LATEST APPLICATION STATE
// ==========================================================

const getLatestApplicationState = async (
    applicationId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_application_id = ?
    ORDER BY created_at DESC, id DESC
    LIMIT 1
    `,
        [
            applicationId,
        ]
    );

    return rows[0] || null;


};

// ==========================================================
// GET LATEST LOAN STATE
// ==========================================================

const getLatestLoanState = async (
    loanId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_id = ?
    ORDER BY created_at DESC, id DESC
    LIMIT 1
    `,
        [
            loanId,
        ]
    );

    return rows[0] || null;


};

// ==========================================================
// GET USER LIFECYCLE HISTORY
// ==========================================================
//
// Returns status changes performed by a specific user.
//
// ==========================================================

const getUserLifecycleHistory = async (
    userId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE changed_by_user_id = ?
    ORDER BY created_at DESC, id DESC
    `,
        [
            userId,
        ]
    );

    return rows;


};

// ==========================================================
// GET APPLICATION STATUS TIMELINE
// ==========================================================
//
// Alias-style lifecycle timeline query.
//
// ==========================================================

const getApplicationStatusTimeline = async (
    applicationId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_application_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            applicationId,
        ]
    );

    return rows;


};

// ==========================================================
// GET LOAN STATUS TIMELINE
// ==========================================================

const getLoanStatusTimeline = async (
    loanId
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            loanId,
        ]
    );

    return rows;


};

// ==========================================================
// GET STATUS TRANSITIONS FOR APPLICATION
// ==========================================================
//
// Useful for analytics, audit logs and future AI analysis.
//
// ==========================================================

const getApplicationStatusTransitions = async (
    applicationId
) => {


    const [rows] = await pool.execute(
        `
    SELECT
        old_status,
        new_status,
        changed_by_user_id,
        remarks,
        created_at
    FROM loan_status_history
    WHERE loan_application_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            applicationId,
        ]
    );

    return rows;


};

// ==========================================================
// GET STATUS TRANSITIONS FOR LOAN
// ==========================================================

const getLoanStatusTransitions = async (
    loanId
) => {


    const [rows] = await pool.execute(
        `
    SELECT
        old_status,
        new_status,
        changed_by_user_id,
        remarks,
        created_at
    FROM loan_status_history
    WHERE loan_id = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            loanId,
        ]
    );

    return rows;


};

// ==========================================================
// GET HISTORY BY STATUS
// ==========================================================
//
// Useful when lifecycle analytics need to identify
// when a particular status was reached.
//
// ==========================================================

const getApplicationHistoryByStatus = async (
    applicationId,
    status
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_application_id = ?
      AND new_status = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            applicationId,
            status,
        ]
    );

    return rows;


};

// ==========================================================
// GET LOAN HISTORY BY STATUS
// ==========================================================

const getLoanHistoryByStatus = async (
    loanId,
    status
) => {


    const [rows] = await pool.execute(
        `
    ${STATUS_HISTORY_SELECT}
    WHERE loan_id = ?
      AND new_status = ?
    ORDER BY created_at ASC, id ASC
    `,
        [
            loanId,
            status,
        ]
    );

    return rows;


};

// ==========================================================
// GET COMPLETE LIFECYCLE CONTEXT
// ==========================================================
//
// Returns a normalized object containing:
//
// - history
// - latestState
// - totalTransitions
//
// This keeps lifecycle aggregation inside the model layer
// and makes the service layer easier to extend later.
//
// ==========================================================

const getApplicationLifecycleContext = async (
    applicationId
) => {


    const history =
        await getApplicationLifecycle(
            applicationId
        );

    const latestState =
        history.length > 0
            ? history[history.length - 1]
            : null;

    return {

        applicationId,

        history,

        latestState,

        totalTransitions:
            history.length,

    };


};

// ==========================================================
// GET COMPLETE LOAN LIFECYCLE CONTEXT
// ==========================================================

const getLoanLifecycleContext = async (
    loanId
) => {


    const history =
        await getLoanLifecycle(
            loanId
        );

    const latestState =
        history.length > 0
            ? history[history.length - 1]
            : null;

    return {

        loanId,

        history,

        latestState,

        totalTransitions:
            history.length,

    };


};

// ==========================================================
// GET LATEST STATUS VALUE
// ==========================================================
//
// Returns only the latest new_status.
//
// ==========================================================

const getLatestApplicationStatus = async (
    applicationId
) => {


    const latest =
        await getLatestApplicationState(
            applicationId
        );

    return latest
        ? latest.new_status
        : null;


};

// ==========================================================
// GET LATEST LOAN STATUS
// ==========================================================

const getLatestLoanStatus = async (
    loanId
) => {


    const latest =
        await getLatestLoanState(
            loanId
        );

    return latest
        ? latest.new_status
        : null;


};

// ==========================================================
// GET TRANSITION COUNT
// ==========================================================

const getApplicationTransitionCount = async (
    applicationId
) => {


    const [rows] = await pool.execute(
        `
    SELECT
        COUNT(*) AS total_transitions
    FROM loan_status_history
    WHERE loan_application_id = ?
    `,
        [
            applicationId,
        ]
    );

    return Number(
        rows[0]?.total_transitions || 0
    );


};

// ==========================================================
// GET LOAN TRANSITION COUNT
// ==========================================================

const getLoanTransitionCount = async (
    loanId
) => {


    const [rows] = await pool.execute(
        `
    SELECT
        COUNT(*) AS total_transitions
    FROM loan_status_history
    WHERE loan_id = ?
    `,
        [
            loanId,
        ]
    );

    return Number(
        rows[0]?.total_transitions || 0
    );


};

// ==========================================================
// DEFAULT MODEL EXPORT
// ==========================================================

const loanLifecycleModel = {


    getApplicationLifecycle,

    getLoanLifecycle,

    getLatestApplicationState,

    getLatestLoanState,

    getUserLifecycleHistory,

    getApplicationStatusTimeline,

    getLoanStatusTimeline,

    getApplicationStatusTransitions,

    getLoanStatusTransitions,

    getApplicationHistoryByStatus,

    getLoanHistoryByStatus,

    getApplicationLifecycleContext,

    getLoanLifecycleContext,

    getLatestApplicationStatus,

    getLatestLoanStatus,

    getApplicationTransitionCount,

    getLoanTransitionCount,


};

// ==========================================================
// NAMED EXPORTS
// ==========================================================

export {


    getApplicationLifecycle,

    getLoanLifecycle,

    getLatestApplicationState,

    getLatestLoanState,

    getUserLifecycleHistory,

    getApplicationStatusTimeline,

    getLoanStatusTimeline,

    getApplicationStatusTransitions,

    getLoanStatusTransitions,

    getApplicationHistoryByStatus,

    getLoanHistoryByStatus,

    getApplicationLifecycleContext,

    getLoanLifecycleContext,

    getLatestApplicationStatus,

    getLatestLoanStatus,

    getApplicationTransitionCount,

    getLoanTransitionCount,


};

export default loanLifecycleModel;

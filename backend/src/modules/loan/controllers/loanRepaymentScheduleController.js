/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanRepaymentScheduleController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for repayment schedules
 * - Fetch all repayment schedules
 * - Fetch schedule by ID
 * - Fetch schedules by loan
 * - Fetch schedules by status
 * - Fetch pending schedules
 * - Fetch overdue schedules
 * - Create repayment schedule
 * - Update repayment schedule
 * - Update repayment status
 * - Delete repayment schedule
 *
 * ==========================================================
 */

import {
    fetchAllLoanRepaymentSchedules,
    fetchLoanRepaymentScheduleById,
    fetchLoanRepaymentSchedulesByLoanId,
    fetchLoanRepaymentSchedulesByStatus,
    fetchPendingLoanRepaymentSchedules,
    fetchOverdueLoanRepaymentSchedules,
    createNewLoanRepaymentSchedule,
    updateExistingLoanRepaymentSchedule,
    changeLoanRepaymentScheduleStatus,
    removeLoanRepaymentSchedule
} from "../services/loanRepaymentScheduleService.js";


// ==========================================================
// Get All Repayment Schedules
// ==========================================================

export async function getAllLoanRepaymentSchedules(
    req,
    res
) {

    try {

        const schedules =
            await fetchAllLoanRepaymentSchedules();


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedules fetched successfully.",

            data: schedules

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Repayment Schedules Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan repayment schedules."

        });

    }

}


// ==========================================================
// Get Repayment Schedule By ID
// ==========================================================

export async function getLoanRepaymentScheduleById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const schedule =
            await fetchLoanRepaymentScheduleById(
                id
            );


        if (!schedule) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan repayment schedule not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedule fetched successfully.",

            data: schedule

        });

    }

    catch (error) {

        console.error(
            "Get Repayment Schedule By ID Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get Repayment Schedules By Loan
// ==========================================================

export async function getLoanRepaymentSchedulesByLoan(
    req,
    res
) {

    try {

        const {
            loanId
        } = req.params;


        const schedules =
            await fetchLoanRepaymentSchedulesByLoanId(
                loanId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedules fetched successfully.",

            data: schedules

        });

    }

    catch (error) {

        console.error(
            "Get Repayment Schedules By Loan Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get Repayment Schedules By Status
// ==========================================================

export async function getLoanRepaymentSchedulesByStatus(
    req,
    res
) {

    try {

        const {
            status
        } = req.params;


        const schedules =
            await fetchLoanRepaymentSchedulesByStatus(
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedules fetched successfully.",

            data: schedules

        });

    }

    catch (error) {

        console.error(
            "Get Repayment Schedules By Status Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get Pending Repayment Schedules
// ==========================================================

export async function getPendingLoanRepaymentSchedules(
    req,
    res
) {

    try {

        const schedules =
            await fetchPendingLoanRepaymentSchedules();


        return res.status(200).json({

            success: true,

            message:
                "Pending loan repayment schedules fetched successfully.",

            data: schedules

        });

    }

    catch (error) {

        console.error(
            "Get Pending Repayment Schedules Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch pending repayment schedules."

        });

    }

}


// ==========================================================
// Get Overdue Repayment Schedules
// ==========================================================

export async function getOverdueLoanRepaymentSchedules(
    req,
    res
) {

    try {

        const schedules =
            await fetchOverdueLoanRepaymentSchedules();


        return res.status(200).json({

            success: true,

            message:
                "Overdue loan repayment schedules fetched successfully.",

            data: schedules

        });

    }

    catch (error) {

        console.error(
            "Get Overdue Repayment Schedules Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch overdue repayment schedules."

        });

    }

}


// ==========================================================
// Create Repayment Schedule
// ==========================================================

export async function createLoanRepaymentSchedule(
    req,
    res
) {

    try {

        const scheduleData =
            req.body;


        const scheduleId =
            await createNewLoanRepaymentSchedule(
                scheduleData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan repayment schedule created successfully.",

            data: {

                id: scheduleId

            }

        });

    }

    catch (error) {

        console.error(
            "Create Repayment Schedule Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Update Repayment Schedule
// ==========================================================

export async function updateLoanRepaymentSchedule(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const scheduleData =
            req.body;


        const result =
            await updateExistingLoanRepaymentSchedule(
                id,
                scheduleData
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedule updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Repayment Schedule Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Update Repayment Status
// ==========================================================

export async function updateLoanRepaymentScheduleStatus(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            status
        } = req.body;


        if (!status) {

            return res.status(400).json({

                success: false,

                message:
                    "Repayment schedule status is required."

            });

        }


        const result =
            await changeLoanRepaymentScheduleStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedule status updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Repayment Schedule Status Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Delete Repayment Schedule
// ==========================================================

export async function deleteLoanRepaymentSchedule(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanRepaymentSchedule(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan repayment schedule deleted successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Delete Repayment Schedule Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


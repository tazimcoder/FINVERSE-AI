/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanRepaymentScheduleService.js
 *
 * Responsibility:
 *
 * - Validate repayment schedule input
 * - Fetch repayment schedules
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
    getAllLoanRepaymentSchedules,
    getLoanRepaymentScheduleById,
    getLoanRepaymentSchedulesByLoanId,
    getLoanRepaymentSchedulesByStatus,
    getPendingLoanRepaymentSchedules,
    getOverdueLoanRepaymentSchedules,
    createLoanRepaymentSchedule,
    updateLoanRepaymentSchedule,
    updateLoanRepaymentScheduleStatus,
    deleteLoanRepaymentSchedule
} from "../models/loanRepaymentScheduleModel.js";


// ==========================================================
// Fetch All Repayment Schedules
// ==========================================================

export async function fetchAllLoanRepaymentSchedules() {

    return await getAllLoanRepaymentSchedules();

}


// ==========================================================
// Fetch Repayment Schedule By ID
// ==========================================================

export async function fetchLoanRepaymentScheduleById(
    scheduleId
) {

    if (!scheduleId) {

        throw new Error(
            "Repayment schedule ID is required."
        );

    }


    const schedule =
        await getLoanRepaymentScheduleById(
            scheduleId
        );


    return schedule;

}


// ==========================================================
// Fetch Repayment Schedules By Loan
// ==========================================================

export async function fetchLoanRepaymentSchedulesByLoanId(
    loanId
) {

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }


    return await getLoanRepaymentSchedulesByLoanId(
        loanId
    );

}


// ==========================================================
// Fetch Repayment Schedules By Status
// ==========================================================

export async function fetchLoanRepaymentSchedulesByStatus(
    status
) {

    if (!status) {

        throw new Error(
            "Repayment schedule status is required."
        );

    }


    const allowedStatuses = [
        "PENDING",
        "PARTIALLY_PAID",
        "PAID",
        "OVERDUE"
    ];


    if (!allowedStatuses.includes(status)) {

        throw new Error(
            "Invalid repayment schedule status."
        );

    }


    return await getLoanRepaymentSchedulesByStatus(
        status
    );

}


// ==========================================================
// Fetch Pending Repayment Schedules
// ==========================================================

export async function fetchPendingLoanRepaymentSchedules() {

    return await getPendingLoanRepaymentSchedules();

}


// ==========================================================
// Fetch Overdue Repayment Schedules
// ==========================================================

export async function fetchOverdueLoanRepaymentSchedules() {

    return await getOverdueLoanRepaymentSchedules();

}


// ==========================================================
// Create Repayment Schedule
// ==========================================================

export async function createNewLoanRepaymentSchedule(
    scheduleData
) {

    if (!scheduleData) {

        throw new Error(
            "Repayment schedule data is required."
        );

    }


    const {
        loan_id,
        installment_number,
        due_date,
        principal_amount,
        interest_amount,
        total_amount
    } = scheduleData;


    if (!loan_id) {

        throw new Error(
            "Loan ID is required."
        );

    }


    if (
        installment_number === undefined ||
        installment_number === null
    ) {

        throw new Error(
            "Installment number is required."
        );

    }


    if (!due_date) {

        throw new Error(
            "Due date is required."
        );

    }


    if (
        principal_amount === undefined ||
        principal_amount === null
    ) {

        throw new Error(
            "Principal amount is required."
        );

    }


    if (
        interest_amount === undefined ||
        interest_amount === null
    ) {

        throw new Error(
            "Interest amount is required."
        );

    }


    if (
        total_amount === undefined ||
        total_amount === null
    ) {

        throw new Error(
            "Total amount is required."
        );

    }


    if (
        Number(installment_number) <= 0
    ) {

        throw new Error(
            "Installment number must be greater than zero."
        );

    }


    if (
        Number(principal_amount) < 0 ||
        Number(interest_amount) < 0 ||
        Number(total_amount) < 0
    ) {

        throw new Error(
            "Repayment amounts cannot be negative."
        );

    }


    const expectedTotal =
        Number(principal_amount) +
        Number(interest_amount);


    if (
        Math.abs(
            expectedTotal -
            Number(total_amount)
        ) > 0.01
    ) {

        throw new Error(
            "Total amount must equal principal amount plus interest amount."
        );

    }


    return await createLoanRepaymentSchedule(
        scheduleData
    );

}


// ==========================================================
// Update Repayment Schedule
// ==========================================================

export async function updateExistingLoanRepaymentSchedule(
    scheduleId,
    scheduleData
) {

    if (!scheduleId) {

        throw new Error(
            "Repayment schedule ID is required."
        );

    }


    if (!scheduleData) {

        throw new Error(
            "Repayment schedule data is required."
        );

    }


    const existingSchedule =
        await getLoanRepaymentScheduleById(
            scheduleId
        );


    if (!existingSchedule) {

        throw new Error(
            "Repayment schedule not found."
        );

    }


    const {
        due_date,
        principal_amount,
        interest_amount,
        total_amount
    } = scheduleData;


    if (!due_date) {

        throw new Error(
            "Due date is required."
        );

    }


    if (
        principal_amount === undefined ||
        principal_amount === null
    ) {

        throw new Error(
            "Principal amount is required."
        );

    }


    if (
        interest_amount === undefined ||
        interest_amount === null
    ) {

        throw new Error(
            "Interest amount is required."
        );

    }


    if (
        total_amount === undefined ||
        total_amount === null
    ) {

        throw new Error(
            "Total amount is required."
        );

    }


    if (
        Number(principal_amount) < 0 ||
        Number(interest_amount) < 0 ||
        Number(total_amount) < 0
    ) {

        throw new Error(
            "Repayment amounts cannot be negative."
        );

    }


    const expectedTotal =
        Number(principal_amount) +
        Number(interest_amount);


    if (
        Math.abs(
            expectedTotal -
            Number(total_amount)
        ) > 0.01
    ) {

        throw new Error(
            "Total amount must equal principal amount plus interest amount."
        );

    }


    return await updateLoanRepaymentSchedule(
        scheduleId,
        scheduleData
    );

}


// ==========================================================
// Change Repayment Status
// ==========================================================

export async function changeLoanRepaymentScheduleStatus(
    scheduleId,
    status
) {

    if (!scheduleId) {

        throw new Error(
            "Repayment schedule ID is required."
        );

    }


    if (!status) {

        throw new Error(
            "Repayment schedule status is required."
        );

    }


    const allowedStatuses = [
        "PENDING",
        "PARTIALLY_PAID",
        "PAID",
        "OVERDUE"
    ];


    if (!allowedStatuses.includes(status)) {

        throw new Error(
            "Invalid repayment schedule status."
        );

    }


    const existingSchedule =
        await getLoanRepaymentScheduleById(
            scheduleId
        );


    if (!existingSchedule) {

        throw new Error(
            "Repayment schedule not found."
        );

    }


    return await updateLoanRepaymentScheduleStatus(
        scheduleId,
        status
    );

}


// ==========================================================
// Delete Repayment Schedule
// ==========================================================

export async function removeLoanRepaymentSchedule(
    scheduleId
) {

    if (!scheduleId) {

        throw new Error(
            "Repayment schedule ID is required."
        );

    }


    const existingSchedule =
        await getLoanRepaymentScheduleById(
            scheduleId
        );


    if (!existingSchedule) {

        throw new Error(
            "Repayment schedule not found."
        );

    }


    return await deleteLoanRepaymentSchedule(
        scheduleId
    );

}


/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanRepaymentScheduleApi.js
 *
 * Responsibility:
 *
 * - Communicate with Repayment Schedule backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Repayment Schedules
// ==========================================================

export async function getLoanRepaymentSchedules() {

    const response =
        await api.get(
            LOAN_API_PATHS.REPAYMENT_SCHEDULES
        );

    return response.data;

}


// ==========================================================
// Get Repayment Schedule By ID
// ==========================================================

export async function getLoanRepaymentScheduleById(
    scheduleId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.REPAYMENT_SCHEDULES}/${scheduleId}`
        );

    return response.data;

}


// ==========================================================
// Get Schedule By Loan ID
// ==========================================================

export async function getLoanRepaymentSchedulesByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.REPAYMENT_SCHEDULES}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Repayment Schedule
// ==========================================================

export async function createLoanRepaymentSchedule(
    scheduleData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.REPAYMENT_SCHEDULES,
            scheduleData
        );

    return response.data;

}


// ==========================================================
// Update Repayment Schedule
// ==========================================================

export async function updateLoanRepaymentSchedule(
    scheduleId,
    scheduleData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.REPAYMENT_SCHEDULES}/${scheduleId}`,
            scheduleData
        );

    return response.data;

}


// ==========================================================
// Delete Repayment Schedule
// ==========================================================

export async function deleteLoanRepaymentSchedule(
    scheduleId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.REPAYMENT_SCHEDULES}/${scheduleId}`
        );

    return response.data;

}


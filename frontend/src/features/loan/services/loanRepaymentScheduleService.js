/**
 * ==========================================================
 * FINVERSE
 * Loan Repayment Schedule Service
 * ==========================================================
 */

import {
    getLoanRepaymentSchedules,
    getLoanRepaymentScheduleById,
    getLoanRepaymentSchedulesByLoanId,
    createLoanRepaymentSchedule as apiCreateSchedule,
    updateLoanRepaymentSchedule as apiUpdateSchedule,
    deleteLoanRepaymentSchedule as apiDeleteSchedule
} from "../api/loanRepaymentScheduleApi";

export async function fetchLoanRepaymentSchedules() {
    try {
        const response = await getLoanRepaymentSchedules();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanRepaymentScheduleById(scheduleId) {
    if (!scheduleId) throw new Error("Repayment schedule ID is required.");
    const response = await getLoanRepaymentScheduleById(scheduleId);
    return response?.data ?? response;
}

export async function fetchLoanRepaymentSchedulesByLoanId(loanId) {
    if (!loanId) throw new Error("Loan ID is required.");
    const response = await getLoanRepaymentSchedulesByLoanId(loanId);
    return response?.data ?? response;
}

export async function addLoanRepaymentSchedule(scheduleData) {
    const response = await apiCreateSchedule(scheduleData);
    return response?.data ?? response;
}

export async function editLoanRepaymentSchedule(scheduleId, scheduleData) {
    const response = await apiUpdateSchedule(scheduleId, scheduleData);
    return response?.data ?? response;
}

export async function removeLoanRepaymentSchedule(scheduleId) {
    const response = await apiDeleteSchedule(scheduleId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanRepaymentSchedules as getAllLoanRepaymentSchedules,
    fetchLoanRepaymentScheduleById as getLoanRepaymentScheduleById,
    fetchLoanRepaymentSchedulesByLoanId as getLoanRepaymentSchedulesByLoanId,
    addLoanRepaymentSchedule as createLoanRepaymentSchedule,
    editLoanRepaymentSchedule as updateLoanRepaymentSchedule,
    removeLoanRepaymentSchedule as deleteLoanRepaymentSchedule
};

/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanApprovalApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Approval backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Approvals
// ==========================================================

export async function getLoanApprovals() {

    const response =
        await api.get(
            LOAN_API_PATHS.APPROVALS
        );

    return response.data;

}


// ==========================================================
// Get Loan Approval By ID
// ==========================================================

export async function getLoanApprovalById(
    approvalId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.APPROVALS}/${approvalId}`
        );

    return response.data;

}


// ==========================================================
// Get Approvals By Loan ID
// ==========================================================

export async function getLoanApprovalsByLoanId(
    loanId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.APPROVALS}/loan/${loanId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Approval
// ==========================================================

export async function createLoanApproval(
    approvalData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.APPROVALS,
            approvalData
        );

    return response.data;

}


// ==========================================================
// Update Loan Approval
// ==========================================================

export async function updateLoanApproval(
    approvalId,
    approvalData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.APPROVALS}/${approvalId}`,
            approvalData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Approval
// ==========================================================

export async function deleteLoanApproval(
    approvalId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.APPROVALS}/${approvalId}`
        );

    return response.data;

}


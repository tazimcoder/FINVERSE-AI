/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanStatusHistoryService.js
 *
 * Responsibility:
 *
 * - Business logic for loan status history
 * - Create status history records
 * - Fetch status history
 * - Fetch latest application status
 * - Fetch latest loan status
 * - Fetch status history by user
 * - Fetch status history by status
 * - Delete status history
 *
 * ==========================================================
 */

import loanStatusHistoryModel
    from "../models/loanStatusHistoryModel.js";


// ==========================================================
// CREATE STATUS HISTORY
// ==========================================================

export const createLoanStatusHistory = async ({
    loanApplicationId = null,
    loanId = null,
    oldStatus = null,
    newStatus,
    changedByUserId = null,
    remarks = null,
}) => {

    if (!newStatus) {

        throw new Error(
            "New status is required."
        );

    }

    return await loanStatusHistoryModel.createStatusHistory({

        loanApplicationId,

        loanId,

        oldStatus,

        newStatus,

        changedByUserId,

        remarks,

    });

};


// ==========================================================
// GET ALL STATUS HISTORY
// ==========================================================

export const getAllLoanStatusHistory = async () => {

    return await loanStatusHistoryModel.getAllStatusHistory();

};


// ==========================================================
// GET STATUS HISTORY BY ID
// ==========================================================

export const getLoanStatusHistoryById = async (
    id
) => {

    if (!id) {

        throw new Error(
            "Status history ID is required."
        );

    }

    return await loanStatusHistoryModel.getStatusHistoryById(
        id
    );

};


// ==========================================================
// GET STATUS HISTORY BY APPLICATION ID
// ==========================================================

export const getLoanStatusHistoryByApplicationId = async (
    applicationId
) => {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    return await loanStatusHistoryModel.getByApplicationId(
        applicationId
    );

};


// ==========================================================
// GET LATEST STATUS HISTORY BY APPLICATION ID
// ==========================================================
//
// IMPORTANT:
// This export fixes the missing-export error:
//
// getLatestLoanStatusHistoryByApplicationId
//
// ==========================================================

export const getLatestLoanStatusHistoryByApplicationId = async (
    applicationId
) => {

    if (!applicationId) {

        throw new Error(
            "Loan application ID is required."
        );

    }

    return await loanStatusHistoryModel.getLatestByApplicationId(
        applicationId
    );

};


// ==========================================================
// GET STATUS HISTORY BY LOAN ID
// ==========================================================

export const getLoanStatusHistoryByLoanId = async (
    loanId
) => {

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }

    return await loanStatusHistoryModel.getByLoanId(
        loanId
    );

};


// ==========================================================
// GET LATEST STATUS HISTORY BY LOAN ID
// ==========================================================

export const getLatestLoanStatusHistoryByLoanId = async (
    loanId
) => {

    if (!loanId) {

        throw new Error(
            "Loan ID is required."
        );

    }

    return await loanStatusHistoryModel.getLatestByLoanId(
        loanId
    );

};


// ==========================================================
// GET STATUS HISTORY BY USER ID
// ==========================================================

export const getLoanStatusHistoryByUserId = async (
    userId
) => {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }

    return await loanStatusHistoryModel.getByChangedByUserId(
        userId
    );

};


// ==========================================================
// GET STATUS HISTORY BY NEW STATUS
// ==========================================================

export const getLoanStatusHistoryByStatus = async (
    status
) => {

    if (!status) {

        throw new Error(
            "Status is required."
        );

    }

    return await loanStatusHistoryModel.getByNewStatus(
        status
    );

};


// ==========================================================
// DELETE STATUS HISTORY
// ==========================================================

export const deleteLoanStatusHistory = async (
    id
) => {

    if (!id) {

        throw new Error(
            "Status history ID is required."
        );

    }

    return await loanStatusHistoryModel.deleteStatusHistory(
        id
    );

};


// ==========================================================
// DEFAULT EXPORT
// ==========================================================
//
// Keeps this service compatible with both:
//
// import {
//     getLatestLoanStatusHistoryByApplicationId
// } from "...";
//
// and:
//
// import loanStatusHistoryService from "...";
//
// ==========================================================

const loanStatusHistoryService = {

    createLoanStatusHistory,

    getAllLoanStatusHistory,

    getLoanStatusHistoryById,

    getLoanStatusHistoryByApplicationId,

    getLatestLoanStatusHistoryByApplicationId,

    getLoanStatusHistoryByLoanId,

    getLatestLoanStatusHistoryByLoanId,

    getLoanStatusHistoryByUserId,

    getLoanStatusHistoryByStatus,

    deleteLoanStatusHistory,

};


export default loanStatusHistoryService;


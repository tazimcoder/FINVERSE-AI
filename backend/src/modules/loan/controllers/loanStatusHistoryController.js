/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanStatusHistoryController.js
 *
 * Responsibility:
 *
 * - Create loan status history
 * - Get all status history
 * - Get status history by ID
 * - Get status history by application
 * - Get latest application status
 * - Get status history by loan
 * - Get latest loan status
 * - Get status history by user
 * - Get status history by status
 * - Delete status history
 * - Maintain backward-compatible controller aliases
 *
 * ==========================================================
 */

import {
    createLoanStatusHistory as createLoanStatusHistoryService,
    getAllLoanStatusHistory as getAllLoanStatusHistoryService,
    getLoanStatusHistoryById as getLoanStatusHistoryByIdService,
    getLoanStatusHistoryByApplicationId as getLoanStatusHistoryByApplicationIdService,
    getLatestLoanStatusHistoryByApplicationId as getLatestLoanStatusHistoryByApplicationIdService,
    getLoanStatusHistoryByLoanId as getLoanStatusHistoryByLoanIdService,
    getLatestLoanStatusHistoryByLoanId as getLatestLoanStatusHistoryByLoanIdService,
    getLoanStatusHistoryByUserId as getLoanStatusHistoryByUserIdService,
    getLoanStatusHistoryByStatus as getLoanStatusHistoryByStatusService,
    deleteLoanStatusHistory as deleteLoanStatusHistoryService,
} from "../services/loanStatusHistoryService.js";


// ==========================================================
// CREATE LOAN STATUS HISTORY
// ==========================================================

export const createLoanStatusHistory = async (
    req,
    res
) => {

    try {

        const {
            loanApplicationId,
            loanId,
            oldStatus,
            newStatus,
            changedByUserId,
            remarks,
        } = req.body;


        if (!newStatus) {

            return res.status(400).json({

                success: false,

                message:
                    "New status is required.",

            });

        }


        const result =
            await createLoanStatusHistoryService({

                loanApplicationId,

                loanId,

                oldStatus,

                newStatus,

                changedByUserId,

                remarks,

            });


        return res.status(201).json({

            success: true,

            message:
                "Loan status history created successfully.",

            data: {
                id: result,
            },

        });

    } catch (error) {

        console.error(
            "Create Loan Status History Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to create loan status history.",

        });

    }

};


// ==========================================================
// GET ALL LOAN STATUS HISTORY
// ==========================================================

export const getAllLoanStatusHistory = async (
    req,
    res
) => {

    try {

        const data =
            await getAllLoanStatusHistoryService();


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get All Loan Status History Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan status history.",

        });

    }

};


// ==========================================================
// GET LOAN STATUS HISTORY BY ID
// ==========================================================

export const getLoanStatusHistoryById = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const data =
            await getLoanStatusHistoryByIdService(id);


        if (!data) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan status history not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Loan Status History By ID Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan status history.",

        });

    }

};


// ==========================================================
// GET LOAN STATUS HISTORY BY APPLICATION ID
// ==========================================================

export const getLoanStatusHistoryByApplicationId = async (
    req,
    res
) => {

    try {

        const { applicationId } =
            req.params;


        const data =
            await getLoanStatusHistoryByApplicationIdService(
                applicationId
            );


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Loan Status History By Application Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan application status history.",

        });

    }

};


// ==========================================================
// GET LATEST LOAN STATUS BY APPLICATION ID
// ==========================================================

export const getLatestLoanStatusByApplicationId = async (
    req,
    res
) => {

    try {

        const { applicationId } =
            req.params;


        const data =
            await getLatestLoanStatusHistoryByApplicationIdService(
                applicationId
            );


        if (!data) {

            return res.status(404).json({

                success: false,

                message:
                    "No status history found for this loan application.",

            });

        }


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Latest Loan Status By Application Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch latest loan application status.",

        });

    }

};


// ==========================================================
// GET LOAN STATUS HISTORY BY LOAN ID
// ==========================================================

export const getLoanStatusHistoryByLoanId = async (
    req,
    res
) => {

    try {

        const { loanId } =
            req.params;


        const data =
            await getLoanStatusHistoryByLoanIdService(
                loanId
            );


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Loan Status History By Loan Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan status history.",

        });

    }

};


// ==========================================================
// GET LATEST LOAN STATUS BY LOAN ID
// ==========================================================

export const getLatestLoanStatusByLoanId = async (
    req,
    res
) => {

    try {

        const { loanId } =
            req.params;


        const data =
            await getLatestLoanStatusHistoryByLoanIdService(
                loanId
            );


        if (!data) {

            return res.status(404).json({

                success: false,

                message:
                    "No status history found for this loan.",

            });

        }


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Latest Loan Status By Loan Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch latest loan status.",

        });

    }

};


// ==========================================================
// GET LOAN STATUS HISTORY BY USER ID
// ==========================================================

export const getLoanStatusHistoryByUserId = async (
    req,
    res
) => {

    try {

        const { userId } =
            req.params;


        const data =
            await getLoanStatusHistoryByUserIdService(
                userId
            );


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Loan Status History By User Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch user status history.",

        });

    }

};


// ==========================================================
// GET LOAN STATUS HISTORY BY STATUS
// ==========================================================

export const getLoanStatusHistoryByStatus = async (
    req,
    res
) => {

    try {

        const { status } =
            req.params;


        const data =
            await getLoanStatusHistoryByStatusService(
                status
            );


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Loan Status History By Status Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch status history.",

        });

    }

};


// ==========================================================
// DELETE LOAN STATUS HISTORY
// ==========================================================

export const deleteLoanStatusHistory = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const deleted =
            await deleteLoanStatusHistoryService(id);


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan status history not found.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan status history deleted successfully.",

        });

    } catch (error) {

        console.error(
            "Delete Loan Status History Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to delete loan status history.",

        });

    }

};


// ==========================================================
// BACKWARD-COMPATIBILITY ALIASES
// ==========================================================
//
// These aliases prevent older code from breaking if it uses
// the previous controller naming convention.
// ==========================================================

export const createStatusHistory =
    createLoanStatusHistory;


export const getAllStatusHistory =
    getAllLoanStatusHistory;


export const getStatusHistoryById =
    getLoanStatusHistoryById;


export const getStatusHistoryByApplicationId =
    getLoanStatusHistoryByApplicationId;


export const getLatestStatusHistoryByApplicationId =
    getLatestLoanStatusByApplicationId;


export const getStatusHistoryByLoanId =
    getLoanStatusHistoryByLoanId;


export const getLatestStatusHistoryByLoanId =
    getLatestLoanStatusByLoanId;


export const getStatusHistoryByUserId =
    getLoanStatusHistoryByUserId;


export const getStatusHistoryByStatus =
    getLoanStatusHistoryByStatus;


export const deleteStatusHistory =
    deleteLoanStatusHistory;


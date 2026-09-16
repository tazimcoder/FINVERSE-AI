/**
 * ==========================================================
 * FINVERSE AI
 * Loan Disbursement Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanDisbursementController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan disbursements
 * - Call loan disbursement service
 * - Return consistent API responses
 *
 * Connected Service:
 * ../services/loanDisbursementService.js
 *
 * ==========================================================
 */

import {
    fetchAllLoanDisbursements,
    fetchLoanDisbursementById,
    fetchLoanDisbursementsByLoanId,
    fetchLoanDisbursementsByApplicationId,
    fetchLoanDisbursementsByOfferId,
    fetchLoanDisbursementByReference,
    fetchLoanDisbursementsByAccountId,
    fetchLoanDisbursementsByTransactionId,
    fetchLoanDisbursementsByStatus,
    createNewLoanDisbursement,
    updateExistingLoanDisbursement,
    changeLoanDisbursementStatus,
    startLoanDisbursementProcessing,
    markLoanDisbursementProcessed,
    markLoanDisbursed,
    cancelLoanDisbursement as cancelLoanDisbursementService,
    reverseLoanDisbursement as reverseLoanDisbursementService,
    removeLoanDisbursement
} from "../services/loanDisbursementService.js";


// ==========================================================
// GET ALL LOAN DISBURSEMENTS
// ==========================================================

export async function getAllLoanDisbursements(
    req,
    res
) {

    try {

        const disbursements =
            await fetchAllLoanDisbursements();

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get All Loan Disbursements Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan disbursements."

        });

    }

}


// ==========================================================
// GET LOAN DISBURSEMENT BY ID
// ==========================================================

export async function getLoanDisbursementById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const disbursement =
            await fetchLoanDisbursementById(
                id
            );

        if (!disbursement) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan disbursement not found."

            });

        }

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement fetched successfully.",

            data:
                disbursement

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursement By ID Error:",
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
// GET DISBURSEMENTS BY LOAN
// ==========================================================

export async function getLoanDisbursementsByLoan(
    req,
    res
) {

    try {

        const {
            loanId
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByLoanId(
                loanId
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Loan Error:",
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
// GET DISBURSEMENTS BY APPLICATION
// ==========================================================

export async function getLoanDisbursementsByApplication(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByApplicationId(
                applicationId
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan application disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Application Error:",
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
// GET DISBURSEMENTS BY OFFER
// ==========================================================

export async function getLoanDisbursementsByOffer(
    req,
    res
) {

    try {

        const {
            offerId
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByOfferId(
                offerId
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan offer disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Offer Error:",
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
// GET DISBURSEMENT BY REFERENCE
// ==========================================================

export async function getLoanDisbursementByReference(
    req,
    res
) {

    try {

        const {
            disbursementReference
        } = req.params;

        const disbursement =
            await fetchLoanDisbursementByReference(
                disbursementReference
            );

        if (!disbursement) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan disbursement not found."

            });

        }

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement fetched successfully.",

            data:
                disbursement

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursement By Reference Error:",
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
// GET DISBURSEMENTS BY DESTINATION ACCOUNT
// ==========================================================

export async function getLoanDisbursementsByAccount(
    req,
    res
) {

    try {

        const {
            accountId
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByAccountId(
                accountId
            );

        return res.status(200).json({

            success: true,

            message:
                "Account loan disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Account Error:",
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
// GET DISBURSEMENTS BY TRANSACTION
// ==========================================================

export async function getLoanDisbursementsByTransaction(
    req,
    res
) {

    try {

        const {
            transactionId
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByTransactionId(
                transactionId
            );

        return res.status(200).json({

            success: true,

            message:
                "Transaction loan disbursements fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Transaction Error:",
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
// GET DISBURSEMENTS BY STATUS
// ==========================================================

export async function getLoanDisbursementsByStatus(
    req,
    res
) {

    try {

        const {
            status
        } = req.params;

        const disbursements =
            await fetchLoanDisbursementsByStatus(
                status
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursements by status fetched successfully.",

            data:
                disbursements

        });

    }
    catch (error) {

        console.error(
            "Get Loan Disbursements By Status Error:",
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
// CREATE LOAN DISBURSEMENT
// ==========================================================

export async function createLoanDisbursement(
    req,
    res
) {

    try {

        const disbursement =
            await createNewLoanDisbursement(
                req.body
            );

        return res.status(201).json({

            success: true,

            message:
                "Loan disbursement created successfully.",

            data: {

                id:
                    disbursement

            }

        });

    }
    catch (error) {

        console.error(
            "Create Loan Disbursement Error:",
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
// UPDATE LOAN DISBURSEMENT
// ==========================================================

export async function updateLoanDisbursement(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await updateExistingLoanDisbursement(
                id,
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Update Loan Disbursement Error:",
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
// UPDATE DISBURSEMENT STATUS
// ==========================================================

export async function updateLoanDisbursementStatus(
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
                    "Disbursement status is required."

            });

        }

        const result =
            await changeLoanDisbursementStatus(
                id,
                status
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement status updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Update Loan Disbursement Status Error:",
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
// START DISBURSEMENT PROCESSING
// ==========================================================

export async function startDisbursementProcessing(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await startLoanDisbursementProcessing(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement processing started successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Start Loan Disbursement Processing Error:",
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
// MARK DISBURSEMENT AS PROCESSED
// ==========================================================

export async function markDisbursementProcessed(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await markLoanDisbursementProcessed(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement marked as processed successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Mark Loan Disbursement Processed Error:",
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
// MARK DISBURSEMENT AS DISBURSED
// ==========================================================

export async function markDisbursementDisbursed(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await markLoanDisbursed(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement marked as disbursed successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Mark Loan Disbursed Error:",
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
// CANCEL DISBURSEMENT
// ==========================================================

export async function cancelLoanDisbursement(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await cancelLoanDisbursementService(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement cancelled successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Cancel Loan Disbursement Error:",
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
// REVERSE DISBURSEMENT
// ==========================================================

export async function reverseLoanDisbursement(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await reverseLoanDisbursementService(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement reversed successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Reverse Loan Disbursement Error:",
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
// DELETE LOAN DISBURSEMENT
// ==========================================================

export async function deleteLoanDisbursement(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;

        const result =
            await removeLoanDisbursement(
                id
            );

        return res.status(200).json({

            success: true,

            message:
                "Loan disbursement deleted successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }
    catch (error) {

        console.error(
            "Delete Loan Disbursement Error:",
            error.message
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


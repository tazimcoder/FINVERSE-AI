/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanDocumentController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan documents
 * - Fetch documents
 * - Fetch documents by application
 * - Fetch documents by loan
 * - Fetch documents by user
 * - Create loan document
 * - Update loan document
 * - Update verification status
 * - Delete loan document
 *
 * Connected Service:
 * ../services/loanDocumentService.js
 *
 * Database Table:
 * loan_documents
 *
 * ==========================================================
 */

import {
    fetchAllLoanDocuments,
    fetchLoanDocumentById,
    fetchLoanDocumentsByApplicationId,
    fetchLoanDocumentsByLoanId,
    fetchLoanDocumentsByUserId,
    createNewLoanDocument,
    updateExistingLoanDocument,
    changeLoanDocumentVerificationStatus,
    removeLoanDocument
} from "../services/loanDocumentService.js";


// ==========================================================
// Get All Loan Documents
// ==========================================================

export async function getAllLoanDocuments(
    req,
    res
) {

    try {

        const documents =
            await fetchAllLoanDocuments();


        return res.status(200).json({

            success: true,

            message:
                "Loan documents fetched successfully.",

            data: documents

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Documents Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan documents."

        });

    }

}


// ==========================================================
// Get Loan Document By ID
// ==========================================================

export async function getLoanDocumentById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        if (!id) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan document ID is required."

            });

        }


        const document =
            await fetchLoanDocumentById(
                id
            );


        if (!document) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan document not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan document fetched successfully.",

            data: document

        });

    }

    catch (error) {

        console.error(
            "Get Loan Document By ID Error:",
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
// Get Documents By Loan Application
// ==========================================================

export async function getLoanDocumentsByApplication(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;


        if (!applicationId) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        const documents =
            await fetchLoanDocumentsByApplicationId(
                applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application documents fetched successfully.",

            data: documents

        });

    }

    catch (error) {

        console.error(
            "Get Loan Documents By Application Error:",
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
// Get Documents By Loan
// ==========================================================

export async function getLoanDocumentsByLoan(
    req,
    res
) {

    try {

        const {
            loanId
        } = req.params;


        if (!loanId) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan ID is required."

            });

        }


        const documents =
            await fetchLoanDocumentsByLoanId(
                loanId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan documents fetched successfully.",

            data: documents

        });

    }

    catch (error) {

        console.error(
            "Get Loan Documents By Loan Error:",
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
// Get Documents By User
// ==========================================================

export async function getLoanDocumentsByUser(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        if (!userId) {

            return res.status(400).json({

                success: false,

                message:
                    "User ID is required."

            });

        }


        const documents =
            await fetchLoanDocumentsByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User loan documents fetched successfully.",

            data: documents

        });

    }

    catch (error) {

        console.error(
            "Get Loan Documents By User Error:",
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
// Create Loan Document
// ==========================================================

export async function createLoanDocument(
    req,
    res
) {

    try {

        const documentData =
            req.body;


        const documentId =
            await createNewLoanDocument(
                documentData
            );


        const document =
            await fetchLoanDocumentById(
                documentId
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan document created successfully.",

            data: document

        });

    }

    catch (error) {

        console.error(
            "Create Loan Document Error:",
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
// Update Loan Document
// ==========================================================

export async function updateLoanDocument(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const documentData =
            req.body;


        const result =
            await updateExistingLoanDocument(
                id,
                documentData
            );


        const document =
            await fetchLoanDocumentById(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan document updated successfully.",

            data: {

                document,

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Document Error:",
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
// Update Document Verification Status
// ==========================================================

export async function updateLoanDocumentVerificationStatus(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            verification_status,
            rejection_reason,
            verified_by_user_id
        } = req.body;


        if (!verification_status) {

            return res.status(400).json({

                success: false,

                message:
                    "Document verification status is required."

            });

        }


        const result =
            await changeLoanDocumentVerificationStatus(
                id,
                verification_status,
                rejection_reason ?? null,
                verified_by_user_id ?? null
            );


        const document =
            await fetchLoanDocumentById(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan document verification status updated successfully.",

            data: {

                document,

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Document Verification Status Error:",
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
// Delete Loan Document
// ==========================================================

export async function deleteLoanDocument(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanDocument(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan document deleted successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Document Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


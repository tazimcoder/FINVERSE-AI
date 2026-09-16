/**
 * ==========================================================
 * FINVERSE AI
 * Loan Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loans
 * - Validate request parameters
 * - Call loan service
 * - Return consistent API responses
 *
 * ==========================================================
 */

import {
    fetchAllLoans,
    fetchLoanById,
    fetchLoanByNumber,
    fetchLoansByUserId,
    fetchLoanByApplicationId,
    createNewLoan,
    updateExistingLoan,
    changeLoanStatus,
    removeLoan
} from "../services/loanService.js";


// ==========================================================
// Get All Loans
// ==========================================================

export async function getAllLoans(
    req,
    res
) {

    try {

        const loans =
            await fetchAllLoans();


        return res.status(200).json({

            success: true,

            message:
                "Loans fetched successfully.",

            data: loans

        });

    }

    catch (error) {

        console.error(
            "Get All Loans Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loans."

        });

    }

}


// ==========================================================
// Get Loan By ID
// ==========================================================

export async function getLoanById(
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
                    "Loan ID is required."

            });

        }


        const loan =
            await fetchLoanById(
                id
            );


        if (!loan) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan fetched successfully.",

            data: loan

        });

    }

    catch (error) {

        console.error(
            "Get Loan By ID Error:",
            error
        );


        if (
            error.message ===
            "Loan ID is required."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan."

        });

    }

}


// ==========================================================
// Get Loan By Loan Number
// ==========================================================

export async function getLoanByNumber(
    req,
    res
) {

    try {

        const {
            loanNumber
        } = req.params;


        if (!loanNumber) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan number is required."

            });

        }


        const loan =
            await fetchLoanByNumber(
                loanNumber
            );


        if (!loan) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan fetched successfully.",

            data: loan

        });

    }

    catch (error) {

        console.error(
            "Get Loan By Number Error:",
            error
        );


        if (
            error.message ===
            "Loan number is required."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan."

        });

    }

}


// ==========================================================
// Get Loans By User
// ==========================================================

export async function getLoansByUser(
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


        const loans =
            await fetchLoansByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User loans fetched successfully.",

            data: loans

        });

    }

    catch (error) {

        console.error(
            "Get User Loans Error:",
            error
        );


        if (
            error.message ===
            "User ID is required."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch user loans."

        });

    }

}


// ==========================================================
// Get Loan By Application
// ==========================================================

export async function getLoanByApplication(
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


        const loan =
            await fetchLoanByApplicationId(
                applicationId
            );


        if (!loan) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found for this application."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan fetched successfully.",

            data: loan

        });

    }

    catch (error) {

        console.error(
            "Get Loan By Application Error:",
            error
        );


        if (
            error.message ===
            "Loan application ID is required."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan."

        });

    }

}


// ==========================================================
// Create Loan
// ==========================================================

export async function createLoan(
    req,
    res
) {

    try {

        const loanData =
            req.body;


        const loan =
            await createNewLoan(
                loanData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan created successfully.",

            data: loan

        });

    }

    catch (error) {

        console.error(
            "Create Loan Error:",
            error
        );


        const message =
            error.message || "";


        // --------------------------------------------------
        // Duplicate Loan Number
        // --------------------------------------------------

        if (
            message
                .toLowerCase()
                .includes("already exists")
        ) {

            return res.status(409).json({

                success: false,

                message

            });

        }


        // --------------------------------------------------
        // Validation Errors
        // --------------------------------------------------

        if (
            message
                .toLowerCase()
                .includes("required") ||
            message
                .toLowerCase()
                .includes("must be") ||
            message
                .toLowerCase()
                .includes("cannot be") ||
            message
                .toLowerCase()
                .includes("invalid")
        ) {

            return res.status(400).json({

                success: false,

                message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to create loan."

        });

    }

}


// ==========================================================
// Update Loan
// ==========================================================

export async function updateLoan(
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
                    "Loan ID is required."

            });

        }


        const loanData =
            req.body;


        const result =
            await updateExistingLoan(
                id,
                loanData
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Error:",
            error
        );


        const message =
            error.message || "";


        if (
            message
                .toLowerCase()
                .includes("not found")
        ) {

            return res.status(404).json({

                success: false,

                message

            });

        }


        if (
            message
                .toLowerCase()
                .includes("required") ||
            message
                .toLowerCase()
                .includes("must be") ||
            message
                .toLowerCase()
                .includes("cannot be") ||
            message
                .toLowerCase()
                .includes("invalid")
        ) {

            return res.status(400).json({

                success: false,

                message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to update loan."

        });

    }

}


// ==========================================================
// Update Loan Status
// ==========================================================

export async function updateLoanStatus(
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


        if (!id) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan ID is required."

            });

        }


        if (!status) {

            return res.status(400).json({

                success: false,

                message:
                    "Status is required."

            });

        }


        const result =
            await changeLoanStatus(
                id,
                status
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan status updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Status Error:",
            error
        );


        const message =
            error.message || "";


        if (
            message
                .toLowerCase()
                .includes("not found")
        ) {

            return res.status(404).json({

                success: false,

                message

            });

        }


        if (
            message
                .toLowerCase()
                .includes("required") ||
            message
                .toLowerCase()
                .includes("invalid")
        ) {

            return res.status(400).json({

                success: false,

                message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to update loan status."

        });

    }

}


// ==========================================================
// Delete Loan
// ==========================================================

export async function deleteLoan(
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
                    "Loan ID is required."

            });

        }


        const result =
            await removeLoan(
                id
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan deleted successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Error:",
            error
        );


        const message =
            error.message || "";


        if (
            message
                .toLowerCase()
                .includes("not found")
        ) {

            return res.status(404).json({

                success: false,

                message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to delete loan."

        });

    }

}


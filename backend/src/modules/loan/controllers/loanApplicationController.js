/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanApplicationController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan applications
 * - Validate request parameters
 * - Call loan application service
 * - Return consistent API responses
 *
 * ==========================================================
 */

import {
    fetchAllLoanApplications,
    fetchLoanApplicationById,
    fetchLoanApplicationsByUserId,
    fetchLoanApplicationByNumber,
    createNewLoanApplication,
    updateExistingLoanApplication,
    changeLoanApplicationStatus,
    removeLoanApplication
} from "../services/loanApplicationService.js";


// ==========================================================
// GET ALL LOAN APPLICATIONS
// ==========================================================

export async function getAllLoanApplications(
    req,
    res
) {

    try {

        const applications =
            await fetchAllLoanApplications();


        return res.status(200).json({

            success: true,

            message:
                "Loan applications fetched successfully.",

            data:
                applications

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Applications Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan applications.",

            error:
                error.message

        });

    }

}


// ==========================================================
// GET LOAN APPLICATION BY NUMBER
// IMPORTANT:
// Keep this before /:id in routes.
// ==========================================================

export async function getLoanApplicationByNumber(
    req,
    res
) {

    try {

        const {
            applicationNumber
        } = req.params;


        if (
            !applicationNumber ||
            String(applicationNumber).trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Application number is required."

            });

        }


        const application =
            await fetchLoanApplicationByNumber(
                applicationNumber
            );


        if (!application) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan application not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan application fetched successfully.",

            data:
                application

        });

    }

    catch (error) {

        console.error(
            "Get Loan Application By Number Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan application.",

            error:
                error.message

        });

    }

}


// ==========================================================
// GET LOAN APPLICATIONS BY USER
// ==========================================================

export async function getLoanApplicationsByUser(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        if (
            !userId
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "User ID is required."

            });

        }


        const applications =
            await fetchLoanApplicationsByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User loan applications fetched successfully.",

            data:
                applications

        });

    }

    catch (error) {

        console.error(
            "Get User Loan Applications Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch user loan applications.",

            error:
                error.message

        });

    }

}


// ==========================================================
// GET LOAN APPLICATION BY ID
// ==========================================================

export async function getLoanApplicationById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        if (
            !id
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        const application =
            await fetchLoanApplicationById(
                id
            );


        if (!application) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan application not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan application fetched successfully.",

            data:
                application

        });

    }

    catch (error) {

        console.error(
            "Get Loan Application By ID Error:",
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
// CREATE LOAN APPLICATION
// ==========================================================

export async function createLoanApplication(
    req,
    res
) {

    try {

        const applicationData =
            req.body;


        const application =
            await createNewLoanApplication(
                applicationData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan application created successfully.",

            data:
                application

        });

    }

    catch (error) {

        console.error(
            "Create Loan Application Error:",
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
// UPDATE LOAN APPLICATION
// ==========================================================

export async function updateLoanApplication(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const applicationData =
            req.body;


        if (
            !id
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        const result =
            await updateExistingLoanApplication(
                id,
                applicationData
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application updated successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Update Loan Application Error:",
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
// UPDATE LOAN APPLICATION STATUS
// ==========================================================

export async function updateLoanApplicationStatus(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            status,
            rejection_reason
        } = req.body;


        if (
            !id
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        if (
            !status
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Status is required."

            });

        }


        const result =
            await changeLoanApplicationStatus(
                id,
                status,
                rejection_reason ?? null
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application status updated successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Update Loan Application Status Error:",
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
// DELETE LOAN APPLICATION
// ==========================================================

export async function deleteLoanApplication(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        if (
            !id
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        const result =
            await removeLoanApplication(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application deleted successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Application Error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


/**
 * ==========================================================
 * FINVERSE AI
 * Loan Verification Check Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanVerificationCheckController.js
 *
 * Database Table:
 * loan_verification_checks
 *
 * Responsibility:
 *
 * - Handle HTTP requests for verification checks
 * - Validate request input through service layer
 * - Return consistent API responses
 * - Handle service errors
 *
 * Flow:
 *
 * ROUTE
 *   ↓
 * CONTROLLER
 *   ↓
 * SERVICE
 *   ↓
 * MODEL
 *   ↓
 * MYSQL
 *
 * ==========================================================
 */

import {
    fetchAllLoanVerificationChecks,
    fetchLoanVerificationCheckById,
    fetchLoanVerificationChecksByApplicationId,
    fetchLoanVerificationChecksByUserId,
    fetchLoanVerificationChecksByType,
    fetchLoanVerificationChecksByStatus,
    fetchLoanVerificationChecksByRiskLevel,
    createNewLoanVerificationCheck,
    updateExistingLoanVerificationCheck,
    changeLoanVerificationStatus,
    removeLoanVerificationCheck
} from "../services/loanVerificationCheckService.js";


// ==========================================================
// Get All Verification Checks
// ==========================================================

export async function getAllVerificationChecks(
    req,
    res
) {

    try {

        const verificationChecks =
            await fetchAllLoanVerificationChecks();


        return res.status(200).json({

            success: true,

            message:
                "Loan verification checks fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Verification Checks Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan verification checks.",

            error:
                error.message

        });

    }

}


// ==========================================================
// Get Verification Check By ID
// ==========================================================

export async function getVerificationCheckById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const verificationCheck =
            await fetchLoanVerificationCheckById(
                id
            );


        if (!verificationCheck) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan verification check not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan verification check fetched successfully.",

            data:
                verificationCheck

        });

    }

    catch (error) {

        console.error(
            "Get Loan Verification Check Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get By Loan Application
// ==========================================================

export async function getVerificationChecksByApplicationId(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;


        const verificationChecks =
            await fetchLoanVerificationChecksByApplicationId(
                applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application verification checks fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get Verification Checks By Application Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get By User
// ==========================================================

export async function getVerificationChecksByUserId(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        const verificationChecks =
            await fetchLoanVerificationChecksByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User verification checks fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get Verification Checks By User Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get By Verification Type
// ==========================================================

export async function getVerificationChecksByType(
    req,
    res
) {

    try {

        const {
            verificationType
        } = req.params;


        const verificationChecks =
            await fetchLoanVerificationChecksByType(
                verificationType
            );


        return res.status(200).json({

            success: true,

            message:
                "Verification checks by type fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get Verification Checks By Type Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get By Verification Status
// ==========================================================

export async function getVerificationChecksByStatus(
    req,
    res
) {

    try {

        const {
            status
        } = req.params;


        const verificationChecks =
            await fetchLoanVerificationChecksByStatus(
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Verification checks by status fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get Verification Checks By Status Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Get By Risk Level
// ==========================================================

export async function getVerificationChecksByRiskLevel(
    req,
    res
) {

    try {

        const {
            riskLevel
        } = req.params;


        const verificationChecks =
            await fetchLoanVerificationChecksByRiskLevel(
                riskLevel
            );


        return res.status(200).json({

            success: true,

            message:
                "Verification checks by risk level fetched successfully.",

            data:
                verificationChecks

        });

    }

    catch (error) {

        console.error(
            "Get Verification Checks By Risk Level Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Create Verification Check
// ==========================================================

export async function createVerificationCheck(
    req,
    res
) {

    try {

        const verificationData =
            req.body;


        const verificationId =
            await createNewLoanVerificationCheck(
                verificationData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan verification check created successfully.",

            data: {

                id:
                    verificationId

            }

        });

    }

    catch (error) {

        console.error(
            "Create Loan Verification Check Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Update Verification Check
// ==========================================================

export async function updateVerificationCheck(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const verificationData =
            req.body;


        const result =
            await updateExistingLoanVerificationCheck(
                id,
                verificationData
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan verification check updated successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Update Loan Verification Check Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Change Verification Status
// ==========================================================

export async function updateVerificationStatus(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            verification_status,
            risk_level,
            verification_score,
            failure_reason,
            verified_by_user_id,
            remarks
        } = req.body;


        const result =
            await changeLoanVerificationStatus(
                id,
                verification_status,
                {
                    risk_level,
                    verification_score,
                    failure_reason,
                    verified_by_user_id,
                    remarks
                }
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan verification status updated successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Update Loan Verification Status Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Delete Verification Check
// ==========================================================

export async function deleteVerificationCheck(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanVerificationCheck(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan verification check deleted successfully.",

            data:
                result

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Verification Check Error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}
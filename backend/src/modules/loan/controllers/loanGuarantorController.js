/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanGuarantorController.js
 *
 * Database Table:
 * loan_guarantors
 *
 * Responsibility:
 *
 * - Handle HTTP requests for Loan Guarantors
 * - Validate request input through service layer
 * - Return consistent API responses
 * - Handle controller-level errors
 *
 * ==========================================================
 */

import {
    fetchAllLoanGuarantors,
    fetchLoanGuarantorById,
    fetchLoanGuarantorsByApplicationId,
    fetchLoanGuarantorsByUserId,
    fetchLoanGuarantorsByStatus,
    fetchLoanGuarantorsByVerificationStatus,
    fetchLoanGuarantorsByConsentStatus,
    createNewLoanGuarantor,
    updateExistingLoanGuarantor,
    changeLoanGuarantorStatus,
    changeLoanGuarantorVerificationStatus,
    changeLoanGuarantorConsentStatus,
    removeLoanGuarantor
} from "../services/loanGuarantorService.js";


// ==========================================================
// GET ALL LOAN GUARANTORS
// ==========================================================

export async function getAllLoanGuarantors(
    req,
    res
) {

    try {

        const guarantors =
            await fetchAllLoanGuarantors();


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getAllLoanGuarantors:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// GET LOAN GUARANTOR BY ID
// ==========================================================

export async function getLoanGuarantorById(
    req,
    res
) {

    try {

        const guarantor =
            await fetchLoanGuarantorById(
                req.params.id
            );


        if (!guarantor) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan guarantor not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor fetched successfully.",

            data:
                guarantor

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorById:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantor."

        });

    }

}


// ==========================================================
// GET GUARANTORS BY APPLICATION
// ==========================================================

export async function getLoanGuarantorsByApplicationId(
    req,
    res
) {

    try {

        const guarantors =
            await fetchLoanGuarantorsByApplicationId(
                req.params.applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorsByApplicationId:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// GET GUARANTORS BY USER
// ==========================================================

export async function getLoanGuarantorsByUserId(
    req,
    res
) {

    try {

        const guarantors =
            await fetchLoanGuarantorsByUserId(
                req.params.userId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorsByUserId:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// GET GUARANTORS BY GUARANTOR STATUS
// ==========================================================

export async function getLoanGuarantorsByStatus(
    req,
    res
) {

    try {

        const guarantors =
            await fetchLoanGuarantorsByStatus(
                req.params.status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorsByStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// GET GUARANTORS BY VERIFICATION STATUS
// ==========================================================

export async function getLoanGuarantorsByVerificationStatus(
    req,
    res
) {

    try {

        const guarantors =
            await fetchLoanGuarantorsByVerificationStatus(
                req.params.status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorsByVerificationStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// GET GUARANTORS BY CONSENT STATUS
// ==========================================================

export async function getLoanGuarantorsByConsentStatus(
    req,
    res
) {

    try {

        const guarantors =
            await fetchLoanGuarantorsByConsentStatus(
                req.params.status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantors fetched successfully.",

            data:
                guarantors

        });

    } catch (error) {

        console.error(
            "getLoanGuarantorsByConsentStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan guarantors."

        });

    }

}


// ==========================================================
// CREATE LOAN GUARANTOR
// ==========================================================

export async function createLoanGuarantor(
    req,
    res
) {

    try {

        const guarantor =
            await createNewLoanGuarantor(
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan guarantor created successfully.",

            data:
                guarantor

        });

    } catch (error) {

        console.error(
            "createLoanGuarantor:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to create loan guarantor."

        });

    }

}


// ==========================================================
// UPDATE LOAN GUARANTOR
// ==========================================================

export async function updateLoanGuarantor(
    req,
    res
) {

    try {

        const guarantor =
            await updateExistingLoanGuarantor(
                req.params.id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor updated successfully.",

            data:
                guarantor

        });

    } catch (error) {

        console.error(
            "updateLoanGuarantor:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update loan guarantor."

        });

    }

}


// ==========================================================
// UPDATE GUARANTOR STATUS
// ==========================================================

export async function updateLoanGuarantorStatus(
    req,
    res
) {

    try {

        const status =
            req.body?.guarantor_status ??
            req.body?.status;


        const result =
            await changeLoanGuarantorStatus(
                req.params.id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor status updated successfully.",

            data:
                result

        });

    } catch (error) {

        console.error(
            "updateLoanGuarantorStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update loan guarantor status."

        });

    }

}


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================

export async function updateLoanGuarantorVerificationStatus(
    req,
    res
) {

    try {

        const status =
            req.body?.verification_status ??
            req.body?.status;


        const result =
            await changeLoanGuarantorVerificationStatus(
                req.params.id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor verification status updated successfully.",

            data:
                result

        });

    } catch (error) {

        console.error(
            "updateLoanGuarantorVerificationStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update verification status."

        });

    }

}


// ==========================================================
// UPDATE CONSENT STATUS
// ==========================================================

export async function updateLoanGuarantorConsentStatus(
    req,
    res
) {

    try {

        const status =
            req.body?.consent_status ??
            req.body?.status;


        const result =
            await changeLoanGuarantorConsentStatus(
                req.params.id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor consent status updated successfully.",

            data:
                result

        });

    } catch (error) {

        console.error(
            "updateLoanGuarantorConsentStatus:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update consent status."

        });

    }

}


// ==========================================================
// DELETE LOAN GUARANTOR
// ==========================================================

export async function deleteLoanGuarantor(
    req,
    res
) {

    try {

        const result =
            await removeLoanGuarantor(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan guarantor deleted successfully.",

            data:
                result

        });

    } catch (error) {

        console.error(
            "deleteLoanGuarantor:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to delete loan guarantor."

        });

    }

}


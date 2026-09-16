/**
 * ==========================================================
 * FINVERSE AI
 * Loan Property Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanPropertyController.js
 *
 * Responsibility:
 *
 * - Handle Loan Property HTTP requests
 * - Call Loan Property Service
 * - Return standardized API responses
 * - Handle controller-level errors
 * - Keep business logic inside service layer
 *
 * ==========================================================
 */

import {
    fetchAllLoanProperties,
    fetchLoanPropertyById,
    fetchLoanPropertiesByApplicationId,
    fetchLoanPropertiesByUserId,
    createNewLoanProperty,
    updateExistingLoanProperty,
    changeLoanPropertyValuationStatus,
    changeLoanPropertyVerificationStatus,
    removeLoanProperty
} from "../services/loanPropertyService.js";


// ==========================================================
// GET ALL LOAN PROPERTIES
// ==========================================================
//
// GET
// /api/v1/loan-properties
//
// ==========================================================

export async function getAllLoanProperties(
    req,
    res
) {

    try {

        const properties =
            await fetchAllLoanProperties();


        return res.status(200).json({

            success: true,

            message:
                "Loan properties fetched successfully.",

            data: properties

        });

    } catch (error) {

        console.error(
            "getAllLoanProperties error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan properties.",

            error:
                error.message

        });

    }

}


// ==========================================================
// GET LOAN PROPERTY BY ID
// ==========================================================
//
// GET
// /api/v1/loan-properties/:id
//
// ==========================================================

export async function getLoanPropertyById(
    req,
    res
) {

    try {

        const property =
            await fetchLoanPropertyById(
                req.params.id
            );


        if (!property) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan property not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan property fetched successfully.",

            data: property

        });

    } catch (error) {

        console.error(
            "getLoanPropertyById error:",
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
// GET PROPERTIES BY APPLICATION ID
// ==========================================================
//
// GET
// /api/v1/loan-properties/application/:applicationId
//
// ==========================================================

export async function getLoanPropertiesByApplicationId(
    req,
    res
) {

    try {

        const properties =
            await fetchLoanPropertiesByApplicationId(
                req.params.applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan properties for application fetched successfully.",

            data: properties

        });

    } catch (error) {

        console.error(
            "getLoanPropertiesByApplicationId error:",
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
// GET PROPERTIES BY USER ID
// ==========================================================
//
// GET
// /api/v1/loan-properties/user/:userId
//
// ==========================================================

export async function getLoanPropertiesByUserId(
    req,
    res
) {

    try {

        const properties =
            await fetchLoanPropertiesByUserId(
                req.params.userId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan properties for user fetched successfully.",

            data: properties

        });

    } catch (error) {

        console.error(
            "getLoanPropertiesByUserId error:",
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
// CREATE LOAN PROPERTY
// ==========================================================
//
// POST
// /api/v1/loan-properties
//
// ==========================================================

export async function createLoanProperty(
    req,
    res
) {

    try {

        const propertyId =
            await createNewLoanProperty(
                req.body
            );


        const property =
            await fetchLoanPropertyById(
                propertyId
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan property created successfully.",

            data: property

        });

    } catch (error) {

        console.error(
            "createLoanProperty error:",
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
// UPDATE LOAN PROPERTY
// ==========================================================
//
// PUT
// /api/v1/loan-properties/:id
//
// ==========================================================

export async function updateLoanProperty(
    req,
    res
) {

    try {

        const result =
            await updateExistingLoanProperty(
                req.params.id,
                req.body
            );


        const property =
            await fetchLoanPropertyById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan property updated successfully.",

            data: property,

            meta: {

                affectedRows:
                    result?.affectedRows ?? 0

            }

        });

    } catch (error) {

        console.error(
            "updateLoanProperty error:",
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
// UPDATE PROPERTY VALUATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-properties/:id/valuation-status
//
// ==========================================================

export async function updateLoanPropertyValuationStatus(
    req,
    res
) {

    try {

        const status =
            req.body?.valuation_status ??
            req.body?.status;


        if (
            status === undefined ||
            status === null ||
            String(status).trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valuation status is required."

            });

        }


        const result =
            await changeLoanPropertyValuationStatus(
                req.params.id,
                status
            );


        const property =
            await fetchLoanPropertyById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan property valuation status updated successfully.",

            data: property,

            meta: {

                affectedRows:
                    result?.affectedRows ?? 0

            }

        });

    } catch (error) {

        console.error(
            "updateLoanPropertyValuationStatus error:",
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
// UPDATE PROPERTY VERIFICATION STATUS
// ==========================================================
//
// PATCH
// /api/v1/loan-properties/:id/verification-status
//
// ==========================================================

export async function updateLoanPropertyVerificationStatus(
    req,
    res
) {

    try {

        const status =
            req.body?.verification_status ??
            req.body?.status;


        if (
            status === undefined ||
            status === null ||
            String(status).trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Verification status is required."

            });

        }


        const result =
            await changeLoanPropertyVerificationStatus(
                req.params.id,
                status
            );


        const property =
            await fetchLoanPropertyById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan property verification status updated successfully.",

            data: property,

            meta: {

                affectedRows:
                    result?.affectedRows ?? 0

            }

        });

    } catch (error) {

        console.error(
            "updateLoanPropertyVerificationStatus error:",
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
// DELETE LOAN PROPERTY
// ==========================================================
//
// DELETE
// /api/v1/loan-properties/:id
//
// ==========================================================

export async function deleteLoanProperty(
    req,
    res
) {

    try {

        const result =
            await removeLoanProperty(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan property deleted successfully.",

            data: {

                id:
                    Number(req.params.id),

                affectedRows:
                    result?.affectedRows ?? 0

            }

        });

    } catch (error) {

        console.error(
            "deleteLoanProperty error:",
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
// CONTROLLER EXPORT SUMMARY
// ==========================================================
//
// Exported functions:
//
// getAllLoanProperties
// getLoanPropertyById
// getLoanPropertiesByApplicationId
// getLoanPropertiesByUserId
// createLoanProperty
// updateLoanProperty
// updateLoanPropertyValuationStatus
// updateLoanPropertyVerificationStatus
// deleteLoanProperty
//
// ==========================================================
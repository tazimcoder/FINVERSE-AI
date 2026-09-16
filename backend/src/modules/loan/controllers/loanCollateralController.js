/**
 * ==========================================================
 * FINVERSE AI
 * Loan Collateral Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanCollateralController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan collateral
 * - Validate request input at controller level
 * - Call collateral service
 * - Return standardized API responses
 *
 * ==========================================================
 */

import {
    fetchAllLoanCollaterals,
    fetchLoanCollateralById,
    fetchLoanCollateralsByApplicationId,
    fetchLoanCollateralsByLoanId,
    fetchLoanCollateralsByUserId,
    fetchLoanCollateralsByStatus,
    createNewLoanCollateral,
    updateExistingLoanCollateral,
    changeLoanCollateralValuationStatus,
    changeLoanCollateralVerificationStatus,
    changeLoanCollateralLegalStatus,
    changeLoanCollateralLienStatus,
    changeLoanCollateralReleaseStatus,
    removeLoanCollateral
} from "../services/loanCollateralService.js";


// ==========================================================
// GET ALL LOAN COLLATERALS
// ==========================================================

export async function getAllLoanCollaterals(
    req,
    res
) {

    try {

        const collaterals =
            await fetchAllLoanCollaterals();

        return res.status(200).json({

            success: true,

            data: collaterals

        });

    }

    catch (error) {

        console.error(
            "Get all loan collaterals error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan collaterals."

        });

    }

}


// ==========================================================
// GET LOAN COLLATERAL BY ID
// ==========================================================

export async function getLoanCollateralById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const collateral =
            await fetchLoanCollateralById(
                id
            );


        if (!collateral) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan collateral not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: collateral

        });

    }

    catch (error) {

        console.error(
            "Get loan collateral by ID error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan collateral."

        });

    }

}


// ==========================================================
// GET COLLATERALS BY LOAN APPLICATION
// ==========================================================

export async function getLoanCollateralsByApplicationId(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;


        const collaterals =
            await fetchLoanCollateralsByApplicationId(
                applicationId
            );


        return res.status(200).json({

            success: true,

            data: collaterals

        });

    }

    catch (error) {

        console.error(
            "Get collaterals by application error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch application collaterals."

        });

    }

}


// ==========================================================
// GET COLLATERALS BY LOAN
// ==========================================================

export async function getLoanCollateralsByLoanId(
    req,
    res
) {

    try {

        const {
            loanId
        } = req.params;


        const collaterals =
            await fetchLoanCollateralsByLoanId(
                loanId
            );


        return res.status(200).json({

            success: true,

            data: collaterals

        });

    }

    catch (error) {

        console.error(
            "Get collaterals by loan error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan collaterals."

        });

    }

}


// ==========================================================
// GET COLLATERALS BY USER
// ==========================================================

export async function getLoanCollateralsByUserId(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        const collaterals =
            await fetchLoanCollateralsByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            data: collaterals

        });

    }

    catch (error) {

        console.error(
            "Get collaterals by user error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch user collaterals."

        });

    }

}


// ==========================================================
// GET COLLATERALS BY STATUS
// ==========================================================
//
// Supports routes such as:
//
// GET /loan-collaterals/status/:status
//
// ==========================================================

export async function getLoanCollateralsByStatus(
    req,
    res
) {

    try {

        const {
            status
        } = req.params;


        if (!status) {

            return res.status(400).json({

                success: false,

                message:
                    "Collateral status is required."

            });

        }


        const collaterals =
            await fetchLoanCollateralsByStatus(
                status
            );


        return res.status(200).json({

            success: true,

            data: collaterals

        });

    }

    catch (error) {

        console.error(
            "Get collaterals by status error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch collaterals by status."

        });

    }

}


// ==========================================================
// CREATE LOAN COLLATERAL
// ==========================================================

export async function createLoanCollateral(
    req,
    res
) {

    try {

        const collateralData =
            req.body;


        const collateralId =
            await createNewLoanCollateral(
                collateralData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan collateral created successfully.",

            data: {

                id: collateralId

            }

        });

    }

    catch (error) {

        console.error(
            "Create loan collateral error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to create loan collateral."

        });

    }

}


// ==========================================================
// UPDATE LOAN COLLATERAL
// ==========================================================

export async function updateLoanCollateral(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const collateralData =
            req.body;


        const result =
            await updateExistingLoanCollateral(
                id,
                collateralData
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan collateral updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update loan collateral error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update loan collateral."

        });

    }

}


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================

export async function updateLoanCollateralValuationStatus(
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
                    "Valuation status is required."

            });

        }


        const result =
            await changeLoanCollateralValuationStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Collateral valuation status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update collateral valuation status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update valuation status."

        });

    }

}


// ==========================================================
// UPDATE VERIFICATION STATUS
// ==========================================================

export async function updateLoanCollateralVerificationStatus(
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
                    "Verification status is required."

            });

        }


        const result =
            await changeLoanCollateralVerificationStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Collateral verification status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update collateral verification status error:",
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
// UPDATE LEGAL STATUS
// ==========================================================

export async function updateLoanCollateralLegalStatus(
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
                    "Legal status is required."

            });

        }


        const result =
            await changeLoanCollateralLegalStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Collateral legal status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update collateral legal status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update legal status."

        });

    }

}


// ==========================================================
// UPDATE LIEN STATUS
// ==========================================================

export async function updateLoanCollateralLienStatus(
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
                    "Lien status is required."

            });

        }


        const result =
            await changeLoanCollateralLienStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Collateral lien status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update collateral lien status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update lien status."

        });

    }

}


// ==========================================================
// UPDATE RELEASE STATUS
// ==========================================================

export async function updateLoanCollateralReleaseStatus(
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
                    "Release status is required."

            });

        }


        const result =
            await changeLoanCollateralReleaseStatus(
                id,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Collateral release status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update collateral release status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update release status."

        });

    }

}


// ==========================================================
// DELETE LOAN COLLATERAL
// ==========================================================

export async function deleteLoanCollateral(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanCollateral(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan collateral deleted successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Delete loan collateral error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to delete loan collateral."

        });

    }

}


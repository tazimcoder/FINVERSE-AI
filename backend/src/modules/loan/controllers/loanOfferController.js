/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanOfferController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan offers
 * - Call loan offer service layer
 * - Validate request parameters
 * - Return consistent API responses
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
    fetchAllLoanOffers,
    fetchLoanOfferById,
    fetchLoanOffersByApplicationId,
    fetchLoanOffersByUserId,
    fetchLoanOffersByStatus,
    createNewLoanOffer,
    updateExistingLoanOffer,
    changeLoanOfferStatus,
    acceptLoanOffer,
    rejectLoanOffer,
    withdrawLoanOffer,
    expireLoanOffer,
    removeLoanOffer
} from "../services/loanOfferService.js";


// ==========================================================
// Get All Loan Offers
// ==========================================================

export async function getAllLoanOffersController(
    req,
    res
) {

    try {

        const offers =
            await fetchAllLoanOffers();


        return res.status(200).json({

            success: true,

            message:
                "Loan offers fetched successfully.",

            data: offers

        });

    }

    catch (error) {

        console.error(
            "Get all loan offers error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan offers."

        });

    }

}


// ==========================================================
// Get Loan Offer By ID
// ==========================================================

export async function getLoanOfferByIdController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const offer =
            await fetchLoanOfferById(
                id
            );


        if (!offer) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan offer not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan offer fetched successfully.",

            data: offer

        });

    }

    catch (error) {

        console.error(
            "Get loan offer by ID error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan offer."

        });

    }

}


// ==========================================================
// Get Offers By Application ID
// ==========================================================

export async function getLoanOffersByApplicationIdController(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;


        const offers =
            await fetchLoanOffersByApplicationId(
                applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan application offers fetched successfully.",

            data: offers

        });

    }

    catch (error) {

        console.error(
            "Get offers by application error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan application offers."

        });

    }

}


// ==========================================================
// Get Offers By User ID
// ==========================================================

export async function getLoanOffersByUserIdController(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        const offers =
            await fetchLoanOffersByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User loan offers fetched successfully.",

            data: offers

        });

    }

    catch (error) {

        console.error(
            "Get offers by user error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch user loan offers."

        });

    }

}


// ==========================================================
// Get Offers By Status
// ==========================================================

export async function getLoanOffersByStatusController(
    req,
    res
) {

    try {

        const {
            status
        } = req.params;


        const offers =
            await fetchLoanOffersByStatus(
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offers by status fetched successfully.",

            data: offers

        });

    }

    catch (error) {

        console.error(
            "Get offers by status error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch loan offers by status."

        });

    }

}


// ==========================================================
// Create Loan Offer
// ==========================================================

export async function createLoanOfferController(
    req,
    res
) {

    try {

        const offerData =
            req.body;


        const createdOffer =
            await createNewLoanOffer(
                offerData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan offer created successfully.",

            data: {

                id:
                    createdOffer

            }

        });

    }

    catch (error) {

        console.error(
            "Create loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to create loan offer."

        });

    }

}


// ==========================================================
// Update Loan Offer
// ==========================================================

export async function updateLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await updateExistingLoanOffer(
                id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Update loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update loan offer."

        });

    }

}


// ==========================================================
// Change Loan Offer Status
// ==========================================================

export async function changeLoanOfferStatusController(
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


        const result =
            await changeLoanOfferStatus(
                id,
                status,
                rejection_reason ?? null
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer status updated successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Change loan offer status error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to update loan offer status."

        });

    }

}


// ==========================================================
// Accept Loan Offer
// ==========================================================

export async function acceptLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await acceptLoanOffer(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer accepted successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Accept loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to accept loan offer."

        });

    }

}


// ==========================================================
// Reject Loan Offer
// ==========================================================

export async function rejectLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            rejection_reason
        } = req.body;


        const result =
            await rejectLoanOffer(
                id,
                rejection_reason
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer rejected successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Reject loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to reject loan offer."

        });

    }

}


// ==========================================================
// Withdraw Loan Offer
// ==========================================================

export async function withdrawLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const {
            reason
        } = req.body;


        const result =
            await withdrawLoanOffer(
                id,
                reason ?? null
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer withdrawn successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Withdraw loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to withdraw loan offer."

        });

    }

}


// ==========================================================
// Expire Loan Offer
// ==========================================================

export async function expireLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await expireLoanOffer(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer expired successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Expire loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to expire loan offer."

        });

    }

}


// ==========================================================
// Delete Loan Offer
// ==========================================================

export async function deleteLoanOfferController(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanOffer(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan offer deleted successfully.",

            data: result

        });

    }

    catch (error) {

        console.error(
            "Delete loan offer error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to delete loan offer."

        });

    }

}
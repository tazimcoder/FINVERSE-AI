/**
 * ==========================================================
 * FINVERSE AI
 * Loan Offer API
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/api/loanOfferApi.js
 *
 * Responsibility:
 *
 * - Communicate with Loan Offer backend APIs
 *
 * ==========================================================
 */

import api from "../../../services/api";

import {
    LOAN_API_PATHS
} from "../constants/loanConstants";


// ==========================================================
// Get All Loan Offers
// ==========================================================

export async function getLoanOffers() {

    const response =
        await api.get(
            LOAN_API_PATHS.OFFERS
        );

    return response.data;

}


// ==========================================================
// Get Loan Offer By ID
// ==========================================================

export async function getLoanOfferById(
    offerId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.OFFERS}/${offerId}`
        );

    return response.data;

}


// ==========================================================
// Get Offers By Loan Application
// ==========================================================

export async function getLoanOffersByApplicationId(
    applicationId
) {

    const response =
        await api.get(
            `${LOAN_API_PATHS.OFFERS}/application/${applicationId}`
        );

    return response.data;

}


// ==========================================================
// Create Loan Offer
// ==========================================================

export async function createLoanOffer(
    offerData
) {

    const response =
        await api.post(
            LOAN_API_PATHS.OFFERS,
            offerData
        );

    return response.data;

}


// ==========================================================
// Update Loan Offer
// ==========================================================

export async function updateLoanOffer(
    offerId,
    offerData
) {

    const response =
        await api.put(
            `${LOAN_API_PATHS.OFFERS}/${offerId}`,
            offerData
        );

    return response.data;

}


// ==========================================================
// Delete Loan Offer
// ==========================================================

export async function deleteLoanOffer(
    offerId
) {

    const response =
        await api.delete(
            `${LOAN_API_PATHS.OFFERS}/${offerId}`
        );

    return response.data;

}


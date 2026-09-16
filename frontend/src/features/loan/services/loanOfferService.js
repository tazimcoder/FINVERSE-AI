/**
 * ==========================================================
 * FINVERSE
 * Loan Offer Service
 * ==========================================================
 */

import {
    getLoanOffers,
    getLoanOfferById,
    getLoanOffersByApplicationId,
    createLoanOffer,
    updateLoanOffer,
    deleteLoanOffer
} from "../api/loanOfferApi";

export async function fetchLoanOffers() {
    try {
        const response = await getLoanOffers();
        return response?.data ?? response ?? [];
    } catch {
        return [];
    }
}

export async function fetchLoanOfferById(offerId) {
    if (!offerId) throw new Error("Loan offer ID is required.");
    const response = await getLoanOfferById(offerId);
    return response?.data ?? response;
}

export async function fetchLoanOffersByApplicationId(applicationId) {
    if (!applicationId) throw new Error("Loan application ID is required.");
    const response = await getLoanOffersByApplicationId(applicationId);
    return response?.data ?? response;
}

export async function fetchLoanOffersByUserId(userId) {
    const all = await fetchLoanOffers();
    if (!Array.isArray(all)) return [];
    return all.filter(o => String(o.user_id) === String(userId));
}

export async function fetchLoanOffersByStatus(status) {
    const all = await fetchLoanOffers();
    if (!Array.isArray(all)) return [];
    return all.filter(o => String(o.status).toUpperCase() === String(status).toUpperCase());
}

export async function addLoanOffer(offerData) {
    if (!offerData || typeof offerData !== "object") {
        throw new Error("Loan offer data is required.");
    }
    const response = await createLoanOffer(offerData);
    return response?.data ?? response;
}

export async function editLoanOffer(offerId, offerData) {
    if (!offerId) throw new Error("Loan offer ID is required.");
    if (!offerData || typeof offerData !== "object") {
        throw new Error("Loan offer data is required.");
    }
    const response = await updateLoanOffer(offerId, offerData);
    return response?.data ?? response;
}

export async function changeLoanOfferStatus(offerId, status) {
    return await editLoanOffer(offerId, { status });
}

export async function removeLoanOffer(offerId) {
    if (!offerId) throw new Error("Loan offer ID is required.");
    const response = await deleteLoanOffer(offerId);
    return response?.data ?? response;
}

// Aliases for Hook Imports
export {
    fetchLoanOffers as fetchAllLoanOffers,
    addLoanOffer as createNewLoanOffer,
    editLoanOffer as updateExistingLoanOffer
};

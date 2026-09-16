/**
 * ==========================================================
 * FINVERSE AI
 * User Features Service
 * ==========================================================
 */

import {
    getKycByUserId,
    getCibilByUserId,
    getEmisByUserId,
    payEmiById,
    saveDocumentOcr,
    getDocumentsByUserId,
    getNotificationsByUserId,
    markNotificationRead,
    markAllNotificationsRead,
    getVaultsByUserId,
    createVaultForUser,
    getRewardsByUserId,
    getVirtualCardsByUserId,
    processForeclosureInDb,
    requestLoanTopUpInDb
} from "../models/userFeatures.model.js";

/**
 * Fetch KYC status for current user
 */
export async function fetchUserKyc(userId) {
    return await getKycByUserId(userId);
}

/**
 * Fetch CIBIL Credit Score for current user
 */
export async function fetchUserCibil(userId) {
    return await getCibilByUserId(userId);
}

/**
 * Fetch EMI Repayment schedules for current user
 */
export async function fetchUserEmis(userId) {
    return await getEmisByUserId(userId);
}

/**
 * Pay EMI by ID
 */
export async function processEmiPayment(userId, emiId, transactionRef) {
    const ref = transactionRef || `TXN_EMI_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const success = await payEmiById(emiId, userId, ref);
    if (!success) {
        throw new Error("EMI payment failed or EMI record not found.");
    }
    return { success: true, transactionRef: ref };
}

/**
 * Save OCR Processed Document
 */
export async function processDocumentUpload(userId, docType, docName, ocrData) {
    const docId = await saveDocumentOcr(userId, docType, docName, ocrData);
    return { id: docId, docType, docName, ocrData, status: "VERIFIED" };
}

/**
 * Get User Uploaded Documents
 */
export async function fetchUserDocuments(userId) {
    return await getDocumentsByUserId(userId);
}

/**
 * Fetch Notifications for Logged-In User
 */
export async function fetchUserNotifications(userId) {
    const notifications = await getNotificationsByUserId(userId);
    const unreadCount = notifications.filter(n => !n.is_read).length;
    return { notifications, unreadCount };
}

/**
 * Mark Single or All Notifications Read
 */
export async function markNotificationsAsReadService(userId, notificationId) {
    if (notificationId) {
        await markNotificationRead(userId, notificationId);
    } else {
        await markAllNotificationsRead(userId);
    }
    return { success: true };
}

/**
 * Savings Vaults Service
 */
export async function fetchUserVaults(userId) {
    return await getVaultsByUserId(userId);
}

export async function createNewVault(userId, vaultName, targetAmount, category) {
    const vaultId = await createVaultForUser(userId, vaultName, targetAmount, category);
    return { id: vaultId, vaultName, targetAmount, category, currentBalance: 0 };
}

/**
 * Rewards Service
 */
export async function fetchUserRewards(userId) {
    return await getRewardsByUserId(userId);
}

/**
 * Virtual Cards Service
 */
export async function fetchUserVirtualCards(userId) {
    return await getVirtualCardsByUserId(userId);
}

/**
 * Foreclosure Service
 */
export async function executeLoanForeclosure(userId, loanId, amount, type) {
    return await processForeclosureInDb(userId, loanId, amount, type);
}

/**
 * Top-Up Loan Request Service
 */
export async function executeLoanTopUp(userId, topUpAmount, tenureMonths) {
    return await requestLoanTopUpInDb(userId, topUpAmount, tenureMonths);
}

/**
 * FinverseMap Property Valuation Service
 */
export async function estimatePropertyValuation(userId, payload) {
    const { propertyType, locationName, areaSqft, ratePerSqft } = payload;
    const baseRate = ratePerSqft || 5500;
    const circleRate = Math.round(areaSqft * (baseRate * 0.7));
    const marketValue = Math.round(areaSqft * baseRate);
    const distressValue = Math.round(marketValue * 0.75);
    const maxLoanLtv = Math.round(marketValue * 0.80);

    const recordId = await savePropertyValuationInDb(userId, {
        propertyType,
        locationName,
        areaSqft,
        circleRate,
        marketValue,
        distressValue,
        maxLoanLtv
    });

    return {
        id: recordId,
        propertyType,
        locationName,
        areaSqft,
        circleRate,
        marketValue,
        distressValue,
        maxLoanLtv
    };
}

export async function fetchUserPropertyValuations(userId) {
    return await getPropertyValuationsByUserId(userId);
}



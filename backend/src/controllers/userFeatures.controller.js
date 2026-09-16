/**
 * ==========================================================
 * FINVERSE AI
 * User Features Controller
 * ==========================================================
 */

import {
    fetchUserKyc,
    fetchUserCibil,
    fetchUserEmis,
    processEmiPayment,
    processDocumentUpload,
    fetchUserDocuments,
    fetchUserNotifications,
    markNotificationsAsReadService,
    fetchUserVaults,
    createNewVault,
    fetchUserRewards,
    fetchUserVirtualCards,
    executeLoanForeclosure,
    executeLoanTopUp
} from "../services/userFeatures.service.js";

export async function getUserKycController(req, res) {
    try {
        const userId = req.user.id;
        const kyc = await fetchUserKyc(userId);
        return res.status(200).json({ success: true, data: kyc });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserCibilController(req, res) {
    try {
        const userId = req.user.id;
        const cibil = await fetchUserCibil(userId);
        return res.status(200).json({ success: true, data: cibil });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserEmisController(req, res) {
    try {
        const userId = req.user.id;
        const emis = await fetchUserEmis(userId);
        return res.status(200).json({ success: true, data: emis });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function payEmiController(req, res) {
    try {
        const userId = req.user.id;
        const { emiId, transactionRef } = req.body;
        if (!emiId) {
            return res.status(400).json({ success: false, message: "EMI ID is required." });
        }
        const result = await processEmiPayment(userId, emiId, transactionRef);
        return res.status(200).json({ success: true, message: "EMI Payment Successful", data: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function uploadDocumentController(req, res) {
    try {
        const userId = req.user.id;
        const { docType, docName, ocrData } = req.body;
        if (!docType || !docName) {
            return res.status(400).json({ success: false, message: "Document type and name are required." });
        }
        const doc = await processDocumentUpload(userId, docType, docName, ocrData || {});
        return res.status(201).json({ success: true, message: "Document processed and stored via AI OCR", data: doc });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserDocumentsController(req, res) {
    try {
        const userId = req.user.id;
        const docs = await fetchUserDocuments(userId);
        return res.status(200).json({ success: true, data: docs });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserNotificationsController(req, res) {
    try {
        const userId = req.user.id;
        const result = await fetchUserNotifications(userId);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function markNotificationsReadController(req, res) {
    try {
        const userId = req.user.id;
        const { notificationId } = req.body;
        await markNotificationsAsReadService(userId, notificationId);
        return res.status(200).json({ success: true, message: "Notifications marked as read." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserVaultsController(req, res) {
    try {
        const userId = req.user.id;
        const vaults = await fetchUserVaults(userId);
        return res.status(200).json({ success: true, data: vaults });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function createVaultController(req, res) {
    try {
        const userId = req.user.id;
        const { vaultName, targetAmount, category } = req.body;
        if (!vaultName || !targetAmount) {
            return res.status(400).json({ success: false, message: "Vault name and target amount are required." });
        }
        const vault = await createNewVault(userId, vaultName, targetAmount, category);
        return res.status(201).json({ success: true, message: "Vault created successfully.", data: vault });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserRewardsController(req, res) {
    try {
        const userId = req.user.id;
        const rewards = await fetchUserRewards(userId);
        return res.status(200).json({ success: true, data: rewards });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserVirtualCardsController(req, res) {
    try {
        const userId = req.user.id;
        const cards = await fetchUserVirtualCards(userId);
        return res.status(200).json({ success: true, data: cards });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function loanForeclosureController(req, res) {
    try {
        const userId = req.user.id;
        const { loanId, amount, type } = req.body;
        if (!loanId || !amount) {
            return res.status(400).json({ success: false, message: "Loan ID and prepayment amount required." });
        }
        const result = await executeLoanForeclosure(userId, loanId, amount, type);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function loanTopUpController(req, res) {
    try {
        const userId = req.user.id;
        const { topUpAmount, tenureMonths } = req.body;
        if (!topUpAmount) {
            return res.status(400).json({ success: false, message: "Top up amount is required." });
        }
        const result = await executeLoanTopUp(userId, topUpAmount, tenureMonths || 24);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function estimatePropertyValuationController(req, res) {
    try {
        const userId = req.user.id;
        const { propertyType, locationName, areaSqft, ratePerSqft } = req.body;
        if (!locationName || !areaSqft) {
            return res.status(400).json({ success: false, message: "Location name and area size are required." });
        }
        const valuation = await estimatePropertyValuation(userId, { propertyType, locationName, areaSqft: Number(areaSqft), ratePerSqft: Number(ratePerSqft || 5500) });
        return res.status(200).json({ success: true, data: valuation });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getUserPropertyValuationsController(req, res) {
    try {
        const userId = req.user.id;
        const valuations = await fetchUserPropertyValuations(userId);
        return res.status(200).json({ success: true, data: valuations });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}



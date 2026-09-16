/**
 * ==========================================================
 * FINVERSE
 * Loan Agreement Controller
 * ==========================================================
 */

import * as agreementService from "../services/loanAgreementService.js";

export async function getAgreementByApplication(req, res) {
    try {
        const { applicationId } = req.params;
        const agreement = await agreementService.fetchAgreementByApplication(applicationId);
        return res.status(200).json({ success: true, data: agreement });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function acceptAgreement(req, res) {
    try {
        const { id } = req.params;
        const signedIp = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
        const updated = await agreementService.acceptAgreement(id, signedIp);
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * ==========================================================
 * FINVERSE
 * Loan Agreement Service
 * ==========================================================
 */

import * as agreementModel from "../models/loanAgreementModel.js";

export async function generateAgreementForApplication(applicationId) {
    const agreementNumber = `AGR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const docUrl = `/documents/agreements/${agreementNumber}.pdf`;

    return await agreementModel.createAgreementRecord({
        application_id: applicationId,
        agreement_number: agreementNumber,
        agreement_document_url: docUrl
    });
}

export async function fetchAgreementByApplication(applicationId) {
    let agreement = await agreementModel.getAgreementByApplicationId(applicationId);
    if (!agreement) {
        agreement = await generateAgreementForApplication(applicationId);
    }
    return agreement;
}

export async function acceptAgreement(id, signedIp) {
    return await agreementModel.acceptAgreementRecord(id, signedIp);
}

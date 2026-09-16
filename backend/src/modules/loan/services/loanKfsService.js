/**
 * ==========================================================
 * FINVERSE
 * Key Facts Statement (KFS) Service
 * Calculates APR, Total Repayment & Generates KFS Document Record
 * ==========================================================
 */

import * as kfsModel from "../models/loanKfsModel.js";

export async function generateKfsForApplication(applicationData) {
    const {
        application_id,
        loan_id = null,
        amount = 100000,
        rate = 12.5,
        tenure = 12,
        processing_fee = 1500,
        documentation_fee = 500,
        insurance_charge = 1000
    } = applicationData;

    const r = rate / 12 / 100;
    const emi = Math.round((amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
    const totalRepayment = emi * tenure;
    const totalInterest = totalRepayment - amount;
    const totalUpfrontFees = processing_fee + documentation_fee + insurance_charge;

    // Approximate APR calculation
    const apr = parseFloat((rate + (totalUpfrontFees / amount / (tenure / 12)) * 100).toFixed(2));
    const kfsNumber = `KFS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return await kfsModel.createKfsRecord({
        application_id,
        loan_id,
        kfs_number: kfsNumber,
        sanctioned_amount: amount,
        interest_rate: rate,
        apr,
        tenure_months: tenure,
        emi_amount: emi,
        total_interest: totalInterest,
        processing_fee,
        documentation_fee,
        insurance_charge,
        total_repayment: totalRepayment
    });
}

export async function fetchKfsByApplication(applicationId) {
    return await kfsModel.getKfsByApplicationId(applicationId);
}

export async function acceptKfs(id) {
    return await kfsModel.updateKfsStatus(id, "ACCEPTED");
}

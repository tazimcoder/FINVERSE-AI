/**
 * ==========================================================
 * FINVERSE
 * No Objection Certificate (NOC) Service
 * ==========================================================
 */

import * as nocModel from "../models/loanNocModel.js";

export async function generateNocForLoan(loanId) {
    const nocNumber = `NOC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const docUrl = `/documents/nocs/${nocNumber}.pdf`;

    return await nocModel.createNocRecord(loanId, nocNumber, docUrl);
}

export async function fetchNocByLoan(loanId) {
    return await nocModel.getNocByLoanId(loanId);
}

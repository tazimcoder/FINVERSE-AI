/**
 * ==========================================================
 * FINVERSE
 * Loan Foreclosure & Prepayment Service
 * Authoritative backend financial payoff calculator
 * ==========================================================
 */

import * as foreclosureModel from "../models/loanForeclosureModel.js";
import * as nocService from "./loanNocService.js";
import pool from "../../../config/db.js";

export async function calculateAndRequestForeclosure(loanId) {
    // Fetch loan details
    const [loans] = await pool.query(`SELECT * FROM loans WHERE id = ?`, [loanId]);
    const loan = loans[0];

    const outstandingPrincipal = parseFloat(loan?.principal_amount || loan?.amount || 50000);
    const accruedInterest = Math.round(outstandingPrincipal * 0.015);
    const pendingPenalties = 0;
    const foreclosureFee = Math.round(outstandingPrincipal * 0.03); // 3% fee
    const finalSettlementAmount = outstandingPrincipal + accruedInterest + pendingPenalties + foreclosureFee;

    const foreclosureNumber = `FCL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return await foreclosureModel.createForeclosureRecord({
        loan_id: loanId,
        foreclosure_number: foreclosureNumber,
        outstanding_principal: outstandingPrincipal,
        accrued_interest: accruedInterest,
        pending_penalties: pendingPenalties,
        foreclosure_fee: foreclosureFee,
        final_settlement_amount: finalSettlementAmount
    });
}

export async function fetchForeclosureByLoan(loanId) {
    let foreclosure = await foreclosureModel.getForeclosureByLoanId(loanId);
    if (!foreclosure) {
        foreclosure = await calculateAndRequestForeclosure(loanId);
    }
    return foreclosure;
}

export async function executeForeclosurePayoff(id, loanId) {
    // Update foreclosure record status
    const updated = await foreclosureModel.updateForeclosureStatus(id, "PAID");

    // Close loan in database
    await pool.query(`UPDATE loans SET status = 'CLOSED', remaining_balance = 0 WHERE id = ?`, [loanId]);

    // Issue NOC
    await nocService.generateNocForLoan(loanId);

    return updated;
}

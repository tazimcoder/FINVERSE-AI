/**
 * ==========================================================
 * FINVERSE
 * Loan Foreclosure Controller
 * ==========================================================
 */

import * as foreclosureService from "../services/loanForeclosureService.js";

export async function getForeclosureByLoan(req, res) {
    try {
        const { loanId } = req.params;
        const foreclosure = await foreclosureService.fetchForeclosureByLoan(loanId);
        return res.status(200).json({ success: true, data: foreclosure });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function processPayoff(req, res) {
    try {
        const { id } = req.params;
        const { loanId } = req.body;
        const updated = await foreclosureService.executeForeclosurePayoff(id, loanId);
        return res.status(200).json({ success: true, data: updated, message: "Loan foreclosed & NOC issued!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * ==========================================================
 * FINVERSE
 * Loan NOC Controller
 * ==========================================================
 */

import * as nocService from "../services/loanNocService.js";

export async function getNocByLoan(req, res) {
    try {
        const { loanId } = req.params;
        let noc = await nocService.fetchNocByLoan(loanId);
        if (!noc) {
            noc = await nocService.generateNocForLoan(loanId);
        }
        return res.status(200).json({ success: true, data: noc });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * ==========================================================
 * FINVERSE
 * Loan Eligibility Controller & Authoritative Engine
 * Handles HTTP requests and evaluates real-world loan eligibility
 * ==========================================================
 */

import {
    fetchAllLoanEligibilityChecks,
    fetchLoanEligibilityCheckById,
    fetchLoanEligibilityChecksByApplicationId,
    fetchLoanEligibilityChecksByStatus,
    createNewLoanEligibilityCheck,
    updateExistingLoanEligibilityCheck,
    changeLoanEligibilityStatus,
    removeLoanEligibilityCheck
} from "../services/loanEligibilityService.js";

// ==========================================================
// Evaluate Instant Loan Eligibility (Authoritative Engine)
// ==========================================================

export async function evaluateLoanEligibility(req, res) {
    try {
        const {
            monthly_income = 75000,
            existing_emi = 10000,
            requested_amount = 500000,
            tenure_months = 36,
            credit_score = 750,
            interest_rate = 11.5
        } = req.body;

        const income = parseFloat(monthly_income) || 75000;
        const currentEmi = parseFloat(existing_emi) || 0;
        const requested = parseFloat(requested_amount) || 500000;
        const tenure = parseInt(tenure_months) || 36;
        const score = parseInt(credit_score) || 750;
        const rate = parseFloat(interest_rate) || 11.5;

        // Financial Calculation Rules
        const r = rate / 12 / 100;
        const proposedEmi = Math.round((requested * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
        const totalEmiObligation = currentEmi + proposedEmi;

        // FOIR Calculation (Max 55% FOIR threshold)
        const foirPercent = parseFloat(((totalEmiObligation / income) * 100).toFixed(2));
        const maxAllowedEmi = Math.round(income * 0.50 - currentEmi);
        const maxEligibleAmount = maxAllowedEmi > 0 
            ? Math.round((maxAllowedEmi * (Math.pow(1 + r, tenure) - 1)) / (r * Math.pow(1 + r, tenure)))
            : 0;

        // Eligibility Checks Breakdown
        const checks = [
            {
                name: "Minimum Monthly Income (₹25,000+)",
                passed: income >= 25000,
                value: `₹${income.toLocaleString("en-IN")}`
            },
            {
                name: "Credit Bureau Score (650+ Threshold)",
                passed: score >= 650,
                value: `${score} (${score >= 750 ? "EXCELLENT" : score >= 700 ? "GOOD" : "AVERAGE"})`
            },
            {
                name: "FOIR Obligation Ratio (Max 50%)",
                passed: foirPercent <= 50,
                value: `${foirPercent}%`
            },
            {
                name: "Net Disposable Income Post-EMI",
                passed: income - totalEmiObligation >= 15000,
                value: `₹${(income - totalEmiObligation).toLocaleString("en-IN")}`
            },
            {
                name: "Repayment Capacity Assessment",
                passed: maxEligibleAmount >= requested,
                value: `Cap: ₹${maxEligibleAmount.toLocaleString("en-IN")}`
            }
        ];

        const passedCount = checks.filter(c => c.passed).length;
        const eligibilityScore = Math.min(100, Math.round((passedCount / 5) * 70 + (score / 850) * 30));
        const isEligible = passedCount >= 4 && score >= 650;

        return res.status(200).json({
            success: true,
            data: {
                is_eligible: isEligible,
                eligibility_score: eligibilityScore,
                requested_amount: requested,
                max_eligible_amount: Math.max(0, maxEligibleAmount),
                proposed_emi: proposedEmi,
                max_allowed_emi: Math.max(0, maxAllowedEmi),
                foir_percent: foirPercent,
                credit_score: score,
                checks
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function getAllLoanEligibilityChecks(req, res) {
    try {
        const checks = await fetchAllLoanEligibilityChecks();
        return res.status(200).json({ success: true, data: checks });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function getLoanEligibilityCheckById(req, res) {
    try {
        const { id } = req.params;
        const check = await fetchLoanEligibilityCheckById(id);
        return res.status(200).json({ success: true, data: check });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function getLoanEligibilityChecksByApplication(req, res) {
    try {
        const { applicationId } = req.params;
        const checks = await fetchLoanEligibilityChecksByApplicationId(applicationId);
        return res.status(200).json({ success: true, data: checks });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function getLoanEligibilityChecksByStatus(req, res) {
    try {
        const { status } = req.params;
        const checks = await fetchLoanEligibilityChecksByStatus(status);
        return res.status(200).json({ success: true, data: checks });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function createLoanEligibilityCheck(req, res) {
    try {
        const result = await createNewLoanEligibilityCheck(req.body);
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function updateLoanEligibilityCheck(req, res) {
    try {
        const { id } = req.params;
        const result = await updateExistingLoanEligibilityCheck(id, req.body);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function updateLoanEligibilityStatus(req, res) {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;
        const result = await changeLoanEligibilityStatus(id, status, reason ?? null);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteLoanEligibilityCheck(req, res) {
    try {
        const { id } = req.params;
        const result = await removeLoanEligibilityCheck(id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

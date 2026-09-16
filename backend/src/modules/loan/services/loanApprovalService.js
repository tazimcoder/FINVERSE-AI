/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanApprovalService.js
 *
 * Responsibility:
 *
 * - Validate approved loan application
 * - Verify loan product
 * - Prevent duplicate loan creation
 * - Generate unique loan number
 * - Calculate EMI
 * - Calculate maturity date
 * - Create actual loan record
 *
 * IMPORTANT:
 *
 * FINVERSE AI currently does NOT use a separate
 * loan_approvals table.
 *
 * Approval is determined from:
 *
 * loan_applications.status = 'APPROVED'
 *
 * Flow:
 *
 * LOAN APPLICATION
 *        ↓
 * APPROVED
 *        ↓
 * LOAN PRODUCT
 *        ↓
 * VALIDATION
 *        ↓
 * EMI CALCULATION
 *        ↓
 * LOAN CREATION
 *
 * ==========================================================
 */

import {
    getLoanApplicationById
} from "../models/loanApplicationModel.js";

import {
    getLoanProductById
} from "../models/loanProductModel.js";

import {
    getLoanByApplicationId,
    getLoanByNumber,
    createLoan
} from "../models/loanModel.js";


// ==========================================================
// Generate Unique Loan Number
// ==========================================================

async function generateLoanNumber() {

    let loanNumber;

    let existingLoan;

    do {

        const timestamp =
            Date.now()
                .toString()
                .slice(-8);

        const randomNumber =
            Math.floor(
                1000 + Math.random() * 9000
            );

        loanNumber =
            `FINL-${timestamp}-${randomNumber}`;

        existingLoan =
            await getLoanByNumber(
                loanNumber
            );

    } while (existingLoan);

    return loanNumber;
}


// ==========================================================
// Calculate EMI
// ==========================================================

function calculateEMI(
    principal,
    annualInterestRate,
    tenureMonths
) {

    const P =
        Number(principal);

    const annualRate =
        Number(annualInterestRate);

    const N =
        Number(tenureMonths);


    // ------------------------------------------------------
    // Principal Validation
    // ------------------------------------------------------

    if (
        !Number.isFinite(P) ||
        P <= 0
    ) {

        throw new Error(
            "Principal amount must be greater than zero."
        );

    }


    // ------------------------------------------------------
    // Interest Validation
    // ------------------------------------------------------

    if (
        !Number.isFinite(annualRate) ||
        annualRate < 0
    ) {

        throw new Error(
            "Interest rate must be zero or greater."
        );

    }


    // ------------------------------------------------------
    // Tenure Validation
    // ------------------------------------------------------

    if (
        !Number.isInteger(N) ||
        N <= 0
    ) {

        throw new Error(
            "Loan tenure must be greater than zero."
        );

    }


    // ------------------------------------------------------
    // Zero Interest Loan
    // ------------------------------------------------------

    if (
        annualRate === 0
    ) {

        return Number(
            (P / N).toFixed(2)
        );

    }


    // ------------------------------------------------------
    // Monthly Interest Rate
    // ------------------------------------------------------

    const monthlyRate =
        annualRate /
        12 /
        100;


    // ------------------------------------------------------
    // EMI Formula
    // ------------------------------------------------------

    const power =
        Math.pow(
            1 + monthlyRate,
            N
        );


    const EMI =
        P *
        monthlyRate *
        power /
        (power - 1);


    return Number(
        EMI.toFixed(2)
    );
}


// ==========================================================
// Calculate Maturity Date
// ==========================================================

function calculateMaturityDate(
    startDate,
    tenureMonths
) {

    const date =
        new Date(startDate);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            "Invalid loan start date."
        );

    }


    const months =
        Number(tenureMonths);


    if (
        !Number.isInteger(months) ||
        months <= 0
    ) {

        throw new Error(
            "Invalid loan tenure."
        );

    }


    date.setMonth(
        date.getMonth() + months
    );


    return date
        .toISOString()
        .split("T")[0];
}


// ==========================================================
// Create Loan From Approved Application
// ==========================================================
//
// IMPORTANT:
// This function MUST remain a named export because:
//
// loanApprovalController.js
//
// imports:
//
// import {
//     createLoanFromApprovedApplication
// } from "../services/loanApprovalService.js";
//
// ==========================================================

export async function createLoanFromApprovedApplication(
    applicationId
) {

    // ======================================================
    // Validate Application ID
    // ======================================================

    if (
        applicationId === undefined ||
        applicationId === null ||
        applicationId === ""
    ) {

        throw new Error(
            "Loan application ID is required."
        );

    }


    // ======================================================
    // Fetch Application
    // ======================================================

    const application =
        await getLoanApplicationById(
            applicationId
        );


    if (!application) {

        throw new Error(
            "Loan application not found."
        );

    }


    // ======================================================
    // Application Must Be Approved
    // ======================================================

    if (
        application.status !==
        "APPROVED"
    ) {

        throw new Error(
            "Only approved loan applications can be converted into loans."
        );

    }


    // ======================================================
    // Prevent Duplicate Loan
    // ======================================================

    const existingLoan =
        await getLoanByApplicationId(
            applicationId
        );


    if (existingLoan) {

        throw new Error(
            "A loan has already been created for this application."
        );

    }


    // ======================================================
    // Validate Loan Product
    // ======================================================

    if (
        !application.loan_product_id
    ) {

        throw new Error(
            "Loan product is missing from the loan application."
        );

    }


    const loanProduct =
        await getLoanProductById(
            application.loan_product_id
        );


    if (!loanProduct) {

        throw new Error(
            "Loan product associated with this application was not found."
        );

    }


    // ======================================================
    // Product Must Be Active
    // ======================================================

    if (
        loanProduct.status !==
        "ACTIVE"
    ) {

        throw new Error(
            "The selected loan product is not active."
        );

    }


    // ======================================================
    // Validate Requested Amount
    // ======================================================

    const principalAmount =
        Number(
            application.requested_amount
        );


    if (
        !Number.isFinite(
            principalAmount
        ) ||
        principalAmount <= 0
    ) {

        throw new Error(
            "Invalid requested loan amount."
        );

    }


    // ======================================================
    // Validate Product Amount Range
    // ======================================================

    if (
        loanProduct.min_amount !== null &&
        principalAmount <
        Number(
            loanProduct.min_amount
        )
    ) {

        throw new Error(
            "Requested loan amount is below the minimum allowed amount."
        );

    }


    if (
        loanProduct.max_amount !== null &&
        principalAmount >
        Number(
            loanProduct.max_amount
        )
    ) {

        throw new Error(
            "Requested loan amount exceeds the maximum allowed amount."
        );

    }


    // ======================================================
    // Validate Requested Tenure
    // ======================================================

    const tenureMonths =
        Number(
            application.requested_tenure_months
        );


    if (
        !Number.isInteger(
            tenureMonths
        ) ||
        tenureMonths <= 0
    ) {

        throw new Error(
            "Invalid requested loan tenure."
        );

    }


    // ======================================================
    // Validate Product Tenure Range
    // ======================================================

    if (
        loanProduct.min_tenure_months !== null &&
        tenureMonths <
        Number(
            loanProduct.min_tenure_months
        )
    ) {

        throw new Error(
            "Requested loan tenure is below the minimum allowed tenure."
        );

    }


    if (
        loanProduct.max_tenure_months !== null &&
        tenureMonths >
        Number(
            loanProduct.max_tenure_months
        )
    ) {

        throw new Error(
            "Requested loan tenure exceeds the maximum allowed tenure."
        );

    }


    // ======================================================
    // Determine Interest Rate
    // ======================================================

    let interestRate;


    const minInterestRate =
        loanProduct.min_interest_rate !== null
            ? Number(
                loanProduct.min_interest_rate
            )
            : null;


    const maxInterestRate =
        loanProduct.max_interest_rate !== null
            ? Number(
                loanProduct.max_interest_rate
            )
            : null;


    if (
        minInterestRate !== null &&
        maxInterestRate !== null
    ) {

        interestRate =
            (
                minInterestRate +
                maxInterestRate
            ) / 2;

    }

    else if (
        minInterestRate !== null
    ) {

        interestRate =
            minInterestRate;

    }

    else if (
        maxInterestRate !== null
    ) {

        interestRate =
            maxInterestRate;

    }

    else {

        throw new Error(
            "Loan product does not have a valid interest rate."
        );

    }


    // ------------------------------------------------------
    // Validate Interest Rate
    // ------------------------------------------------------

    if (
        !Number.isFinite(
            interestRate
        ) ||
        interestRate < 0
    ) {

        throw new Error(
            "Loan product has an invalid interest rate."
        );

    }


    interestRate =
        Number(
            interestRate.toFixed(2)
        );


    // ======================================================
    // Calculate EMI
    // ======================================================

    const emiAmount =
        calculateEMI(
            principalAmount,
            interestRate,
            tenureMonths
        );


    // ======================================================
    // Loan Start Date
    // ======================================================

    const startDate =
        new Date();


    const formattedStartDate =
        startDate
            .toISOString()
            .split("T")[0];


    // ======================================================
    // Loan Maturity Date
    // ======================================================

    const maturityDate =
        calculateMaturityDate(
            startDate,
            tenureMonths
        );


    // ======================================================
    // Generate Unique Loan Number
    // ======================================================

    const loanNumber =
        await generateLoanNumber();


    // ======================================================
    // Prepare Loan Data
    // ======================================================

    const loanData = {

        loan_number:
            loanNumber,

        user_id:
            application.user_id,

        loan_application_id:
            application.id,

        loan_product_id:
            application.loan_product_id,

        principal_amount:
            principalAmount,

        interest_rate:
            interestRate,

        tenure_months:
            tenureMonths,

        emi_amount:
            emiAmount,

        outstanding_principal:
            principalAmount,

        outstanding_interest:
            0,

        start_date:
            formattedStartDate,

        maturity_date:
            maturityDate,

        status:
            "ACTIVE"

    };


    // ======================================================
    // Create Actual Loan
    // ======================================================

    const loanId =
        await createLoan(
            loanData
        );


    // ======================================================
    // Return Created Loan
    // ======================================================

    return {

        id:
            loanId,

        ...loanData

    };

}


// ==========================================================
// Optional Default Export
// ==========================================================
//
// Named export ऊपर मौजूद है.
// Default export रखने से future imports में भी flexibility
// रहेगी.
//
// ==========================================================

export default {

    createLoanFromApprovedApplication

};


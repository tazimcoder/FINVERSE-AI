/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanApprovalController.js
 *
 * Responsibility:
 *
 * - Convert an APPROVED loan application into an actual loan
 * - Validate application ID
 * - Call loan approval service
 * - Return consistent API response
 *
 * IMPORTANT:
 *
 * Approval is based on:
 *
 * loan_applications.status = 'APPROVED'
 *
 * No separate loan_approvals table is required.
 *
 * ==========================================================
 */

import {
    createLoanFromApprovedApplication
} from "../services/loanApprovalService.js";


// ==========================================================
// Approve Loan Application
// ==========================================================
//
// This function name MUST remain:
//
// approveLoanApplication
//
// because loanApprovalRoutes.js imports this exact name.
//
// ==========================================================

export async function approveLoanApplication(
    req,
    res
) {

    try {

        // ==================================================
        // Get Application ID
        // ==================================================

        const {
            applicationId
        } = req.params;


        // ==================================================
        // Validate Application ID
        // ==================================================

        if (
            applicationId === undefined ||
            applicationId === null ||
            applicationId === ""
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Loan application ID is required."

            });

        }


        // ==================================================
        // Create Actual Loan
        // ==================================================

        const loan =
            await createLoanFromApprovedApplication(
                applicationId
            );


        // ==================================================
        // Success Response
        // ==================================================

        return res.status(201).json({

            success: true,

            message:
                "Loan created successfully from approved application.",

            data: loan

        });

    }

    catch (error) {

        console.error(
            "Approve Loan Application Error:",
            error
        );


        // ==================================================
        // Business / Validation Error
        // ==================================================

        return res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to create loan from approved application."

        });

    }

}


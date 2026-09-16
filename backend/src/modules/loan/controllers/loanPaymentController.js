/**
 * ==========================================================
 * FINVERSE AI
 * Loan Payment Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanPaymentController.js
 *
 * Responsibility:
 *
 * - Handle loan payment HTTP requests
 * - Validate request input through service layer
 * - Return standardized API responses
 * - Handle controller-level errors
 *
 * Database Table:
 * loan_payments
 *
 * ==========================================================
 */

import {
    fetchAllLoanPayments,
    fetchLoanPaymentById,
    fetchLoanPaymentsByLoanId,
    fetchLoanPaymentsByScheduleId,
    fetchLoanPaymentByReference,
    fetchLoanPaymentsByTransactionId,
    fetchLoanPaymentsByStatus,
    createNewLoanPayment,
    updateExistingLoanPayment,
    changeLoanPaymentStatus,
    removeLoanPayment
} from "../services/loanPaymentService.js";


// ==========================================================
// GET ALL LOAN PAYMENTS
// ==========================================================

export async function getAllLoanPaymentsController(
    req,
    res
) {

    try {

        const payments =
            await fetchAllLoanPayments();

        return res.status(200).json({

            success: true,

            message:
                "Loan payments fetched successfully.",

            data:
                payments

        });

    } catch (error) {

        console.error(
            "Get all loan payments error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan payments.",

            error:
                error.message

        });

    }

}


// ==========================================================
// GET LOAN PAYMENT BY ID
// ==========================================================

export async function getLoanPaymentByIdController(
    req,
    res
) {

    try {

        const payment =
            await fetchLoanPaymentById(
                req.params.id
            );


        if (!payment) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan payment not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan payment fetched successfully.",

            data:
                payment

        });

    } catch (error) {

        console.error(
            "Get loan payment by ID error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// GET PAYMENTS BY LOAN ID
// ==========================================================

export async function getLoanPaymentsByLoanIdController(
    req,
    res
) {

    try {

        const payments =
            await fetchLoanPaymentsByLoanId(
                req.params.loanId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan payments fetched successfully.",

            data:
                payments

        });

    } catch (error) {

        console.error(
            "Get loan payments by loan ID error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// GET PAYMENTS BY REPAYMENT SCHEDULE
// ==========================================================

export async function getLoanPaymentsByScheduleIdController(
    req,
    res
) {

    try {

        const payments =
            await fetchLoanPaymentsByScheduleId(
                req.params.scheduleId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan payments for repayment schedule fetched successfully.",

            data:
                payments

        });

    } catch (error) {

        console.error(
            "Get loan payments by schedule ID error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// GET PAYMENT BY REFERENCE
// ==========================================================

export async function getLoanPaymentByReferenceController(
    req,
    res
) {

    try {

        const payment =
            await fetchLoanPaymentByReference(
                req.params.reference
            );


        if (!payment) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan payment not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan payment fetched successfully.",

            data:
                payment

        });

    } catch (error) {

        console.error(
            "Get loan payment by reference error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// GET PAYMENTS BY TRANSACTION ID
// ==========================================================

export async function getLoanPaymentsByTransactionIdController(
    req,
    res
) {

    try {

        const payments =
            await fetchLoanPaymentsByTransactionId(
                req.params.transactionId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan payments for transaction fetched successfully.",

            data:
                payments

        });

    } catch (error) {

        console.error(
            "Get loan payments by transaction ID error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// GET PAYMENTS BY STATUS
// ==========================================================

export async function getLoanPaymentsByStatusController(
    req,
    res
) {

    try {

        const payments =
            await fetchLoanPaymentsByStatus(
                req.params.status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan payments by status fetched successfully.",

            data:
                payments

        });

    } catch (error) {

        console.error(
            "Get loan payments by status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// CREATE LOAN PAYMENT
// ==========================================================

export async function createLoanPaymentController(
    req,
    res
) {

    try {

        const paymentId =
            await createNewLoanPayment(
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan payment created successfully.",

            data: {

                id:
                    paymentId

            }

        });

    } catch (error) {

        console.error(
            "Create loan payment error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// UPDATE LOAN PAYMENT
// ==========================================================

export async function updateLoanPaymentController(
    req,
    res
) {

    try {

        const result =
            await updateExistingLoanPayment(
                req.params.id,
                req.body
            );


        if (
            result &&
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan payment not found or no changes were made."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan payment updated successfully."

        });

    } catch (error) {

        console.error(
            "Update loan payment error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// CHANGE PAYMENT STATUS
// ==========================================================

export async function changeLoanPaymentStatusController(
    req,
    res
) {

    try {

        const {
            status
        } = req.body;


        const result =
            await changeLoanPaymentStatus(
                req.params.id,
                status
            );


        if (
            result &&
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan payment not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan payment status updated successfully."

        });

    } catch (error) {

        console.error(
            "Change loan payment status error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// DELETE LOAN PAYMENT
// ==========================================================

export async function deleteLoanPaymentController(
    req,
    res
) {

    try {

        const result =
            await removeLoanPayment(
                req.params.id
            );


        if (
            result &&
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan payment not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan payment deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete loan payment error:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


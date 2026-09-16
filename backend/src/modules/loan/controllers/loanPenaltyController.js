/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanPenaltyController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for loan penalties
 * - Validate request input through service layer
 * - Return standardized API responses
 * - Fetch penalty records
 * - Create penalty
 * - Update penalty
 * - Change penalty status
 * - Waive penalty
 * - Mark penalty as paid
 * - Delete penalty
 *
 * ==========================================================
 */

import {
    fetchAllLoanPenalties,
    fetchLoanPenaltyById,
    fetchLoanPenaltiesByLoanId,
    fetchLoanPenaltiesByScheduleId,
    fetchLoanPenaltiesByUserId,
    fetchLoanPenaltiesByType,
    fetchLoanPenaltiesByStatus,
    createNewLoanPenalty,
    updateExistingLoanPenalty,
    changeLoanPenaltyStatus,
    waiveExistingLoanPenalty,
    markExistingLoanPenaltyAsPaid,
    removeLoanPenalty
} from "../services/loanPenaltyService.js";


// ==========================================================
// STANDARD ERROR HANDLER
// ==========================================================

function handleControllerError(
    res,
    error,
    defaultMessage = "Loan penalty operation failed."
) {

    console.error(
        "Loan Penalty Controller Error:",
        error
    );


    const message =
        error?.message ||
        defaultMessage;


    return res.status(400).json({

        success: false,

        message

    });

}


// ==========================================================
// GET ALL LOAN PENALTIES
// ==========================================================

export async function getAllPenalties(
    req,
    res
) {

    try {

        const penalties =
            await fetchAllLoanPenalties();


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch loan penalties."
        );

    }

}


// ==========================================================
// GET PENALTY BY ID
// ==========================================================

export async function getPenaltyById(
    req,
    res
) {

    try {

        const penalty =
            await fetchLoanPenaltyById(
                req.params.id
            );


        if (!penalty) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan penalty not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: penalty

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch loan penalty."
        );

    }

}


// ==========================================================
// GET PENALTIES BY LOAN
// ==========================================================

export async function getPenaltiesByLoanId(
    req,
    res
) {

    try {

        const penalties =
            await fetchLoanPenaltiesByLoanId(
                req.params.loanId
            );


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch loan penalties."
        );

    }

}


// ==========================================================
// GET PENALTIES BY REPAYMENT SCHEDULE
// ==========================================================

export async function getPenaltiesByScheduleId(
    req,
    res
) {

    try {

        const penalties =
            await fetchLoanPenaltiesByScheduleId(
                req.params.scheduleId
            );


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch schedule penalties."
        );

    }

}


// ==========================================================
// GET PENALTIES BY USER
// ==========================================================

export async function getPenaltiesByUserId(
    req,
    res
) {

    try {

        const penalties =
            await fetchLoanPenaltiesByUserId(
                req.params.userId
            );


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch user penalties."
        );

    }

}


// ==========================================================
// GET PENALTIES BY TYPE
// ==========================================================

export async function getPenaltiesByType(
    req,
    res
) {

    try {

        const penalties =
            await fetchLoanPenaltiesByType(
                req.params.type
            );


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch penalties by type."
        );

    }

}


// ==========================================================
// GET PENALTIES BY STATUS
// ==========================================================

export async function getPenaltiesByStatus(
    req,
    res
) {

    try {

        const penalties =
            await fetchLoanPenaltiesByStatus(
                req.params.status
            );


        return res.status(200).json({

            success: true,

            count: penalties.length,

            data: penalties

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to fetch penalties by status."
        );

    }

}


// ==========================================================
// CREATE LOAN PENALTY
// ==========================================================

export async function createPenalty(
    req,
    res
) {

    try {

        const penaltyId =
            await createNewLoanPenalty(
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan penalty created successfully.",

            data: {

                id: penaltyId

            }

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to create loan penalty."
        );

    }

}


// ==========================================================
// UPDATE LOAN PENALTY
// ==========================================================

export async function updatePenalty(
    req,
    res
) {

    try {

        const result =
            await updateExistingLoanPenalty(
                req.params.id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan penalty updated successfully.",

            data: result

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to update loan penalty."
        );

    }

}


// ==========================================================
// CHANGE PENALTY STATUS
// ==========================================================

export async function changePenaltyStatus(
    req,
    res
) {

    try {

        const {
            penalty_status
        } = req.body;


        const result =
            await changeLoanPenaltyStatus(
                req.params.id,
                penalty_status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan penalty status updated successfully.",

            data: result

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to update penalty status."
        );

    }

}


// ==========================================================
// WAIVE LOAN PENALTY
// ==========================================================

export async function waivePenalty(
    req,
    res
) {

    try {

        const result =
            await waiveExistingLoanPenalty(
                req.params.id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan penalty waived successfully.",

            data: result

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to waive loan penalty."
        );

    }

}


// ==========================================================
// MARK PENALTY AS PAID
// ==========================================================

export async function markPenaltyAsPaid(
    req,
    res
) {

    try {

        const result =
            await markExistingLoanPenaltyAsPaid(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan penalty marked as paid successfully.",

            data: result

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to mark loan penalty as paid."
        );

    }

}


// ==========================================================
// DELETE LOAN PENALTY
// ==========================================================

export async function deletePenalty(
    req,
    res
) {

    try {

        const result =
            await removeLoanPenalty(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan penalty deleted successfully.",

            data: result

        });

    } catch (error) {

        return handleControllerError(
            res,
            error,
            "Failed to delete loan penalty."
        );

    }

}
/**
 * ==========================================================
 * FINVERSE AI
 * Loan Status History Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanStatusHistoryValidator.js
 *
 * Responsibility:
 *
 * - Validate Loan Status History request payloads
 * - Validate required fields
 * - Validate numeric IDs
 * - Validate status values
 * - Prevent invalid status-history records
 *
 * Database Table:
 * loan_status_history
 *
 * ==========================================================
 */


// ==========================================================
// ALLOWED LOAN STATUS VALUES
// ==========================================================
//
// These values are compatible with the status lifecycle used
// by loan_applications and the FINVERSE AI loan workflow.
//
// ==========================================================

const ALLOWED_LOAN_STATUSES = [

    "DRAFT",

    "SUBMITTED",

    "UNDER_REVIEW",

    "ELIGIBILITY_CHECK",

    "DOCUMENT_VERIFICATION",

    "APPROVED",

    "REJECTED",

    "CANCELLED",

    "DISBURSED",

];


// ==========================================================
// COMMON ID VALIDATOR
// ==========================================================

const isValidId = (value) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return false;

    }


    const numericValue = Number(value);


    return (
        Number.isInteger(numericValue) &&
        numericValue > 0
    );

};


// ==========================================================
// STATUS VALIDATOR
// ==========================================================

const isValidStatus = (value) => {

    if (
        typeof value !== "string" ||
        !value.trim()
    ) {

        return false;

    }


    return ALLOWED_LOAN_STATUSES.includes(
        value.trim().toUpperCase()
    );

};


// ==========================================================
// CREATE STATUS HISTORY VALIDATOR
// ==========================================================

export const validateCreateLoanStatusHistory = (
    req,
    res,
    next
) => {

    try {

        const {

            loan_application_id,

            loan_id,

            old_status,

            new_status,

            changed_by_user_id,

            remarks,

        } = req.body;


        // --------------------------------------------------
        // NEW STATUS
        // --------------------------------------------------

        if (!new_status) {

            return res.status(400).json({

                success: false,

                message:
                    "new_status is required.",

            });

        }


        if (!isValidStatus(new_status)) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid new_status.",

                allowed_statuses:
                    ALLOWED_LOAN_STATUSES,

            });

        }


        // --------------------------------------------------
        // LOAN APPLICATION ID
        // --------------------------------------------------

        if (
            loan_application_id !== undefined &&
            loan_application_id !== null &&
            loan_application_id !== ""
        ) {

            if (!isValidId(loan_application_id)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "loan_application_id must be a valid positive integer.",

                });

            }

        }


        // --------------------------------------------------
        // LOAN ID
        // --------------------------------------------------

        if (
            loan_id !== undefined &&
            loan_id !== null &&
            loan_id !== ""
        ) {

            if (!isValidId(loan_id)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "loan_id must be a valid positive integer.",

                });

            }

        }


        // --------------------------------------------------
        // AT LEAST ONE REFERENCE
        // --------------------------------------------------

        if (
            !isValidId(loan_application_id) &&
            !isValidId(loan_id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Either loan_application_id or loan_id is required.",

            });

        }


        // --------------------------------------------------
        // OLD STATUS
        // --------------------------------------------------

        if (
            old_status !== undefined &&
            old_status !== null &&
            old_status !== ""
        ) {

            if (!isValidStatus(old_status)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid old_status.",

                    allowed_statuses:
                        ALLOWED_LOAN_STATUSES,

                });

            }

        }


        // --------------------------------------------------
        // STATUS TRANSITION CHECK
        // --------------------------------------------------

        if (
            old_status &&
            new_status &&
            String(old_status).trim().toUpperCase() ===
            String(new_status).trim().toUpperCase()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "old_status and new_status cannot be the same.",

            });

        }


        // --------------------------------------------------
        // CHANGED BY USER ID
        // --------------------------------------------------

        if (
            changed_by_user_id !== undefined &&
            changed_by_user_id !== null &&
            changed_by_user_id !== ""
        ) {

            if (!isValidId(changed_by_user_id)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "changed_by_user_id must be a valid positive integer.",

                });

            }

        }


        // --------------------------------------------------
        // REMARKS
        // --------------------------------------------------

        if (
            remarks !== undefined &&
            remarks !== null &&
            typeof remarks !== "string"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "remarks must be a string.",

            });

        }


        // --------------------------------------------------
        // NORMALIZE VALUES
        // --------------------------------------------------

        req.body.new_status =
            String(new_status)
                .trim()
                .toUpperCase();


        if (old_status) {

            req.body.old_status =
                String(old_status)
                    .trim()
                    .toUpperCase();

        }


        next();

    } catch (error) {

        console.error(
            "Loan Status History Validator Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Loan status history validation failed.",

        });

    }

};


// ==========================================================
// PARAMETER ID VALIDATOR
// ==========================================================

export const validateLoanStatusHistoryId = (
    req,
    res,
    next
) => {

    const { id } = req.params;


    if (!isValidId(id)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid status history ID is required.",

        });

    }


    req.params.id = Number(id);


    next();

};


// ==========================================================
// LOAN ID PARAMETER VALIDATOR
// ==========================================================

export const validateLoanStatusHistoryLoanId = (
    req,
    res,
    next
) => {

    const { loanId } = req.params;


    if (!isValidId(loanId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid loan ID is required.",

        });

    }


    req.params.loanId = Number(loanId);


    next();

};


// ==========================================================
// APPLICATION ID PARAMETER VALIDATOR
// ==========================================================

export const validateLoanStatusHistoryApplicationId = (
    req,
    res,
    next
) => {

    const { applicationId } = req.params;


    if (!isValidId(applicationId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid loan application ID is required.",

        });

    }


    req.params.applicationId =
        Number(applicationId);


    next();

};


// ==========================================================
// USER ID PARAMETER VALIDATOR
// ==========================================================

export const validateLoanStatusHistoryUserId = (
    req,
    res,
    next
) => {

    const { userId } = req.params;


    if (!isValidId(userId)) {

        return res.status(400).json({

            success: false,

            message:
                "Valid user ID is required.",

        });

    }


    req.params.userId =
        Number(userId);


    next();

};


// ==========================================================
// STATUS PARAMETER VALIDATOR
// ==========================================================

export const validateLoanStatusHistoryStatus = (
    req,
    res,
    next
) => {

    const { status } = req.params;


    if (!status || !String(status).trim()) {

        return res.status(400).json({

            success: false,

            message:
                "Status is required.",

        });

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    if (!ALLOWED_LOAN_STATUSES.includes(
        normalizedStatus
    )) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid loan status.",

            allowed_statuses:
                ALLOWED_LOAN_STATUSES,

        });

    }


    req.params.status =
        normalizedStatus;


    next();

};


// ==========================================================
// VALIDATE STATUS TRANSITION
// ==========================================================
//
// Utility validator for internal status transitions.
//
// ==========================================================

export const validateStatusTransition = (
    oldStatus,
    newStatus
) => {

    if (!isValidStatus(newStatus)) {

        return {

            valid: false,

            message:
                "Invalid new loan status.",

        };

    }


    if (
        oldStatus !== undefined &&
        oldStatus !== null &&
        oldStatus !== ""
    ) {

        if (!isValidStatus(oldStatus)) {

            return {

                valid: false,

                message:
                    "Invalid old loan status.",

            };

        }


        if (
            String(oldStatus).trim().toUpperCase() ===
            String(newStatus).trim().toUpperCase()
        ) {

            return {

                valid: false,

                message:
                    "Loan status cannot remain unchanged.",

            };

        }

    }


    return {

        valid: true,

        message:
            "Loan status transition is valid.",

    };

};


// ==========================================================
// EXPORT STATUS CONSTANTS
// ==========================================================

export {
    ALLOWED_LOAN_STATUSES,
    isValidId,
    isValidStatus,
};


// ==========================================================
// DEFAULT EXPORT
// ==========================================================

export default {

    validateCreateLoanStatusHistory,

    validateLoanStatusHistoryId,

    validateLoanStatusHistoryLoanId,

    validateLoanStatusHistoryApplicationId,

    validateLoanStatusHistoryUserId,

    validateLoanStatusHistoryStatus,

    validateStatusTransition,

    ALLOWED_LOAN_STATUSES,

    isValidId,

    isValidStatus,

};


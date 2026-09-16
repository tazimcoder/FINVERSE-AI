/**
 * ==========================================================
 * FINVERSE AI
 * Loan Guarantor Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanGuarantorValidator.js
 *
 * Responsibility:
 *
 * - Validate Loan Guarantor request parameters
 * - Validate Guarantor ID
 * - Validate Application ID
 * - Validate User ID
 * - Validate create payload
 * - Validate update payload
 * - Validate guarantor status
 * - Validate verification status
 * - Validate consent status
 * - Protect controller from invalid request data
 *
 * Database Table:
 * loan_guarantors
 *
 * ==========================================================
 */


// ==========================================================
// ALLOWED ENUM VALUES
// ==========================================================

const ALLOWED_GUARANTOR_STATUSES = [
    "PENDING",
    "ACTIVE",
    "RELEASED",
    "REJECTED"
];


const ALLOWED_VERIFICATION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "VERIFIED",
    "REJECTED",
    "REQUIRES_REVIEW"
];


const ALLOWED_CONSENT_STATUSES = [
    "PENDING",
    "GIVEN",
    "DECLINED"
];


// ==========================================================
// VALIDATE POSITIVE INTEGER
// ==========================================================

function validatePositiveInteger(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return false;

    }


    const number = Number(value);


    return (
        Number.isInteger(number) &&
        number > 0
    );

}


// ==========================================================
// VALIDATE GUARANTOR ID
// ==========================================================

export function validateLoanGuarantorId(
    req,
    res,
    next
) {

    const {
        id
    } = req.params;


    if (
        !validatePositiveInteger(
            id,
            "Loan guarantor ID"
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Loan guarantor ID must be a valid positive integer."

        });

    }


    req.params.id =
        Number(id);


    next();

}


// ==========================================================
// VALIDATE APPLICATION ID
// ==========================================================

export function validateLoanGuarantorApplicationId(
    req,
    res,
    next
) {

    const {
        applicationId
    } = req.params;


    if (
        !validatePositiveInteger(
            applicationId,
            "Loan application ID"
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Loan application ID must be a valid positive integer."

        });

    }


    req.params.applicationId =
        Number(applicationId);


    next();

}


// ==========================================================
// VALIDATE USER ID
// ==========================================================

export function validateLoanGuarantorUserId(
    req,
    res,
    next
) {

    const {
        userId
    } = req.params;


    if (
        !validatePositiveInteger(
            userId,
            "User ID"
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "User ID must be a valid positive integer."

        });

    }


    req.params.userId =
        Number(userId);


    next();

}


// ==========================================================
// VALIDATE STATUS PARAMETER
// ==========================================================

export function validateLoanGuarantorStatus(
    req,
    res,
    next
) {

    const {
        status
    } = req.params;


    if (
        !status ||
        String(status).trim() === ""
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Status is required."

        });

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_GUARANTOR_STATUSES.includes(
            normalizedStatus
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid guarantor status."

        });

    }


    req.params.status =
        normalizedStatus;


    next();

}


// ==========================================================
// VALIDATE VERIFICATION STATUS
// ==========================================================

export function validateLoanGuarantorVerificationStatus(
    req,
    res,
    next
) {

    const {
        status
    } = req.params;


    if (
        !status ||
        String(status).trim() === ""
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Verification status is required."

        });

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_VERIFICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid verification status."

        });

    }


    req.params.status =
        normalizedStatus;


    next();

}


// ==========================================================
// VALIDATE CONSENT STATUS
// ==========================================================

export function validateLoanGuarantorConsentStatus(
    req,
    res,
    next
) {

    const {
        status
    } = req.params;


    if (
        !status ||
        String(status).trim() === ""
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Consent status is required."

        });

    }


    const normalizedStatus =
        String(status)
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_CONSENT_STATUSES.includes(
            normalizedStatus
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid consent status."

        });

    }


    req.params.status =
        normalizedStatus;


    next();

}


// ==========================================================
// VALIDATE CREATE LOAN GUARANTOR
// ==========================================================

export function validateLoanGuarantorCreate(
    req,
    res,
    next
) {

    const data =
        req.body;


    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Loan guarantor data is required."

        });

    }


    // ------------------------------------------------------
    // Required Application ID
    // ------------------------------------------------------

    if (
        !validatePositiveInteger(
            data.loan_application_id
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "loan_application_id must be a valid positive integer."

        });

    }


    // ------------------------------------------------------
    // Required User ID
    // ------------------------------------------------------

    if (
        !validatePositiveInteger(
            data.user_id
        )
    ) {

        return res.status(400).json({

            success: false,

            message:
                "user_id must be a valid positive integer."

        });

    }


    // ------------------------------------------------------
    // Required Full Name
    // ------------------------------------------------------

    if (
        data.full_name === undefined ||
        data.full_name === null ||
        String(data.full_name).trim() === ""
    ) {

        return res.status(400).json({

            success: false,

            message:
                "full_name is required."

        });

    }


    if (
        String(data.full_name).trim().length > 150
    ) {

        return res.status(400).json({

            success: false,

            message:
                "full_name cannot exceed 150 characters."

        });

    }


    // ------------------------------------------------------
    // Email
    // ------------------------------------------------------

    if (
        data.email !== undefined &&
        data.email !== null &&
        String(data.email).trim() !== ""
    ) {

        const email =
            String(data.email).trim();


        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailRegex.test(email)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid email address."

            });

        }

    }


    // ------------------------------------------------------
    // Monthly Income
    // ------------------------------------------------------

    if (
        data.monthly_income !== undefined &&
        data.monthly_income !== null &&
        data.monthly_income !== ""
    ) {

        const income =
            Number(data.monthly_income);


        if (
            !Number.isFinite(income) ||
            income < 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "monthly_income must be a valid non-negative number."

            });

        }

    }


    // ------------------------------------------------------
    // Credit Score
    // ------------------------------------------------------

    if (
        data.credit_score !== undefined &&
        data.credit_score !== null &&
        data.credit_score !== ""
    ) {

        const creditScore =
            Number(data.credit_score);


        if (
            !Number.isFinite(creditScore) ||
            creditScore < 0 ||
            creditScore > 1000
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "credit_score must be between 0 and 1000."

            });

        }

    }


    // ------------------------------------------------------
    // Aadhaar Last 4
    // ------------------------------------------------------

    if (
        data.aadhaar_last4 !== undefined &&
        data.aadhaar_last4 !== null &&
        String(data.aadhaar_last4).trim() !== ""
    ) {

        const aadhaarLast4 =
            String(data.aadhaar_last4).trim();


        if (
            !/^\d{4}$/.test(aadhaarLast4)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "aadhaar_last4 must contain exactly 4 digits."

            });

        }

    }


    // ------------------------------------------------------
    // Status Validation
    // ------------------------------------------------------

    if (
        data.guarantor_status !== undefined &&
        data.guarantor_status !== null &&
        data.guarantor_status !== ""
    ) {

        const status =
            String(
                data.guarantor_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_GUARANTOR_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid guarantor_status."

            });

        }


        req.body.guarantor_status =
            status;

    }


    // ------------------------------------------------------
    // Verification Status
    // ------------------------------------------------------

    if (
        data.verification_status !== undefined &&
        data.verification_status !== null &&
        data.verification_status !== ""
    ) {

        const status =
            String(
                data.verification_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_VERIFICATION_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid verification_status."

            });

        }


        req.body.verification_status =
            status;

    }


    // ------------------------------------------------------
    // Consent Status
    // ------------------------------------------------------

    if (
        data.consent_status !== undefined &&
        data.consent_status !== null &&
        data.consent_status !== ""
    ) {

        const status =
            String(
                data.consent_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_CONSENT_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid consent_status."

            });

        }


        req.body.consent_status =
            status;

    }


    next();

}


// ==========================================================
// VALIDATE UPDATE LOAN GUARANTOR
// ==========================================================

export function validateLoanGuarantorUpdate(
    req,
    res,
    next
) {

    const data =
        req.body;


    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Loan guarantor update data is required."

        });

    }


    // ------------------------------------------------------
    // Full Name
    // ------------------------------------------------------

    if (
        data.full_name !== undefined
    ) {

        if (
            data.full_name === null ||
            String(data.full_name).trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "full_name cannot be empty."

            });

        }


        if (
            String(data.full_name).trim().length > 150
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "full_name cannot exceed 150 characters."

            });

        }

    }


    // ------------------------------------------------------
    // Email
    // ------------------------------------------------------

    if (
        data.email !== undefined &&
        data.email !== null &&
        String(data.email).trim() !== ""
    ) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailRegex.test(
                String(data.email).trim()
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid email address."

            });

        }

    }


    // ------------------------------------------------------
    // Monthly Income
    // ------------------------------------------------------

    if (
        data.monthly_income !== undefined &&
        data.monthly_income !== null &&
        data.monthly_income !== ""
    ) {

        const income =
            Number(data.monthly_income);


        if (
            !Number.isFinite(income) ||
            income < 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "monthly_income must be a valid non-negative number."

            });

        }

    }


    // ------------------------------------------------------
    // Credit Score
    // ------------------------------------------------------

    if (
        data.credit_score !== undefined &&
        data.credit_score !== null &&
        data.credit_score !== ""
    ) {

        const creditScore =
            Number(data.credit_score);


        if (
            !Number.isFinite(creditScore) ||
            creditScore < 0 ||
            creditScore > 1000
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "credit_score must be between 0 and 1000."

            });

        }

    }


    // ------------------------------------------------------
    // Aadhaar Last 4
    // ------------------------------------------------------

    if (
        data.aadhaar_last4 !== undefined &&
        data.aadhaar_last4 !== null &&
        String(data.aadhaar_last4).trim() !== ""
    ) {

        if (
            !/^\d{4}$/.test(
                String(data.aadhaar_last4).trim()
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "aadhaar_last4 must contain exactly 4 digits."

            });

        }

    }


    // ------------------------------------------------------
    // Status
    // ------------------------------------------------------

    if (
        data.guarantor_status !== undefined
    ) {

        const status =
            String(
                data.guarantor_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_GUARANTOR_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid guarantor_status."

            });

        }


        req.body.guarantor_status =
            status;

    }


    // ------------------------------------------------------
    // Verification Status
    // ------------------------------------------------------

    if (
        data.verification_status !== undefined
    ) {

        const status =
            String(
                data.verification_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_VERIFICATION_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid verification_status."

            });

        }


        req.body.verification_status =
            status;

    }


    // ------------------------------------------------------
    // Consent Status
    // ------------------------------------------------------

    if (
        data.consent_status !== undefined
    ) {

        const status =
            String(
                data.consent_status
            )
                .trim()
                .toUpperCase();


        if (
            !ALLOWED_CONSENT_STATUSES.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid consent_status."

            });

        }


        req.body.consent_status =
            status;

    }


    next();

}


// ==========================================================
// EXPORT ALLOWED ENUMS
// ==========================================================

export {
    ALLOWED_GUARANTOR_STATUSES,
    ALLOWED_VERIFICATION_STATUSES,
    ALLOWED_CONSENT_STATUSES
};
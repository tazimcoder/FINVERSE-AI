/**
 * ==========================================================
 * FINVERSE AI
 * Loan Repayment Schedule Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanRepaymentScheduleValidator.js
 *
 * Database Table:
 * loan_repayment_schedules
 *
 * Responsibility:
 *
 * - Validate repayment schedule input
 * - Validate loan ID
 * - Validate installment number
 * - Validate due date
 * - Validate repayment amounts
 * - Validate repayment status
 * - Validate update payload
 * - Validate status update payload
 *
 * Used By:
 *
 * Controller
 *     ↓
 * Validator
 *     ↓
 * Service
 *     ↓
 * Model
 *     ↓
 * MySQL
 *
 * ==========================================================
 */


// ==========================================================
// Allowed Repayment Statuses
// ==========================================================

export const ALLOWED_REPAYMENT_STATUSES = [

    "PENDING",

    "PARTIALLY_PAID",

    "PAID",

    "OVERDUE"

];


// ==========================================================
// Allowed Validation Modes
// ==========================================================

export const REPAYMENT_VALIDATION_MODES = {

    CREATE: "CREATE",

    UPDATE: "UPDATE",

    STATUS: "STATUS"

};


// ==========================================================
// Utility
// Validate Required Positive Integer
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

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const numericValue =
        Number(value);


    if (
        !Number.isInteger(
            numericValue
        ) ||
        numericValue <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Non-Negative Number
// ==========================================================

function validateNonNegativeNumber(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const numericValue =
        Number(value);


    if (
        !Number.isFinite(
            numericValue
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        numericValue < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return numericValue;

}


// ==========================================================
// Utility
// Validate Date
// ==========================================================

function validateDate(
    value,
    fieldName = "Due date"
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            `${fieldName} must be a valid date.`
        );

    }


    return value;

}


// ==========================================================
// Validate Loan ID
// ==========================================================

export function validateLoanId(
    loanId
) {

    return validatePositiveInteger(
        loanId,
        "Loan ID"
    );

}


// ==========================================================
// Validate Schedule ID
// ==========================================================

export function validateLoanRepaymentScheduleId(
    scheduleId
) {

    return validatePositiveInteger(
        scheduleId,
        "Repayment schedule ID"
    );

}


// ==========================================================
// Validate Installment Number
// ==========================================================

export function validateInstallmentNumber(
    installmentNumber
) {

    return validatePositiveInteger(
        installmentNumber,
        "Installment number"
    );

}


// ==========================================================
// Validate Due Date
// ==========================================================

export function validateRepaymentDueDate(
    dueDate
) {

    return validateDate(
        dueDate,
        "Due date"
    );

}


// ==========================================================
// Validate Principal Amount
// ==========================================================

export function validatePrincipalAmount(
    principalAmount
) {

    return validateNonNegativeNumber(
        principalAmount,
        "Principal amount"
    );

}


// ==========================================================
// Validate Interest Amount
// ==========================================================

export function validateInterestAmount(
    interestAmount
) {

    return validateNonNegativeNumber(
        interestAmount,
        "Interest amount"
    );

}


// ==========================================================
// Validate Total Amount
// ==========================================================

export function validateTotalAmount(
    totalAmount
) {

    return validateNonNegativeNumber(
        totalAmount,
        "Total amount"
    );

}


// ==========================================================
// Validate Amount Relationship
// ==========================================================
//
// total_amount must equal:
//
// principal_amount + interest_amount
//
// ==========================================================

export function validateRepaymentAmounts(
    principalAmount,
    interestAmount,
    totalAmount
) {

    const principal =
        validatePrincipalAmount(
            principalAmount
        );


    const interest =
        validateInterestAmount(
            interestAmount
        );


    const total =
        validateTotalAmount(
            totalAmount
        );


    const expectedTotal =
        principal +
        interest;


    if (
        Math.abs(
            expectedTotal -
            total
        ) > 0.01
    ) {

        throw new Error(
            "Total amount must equal principal amount plus interest amount."
        );

    }


    return {

        principal_amount:
            principal,

        interest_amount:
            interest,

        total_amount:
            total

    };

}


// ==========================================================
// Validate Repayment Status
// ==========================================================

export function validateRepaymentStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        throw new Error(
            "Repayment schedule status is required."
        );

    }


    const normalizedStatus =
        String(
            status
        ).toUpperCase();


    if (
        !ALLOWED_REPAYMENT_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid repayment schedule status. Allowed statuses: ${ALLOWED_REPAYMENT_STATUSES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Create Payload
// ==========================================================

export function validateCreateLoanRepaymentSchedule(
    scheduleData
) {

    if (
        !scheduleData ||
        typeof scheduleData !== "object"
    ) {

        throw new Error(
            "Repayment schedule data is required."
        );

    }


    const {

        loan_id,

        installment_number,

        due_date,

        principal_amount,

        interest_amount,

        total_amount,

        status

    } = scheduleData;


    // ------------------------------------------------------
    // Loan
    // ------------------------------------------------------

    const validatedLoanId =
        validateLoanId(
            loan_id
        );


    // ------------------------------------------------------
    // Installment
    // ------------------------------------------------------

    const validatedInstallmentNumber =
        validateInstallmentNumber(
            installment_number
        );


    // ------------------------------------------------------
    // Due Date
    // ------------------------------------------------------

    const validatedDueDate =
        validateRepaymentDueDate(
            due_date
        );


    // ------------------------------------------------------
    // Amounts
    // ------------------------------------------------------

    const validatedAmounts =
        validateRepaymentAmounts(
            principal_amount,
            interest_amount,
            total_amount
        );


    // ------------------------------------------------------
    // Optional Status
    // ------------------------------------------------------

    let validatedStatus =
        "PENDING";


    if (
        status !== undefined &&
        status !== null &&
        status !== ""
    ) {

        validatedStatus =
            validateRepaymentStatus(
                status
            );

    }


    return {

        ...scheduleData,

        loan_id:
            validatedLoanId,

        installment_number:
            validatedInstallmentNumber,

        due_date:
            validatedDueDate,

        principal_amount:
            validatedAmounts.principal_amount,

        interest_amount:
            validatedAmounts.interest_amount,

        total_amount:
            validatedAmounts.total_amount,

        status:
            validatedStatus

    };

}


// ==========================================================
// Validate Update Payload
// ==========================================================

export function validateUpdateLoanRepaymentSchedule(
    scheduleId,
    scheduleData
) {

    const validatedScheduleId =
        validateLoanRepaymentScheduleId(
            scheduleId
        );


    if (
        !scheduleData ||
        typeof scheduleData !== "object"
    ) {

        throw new Error(
            "Repayment schedule data is required."
        );

    }


    const {

        due_date,

        principal_amount,

        interest_amount,

        total_amount

    } = scheduleData;


    const validatedDueDate =
        validateRepaymentDueDate(
            due_date
        );


    const validatedAmounts =
        validateRepaymentAmounts(
            principal_amount,
            interest_amount,
            total_amount
        );


    return {

        ...scheduleData,

        id:
            validatedScheduleId,

        due_date:
            validatedDueDate,

        principal_amount:
            validatedAmounts.principal_amount,

        interest_amount:
            validatedAmounts.interest_amount,

        total_amount:
            validatedAmounts.total_amount

    };

}


// ==========================================================
// Validate Status Update Payload
// ==========================================================

export function validateUpdateLoanRepaymentScheduleStatus(
    scheduleId,
    status
) {

    const validatedScheduleId =
        validateLoanRepaymentScheduleId(
            scheduleId
        );


    const validatedStatus =
        validateRepaymentStatus(
            status
        );


    return {

        id:
            validatedScheduleId,

        status:
            validatedStatus

    };

}


// ==========================================================
// Validate Delete
// ==========================================================

export function validateDeleteLoanRepaymentSchedule(
    scheduleId
) {

    return validateLoanRepaymentScheduleId(
        scheduleId
    );

}


// ==========================================================
// Validate Fetch By Loan
// ==========================================================

export function validateLoanRepaymentSchedulesByLoan(
    loanId
) {

    return validateLoanId(
        loanId
    );

}


// ==========================================================
// Validate Fetch By Status
// ==========================================================

export function validateLoanRepaymentSchedulesByStatus(
    status
) {

    return validateRepaymentStatus(
        status
    );

}


// ==========================================================
// Export Default Validator Object
// ==========================================================

export default {

    ALLOWED_REPAYMENT_STATUSES,

    REPAYMENT_VALIDATION_MODES,

    validateLoanId,

    validateLoanRepaymentScheduleId,

    validateInstallmentNumber,

    validateRepaymentDueDate,

    validatePrincipalAmount,

    validateInterestAmount,

    validateTotalAmount,

    validateRepaymentAmounts,

    validateRepaymentStatus,

    validateCreateLoanRepaymentSchedule,

    validateUpdateLoanRepaymentSchedule,

    validateUpdateLoanRepaymentScheduleStatus,

    validateDeleteLoanRepaymentSchedule,

    validateLoanRepaymentSchedulesByLoan,

    validateLoanRepaymentSchedulesByStatus

};


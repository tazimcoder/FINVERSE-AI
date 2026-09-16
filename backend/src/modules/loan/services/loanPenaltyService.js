/**
 * ==========================================================
 * FINVERSE AI
 * Loan Penalty Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanPenaltyService.js
 *
 * Responsibility:
 *
 * - Loan penalty business logic
 * - Validate penalty data
 * - Fetch penalty records
 * - Create penalty
 * - Update penalty
 * - Manage penalty status
 * - Calculate payable amount
 * - Waive penalty
 * - Mark penalty as paid
 * - Delete penalty
 *
 * Database Table:
 * loan_penalties
 *
 * ==========================================================
 */

import {
    getAllLoanPenalties,
    getLoanPenaltyById,
    getLoanPenaltiesByLoanId,
    getLoanPenaltiesByScheduleId,
    getLoanPenaltiesByUserId,
    getLoanPenaltiesByType,
    getLoanPenaltiesByStatus,
    createLoanPenalty,
    updateLoanPenalty,
    updateLoanPenaltyStatus,
    waiveLoanPenalty,
    markLoanPenaltyAsPaid,
    deleteLoanPenalty
} from "../models/loanPenaltyModel.js";


// ==========================================================
// ALLOWED ENUM VALUES
// ==========================================================

const ALLOWED_PENALTY_TYPES = [
    "LATE_PAYMENT",
    "MISSED_EMI",
    "BOUNCE",
    "OVERDUE",
    "OTHER"
];


const ALLOWED_PENALTY_STATUSES = [
    "PENDING",
    "APPLIED",
    "PAID",
    "WAIVED",
    "CANCELLED"
];


// ==========================================================
// VALIDATE REQUIRED ID
// ==========================================================

function validateId(
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


    const id = Number(value);


    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        throw new Error(
            `${fieldName} must be a valid positive integer.`
        );

    }


    return id;
}


// ==========================================================
// VALIDATE OPTIONAL ID
// ==========================================================

function validateOptionalId(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    return validateId(
        value,
        fieldName
    );
}


// ==========================================================
// VALIDATE OPTIONAL NUMBER
// ==========================================================

function validateOptionalNumber(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    const number = Number(value);


    if (
        !Number.isFinite(number)
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        number < 0
    ) {

        throw new Error(
            `${fieldName} cannot be negative.`
        );

    }


    return number;
}


// ==========================================================
// VALIDATE REQUIRED NUMBER
// ==========================================================

function validateRequiredNumber(
    value,
    fieldName
) {

    const number =
        validateOptionalNumber(
            value,
            fieldName
        );


    if (number === null) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    return number;
}


// ==========================================================
// VALIDATE ENUM
// ==========================================================

function normalizeEnum(
    value,
    fieldName,
    allowedValues
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    const normalized =
        String(value)
            .trim()
            .toUpperCase();


    if (
        !allowedValues.includes(
            normalized
        )
    ) {

        throw new Error(
            `Invalid ${fieldName}.`
        );

    }


    return normalized;
}


// ==========================================================
// VALIDATE DATE
// ==========================================================

function validateOptionalDate(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }


    const date =
        new Date(value);


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
// VALIDATE WAIVER AMOUNT
// ==========================================================

function validateWaivedAmount(
    waivedAmount,
    penaltyAmount
) {

    const amount =
        validateRequiredNumber(
            waivedAmount,
            "Waived amount"
        );


    if (
        amount > penaltyAmount
    ) {

        throw new Error(
            "Waived amount cannot exceed penalty amount."
        );

    }


    return amount;
}


// ==========================================================
// CALCULATE PAYABLE AMOUNT
// ==========================================================

function calculatePayableAmount(
    penaltyAmount,
    waivedAmount = 0
) {

    const payable =
        Number(penaltyAmount) -
        Number(waivedAmount);


    return Math.max(
        payable,
        0
    );

}


// ==========================================================
// FETCH ALL
// ==========================================================

export async function fetchAllLoanPenalties() {

    return await getAllLoanPenalties();

}


// ==========================================================
// FETCH BY ID
// ==========================================================

export async function fetchLoanPenaltyById(
    penaltyId
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    return await getLoanPenaltyById(
        id
    );

}


// ==========================================================
// FETCH BY LOAN
// ==========================================================

export async function fetchLoanPenaltiesByLoanId(
    loanId
) {

    const id =
        validateId(
            loanId,
            "Loan ID"
        );


    return await getLoanPenaltiesByLoanId(
        id
    );

}


// ==========================================================
// FETCH BY REPAYMENT SCHEDULE
// ==========================================================

export async function fetchLoanPenaltiesByScheduleId(
    scheduleId
) {

    const id =
        validateId(
            scheduleId,
            "Repayment schedule ID"
        );


    return await getLoanPenaltiesByScheduleId(
        id
    );

}


// ==========================================================
// FETCH BY USER
// ==========================================================

export async function fetchLoanPenaltiesByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanPenaltiesByUserId(
        id
    );

}


// ==========================================================
// FETCH BY TYPE
// ==========================================================

export async function fetchLoanPenaltiesByType(
    penaltyType
) {

    const type =
        normalizeEnum(
            penaltyType,
            "penalty type",
            ALLOWED_PENALTY_TYPES
        );


    if (!type) {

        throw new Error(
            "Penalty type is required."
        );

    }


    return await getLoanPenaltiesByType(
        type
    );

}


// ==========================================================
// FETCH BY STATUS
// ==========================================================

export async function fetchLoanPenaltiesByStatus(
    penaltyStatus
) {

    const status =
        normalizeEnum(
            penaltyStatus,
            "penalty status",
            ALLOWED_PENALTY_STATUSES
        );


    if (!status) {

        throw new Error(
            "Penalty status is required."
        );

    }


    return await getLoanPenaltiesByStatus(
        status
    );

}


// ==========================================================
// CREATE LOAN PENALTY
// ==========================================================

export async function createNewLoanPenalty(
    penaltyData
) {

    if (
        !penaltyData ||
        typeof penaltyData !== "object"
    ) {

        throw new Error(
            "Loan penalty data is required."
        );

    }


    const {

        loan_id,
        repayment_schedule_id,
        user_id,

        penalty_type,
        penalty_reason,

        penalty_amount,
        waived_amount,

        penalty_status,

        due_date,

        applied_at,
        paid_at,

        waived_by_user_id,
        waiver_reason,

        notes

    } = penaltyData;


    const loanId =
        validateId(
            loan_id,
            "Loan ID"
        );


    const scheduleId =
        validateOptionalId(
            repayment_schedule_id,
            "Repayment schedule ID"
        );


    const userId =
        validateId(
            user_id,
            "User ID"
        );


    const penaltyType =
        normalizeEnum(
            penalty_type,
            "penalty type",
            ALLOWED_PENALTY_TYPES
        );


    if (!penaltyType) {

        throw new Error(
            "Penalty type is required."
        );

    }


    const penaltyAmount =
        validateRequiredNumber(
            penalty_amount,
            "Penalty amount"
        );


    const waivedAmount =
        waived_amount !== undefined
            ? validateWaivedAmount(
                waived_amount,
                penaltyAmount
            )
            : 0;


    const payableAmount =
        calculatePayableAmount(
            penaltyAmount,
            waivedAmount
        );


    const status =
        normalizeEnum(
            penalty_status,
            "penalty status",
            ALLOWED_PENALTY_STATUSES
        ) || "PENDING";


    const dueDate =
        validateOptionalDate(
            due_date,
            "Due date"
        );


    const waivedByUserId =
        validateOptionalId(
            waived_by_user_id,
            "Waived by user ID"
        );


    if (
        waivedAmount > 0 &&
        !waivedByUserId
    ) {

        throw new Error(
            "Waived by user ID is required when waived amount is greater than zero."
        );

    }


    if (
        status === "WAIVED" &&
        waivedAmount <= 0
    ) {

        throw new Error(
            "Waived amount must be greater than zero for WAIVED status."
        );

    }


    if (
        status === "PAID" &&
        payableAmount > 0 &&
        !paid_at
    ) {

        throw new Error(
            "Paid timestamp is required when penalty status is PAID."
        );

    }


    const data = {

        loan_id:
            loanId,

        repayment_schedule_id:
            scheduleId,

        user_id:
            userId,

        penalty_type:
            penaltyType,

        penalty_reason:
            penalty_reason ?? null,

        penalty_amount:
            penaltyAmount,

        waived_amount:
            waivedAmount,

        payable_amount:
            payableAmount,

        penalty_status:
            status,

        due_date:
            dueDate,

        applied_at:
            applied_at ?? null,

        paid_at:
            paid_at ?? null,

        waived_by_user_id:
            waivedByUserId,

        waiver_reason:
            waiver_reason ?? null,

        notes:
            notes ?? null

    };


    return await createLoanPenalty(
        data
    );

}


// ==========================================================
// UPDATE LOAN PENALTY
// ==========================================================

export async function updateExistingLoanPenalty(
    penaltyId,
    penaltyData
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    if (
        !penaltyData ||
        typeof penaltyData !== "object"
    ) {

        throw new Error(
            "Loan penalty data is required."
        );

    }


    const existingPenalty =
        await getLoanPenaltyById(
            id
        );


    if (!existingPenalty) {

        throw new Error(
            "Loan penalty not found."
        );

    }


    const {

        repayment_schedule_id,

        penalty_type,
        penalty_reason,

        penalty_amount,
        waived_amount,

        penalty_status,

        due_date,

        applied_at,
        paid_at,

        waived_by_user_id,
        waiver_reason,

        notes

    } = penaltyData;


    const scheduleId =
        repayment_schedule_id !== undefined
            ? validateOptionalId(
                repayment_schedule_id,
                "Repayment schedule ID"
            )
            : existingPenalty.repayment_schedule_id;


    const penaltyType =
        penalty_type !== undefined
            ? normalizeEnum(
                penalty_type,
                "penalty type",
                ALLOWED_PENALTY_TYPES
            )
            : existingPenalty.penalty_type;


    const penaltyAmount =
        penalty_amount !== undefined
            ? validateRequiredNumber(
                penalty_amount,
                "Penalty amount"
            )
            : Number(
                existingPenalty.penalty_amount
            );


    const waivedAmount =
        waived_amount !== undefined
            ? validateWaivedAmount(
                waived_amount,
                penaltyAmount
            )
            : Number(
                existingPenalty.waived_amount
            );


    const payableAmount =
        calculatePayableAmount(
            penaltyAmount,
            waivedAmount
        );


    const status =
        penalty_status !== undefined
            ? normalizeEnum(
                penalty_status,
                "penalty status",
                ALLOWED_PENALTY_STATUSES
            )
            : existingPenalty.penalty_status;


    const dueDate =
        due_date !== undefined
            ? validateOptionalDate(
                due_date,
                "Due date"
            )
            : existingPenalty.due_date;


    const waivedByUserId =
        waived_by_user_id !== undefined
            ? validateOptionalId(
                waived_by_user_id,
                "Waived by user ID"
            )
            : existingPenalty.waived_by_user_id;


    if (
        waivedAmount > 0 &&
        !waivedByUserId
    ) {

        throw new Error(
            "Waived by user ID is required when waived amount is greater than zero."
        );

    }


    if (
        status === "WAIVED" &&
        waivedAmount <= 0
    ) {

        throw new Error(
            "Waived amount must be greater than zero for WAIVED status."
        );

    }


    const updateData = {

        repayment_schedule_id:
            scheduleId,

        penalty_type:
            penaltyType,

        penalty_reason:
            penalty_reason !== undefined
                ? penalty_reason
                : existingPenalty.penalty_reason,

        penalty_amount:
            penaltyAmount,

        waived_amount:
            waivedAmount,

        payable_amount:
            payableAmount,

        penalty_status:
            status,

        due_date:
            dueDate,

        applied_at:
            applied_at !== undefined
                ? applied_at
                : existingPenalty.applied_at,

        paid_at:
            paid_at !== undefined
                ? paid_at
                : existingPenalty.paid_at,

        waived_by_user_id:
            waivedByUserId,

        waiver_reason:
            waiver_reason !== undefined
                ? waiver_reason
                : existingPenalty.waiver_reason,

        notes:
            notes !== undefined
                ? notes
                : existingPenalty.notes

    };


    return await updateLoanPenalty(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE PENALTY STATUS
// ==========================================================

export async function changeLoanPenaltyStatus(
    penaltyId,
    penaltyStatus
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    const status =
        normalizeEnum(
            penaltyStatus,
            "penalty status",
            ALLOWED_PENALTY_STATUSES
        );


    if (!status) {

        throw new Error(
            "Penalty status is required."
        );

    }


    const existingPenalty =
        await getLoanPenaltyById(
            id
        );


    if (!existingPenalty) {

        throw new Error(
            "Loan penalty not found."
        );

    }


    if (
        existingPenalty.penalty_status === "PAID" &&
        status !== "PAID"
    ) {

        throw new Error(
            "A paid penalty cannot be moved to another status."
        );

    }


    return await updateLoanPenaltyStatus(
        id,
        status
    );

}


// ==========================================================
// WAIVE LOAN PENALTY
// ==========================================================

export async function waiveExistingLoanPenalty(
    penaltyId,
    waiverData
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    if (
        !waiverData ||
        typeof waiverData !== "object"
    ) {

        throw new Error(
            "Waiver data is required."
        );

    }


    const existingPenalty =
        await getLoanPenaltyById(
            id
        );


    if (!existingPenalty) {

        throw new Error(
            "Loan penalty not found."
        );

    }


    if (
        existingPenalty.penalty_status === "PAID"
    ) {

        throw new Error(
            "A paid penalty cannot be waived."
        );

    }


    if (
        existingPenalty.penalty_status === "CANCELLED"
    ) {

        throw new Error(
            "A cancelled penalty cannot be waived."
        );

    }


    const {
        waived_amount,
        waived_by_user_id,
        waiver_reason
    } = waiverData;


    const waivedAmount =
        validateWaivedAmount(
            waived_amount,
            Number(
                existingPenalty.penalty_amount
            )
        );


    const waivedByUserId =
        validateId(
            waived_by_user_id,
            "Waived by user ID"
        );


    if (
        waiver_reason === undefined ||
        waiver_reason === null ||
        String(waiver_reason).trim() === ""
    ) {

        throw new Error(
            "Waiver reason is required."
        );

    }


    return await waiveLoanPenalty(
        id,
        waivedAmount,
        waivedByUserId,
        String(waiver_reason).trim()
    );

}


// ==========================================================
// MARK PENALTY AS PAID
// ==========================================================

export async function markExistingLoanPenaltyAsPaid(
    penaltyId
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    const existingPenalty =
        await getLoanPenaltyById(
            id
        );


    if (!existingPenalty) {

        throw new Error(
            "Loan penalty not found."
        );

    }


    if (
        existingPenalty.penalty_status === "PAID"
    ) {

        throw new Error(
            "Loan penalty is already marked as paid."
        );

    }


    if (
        existingPenalty.penalty_status === "WAIVED"
    ) {

        throw new Error(
            "A waived penalty cannot be marked as paid."
        );

    }


    if (
        existingPenalty.penalty_status === "CANCELLED"
    ) {

        throw new Error(
            "A cancelled penalty cannot be marked as paid."
        );

    }


    return await markLoanPenaltyAsPaid(
        id
    );

}


// ==========================================================
// DELETE LOAN PENALTY
// ==========================================================

export async function removeLoanPenalty(
    penaltyId
) {

    const id =
        validateId(
            penaltyId,
            "Loan penalty ID"
        );


    const existingPenalty =
        await getLoanPenaltyById(
            id
        );


    if (!existingPenalty) {

        throw new Error(
            "Loan penalty not found."
        );

    }


    if (
        existingPenalty.penalty_status === "PAID"
    ) {

        throw new Error(
            "A paid penalty cannot be deleted."
        );

    }


    return await deleteLoanPenalty(
        id
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_PENALTY_TYPES,
    ALLOWED_PENALTY_STATUSES
};
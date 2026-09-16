/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/loanDocumentService.js
 *
 * Responsibility:
 *
 * - Business logic for loan documents
 * - Validate document input
 * - Fetch documents
 * - Create loan documents
 * - Update loan documents
 * - Update verification status
 * - Delete loan documents
 *
 * Connected Model:
 * ../models/loanDocumentModel.js
 *
 * Database Table:
 * loan_documents
 *
 * ==========================================================
 */

import {
    getAllLoanDocuments,
    getLoanDocumentById,
    getLoanDocumentsByApplicationId,
    getLoanDocumentsByLoanId,
    getLoanDocumentsByUserId,
    createLoanDocument,
    updateLoanDocument,
    updateLoanDocumentVerificationStatus,
    deleteLoanDocument
} from "../models/loanDocumentModel.js";


// ==========================================================
// ALLOWED DOCUMENT CATEGORIES
// ==========================================================

const ALLOWED_DOCUMENT_CATEGORIES = [
    "KYC",
    "INCOME",
    "BANK",
    "PROPERTY",
    "EMPLOYMENT",
    "LOAN",
    "OTHER"
];


// ==========================================================
// ALLOWED VERIFICATION STATUSES
// ==========================================================

const ALLOWED_VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED",
    "EXPIRED"
];


// ==========================================================
// VALIDATE ID
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
// VALIDATE REQUIRED STRING
// ==========================================================

function validateRequiredString(
    value,
    fieldName
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {

        throw new Error(
            `${fieldName} is required.`
        );

    }


    return String(
        value
    ).trim();

}


// ==========================================================
// NORMALIZE OPTIONAL STRING
// ==========================================================

function normalizeOptionalString(
    value
) {

    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {

        return null;

    }


    return String(
        value
    ).trim();

}


// ==========================================================
// NORMALIZE DOCUMENT CATEGORY
// ==========================================================

function normalizeDocumentCategory(
    category
) {

    if (
        category === undefined ||
        category === null ||
        String(category).trim() === ""
    ) {

        return "OTHER";

    }


    const normalizedCategory =
        String(
            category
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_DOCUMENT_CATEGORIES.includes(
            normalizedCategory
        )
    ) {

        throw new Error(
            "Invalid document category."
        );

    }


    return normalizedCategory;

}


// ==========================================================
// NORMALIZE VERIFICATION STATUS
// ==========================================================

function normalizeVerificationStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        String(status).trim() === ""
    ) {

        return "PENDING";

    }


    const normalizedStatus =
        String(
            status
        )
            .trim()
            .toUpperCase();


    if (
        !ALLOWED_VERIFICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            "Invalid document verification status."
        );

    }


    return normalizedStatus;

}


// ==========================================================
// VALIDATE FILE SIZE
// ==========================================================

function validateFileSize(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }


    const fileSize =
        Number(value);


    if (
        !Number.isFinite(
            fileSize
        ) ||
        fileSize < 0
    ) {

        throw new Error(
            "File size must be a valid non-negative number."
        );

    }


    return fileSize;

}


// ==========================================================
// VALIDATE OPTIONAL POSITIVE ID
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
// FETCH ALL LOAN DOCUMENTS
// ==========================================================

export async function fetchAllLoanDocuments() {

    return await getAllLoanDocuments();

}


// ==========================================================
// FETCH LOAN DOCUMENT BY ID
// ==========================================================

export async function fetchLoanDocumentById(
    documentId
) {

    const id =
        validateId(
            documentId,
            "Loan document ID"
        );


    return await getLoanDocumentById(
        id
    );

}


// ==========================================================
// FETCH DOCUMENTS BY APPLICATION
// ==========================================================

export async function fetchLoanDocumentsByApplicationId(
    applicationId
) {

    const id =
        validateId(
            applicationId,
            "Loan application ID"
        );


    return await getLoanDocumentsByApplicationId(
        id
    );

}


// ==========================================================
// FETCH DOCUMENTS BY LOAN
// ==========================================================

export async function fetchLoanDocumentsByLoanId(
    loanId
) {

    const id =
        validateId(
            loanId,
            "Loan ID"
        );


    return await getLoanDocumentsByLoanId(
        id
    );

}


// ==========================================================
// FETCH DOCUMENTS BY USER
// ==========================================================

export async function fetchLoanDocumentsByUserId(
    userId
) {

    const id =
        validateId(
            userId,
            "User ID"
        );


    return await getLoanDocumentsByUserId(
        id
    );

}


// ==========================================================
// CREATE LOAN DOCUMENT
// ==========================================================

export async function createNewLoanDocument(
    documentData
) {

    if (
        !documentData ||
        typeof documentData !== "object" ||
        Array.isArray(documentData)
    ) {

        throw new Error(
            "Loan document data is required."
        );

    }


    const {
        loan_application_id,
        loan_id,
        user_id,
        document_type,
        document_category,
        document_name,
        verification_status,
        rejection_reason,
        verified_by_user_id,
        file_size_bytes
    } = documentData;


    // ======================================================
    // VALIDATE USER
    // ======================================================

    const userId =
        validateId(
            user_id,
            "User ID"
        );


    // ======================================================
    // VALIDATE DOCUMENT TYPE
    // ======================================================

    const documentType =
        validateRequiredString(
            document_type,
            "Document type"
        );


    // ======================================================
    // VALIDATE DOCUMENT NAME
    // ======================================================

    const documentName =
        validateRequiredString(
            document_name,
            "Document name"
        );


    // ======================================================
    // VALIDATE LOAN RELATIONSHIP
    // ======================================================

    const applicationId =
        validateOptionalId(
            loan_application_id,
            "Loan application ID"
        );


    const loanId =
        validateOptionalId(
            loan_id,
            "Loan ID"
        );


    if (
        !applicationId &&
        !loanId
    ) {

        throw new Error(
            "Loan application ID or loan ID is required."
        );

    }


    // ======================================================
    // NORMALIZE CATEGORY
    // ======================================================

    const category =
        normalizeDocumentCategory(
            document_category
        );


    // ======================================================
    // NORMALIZE VERIFICATION STATUS
    // ==========================================================

    const normalizedVerificationStatus =
        normalizeVerificationStatus(
            verification_status
        );


    // ======================================================
    // VALIDATE FILE SIZE
    // ==========================================================

    const fileSize =
        validateFileSize(
            file_size_bytes
        );


    // ======================================================
    // VALIDATE REJECTION REASON
    // ==========================================================

    const rejectionReason =
        normalizeOptionalString(
            rejection_reason
        );


    if (
        normalizedVerificationStatus === "REJECTED" &&
        !rejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when document is rejected."
        );

    }


    // ======================================================
    // VALIDATE VERIFIED BY USER
    // ==========================================================

    const verifiedByUserId =
        validateOptionalId(
            verified_by_user_id,
            "Verified by user ID"
        );


    if (
        normalizedVerificationStatus === "VERIFIED" &&
        !verifiedByUserId
    ) {

        throw new Error(
            "Verified by user ID is required when document is verified."
        );

    }


    // ======================================================
    // PREPARE DOCUMENT DATA
    // ==========================================================

    const data = {

        ...documentData,

        loan_application_id:
            applicationId,

        loan_id:
            loanId,

        user_id:
            userId,

        document_type:
            documentType,

        document_name:
            documentName,

        document_category:
            category,

        verification_status:
            normalizedVerificationStatus,

        rejection_reason:
            normalizedVerificationStatus === "REJECTED"
                ? rejectionReason
                : null,

        verified_by_user_id:
            normalizedVerificationStatus === "VERIFIED"
                ? verifiedByUserId
                : null,

        file_size_bytes:
            fileSize

    };


    // ======================================================
    // CREATE DOCUMENT
    // ======================================================

    return await createLoanDocument(
        data
    );

}


// ==========================================================
// UPDATE LOAN DOCUMENT
// ==========================================================

export async function updateExistingLoanDocument(
    documentId,
    documentData
) {

    const id =
        validateId(
            documentId,
            "Loan document ID"
        );


    if (
        !documentData ||
        typeof documentData !== "object" ||
        Array.isArray(documentData)
    ) {

        throw new Error(
            "Loan document data is required."
        );

    }


    // ======================================================
    // FETCH EXISTING DOCUMENT
    // ======================================================

    const existingDocument =
        await getLoanDocumentById(
            id
        );


    if (!existingDocument) {

        throw new Error(
            "Loan document not found."
        );

    }


    const {
        document_type,
        document_name,
        document_category,
        file_size_bytes
    } = documentData;


    // ======================================================
    // VALIDATE DOCUMENT TYPE
    // ======================================================

    const documentType =
        document_type !== undefined
            ? validateRequiredString(
                document_type,
                "Document type"
            )
            : existingDocument.document_type;


    // ======================================================
    // VALIDATE DOCUMENT NAME
    // ======================================================

    const documentName =
        document_name !== undefined
            ? validateRequiredString(
                document_name,
                "Document name"
            )
            : existingDocument.document_name;


    // ======================================================
    // VALIDATE CATEGORY
    // ======================================================

    const category =
        document_category !== undefined
            ? normalizeDocumentCategory(
                document_category
            )
            : normalizeDocumentCategory(
                existingDocument.document_category
            );


    // ======================================================
    // VALIDATE FILE SIZE
    // ======================================================

    const fileSize =
        file_size_bytes !== undefined
            ? validateFileSize(
                file_size_bytes
            )
            : existingDocument.file_size_bytes;


    // ======================================================
    // PREPARE UPDATE DATA
    // ======================================================

    const updateData = {

        ...documentData,

        document_type:
            documentType,

        document_name:
            documentName,

        document_category:
            category,

        file_size_bytes:
            fileSize

    };


    // ======================================================
    // PROTECTED VERIFICATION FIELDS
    // ======================================================
    //
    // Verification must be changed only through:
    //
    // changeLoanDocumentVerificationStatus()
    //
    // ======================================================

    delete updateData.verification_status;

    delete updateData.rejection_reason;

    delete updateData.verified_by_user_id;

    delete updateData.verified_at;


    // ======================================================
    // UPDATE DOCUMENT
    // ======================================================

    return await updateLoanDocument(
        id,
        updateData
    );

}


// ==========================================================
// CHANGE DOCUMENT VERIFICATION STATUS
// ==========================================================

export async function changeLoanDocumentVerificationStatus(
    documentId,
    verificationStatus,
    rejectionReason = null,
    verifiedByUserId = null
) {

    const id =
        validateId(
            documentId,
            "Loan document ID"
        );


    // ======================================================
    // NORMALIZE STATUS
    // ======================================================

    const normalizedStatus =
        normalizeVerificationStatus(
            verificationStatus
        );


    // ======================================================
    // FETCH EXISTING DOCUMENT
    // ======================================================

    const existingDocument =
        await getLoanDocumentById(
            id
        );


    if (!existingDocument) {

        throw new Error(
            "Loan document not found."
        );

    }


    // ======================================================
    // NORMALIZE REJECTION REASON
    // ======================================================

    const normalizedRejectionReason =
        normalizeOptionalString(
            rejectionReason
        );


    // ======================================================
    // VALIDATE REJECTION
    // ======================================================

    if (
        normalizedStatus === "REJECTED" &&
        !normalizedRejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when document is rejected."
        );

    }


    // ======================================================
    // VALIDATE VERIFIED USER
    // ======================================================

    const normalizedVerifiedByUserId =
        validateOptionalId(
            verifiedByUserId,
            "Verified by user ID"
        );


    if (
        normalizedStatus === "VERIFIED" &&
        !normalizedVerifiedByUserId
    ) {

        throw new Error(
            "Verified by user ID is required when document is verified."
        );

    }


    // ======================================================
    // UPDATE VERIFICATION STATUS
    // ======================================================

    return await updateLoanDocumentVerificationStatus(
        id,
        normalizedStatus,
        normalizedStatus === "REJECTED"
            ? normalizedRejectionReason
            : null,
        normalizedStatus === "VERIFIED"
            ? normalizedVerifiedByUserId
            : null
    );

}


// ==========================================================
// DELETE LOAN DOCUMENT
// ==========================================================

export async function removeLoanDocument(
    documentId
) {

    const id =
        validateId(
            documentId,
            "Loan document ID"
        );


    // ======================================================
    // FETCH EXISTING DOCUMENT
    // ======================================================

    const existingDocument =
        await getLoanDocumentById(
            id
        );


    if (!existingDocument) {

        throw new Error(
            "Loan document not found."
        );

    }


    // ======================================================
    // DELETE DOCUMENT
    // ======================================================

    return await deleteLoanDocument(
        id
    );

}


// ==========================================================
// EXPORT CONSTANTS
// ==========================================================

export {
    ALLOWED_DOCUMENT_CATEGORIES,
    ALLOWED_VERIFICATION_STATUSES
};


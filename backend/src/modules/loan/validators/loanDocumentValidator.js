/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Validator
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/validators/loanDocumentValidator.js
 *
 * Database Table:
 * loan_documents
 *
 * Responsibility:
 *
 * - Validate loan document data
 * - Validate application / loan / user IDs
 * - Validate document category
 * - Validate verification status
 * - Validate file metadata
 * - Validate document number
 * - Validate expiry date
 * - Validate verification/rejection data
 * - Validate create and update operations
 *
 * ==========================================================
 */


// ==========================================================
// Constants
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


const ALLOWED_VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED",
    "EXPIRED"
];


const ALLOWED_STORAGE_PROVIDERS = [
    "LOCAL",
    "AWS_S3",
    "AZURE_BLOB",
    "GOOGLE_CLOUD",
    "CLOUDINARY",
    "OTHER"
];


// ==========================================================
// Utility - Required Value
// ==========================================================

function requireValue(
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

}


// ==========================================================
// Utility - Positive Integer
// ==========================================================

function validatePositiveInteger(
    value,
    fieldName
) {

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
// Utility - Optional Positive Integer
// ==========================================================

function validateOptionalPositiveInteger(
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


    return validatePositiveInteger(
        value,
        fieldName
    );

}


// ==========================================================
// Validate Application ID
// ==========================================================

export function validateLoanDocumentApplicationId(
    applicationId
) {

    return validateOptionalPositiveInteger(
        applicationId,
        "Loan application ID"
    );

}


// ==========================================================
// Validate Loan ID
// ==========================================================

export function validateLoanDocumentLoanId(
    loanId
) {

    return validateOptionalPositiveInteger(
        loanId,
        "Loan ID"
    );

}


// ==========================================================
// Validate User ID
// ==========================================================

export function validateLoanDocumentUserId(
    userId
) {

    requireValue(
        userId,
        "User ID"
    );


    return validatePositiveInteger(
        userId,
        "User ID"
    );

}


// ==========================================================
// Validate Document Type
// ==========================================================

export function validateDocumentType(
    documentType
) {

    requireValue(
        documentType,
        "Document type"
    );


    const value =
        String(
            documentType
        ).trim();


    if (
        value.length === 0
    ) {

        throw new Error(
            "Document type cannot be empty."
        );

    }


    if (
        value.length > 100
    ) {

        throw new Error(
            "Document type cannot exceed 100 characters."
        );

    }


    return value;

}


// ==========================================================
// Validate Document Category
// ==========================================================

export function validateDocumentCategory(
    category
) {

    if (
        category === undefined ||
        category === null ||
        category === ""
    ) {

        return "OTHER";

    }


    const normalizedCategory =
        String(
            category
        ).toUpperCase();


    if (
        !ALLOWED_DOCUMENT_CATEGORIES.includes(
            normalizedCategory
        )
    ) {

        throw new Error(
            `Invalid document category. Allowed values: ${ALLOWED_DOCUMENT_CATEGORIES.join(", ")}.`
        );

    }


    return normalizedCategory;

}


// ==========================================================
// Validate Document Name
// ==========================================================

export function validateDocumentName(
    documentName
) {

    requireValue(
        documentName,
        "Document name"
    );


    const value =
        String(
            documentName
        ).trim();


    if (
        value.length > 255
    ) {

        throw new Error(
            "Document name cannot exceed 255 characters."
        );

    }


    return value;

}


// ==========================================================
// Validate File Name
// ==========================================================

export function validateFileName(
    fileName
) {

    if (
        fileName === undefined ||
        fileName === null ||
        fileName === ""
    ) {

        return null;

    }


    const value =
        String(
            fileName
        ).trim();


    if (
        value.length > 255
    ) {

        throw new Error(
            "File name cannot exceed 255 characters."
        );

    }


    return value;

}


// ==========================================================
// Validate File URL
// ==========================================================

export function validateFileUrl(
    fileUrl
) {

    if (
        fileUrl === undefined ||
        fileUrl === null ||
        fileUrl === ""
    ) {

        return null;

    }


    const value =
        String(
            fileUrl
        ).trim();


    if (
        value.length === 0
    ) {

        return null;

    }


    return value;

}


// ==========================================================
// Validate Storage Provider
// ==========================================================

export function validateStorageProvider(
    storageProvider
) {

    if (
        storageProvider === undefined ||
        storageProvider === null ||
        storageProvider === ""
    ) {

        return null;

    }


    const normalizedProvider =
        String(
            storageProvider
        ).toUpperCase();


    if (
        !ALLOWED_STORAGE_PROVIDERS.includes(
            normalizedProvider
        )
    ) {

        throw new Error(
            `Invalid storage provider. Allowed values: ${ALLOWED_STORAGE_PROVIDERS.join(", ")}.`
        );

    }


    return normalizedProvider;

}


// ==========================================================
// Validate MIME Type
// ==========================================================

export function validateMimeType(
    mimeType
) {

    if (
        mimeType === undefined ||
        mimeType === null ||
        mimeType === ""
    ) {

        return null;

    }


    const value =
        String(
            mimeType
        ).trim();


    if (
        value.length > 100
    ) {

        throw new Error(
            "MIME type cannot exceed 100 characters."
        );

    }


    if (
        !value.includes("/")
    ) {

        throw new Error(
            "MIME type must be valid."
        );

    }


    return value;

}


// ==========================================================
// Validate File Size
// ==========================================================

export function validateFileSize(
    fileSizeBytes
) {

    if (
        fileSizeBytes === undefined ||
        fileSizeBytes === null ||
        fileSizeBytes === ""
    ) {

        return null;

    }


    const size =
        Number(
            fileSizeBytes
        );


    if (
        !Number.isInteger(
            size
        ) ||
        size < 0
    ) {

        throw new Error(
            "File size must be a valid non-negative integer."
        );

    }


    return size;

}


// ==========================================================
// Validate Document Number
// ==========================================================

export function validateDocumentNumber(
    documentNumber
) {

    if (
        documentNumber === undefined ||
        documentNumber === null ||
        documentNumber === ""
    ) {

        return null;

    }


    const value =
        String(
            documentNumber
        ).trim();


    if (
        value.length > 100
    ) {

        throw new Error(
            "Document number cannot exceed 100 characters."
        );

    }


    return value;

}


// ==========================================================
// Validate Verification Status
// ==========================================================

export function validateVerificationStatus(
    status
) {

    if (
        status === undefined ||
        status === null ||
        status === ""
    ) {

        return "PENDING";

    }


    const normalizedStatus =
        String(
            status
        ).toUpperCase();


    if (
        !ALLOWED_VERIFICATION_STATUSES.includes(
            normalizedStatus
        )
    ) {

        throw new Error(
            `Invalid verification status. Allowed values: ${ALLOWED_VERIFICATION_STATUSES.join(", ")}.`
        );

    }


    return normalizedStatus;

}


// ==========================================================
// Validate Rejection Reason
// ==========================================================

export function validateRejectionReason(
    rejectionReason
) {

    if (
        rejectionReason === undefined ||
        rejectionReason === null
    ) {

        return null;

    }


    const value =
        String(
            rejectionReason
        ).trim();


    if (
        value.length > 5000
    ) {

        throw new Error(
            "Rejection reason cannot exceed 5000 characters."
        );

    }


    return value || null;

}


// ==========================================================
// Validate Expiry Date
// ==========================================================

export function validateDocumentExpiryDate(
    expiryDate
) {

    if (
        expiryDate === undefined ||
        expiryDate === null ||
        expiryDate === ""
    ) {

        return null;

    }


    const date =
        new Date(
            expiryDate
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            "Expiry date must be a valid date."
        );

    }


    return expiryDate;

}


// ==========================================================
// Validate Uploaded By User ID
// ==========================================================

export function validateUploadedByUserId(
    userId
) {

    return validateOptionalPositiveInteger(
        userId,
        "Uploaded by user ID"
    );

}


// ==========================================================
// Validate Verified By User ID
// ==========================================================

export function validateVerifiedByUserId(
    userId
) {

    return validateOptionalPositiveInteger(
        userId,
        "Verified by user ID"
    );

}


// ==========================================================
// Validate Verified At
// ==========================================================

export function validateVerifiedAt(
    verifiedAt
) {

    if (
        verifiedAt === undefined ||
        verifiedAt === null ||
        verifiedAt === ""
    ) {

        return null;

    }


    const date =
        new Date(
            verifiedAt
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        throw new Error(
            "Verified timestamp must be a valid date and time."
        );

    }


    return verifiedAt;

}


// ==========================================================
// Validate Create Document Data
// ==========================================================

export function validateLoanDocumentCreate(
    documentData
) {

    if (
        !documentData ||
        typeof documentData !== "object"
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
        file_name,
        file_url,
        storage_provider,
        mime_type,
        file_size_bytes,
        document_number,
        verification_status,
        rejection_reason,
        uploaded_by_user_id,
        verified_by_user_id,
        verified_at,
        expiry_date
    } = documentData;


    const normalizedStatus =
        validateVerificationStatus(
            verification_status
        );


    const normalizedRejectionReason =
        validateRejectionReason(
            rejection_reason
        );


    if (
        normalizedStatus !== "REJECTED" &&
        normalizedRejectionReason
    ) {

        throw new Error(
            "Rejection reason can only be provided for a rejected document."
        );

    }


    if (
        normalizedStatus === "REJECTED" &&
        !normalizedRejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when document status is REJECTED."
        );

    }


    const validatedData = {

        ...documentData,

        loan_application_id:
            validateLoanDocumentApplicationId(
                loan_application_id
            ),

        loan_id:
            validateLoanDocumentLoanId(
                loan_id
            ),

        user_id:
            validateLoanDocumentUserId(
                user_id
            ),

        document_type:
            validateDocumentType(
                document_type
            ),

        document_category:
            validateDocumentCategory(
                document_category
            ),

        document_name:
            validateDocumentName(
                document_name
            ),

        file_name:
            validateFileName(
                file_name
            ),

        file_url:
            validateFileUrl(
                file_url
            ),

        storage_provider:
            validateStorageProvider(
                storage_provider
            ),

        mime_type:
            validateMimeType(
                mime_type
            ),

        file_size_bytes:
            validateFileSize(
                file_size_bytes
            ),

        document_number:
            validateDocumentNumber(
                document_number
            ),

        verification_status:
            normalizedStatus,

        rejection_reason:
            normalizedRejectionReason,

        uploaded_by_user_id:
            validateUploadedByUserId(
                uploaded_by_user_id
            ),

        verified_by_user_id:
            validateVerifiedByUserId(
                verified_by_user_id
            ),

        verified_at:
            validateVerifiedAt(
                verified_at
            ),

        expiry_date:
            validateDocumentExpiryDate(
                expiry_date
            )

    };


    return validatedData;

}


// ==========================================================
// Validate Update Document Data
// ==========================================================

export function validateLoanDocumentUpdate(
    documentData
) {

    if (
        !documentData ||
        typeof documentData !== "object"
    ) {

        throw new Error(
            "Loan document data is required."
        );

    }


    const validatedData = {

        ...documentData

    };


    if (
        documentData.document_type !==
        undefined
    ) {

        validatedData.document_type =
            validateDocumentType(
                documentData.document_type
            );

    }


    if (
        documentData.document_category !==
        undefined
    ) {

        validatedData.document_category =
            validateDocumentCategory(
                documentData.document_category
            );

    }


    if (
        documentData.document_name !==
        undefined
    ) {

        validatedData.document_name =
            validateDocumentName(
                documentData.document_name
            );

    }


    if (
        documentData.file_name !==
        undefined
    ) {

        validatedData.file_name =
            validateFileName(
                documentData.file_name
            );

    }


    if (
        documentData.file_url !==
        undefined
    ) {

        validatedData.file_url =
            validateFileUrl(
                documentData.file_url
            );

    }


    if (
        documentData.storage_provider !==
        undefined
    ) {

        validatedData.storage_provider =
            validateStorageProvider(
                documentData.storage_provider
            );

    }


    if (
        documentData.mime_type !==
        undefined
    ) {

        validatedData.mime_type =
            validateMimeType(
                documentData.mime_type
            );

    }


    if (
        documentData.file_size_bytes !==
        undefined
    ) {

        validatedData.file_size_bytes =
            validateFileSize(
                documentData.file_size_bytes
            );

    }


    if (
        documentData.document_number !==
        undefined
    ) {

        validatedData.document_number =
            validateDocumentNumber(
                documentData.document_number
            );

    }


    if (
        documentData.expiry_date !==
        undefined
    ) {

        validatedData.expiry_date =
            validateDocumentExpiryDate(
                documentData.expiry_date
            );

    }


    return validatedData;

}


// ==========================================================
// Validate Verification Status Update
// ==========================================================

export function validateLoanDocumentVerificationUpdate(
    verificationData
) {

    if (
        !verificationData ||
        typeof verificationData !== "object"
    ) {

        throw new Error(
            "Document verification data is required."
        );

    }


    const {
        verification_status,
        rejection_reason,
        verified_by_user_id
    } = verificationData;


    const status =
        validateVerificationStatus(
            verification_status
        );


    const rejectionReason =
        validateRejectionReason(
            rejection_reason
        );


    if (
        status === "REJECTED" &&
        !rejectionReason
    ) {

        throw new Error(
            "Rejection reason is required when document status is REJECTED."
        );

    }


    if (
        status !== "REJECTED" &&
        rejectionReason
    ) {

        throw new Error(
            "Rejection reason can only be provided when document status is REJECTED."
        );

    }


    return {

        verification_status:
            status,

        rejection_reason:
            rejectionReason,

        verified_by_user_id:
            validateVerifiedByUserId(
                verified_by_user_id
            )

    };

}


// ==========================================================
// Validate Document ID
// ==========================================================

export function validateLoanDocumentId(
    documentId
) {

    requireValue(
        documentId,
        "Loan document ID"
    );


    return validatePositiveInteger(
        documentId,
        "Loan document ID"
    );

}


// ==========================================================
// Export Constants
// ==========================================================

export {
    ALLOWED_DOCUMENT_CATEGORIES,
    ALLOWED_VERIFICATION_STATUSES,
    ALLOWED_STORAGE_PROVIDERS
};


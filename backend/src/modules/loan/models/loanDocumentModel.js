/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Model
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/models/loanDocumentModel.js
 *
 * Database Table:
 * loan_documents
 *
 * Responsibility:
 *
 * - Fetch all loan documents
 * - Fetch document by ID
 * - Fetch documents by loan application
 * - Fetch documents by loan
 * - Fetch documents by user
 * - Create loan document
 * - Update loan document
 * - Update verification status
 * - Delete loan document
 *
 * ==========================================================
 */

import pool from "../../../config/db.js";


// ==========================================================
// Get All Loan Documents
// ==========================================================

export async function getAllLoanDocuments() {

    const [rows] = await pool.query(
        `
        SELECT
            id,
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
            expiry_date,
            created_at,
            updated_at
        FROM loan_documents
        ORDER BY created_at DESC
        `
    );

    return rows;
}


// ==========================================================
// Get Loan Document By ID
// ==========================================================

export async function getLoanDocumentById(
    documentId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
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
            expiry_date,
            created_at,
            updated_at
        FROM loan_documents
        WHERE id = ?
        LIMIT 1
        `,
        [documentId]
    );

    return rows[0] || null;
}


// ==========================================================
// Get Documents By Loan Application
// ==========================================================

export async function getLoanDocumentsByApplicationId(
    applicationId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
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
            expiry_date,
            created_at,
            updated_at
        FROM loan_documents
        WHERE loan_application_id = ?
        ORDER BY created_at DESC
        `,
        [applicationId]
    );

    return rows;
}


// ==========================================================
// Get Documents By Loan
// ==========================================================

export async function getLoanDocumentsByLoanId(
    loanId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
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
            expiry_date,
            created_at,
            updated_at
        FROM loan_documents
        WHERE loan_id = ?
        ORDER BY created_at DESC
        `,
        [loanId]
    );

    return rows;
}


// ==========================================================
// Get Documents By User
// ==========================================================

export async function getLoanDocumentsByUserId(
    userId
) {

    const [rows] = await pool.query(
        `
        SELECT
            id,
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
            expiry_date,
            created_at,
            updated_at
        FROM loan_documents
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return rows;
}


// ==========================================================
// Create Loan Document
// ==========================================================

export async function createLoanDocument(
    documentData
) {

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


    const [result] = await pool.query(
        `
        INSERT INTO loan_documents
        (
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
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?
        )
        `,
        [
            loan_application_id ?? null,
            loan_id ?? null,
            user_id,
            document_type,
            document_category ?? "OTHER",
            document_name,
            file_name ?? null,
            file_url ?? null,
            storage_provider ?? null,
            mime_type ?? null,
            file_size_bytes ?? null,
            document_number ?? null,
            verification_status ?? "PENDING",
            rejection_reason ?? null,
            uploaded_by_user_id ?? null,
            verified_by_user_id ?? null,
            verified_at ?? null,
            expiry_date ?? null
        ]
    );

    return result.insertId;
}


// ==========================================================
// Update Loan Document
// ==========================================================

export async function updateLoanDocument(
    documentId,
    documentData
) {

    const {
        document_type,
        document_category,
        document_name,
        file_name,
        file_url,
        storage_provider,
        mime_type,
        file_size_bytes,
        document_number,
        expiry_date
    } = documentData;


    const [result] = await pool.query(
        `
        UPDATE loan_documents
        SET
            document_type = ?,
            document_category = ?,
            document_name = ?,
            file_name = ?,
            file_url = ?,
            storage_provider = ?,
            mime_type = ?,
            file_size_bytes = ?,
            document_number = ?,
            expiry_date = ?
        WHERE id = ?
        `,
        [
            document_type,
            document_category ?? "OTHER",
            document_name,
            file_name ?? null,
            file_url ?? null,
            storage_provider ?? null,
            mime_type ?? null,
            file_size_bytes ?? null,
            document_number ?? null,
            expiry_date ?? null,
            documentId
        ]
    );

    return result;
}


// ==========================================================
// Update Document Verification Status
// ==========================================================

export async function updateLoanDocumentVerificationStatus(
    documentId,
    verificationStatus,
    rejectionReason = null,
    verifiedByUserId = null
) {

    let query = `
        UPDATE loan_documents
        SET
            verification_status = ?
    `;

    const values = [
        verificationStatus
    ];


    // ======================================================
    // Verified
    // ======================================================

    if (
        verificationStatus === "VERIFIED"
    ) {

        query += `,
            verified_by_user_id = ?,
            verified_at = CURRENT_TIMESTAMP,
            rejection_reason = NULL
        `;

        values.push(
            verifiedByUserId
        );

    }


    // ======================================================
    // Rejected
    // ======================================================

    else if (
        verificationStatus === "REJECTED"
    ) {

        query += `,
            verified_by_user_id = ?,
            verified_at = NULL,
            rejection_reason = ?
        `;

        values.push(
            verifiedByUserId,
            rejectionReason
        );

    }


    // ======================================================
    // Pending / Expired
    // ======================================================

    else {

        query += `,
            verified_by_user_id = NULL,
            verified_at = NULL,
            rejection_reason = NULL
        `;

    }


    query += `
        WHERE id = ?
    `;

    values.push(
        documentId
    );


    const [result] = await pool.query(
        query,
        values
    );

    return result;
}


// ==========================================================
// Delete Loan Document
// ==========================================================

export async function deleteLoanDocument(
    documentId
) {

    const [result] = await pool.query(
        `
        DELETE FROM loan_documents
        WHERE id = ?
        `,
        [documentId]
    );

    return result;
}


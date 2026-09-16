/**
 * ==========================================================
 * FINVERSE
 * Ensure Loan Lifecycle Extended Tables Schema
 * Automatically provisions MySQL tables for KFS, Agreements,
 * Ledger, Collections, Foreclosures and NOCs
 * ==========================================================
 */

import pool from "../../../config/db.js";

export async function ensureLoanLifecycleTables() {
    try {
        // 1. Key Facts Statement (KFS)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS loan_kfs_records (
                id INT AUTO_INCREMENT PRIMARY KEY,
                application_id INT NOT NULL,
                loan_id INT NULL,
                kfs_number VARCHAR(50) UNIQUE NOT NULL,
                sanctioned_amount DECIMAL(15,2) NOT NULL,
                interest_rate DECIMAL(5,2) NOT NULL,
                apr DECIMAL(5,2) NOT NULL,
                tenure_months INT NOT NULL,
                emi_amount DECIMAL(15,2) NOT NULL,
                total_interest DECIMAL(15,2) NOT NULL,
                processing_fee DECIMAL(15,2) DEFAULT 0.00,
                documentation_fee DECIMAL(15,2) DEFAULT 0.00,
                insurance_charge DECIMAL(15,2) DEFAULT 0.00,
                total_repayment DECIMAL(15,2) NOT NULL,
                penal_charge_rules TEXT,
                foreclosure_terms TEXT,
                version INT DEFAULT 1,
                status ENUM('GENERATED', 'ACCEPTED', 'EXPIRED') DEFAULT 'GENERATED',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 2. Digital Loan Agreements
        await pool.query(`
            CREATE TABLE IF NOT EXISTS loan_agreements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                application_id INT NOT NULL,
                agreement_number VARCHAR(50) UNIQUE NOT NULL,
                agreement_document_url VARCHAR(255) NULL,
                version VARCHAR(10) DEFAULT 'v1.0',
                status ENUM('DRAFT', 'GENERATED', 'SENT', 'VIEWED', 'ACCEPTED', 'SIGNED', 'REJECTED') DEFAULT 'DRAFT',
                accepted_at TIMESTAMP NULL,
                signed_ip VARCHAR(45) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 3. Double-Entry Transaction Ledger
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ledger_transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                transaction_id VARCHAR(64) UNIQUE NOT NULL,
                loan_id INT NOT NULL,
                customer_id INT NOT NULL,
                transaction_type ENUM('DISBURSEMENT', 'PRINCIPAL_PAYMENT', 'INTEREST_PAYMENT', 'FEE_PAYMENT', 'PENALTY', 'WAIVER', 'REFUND', 'ADJUSTMENT', 'FORECLOSURE', 'WRITE_OFF') NOT NULL,
                amount DECIMAL(15,2) NOT NULL,
                allocation_json JSON NULL,
                reference_number VARCHAR(100) NULL,
                created_by INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 4. Collections & Promise To Pay
        await pool.query(`
            CREATE TABLE IF NOT EXISTS loan_collections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                loan_id INT NOT NULL,
                customer_id INT NOT NULL,
                officer_id INT NULL,
                dpd_bucket ENUM('0', '1-30', '31-60', '61-90', '90+') DEFAULT '0',
                promise_date DATE NULL,
                promise_amount DECIMAL(15,2) NULL,
                ptp_status ENUM('PENDING', 'KEPT', 'BROKEN') DEFAULT 'PENDING',
                collection_status ENUM('ASSIGNED', 'CONTACTED', 'PROMISE_TO_PAY', 'PARTIAL_PAYMENT', 'FOLLOW_UP', 'ESCALATED', 'RESOLVED', 'UNREACHABLE') DEFAULT 'ASSIGNED',
                notes TEXT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 5. Foreclosure & Prepayment Engine
        await pool.query(`
            CREATE TABLE IF NOT EXISTS loan_foreclosures (
                id INT AUTO_INCREMENT PRIMARY KEY,
                loan_id INT NOT NULL,
                foreclosure_number VARCHAR(50) UNIQUE NOT NULL,
                outstanding_principal DECIMAL(15,2) NOT NULL,
                accrued_interest DECIMAL(15,2) NOT NULL,
                pending_penalties DECIMAL(15,2) DEFAULT 0.00,
                foreclosure_fee DECIMAL(15,2) DEFAULT 0.00,
                final_settlement_amount DECIMAL(15,2) NOT NULL,
                status ENUM('REQUESTED', 'CALCULATED', 'APPROVAL_PENDING', 'APPROVED', 'PAID', 'CLOSED') DEFAULT 'REQUESTED',
                processed_at TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 6. No Objection Certificate (NOC)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS loan_nocs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                loan_id INT NOT NULL,
                noc_number VARCHAR(50) UNIQUE NOT NULL,
                noc_document_url VARCHAR(255) NULL,
                issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status ENUM('ISSUED', 'REVOKED') DEFAULT 'ISSUED'
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        console.log("✅ Loan Lifecycle MySQL tables ensured successfully.");
    } catch (error) {
        console.error("❌ Error ensuring loan lifecycle tables:", error.message);
    }
}

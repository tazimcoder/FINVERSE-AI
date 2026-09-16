/**
 * ==========================================================
 * FINVERSE AI
 * User Features Database Model
 * ==========================================================
 * - Table migrations for user_kyc, emi_repayments, user_cibil, user_documents, user_notifications
 * - Query & Mutation methods for database
 * ==========================================================
 */

import pool from "../config/db.js";

/* ----------------------------------------------------------
   Ensure Database Tables Exist (Auto-Migration)
---------------------------------------------------------- */
export async function ensureUserFeaturesTables() {
    try {
        // 1. User KYC Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_kyc (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                status VARCHAR(20) DEFAULT 'VERIFIED',
                aadhaar_masked VARCHAR(20) DEFAULT 'XXXX-XXXX-8892',
                pan_number VARCHAR(20) DEFAULT 'ABCDE1234F',
                verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 2. EMI Repayments Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS emi_repayments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                loan_type VARCHAR(50) NOT NULL,
                amount DECIMAL(12,2) NOT NULL,
                due_date DATE NOT NULL,
                status VARCHAR(20) DEFAULT 'DUE',
                transaction_ref VARCHAR(100) DEFAULT NULL,
                paid_at DATETIME DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 3. User CIBIL Credit Score Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_cibil (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL UNIQUE,
                cibil_score INT DEFAULT 785,
                credit_rating VARCHAR(30) DEFAULT 'Excellent',
                payment_history_score INT DEFAULT 98,
                credit_utilization_pct INT DEFAULT 18,
                credit_age_years DECIMAL(4,1) DEFAULT 4.5,
                last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 4. User Documents Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_documents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                doc_type VARCHAR(50) NOT NULL,
                doc_name VARCHAR(255) NOT NULL,
                ocr_extracted_json JSON DEFAULT NULL,
                status VARCHAR(20) DEFAULT 'VERIFIED',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 5. User Real-Time Notifications Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                type VARCHAR(50) DEFAULT 'LOAN',
                is_read TINYINT(1) DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 6. User Emergency Savings Vaults Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_vaults (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                vault_name VARCHAR(100) NOT NULL,
                target_amount DECIMAL(12,2) DEFAULT 50000.00,
                current_balance DECIMAL(12,2) DEFAULT 12500.00,
                category VARCHAR(50) DEFAULT 'EMERGENCY',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 7. User Rewards & FinCoins Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_rewards (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL UNIQUE,
                coin_balance INT DEFAULT 450,
                tier VARCHAR(30) DEFAULT 'PLATINUM',
                total_earned INT DEFAULT 1200,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        // 9. User Property Valuations Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_property_valuations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                property_type VARCHAR(50) DEFAULT 'RESIDENTIAL_FLAT',
                location_name VARCHAR(255) NOT NULL,
                area_sqft DECIMAL(12,2) NOT NULL,
                circle_rate DECIMAL(12,2) NOT NULL,
                market_value DECIMAL(12,2) NOT NULL,
                distress_value DECIMAL(12,2) NOT NULL,
                max_loan_ltv DECIMAL(12,2) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        console.log("✅ User Features extended database tables initialized.");
    } catch (err) {
        console.warn("⚠️ User Features table initialization warning:", err.message);
    }
}

/* ----------------------------------------------------------
   KYC Methods
---------------------------------------------------------- */
export async function getKycByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_kyc WHERE user_id = ? LIMIT 1`,
        [userId]
    );

    if (rows.length === 0) {
        await pool.execute(
            `INSERT INTO user_kyc (user_id, status, aadhaar_masked, pan_number) VALUES (?, 'VERIFIED', 'XXXX-XXXX-8892', 'ABCDE1234F')`,
            [userId]
        );
        return {
            status: "VERIFIED",
            aadhaar_masked: "XXXX-XXXX-8892",
            pan_number: "ABCDE1234F",
            verified_at: new Date(),
        };
    }
    return rows[0];
}

/* ----------------------------------------------------------
   CIBIL Methods
---------------------------------------------------------- */
export async function getCibilByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_cibil WHERE user_id = ? LIMIT 1`,
        [userId]
    );

    if (rows.length === 0) {
        await pool.execute(
            `INSERT INTO user_cibil (user_id, cibil_score, credit_rating, payment_history_score, credit_utilization_pct, credit_age_years)
             VALUES (?, 785, 'Excellent', 98, 18, 4.5)`,
            [userId]
        );
        return {
            cibil_score: 785,
            credit_rating: "Excellent",
            payment_history_score: 98,
            credit_utilization_pct: 18,
            credit_age_years: 4.5,
        };
    }
    return rows[0];
}

/* ----------------------------------------------------------
   EMI Repayment Methods
---------------------------------------------------------- */
export async function getEmisByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM emi_repayments WHERE user_id = ? ORDER BY due_date ASC`,
        [userId]
    );

    if (rows.length === 0) {
        const sampleDueDate1 = new Date();
        sampleDueDate1.setDate(sampleDueDate1.getDate() + 5);

        const sampleDueDate2 = new Date();
        sampleDueDate2.setDate(sampleDueDate2.getDate() + 35);

        await pool.execute(
            `INSERT INTO emi_repayments (user_id, loan_type, amount, due_date, status) VALUES
             (?, 'Home Loan EMI', 14500.00, ?, 'DUE'),
             (?, 'Personal Loan EMI', 3800.00, ?, 'DUE')`,
            [userId, sampleDueDate1.toISOString().slice(0, 10), userId, sampleDueDate2.toISOString().slice(0, 10)]
        );

        const [newRows] = await pool.execute(
            `SELECT * FROM emi_repayments WHERE user_id = ? ORDER BY due_date ASC`,
            [userId]
        );
        return newRows;
    }
    return rows;
}

export async function payEmiById(emiId, userId, transactionRef) {
    const [res] = await pool.execute(
        `UPDATE emi_repayments SET status = 'PAID', transaction_ref = ?, paid_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
        [transactionRef, emiId, userId]
    );

    if (res.affectedRows > 0) {
        // Create user-specific notification for EMI payment in MySQL DB
        await createNotificationForUser(
            userId,
            "EMI Payment Confirmation",
            `Your payment of EMI ID #${emiId} was successfully processed. Ref: ${transactionRef}`,
            "PAYMENT"
        );
    }

    return res.affectedRows > 0;
}

/* ----------------------------------------------------------
   Document OCR Methods
---------------------------------------------------------- */
export async function saveDocumentOcr(userId, docType, docName, ocrJson) {
    const [res] = await pool.execute(
        `INSERT INTO user_documents (user_id, doc_type, doc_name, ocr_extracted_json, status) VALUES (?, ?, ?, ?, 'VERIFIED')`,
        [userId, docType, docName, JSON.stringify(ocrJson)]
    );

    // Create user-specific notification for Document OCR verification in MySQL DB
    await createNotificationForUser(
        userId,
        "AI OCR Verification Success",
        `Your document "${docName}" (${docType}) has been verified and stored in your vault.`,
        "KYC"
    );

    return res.insertId;
}

export async function getDocumentsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_documents WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
}

/* ----------------------------------------------------------
   Real-Time User Notifications Methods
---------------------------------------------------------- */
export async function createNotificationForUser(userId, title, description, type = "INFO") {
    const [res] = await pool.execute(
        `INSERT INTO user_notifications (user_id, title, description, type, is_read) VALUES (?, ?, ?, ?, 0)`,
        [userId, title, description, type]
    );
    return res.insertId;
}

export async function getNotificationsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
        [userId]
    );

    if (rows.length === 0) {
        // Seed personalized user-specific initial notifications
        await createNotificationForUser(
            userId,
            "Welcome to FINVERSE AI",
            "Your digital loan account has been activated with 100% paperless approval.",
            "SYSTEM"
        );
        await createNotificationForUser(
            userId,
            "Home Loan Sanction Offer",
            "Your Home Loan sanction offer of ₹25,00,000 is ready for digital e-sign.",
            "LOAN"
        );
        await createNotificationForUser(
            userId,
            "Upcoming EMI Repayment",
            "Your monthly Home Loan EMI of ₹14,500 is due in 5 days.",
            "EMI"
        );

        const [newRows] = await pool.execute(
            `SELECT * FROM user_notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
            [userId]
        );
        return newRows;
    }

    return rows;
}

export async function markNotificationRead(userId, notificationId) {
    await pool.execute(
        `UPDATE user_notifications SET is_read = 1 WHERE id = ? AND user_id = ?`,
        [notificationId, userId]
    );
}

export async function markAllNotificationsRead(userId) {
    await pool.execute(
        `UPDATE user_notifications SET is_read = 1 WHERE user_id = ?`,
        [userId]
    );
}

/* ----------------------------------------------------------
   Savings Vaults Methods
---------------------------------------------------------- */
export async function getVaultsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_vaults WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
    );

    if (rows.length === 0) {
        await pool.execute(
            `INSERT INTO user_vaults (user_id, vault_name, target_amount, current_balance, category) VALUES
             (?, 'Emergency Medical Reserve', 100000.00, 45000.00, 'HEALTH'),
             (?, 'Home Renovation Vault', 50000.00, 18500.00, 'GOAL')`,
            [userId, userId]
        );
        const [newRows] = await pool.execute(
            `SELECT * FROM user_vaults WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        return newRows;
    }
    return rows;
}

export async function createVaultForUser(userId, vaultName, targetAmount, category = 'GOAL') {
    const [res] = await pool.execute(
        `INSERT INTO user_vaults (user_id, vault_name, target_amount, current_balance, category) VALUES (?, ?, ?, 0.00, ?)`,
        [userId, vaultName, targetAmount, category]
    );
    await createNotificationForUser(userId, "Vault Created", `Your new savings vault "${vaultName}" was created.`, "VAULT");
    return res.insertId;
}

/* ----------------------------------------------------------
   Rewards & FinCoins Methods
---------------------------------------------------------- */
export async function getRewardsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_rewards WHERE user_id = ? LIMIT 1`,
        [userId]
    );

    if (rows.length === 0) {
        await pool.execute(
            `INSERT INTO user_rewards (user_id, coin_balance, tier, total_earned) VALUES (?, 650, 'PLATINUM', 1500)`,
            [userId]
        );
        return { coin_balance: 650, tier: 'PLATINUM', total_earned: 1500 };
    }
    return rows[0];
}

/* ----------------------------------------------------------
   Virtual Security Cards Methods
---------------------------------------------------------- */
export async function getVirtualCardsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_virtual_cards WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
    );

    if (rows.length === 0) {
        await pool.execute(
            `INSERT INTO user_virtual_cards (user_id, card_number_masked, card_holder, expiry_date, cvv_dynamic, spend_limit, is_active) VALUES
             (?, '4532 •••• •••• 9912', 'FINVERSE VERIFIED', '10/28', '842', 50000.00, 1)`,
            [userId]
        );
        const [newRows] = await pool.execute(
            `SELECT * FROM user_virtual_cards WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        return newRows;
    }
    return rows;
}

/* ----------------------------------------------------------
   Foreclosure & Loan Top-Up Methods
---------------------------------------------------------- */
export async function processForeclosureInDb(userId, loanId, amount, type = 'PARTIAL') {
    await createNotificationForUser(
        userId,
        type === 'FULL' ? "Loan Foreclosure Success" : "Loan Pre-Payment Confirmed",
        `Your payment of ₹${amount} towards loan ID #${loanId} was completed.`,
        "PAYMENT"
    );
    return { success: true, message: `Loan ${type} prepayment processed successfully.` };
}

export async function requestLoanTopUpInDb(userId, topUpAmount, tenureMonths) {
    await createNotificationForUser(
        userId,
        "Instant Top-Up Request Submitted",
        `Your top-up loan request of ₹${topUpAmount} for ${tenureMonths} months is under instant pre-sanction.`,
        "LOAN"
    );
    return { success: true, status: "PRE_APPROVED", refNo: `TOP_${Date.now()}` };
}

/* ----------------------------------------------------------
   FinverseMap Property Valuation Methods
---------------------------------------------------------- */
export async function savePropertyValuationInDb(userId, valuationData) {
    const { propertyType, locationName, areaSqft, circleRate, marketValue, distressValue, maxLoanLtv } = valuationData;
    const [res] = await pool.execute(
        `INSERT INTO user_property_valuations (user_id, property_type, location_name, area_sqft, circle_rate, market_value, distress_value, max_loan_ltv)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, propertyType || 'RESIDENTIAL_FLAT', locationName, areaSqft, circleRate, marketValue, distressValue, maxLoanLtv]
    );

    await createNotificationForUser(
        userId,
        "Property Valuation Generated",
        `Valuation report for property at ${locationName} saved. Market Value: ₹ ${parseFloat(marketValue).toLocaleString('en-IN')}`,
        "VALUATION"
    );

    return res.insertId;
}

export async function getPropertyValuationsByUserId(userId) {
    const [rows] = await pool.execute(
        `SELECT * FROM user_property_valuations WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
}



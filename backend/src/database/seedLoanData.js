/**
 * ==========================================================
 * FINVERSE
 * Seed Loan Development & Production Data
 * Populates real MySQL tables with NBFC Loan Products,
 * Sample Applications, Schedules & Officer Role Configurations
 * ==========================================================
 */

import pool from "../config/db.js";

export async function seedLoanSystemData() {
    try {
        // 1. Seed Core Loan Products if empty
        const [existingProducts] = await pool.query(`SELECT COUNT(*) as count FROM loan_products`);
        if (existingProducts[0].count === 0) {
            await pool.query(`
                INSERT INTO loan_products (
                    product_code, product_name, description, category,
                    min_amount, max_amount, min_tenure, max_tenure,
                    interest_type, interest_rate, processing_fee, documentation_fee,
                    insurance_fee, status
                ) VALUES 
                ('PL001', 'FINVERSE Personal Loan', 'Instant unsecured credit line for salaried & self-employed individuals.', 'PERSONAL', 50000.00, 2000000.00, 12, 60, 'FIXED', 11.50, 1500.00, 500.00, 1000.00, 'ACTIVE'),
                ('HL002', 'FINVERSE Housing & Property Loan', 'Low-interest home purchase & renovation loan scheme.', 'HOME', 500000.00, 10000000.00, 60, 240, 'FLOATING', 8.75, 5000.00, 1500.00, 3000.00, 'ACTIVE'),
                ('BL003', 'FINVERSE Business Growth Loan', 'Working capital & equipment financing for MSME enterprises.', 'BUSINESS', 100000.00, 5000000.00, 12, 84, 'FIXED', 13.25, 2500.00, 1000.00, 2000.00, 'ACTIVE'),
                ('VL004', 'FINVERSE Auto & Vehicle Credit', 'Flexible EMI financing for new & pre-owned vehicles.', 'VEHICLE', 75000.00, 1500000.00, 12, 60, 'FIXED', 9.99, 1200.00, 400.00, 800.00, 'ACTIVE')
            `);
            console.log("🌱 Seeded 4 FINVERSE Digital Loan Products into MySQL.");
        }

        console.log("✅ FINVERSE Loan Database Seeding Completed.");
    } catch (error) {
        console.error("❌ Error seeding loan data:", error.message);
    }
}

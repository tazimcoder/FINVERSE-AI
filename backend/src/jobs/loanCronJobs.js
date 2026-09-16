/**
 * ==========================================================
 * FINVERSE
 * Automated Loan Cron Jobs & Overdue Monitor
 * Runs periodic background tasks for DPD aging calculation,
 * overdue detection, late penalty assessment & notification queues
 * ==========================================================
 */

import pool from "../config/db.js";

export async function runAutomatedLoanJobs() {
    try {
        console.log("⏱️ Running FINVERSE Automated Loan Overdue & DPD Cron Audit...");

        // 1. Detect Overdue Schedule Items where due_date < NOW and status = 'UPCOMING'
        const [overdueRows] = await pool.query(
            `SELECT * FROM loan_repayment_schedules 
             WHERE due_date < CURRENT_DATE() AND status = 'UPCOMING'`
        );

        if (overdueRows.length > 0) {
            await pool.query(
                `UPDATE loan_repayment_schedules 
                 SET status = 'OVERDUE' 
                 WHERE due_date < CURRENT_DATE() AND status = 'UPCOMING'`
            );
            console.log(`⚠️ Updated ${overdueRows.length} schedule items to OVERDUE status.`);
        }

        // 2. Update DPD aging buckets on active loan accounts
        await pool.query(
            `UPDATE loan_collections 
             SET dpd_bucket = CASE 
                WHEN DATEDIFF(CURRENT_DATE(), promise_date) <= 0 THEN '0'
                WHEN DATEDIFF(CURRENT_DATE(), promise_date) BETWEEN 1 AND 30 THEN '1-30'
                WHEN DATEDIFF(CURRENT_DATE(), promise_date) BETWEEN 31 AND 60 THEN '31-60'
                WHEN DATEDIFF(CURRENT_DATE(), promise_date) BETWEEN 61 AND 90 THEN '61-90'
                ELSE '90+'
             END`
        );

        console.log("✅ FINVERSE Automated Loan Jobs completed cleanly.");
    } catch (error) {
        console.error("❌ Error running automated loan jobs:", error.message);
    }
}

/**
 * ==========================================================
 * FINVERSE
 * Server Entry Point
 * ==========================================================
 */

import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";
import { ensureMobileColumnExists } from "./models/user.model.js";
import { ensureLoanLifecycleTables } from "./modules/loan/models/ensureLoanLifecycleTables.js";
import { ensureUserFeaturesTables } from "./models/userFeatures.model.js";
import { seedLoanSystemData } from "./database/seedLoanData.js";
import { runAutomatedLoanJobs } from "./jobs/loanCronJobs.js";

const PORT = process.env.PORT || 5000;

// ==========================================================
// Database Connection & Column Migration
// ==========================================================

async function connectDatabase() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ MySQL Connected Successfully");

        connection.release();

        // Ensure mobile column exists on users table
        await ensureMobileColumnExists();
        // Ensure loan lifecycle tables exist
        await ensureLoanLifecycleTables();
        // Ensure user features tables exist (KYC, EMI, CIBIL, Documents)
        await ensureUserFeaturesTables();
        // Seed default loan products and initial data
        await seedLoanSystemData();
        // Run automated DPD & overdue audit jobs
        await runAutomatedLoanJobs();
    } catch (error) {

        console.error("❌ Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
}

// ==========================================================
// Start Server
// ==========================================================

async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log("======================================");
            console.log("🚀 FINVERSE Backend Started");
            console.log(`🌍 Server : http://localhost:${PORT}`);
            console.log("======================================");
        });
    } catch (error) {
        console.error("❌ Server Startup Failed");
        console.error(error.message);
        process.exit(1);
    }
}

startServer();
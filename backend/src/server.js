/**
 * ==========================================================
 * FINVERSE AI
 * Server Entry Point
 * ==========================================================
 */

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

/* ----------------------------------------
   Configuration
---------------------------------------- */

const PORT = process.env.PORT || 5000;

/* ----------------------------------------
   Database Connection
---------------------------------------- */

async function connectDatabase() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ MySQL Connected Successfully");

        connection.release();

    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);

        // Database connect nahi hua to application stop kar do
        process.exit(1);
    }
}

/* ----------------------------------------
   Start Server
---------------------------------------- */

async function startServer() {

    await connectDatabase();

    app.listen(PORT, () => {
        console.log("======================================");
        console.log("🚀 FINVERSE AI Backend Started");
        console.log(`🌍 Server : http://localhost:${PORT}`);
        console.log("======================================");
    });

}

startServer();
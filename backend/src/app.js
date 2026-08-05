/**
 * ==========================================================
 * FINVERSE AI
 * Express Application
 * ==========================================================
 */

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

/* ----------------------------------------
   Middlewares
---------------------------------------- */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ----------------------------------------
   Health Check Route
---------------------------------------- */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "FINVERSE AI Backend Running 🚀",

    });

});

/* ----------------------------------------
   API Routes
---------------------------------------- */

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/accounts", accountRoutes);

app.use("/api/v1/transactions", transactionRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

/* ----------------------------------------
   404 Route
---------------------------------------- */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found",

    });

});

export default app;
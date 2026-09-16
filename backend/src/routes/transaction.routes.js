/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Routes
 * Protected & User-Specific
 * ==========================================================
 */

import { Router } from "express";

import {

   createTransaction,

   getTransactions,

   getTransactionById,

   updateTransaction,

   deleteTransaction,

} from "../controllers/transaction.controller.js";

import {

   authenticateToken,

} from "../middleware/auth.middleware.js";


const router = Router();


/* ==========================================================
Create Transaction

POST /api/v1/transactions

Protected Route
Requires Valid JWT
========================================================== */

router.post(

   "/",

   authenticateToken,

   createTransaction

);


/* ==========================================================
Get All Transactions

GET /api/v1/transactions

Protected Route
Only Logged-in User Transactions
========================================================== */

router.get(

   "/",

   authenticateToken,

   getTransactions

);


/* ==========================================================
Get Transaction By Id

GET /api/v1/transactions/:id

Protected Route
User-Specific
========================================================== */

router.get(

   "/:id",

   authenticateToken,

   getTransactionById

);


/* ==========================================================
Update Transaction

PUT /api/v1/transactions/:id

Protected Route
User-Specific
========================================================== */

router.put(

   "/:id",

   authenticateToken,

   updateTransaction

);


/* ==========================================================
Delete Transaction

DELETE /api/v1/transactions/:id

Protected Route
User-Specific
========================================================== */

router.delete(

   "/:id",

   authenticateToken,

   deleteTransaction

);


export default router;
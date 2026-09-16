import express from "express";
import { getNocByLoan } from "../controllers/loanNocController.js";

const router = express.Router();

router.get("/loan/:loanId", getNocByLoan);

export default router;

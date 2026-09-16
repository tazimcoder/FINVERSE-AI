import express from "express";
import { getForeclosureByLoan, processPayoff } from "../controllers/loanForeclosureController.js";

const router = express.Router();

router.get("/loan/:loanId", getForeclosureByLoan);
router.post("/:id/payoff", processPayoff);

export default router;

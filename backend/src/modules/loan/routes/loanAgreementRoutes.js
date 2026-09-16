import express from "express";
import { getAgreementByApplication, acceptAgreement } from "../controllers/loanAgreementController.js";

const router = express.Router();

router.get("/application/:applicationId", getAgreementByApplication);
router.patch("/:id/accept", acceptAgreement);

export default router;

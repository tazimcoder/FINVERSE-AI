import express from "express";
import { getKfsByApplication, generateKfs, acceptKfsOffer } from "../controllers/loanKfsController.js";

const router = express.Router();

router.get("/application/:applicationId", getKfsByApplication);
router.post("/", generateKfs);
router.patch("/:id/accept", acceptKfsOffer);

export default router;

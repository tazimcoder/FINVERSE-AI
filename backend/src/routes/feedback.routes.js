import express from "express";

import {

    saveFeedback,

} from "../controllers/feedback.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(

    "/",

    authenticateToken,

    saveFeedback

);


export default router;
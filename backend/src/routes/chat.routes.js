/**
 * ==========================================================
 * FINVERSE AI
 * Chat Routes
 * ==========================================================
 */

import express from "express";

import {
    createChat,
    getChats,
    getMessages,
    renameChat,
    deleteChat,
    favoriteChat,
} from "../controllers/chat.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply Authentication Middleware to All Chat Routes
router.use(authenticateToken);


/* ==========================================================
   Chat Routes
========================================================== */

router.post(
    "/",
    createChat
);

router.get(
    "/",
    getChats
);

router.get(
    "/:id/messages",
    getMessages
);

router.patch(
    "/:id",
    renameChat
);

router.delete(
    "/:id",
    deleteChat
);

router.patch(
    "/:id/favorite",
    favoriteChat
);

export default router;
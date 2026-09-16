/**
 * ==========================================================
 * FINVERSE AI
 * Chat API
 * ==========================================================
 */

import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api/v1/chats",

});

/* ==========================================================
   Create Chat
========================================================== */

export function createChat(title = "New Chat") {

    return API.post("/", {

        title,

    });

}

/* ==========================================================
   Get Chats
========================================================== */

export function getChats() {

    return API.get("/");

}

/* ==========================================================
   Get Messages
========================================================== */

export function getMessages(chatId) {

    return API.get(`/${chatId}/messages`);

}

/* ==========================================================
   Rename Chat
========================================================== */

export function renameChat(chatId, title) {

    return API.patch(`/${chatId}`, {

        title,

    });

}

/* ==========================================================
   Delete Chat
========================================================== */

export function deleteChat(chatId) {

    return API.delete(`/${chatId}`);

}

/* ==========================================================
   Favorite Chat
========================================================== */

export function favoriteChat(chatId) {

    return API.patch(`/${chatId}/favorite`);

}
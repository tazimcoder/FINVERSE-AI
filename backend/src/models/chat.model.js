/**
 * ==========================================================
 * FINVERSE AI
 * Chat Model
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
   Create Chat
========================================================== */

export async function createChat(userId, title = "New Chat") {

    const [result] = await pool.execute(

        `
        INSERT INTO chats
        (
            user_id,
            title
        )
        VALUES
        (?, ?)
        `,

        [

            userId,

            title,

        ]

    );

    return result.insertId;

}

/* ==========================================================
   Get All Chats
========================================================== */

export async function getChats(userId) {

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM chats
        WHERE user_id = ?
        ORDER BY updated_at DESC
        `,

        [

            userId,

        ]

    );

    return rows;

}

/* ==========================================================
   Get Chat By Id
========================================================== */

export async function getChat(chatId) {

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM chats
        WHERE id = ?
        LIMIT 1
        `,

        [

            chatId,

        ]

    );

    return rows[0];

}

/* ==========================================================
   Rename Chat
========================================================== */

export async function renameChat(

    chatId,

    userId,

    title

) {

    await pool.execute(

        `
        UPDATE chats
        SET
            title = ?
        WHERE
            id = ?
        AND
            user_id = ?
        `,

        [

            title,

            chatId,

            userId,

        ]

    );

}

/* ==========================================================
   Delete Chat
========================================================== */

export async function deleteChat(

    chatId,

    userId

) {

    await pool.execute(

        `
        DELETE FROM chats
        WHERE
            id = ?
        AND
            user_id = ?
        `,

        [

            chatId,

            userId,

        ]

    );

}

/* ==========================================================
   Favorite Chat
========================================================== */

export async function favoriteChat(

    chatId,

    userId

) {

    await pool.execute(

        `
        UPDATE chats
        SET
            is_favorite = NOT is_favorite
        WHERE
            id = ?
        AND
            user_id = ?
        `,

        [

            chatId,

            userId,

        ]

    );

}
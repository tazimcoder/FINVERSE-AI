/**
 * ==========================================================
 * FINVERSE AI
 * Chat Message Model
 * ==========================================================
 */

import pool from "../config/db.js";

/* ==========================================================
   Save Message
========================================================== */

export async function saveMessage(

    chatId,

    role,

    content

) {

    const [result] = await pool.execute(

        `
        INSERT INTO chat_messages
        (
            chat_id,
            role,
            content
        )
        VALUES
        (
            ?,
            ?,
            ?
        )
        `,

        [

            chatId,

            role,

            content,

        ]

    );

    return result.insertId;

}

/* ==========================================================
   Get Messages
========================================================== */

export async function getMessages(chatId) {

    const [rows] = await pool.execute(

        `
        SELECT
            id,
            role,
            content,
            created_at
        FROM chat_messages
        WHERE chat_id = ?
        ORDER BY id ASC
        `,

        [

            chatId,

        ]

    );

    return rows;

}
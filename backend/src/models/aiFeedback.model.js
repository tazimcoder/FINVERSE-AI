/**
 * ==========================================================
 * FINVERSE AI
 * AI Feedback Model
 * ==========================================================
 */

import pool from "../config/db.js";

export async function saveFeedback(

    message,

    response,

    feedback

) {

    const sql = `

        INSERT INTO ai_feedback

        (

            message,

            response,

            feedback

        )

        VALUES (?, ?, ?)

    `;

    await pool.execute(sql, [

        message,

        response,

        feedback,

    ]);

}
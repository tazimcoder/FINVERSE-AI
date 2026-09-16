/**
 * ==========================================================
 * FINVERSE AI
 * OpenRouter Provider
 * ==========================================================
 */

import axios from "axios";

export async function generateWithOpenRouter(prompt) {

    const response = await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {
            model: process.env.OPENROUTER_MODEL,
            messages: [

                {
                    role: "user",
                    content: prompt,
                },

            ],

        },

        {

            headers: {

                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

                "Content-Type": "application/json",

                "HTTP-Referer": "http://localhost:5000",

                "X-Title": "FINVERSE AI",

            },

        }

    );

    return response.data.choices[0].message.content;

}
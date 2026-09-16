/**
 * ==========================================================
 * FINVERSE AI
 * Gemini Provider
 * ==========================================================
 */

import ai from "../config/gemini.js";

export async function generateWithGemini(prompt) {

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",


        contents: prompt,

    });

    return response.text;

}
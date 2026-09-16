/**
 * ==========================================================
 * FINVERSE AI
 * AI Manager
 * ==========================================================
 */

import { generateWithGemini } from "../providers/gemini.provider.js";

import { generateWithOpenRouter } from "../providers/openrouter.provider.js";

export async function generateAIResponse(prompt) {

    /* ================= Gemini ================= */

    try {

        console.log("🚀 Trying Gemini...");

        return await generateWithGemini(prompt);

    }

    catch (error) {

        console.error(

            "❌ Gemini Failed:",

            error.message

        );

    }

    /* ================= OpenRouter ================= */

    try {

        console.log("Using OpenRouter...");

        const reply = await generateWithOpenRouter(prompt);

        console.log("✅ OpenRouter Success");

        return reply;

    }

    catch (error) {

        console.error(

            "OpenRouter Failed:",

            error.response?.data || error.message

        );

    }

    throw new Error("No AI provider is available. Please configure GEMINI_API_KEY or OPENROUTER_API_KEY.");

}
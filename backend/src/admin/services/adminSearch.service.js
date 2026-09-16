/**
 * ==========================================================
 * FINVERSE AI
 * Admin Search Service
 * ==========================================================
 */

import { searchGlobalPlatform } from "../models/adminSearch.model.js";

export async function searchAdminPlatformService(query) {
    if (!query || query.trim().length < 2) {
        return {
            users: [],
            accounts: [],
            transactions: [],
            loans: [],
        };
    }

    return await searchGlobalPlatform(query.trim());
}

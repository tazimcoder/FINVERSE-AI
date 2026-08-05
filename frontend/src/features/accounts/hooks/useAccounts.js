/**
 * ==========================================================
 * FINVERSE AI
 * useAccounts Hook
 * ==========================================================
 */

import { useCallback, useEffect, useState } from "react";

import { getAccountsService } from "../services/accountService";

export default function useAccounts() {

    const [accounts, setAccounts] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadAccounts = useCallback(async () => {

        try {

            setLoading(true);

            const response = await getAccountsService();

            setAccounts(response.data || []);

        }

        catch (error) {

            console.error("Failed to load accounts:", error);

        }

        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadAccounts();

    }, [loadAccounts]);

    return {

        accounts,

        loading,

        reload: loadAccounts,

    };

}
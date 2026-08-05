/**
 * ==========================================================
 * FINVERSE AI
 * useTransactions Hook
 * ==========================================================
 */

import { useEffect, useState } from "react";

import {

    getTransactionsService,

} from "../services/transactionService";

export default function useTransactions() {

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTransactions();

    }, []);

    async function loadTransactions() {

        try {

            const response = await getTransactionsService();

            setTransactions(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        transactions,

        loading,

        reload: loadTransactions,

    };

}
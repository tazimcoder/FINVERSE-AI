import { useState, useCallback } from "react";
import { getForeclosureByLoan, processPayoff } from "../api/loanForeclosureApi.js";

export default function useLoanForeclosures() {
    const [foreclosure, setForeclosure] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchForeclosure = useCallback(async (loanId) => {
        setLoading(true);
        try {
            const res = await getForeclosureByLoan(loanId);
            setForeclosure(res?.data || null);
        } catch {
            setForeclosure(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const executePayoff = useCallback(async (id, loanId) => {
        const res = await processPayoff(id, loanId);
        setForeclosure(res?.data || null);
        return res;
    }, []);

    return { foreclosure, loading, fetchForeclosure, executePayoff };
}

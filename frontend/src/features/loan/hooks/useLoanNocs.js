import { useState, useCallback } from "react";
import { getNocByLoan } from "../api/loanNocApi.js";

export default function useLoanNocs() {
    const [noc, setNoc] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchNoc = useCallback(async (loanId) => {
        setLoading(true);
        try {
            const res = await getNocByLoan(loanId);
            setNoc(res?.data || null);
        } catch {
            setNoc(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { noc, loading, fetchNoc };
}

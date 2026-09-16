import { useState, useCallback } from "react";
import { getAgreementByApplication, acceptAgreement } from "../api/loanAgreementApi.js";

export default function useLoanAgreements() {
    const [agreement, setAgreement] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAgreement = useCallback(async (appId) => {
        setLoading(true);
        try {
            const res = await getAgreementByApplication(appId);
            setAgreement(res?.data || null);
        } catch {
            setAgreement(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const signAgreement = useCallback(async (id) => {
        const res = await acceptAgreement(id);
        setAgreement(res?.data || null);
        return res;
    }, []);

    return { agreement, loading, fetchAgreement, signAgreement };
}

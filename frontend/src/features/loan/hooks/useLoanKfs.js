import { useState, useCallback } from "react";
import { getKfsByApplication, acceptKfsOffer } from "../api/loanKfsApi.js";

export default function useLoanKfs() {
    const [kfs, setKfs] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchKfs = useCallback(async (appId) => {
        setLoading(true);
        try {
            const res = await getKfsByApplication(appId);
            setKfs(res?.data || null);
        } catch {
            setKfs(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const acceptKfs = useCallback(async (id) => {
        const res = await acceptKfsOffer(id);
        setKfs(res?.data || null);
        return res;
    }, []);

    return { kfs, loading, fetchKfs, acceptKfs };
}

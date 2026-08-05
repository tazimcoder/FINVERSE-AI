/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Hook
 * ==========================================================
 */

import { useEffect, useState } from "react";

import { getDashboardService } from "../services/dashboardService";

export default function useDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const response = await getDashboardService();

            setDashboard(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        dashboard,

        loading,

        reload: loadDashboard,

    };

}
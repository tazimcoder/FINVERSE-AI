/**
 * ==========================================================
 * FINVERSE AI
 * Budget Hook
 * ==========================================================
 */

import { useEffect, useState } from "react";

import {

    getBudgetsService,

} from "../services/budgetService";

function useBudget() {

    const [budgets, setBudgets] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadBudgets() {

        try {

            const response = await getBudgetsService();

            setBudgets(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadBudgets();

    }, []);

    return {

        budgets,

        loading,

        reload: loadBudgets,

    };

}

export default useBudget;
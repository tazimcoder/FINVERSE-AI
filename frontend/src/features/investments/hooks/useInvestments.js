/**
 * ===========================================================
 * FINVERSE AI
 * Investment Hook
 * ===========================================================
 */

import { useEffect, useMemo, useState } from "react";

import {

    getInvestments,

    getInvestmentTypes,

    createInvestment,

    updateInvestment,

    deleteInvestment,

    getPortfolioSummary,

    getPortfolioAllocation,

    getPortfolioGrowth,

} from "../services/investmentService";

function useInvestments() {

    /* ========================================================== */

    const [investments, setInvestments] = useState([]);

    const [types, setTypes] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    /* ================= Portfolio ================= */

    const [summary, setSummary] = useState(null);

    const [allocation, setAllocation] = useState([]);

    /* ================= Portfolio Growth ================= */

    const [growth, setGrowth] = useState([]);

    /* ========================================================== */

    async function loadInvestments() {

        try {

            setLoading(true);

            setError("");

            const data = await getInvestments();

            setInvestments(data);

        }

        catch (error) {

            console.error(error);

            setError("Failed to load investments.");

        }

        finally {

            setLoading(false);

        }

    }

    /* ========================================================== */

    async function loadInvestmentTypes() {

        try {

            const data = await getInvestmentTypes();

            setTypes(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    /* ==========================================================
                Load Portfolio Summary
    ========================================================== */

    async function loadPortfolioSummary() {

        try {

            const data = await getPortfolioSummary();

            setSummary(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    /* ==========================================================
                    Load Portfolio Allocation
    ========================================================== */

    async function loadPortfolioAllocation() {

        try {

            const data = await getPortfolioAllocation();

            setAllocation(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    /* ==========================================================
                    Load Portfolio Growth
    ========================================================== */

    async function loadPortfolioGrowth() {

        try {

            const data = await getPortfolioGrowth();

            setGrowth(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    /* ========================================================== */

    async function addInvestment(data) {

        await createInvestment(data);

        await loadInvestments();

        await loadPortfolioSummary();

        await loadPortfolioAllocation();

    }

    /* ==========================================================
    Edit Investment
    ========================================================== */

    async function editInvestment(id, data) {

        await updateInvestment(id, data);

        await loadInvestments();

        await loadPortfolioSummary();

        await loadPortfolioAllocation();

    }

    /* ========================================================== */

    async function removeInvestment(id) {

        await deleteInvestment(id);

        await loadInvestments();

        await loadPortfolioSummary();

        await loadPortfolioAllocation();

    }

    /* ========================================================== */

    const filteredInvestments = useMemo(() => {

        if (!search.trim()) {

            return investments;

        }

        const keyword = search.toLowerCase();

        return investments.filter(

            item =>

                item.name

                    ?.toLowerCase()

                    .includes(keyword)

                ||

                item.type

                    ?.toLowerCase()

                    .includes(keyword)

        );

    }, [

        investments,

        search,

    ]);

    /* ========================================================== */

    useEffect(() => {

        loadInvestments();

        loadInvestmentTypes();

        loadPortfolioSummary();

        loadPortfolioAllocation();

        loadPortfolioGrowth();

    }, []);

    /* ========================================================== */

    return {

        investments,

        filteredInvestments,

        summary,

        allocation,

        growth,

        types,

        loading,

        error,

        search,

        setSearch,

        refresh: loadInvestments,

        addInvestment,

        editInvestment,

        removeInvestment,

    };

}

export default useInvestments;
/**
 * ===========================================================
 * FINVERSE AI
 * Investment Service
 * ===========================================================
 */

import {

    getInvestments,

    getInvestmentById,

    createInvestment,

    updateInvestment,

    deleteInvestment,

    getInvestmentTypes,

    getPortfolioSummary,

    getPortfolioAllocation,

    getPortfolioGrowth,

} from "../models/investment.model.js";

/* ==========================================================
Get All Investments
========================================================== */

export async function getInvestmentsService(userId) {

    return await getInvestments(userId);

}

/* ==========================================================
Get Investment By Id
========================================================== */

export async function getInvestmentByIdService(id, userId) {

    return await getInvestmentById(id, userId);

}

/* ==========================================================
Create Investment
========================================================== */

export async function createInvestmentService(data) {

    const id = await createInvestment(data);

    return {

        id,

        ...data,

    };

}

/* ==========================================================
Update Investment
========================================================== */

export async function updateInvestmentService(

    id,
    userId,
    data

) {

    await updateInvestment(

        id,
        userId,
        data

    );

}

/* ==========================================================
Delete Investment
========================================================== */

export async function deleteInvestmentService(

    id,
    userId

) {

    await deleteInvestment(

        id,
        userId

    );

}

/* ==========================================================
Investment Types
========================================================== */

export async function getInvestmentTypesService() {

    return await getInvestmentTypes();

}

/* ==========================================================
Portfolio Summary
========================================================== */

export async function getPortfolioSummaryService(userId) {

    return await getPortfolioSummary(userId);

}

/* ==========================================================
Portfolio Allocation
========================================================== */

export async function getPortfolioAllocationService(userId) {

    return await getPortfolioAllocation(userId);

}

/* ==========================================================
Portfolio Growth Service
========================================================== */

export async function getPortfolioGrowthService(userId) {

    return await getPortfolioGrowth(userId);

}
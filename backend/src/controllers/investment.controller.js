/**
 * ==========================================================
 * FINVERSE AI
 * Investment Controller
 * ==========================================================
 */

import {

    getInvestmentsService,

    getInvestmentByIdService,

    createInvestmentService,

    updateInvestmentService,

    deleteInvestmentService,

    getInvestmentTypesService,

    getPortfolioSummaryService,

    getPortfolioAllocationService,

    getPortfolioGrowthService,

} from "../services/investment.service.js";

/* ==========================================================
   Authenticated User ID Helper
========================================================== */

const getUserId = (req) => {
    if (!req.user?.id) {
        throw new Error("User not authenticated");
    }
    return req.user.id;
};



/* ==========================================================
   Get All Investments
========================================================== */

export async function getInvestments(req, res) {

    try {

        const investments = await getInvestmentsService(

            getUserId(req)

        );

        return res.status(200).json({

            success: true,

            data: investments,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Get Investment By Id
========================================================== */

export async function getInvestment(req, res) {

    try {

        const investment = await getInvestmentByIdService(

            req.params.id,

            getUserId(req)

        );

        if (!investment) {

            return res.status(404).json({

                success: false,

                message: "Investment not found.",

            });

        }

        return res.status(200).json({

            success: true,

            data: investment,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Create Investment
========================================================== */

export async function createInvestment(req, res) {

    try {

        const investment = await createInvestmentService({

            ...req.body,

            user_id: getUserId(req),

        });

        return res.status(201).json({

            success: true,

            message: "Investment created successfully.",

            data: investment,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Update Investment
========================================================== */

export async function updateInvestment(req, res) {

    try {

        await updateInvestmentService(

            req.params.id,

            getUserId(req),

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Investment updated successfully.",

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Delete Investment
========================================================== */

export async function deleteInvestment(req, res) {

    try {

        await deleteInvestmentService(

            req.params.id,

            getUserId(req)

        );

        return res.status(200).json({

            success: true,

            message: "Investment deleted successfully.",

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
   Investment Types
========================================================== */

export async function getInvestmentTypes(req, res) {

    try {

        const data = await getInvestmentTypesService();

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
Portfolio Summary
========================================================== */

export async function getPortfolioSummary(req, res) {

    try {

        const data = await getPortfolioSummaryService(

            getUserId(req)

        );

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
Portfolio Allocation
========================================================== */

export async function getPortfolioAllocation(req, res) {

    try {

        const data = await getPortfolioAllocationService(

            getUserId(req)

        );

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}

/* ==========================================================
Portfolio Growth
========================================================== */

export async function getPortfolioGrowth(req, res) {

    try {

        const data = await getPortfolioGrowthService(

            getUserId(req)

        );

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}
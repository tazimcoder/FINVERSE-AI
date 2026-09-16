/**
 * ==========================================================
 * FINVERSE AI
 * Budget Controller
 * ==========================================================
 */

import {
    createBudgetService,
    getBudgetsService,
    getBudgetByIdService,
    updateBudgetService,
    deleteBudgetService,
} from "../services/budget.service.js";


/* ==========================================================
   Create Budget
========================================================== */

export async function createBudget(req, res) {

    try {

        const userId = req.user.id;


        const budgetId =
            await createBudgetService(
                userId,
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Budget created successfully.",

            budgetId,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Get All Budgets
========================================================== */

export async function getBudgets(req, res) {

    try {

        const userId = req.user.id;


        const budgets =
            await getBudgetsService(
                userId
            );


        return res.status(200).json({

            success: true,

            data: budgets,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Get Budget By Id
========================================================== */

export async function getBudgetById(
    req,
    res
) {

    try {

        const userId = req.user.id;


        const budget =
            await getBudgetByIdService(
                req.params.id,
                userId
            );


        return res.status(200).json({

            success: true,

            data: budget,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Update Budget
========================================================== */

export async function updateBudget(
    req,
    res
) {

    try {

        const userId = req.user.id;


        await updateBudgetService(

            req.params.id,

            userId,

            req.body

        );


        return res.status(200).json({

            success: true,

            message:
                "Budget updated successfully.",

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}


/* ==========================================================
   Delete Budget
========================================================== */

export async function deleteBudget(
    req,
    res
) {

    try {

        const userId = req.user.id;


        await deleteBudgetService(

            req.params.id,

            userId

        );


        return res.status(200).json({

            success: true,

            message:
                "Budget deleted successfully.",

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

}
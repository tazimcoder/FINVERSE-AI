/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanProductController.js
 *
 * Responsibility:
 *
 * - Handle Loan Product HTTP requests
 * - Call Loan Product Service
 * - Return standardized API responses
 * - Handle controller-level errors
 *
 * ==========================================================
 */

import {
    getAllLoanProducts,
    getActiveLoanProducts,
    getLoanProductById,
    getLoanProductByCode,
    createLoanProduct,
    updateLoanProduct,
    updateLoanProductStatus,
    deleteLoanProduct
} from "../services/loanProductService.js";


// ==========================================================
// Get All Loan Products
// ==========================================================

export async function getAllProducts(req, res) {

    try {

        const products =
            await getAllLoanProducts();

        return res.status(200).json({

            success: true,

            message: "Loan products fetched successfully.",

            data: products

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Products Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to fetch loan products."

        });

    }

}


// ==========================================================
// Get Active Loan Products
// ==========================================================

export async function getActiveProducts(req, res) {

    try {

        const products =
            await getActiveLoanProducts();

        return res.status(200).json({

            success: true,

            message: "Active loan products fetched successfully.",

            data: products

        });

    }

    catch (error) {

        console.error(
            "Get Active Loan Products Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to fetch active loan products."

        });

    }

}


// ==========================================================
// Get Loan Product By ID
// ==========================================================

export async function getProductById(req, res) {

    try {

        const {
            id
        } = req.params;


        const productId =
            Number(id);


        if (
            !Number.isInteger(productId) ||
            productId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid loan product ID."

            });

        }


        const product =
            await getLoanProductById(
                productId
            );


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Loan product not found."

            });

        }


        return res.status(200).json({

            success: true,

            message: "Loan product fetched successfully.",

            data: product

        });

    }

    catch (error) {

        console.error(
            "Get Loan Product By ID Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to fetch loan product."

        });

    }

}


// ==========================================================
// Get Loan Product By Code
// ==========================================================

export async function getProductByCode(req, res) {

    try {

        const {
            code
        } = req.params;


        if (
            !code ||
            !code.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Loan product code is required."

            });

        }


        const product =
            await getLoanProductByCode(
                code.trim()
            );


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Loan product not found."

            });

        }


        return res.status(200).json({

            success: true,

            message: "Loan product fetched successfully.",

            data: product

        });

    }

    catch (error) {

        console.error(
            "Get Loan Product By Code Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to fetch loan product."

        });

    }

}


// ==========================================================
// Create Loan Product
// ==========================================================

export async function createProduct(req, res) {

    try {

        const productData =
            req.body;


        if (
            !productData ||
            typeof productData !== "object"
        ) {

            return res.status(400).json({

                success: false,

                message: "Loan product data is required."

            });

        }


        const productId =
            await createLoanProduct(
                productData
            );


        return res.status(201).json({

            success: true,

            message: "Loan product created successfully.",

            data: {

                id: productId

            }

        });

    }

    catch (error) {

        console.error(
            "Create Loan Product Error:",
            error
        );


        if (
            error.code === "ER_DUP_ENTRY"
        ) {

            return res.status(409).json({

                success: false,

                message: "Loan product code already exists."

            });

        }


        return res.status(500).json({

            success: false,

            message: "Failed to create loan product."

        });

    }

}


// ==========================================================
// Update Loan Product
// ==========================================================

export async function updateProduct(req, res) {

    try {

        const {
            id
        } = req.params;


        const productId =
            Number(id);


        if (
            !Number.isInteger(productId) ||
            productId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid loan product ID."

            });

        }


        const productData =
            req.body;


        if (
            !productData ||
            typeof productData !== "object"
        ) {

            return res.status(400).json({

                success: false,

                message: "Loan product data is required."

            });

        }


        const existingProduct =
            await getLoanProductById(
                productId
            );


        if (!existingProduct) {

            return res.status(404).json({

                success: false,

                message: "Loan product not found."

            });

        }


        const result =
            await updateLoanProduct(
                productId,
                productData
            );


        return res.status(200).json({

            success: true,

            message: "Loan product updated successfully.",

            data: {

                id: productId,

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Product Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Failed to update loan product."

        });

    }

}


// ==========================================================
// Update Loan Product Status
// ==========================================================

export async function updateProductStatus(req, res) {

    try {

        const {
            id
        } = req.params;


        const {
            status
        } = req.body;


        const productId =
            Number(id);


        if (
            !Number.isInteger(productId) ||
            productId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid loan product ID."

            });

        }


        const allowedStatuses = [

            "ACTIVE",

            "INACTIVE",

            "COMING_SOON"

        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid loan product status."

            });

        }


        const existingProduct =
            await getLoanProductById(
                productId
            );


        if (!existingProduct) {

            return res.status(404).json({

                success: false,

                message: "Loan product not found."

            });

        }


        const result =
            await updateLoanProductStatus(
                productId,
                status
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan product status updated successfully.",

            data: {

                id: productId,

                status,

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Product Status Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to update loan product status."

        });

    }

}


// ==========================================================
// Delete Loan Product
// ==========================================================

export async function deleteProduct(req, res) {

    try {

        const {
            id
        } = req.params;


        const productId =
            Number(id);


        if (
            !Number.isInteger(productId) ||
            productId <= 0
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid loan product ID."

            });

        }


        const existingProduct =
            await getLoanProductById(
                productId
            );


        if (!existingProduct) {

            return res.status(404).json({

                success: false,

                message: "Loan product not found."

            });

        }


        const result =
            await deleteLoanProduct(
                productId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan product deleted successfully.",

            data: {

                id: productId,

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Product Error:",
            error
        );


        // Product may be referenced by
        // loan applications or loans.

        if (
            error.code === "ER_ROW_IS_REFERENCED_2" ||
            error.code === "ER_ROW_IS_REFERENCED"
        ) {

            return res.status(409).json({

                success: false,

                message:
                    "Loan product cannot be deleted because it is already being used."

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to delete loan product."

        });

    }

}
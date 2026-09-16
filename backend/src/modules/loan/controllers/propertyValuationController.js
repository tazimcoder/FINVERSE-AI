/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/propertyValuationController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for property valuations
 * - Validate request-level input
 * - Call Property Valuation Service
 * - Return consistent API responses
 * - Provide backward-compatible controller exports
 *
 * ==========================================================
 */

import {
    createPropertyValuation as createPropertyValuationService,
    getAllPropertyValuations as getAllPropertyValuationsService,
    getPropertyValuationById as getPropertyValuationByIdService,
    getPropertyValuationsByApplicationId as getPropertyValuationsByApplicationIdService,
    getLatestPropertyValuationByApplicationId as getLatestPropertyValuationByApplicationIdService,
    getPropertyValuationsByUserId as getPropertyValuationsByUserIdService,
    getPropertyValuationsByStatus as getPropertyValuationsByStatusService,
    getPropertyValuationsByPropertyType as getPropertyValuationsByPropertyTypeService,
    getPropertyValuationsByLocation as getPropertyValuationsByLocationService,
    updatePropertyValuation as updatePropertyValuationService,
    updatePropertyValuationStatus as updatePropertyValuationStatusService,
    deletePropertyValuation as deletePropertyValuationService,
} from "../services/propertyValuationService.js";


// ==========================================================
// CREATE PROPERTY VALUATION
// ==========================================================

export const createPropertyValuation = async (
    req,
    res
) => {

    try {

        const {
            loanApplicationId,
            userId,
            propertyType,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            latitude,
            longitude,
            propertyAreaSqft,
            estimatedValue,
            estimatedMinValue,
            estimatedMaxValue,
            estimatedRatePerSqft,
            confidenceScore,
            valuationStatus,
            valuationMethod,
            dataSources,
            valuationNotes,
        } = req.body;


        if (!userId) {

            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });

        }


        if (!propertyType) {

            return res.status(400).json({
                success: false,
                message: "Property type is required.",
            });

        }


        if (!city) {

            return res.status(400).json({
                success: false,
                message: "City is required.",
            });

        }


        if (!state) {

            return res.status(400).json({
                success: false,
                message: "State is required.",
            });

        }


        const id =
            await createPropertyValuationService({

                loanApplicationId,

                userId,

                propertyType,

                addressLine1,

                addressLine2,

                city,

                state,

                postalCode,

                country,

                latitude,

                longitude,

                propertyAreaSqft,

                estimatedValue,

                estimatedMinValue,

                estimatedMaxValue,

                estimatedRatePerSqft,

                confidenceScore,

                valuationStatus,

                valuationMethod,

                dataSources,

                valuationNotes,

            });


        return res.status(201).json({

            success: true,

            message:
                "Property valuation created successfully.",

            data: {
                id,
            },

        });

    } catch (error) {

        console.error(
            "Create Property Valuation Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to create property valuation.",

        });

    }

};


// ==========================================================
// GET ALL PROPERTY VALUATIONS
// ==========================================================

export const getAllPropertyValuationsController = async (
    req,
    res
) => {

    try {

        const data =
            await getAllPropertyValuationsService();


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get All Property Valuations Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch property valuations.",

        });

    }

};


// ==========================================================
// GET PROPERTY VALUATION BY ID
// ==========================================================

export const getPropertyValuationByIdController = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const data =
            await getPropertyValuationByIdService(
                id
            );


        if (!data) {

            return res.status(404).json({

                success: false,

                message:
                    "Property valuation not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(
            "Get Property Valuation By ID Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch property valuation.",

        });

    }

};


// ==========================================================
// GET BY LOAN APPLICATION ID
// ==========================================================

export const getPropertyValuationsByApplicationIdController =
    async (
        req,
        res
    ) => {

        try {

            const { applicationId } =
                req.params;


            const data =
                await getPropertyValuationsByApplicationIdService(
                    applicationId
                );


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Property Valuations By Application Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch property valuations for loan application.",

            });

        }

    };


// ==========================================================
// GET LATEST BY LOAN APPLICATION ID
// ==========================================================

export const getLatestPropertyValuationByApplicationIdController =
    async (
        req,
        res
    ) => {

        try {

            const { applicationId } =
                req.params;


            const data =
                await getLatestPropertyValuationByApplicationIdService(
                    applicationId
                );


            if (!data) {

                return res.status(404).json({

                    success: false,

                    message:
                        "No property valuation found for this loan application.",

                });

            }


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Latest Property Valuation By Application Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch latest property valuation.",

            });

        }

    };


// ==========================================================
// GET BY USER ID
// ==========================================================

export const getPropertyValuationsByUserIdController =
    async (
        req,
        res
    ) => {

        try {

            const { userId } =
                req.params;


            const data =
                await getPropertyValuationsByUserIdService(
                    userId
                );


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Property Valuations By User Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch property valuations for user.",

            });

        }

    };


// ==========================================================
// GET BY STATUS
// ==========================================================

export const getPropertyValuationsByStatusController =
    async (
        req,
        res
    ) => {

        try {

            const { status } =
                req.params;


            const data =
                await getPropertyValuationsByStatusService(
                    status
                );


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Property Valuations By Status Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch property valuations by status.",

            });

        }

    };


// ==========================================================
// GET BY PROPERTY TYPE
// ==========================================================

export const getPropertyValuationsByPropertyTypeController =
    async (
        req,
        res
    ) => {

        try {

            const { propertyType } =
                req.params;


            const data =
                await getPropertyValuationsByPropertyTypeService(
                    propertyType
                );


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Property Valuations By Property Type Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch property valuations by property type.",

            });

        }

    };


// ==========================================================
// GET BY LOCATION
// ==========================================================

export const getPropertyValuationsByLocationController =
    async (
        req,
        res
    ) => {

        try {

            const {
                city,
                state,
                postalCode,
            } = req.query;


            const data =
                await getPropertyValuationsByLocationService({

                    city,

                    state,

                    postalCode,

                });


            return res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(
                "Get Property Valuations By Location Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch property valuations by location.",

            });

        }

    };


// ==========================================================
// UPDATE PROPERTY VALUATION
// ==========================================================

export const updatePropertyValuation = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const {
            loanApplicationId,
            userId,
            propertyType,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            latitude,
            longitude,
            propertyAreaSqft,
            estimatedValue,
            estimatedMinValue,
            estimatedMaxValue,
            estimatedRatePerSqft,
            confidenceScore,
            valuationStatus,
            valuationMethod,
            dataSources,
            valuationNotes,
        } = req.body;


        const valuationData = {

            loanApplicationId,

            userId,

            propertyType,

            addressLine1,

            addressLine2,

            city,

            state,

            postalCode,

            country,

            latitude,

            longitude,

            propertyAreaSqft,

            estimatedValue,

            estimatedMinValue,

            estimatedMaxValue,

            estimatedRatePerSqft,

            confidenceScore,

            valuationStatus,

            valuationMethod,

            dataSources,

            valuationNotes,

        };


        Object.keys(valuationData).forEach(
            (key) => {

                if (
                    valuationData[key] === undefined
                ) {

                    delete valuationData[key];

                }

            }
        );


        const updated =
            await updatePropertyValuationService(
                id,
                valuationData
            );


        if (!updated) {

            return res.status(404).json({

                success: false,

                message:
                    "Property valuation not found or no changes were made.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Property valuation updated successfully.",

        });

    } catch (error) {

        console.error(
            "Update Property Valuation Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to update property valuation.",

        });

    }

};


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================

export const updatePropertyValuationStatus = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const { status } =
            req.body;


        if (!status) {

            return res.status(400).json({

                success: false,

                message:
                    "Valuation status is required.",

            });

        }


        const updated =
            await updatePropertyValuationStatusService(
                id,
                status
            );


        if (!updated) {

            return res.status(404).json({

                success: false,

                message:
                    "Property valuation not found or status was not changed.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Property valuation status updated successfully.",

        });

    } catch (error) {

        console.error(
            "Update Property Valuation Status Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to update property valuation status.",

        });

    }

};


// ==========================================================
// DELETE PROPERTY VALUATION
// ==========================================================

export const deletePropertyValuation = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const deleted =
            await deletePropertyValuationService(
                id
            );


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message:
                    "Property valuation not found.",

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Property valuation deleted successfully.",

        });

    } catch (error) {

        console.error(
            "Delete Property Valuation Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to delete property valuation.",

        });

    }

};


// ==========================================================
// BACKWARD-COMPATIBILITY ALIASES
// ==========================================================
//
// Routes can use either:
//
// getAllPropertyValuationsController
//
// OR:
//
// getAllPropertyValuations
//
// Service functions are explicitly aliased with
// "Service" suffix to avoid naming collisions.
//
// ==========================================================

export const getAllPropertyValuations =
    getAllPropertyValuationsController;

export const getPropertyValuationById =
    getPropertyValuationByIdController;

export const getPropertyValuationsByApplicationId =
    getPropertyValuationsByApplicationIdController;

export const getLatestPropertyValuationByApplicationId =
    getLatestPropertyValuationByApplicationIdController;

export const getPropertyValuationsByUserId =
    getPropertyValuationsByUserIdController;

export const getPropertyValuationsByStatus =
    getPropertyValuationsByStatusController;

export const getPropertyValuationsByPropertyType =
    getPropertyValuationsByPropertyTypeController;

export const getPropertyValuationsByLocation =
    getPropertyValuationsByLocationController;


/**
 * ==========================================================
 * FINVERSE AI
 * Property Valuation Service
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/services/propertyValuationService.js
 *
 * Responsibility:
 *
 * - Business logic for property valuations
 * - Create property valuation
 * - Fetch property valuations
 * - Fetch valuation by ID
 * - Fetch valuations by loan application
 * - Fetch valuations by user
 * - Fetch valuations by status
 * - Fetch valuations by property type
 * - Fetch valuations by location
 * - Update property valuation
 * - Update valuation status
 * - Delete property valuation
 *
 * ==========================================================
 */

import propertyValuationModel
    from "../models/propertyValuationModel.js";


// ==========================================================
// CREATE PROPERTY VALUATION
// ==========================================================

export const createPropertyValuation = async ({
    loanApplicationId = null,
    userId,
    propertyType,
    addressLine1 = null,
    addressLine2 = null,
    city,
    state,
    postalCode = null,
    country = "India",
    latitude = null,
    longitude = null,
    propertyAreaSqft = null,
    estimatedValue = null,
    estimatedMinValue = null,
    estimatedMaxValue = null,
    estimatedRatePerSqft = null,
    confidenceScore = null,
    valuationStatus = "PENDING",
    valuationMethod = null,
    dataSources = null,
    valuationNotes = null,
}) => {

    if (!userId) {
        throw new Error("User ID is required.");
    }

    if (!propertyType) {
        throw new Error("Property type is required.");
    }

    if (!city) {
        throw new Error("City is required.");
    }

    if (!state) {
        throw new Error("State is required.");
    }

    return await propertyValuationModel.createPropertyValuation({
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
};


// ==========================================================
// GET ALL PROPERTY VALUATIONS
// ==========================================================

export const getAllPropertyValuations = async () => {

    return await propertyValuationModel
        .getAllPropertyValuations();

};


// ==========================================================
// GET PROPERTY VALUATION BY ID
// ==========================================================

export const getPropertyValuationById = async (id) => {

    if (!id) {
        throw new Error(
            "Property valuation ID is required."
        );
    }

    return await propertyValuationModel
        .getPropertyValuationById(id);

};


// ==========================================================
// GET BY LOAN APPLICATION ID
// ==========================================================

export const getPropertyValuationsByApplicationId = async (
    loanApplicationId
) => {

    if (!loanApplicationId) {
        throw new Error(
            "Loan application ID is required."
        );
    }

    return await propertyValuationModel
        .getPropertyValuationsByApplicationId(loanApplicationId);

};


// ==========================================================
// GET LATEST BY LOAN APPLICATION ID
// ==========================================================

export const getLatestPropertyValuationByApplicationId = async (
    loanApplicationId
) => {

    if (!loanApplicationId) {
        throw new Error(
            "Loan application ID is required."
        );
    }

    return await propertyValuationModel
        .getLatestPropertyValuationByApplicationId(
            loanApplicationId
        );

};


// ==========================================================
// GET BY USER ID
// ==========================================================

export const getPropertyValuationsByUserId = async (
    userId
) => {

    if (!userId) {
        throw new Error(
            "User ID is required."
        );
    }

    return await propertyValuationModel
        .getPropertyValuationsByUserId(userId);

};


// ==========================================================
// GET BY STATUS
// ==========================================================

export const getPropertyValuationsByStatus = async (
    status
) => {

    if (!status) {
        throw new Error(
            "Valuation status is required."
        );
    }

    return await propertyValuationModel
        .getPropertyValuationsByStatus(status);

};


// ==========================================================
// GET BY PROPERTY TYPE
// ==========================================================

export const getPropertyValuationsByPropertyType = async (
    propertyType
) => {

    if (!propertyType) {
        throw new Error(
            "Property type is required."
        );
    }

    return await propertyValuationModel
        .getPropertyValuationsByPropertyType(propertyType);

};


// ==========================================================
// GET BY LOCATION
// ==========================================================

export const getPropertyValuationsByLocation = async ({
    city,
    state,
    postalCode = null,
}) => {

    if (!city) {
        throw new Error("City is required.");
    }

    if (!state) {
        throw new Error("State is required.");
    }

    return await propertyValuationModel
        .getPropertyValuationsByLocation({
            city,
            state,
            postalCode,
        });

};


// ==========================================================
// UPDATE PROPERTY VALUATION
// ==========================================================

export const updatePropertyValuation = async (
    id,
    valuationData
) => {

    if (!id) {
        throw new Error(
            "Property valuation ID is required."
        );
    }

    if (
        !valuationData ||
        Object.keys(valuationData).length === 0
    ) {
        throw new Error(
            "Property valuation data is required."
        );
    }

    return await propertyValuationModel
        .updatePropertyValuation(
            id,
            valuationData
        );

};


// ==========================================================
// UPDATE VALUATION STATUS
// ==========================================================

export const updatePropertyValuationStatus = async (
    id,
    status
) => {

    if (!id) {
        throw new Error(
            "Property valuation ID is required."
        );
    }

    if (!status) {
        throw new Error(
            "Valuation status is required."
        );
    }

    return await propertyValuationModel
        .updateValuationStatus(
            id,
            status
        );

};


// ==========================================================
// DELETE PROPERTY VALUATION
// ==========================================================

export const deletePropertyValuation = async (id) => {

    if (!id) {
        throw new Error(
            "Property valuation ID is required."
        );
    }

    return await propertyValuationModel
        .deletePropertyValuation(id);

};


// ==========================================================
// DEFAULT EXPORT
// ==========================================================
//
// Keeping a default export makes the service easier to
// consume from future orchestration/business modules.
//
// ==========================================================

const propertyValuationService = {

    createPropertyValuation,

    getAllPropertyValuations,

    getPropertyValuationById,

    getPropertyValuationsByApplicationId,

    getLatestPropertyValuationByApplicationId,

    getPropertyValuationsByUserId,

    getPropertyValuationsByStatus,

    getPropertyValuationsByPropertyType,

    getPropertyValuationsByLocation,

    updatePropertyValuation,

    updatePropertyValuationStatus,

    deletePropertyValuation,

};

export default propertyValuationService;


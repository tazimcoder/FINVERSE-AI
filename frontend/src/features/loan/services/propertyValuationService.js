import {
    getAllPropertyValuations,
    getPropertyValuationById,
    getPropertyValuationsByPropertyId,
    getPropertyValuationsByLoanId,
    createPropertyValuation,
    updatePropertyValuation,
    updatePropertyValuationStatus,
    deletePropertyValuation
} from "../api/propertyValuationApi.js";

export async function fetchAllPropertyValuations() {
    return await getAllPropertyValuations();
}

export async function fetchPropertyValuationById(id) {
    return await getPropertyValuationById(id);
}

export async function fetchPropertyValuationsByPropertyId(
    propertyId
) {
    return await getPropertyValuationsByPropertyId(
        propertyId
    );
}

export async function fetchPropertyValuationsByLoanId(loanId) {
    return await getPropertyValuationsByLoanId(loanId);
}

export async function createNewPropertyValuation(data) {
    return await createPropertyValuation(data);
}

export async function updateExistingPropertyValuation(
    id,
    data
) {
    return await updatePropertyValuation(
        id,
        data
    );
}

export async function changePropertyValuationStatus(
    id,
    status
) {
    return await updatePropertyValuationStatus(
        id,
        status
    );
}

export async function removePropertyValuation(id) {
    return await deletePropertyValuation(id);
}


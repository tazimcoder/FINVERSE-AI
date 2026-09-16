/**
 * ==========================================================
 * FINVERSE AI
 * Loan Module Constants
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/constants/loanConstants.js
 *
 * Responsibility:
 *
 * - Loan API endpoint constants
 * - Loan status constants
 * - Application status constants
 * - Verification status constants
 * - Offer status constants
 * - Repayment status constants
 * - Payment status constants
 * - Document status constants
 * - Common Loan UI constants
 *
 * IMPORTANT:
 *
 * Keep Loan-related fixed values in this file.
 * Do not hardcode these values across components.
 *
 * ==========================================================
 */


// ==========================================================
// LOAN API BASE PATHS
// ==========================================================

export const LOAN_API_PATHS = {

    PRODUCTS:
        "/loan-products",

    APPLICATIONS:
        "/loan-applications",

    APPLICANT_PROFILES:
        "/loan-applicant-profiles",

    LOANS:
        "/loans",

    PROPERTIES:
        "/loan-properties",

    DOCUMENTS:
        "/loan-documents",

    ELIGIBILITY:
        "/loan-eligibility",

    REPAYMENT_SCHEDULES:
        "/loan-repayment-schedules",

    APPROVALS:
        "/loan-approvals",

    OFFERS:
        "/loan-offers",

    VERIFICATION_CHECKS:
        "/loan-verification-checks",

    COLLATERALS:
        "/loan-collaterals",

    PAYMENTS:
        "/loan-payments",

    PENALTIES:
        "/loan-penalties",

    GUARANTORS:
        "/loan-guarantors",

    DISBURSEMENTS:
        "/loan-disbursements",

    STATUS_HISTORY:
        "/loan-status-history",

    PROPERTY_VALUATIONS:
        "/property-valuations",

    LIFECYCLE:
        "/loan-lifecycle"

};


// ==========================================================
// LOAN PRODUCT
// ==========================================================

export const LOAN_PRODUCT_STATUS = {

    ACTIVE:
        "ACTIVE",

    INACTIVE:
        "INACTIVE",

    COMING_SOON:
        "COMING_SOON"

};


// ==========================================================
// LOAN CATEGORIES
// ==========================================================

export const LOAN_CATEGORIES = {

    PERSONAL:
        "PERSONAL",

    HOME:
        "HOME",

    PROPERTY:
        "PROPERTY",

    PLOT:
        "PLOT",

    VEHICLE:
        "VEHICLE",

    EDUCATION:
        "EDUCATION",

    BUSINESS:
        "BUSINESS",

    GOLD:
        "GOLD",

    OTHER:
        "OTHER"

};


// ==========================================================
// APPLICATION STATUS
// ==========================================================

export const LOAN_APPLICATION_STATUS = {

    DRAFT:
        "DRAFT",

    SUBMITTED:
        "SUBMITTED",

    UNDER_REVIEW:
        "UNDER_REVIEW",

    DOCUMENTS_REQUIRED:
        "DOCUMENTS_REQUIRED",

    VERIFICATION:
        "VERIFICATION",

    APPROVED:
        "APPROVED",

    OFFERED:
        "OFFERED",

    ACCEPTED:
        "ACCEPTED",

    REJECTED:
        "REJECTED",

    CANCELLED:
        "CANCELLED",

    DISBURSED:
        "DISBURSED",

    CLOSED:
        "CLOSED"

};


// ==========================================================
// LOAN STATUS
// ==========================================================

export const LOAN_STATUS = {

    ACTIVE:
        "ACTIVE",

    PENDING:
        "PENDING",

    APPROVED:
        "APPROVED",

    DISBURSED:
        "DISBURSED",

    OVERDUE:
        "OVERDUE",

    DEFAULTED:
        "DEFAULTED",

    CLOSED:
        "CLOSED",

    CANCELLED:
        "CANCELLED"

};


// ==========================================================
// VERIFICATION STATUS
// ==========================================================

export const LOAN_VERIFICATION_STATUS = {

    PENDING:
        "PENDING",

    IN_PROGRESS:
        "IN_PROGRESS",

    VERIFIED:
        "VERIFIED",

    REJECTED:
        "REJECTED",

    REQUIRES_REVIEW:
        "REQUIRES_REVIEW"

};


// ==========================================================
// OFFER STATUS
// ==========================================================

export const LOAN_OFFER_STATUS = {

    PENDING:
        "PENDING",

    ACTIVE:
        "ACTIVE",

    ACCEPTED:
        "ACCEPTED",

    REJECTED:
        "REJECTED",

    EXPIRED:
        "EXPIRED",

    CANCELLED:
        "CANCELLED"

};


// ==========================================================
// DOCUMENT STATUS
// ==========================================================

export const LOAN_DOCUMENT_STATUS = {

    PENDING:
        "PENDING",

    UPLOADED:
        "UPLOADED",

    UNDER_REVIEW:
        "UNDER_REVIEW",

    VERIFIED:
        "VERIFIED",

    REJECTED:
        "REJECTED",

    EXPIRED:
        "EXPIRED"

};


// ==========================================================
// REPAYMENT STATUS
// ==========================================================

export const LOAN_REPAYMENT_STATUS = {

    PENDING:
        "PENDING",

    UPCOMING:
        "UPCOMING",

    DUE:
        "DUE",

    PARTIALLY_PAID:
        "PARTIALLY_PAID",

    PAID:
        "PAID",

    OVERDUE:
        "OVERDUE",

    WAIVED:
        "WAIVED"

};


// ==========================================================
// PAYMENT STATUS
// ==========================================================

export const LOAN_PAYMENT_STATUS = {

    PENDING:
        "PENDING",

    PROCESSING:
        "PROCESSING",

    SUCCESS:
        "SUCCESS",

    FAILED:
        "FAILED",

    REFUNDED:
        "REFUNDED",

    CANCELLED:
        "CANCELLED"

};


// ==========================================================
// GUARANTOR STATUS
// ==========================================================

export const LOAN_GUARANTOR_STATUS = {

    PENDING:
        "PENDING",

    ACTIVE:
        "ACTIVE",

    RELEASED:
        "RELEASED",

    REJECTED:
        "REJECTED"

};


// ==========================================================
// GUARANTOR CONSENT STATUS
// ==========================================================

export const LOAN_CONSENT_STATUS = {

    PENDING:
        "PENDING",

    GIVEN:
        "GIVEN",

    DECLINED:
        "DECLINED"

};


// ==========================================================
// COLLATERAL STATUS
// ==========================================================

export const LOAN_COLLATERAL_STATUS = {

    PENDING:
        "PENDING",

    VERIFIED:
        "VERIFIED",

    REJECTED:
        "REJECTED",

    RELEASED:
        "RELEASED"

};


// ==========================================================
// DISBURSEMENT STATUS
// ==========================================================

export const LOAN_DISBURSEMENT_STATUS = {

    PENDING:
        "PENDING",

    PROCESSING:
        "PROCESSING",

    DISBURSED:
        "DISBURSED",

    FAILED:
        "FAILED",

    CANCELLED:
        "CANCELLED"

};


// ==========================================================
// PENALTY STATUS
// ==========================================================

export const LOAN_PENALTY_STATUS = {

    PENDING:
        "PENDING",

    APPLIED:
        "APPLIED",

    WAIVED:
        "WAIVED",

    PAID:
        "PAID"

};


// ==========================================================
// PROPERTY VALUATION STATUS
// ==========================================================

export const PROPERTY_VALUATION_STATUS = {

    PENDING:
        "PENDING",

    IN_PROGRESS:
        "IN_PROGRESS",

    COMPLETED:
        "COMPLETED",

    REQUIRES_REVIEW:
        "REQUIRES_REVIEW",

    REJECTED:
        "REJECTED"

};


// ==========================================================
// PROPERTY REQUIREMENT
// ==========================================================

export const PROPERTY_REQUIREMENT = {

    YES:
        "YES",

    NO:
        "NO"

};


// ==========================================================
// COLLATERAL REQUIREMENT
// ==========================================================

export const COLLATERAL_REQUIREMENT = {

    YES:
        "YES",

    NO:
        "NO"

};


// ==========================================================
// PROCESSING FEE TYPE
// ==========================================================

export const PROCESSING_FEE_TYPE = {

    FIXED:
        "FIXED",

    PERCENTAGE:
        "PERCENTAGE"

};


// ==========================================================
// LOAN MODULE UI
// ==========================================================

export const LOAN_UI = {

    DEFAULT_PAGE_SIZE:
        10,

    MAX_PAGE_SIZE:
        100,

    DEFAULT_CURRENCY:
        "INR",

    DEFAULT_COUNTRY:
        "India",

    DEFAULT_LOCALE:
        "en-IN"

};


// ==========================================================
// EXPORT DEFAULT
// ==========================================================

const LOAN_CONSTANTS = {

    LOAN_API_PATHS,

    LOAN_PRODUCT_STATUS,

    LOAN_CATEGORIES,

    LOAN_APPLICATION_STATUS,

    LOAN_STATUS,

    LOAN_VERIFICATION_STATUS,

    LOAN_OFFER_STATUS,

    LOAN_DOCUMENT_STATUS,

    LOAN_REPAYMENT_STATUS,

    LOAN_PAYMENT_STATUS,

    LOAN_GUARANTOR_STATUS,

    LOAN_CONSENT_STATUS,

    LOAN_COLLATERAL_STATUS,

    LOAN_DISBURSEMENT_STATUS,

    LOAN_PENALTY_STATUS,

    PROPERTY_VALUATION_STATUS,

    PROPERTY_REQUIREMENT,

    COLLATERAL_REQUIREMENT,

    PROCESSING_FEE_TYPE,

    LOAN_UI

};


export default LOAN_CONSTANTS;
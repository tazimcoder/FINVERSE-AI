/**
 * ==========================================================
 * FINVERSE AI
 * Loan Lifecycle Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanLifecycleController.js
 *
 * Responsibility:
 *
 * - Handle loan lifecycle HTTP requests
 * - Validate request parameters
 * - Call Loan Lifecycle Service
 * - Return consistent API responses
 * - Support USER / ADMIN workflow integration
 *
 * IMPORTANT:
 *
 * Business logic must remain inside:
 *
 * loanLifecycleService.js
 *
 * This controller only handles:
 *
 * Request
 *    ↓
 * Validation
 *    ↓
 * Service
 *    ↓
 * Response
 *
 * ==========================================================
 */

import {
    getCurrentLoanApplicationStatus,
    getLoanLifecycleSnapshot,
    changeLoanApplicationLifecycleStatus,
    submitLoanApplication,
    moveLoanApplicationToReview,
    startLoanEligibilityWorkflow,
    startLoanVerificationWorkflow,
    markLoanApplicationApproved,
    markLoanApplicationOffered,
    markLoanApplicationAccepted,
    markLoanApplicationDisbursed,
    rejectLoanApplication,
    cancelLoanApplication,
} from "../services/loanLifecycleService.js";


// ==========================================================
// VALIDATE APPLICATION ID
// ==========================================================

function validateApplicationId(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return false;

    }


    const id =
        Number(value);


    return (
        Number.isInteger(id) &&
        id > 0
    );

}


// ==========================================================
// GET CURRENT APPLICATION STATUS
// ==========================================================

export const getCurrentLoanApplicationStatusController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const data =
                await getCurrentLoanApplicationStatus(
                    applicationId
                );


            return res.status(200).json({

                success: true,

                message:
                    "Current loan application status fetched successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Get Current Loan Application Status Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 500
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch current loan application status.",

            });

        }

    };


// ==========================================================
// GET COMPLETE LIFECYCLE SNAPSHOT
// ==========================================================

export const getLoanLifecycleSnapshotController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const data =
                await getLoanLifecycleSnapshot(
                    applicationId
                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan lifecycle snapshot fetched successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Get Loan Lifecycle Snapshot Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 500
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch loan lifecycle snapshot.",

            });

        }

    };


// ==========================================================
// CHANGE APPLICATION STATUS
// ==========================================================

export const changeLoanApplicationLifecycleStatusController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            const {
                status,
                changedByUserId,
                remarks,
            } = req.body;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            if (!status) {

                return res.status(400).json({

                    success: false,

                    message:
                        "New loan application status is required.",

                });

            }


            if (
                changedByUserId !== undefined &&
                changedByUserId !== null &&
                changedByUserId !== "" &&
                !validateApplicationId(
                    changedByUserId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Changed by user ID must be a valid positive integer.",

                });

            }


            const data =
                await changeLoanApplicationLifecycleStatus(

                    applicationId,

                    status,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    data.changed
                        ? "Loan application status updated successfully."
                        : data.message,

                data,

            });

        } catch (error) {

            console.error(
                "Change Loan Application Lifecycle Status Error:",
                error
            );


            const statusCode =
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400;


            return res.status(
                statusCode
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to change loan application status.",

            });

        }

    };


// ==========================================================
// SUBMIT APPLICATION
// ==========================================================

export const submitLoanApplicationController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await submitLoanApplication(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    data.changed
                        ? "Loan application submitted successfully."
                        : data.message,

                data,

            });

        } catch (error) {

            console.error(
                "Submit Loan Application Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to submit loan application.",

            });

        }

    };


// ==========================================================
// MOVE APPLICATION TO REVIEW
// ==========================================================

export const moveLoanApplicationToReviewController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await moveLoanApplicationToReview(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan application moved to review successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Move Loan Application To Review Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to move loan application to review.",

            });

        }

    };


// ==========================================================
// START ELIGIBILITY WORKFLOW
// ==========================================================

export const startLoanEligibilityWorkflowController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await startLoanEligibilityWorkflow(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan eligibility workflow started successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Start Loan Eligibility Workflow Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to start loan eligibility workflow.",

            });

        }

    };


// ==========================================================
// START VERIFICATION WORKFLOW
// ==========================================================

export const startLoanVerificationWorkflowController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await startLoanVerificationWorkflow(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan verification workflow started successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Start Loan Verification Workflow Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to start loan verification workflow.",

            });

        }

    };


// ==========================================================
// MARK APPLICATION APPROVED
// ==========================================================

export const markLoanApplicationApprovedController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await markLoanApplicationApproved(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan application approved successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Mark Loan Application Approved Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to approve loan application.",

            });

        }

    };


// ==========================================================
// MARK APPLICATION OFFERED
// ==========================================================

export const markLoanApplicationOfferedController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await markLoanApplicationOffered(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan offer stage reached successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Mark Loan Application Offered Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to mark loan application as offered.",

            });

        }

    };


// ==========================================================
// MARK APPLICATION ACCEPTED
// ==========================================================

export const markLoanApplicationAcceptedController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await markLoanApplicationAccepted(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan offer accepted successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Mark Loan Application Accepted Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to accept loan offer.",

            });

        }

    };


// ==========================================================
// MARK APPLICATION DISBURSED
// ==========================================================

export const markLoanApplicationDisbursedController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await markLoanApplicationDisbursed(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan application marked as disbursed successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Mark Loan Application Disbursed Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to mark loan application as disbursed.",

            });

        }

    };


// ==========================================================
// REJECT APPLICATION
// ==========================================================

export const rejectLoanApplicationController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await rejectLoanApplication(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan application rejected successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Reject Loan Application Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to reject loan application.",

            });

        }

    };


// ==========================================================
// CANCEL APPLICATION
// ==========================================================

export const cancelLoanApplicationController =
    async (
        req,
        res
    ) => {

        try {

            const {
                applicationId,
            } = req.params;


            if (
                !validateApplicationId(
                    applicationId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Loan application ID must be a valid positive integer.",

                });

            }


            const {
                changedByUserId,
                remarks,
            } = req.body;


            const data =
                await cancelLoanApplication(

                    applicationId,

                    {

                        changedByUserId:
                            changedByUserId ||
                            null,

                        remarks:
                            remarks ||
                            null,

                    }

                );


            return res.status(200).json({

                success: true,

                message:
                    "Loan application cancelled successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Cancel Loan Application Error:",
                error
            );


            return res.status(
                error.message ===
                    "Loan application not found."
                    ? 404
                    : 400
            ).json({

                success: false,

                message:
                    error.message ||
                    "Failed to cancel loan application.",

            });

        }

    };


// ==========================================================
// BACKWARD-COMPATIBILITY ALIASES
// ==========================================================

export const getCurrentStatus =
    getCurrentLoanApplicationStatusController;

export const getLifecycleSnapshot =
    getLoanLifecycleSnapshotController;

export const changeLifecycleStatus =
    changeLoanApplicationLifecycleStatusController;

export const submitApplication =
    submitLoanApplicationController;

export const moveToReview =
    moveLoanApplicationToReviewController;

export const startEligibility =
    startLoanEligibilityWorkflowController;

export const startVerification =
    startLoanVerificationWorkflowController;

export const approveApplication =
    markLoanApplicationApprovedController;

export const markOffered =
    markLoanApplicationOfferedController;

export const acceptOffer =
    markLoanApplicationAcceptedController;

export const markDisbursed =
    markLoanApplicationDisbursedController;

export const rejectApplication =
    rejectLoanApplicationController;

export const cancelApplication =
    cancelLoanApplicationController;


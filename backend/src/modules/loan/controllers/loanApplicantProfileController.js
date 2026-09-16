/**
 * ==========================================================
 * FINVERSE AI
 * Loan Applicant Profile Controller
 * ==========================================================
 *
 * File:
 * backend/src/modules/loan/controllers/loanApplicantProfileController.js
 *
 * Responsibility:
 *
 * - Handle HTTP requests for applicant profiles
 * - Fetch all applicant profiles
 * - Fetch profile by ID
 * - Fetch profiles by application
 * - Fetch profiles by user
 * - Create applicant profile
 * - Update applicant profile
 * - Delete applicant profile
 *
 * ==========================================================
 */

import {
    fetchAllLoanApplicantProfiles,
    fetchLoanApplicantProfileById,
    fetchLoanApplicantProfilesByApplicationId,
    fetchLoanApplicantProfilesByUserId,
    createNewLoanApplicantProfile,
    updateExistingLoanApplicantProfile,
    removeLoanApplicantProfile
} from "../services/loanApplicantProfileService.js";


// ==========================================================
// Get All Applicant Profiles
// ==========================================================

export async function getAllLoanApplicantProfiles(
    req,
    res
) {

    try {

        const profiles =
            await fetchAllLoanApplicantProfiles();

        return res.status(200).json({

            success: true,

            message:
                "Loan applicant profiles fetched successfully.",

            data: profiles

        });

    }

    catch (error) {

        console.error(
            "Get All Loan Applicant Profiles Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan applicant profiles."

        });

    }

}


// ==========================================================
// Get Applicant Profile By ID
// ==========================================================

export async function getLoanApplicantProfileById(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const profile =
            await fetchLoanApplicantProfileById(id);


        if (!profile) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan applicant profile not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan applicant profile fetched successfully.",

            data: profile

        });

    }

    catch (error) {

        console.error(
            "Get Loan Applicant Profile By ID Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch loan applicant profile."

        });

    }

}


// ==========================================================
// Get Profiles By Loan Application
// ==========================================================

export async function getLoanApplicantProfilesByApplicationId(
    req,
    res
) {

    try {

        const {
            applicationId
        } = req.params;


        const profiles =
            await fetchLoanApplicantProfilesByApplicationId(
                applicationId
            );


        return res.status(200).json({

            success: true,

            message:
                "Loan applicant profiles for application fetched successfully.",

            data: profiles

        });

    }

    catch (error) {

        console.error(
            "Get Applicant Profiles By Application Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch applicant profiles."

        });

    }

}


// ==========================================================
// Get Profiles By User
// ==========================================================

export async function getLoanApplicantProfilesByUserId(
    req,
    res
) {

    try {

        const {
            userId
        } = req.params;


        const profiles =
            await fetchLoanApplicantProfilesByUserId(
                userId
            );


        return res.status(200).json({

            success: true,

            message:
                "User applicant profiles fetched successfully.",

            data: profiles

        });

    }

    catch (error) {

        console.error(
            "Get Applicant Profiles By User Error:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch user applicant profiles."

        });

    }

}


// ==========================================================
// Create Applicant Profile
// ==========================================================

export async function createLoanApplicantProfile(
    req,
    res
) {

    try {

        const profileData =
            req.body;


        const profile =
            await createNewLoanApplicantProfile(
                profileData
            );


        return res.status(201).json({

            success: true,

            message:
                "Loan applicant profile created successfully.",

            data: profile

        });

    }

    catch (error) {

        console.error(
            "Create Loan Applicant Profile Error:",
            error.message
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Update Applicant Profile
// ==========================================================

export async function updateLoanApplicantProfile(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const profileData =
            req.body;


        const result =
            await updateExistingLoanApplicantProfile(
                id,
                profileData
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan applicant profile not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan applicant profile updated successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Update Loan Applicant Profile Error:",
            error.message
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


// ==========================================================
// Delete Applicant Profile
// ==========================================================

export async function deleteLoanApplicantProfile(
    req,
    res
) {

    try {

        const {
            id
        } = req.params;


        const result =
            await removeLoanApplicantProfile(id);


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Loan applicant profile not found."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Loan applicant profile deleted successfully.",

            data: {

                affectedRows:
                    result.affectedRows

            }

        });

    }

    catch (error) {

        console.error(
            "Delete Loan Applicant Profile Error:",
            error.message
        );

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

}


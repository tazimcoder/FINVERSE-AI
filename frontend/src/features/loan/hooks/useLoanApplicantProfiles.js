import {
    useCallback,
    useState
} from "react";

import {
    fetchLoanApplicantProfileById,
    fetchLoanApplicantProfileByUserId,
    createNewLoanApplicantProfile,
    updateExistingLoanApplicantProfile,
    removeLoanApplicantProfile
} from "../services/loanApplicantProfileService.js";


export default function useLoanApplicantProfiles() {

    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    const handleError =
        useCallback(
            (error) => {

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to process applicant profile request."
                );

            },
            []
        );


    const getProfileById =
        useCallback(
            async (profileId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanApplicantProfileById(
                            profileId
                        );

                    const data =
                        response?.data ?? response;

                    setProfile(data);

                    return data;

                }

                catch (error) {

                    handleError(error);

                    return null;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    const getProfileByUserId =
        useCallback(
            async (userId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await fetchLoanApplicantProfileByUserId(
                            userId
                        );

                    const data =
                        response?.data ?? response;

                    setProfile(data);

                    return data;

                }

                catch (error) {

                    handleError(error);

                    return null;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    const createProfile =
        useCallback(
            async (data) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await createNewLoanApplicantProfile(
                            data
                        );

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    const updateProfile =
        useCallback(
            async (
                profileId,
                data
            ) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await updateExistingLoanApplicantProfile(
                            profileId,
                            data
                        );

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    const deleteProfile =
        useCallback(
            async (profileId) => {

                setLoading(true);
                setError(null);

                try {

                    const response =
                        await removeLoanApplicantProfile(
                            profileId
                        );

                    setProfile(null);

                    return response;

                }

                catch (error) {

                    handleError(error);

                    throw error;

                }

                finally {

                    setLoading(false);

                }

            },
            [
                handleError
            ]
        );


    return {

        profile,

        loading,

        error,

        getProfileById,

        getProfileByUserId,

        createProfile,

        updateProfile,

        deleteProfile

    };

}


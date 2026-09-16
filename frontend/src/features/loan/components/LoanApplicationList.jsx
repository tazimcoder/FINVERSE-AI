/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application List
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanApplicationList.jsx
 *
 * Responsibility:
 *
 * - Display loan applications
 * - Reuse LoanApplicationCard
 * - Handle loading state
 * - Handle empty state
 * - Support application selection and actions
 *
 * ==========================================================
 */

import LoanApplicationCard
    from "./LoanApplicationCard.jsx";

import LoanEmptyState
    from "./LoanEmptyState.jsx";


function LoanApplicationList({
    applications = [],
    loading = false,
    onSelectApplication,
    onViewApplication,
    onContinueApplication
}) {

    // ======================================================
    // Loading State
    // ======================================================

    if (loading) {

        return (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map(
                    (item) => (

                        <div
                            key={item}
                            className="
                                animate-pulse
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                            "
                        >

                            <div className="h-5 w-32 rounded bg-slate-200" />

                            <div className="mt-5 h-4 w-full rounded bg-slate-100" />

                            <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />

                            <div className="mt-6 h-10 w-full rounded-xl bg-slate-100" />

                        </div>

                    )
                )}

            </div>

        );

    }


    // ======================================================
    // Empty State
    // ======================================================

    if (
        !Array.isArray(applications) ||
        applications.length === 0
    ) {

        return (

            <LoanEmptyState
                title="No loan applications found"
                description="
                    Your loan applications will appear here once
                    you create an application.
                "
            />

        );

    }


    // ======================================================
    // Application List
    // ======================================================

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {applications.map(
                (application, index) => {

                    const applicationId =
                        application.id ??
                        application.loan_application_id ??
                        index;


                    return (

                        <LoanApplicationCard
                            key={applicationId}
                            application={application}
                            onView={
                                onViewApplication ||
                                    onSelectApplication
                                    ? () => {

                                        const handler =
                                            onViewApplication ||
                                            onSelectApplication;

                                        handler?.(
                                            application
                                        );

                                    }
                                    : undefined
                            }
                            onContinue={
                                onContinueApplication
                                    ? () =>
                                        onContinueApplication(
                                            application
                                        )
                                    : undefined
                            }
                        />

                    );

                }
            )}

        </div>

    );

}


export default LoanApplicationList;
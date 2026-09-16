/**
 * ==========================================================
 * FINVERSE AI
 * Loan Application Status
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanApplicationStatus.jsx
 *
 * Responsibility:
 * - Display loan application progress
 * - Show lifecycle stages
 * - Provide visual status progression
 *
 * ==========================================================
 */

const APPLICATION_STAGES = [

    {
        key: "DRAFT",
        label: "Draft"
    },

    {
        key: "SUBMITTED",
        label: "Submitted"
    },

    {
        key: "UNDER_REVIEW",
        label: "Under Review"
    },

    {
        key: "VERIFIED",
        label: "Verified"
    },

    {
        key: "APPROVED",
        label: "Approved"
    },

    {
        key: "DISBURSED",
        label: "Disbursed"
    },

    {
        key: "ACTIVE",
        label: "Active"
    },

    {
        key: "COMPLETED",
        label: "Completed"
    }

];


function LoanApplicationStatus({
    status
}) {

    const normalizedStatus =
        String(status || "DRAFT")
            .trim()
            .toUpperCase();


    const rejected =
        normalizedStatus === "REJECTED";


    const cancelled =
        normalizedStatus === "CANCELLED";


    let currentIndex =
        APPLICATION_STAGES.findIndex(
            (stage) =>
                stage.key === normalizedStatus
        );


    if (currentIndex < 0) {
        currentIndex = 0;
    }


    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="mb-6">

                <p
                    className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-blue-600
                    "
                >
                    Application Progress
                </p>

                <h2
                    className="
                        mt-1
                        text-xl
                        font-bold
                        text-slate-900
                    "
                >
                    Loan Application Status
                </h2>

            </div>


            {(rejected || cancelled) && (

                <div
                    className="
                        mb-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-red-700
                    "
                >
                    This application is {normalizedStatus.toLowerCase()}.
                </div>

            )}


            <div className="space-y-5">

                {APPLICATION_STAGES.map(
                    (stage, index) => {

                        const completed =
                            index < currentIndex;

                        const current =
                            index === currentIndex &&
                            !rejected &&
                            !cancelled;


                        return (
                            <div
                                key={stage.key}
                                className="
                                    flex
                                    items-start
                                    gap-4
                                "
                            >

                                <div
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        text-xs
                                        font-bold
                                        ${completed
                                            ? "border-emerald-500 bg-emerald-500 text-white"
                                            : current
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : "border-slate-300 bg-white text-slate-400"
                                        }
                                    `}
                                >
                                    {completed
                                        ? "✓"
                                        : index + 1
                                    }
                                </div>


                                <div className="pt-1">

                                    <p
                                        className={`
                                            text-sm
                                            font-semibold
                                            ${completed ||
                                                current
                                                ? "text-slate-900"
                                                : "text-slate-400"
                                            }
                                        `}
                                    >
                                        {stage.label}
                                    </p>

                                    {current && (

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-blue-600
                                            "
                                        >
                                            Current stage
                                        </p>

                                    )}

                                </div>

                            </div>
                        );

                    }
                )}

            </div>

        </div>
    );

}


export default LoanApplicationStatus;


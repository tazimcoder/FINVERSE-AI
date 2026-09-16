/**
 * ==========================================================
 * FINVERSE AI
 * Loan Approval Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanApprovalCard.jsx
 *
 * Responsibility:
 * - Display approval information
 * - Display approved amount
 * - Display approval status
 * - Display approval remarks
 *
 * ==========================================================
 */

import LoanAmountDisplay
    from "./LoanAmountDisplay.jsx";

import LoanStatusBadge
    from "./LoanStatusBadge.jsx";


function LoanApprovalCard({
    approval = {},
    loading = false
}) {

    if (loading) {

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

                <div className="animate-pulse space-y-5">

                    <div className="h-5 w-40 rounded bg-slate-200" />

                    <div className="h-8 w-32 rounded bg-slate-200" />

                    <div className="h-4 w-full rounded bg-slate-200" />

                </div>

            </div>
        );

    }


    const status =
        approval.status ??
        approval.approval_status ??
        "PENDING";


    const approvedAmount =
        approval.approved_amount ??
        approval.loan_amount ??
        null;


    const approvedTenure =
        approval.approved_tenure_months ??
        approval.tenure_months ??
        null;


    const interestRate =
        approval.approved_interest_rate ??
        approval.interest_rate ??
        null;


    const remarks =
        approval.remarks ??
        approval.notes ??
        null;


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

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-blue-600
                        "
                    >
                        Credit Decision
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Loan Approval
                    </h2>

                </div>


                <LoanStatusBadge
                    status={status}
                />

            </div>


            <div
                className="
                    mt-6
                    grid
                    gap-5
                    sm:grid-cols-3
                "
            >

                <div>

                    <p className="text-xs text-slate-500">
                        Approved Amount
                    </p>

                    <div className="mt-1">
                        <LoanAmountDisplay
                            amount={approvedAmount}
                        />
                    </div>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Approved Tenure
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {approvedTenure !== null
                            ? `${approvedTenure} months`
                            : "—"
                        }
                    </p>

                </div>


                <div>

                    <p className="text-xs text-slate-500">
                        Interest Rate
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-slate-900
                        "
                    >
                        {interestRate !== null
                            ? `${interestRate}%`
                            : "—"
                        }
                    </p>

                </div>

            </div>


            {remarks && (

                <div
                    className="
                        mt-6
                        rounded-xl
                        bg-slate-50
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                        "
                    >
                        Remarks
                    </p>

                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-700
                        "
                    >
                        {remarks}
                    </p>

                </div>

            )}

        </div>
    );

}


export default LoanApprovalCard;


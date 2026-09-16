/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document Card
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanDocumentCard.jsx
 *
 * Responsibility:
 *
 * - Display loan document information
 * - Show document type
 * - Show document verification status
 * - Allow parent page to handle view action
 *
 * ==========================================================
 */

import LoanVerificationStatus
    from "./LoanVerificationStatus";


function LoanDocumentCard({
    document,
    onView
}) {

    if (!document) {
        return null;
    }


    const documentName =
        document.document_name ||
        document.document_type ||
        "Loan Document";


    const verificationStatus =
        document.verification_status ||
        document.status;


    return (
        <article
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
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

                <div
                    className="
                        flex
                        min-w-0
                        items-start
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-lg
                        "
                    >
                        📄
                    </div>


                    <div className="min-w-0">

                        <h3
                            className="
                                truncate
                                font-bold
                                text-slate-900
                            "
                        >
                            {documentName}
                        </h3>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {document.document_type || "Document"}
                        </p>

                    </div>

                </div>


                {verificationStatus && (
                    <LoanVerificationStatus
                        status={verificationStatus}
                    />
                )}

            </div>


            {document.uploaded_at && (

                <p
                    className="
                        mt-4
                        text-xs
                        text-slate-500
                    "
                >
                    Uploaded:{" "}

                    {new Date(
                        document.uploaded_at
                    ).toLocaleDateString()}
                </p>

            )}


            {onView && (

                <button
                    type="button"
                    onClick={() =>
                        onView(document)
                    }
                    className="
                        mt-4
                        text-sm
                        font-semibold
                        text-blue-600
                        transition
                        hover:text-blue-700
                    "
                >
                    View Document →
                </button>

            )}

        </article>
    );

}


export default LoanDocumentCard;


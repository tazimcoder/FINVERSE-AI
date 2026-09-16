/**
 * ==========================================================
 * FINVERSE AI
 * Loan Document List Component
 * ==========================================================
 *
 * Responsibility:
 *
 * - Display loan documents
 * - Show document type
 * - Show verification status
 * - Show upload information
 * - Handle loading state
 * - Handle empty state
 *
 * ==========================================================
 */

import LoanEmptyState from "./LoanEmptyState";
import LoanVerificationStatus from "./LoanVerificationStatus";


function LoanDocumentList({
    documents = [],
    loading = false,
    onSelectDocument
}) {

    // ======================================================
    // Format Date
    // ======================================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ======================================================
    // Loading State
    // ======================================================

    if (loading) {

        return (
            <div className="space-y-4">

                {[1, 2, 3].map(
                    (item) => (
                        <div
                            key={item}
                            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                        >

                            <div className="h-5 w-48 rounded bg-slate-200" />

                            <div className="mt-4 h-4 w-72 max-w-full rounded bg-slate-100" />

                        </div>
                    )
                )}

            </div>
        );

    }


    // ======================================================
    // Empty State
    // ======================================================

    if (!documents.length) {

        return (
            <LoanEmptyState
                title="No documents found"
                description="Required loan documents will appear here after they are uploaded."
            />
        );

    }


    return (
        <div className="space-y-4">

            {documents.map(
                (document) => {

                    const documentName =
                        document.document_name ??
                        document.file_name ??
                        document.document_type ??
                        "Loan Document";


                    const documentType =
                        document.document_type ??
                        "DOCUMENT";


                    const verificationStatus =
                        document.verification_status ??
                        document.status ??
                        "PENDING";


                    return (
                        <button
                            type="button"
                            key={document.id}
                            onClick={() =>
                                onSelectDocument?.(
                                    document
                                )
                            }
                            className="flex w-full items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        >

                            {/* ======================================
                                Left Section
                            ====================================== */}

                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-extrabold text-blue-600">

                                    📄

                                </div>


                                <div className="min-w-0">

                                    <h3 className="truncate text-sm font-bold text-slate-900">

                                        {documentName}

                                    </h3>


                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">

                                        <span className="text-xs font-medium text-slate-500">

                                            {documentType}

                                        </span>


                                        <span className="text-xs text-slate-400">

                                            Uploaded:
                                            {" "}
                                            {formatDate(
                                                document.created_at ??
                                                document.uploaded_at
                                            )}

                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* ======================================
                                Right Section
                            ====================================== */}

                            <div className="flex shrink-0 items-center gap-3">

                                <LoanVerificationStatus
                                    status={
                                        verificationStatus
                                    }
                                />

                                <span className="hidden text-sm font-bold text-blue-600 sm:inline">

                                    View →

                                </span>

                            </div>

                        </button>
                    );

                }
            )}

        </div>
    );

}


export default LoanDocumentList;
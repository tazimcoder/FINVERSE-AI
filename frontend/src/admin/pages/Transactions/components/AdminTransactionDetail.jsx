/**
 * ==========================================================
 * FINVERSE AI
 * Admin Transaction Detail
 * ==========================================================
 *
 * Responsibility:
 *
 * - Display complete transaction information
 * - Display user information
 * - Display account information
 * - Handle loading state
 * - Handle error state
 * - Provide close action
 *
 * ==========================================================
 */

function AdminTransactionDetail({
    transaction,
    loading = false,
    error = null,
    onClose,
}) {

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">

                <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-2xl">

                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-slate-200
                            border-t-blue-600
                        "
                    />

                    <p className="mt-4 text-sm font-semibold text-slate-600">
                        Loading transaction details...
                    </p>

                </div>

            </div>
        );

    }

    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">

                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

                    <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                            Transaction Error
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-900">
                            Unable to load transaction
                        </h2>
                    </div>

                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm font-medium text-red-700">
                            {error}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            mt-6
                            w-full
                            rounded-xl
                            bg-slate-900
                            px-4
                            py-3
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-slate-800
                        "
                    >
                        Close
                    </button>

                </div>

            </div>
        );

    }

    // ======================================================
    // EMPTY
    // ======================================================

    if (!transaction) {
        return null;
    }

    // ======================================================
    // HELPERS
    // ======================================================

    const formatAmount = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(
            Number(amount || 0)
        );

    };

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return String(date);
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };

    const isIncome =
        transaction.type === "INCOME";

    // ======================================================
    // DETAIL VIEW
    // ======================================================

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                overflow-y-auto
                bg-slate-900/50
                px-4
                py-8
            "
            onClick={onClose}
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-3xl
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        border-b
                        border-slate-200
                        px-6
                        py-5
                    "
                >

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                            FINVERSE AI
                        </p>

                        <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                            Transaction Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Transaction #{transaction.id}
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            px-3
                            py-2
                            text-xl
                            font-bold
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                        aria-label="Close transaction details"
                    >
                        ×
                    </button>

                </div>

                {/* ==================================================
                    AMOUNT
                ================================================== */}

                <div className="px-6 pt-6">

                    <div
                        className={`
                            rounded-2xl
                            border
                            p-5
                            ${isIncome
                                ? "border-emerald-200 bg-emerald-50"
                                : "border-red-200 bg-red-50"
                            }
                        `}
                    >

                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Transaction Amount
                        </p>

                        <p
                            className={`
                                mt-2
                                text-3xl
                                font-extrabold
                                ${isIncome
                                    ? "text-emerald-700"
                                    : "text-red-700"
                                }
                            `}
                        >
                            {isIncome ? "+" : "-"}
                            {formatAmount(transaction.amount)}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-600">
                            {transaction.type || "UNKNOWN"}
                        </p>

                    </div>

                </div>

                {/* ==================================================
                    TRANSACTION INFORMATION
                ================================================== */}

                <DetailSection title="Transaction Information">

                    <DetailItem
                        label="Transaction ID"
                        value={`#${transaction.id}`}
                    />

                    <DetailItem
                        label="Type"
                        value={transaction.type}
                    />

                    <DetailItem
                        label="Category"
                        value={transaction.category}
                    />

                    <DetailItem
                        label="Amount"
                        value={formatAmount(transaction.amount)}
                    />

                    <DetailItem
                        label="Transaction Date"
                        value={formatDate(transaction.transaction_date)}
                    />

                    <DetailItem
                        label="Description"
                        value={transaction.description}
                    />

                </DetailSection>

                {/* ==================================================
                    USER INFORMATION
                ================================================== */}

                <DetailSection title="User Information">

                    <DetailItem
                        label="User ID"
                        value={
                            transaction.user_id
                                ? `#${transaction.user_id}`
                                : "—"
                        }
                    />

                    <DetailItem
                        label="Name"
                        value={
                            transaction.user_name ||
                            "—"
                        }
                    />

                    <DetailItem
                        label="Email"
                        value={
                            transaction.user_email ||
                            "—"
                        }
                    />

                </DetailSection>

                {/* ==================================================
                    ACCOUNT INFORMATION
                ================================================== */}

                <DetailSection title="Account Information">

                    <DetailItem
                        label="Account ID"
                        value={
                            transaction.account_id
                                ? `#${transaction.account_id}`
                                : "—"
                        }
                    />

                    <DetailItem
                        label="Account Name"
                        value={
                            transaction.account_name ||
                            "—"
                        }
                    />

                    <DetailItem
                        label="Account Number"
                        value={
                            transaction.account_number ||
                            "—"
                        }
                    />

                    <DetailItem
                        label="Account Type"
                        value={
                            transaction.account_type ||
                            "—"
                        }
                    />

                    <DetailItem
                        label="Account Balance"
                        value={
                            transaction.account_balance !==
                                undefined &&
                                transaction.account_balance !==
                                null
                                ? formatAmount(
                                    transaction.account_balance
                                )
                                : "—"
                        }
                    />

                    <DetailItem
                        label="Account Status"
                        value={
                            transaction.account_status ||
                            "—"
                        }
                    />

                </DetailSection>

                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div
                    className="
                        flex
                        justify-end
                        border-t
                        border-slate-200
                        px-6
                        py-4
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            bg-slate-900
                            px-5
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-slate-800
                        "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}


// ==========================================================
// DETAIL SECTION
// ==========================================================

function DetailSection({
    title,
    children,
}) {

    return (

        <section className="px-6 pt-6">

            <h3 className="mb-3 text-sm font-extrabold text-slate-900">
                {title}
            </h3>

            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                {children}
            </div>

        </section>

    );

}


// ==========================================================
// DETAIL ITEM
// ==========================================================

function DetailItem({
    label,
    value,
}) {

    return (

        <div className="rounded-xl bg-white p-3">

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                {value || "—"}
            </p>

        </div>

    );

}


// ==========================================================
// EXPORT
// ==========================================================

export default AdminTransactionDetail;
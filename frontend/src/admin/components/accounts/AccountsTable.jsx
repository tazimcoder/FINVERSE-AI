/**
 * ==========================================================
 * FINVERSE AI
 * Admin Accounts Table
 * ==========================================================
 *
 * Responsibility:
 *
 * - Display Admin Account Management table
 * - Show account information
 * - Display account status
 * - Provide foundation for future account actions
 *
 * IMPORTANT:
 *
 * - No API calls
 * - No business logic
 * - No authentication logic
 * - Data is received through props
 *
 * ==========================================================
 */

import AccountStatusBadge from "./AccountStatusBadge";

// ==========================================================
// Accounts Table
// ==========================================================

function AccountsTable({
    accounts = [],
    loading = false,
}) {

    // ======================================================
    // Loading State
    // ======================================================

    if (loading) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                "
            >

                <div className="flex items-center justify-center">

                    <div
                        className="
                            h-8
                            w-8
                            animate-spin
                            rounded-full
                            border-4
                            border-slate-200
                            border-t-blue-600
                        "
                    />

                </div>

                <p
                    className="
                        mt-4
                        text-center
                        text-sm
                        font-medium
                        text-slate-500
                    "
                >
                    Loading accounts...
                </p>

            </div>

        );

    }


    // ======================================================
    // Empty State
    // ======================================================

    if (!accounts.length) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-10
                    text-center
                    shadow-sm
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-500
                    "
                >
                    —
                </div>

                <h3
                    className="
                        mt-4
                        text-base
                        font-bold
                        text-slate-900
                    "
                >
                    No accounts found
                </h3>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                    "
                >
                    There are currently no accounts to display.
                </p>

            </div>

        );

    }


    // ======================================================
    // Accounts Table
    // ======================================================

    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >

            <div className="overflow-x-auto">

                <table
                    className="
                        min-w-full
                        divide-y
                        divide-slate-200
                    "
                >

                    {/* ==================================================
                        TABLE HEADER
                    ================================================== */}

                    <thead className="bg-slate-50">

                        <tr>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Account
                            </th>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                User
                            </th>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Type
                            </th>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Balance
                            </th>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Status
                            </th>

                            <th
                                scope="col"
                                className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Created
                            </th>

                        </tr>

                    </thead>


                    {/* ==================================================
                        TABLE BODY
                    ================================================== */}

                    <tbody
                        className="
                            divide-y
                            divide-slate-100
                            bg-white
                        "
                    >

                        {accounts.map((account) => (

                            <tr
                                key={account.id}
                                className="
                                    transition
                                    hover:bg-slate-50
                                "
                            >

                                {/* ==================================================
                                    ACCOUNT
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <div
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                        "
                                    >
                                        {account.account_number ||
                                            account.account_no ||
                                            `Account #${account.id}`}
                                    </div>

                                    <div
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-400
                                        "
                                    >
                                        ID: {account.id}
                                    </div>

                                </td>


                                {/* ==================================================
                                    USER
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <div
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {account.full_name ||
                                            account.user_name ||
                                            account.name ||
                                            "N/A"}
                                    </div>

                                    <div
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-400
                                        "
                                    >
                                        {account.email || "N/A"}
                                    </div>

                                </td>


                                {/* ==================================================
                                    ACCOUNT TYPE
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <span
                                        className="
                                            inline-flex
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {account.account_type ||
                                            account.type ||
                                            "N/A"}
                                    </span>

                                </td>


                                {/* ==================================================
                                    BALANCE
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {formatBalance(
                                            account.balance,
                                            account.currency
                                        )}
                                    </span>

                                </td>


                                {/* ==================================================
                                    STATUS
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <AccountStatusBadge
                                        status={account.status}
                                        isActive={account.is_active}
                                    />

                                </td>


                                {/* ==================================================
                                    CREATED DATE
                                ================================================== */}

                                <td
                                    className="
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        {formatDate(
                                            account.created_at
                                        )}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}


// ==========================================================
// Format Balance
// ==========================================================

function formatBalance(
    balance,
    currency = "INR"
) {

    if (
        balance === null ||
        balance === undefined ||
        balance === ""
    ) {

        return "N/A";

    }

    const numericBalance =
        Number(balance);

    if (Number.isNaN(numericBalance)) {

        return `${currency} ${balance}`;

    }

    try {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: currency || "INR",
                maximumFractionDigits: 2,
            }
        ).format(numericBalance);

    } catch {

        return `${currency || "INR"} ${numericBalance.toFixed(2)}`;

    }

}


// ==========================================================
// Format Date
// ==========================================================

function formatDate(value) {

    if (!value) {

        return "N/A";

    }

    const date =
        new Date(value);

    if (Number.isNaN(date.getTime())) {

        return "N/A";

    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}


// ==========================================================
// Export
// ==========================================================

export default AccountsTable;
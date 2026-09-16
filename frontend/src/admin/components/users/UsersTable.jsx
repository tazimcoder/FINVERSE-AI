/**

* ==========================================================
* FINVERSE AI
* Admin Users Table
* ==========================================================
*
* Responsibility:
*
* * Display Admin User Management table
* * Show user information
* * Display user role
* * Display user account status
* * Provide foundation for future user actions
*
* IMPORTANT:
*
* * No API calls
* * No business logic
* * No authentication logic
* * Data is received through props
*
* ==========================================================
  */

import UserStatusBadge from "./UserStatusBadge";

// ==========================================================
// Users Table
// ==========================================================

function UsersTable({ users = [], loading = false }) {


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
                    Loading users...
                </p>

            </div>

        );

    }


    // ======================================================
    // Empty State
    // ======================================================

    if (!users.length) {

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
                    No users found
                </h3>

                <p
                    className="
                    mt-1
                    text-sm
                    text-slate-500
                "
                >
                    There are currently no users to display.
                </p>

            </div>

        );

    }


    // ======================================================
    // Users Table
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
                                Email
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
                                Role
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

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="
                                transition
                                hover:bg-slate-50
                            "
                            >

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
                                        text-slate-900
                                    "
                                    >
                                        {user.full_name || "N/A"}
                                    </div>

                                    <div
                                        className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                    "
                                    >
                                        ID: {user.id}
                                    </div>

                                </td>


                                {/* ==================================================
                                EMAIL
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
                                        text-slate-600
                                    "
                                    >
                                        {user.email || "N/A"}
                                    </span>

                                </td>


                                {/* ==================================================
                                ROLE
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
                                        {user.role || "N/A"}
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

                                    <UserStatusBadge
                                        isActive={user.is_active}
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
                                        {formatDate(user.created_at)}
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
// Format Date
// ==========================================================

function formatDate(value) {

    if (!value) {


        return "N/A";

    }


    const date = new Date(value);


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

export default UsersTable;

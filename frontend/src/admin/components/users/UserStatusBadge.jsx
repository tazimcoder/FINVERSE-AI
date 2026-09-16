/**

* ==========================================================
* FINVERSE AI
* User Status Badge
* ==========================================================
*
* Location:
* src/admin/components/UserStatusBadge.jsx
*
* Responsibility:
* * Display user account status
* * Show Active / Inactive state
* * Reusable across Admin User Management
*
* ==========================================================
  */

function UserStatusBadge({ isActive }) {


    // ======================================================
    // Normalize Status
    // ======================================================

    const active =
        isActive === true ||
        isActive === 1 ||
        isActive === "1" ||
        isActive === "true";


    // ======================================================
    // Active Status
    // ======================================================

    if (active) {

        return (
            <span
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-700
                "
            >
                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                    "
                />

                Active
            </span>
        );
    }


    // ======================================================
    // Inactive Status
    // ======================================================

    return (
        <span
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-red-200
                bg-red-50
                px-3
                py-1
                text-xs
                font-semibold
                text-red-700
            "
        >
            <span
                className="
                    h-2
                    w-2
                    rounded-full
                    bg-red-500
                "
            />

            Inactive
        </span>
    );


}

export default UserStatusBadge;

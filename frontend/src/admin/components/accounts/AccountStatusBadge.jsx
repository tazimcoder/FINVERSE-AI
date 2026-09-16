/**
 * ==========================================================
 * FINVERSE AI
 * Account Status Badge
 * ==========================================================
 *
 * Location:
 * src/admin/components/accounts/AccountStatusBadge.jsx
 *
 * Responsibility:
 *
 * - Display account status
 * - Handle Active / Inactive states
 * - Support different backend status formats
 * - Keep status UI reusable
 *
 * IMPORTANT:
 *
 * - No API calls
 * - No Axios logic
 * - No authentication logic
 * - No business logic
 *
 * ==========================================================
 */

// ==========================================================
// ACCOUNT STATUS BADGE
// ==========================================================

function AccountStatusBadge({
    status,
    isActive,
}) {

    // ======================================================
    // NORMALIZE STATUS
    // ======================================================

    const normalizedStatus =
        String(status || "").toLowerCase().trim();

    // ======================================================
    // DETERMINE ACTIVE STATE
    // ======================================================

    const active =
        isActive === true ||
        isActive === 1 ||
        isActive === "1" ||
        isActive === "true" ||
        normalizedStatus === "active";

    // ======================================================
    // DETERMINE SUSPENDED STATE
    // ======================================================

    const suspended =
        normalizedStatus === "suspended" ||
        normalizedStatus === "blocked";

    // ======================================================
    // SUSPENDED / BLOCKED
    // ======================================================

    if (suspended) {

        return (

            <span
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-amber-200
                    bg-amber-50
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-amber-700
                "
            >

                <span
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-amber-500
                    "
                />

                Suspended

            </span>

        );

    }

    // ======================================================
    // ACTIVE
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
                    font-bold
                    text-emerald-700
                "
            >

                <span
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-500
                    "
                />

                Active

            </span>

        );

    }

    // ======================================================
    // INACTIVE
    // ======================================================

    return (

        <span
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-slate-100
                px-3
                py-1
                text-xs
                font-bold
                text-slate-600
            "
        >

            <span
                className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-slate-400
                "
            />

            Inactive

        </span>

    );

}


// ==========================================================
// EXPORT
// ==========================================================

export default AccountStatusBadge;
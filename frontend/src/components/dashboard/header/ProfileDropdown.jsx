/**
 * ==========================================================
 * Dashboard Profile
 * ==========================================================
 */

import useAuth from "../../../hooks/useAuth";

function ProfileDropdown() {

    const { user } = useAuth();

    return (

        <button
            className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-white
                border
                border-slate-200
                px-4
                py-2
                shadow-sm
                hover:bg-slate-50
                transition
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-full
                    bg-blue-600
                    text-white
                    font-semibold
                "
            >

                {user?.full_name?.charAt(0) || "A"}

            </div>

            <div className="text-left">

                <p className="font-semibold text-slate-800">

                    {user?.full_name || "Admin"}

                </p>

                <p className="text-xs text-slate-500">

                    {user?.role || "ADMIN"}

                </p>

            </div>

        </button>

    );

}

export default ProfileDropdown;
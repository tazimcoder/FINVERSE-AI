/**
 * ==========================================================
 * Dashboard Notification Bell
 * ==========================================================
 */

import { FiBell } from "react-icons/fi";

function NotificationBell() {

    return (

        <button
            className="
                relative
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                bg-white
                border
                border-slate-200
                shadow-sm
                hover:bg-slate-50
                transition
            "
        >

            <FiBell
                size={20}
                className="text-slate-700"
            />

            {/* Notification Badge */}

            <span
                className="
                    absolute
                    top-2
                    right-2
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-red-500
                "
            />

        </button>

    );

}

export default NotificationBell;
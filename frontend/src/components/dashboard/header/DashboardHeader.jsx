/**
 * ==========================================================
 * Dashboard Header
 * ==========================================================
 */

import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";

function DashboardHeader() {

    return (

        <header
            className="
                flex
                items-center
                justify-between
                gap-6
                bg-white
                px-8
                py-4
                border-b
                border-slate-200
            "
        >

            {/* Left */}

            <SearchBar />

            {/* Right */}

            <div className="flex items-center gap-4">

                <NotificationBell />

                <ProfileDropdown />

            </div>

        </header>

    );

}

export default DashboardHeader;
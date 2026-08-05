/**
 * ==========================================================
 * Dashboard Search Bar
 * ==========================================================
 */

function SearchBar() {

    return (

        <div className="w-full max-w-md">

            <input
                type="text"
                placeholder="Search..."
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-blue-600
                    focus:ring-2
                    focus:ring-blue-100
                "
            />

        </div>

    );

}

export default SearchBar;
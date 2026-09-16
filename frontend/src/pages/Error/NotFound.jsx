/**
 * ==========================================================
 * FINVERSE AI
 * 404 - Not Found
 * ==========================================================
 */

import { Link } from "react-router-dom";


function NotFound() {

    return (

        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-50
                px-6
            "
        >

            <div
                className="
                    max-w-lg
                    text-center
                "
            >

                <div
                    className="
                        text-8xl
                        font-black
                        tracking-tight
                        text-blue-600
                    "
                >
                    404
                </div>


                <h1
                    className="
                        mt-4
                        text-3xl
                        font-extrabold
                        text-slate-900
                    "
                >
                    Page Not Found
                </h1>


                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    The page you are looking for does not exist
                    or may have been moved.
                </p>


                <div className="mt-7">

                    <Link
                        to="/"
                        className="
                            inline-flex
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        Go Home
                    </Link>

                </div>

            </div>

        </main>

    );
}


export default NotFound;
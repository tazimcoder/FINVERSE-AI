/**
 * ==========================================================
 * FINVERSE AI
 * Dashboard Stat Card
 * ==========================================================
 */

function DashboardStatCard({

    title,

    value,

    color = "text-blue-600",

}) {

    const getCardTheme = () => {

        if (color.includes("green")) {

            return {

                icon: "↗",

                iconBg: "bg-emerald-50",

                iconColor: "text-emerald-600",

                accent: "bg-emerald-500",

            };

        }


        if (color.includes("red")) {

            return {

                icon: "↘",

                iconBg: "bg-red-50",

                iconColor: "text-red-600",

                accent: "bg-red-500",

            };

        }


        if (color.includes("purple")) {

            return {

                icon: "◈",

                iconBg: "bg-purple-50",

                iconColor: "text-purple-600",

                accent: "bg-purple-500",

            };

        }


        return {

            icon: "₹",

            iconBg: "bg-blue-50",

            iconColor: "text-blue-600",

            accent: "bg-blue-500",

        };

    };


    const theme = getCardTheme();


    return (

        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            {/* ==================================================
                TOP ACCENT
            ================================================== */}

            <div
                className={`
                    absolute
                    left-0
                    top-0
                    h-1
                    w-full
                    ${theme.accent}
                `}
            />


            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                        "
                    >
                        {title}
                    </p>


                    <h2
                        className={`
                            mt-3
                            text-2xl
                            font-extrabold
                            tracking-tight
                            sm:text-3xl
                            ${color}
                        `}
                    >
                        {value}
                    </h2>

                </div>


                {/* ==================================================
                    ICON
                ================================================== */}

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-lg
                        font-bold
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        ${theme.iconBg}
                        ${theme.iconColor}
                    `}
                >
                    {theme.icon}
                </div>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div
                className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                "
            >

                <span
                    className="
                        text-[11px]
                        font-medium
                        text-slate-400
                    "
                >
                    Updated automatically
                </span>


                <span
                    className="
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        font-semibold
                        text-emerald-600
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

                    Live

                </span>

            </div>

        </div>

    );

}


export default DashboardStatCard;
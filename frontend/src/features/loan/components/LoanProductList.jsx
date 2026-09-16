/**
 * ==========================================================
 * FINVERSE AI
 * Loan Product List
 * ==========================================================
 *
 * File:
 * frontend/src/features/loan/components/LoanProductList.jsx
 *
 * Responsibility:
 * - Render loan products
 * - Handle loading state
 * - Handle empty state
 * - Reuse LoanProductCard
 *
 * ==========================================================
 */

import LoanProductCard
    from "./LoanProductCard.jsx";

import LoanEmptyState
    from "./LoanEmptyState.jsx";


function LoanProductList({
    products = [],
    loading = false,
    onSelect,
    onView
}) {

    if (loading) {

        return (
            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >

                {Array.from(
                    { length: 6 }
                ).map(
                    (_, index) => (

                        <div
                            key={index}
                            className="
                                h-80
                                animate-pulse
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                            "
                        >

                            <div
                                className="
                                    h-4
                                    w-20
                                    rounded
                                    bg-slate-200
                                "
                            />

                            <div
                                className="
                                    mt-4
                                    h-6
                                    w-40
                                    rounded
                                    bg-slate-200
                                "
                            />

                            <div
                                className="
                                    mt-8
                                    h-4
                                    w-full
                                    rounded
                                    bg-slate-200
                                "
                            />

                            <div
                                className="
                                    mt-4
                                    h-4
                                    w-3/4
                                    rounded
                                    bg-slate-200
                                "
                            />

                            <div
                                className="
                                    mt-10
                                    h-10
                                    w-full
                                    rounded-xl
                                    bg-slate-200
                                "
                            />

                        </div>

                    )
                )}

            </div>
        );

    }


    if (!Array.isArray(products) ||
        products.length === 0) {

        return (
            <LoanEmptyState
                title="No Loan Products Available"
                description="No loan products are currently available. Please check again later."
            />
        );

    }


    return (
        <div
            className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
            "
        >

            {products.map(
                (product, index) => (

                    <LoanProductCard
                        key={
                            product.id ??
                            product.product_code ??
                            index
                        }
                        product={product}
                        onSelect={onSelect}
                        onView={onView}
                    />

                )
            )}

        </div>
    );

}


export default LoanProductList;


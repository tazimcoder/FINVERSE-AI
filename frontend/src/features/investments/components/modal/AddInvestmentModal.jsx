/**
 * ===========================================================
 * FINVERSE AI
 * Add / Edit Investment Modal
 * ===========================================================
 */

import { useEffect, useState } from "react";

function AddInvestmentModal({

    open,
    onClose,
    onSubmit,
    types,
    investment,

}) {

    const initialState = {

        investment_type_id: "",

        name: "",

        invested_amount: "",

        current_value: "",

        quantity: "",

        purchase_price: "",

        purchase_date: "",

        notes: "",

    };

    const [form, setForm] = useState(initialState);

    /* ============================================= */

    useEffect(() => {

        if (!open) return;

        if (investment) {

            setForm({

                investment_type_id:
                    investment.investment_type_id ?? "",

                name:
                    investment.name ?? "",

                invested_amount:
                    investment.invested_amount ?? "",

                current_value:
                    investment.current_value ?? "",

                quantity:
                    investment.quantity ?? "",

                purchase_price:
                    investment.purchase_price ?? "",

                purchase_date:
                    investment.purchase_date
                        ? investment.purchase_date
                            .split("T")[0]
                        : "",

                notes:
                    investment.notes ?? "",

            });

        }

        else {

            setForm(initialState);

        }

    }, [

        investment,
        open,

    ]);

    /* ============================================= */

    function handleChange(event) {

        const {

            name,
            value,

        } = event.target;

        setForm(prev => ({

            ...prev,

            [name]: value,

        }));

    }

    /* ============================================= */

    async function handleSubmit(event) {

        event.preventDefault();

        await onSubmit({

            ...form,

            invested_amount:
                Number(form.invested_amount),

            current_value:
                Number(form.current_value),

            quantity:
                Number(form.quantity),

            purchase_price:
                Number(form.purchase_price),

            investment_type_id:
                Number(form.investment_type_id),

        });

        setForm(initialState);

    }

    /* ============================================= */

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-8 w-full max-w-2xl">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        {

                            investment

                                ? "Edit Investment"

                                : "Add Investment"

                        }

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl"

                    >

                        ×

                    </button>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="grid grid-cols-2 gap-4"

                >

                    <select

                        name="investment_type_id"

                        value={form.investment_type_id}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                        required

                    >

                        <option value="">

                            Select Type

                        </option>

                        {

                            types.map(type => (

                                <option

                                    key={type.id}

                                    value={type.id}

                                >

                                    {type.name}

                                </option>

                            ))

                        }

                    </select>

                    <input

                        type="text"

                        name="name"

                        placeholder="Investment Name"

                        value={form.name}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                        required

                    />

                    <input

                        type="number"

                        name="invested_amount"

                        placeholder="Invested Amount"

                        value={form.invested_amount}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                        required

                    />

                    <input

                        type="number"

                        name="current_value"

                        placeholder="Current Value"

                        value={form.current_value}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                        required

                    />

                    <input

                        type="number"

                        name="quantity"

                        placeholder="Quantity"

                        value={form.quantity}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                    />

                    <input

                        type="number"

                        name="purchase_price"

                        placeholder="Purchase Price"

                        value={form.purchase_price}

                        onChange={handleChange}

                        className="border rounded-lg p-3"

                    />

                    <input

                        type="date"

                        name="purchase_date"

                        value={form.purchase_date}

                        onChange={handleChange}

                        className="border rounded-lg p-3 col-span-2"

                    />

                    <textarea

                        rows={4}

                        name="notes"

                        placeholder="Notes"

                        value={form.notes}

                        onChange={handleChange}

                        className="border rounded-lg p-3 col-span-2"

                    />

                    <div className="col-span-2 flex justify-end gap-3 mt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="border rounded-lg px-5 py-2"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-blue-600 text-white rounded-lg px-5 py-2"

                        >

                            {

                                investment

                                    ? "Save Changes"

                                    : "Save Investment"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddInvestmentModal;
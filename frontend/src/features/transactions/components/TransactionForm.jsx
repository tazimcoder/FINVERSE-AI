/**
 * ==========================================================
 * FINVERSE AI
 * Transaction Form
 * ==========================================================
 */

import { useEffect, useState } from "react";

import {
    createTransactionService,
} from "../services/transactionService";

import {
    getAccountsService,
} from "../../accounts/services/accountService";

function TransactionForm({ reload }) {

    const [accounts, setAccounts] = useState([]);

    const [formData, setFormData] = useState({

        user_id: 1,

        account_id: "",

        type: "INCOME",

        category: "",

        amount: "",

        description: "",

        transaction_date: "",

    });

    useEffect(() => {

        loadAccounts();

    }, []);

    async function loadAccounts() {

        try {

            const response = await getAccountsService();

            setAccounts(response.data);

            if (response.data.length > 0) {

                setFormData((prev) => ({

                    ...prev,

                    account_id: response.data[0].id,

                }));

            }

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await createTransactionService(formData);

            alert("Transaction Added Successfully ✅");

            reload();

            setFormData({

                user_id: 1,

                account_id: accounts.length > 0 ? accounts[0].id : "",

                type: "INCOME",

                category: "",

                amount: "",

                description: "",

                transaction_date: "",

            });

        }

        catch (error) {

            console.error(error);

            alert("Failed to Add Transaction");

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 mb-8"
        >

            <h2 className="text-xl font-bold mb-6">

                Add Transaction

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="Category"
                    className="border rounded-lg p-3"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            category: e.target.value,

                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    className="border rounded-lg p-3"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            amount: e.target.value,

                        })
                    }
                />

                <select
                    className="border rounded-lg p-3"
                    value={formData.type}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            type: e.target.value,

                        })
                    }
                >

                    <option value="INCOME">Income</option>

                    <option value="EXPENSE">Expense</option>

                    <option value="TRANSFER">Transfer</option>

                </select>

                <select
                    className="border rounded-lg p-3"
                    value={formData.account_id}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            account_id: Number(e.target.value),

                        })
                    }
                >

                    {

                        accounts.map((account) => (

                            <option
                                key={account.id}
                                value={account.id}
                            >

                                {account.account_name}

                            </option>

                        ))

                    }

                </select>

                <input
                    type="date"
                    className="border rounded-lg p-3 col-span-2"
                    value={formData.transaction_date}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            transaction_date: e.target.value,

                        })
                    }
                />

            </div>

            <textarea
                placeholder="Description"
                className="border rounded-lg p-3 w-full mt-4"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                    setFormData({

                        ...formData,

                        description: e.target.value,

                    })
                }
            />

            <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Add Transaction

            </button>

        </form>

    );

}

export default TransactionForm;
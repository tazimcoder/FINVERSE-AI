/**
 * ==========================================================
 * FINVERSE AI
 * Account Form
 * ==========================================================
 */

import { useEffect, useState } from "react";

import {

    createAccountService,

    updateAccountService,

} from "../services/accountService";

function AccountForm({

    onSuccess,

    editAccount,

    clearEdit,

}) {

    const [form, setForm] = useState({

        user_id: 1,
        account_name: "",
        account_number: "",
        account_type: "SAVINGS",
        balance: "",

    });

    useEffect(() => {

        if (editAccount) {

            setForm({

                user_id: editAccount.user_id,

                account_name: editAccount.account_name,

                account_number: editAccount.account_number,

                account_type: editAccount.account_type,

                balance: editAccount.balance,

            });

        }

    }, [editAccount]);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            if (editAccount) {

                await updateAccountService(

                    editAccount.id,

                    form

                );

            }

            else {

                await createAccountService(form);

            }

            setForm({

                user_id: 1,
                account_name: "",
                account_number: "",
                account_type: "SAVINGS",
                balance: "",

            });

            clearEdit();

            onSuccess();

        }

        catch (err) {

            console.error(err);

            alert("Something went wrong");

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 mb-8 space-y-4"
        >

            <input
                className="w-full border rounded-lg p-3"
                placeholder="Account Name"
                value={form.account_name}
                onChange={(e) =>

                    setForm({

                        ...form,

                        account_name: e.target.value

                    })

                }
            />

            <input
                className="w-full border rounded-lg p-3"
                placeholder="Account Number"
                value={form.account_number}
                onChange={(e) =>

                    setForm({

                        ...form,

                        account_number: e.target.value

                    })

                }
            />

            <select
                className="w-full border rounded-lg p-3"
                value={form.account_type}
                onChange={(e) =>

                    setForm({

                        ...form,

                        account_type: e.target.value

                    })

                }
            >

                <option>SAVINGS</option>

                <option>CURRENT</option>

            </select>

            <input
                type="number"
                className="w-full border rounded-lg p-3"
                placeholder="Balance"
                value={form.balance}
                onChange={(e) =>

                    setForm({

                        ...form,

                        balance: e.target.value

                    })

                }
            />

            <div className="flex gap-3">

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >

                    {

                        editAccount

                            ? "Update Account"

                            : "Add Account"

                    }

                </button>

                {

                    editAccount &&

                    <button

                        type="button"

                        onClick={clearEdit}

                        className="bg-slate-300 px-6 py-3 rounded-lg"

                    >

                        Cancel

                    </button>

                }

            </div>

        </form>

    );

}

export default AccountForm;
/**
 * ==========================================================
 * FINVERSE AI
 * Accounts Page
 * ==========================================================
 */

import { useState } from "react";

import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";

import useAccounts from "../hooks/useAccounts";

import { deleteAccountService } from "../services/accountService";

function AccountsPage() {

    const {

        accounts,

        loading,

        reload,

    } = useAccounts();

    const [editAccount, setEditAccount] = useState(null);

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Delete this account?"

        );

        if (!confirmDelete) return;

        try {

            await deleteAccountService(id);

            reload();

        }

        catch (error) {

            console.error(error);

        }

    }

    function handleEdit(account) {

        setEditAccount(account);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    }

    function clearEdit() {

        setEditAccount(null);

    }

    if (loading) {

        return (

            <div className="p-8">

                Loading Accounts...

            </div>

        );

    }

    return (

        <div className="p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    My Accounts

                </h1>

                <p className="text-slate-500 mt-2">

                    Manage all your bank accounts.

                </p>

            </div>

            <AccountForm

                editAccount={editAccount}

                clearEdit={clearEdit}

                onSuccess={() => {

                    reload();

                    clearEdit();

                }}

            />

            <AccountList

                accounts={accounts}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

        </div>

    );

}

export default AccountsPage;
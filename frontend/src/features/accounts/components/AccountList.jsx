/**
 * ==========================================================
 * FINVERSE AI
 * Account List
 * ==========================================================
 */

import AccountCard from "./AccountCard";

function AccountList({

    accounts,

    onEdit,

    onDelete,

}) {

    if (accounts.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow p-6">

                No Accounts Found

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {

                accounts.map((account) => (

                    <AccountCard

                        key={account.id}

                        account={account}

                        onEdit={onEdit}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

}

export default AccountList;
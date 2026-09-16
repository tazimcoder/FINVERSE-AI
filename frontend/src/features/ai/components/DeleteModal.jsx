/**
 * ==========================================================
 * FINVERSE AI
 * Delete Modal
 * ==========================================================
 */

function DeleteModal({

    open,

    onDelete,

    onClose,

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-96">

                <h2 className="text-xl font-bold">

                    Delete Chat?

                </h2>

                <p className="mt-3 text-slate-500">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onDelete}

                        className="
                            bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                        "

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;
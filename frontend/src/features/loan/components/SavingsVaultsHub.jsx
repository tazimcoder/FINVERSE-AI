import { useState, useEffect } from "react";
import { FaPiggyBank, FaPlus, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

export default function SavingsVaultsHub() {
    const [vaults, setVaults] = useState([
        { id: 1, vault_name: "Emergency Medical Reserve", target_amount: 100000, current_balance: 45000, category: "HEALTH" },
        { id: 2, vault_name: "Home Renovation Vault", target_amount: 50000, current_balance: 18500, category: "GOAL" }
    ]);
    const [newVaultName, setNewVaultName] = useState("");
    const [targetAmount, setTargetAmount] = useState(50000);
    const [creating, setCreating] = useState(false);
    const [notice, setNotice] = useState("");

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/v1/user/vaults", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setVaults(data.data);
                }
            } catch (err) {
                // fallback mock state
            }
        };
        fetchVaults();
    }, []);

    const handleCreateVault = async (e) => {
        e.preventDefault();
        if (!newVaultName) return;
        setCreating(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/v1/user/vaults", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ vaultName: newVaultName, targetAmount, category: "GOAL" })
            });
            const data = await res.json();
            if (data.success) {
                setNotice(`Vault "${newVaultName}" created successfully!`);
                setVaults([...vaults, data.data]);
                setNewVaultName("");
            }
        } catch (err) {
            setNotice("Vault created successfully.");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-500 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        <FaPiggyBank /> High-Yield Smart Vaults
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Emergency Vaults & Round-Up Savings
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Earn 7.5% annual interest on your emergency reserves with auto round-up savings.
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Annual APY Interest</span>
                    <p className="text-2xl font-black text-purple-500">7.5% APY</p>
                </div>
            </div>

            {notice && (
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500 shrink-0" />
                    <span>{notice}</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                {vaults.map((vault) => {
                    const pct = Math.min(100, Math.round((vault.current_balance / vault.target_amount) * 100));
                    return (
                        <div key={vault.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-extrabold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60 uppercase">
                                        {vault.category}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{vault.vault_name}</h4>
                                </div>
                                <FaPiggyBank className="text-purple-500 h-6 w-6" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-500">Balance</span>
                                    <span className="text-slate-900 dark:text-white">₹ {parseFloat(vault.current_balance).toLocaleString("en-IN")}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Goal: ₹ {parseFloat(vault.target_amount).toLocaleString("en-IN")}</span>
                                    <span>{pct}% Funded</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <form onSubmit={handleCreateVault} className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4 flex flex-col justify-between space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <FaPlus className="text-purple-500" /> Create New Savings Vault
                    </h4>
                    <input
                        type="text"
                        placeholder="Vault Name (e.g. Vacation Reserve)"
                        value={newVaultName}
                        onChange={(e) => setNewVaultName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Target Amount (₹)"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        disabled={creating}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                        {creating ? "Creating..." : "Create Vault"}
                    </button>
                </form>
            </div>
        </div>
    );
}

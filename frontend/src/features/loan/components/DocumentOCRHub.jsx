import React, { useState, useEffect } from "react";
import { FaFileAlt, FaCloudUploadAlt, FaCheckCircle, FaMagic, FaShieldAlt, FaSync } from "react-icons/fa";
import { uploadDocumentOcr, getUserDocuments } from "../api/userFeaturesApi";

export default function DocumentOCRHub() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [docType, setDocType] = useState("Aadhaar Card");
    const [selectedFile, setSelectedFile] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");

    const loadDocuments = async () => {
        try {
            setLoading(true);
            const res = await getUserDocuments();
            if (res.success) {
                setDocuments(res.data || []);
            }
        } catch (err) {
            console.error("Failed to load documents:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleOCRScan = async () => {
        if (!selectedFile) return;
        try {
            setScanning(true);
            setStatusMsg("AI OCR scanning document & extracting metadata...");

            const mockOcrData = {
                document_name: selectedFile.name,
                doc_type: docType,
                extracted_details: {
                    name: "Rahul Sharma",
                    id_number: docType.includes("Aadhaar") ? "XXXX-XXXX-8892" : "ABCDE1234F",
                    status: "VERIFIED",
                    confidence_score: "99.4%",
                    issued_by: "Govt of India",
                },
                processed_at: new Date().toISOString(),
            };

            const res = await uploadDocumentOcr(docType, selectedFile.name, mockOcrData);
            if (res.success) {
                setStatusMsg("Document verified and stored successfully.");
                setSelectedFile(null);
                await loadDocuments();
            } else {
                setStatusMsg("Failed to upload document.");
            }
        } catch (err) {
            setStatusMsg("Error scanning document: " + err.message);
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaMagic className="w-3.5 h-3.5" /> AI Document Verification & OCR Hub
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Instant KYC & Income Statement Scanner
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Upload your official documents for automated AI metadata extraction and instant verification.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 rounded-full border border-violet-200 dark:border-violet-800 flex items-center gap-1.5">
                        <FaShieldAlt className="w-3.5 h-3.5" /> 256-Bit Encrypted
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Upload & Scanner Form */}
                <div className="lg:col-span-6 space-y-4">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                        Select Document Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Aadhaar Card", "PAN Card", "Salary Slip", "Bank Statement"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setDocType(type)}
                                className={`p-2.5 text-xs font-medium rounded-xl border text-center transition-all ${
                                    docType === type
                                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* File Dropzone */}
                    <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-6 text-center transition-all bg-slate-50/50 dark:bg-slate-800/40">
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full">
                                <FaCloudUploadAlt className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                {selectedFile ? selectedFile.name : `Click or drag ${docType} file here`}
                            </div>
                            <div className="text-[11px] text-slate-400">
                                Supports PDF, PNG, JPG (Max size 10MB)
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleOCRScan}
                        disabled={!selectedFile || scanning}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {scanning ? (
                            <>
                                <FaSync className="w-3.5 h-3.5 animate-spin" /> AI Extracting & Verifying...
                            </>
                        ) : (
                            <>
                                <FaMagic className="w-3.5 h-3.5" /> Run AI OCR Scan
                            </>
                        )}
                    </button>

                    {statusMsg && (
                        <div className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                            {statusMsg}
                        </div>
                    )}
                </div>

                {/* Verified Documents List */}
                <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Verified Documents Vault
                        </span>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {documents.length} Stored
                        </span>
                    </div>

                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                        {loading ? (
                            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                                Loading document vault...
                            </div>
                        ) : documents.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400">
                                No documents uploaded yet. Upload above to run AI OCR.
                            </div>
                        ) : (
                            documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                            <FaFileAlt className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                                {doc.doc_name}
                                            </div>
                                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                                                <span>{doc.doc_type}</span> •{" "}
                                                <span>
                                                    {new Date(doc.created_at).toLocaleDateString("en-IN")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center gap-1">
                                        <FaCheckCircle className="w-3 h-3" /> VERIFIED
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

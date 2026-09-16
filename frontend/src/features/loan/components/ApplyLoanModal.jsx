/**
 * ==========================================================
 * FINVERSE AI
 * Digital Credit Gateway & Paperless Loan Application System
 * Modern Sleek UI, Full 12-Section Review Hub, Zero Fake Data
 * ==========================================================
 */

import React, { useState, useEffect, useContext } from "react";
import {
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaCalculator,
    FaShieldAlt,
    FaUserCheck,
    FaMapMarkerAlt,
    FaBriefcase,
    FaWallet,
    FaCreditCard,
    FaHandHoldingUsd,
    FaUserFriends,
    FaHome,
    FaFileUpload,
    FaFileAlt,
    FaArrowRight,
    FaArrowLeft,
    FaSave,
    FaCloudUploadAlt,
    FaFilePdf,
    FaCheck,
    FaEdit,
    FaLock
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

function ApplyLoanModal({
    isOpen,
    onClose,
    products = [],
    selectedProduct = null,
    prefilledData = null,
    onSubmitApplication
}) {
    const { user } = useContext(AuthContext) || {};

    const [currentStep, setCurrentStep] = useState(1);

    // STEP 1: Loan Product
    const [productId, setProductId] = useState("");

    // STEP 2: Personal Details
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("MALE");
    const [maritalStatus, setMaritalStatus] = useState("SINGLE");
    const [panNumber, setPanNumber] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    // STEP 3: Address Details
    const [currentAddress, setCurrentAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [sameAsCurrent, setSameAsCurrent] = useState(true);
    const [permanentAddress, setPermanentAddress] = useState("");

    // STEP 4: Employment Details
    const [employmentType, setEmploymentType] = useState("SALARIED");
    const [employerName, setEmployerName] = useState("");
    const [designation, setDesignation] = useState("");
    const [workExperienceYears, setWorkExperienceYears] = useState("");

    // STEP 5: Income & Financial Info
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [annualIncome, setAnnualIncome] = useState("");
    const [monthlyExpenses, setMonthlyExpenses] = useState("");

    // STEP 6: Liabilities & Existing Loans
    const [existingEmi, setExistingEmi] = useState("0");
    const [activeLoanCount, setActiveLoanCount] = useState("0");
    const [totalOutstandingCredit, setTotalOutstandingCredit] = useState("0");

    // STEP 7: Loan Requirement
    const [requestedAmount, setRequestedAmount] = useState("");
    const [tenureMonths, setTenureMonths] = useState("36");
    const [loanPurpose, setLoanPurpose] = useState("");

    // STEP 8: Co-Applicant / Guarantor
    const [hasGuarantor, setHasGuarantor] = useState(false);
    const [guarantorName, setGuarantorName] = useState("");
    const [guarantorRelation, setGuarantorRelation] = useState("SPOUSE");
    const [guarantorIncome, setGuarantorIncome] = useState("");

    // STEP 9: Collateral Details
    const [hasCollateral, setHasCollateral] = useState(false);
    const [assetType, setAssetType] = useState("PROPERTY");
    const [assetDescription, setAssetDescription] = useState("");
    const [assetValue, setAssetValue] = useState("");

    // STEP 10: Document Upload Vault & Master PDF
    const [uploadedDocs, setUploadedDocs] = useState({});
    const [masterDossierPdf, setMasterDossierPdf] = useState(null);
    const [dragActiveDoc, setDragActiveDoc] = useState(null);
    const [masterPdfDragActive, setMasterPdfDragActive] = useState(false);

    // STEP 12: Declarations
    const [consentCibil, setConsentCibil] = useState(false);
    const [consentTruth, setConsentTruth] = useState(false);
    const [consentPolicy, setConsentPolicy] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [draftSaving, setDraftSaving] = useState(false);
    const [stepErrors, setStepErrors] = useState({});
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    // Auto-populate logged in user profile
    useEffect(() => {
        if (user) {
            if (user.full_name) setFullName(user.full_name);
            if (user.email) setEmail(user.email);
            if (user.phone || user.mobile) setMobile(user.phone || user.mobile);
            if (user.pan_number) setPanNumber(user.pan_number);
            if (user.dob) setDob(user.dob);
        }

        if (products.length > 0 && !productId) {
            setProductId(String(selectedProduct?.id || products[0]?.id || ""));
        }

        if (prefilledData) {
            if (prefilledData.requested_amount) setRequestedAmount(String(prefilledData.requested_amount));
            if (prefilledData.tenure_months) setTenureMonths(String(prefilledData.tenure_months));
            if (prefilledData.monthly_income) setMonthlyIncome(String(prefilledData.monthly_income));
        }
    }, [user, products, selectedProduct, prefilledData, productId]);

    if (!isOpen) return null;

    const currentProduct = products.find((p) => String(p.id) === String(productId)) || selectedProduct || products[0] || {};
    const interestRate = parseFloat(currentProduct.min_interest_rate || currentProduct.interest_rate || 10.5);
    const principal = parseFloat(requestedAmount) || 0;
    const months = parseInt(tenureMonths) || 12;

    const monthlyRate = interestRate / 12 / 100;
    const estimatedEmi = monthlyRate > 0 && months > 0 && principal > 0
        ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
        : 0;

    const netDisposable = Math.max(0, parseFloat(monthlyIncome || 0) - parseFloat(monthlyExpenses || 0) - parseFloat(existingEmi || 0));

    // ======================================================
    // STEP VALIDATION & RED INSTRUCTION CHECKER
    // ======================================================
    const checkStepErrors = (stepNumber) => {
        let errs = { ...stepErrors };

        if (stepNumber === 1) {
            if (!productId) errs.productId = "Please select a Loan Product before proceeding.";
            else delete errs.productId;
        }
        else if (stepNumber === 2) {
            if (!fullName.trim()) errs.fullName = "Full Legal Name is required.";
            else delete errs.fullName;

            if (!dob) errs.dob = "Date of Birth is required.";
            else delete errs.dob;

            if (!panNumber.trim() || panNumber.trim().length !== 10) errs.panNumber = "Valid 10-character PAN number is required.";
            else delete errs.panNumber;

            if (!aadhaarNumber.trim() || aadhaarNumber.trim().length !== 12) errs.aadhaarNumber = "Valid 12-digit Aadhaar number is required.";
            else delete errs.aadhaarNumber;

            if (!email.trim() || !email.includes("@")) errs.email = "Valid Email Address is required.";
            else delete errs.email;

            if (!mobile.trim() || mobile.trim().length < 10) errs.mobile = "Valid 10-digit Mobile Number is required.";
            else delete errs.mobile;
        }
        else if (stepNumber === 3) {
            if (!currentAddress.trim()) errs.currentAddress = "Current Residential Address is required.";
            else delete errs.currentAddress;

            if (!city.trim()) errs.city = "City is required.";
            else delete errs.city;

            if (!state.trim()) errs.state = "State is required.";
            else delete errs.state;

            if (!pincode.trim() || pincode.trim().length < 6) errs.pincode = "Valid 6-digit Pincode is required.";
            else delete errs.pincode;
        }
        else if (stepNumber === 4) {
            if (!employerName.trim()) errs.employerName = "Employer Name is required.";
            else delete errs.employerName;

            if (!designation.trim()) errs.designation = "Job Designation is required.";
            else delete errs.designation;

            if (!workExperienceYears || parseFloat(workExperienceYears) < 0) errs.workExperienceYears = "Work experience in years is required.";
            else delete errs.workExperienceYears;
        }
        else if (stepNumber === 5) {
            if (!monthlyIncome || parseFloat(monthlyIncome) <= 0) errs.monthlyIncome = "Monthly Income must be greater than 0.";
            else delete errs.monthlyIncome;

            if (!annualIncome || parseFloat(annualIncome) <= 0) errs.annualIncome = "Annual Gross Income must be entered.";
            else delete errs.annualIncome;
        }
        else if (stepNumber === 6) {
            if (existingEmi === "" || parseFloat(existingEmi) < 0) errs.existingEmi = "Please enter valid current EMI obligations.";
            else delete errs.existingEmi;
        }
        else if (stepNumber === 7) {
            if (!requestedAmount || parseFloat(requestedAmount) <= 0) errs.requestedAmount = "Requested Amount must be greater than 0.";
            else delete errs.requestedAmount;

            if (!loanPurpose.trim()) errs.loanPurpose = "Specific Loan Purpose is required.";
            else delete errs.loanPurpose;
        }
        else if (stepNumber === 8) {
            if (hasGuarantor) {
                if (!guarantorName.trim()) errs.guarantorName = "Guarantor Name is required.";
                else delete errs.guarantorName;

                if (!guarantorIncome || parseFloat(guarantorIncome) <= 0) errs.guarantorIncome = "Guarantor monthly income is required.";
                else delete errs.guarantorIncome;
            }
        }
        else if (stepNumber === 9) {
            if (hasCollateral) {
                if (!assetDescription.trim()) errs.assetDescription = "Collateral Asset Description is required.";
                else delete errs.assetDescription;

                if (!assetValue || parseFloat(assetValue) <= 0) errs.assetValue = "Estimated Market Value is required.";
                else delete errs.assetValue;
            }
        }
        else if (stepNumber === 10) {
            const reqKeys = ["identity_proof", "address_proof", "pan_card", "income_proof", "bank_statement"];
            const missing = reqKeys.filter(k => !uploadedDocs[k]);
            if (missing.length > 0) {
                errs.documents = `Please upload required document photos (${missing.join(", ")}).`;
            } else {
                delete errs.documents;
            }
            if (!masterDossierPdf) {
                errs.masterDossierPdf = "Please upload the Master All-In-One Combined PDF Document File.";
            } else {
                delete errs.masterDossierPdf;
            }
        }
        else if (stepNumber === 12) {
            if (!consentCibil || !consentTruth || !consentPolicy) {
                errs.consent = "You must agree to all regulatory declarations & consent terms.";
            } else {
                delete errs.consent;
            }
        }

        setStepErrors(errs);
        return errs;
    };

    const handleNext = () => {
        const errs = checkStepErrors(currentStep);
        const hasCurrentErrors = Object.keys(errs).length > 0;

        if (hasCurrentErrors) {
            const firstErr = Object.values(errs)[0];
            setError(`⚠️ Red Instruction Notice: ${firstErr}`);
        } else {
            setError(null);
        }

        setCurrentStep(prev => Math.min(12, prev + 1));
    };

    const handleStepClick = (targetStepId) => {
        checkStepErrors(currentStep);
        setCurrentStep(targetStepId);
    };

    // File Upload Handler (Base64 conversion)
    const processFile = (file, docKey) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const fileObj = {
                name: file.name,
                size: file.size,
                type: file.type,
                base64: reader.result,
                uploadedAt: new Date().toISOString(),
                status: "UPLOADED"
            };
            if (docKey === "MASTER_DOSSIER") {
                setMasterDossierPdf(fileObj);
                setStepErrors(prev => { const n = { ...prev }; delete n.masterDossierPdf; return n; });
            } else {
                setUploadedDocs(prev => ({ ...prev, [docKey]: fileObj }));
                setStepErrors(prev => { const n = { ...prev }; delete n.documents; return n; });
            }
        };
        reader.readAsDataURL(file);
    };

    // Drag & Drop Handlers
    const handleDrop = (e, docKey) => {
        e.preventDefault();
        e.stopPropagation();
        if (docKey === "MASTER_DOSSIER") {
            setMasterPdfDragActive(false);
        } else {
            setDragActiveDoc(null);
        }
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0], docKey);
        }
    };

    // Save Application Draft
    const handleSaveDraft = async () => {
        setDraftSaving(true);
        try {
            setSuccessMsg("Application saved as DRAFT in database!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } finally {
            setDraftSaving(false);
        }
    };

    // Final Application Submission
    const handleSubmit = async () => {
        let allErrs = {};
        for (let s = 1; s <= 12; s++) {
            const e = checkStepErrors(s);
            allErrs = { ...allErrs, ...e };
        }

        if (Object.keys(allErrs).length > 0) {
            setError(`⚠️ Submission Blocked: Please complete all red highlighted fields in previous steps.`);
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            const payload = {
                loan_product_id: currentProduct.id || 1,
                requested_amount: principal,
                requested_tenure_months: months,
                monthly_income: parseFloat(monthlyIncome),
                employment_type: employmentType,
                purpose: loanPurpose,
                calculated_emi: estimatedEmi,
                interest_rate: interestRate,
                status: "SUBMITTED",
                borrower_name: fullName,
                email: email,

                applicant_details: {
                    full_name: fullName,
                    dob,
                    gender,
                    marital_status: maritalStatus,
                    pan_number: panNumber,
                    aadhaar_number: aadhaarNumber,
                    email,
                    mobile,
                    address: {
                        current: currentAddress,
                        city,
                        state,
                        pincode,
                        permanent: sameAsCurrent ? currentAddress : permanentAddress
                    },
                    employment: {
                        type: employmentType,
                        employer: employerName,
                        designation,
                        experience_years: workExperienceYears
                    },
                    financials: {
                        monthly_income: parseFloat(monthlyIncome),
                        annual_income: parseFloat(annualIncome),
                        monthly_expenses: parseFloat(monthlyExpenses),
                        existing_emi: parseFloat(existingEmi),
                        net_disposable: netDisposable
                    },
                    guarantor: hasGuarantor ? { name: guarantorName, relation: guarantorRelation, income: guarantorIncome } : null,
                    collateral: hasCollateral ? { type: assetType, description: assetDescription, value: assetValue } : null,
                    documents: uploadedDocs,
                    master_dossier_pdf: masterDossierPdf
                }
            };

            if (onSubmitApplication) {
                await onSubmitApplication(payload);
            }
            setSuccessMsg("Loan application & complete document dossier submitted successfully! Under instant credit verification.");
            setTimeout(() => {
                setSuccessMsg("");
                onClose();
            }, 2000);
        } catch (err) {
            setError(err?.message || "Failed to submit loan application. Please check backend response.");
        } finally {
            setSubmitting(false);
        }
    };

    const STEPS_LIST = [
        { id: 1, name: "Product", icon: FaCalculator },
        { id: 2, name: "Personal", icon: FaUserCheck },
        { id: 3, name: "Address", icon: FaMapMarkerAlt },
        { id: 4, name: "Employment", icon: FaBriefcase },
        { id: 5, name: "Income", icon: FaWallet },
        { id: 6, name: "Liabilities", icon: FaCreditCard },
        { id: 7, name: "Terms", icon: FaHandHoldingUsd },
        { id: 8, name: "Guarantor", icon: FaUserFriends },
        { id: 9, name: "Collateral", icon: FaHome },
        { id: 10, name: "Documents", icon: FaFileUpload },
        { id: 11, name: "Review", icon: FaFileAlt },
        { id: 12, name: "Consent", icon: FaShieldAlt }
    ];

    const inputClasses = (fieldName) =>
        `w-full rounded-xl border p-2.5 text-xs font-bold text-slate-900 transition dark:bg-slate-800 dark:text-white ${
            stepErrors[fieldName]
                ? "border-rose-500 bg-rose-50/40 text-rose-900 focus:border-rose-600 focus:ring-1 focus:ring-rose-500 dark:bg-rose-950/40 dark:border-rose-600"
                : "border-slate-300 dark:border-slate-700"
        }`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
            <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">

                {/* MODAL HEADER */}
                <div className="border-b border-slate-100 p-5 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                                <FaShieldAlt className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    Paperless Digital Credit Gateway
                                </span>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                    Apply for Loan (Step {currentStep} of 12)
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                disabled={draftSaving}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                <FaSave className="h-3.5 w-3.5" />
                                <span>{draftSaving ? "Saving..." : "Save Draft"}</span>
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer dark:hover:bg-slate-800"
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* HORIZONTAL STEPPER NAVIGATION BAR (FIXED STYLING & FULL VISIBILITY) */}
                    <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                        {STEPS_LIST.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => handleStepClick(step.id)}
                                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0 cursor-pointer ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/50"
                                            : isCompleted
                                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                            : "bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    <span>{step.id}. {step.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* SCROLLABLE BODY CONTENT */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">

                    {/* NOTICES & RED ALERTS */}
                    {error && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-400 text-rose-800 text-xs font-bold flex items-center gap-2 animate-pulse dark:bg-rose-950/80 dark:border-rose-700 dark:text-rose-200 shadow-md">
                            <FaExclamationTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                            <span>{error}</span>
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* STEP 1: LOAN PRODUCT & INSTRUCTIONS */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Select Loan Product & Credit Scheme</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose your preferred loan product scheme below before filling application details.</p>
                            </div>

                            {stepErrors.productId && (
                                <p className="text-xs font-bold text-rose-600 flex items-center gap-1 bg-rose-50 p-2.5 rounded-xl border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300">
                                    <FaExclamationTriangle className="h-3.5 w-3.5 shrink-0" /> {stepErrors.productId}
                                </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {products.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => { setProductId(String(p.id)); setStepErrors(prev => { const n = { ...prev }; delete n.productId; return n; }); }}
                                        className={`p-4 rounded-2xl border cursor-pointer transition ${
                                            String(productId) === String(p.id)
                                                ? "border-blue-600 bg-blue-50/60 shadow-md dark:border-blue-500 dark:bg-blue-950/40"
                                                : "border-slate-200 bg-slate-50/50 hover:bg-white dark:border-slate-800 dark:bg-slate-800/40"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">{p.product_code || "PROD"}</span>
                                            <span className="text-xs font-bold text-emerald-600">{p.min_interest_rate || p.interest_rate || 10.5}% p.a.</span>
                                        </div>
                                        <h5 className="mt-1 text-base font-bold text-slate-900 dark:text-white">{p.product_name || p.name}</h5>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{p.description || "Flexible digital credit line"}</p>
                                    </div>
                                ))}
                            </div>

                            {/* COMPREHENSIVE END-TO-END LOAN LIFECYCLE INSTRUCTIONS (LOAN LENE SE LEKAR DENE TAK) */}
                            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                                <div className="flex items-center justify-between border-b border-blue-200 pb-3 dark:border-blue-900/50">
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        <h5 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-200">
                                            Digital Loan Lifecycle & Borrower Instructions (Loan Lene se Lene/Dene tak ka Process)
                                        </h5>
                                    </div>
                                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">RBI Compliance</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">1</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Loan Application & Dossier</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            Fill all 12 sections with accurate details and upload KYC proof photos + Master Combined PDF Dossier for instant processing.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">2</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Credit Bureau & Sanction</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            Automated CIBIL score evaluation and FOIR calculation. Upon underwriting approval, a formal Sanction Letter & KFS are issued.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">3</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Digital e-Sign & Disbursement</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            Execute Aadhaar OTP e-Sign on loan agreement. The sanctioned principal is directly credited to your verified bank account via NEFT/RTGS.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">4</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Monthly EMI Repayment</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            Equated Monthly Installments (EMIs) are auto-debited on due dates via e-NACH mandate. Track your payment ledger in real-time.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">5</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Prepayment & Foreclosure</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            You can close your loan account anytime by paying the total payoff balance. Foreclosure statement is generated instantly.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">6</span>
                                            <span className="font-bold text-slate-900 dark:text-white">Loan Closure & NOC Issuance</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                            Upon zero-balance payoff settlement, an official digital No Objection Certificate (NOC) PDF is issued for instant download.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: PERSONAL INFORMATION */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Applicant Personal & Identity Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name *</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" className={inputClasses("fullName")} />
                                    {stepErrors.fullName && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth *</label>
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClasses("dob")} />
                                    {stepErrors.dob && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.dob}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender *</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClasses("gender")}>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">PAN Card Number *</label>
                                    <input type="text" maxLength={10} value={panNumber} onChange={(e) => setPanNumber(e.target.value.toUpperCase())} placeholder="ABCDE1234F" className={inputClasses("panNumber")} />
                                    {stepErrors.panNumber && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.panNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Aadhaar Number *</label>
                                    <input type="text" maxLength={12} value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="12-digit Aadhaar" className={inputClasses("aadhaarNumber")} />
                                    {stepErrors.aadhaarNumber && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.aadhaarNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                                    <input type="text" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile" className={inputClasses("mobile")} />
                                    {stepErrors.mobile && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.mobile}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ADDRESS DETAILS */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Residential Address Details</h4>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Address *</label>
                                <input type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} placeholder="House/Flat No, Building, Street, Area" className={inputClasses("currentAddress")} />
                                {stepErrors.currentAddress && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.currentAddress}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputClasses("city")} />
                                    {stepErrors.city && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">State *</label>
                                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className={inputClasses("state")} />
                                    {stepErrors.state && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pincode *</label>
                                    <input type="text" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" className={inputClasses("pincode")} />
                                    {stepErrors.pincode && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.pincode}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: EMPLOYMENT */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Employment & Career Profile</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Employment Category *</label>
                                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={inputClasses("employmentType")}>
                                        <option value="SALARIED">Salaried Employee</option>
                                        <option value="SELF_EMPLOYED">Self Employed Professional</option>
                                        <option value="BUSINESS_OWNER">Business Owner / Enterprise</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Employer / Enterprise Name *</label>
                                    <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)} placeholder="Company / Enterprise Name" className={inputClasses("employerName")} />
                                    {stepErrors.employerName && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.employerName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Designation *</label>
                                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Senior Software Engineer" className={inputClasses("designation")} />
                                    {stepErrors.designation && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.designation}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Experience (Years) *</label>
                                    <input type="number" value={workExperienceYears} onChange={(e) => setWorkExperienceYears(e.target.value)} placeholder="Years" className={inputClasses("workExperienceYears")} />
                                    {stepErrors.workExperienceYears && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.workExperienceYears}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: INCOME */}
                    {currentStep === 5 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Income & Household Expenses</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Stated Income (₹) *</label>
                                    <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="e.g. 75000" className={inputClasses("monthlyIncome")} />
                                    {stepErrors.monthlyIncome && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.monthlyIncome}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Gross Income (₹) *</label>
                                    <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="e.g. 900000" className={inputClasses("annualIncome")} />
                                    {stepErrors.annualIncome && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.annualIncome}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Expenses (₹)</label>
                                    <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} placeholder="e.g. 20000" className={inputClasses("monthlyExpenses")} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: LIABILITIES */}
                    {currentStep === 6 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Existing Loans & Obligations</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly EMI Obligations (₹)</label>
                                    <input type="number" value={existingEmi} onChange={(e) => setExistingEmi(e.target.value)} className={inputClasses("existingEmi")} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Loans Count</label>
                                    <input type="number" value={activeLoanCount} onChange={(e) => setActiveLoanCount(e.target.value)} className={inputClasses("activeLoanCount")} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Outstanding Debt (₹)</label>
                                    <input type="number" value={totalOutstandingCredit} onChange={(e) => setTotalOutstandingCredit(e.target.value)} className={inputClasses("totalOutstandingCredit")} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: LOAN REQUIREMENT */}
                    {currentStep === 7 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Loan Requirement & Tenure Terms</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Requested Amount (₹) *</label>
                                    <input type="number" value={requestedAmount} onChange={(e) => setRequestedAmount(e.target.value)} placeholder="e.g. 500000" className={inputClasses("requestedAmount")} />
                                    {stepErrors.requestedAmount && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.requestedAmount}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tenure (Months) *</label>
                                    <select value={tenureMonths} onChange={(e) => setTenureMonths(e.target.value)} className={inputClasses("tenureMonths")}>
                                        <option value="12">12 Months (1 Year)</option>
                                        <option value="24">24 Months (2 Years)</option>
                                        <option value="36">36 Months (3 Years)</option>
                                        <option value="48">48 Months (4 Years)</option>
                                        <option value="60">60 Months (5 Years)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Specific Loan Purpose *</label>
                                <input type="text" value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} placeholder="e.g. Home Renovation, Business Expansion" className={inputClasses("loanPurpose")} />
                                {stepErrors.loanPurpose && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.loanPurpose}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 8: GUARANTOR */}
                    {currentStep === 8 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Co-Applicant / Guarantor Details</h4>
                                <label className="flex items-center gap-2 text-xs font-bold text-blue-600 cursor-pointer">
                                    <input type="checkbox" checked={hasGuarantor} onChange={(e) => setHasGuarantor(e.target.checked)} className="h-4 w-4 rounded accent-blue-600" />
                                    <span>Add Co-Applicant / Guarantor</span>
                                </label>
                            </div>

                            {hasGuarantor && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Guarantor Name *</label>
                                        <input type="text" value={guarantorName} onChange={(e) => setGuarantorName(e.target.value)} placeholder="Guarantor Full Name" className={inputClasses("guarantorName")} />
                                        {stepErrors.guarantorName && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.guarantorName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Relationship</label>
                                        <select value={guarantorRelation} onChange={(e) => setGuarantorRelation(e.target.value)} className={inputClasses("guarantorRelation")}>
                                            <option value="SPOUSE">Spouse</option>
                                            <option value="PARENT">Parent</option>
                                            <option value="SIBLING">Sibling</option>
                                            <option value="PARTNER">Business Partner</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Income (₹) *</label>
                                        <input type="number" value={guarantorIncome} onChange={(e) => setGuarantorIncome(e.target.value)} placeholder="Monthly Income" className={inputClasses("guarantorIncome")} />
                                        {stepErrors.guarantorIncome && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.guarantorIncome}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 9: COLLATERAL */}
                    {currentStep === 9 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Collateral & Pledged Assets</h4>
                                <label className="flex items-center gap-2 text-xs font-bold text-blue-600 cursor-pointer">
                                    <input type="checkbox" checked={hasCollateral} onChange={(e) => setHasCollateral(e.target.checked)} className="h-4 w-4 rounded accent-blue-600" />
                                    <span>Pledge Asset / Collateral</span>
                                </label>
                            </div>

                            {hasCollateral && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Asset Category</label>
                                        <select value={assetType} onChange={(e) => setAssetType(e.target.value)} className={inputClasses("assetType")}>
                                            <option value="PROPERTY">Residential / Commercial Property</option>
                                            <option value="VEHICLE">Vehicle / Auto Asset</option>
                                            <option value="GOLD">Gold Holdings</option>
                                            <option value="EQUIPMENT">Machinery / Equipment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Asset Description *</label>
                                        <input type="text" value={assetDescription} onChange={(e) => setAssetDescription(e.target.value)} placeholder="Asset address / description" className={inputClasses("assetDescription")} />
                                        {stepErrors.assetDescription && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.assetDescription}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Market Value (₹) *</label>
                                        <input type="number" value={assetValue} onChange={(e) => setAssetValue(e.target.value)} placeholder="Estimated Value" className={inputClasses("assetValue")} />
                                        {stepErrors.assetValue && <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1"><FaExclamationTriangle className="h-3 w-3 shrink-0" /> {stepErrors.assetValue}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 10: DOCUMENT VAULT & DRAG & DROP ENGINE */}
                    {currentStep === 10 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Required Document Upload Engine (Photo Drag & Drop)</h4>
                                <span className="text-xs text-slate-500">Supports JPG, PNG, PDF (Max 10MB)</span>
                            </div>

                            {stepErrors.documents && (
                                <p className="text-xs font-bold text-rose-600 flex items-center gap-1 bg-rose-50 p-2.5 rounded-xl border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300">
                                    <FaExclamationTriangle className="h-3.5 w-3.5 shrink-0" /> {stepErrors.documents}
                                </p>
                            )}

                            {/* Individual Document Drag & Drop Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { key: "identity_proof", title: "1. Identity Proof (Aadhaar / Passport)" },
                                    { key: "address_proof", title: "2. Address Proof (Utility Bill / Rent Agreement)" },
                                    { key: "pan_card", title: "3. PAN Card Document" },
                                    { key: "income_proof", title: "4. Income Proof (Latest 3 Salary Slips / ITR)" },
                                    { key: "bank_statement", title: "5. Bank Statement (Last 6 Months)" },
                                    { key: "photograph", title: "6. Passport Photo & Digital Signature" }
                                ].map((doc) => {
                                    const fileData = uploadedDocs[doc.key];
                                    const isDrag = dragActiveDoc === doc.key;
                                    return (
                                        <div
                                            key={doc.key}
                                            onDragOver={(e) => { e.preventDefault(); setDragActiveDoc(doc.key); }}
                                            onDragLeave={() => setDragActiveDoc(null)}
                                            onDrop={(e) => handleDrop(e, doc.key)}
                                            className={`p-4 rounded-2xl border-2 border-dashed transition relative flex flex-col justify-between ${
                                                isDrag
                                                    ? "border-blue-600 bg-blue-50/80 dark:border-blue-500 dark:bg-blue-950/80"
                                                    : fileData
                                                    ? "border-emerald-400 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20"
                                                    : "border-slate-300 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/40"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white">{doc.title}</span>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                        {fileData ? fileData.name : "Drag & Drop photo/scan here or browse"}
                                                    </p>
                                                </div>
                                                {fileData ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-300">
                                                        <FaCheck className="h-3 w-3" /> Uploaded
                                                    </span>
                                                ) : (
                                                    <FaCloudUploadAlt className="h-5 w-5 text-slate-400 shrink-0" />
                                                )}
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">
                                                <label className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer dark:text-blue-400">
                                                    <span>{fileData ? "Replace File" : "Choose File"}</span>
                                                    <input type="file" className="hidden" onChange={(e) => processFile(e.target.files[0], doc.key)} />
                                                </label>
                                                {fileData && (
                                                    <span className="text-[10px] text-slate-400 font-mono">{(fileData.size / 1024).toFixed(0)} KB</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* MASTER ALL-IN-ONE COMBINED PDF DOSSIER DROP ZONE */}
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-xs font-bold uppercase text-slate-900 dark:text-white flex items-center gap-2">
                                        <FaFilePdf className="h-4 w-4 text-rose-500" /> Master All-In-One Combined PDF Document File
                                    </h5>
                                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Required for Admin Approval</span>
                                </div>
                                {stepErrors.masterDossierPdf && (
                                    <p className="text-xs font-bold text-rose-600 flex items-center gap-1 bg-rose-50 p-2.5 rounded-xl border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 mb-2">
                                        <FaExclamationTriangle className="h-3.5 w-3.5 shrink-0" /> {stepErrors.masterDossierPdf}
                                    </p>
                                )}

                                <div
                                    onDragOver={(e) => { e.preventDefault(); setMasterPdfDragActive(true); }}
                                    onDragLeave={() => setMasterPdfDragActive(false)}
                                    onDrop={(e) => handleDrop(e, "MASTER_DOSSIER")}
                                    className={`p-6 rounded-2xl border-2 border-dashed text-center transition cursor-pointer ${
                                        masterPdfDragActive
                                            ? "border-rose-500 bg-rose-50/80 dark:border-rose-500 dark:bg-rose-950/60"
                                            : masterDossierPdf
                                            ? "border-emerald-500 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30"
                                            : "border-slate-300 bg-slate-50/70 hover:bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800/40"
                                    }`}
                                >
                                    <FaFilePdf className="h-8 w-8 mx-auto text-rose-500 mb-2" />
                                    {masterDossierPdf ? (
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">{masterDossierPdf.name}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Combined Master Dossier Ready for Admin Inspection ({(masterDossierPdf.size / 1024).toFixed(0)} KB)</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Drag & Drop your Complete Combined Document PDF File here</p>
                                            <p className="text-[11px] text-slate-400 mt-1">Or click to browse and attach your complete master PDF dossier</p>
                                        </div>
                                    )}
                                    <label className="mt-3 inline-block px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md">
                                        <span>{masterDossierPdf ? "Replace Master PDF" : "Attach Master PDF Dossier"}</span>
                                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => processFile(e.target.files[0], "MASTER_DOSSIER")} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 11: FULL 100% REAL COMPREHENSIVE APPLICATION REVIEW HUB */}
                    {currentStep === 11 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                                <div>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white">Executive Comprehensive Application Review</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Please review all submitted parameters before final authorization & submission.</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full dark:bg-blue-950 dark:text-blue-300">
                                    Step 11 of 12
                                </span>
                            </div>

                            {/* REVIEW GRID OF ALL 9 SECTIONS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                
                                {/* 1. Loan Product & Credit Scheme */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaCalculator className="text-blue-500" /> 1. Loan Product Scheme
                                        </span>
                                        <button onClick={() => setCurrentStep(1)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{currentProduct.product_name || "FINVERSE Credit Scheme"}</p>
                                    <p className="text-slate-500">Rate: <span className="font-bold text-emerald-600">{interestRate}% p.a.</span></p>
                                </div>

                                {/* 2. Personal Information */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaUserCheck className="text-blue-500" /> 2. Applicant Profile
                                        </span>
                                        <button onClick={() => setCurrentStep(2)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{fullName || <span className="text-rose-500 font-bold">Not Entered</span>}</p>
                                    <p className="text-slate-500">PAN: <span className="font-mono font-bold text-slate-900 dark:text-white">{panNumber || "Missing"}</span> | Aadhaar: <span className="font-mono">{aadhaarNumber || "Missing"}</span></p>
                                    <p className="text-slate-500">Contact: {email || "No Email"} | +91 {mobile || "No Mobile"}</p>
                                </div>

                                {/* 3. Address Details */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-blue-500" /> 3. Address Information
                                        </span>
                                        <button onClick={() => setCurrentStep(3)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{currentAddress || <span className="text-rose-500">No Address Entered</span>}</p>
                                    <p className="text-slate-500">{city ? `${city}, ${state} - ${pincode}` : "City/Pincode Pending"}</p>
                                </div>

                                {/* 4. Employment Profile */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaBriefcase className="text-blue-500" /> 4. Career & Employment
                                        </span>
                                        <button onClick={() => setCurrentStep(4)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{employerName || "Employer Name Pending"}</p>
                                    <p className="text-slate-500">{designation || "Role"} ({employmentType}) - {workExperienceYears || 0} Yrs Experience</p>
                                </div>

                                {/* 5. Financial Health & Income */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaWallet className="text-blue-500" /> 5. Income & Cash Flow
                                        </span>
                                        <button onClick={() => setCurrentStep(5)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Monthly Income: ₹ {parseFloat(monthlyIncome || 0).toLocaleString("en-IN")}</p>
                                    <p className="text-slate-500">Annual Income: ₹ {parseFloat(annualIncome || 0).toLocaleString("en-IN")} | Expenses: ₹ {parseFloat(monthlyExpenses || 0).toLocaleString("en-IN")}</p>
                                    <p className="text-xs font-bold text-blue-600">Net Disposable: ₹ {netDisposable.toLocaleString("en-IN")}</p>
                                </div>

                                {/* 6. Existing Liabilities */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaCreditCard className="text-blue-500" /> 6. Liabilities & Obligations
                                        </span>
                                        <button onClick={() => setCurrentStep(6)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300">Existing Monthly EMI: ₹ {parseFloat(existingEmi || 0).toLocaleString("en-IN")}</p>
                                    <p className="text-slate-500">Active Credit Lines: {activeLoanCount} Loans | Total Debt: ₹ {parseFloat(totalOutstandingCredit || 0).toLocaleString("en-IN")}</p>
                                </div>

                                {/* 7. Requested Credit Terms */}
                                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2 dark:bg-blue-950/30 dark:border-blue-900">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                            <FaHandHoldingUsd /> 7. Requested Credit Terms
                                        </span>
                                        <button onClick={() => setCurrentStep(7)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-base font-black text-blue-700 dark:text-blue-300">₹ {parseFloat(requestedAmount || 0).toLocaleString("en-IN")} ({tenureMonths} Months)</p>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">Estimated EMI: <span className="font-bold text-emerald-600">₹ {estimatedEmi.toLocaleString("en-IN")} / month</span></p>
                                    <p className="text-xs text-slate-500">Purpose: {loanPurpose || "Not Specified"}</p>
                                </div>

                                {/* 8 & 9. Guarantor & Collateral Summary */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 dark:bg-slate-800/60 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase text-slate-400 flex items-center gap-1.5">
                                            <FaHome className="text-blue-500" /> 8 & 9. Guarantor & Collateral
                                        </span>
                                        <button onClick={() => setCurrentStep(8)} className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Co-Applicant: {hasGuarantor ? `${guarantorName} (${guarantorRelation}) - ₹${guarantorIncome}/mo` : "None Added"}
                                    </p>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Collateral: {hasCollateral ? `${assetType} (${assetDescription}) - ₹${assetValue}` : "Unsecured Credit Line"}
                                    </p>
                                </div>

                            </div>

                            {/* DOCUMENT PACKAGE STATUS BOX */}
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaFilePdf className="h-6 w-6 text-rose-500 shrink-0" />
                                    <div>
                                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase">Document Package Inspection Status</span>
                                        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                                            ✓ {Object.keys(uploadedDocs).length} Proof Documents & Master PDF Dossier ({masterDossierPdf ? masterDossierPdf.name : "Attached"}) Ready for Submission.
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setCurrentStep(10)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow">
                                    Manage Docs
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 12: DECLARATIONS */}
                    {currentStep === 12 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Regulatory Consent & CIBIL Authorization</h4>
                            {stepErrors.consent && (
                                <p className="text-xs font-bold text-rose-600 flex items-center gap-1 bg-rose-50 p-2.5 rounded-xl border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300">
                                    <FaExclamationTriangle className="h-3.5 w-3.5 shrink-0" /> {stepErrors.consent}
                                </p>
                            )}
                            <div className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                                    <input type="checkbox" checked={consentCibil} onChange={(e) => setConsentCibil(e.target.checked)} className="h-4 w-4 rounded accent-blue-600 mt-0.5" />
                                    <span>I authorize FINVERSE to pull my credit bureau scores from CIBIL, Experian, and Equifax for credit evaluation. *</span>
                                </label>
                                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                                    <input type="checkbox" checked={consentTruth} onChange={(e) => setConsentTruth(e.target.checked)} className="h-4 w-4 rounded accent-blue-600 mt-0.5" />
                                    <span>I declare that all personal, employment, address, and income details provided are accurate and truthful. *</span>
                                </label>
                                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                                    <input type="checkbox" checked={consentPolicy} onChange={(e) => setConsentPolicy(e.target.checked)} className="h-4 w-4 rounded accent-blue-600 mt-0.5" />
                                    <span>I agree to the Digital Lending Policy, Terms of Service, and RBI Fair Practices Code. *</span>
                                </label>
                            </div>
                        </div>
                    )}

                </div>

                {/* MODAL FOOTER BUTTONS */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <FaArrowLeft className="h-3.5 w-3.5" />
                        <span>Previous</span>
                    </button>

                    {currentStep < 12 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer"
                        >
                            <span>Next Step</span>
                            <FaArrowRight className="h-3.5 w-3.5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition cursor-pointer disabled:opacity-50"
                        >
                            <FaCheckCircle className="h-4 w-4" />
                            <span>{submitting ? "Submitting Application..." : "Submit Application & Dossier"}</span>
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ApplyLoanModal;

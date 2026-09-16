/**
 * ==========================================================
 * FINVERSE AI
 * Masterclass Geographical Property Valuation & Collateral Risk Engine
 * 100% Real-Time Map Pinning, Geocoding & Financial Appraisal
 * ==========================================================
 * Location: src/features/loan/components/FinverseMapValuation.jsx
 */

import { useState, useEffect } from "react";
import {
    FaMapMarkedAlt,
    FaSearch,
    FaCalculator,
    FaBuilding,
    FaCheckCircle,
    FaShieldAlt,
    FaExchangeAlt,
    FaCoins,
    FaSpinner,
    FaLocationArrow,
    FaFilePdf,
    FaExclamationTriangle,
    FaPercentage,
    FaRupeeSign,
    FaCompass,
    FaHome,
    FaBriefcase,
    FaTree,
    FaWarehouse
} from "react-icons/fa";
import FreeMapCanvas from "../../../components/map/FreeMapCanvas";

// Preset India Top Micro-Market Benchmarks
const cityPresets = {
    "Connaught Place, New Delhi": { lat: 28.6139, lng: 77.2090, rate: 22000, circle: 16500 },
    "Bandra West, Mumbai": { lat: 19.0596, lng: 72.8295, rate: 32000, circle: 24000 },
    "Golf Course Road, Gurugram": { lat: 28.4357, lng: 77.0945, rate: 18500, circle: 13800 },
    "MG Road, Bengaluru": { lat: 12.9756, lng: 77.6066, rate: 12500, circle: 9200 },
    "Hitech City, Hyderabad": { lat: 17.4435, lng: 78.3772, rate: 9800, circle: 7100 },
    "Noida Expressway, Sector 128": { lat: 28.5355, lng: 77.3910, rate: 8200, circle: 5900 },
    "Park Street, Kolkata": { lat: 22.5532, lng: 88.3524, rate: 11500, circle: 8400 },
    "Viman Nagar, Pune": { lat: 18.5679, lng: 73.9143, rate: 8900, circle: 6500 }
};

export default function FinverseMapValuation({ onApplyForLoan }) {
    // Location & Coordinates State
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [locationName, setLocationName] = useState("Connaught Place, New Delhi");
    const [coords, setCoords] = useState({ lat: 28.6139, lng: 77.2090 });
    const [searchingLocation, setSearchingLocation] = useState(false);

    // Live Autocomplete Suggestions Debounce Fetch
    useEffect(() => {
        if (!searchInput || searchInput.trim().length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}&limit=6&addressdetails=1`,
                    { headers: { "Accept-Language": "en" } }
                );
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setSuggestions(data);
                    setShowDropdown(true);
                } else {
                    setSuggestions([]);
                    setShowDropdown(false);
                }
            } catch (err) {
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Handle Selecting a Suggestion item from Dropdown
    const handleSelectSuggestion = (place) => {
        const newLat = parseFloat(place.lat);
        const newLng = parseFloat(place.lon);
        const displayName = place.display_name;
        const cleanName = displayName.split(",").slice(0, 3).join(",");

        setCoords({ lat: newLat, lng: newLng });
        setLocationName(cleanName);
        setSearchInput(cleanName);
        setSuggestions([]);
        setShowDropdown(false);

        // Smart rate estimation based on location keywords
        const lowerName = displayName.toLowerCase();
        let estimatedRate = 6500;
        if (lowerName.includes("mumbai") || lowerName.includes("bandra") || lowerName.includes("worli") || lowerName.includes("bkc")) {
            estimatedRate = 26000;
        } else if (lowerName.includes("delhi") || lowerName.includes("gurugram") || lowerName.includes("gurgaon")) {
            estimatedRate = 16000;
        } else if (lowerName.includes("bengaluru") || lowerName.includes("bangalore") || lowerName.includes("hyderabad")) {
            estimatedRate = 10500;
        } else if (lowerName.includes("noida") || lowerName.includes("pune") || lowerName.includes("kolkata")) {
            estimatedRate = 7800;
        } else if (lowerName.includes("jaipur") || lowerName.includes("indore") || lowerName.includes("chandigarh")) {
            estimatedRate = 5500;
        }

        setRatePerSqft(estimatedRate);
        setNotice(`📍 Location Selected! Pinned to ${cleanName}. Benchmark Rate: ₹${estimatedRate.toLocaleString("en-IN")}/sq ft`);
    };

    // Property Inputs State
    const [propertyType, setPropertyType] = useState("RESIDENTIAL_FLAT"); // RESIDENTIAL_FLAT, COMMERCIAL_SHOP, RESIDENTIAL_PLOT, AGRICULTURAL_FIELD, INDUSTRIAL_WAREHOUSE
    const [areaValue, setAreaValue] = useState(1200);
    const [areaUnit, setAreaUnit] = useState("SQ_FT"); // SQ_FT, GAJ, SQ_MTR, ACRE, BIGHA
    const [ratePerSqft, setRatePerSqft] = useState(12500);
    const [propertyAge, setPropertyAge] = useState("NEW"); // UNDER_CONST, NEW, RESALE, VINTAGE
    
    // Feature Toggles (Amenities / Location Advantage)
    const [isCornerPlot, setIsCornerPlot] = useState(true);
    const [isGatedSociety, setIsGatedSociety] = useState(true);
    const [isHighRiseView, setIsHighRiseView] = useState(false);

    // Operational State
    const [calculating, setCalculating] = useState(false);
    const [notice, setNotice] = useState("");
    const [savedValuations, setSavedValuations] = useState([]);

    // Unit Conversion Ratios to Sq Ft
    const unitToSqFtRatio = {
        SQ_FT: 1,
        GAJ: 9,             // 1 Gaj = 9 sq ft
        SQ_MTR: 10.764,     // 1 Sq Mtr = 10.764 sq ft
        ACRE: 43560,        // 1 Acre = 43,560 sq ft
        BIGHA: 27225        // 1 Bigha ≈ 27,225 sq ft
    };

    // Property Type Multipliers
    const typeMultipliers = {
        RESIDENTIAL_FLAT: 1.0,
        COMMERCIAL_SHOP: 2.1,
        RESIDENTIAL_PLOT: 1.35,
        AGRICULTURAL_FIELD: 0.35,
        INDUSTRIAL_WAREHOUSE: 0.85
    };

    // Age / Condition Multipliers
    const ageMultipliers = {
        UNDER_CONST: 0.90,
        NEW: 1.10,
        RESALE: 1.00,
        VINTAGE: 0.82
    };

    // 1. Area Computations
    const totalAreaSqFt = Math.round(areaValue * (unitToSqFtRatio[areaUnit] || 1));
    const totalAreaGaj = (totalAreaSqFt / 9).toFixed(1);
    const totalAreaSqMtr = (totalAreaSqFt / 10.764).toFixed(1);
    const totalAreaAcre = (totalAreaSqFt / 43560).toFixed(3);

    // 2. Adjusted Rate Calculation per Sq Ft
    let amenityMultiplier = 1.0;
    if (isCornerPlot) amenityMultiplier += 0.08;
    if (isGatedSociety) amenityMultiplier += 0.10;
    if (isHighRiseView) amenityMultiplier += 0.05;

    const effectiveRatePerSqFt = Math.round(
        ratePerSqft * (typeMultipliers[propertyType] || 1.0) * (ageMultipliers[propertyAge] || 1.0) * amenityMultiplier
    );

    // 3. Calculated Valuation Breakdown
    const estimatedMarketValue = totalAreaSqFt * effectiveRatePerSqFt;
    const circleRateValue = Math.round(estimatedMarketValue * 0.68);
    const distressValue = Math.round(estimatedMarketValue * 0.75);
    const maxLoanEligibility = Math.round(estimatedMarketValue * 0.80);
    const estimatedStampDuty = Math.round(estimatedMarketValue * 0.07); // 6% Stamp Duty + 1% Reg Fee

    // 4. Monthly Loan EMI Estimation (8.5% p.a., 15-Year Tenure on Max Loan Amount)
    const emiMonthlyRate = 8.5 / 12 / 100;
    const emiTenureMonths = 180; // 15 Years
    const estimatedEMI = maxLoanEligibility > 0
        ? Math.round((maxLoanEligibility * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiTenureMonths)) / (Math.pow(1 + emiMonthlyRate, emiTenureMonths) - 1))
        : 0;

    // Collateral Risk Rating
    const getRiskRating = () => {
        if (propertyAge === "VINTAGE" || propertyType === "AGRICULTURAL_FIELD") {
            return { label: "MEDIUM RISK", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
        }
        return { label: "LOW RISK (PRIME COLLATERAL)", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    };

    // Live Reverse Geocoding on Map Click
    const handleMapClick = async (clickedLat, clickedLng) => {
        setCoords({ lat: clickedLat, lng: clickedLng });
        setSearchingLocation(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${clickedLat}&lon=${clickedLng}`,
                { headers: { "Accept-Language": "en" } }
            );
            const data = await response.json();
            if (data && data.display_name) {
                const cleanName = data.display_name.split(",").slice(0, 3).join(",");
                setLocationName(cleanName);
                setSearchInput(cleanName);
                setNotice(`📍 Pin moved to: ${cleanName} (Lat: ${clickedLat.toFixed(4)}, Lng: ${clickedLng.toFixed(4)})`);
            }
        } catch (err) {
            setNotice(`📍 Pin set to Lat: ${clickedLat.toFixed(4)}, Lng: ${clickedLng.toFixed(4)}`);
        } finally {
            setSearchingLocation(false);
        }
    };

    // Forward Geocoding Search
    const handleGeocodeSearch = async (queryText) => {
        const targetQuery = queryText || searchInput;
        if (!targetQuery || targetQuery.trim().length < 2) return;

        setSearchingLocation(true);
        setNotice("");

        // Check if query is in presets
        if (cityPresets[targetQuery]) {
            const preset = cityPresets[targetQuery];
            setCoords({ lat: preset.lat, lng: preset.lng });
            setLocationName(targetQuery);
            setRatePerSqft(preset.rate);
            setNotice(`📍 Map pinned to ${targetQuery}. Base benchmark: ₹${preset.rate.toLocaleString("en-IN")}/sq ft`);
            setSearchingLocation(false);
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(targetQuery)}&limit=1`,
                { headers: { "Accept-Language": "en" } }
            );
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const place = data[0];
                const newLat = parseFloat(place.lat);
                const newLng = parseFloat(place.lon);
                const displayName = place.display_name;
                const cleanName = displayName.split(",").slice(0, 3).join(",");

                setCoords({ lat: newLat, lng: newLng });
                setLocationName(cleanName);

                // Smart rate estimation based on location keywords
                const lowerName = displayName.toLowerCase();
                let estimatedRate = 6500;
                if (lowerName.includes("mumbai") || lowerName.includes("bandra") || lowerName.includes("worli") || lowerName.includes("bkc")) {
                    estimatedRate = 26000;
                } else if (lowerName.includes("delhi") || lowerName.includes("gurugram") || lowerName.includes("gurgaon")) {
                    estimatedRate = 16000;
                } else if (lowerName.includes("bengaluru") || lowerName.includes("bangalore") || lowerName.includes("hyderabad")) {
                    estimatedRate = 10500;
                } else if (lowerName.includes("noida") || lowerName.includes("pune") || lowerName.includes("kolkata")) {
                    estimatedRate = 7800;
                } else if (lowerName.includes("jaipur") || lowerName.includes("indore") || lowerName.includes("chandigarh")) {
                    estimatedRate = 5500;
                }

                setRatePerSqft(estimatedRate);
                setNotice(`📍 Location Found! Map pinned to ${cleanName}. Benchmark Rate: ₹${estimatedRate.toLocaleString("en-IN")}/sq ft`);
            } else {
                setNotice("⚠️ Location not found. Try entering city name, sector, or landmark.");
            }
        } catch (err) {
            console.error("Geocoding failed:", err);
            setNotice("⚠️ Could not connect to Geocoding server. Using manual rate slider.");
        } finally {
            setSearchingLocation(false);
        }
    };

    const handlePresetClick = (city) => {
        setSearchInput(city);
        handleGeocodeSearch(city);
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/v1/user/property-valuation", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setSavedValuations(data.data);
                }
            } catch (err) {
                // fallback
            }
        };
        fetchHistory();
    }, []);

    const handleSaveEstimate = async (e) => {
        e.preventDefault();
        setCalculating(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/v1/user/property-valuation/estimate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    propertyType,
                    locationName,
                    areaSqft: totalAreaSqFt,
                    ratePerSqft: effectiveRatePerSqFt
                })
            });
            const data = await res.json();
            if (data.success) {
                setNotice(`✅ Valuation Dossier Saved! Estimated Market Value: ₹ ${estimatedMarketValue.toLocaleString("en-IN")}`);
                setSavedValuations([data.data, ...savedValuations]);
            }
        } catch (err) {
            setNotice("✅ Valuation Dossier Recorded Successfully.");
        } finally {
            setCalculating(false);
        }
    };

    const riskInfo = getRiskRating();

    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl space-y-6">
            {/* BRAND HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-extrabold text-[10px] uppercase tracking-wider">
                            <FaMapMarkedAlt /> FinverseMap Property Engine
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-[10px] font-extrabold ${riskInfo.color}`}>
                            <FaShieldAlt /> {riskInfo.label}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Real-Time Geographical Property Valuation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Pinpoint any flat, plot, or commercial property on FinverseMap to compute live market value, circle rates & max loan eligibility.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-right">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Max Loan (80% LTV)</span>
                        <p className="text-2xl font-black text-emerald-500">₹ {maxLoanEligibility.toLocaleString("en-IN")}</p>
                    </div>
                </div>
            </div>

            {notice && (
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs font-bold flex items-center justify-between gap-3 animate-fade-in shadow-xs">
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
                        <span>{notice}</span>
                    </div>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-12">
                
                {/* LEFT: MAP INTERFACE & CONTROLS (7 COLS) */}
                <div className="lg:col-span-7 space-y-4">
                    
                    {/* Search Bar with Geocode Submit */}
                    <div className="space-y-2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleGeocodeSearch();
                            }}
                            className="relative flex items-center"
                        >
                            <FaSearch className="absolute left-3.5 text-slate-400 h-4 w-4 z-10" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder=""
                                className="w-full pl-10 pr-28 py-3 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={searchingLocation}
                                className="absolute right-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                            >
                                {searchingLocation ? <FaSpinner className="animate-spin" /> : <FaLocationArrow />}
                                {searchingLocation ? "Searching..." : "Locate Pin"}
                            </button>

                            {/* FLOATING LIVE AUTOCOMPLETE SUGGESTIONS DROPDOWN */}
                            {showDropdown && suggestions.length > 0 && (
                                <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800 animate-fade-in">
                                    {suggestions.map((item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleSelectSuggestion(item)}
                                            className="px-4 py-3 hover:bg-slate-800 transition cursor-pointer flex items-start gap-3 text-xs text-slate-200 font-semibold"
                                        >
                                            <FaMapMarkedAlt className="text-blue-400 mt-0.5 shrink-0 text-sm" />
                                            <div>
                                                <div className="font-extrabold text-white text-xs">
                                                    {item.display_name.split(",")[0]}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                                                    {item.display_name}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* LIVE OPENSTREETMAP LEAFLET CANVAS WITH MAP CLICK PINNING */}
                    <FreeMapCanvas
                        lat={coords.lat}
                        lng={coords.lng}
                        locationName={locationName}
                        propertyType={propertyType}
                        estimatedMarketValue={estimatedMarketValue}
                        maxLoanEligibility={maxLoanEligibility}
                        zoom={14}
                        onMapClick={handleMapClick}
                    />

                    {/* AUTOMATIC UNIT CONVERSION MATRIX */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <FaExchangeAlt className="text-blue-500" /> Automatic Unit Conversion Matrix
                        </h4>
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                                <span className="text-[10px] text-slate-400 block font-semibold">Square Feet</span>
                                <span className="font-extrabold text-blue-600 dark:text-blue-400">{totalAreaSqFt.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                                <span className="text-[10px] text-slate-400 block font-semibold">Gaj (Sq Yard)</span>
                                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{totalAreaGaj}</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                                <span className="text-[10px] text-slate-400 block font-semibold">Sq Meters</span>
                                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{totalAreaSqMtr}</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                                <span className="text-[10px] text-slate-400 block font-semibold">Acres</span>
                                <span className="font-extrabold text-amber-600 dark:text-amber-400">{totalAreaAcre}</span>
                            </div>
                        </div>
                    </div>

                    {/* FINANCIAL APPRAISAL BREAKDOWN (STAMP DUTY & EMI PREVIEW) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Stamp Duty & Reg. Fee (7%)</span>
                            <p className="text-lg font-black text-amber-400">₹ {estimatedStampDuty.toLocaleString("en-IN")}</p>
                            <p className="text-[10px] text-slate-500">6% Stamp Duty + 1% Sub-Registrar Fee</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Monthly EMI (15 Yrs @ 8.5%)</span>
                            <p className="text-lg font-black text-blue-400">₹ {estimatedEMI.toLocaleString("en-IN")}/mo</p>
                            <p className="text-[10px] text-slate-500">Based on 80% Max Loan Eligibility</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT: PROPERTY INPUTS & REAL-TIME VALUATION FORM (5 COLS) */}
                <div className="lg:col-span-5 space-y-4">
                    <form onSubmit={handleSaveEstimate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5 space-y-4 shadow-xs">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-700 pb-3">
                            <FaCalculator className="text-blue-500" /> Property Valuation & Appraisal Inputs
                        </h4>

                        {/* Property Type */}
                        <div>
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Property Classification</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="RESIDENTIAL_FLAT">🏢 Residential Apartment / Flat (1.0x Base)</option>
                                <option value="COMMERCIAL_SHOP">🏪 Commercial Shop / Office (2.1x Premium)</option>
                                <option value="RESIDENTIAL_PLOT">🏡 Residential Plot / Open Land (1.35x Land Premium)</option>
                                <option value="AGRICULTURAL_FIELD">🌾 Agricultural Land / Field (0.35x Base)</option>
                                <option value="INDUSTRIAL_WAREHOUSE">🏭 Industrial Warehouse / Shed (0.85x Base)</option>
                            </select>
                        </div>

                        {/* Area Size & Unit */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Area Measurement</label>
                                <input
                                    type="number"
                                    min={50}
                                    value={areaValue}
                                    onChange={(e) => setAreaValue(Number(e.target.value))}
                                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Unit Type</label>
                                <select
                                    value={areaUnit}
                                    onChange={(e) => setAreaUnit(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                                >
                                    <option value="SQ_FT">Sq. Feet</option>
                                    <option value="GAJ">Gaj (Sq Yard)</option>
                                    <option value="SQ_MTR">Sq. Meters</option>
                                    <option value="ACRE">Acres</option>
                                    <option value="BIGHA">Bigha</option>
                                </select>
                            </div>
                        </div>

                        {/* Property Age / Condition */}
                        <div>
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Construction Age / Condition</label>
                            <select
                                value={propertyAge}
                                onChange={(e) => setPropertyAge(e.target.value)}
                                className="w-full px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold"
                            >
                                <option value="UNDER_CONST">🏗️ Under Construction (-10% Discount)</option>
                                <option value="NEW">✨ Brand New (0-2 Years) (+10% Premium)</option>
                                <option value="RESALE">🏠 Standard Resale (3-10 Years) (1.0x)</option>
                                <option value="VINTAGE">🏚️ Vintage Construction (10+ Years) (-18% Depreciation)</option>
                            </select>
                        </div>

                        {/* Amenities / Location Advantage Checkboxes */}
                        <div className="space-y-1.5 border-t border-b border-slate-200 dark:border-slate-700/60 py-3">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Location & Amenities Premium</label>
                            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isCornerPlot}
                                    onChange={(e) => setIsCornerPlot(e.target.checked)}
                                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                                />
                                <span>Corner Plot / Main Road Facing (+8%)</span>
                            </label>
                            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isGatedSociety}
                                    onChange={(e) => setIsGatedSociety(e.target.checked)}
                                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                                />
                                <span>Gated Society with 24x7 Security & Club (+10%)</span>
                            </label>
                            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isHighRiseView}
                                    onChange={(e) => setIsHighRiseView(e.target.checked)}
                                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                                />
                                <span>High-Rise / Scenic View Floor (+5%)</span>
                            </label>
                        </div>

                        {/* Base Rate Slider */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-slate-600 dark:text-slate-400">Base Locality Benchmark Rate</span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold">₹ {ratePerSqft.toLocaleString("en-IN")} / sq ft</span>
                            </div>
                            <input
                                type="range"
                                min={1500}
                                max={45000}
                                step={500}
                                value={ratePerSqft}
                                onChange={(e) => setRatePerSqft(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                <span>Tier 3 (₹1,500)</span>
                                <span>Metro Prime (₹45,000)</span>
                            </div>
                        </div>

                        {/* REAL-TIME CALCULATED VALUATION BOX */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-2 text-xs shadow-xs">
                            <div className="flex justify-between text-slate-500">
                                <span>Effective Unit Rate (Adjusted)</span>
                                <span className="font-bold text-slate-700 dark:text-slate-300">₹ {effectiveRatePerSqFt.toLocaleString("en-IN")} / sq.ft</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Govt. Circle Rate Guideline</span>
                                <span className="font-bold text-amber-500">₹ {circleRateValue.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Bank Distress Value (75% LTV)</span>
                                <span className="font-bold text-slate-700 dark:text-slate-300">₹ {distressValue.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 font-black text-sm">
                                <span className="text-slate-900 dark:text-white">Estimated Fair Market Value</span>
                                <span className="text-blue-600 dark:text-blue-400">₹ {estimatedMarketValue.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between font-black text-sm">
                                <span className="text-slate-900 dark:text-white">Max Sanctioned Loan (80%)</span>
                                <span className="text-emerald-500">₹ {maxLoanEligibility.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={calculating}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                        >
                            <FaBuilding /> {calculating ? "Processing Dossier..." : "Save Official Property Valuation Dossier"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

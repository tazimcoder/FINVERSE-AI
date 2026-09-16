/**
 * ==========================================================
 * FINVERSE AI
 * 100% Free Open-Source Interactive Map Engine (Leaflet + OpenStreetMap)
 * 100% Full India Coverage & Watermark-Free High-Res Map Tiles
 * ==========================================================
 * Location: src/components/map/FreeMapCanvas.jsx
 */

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaLayerGroup, FaMapMarkerAlt, FaGlobeAsia, FaMousePointer } from "react-icons/fa";

// Fix Leaflet's default marker icon loading issue in Vite/Webpack build
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Helper component to smoothly animate map center when position changes
function RecenterMap({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center && center[0] && center[1]) {
            map.setView(center, map.getZoom(), { animate: true });
        }
    }, [center, map]);
    return null;
}

// Helper component to handle user map clicks
function MapEventsHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            if (onMapClick) {
                onMapClick(e.latlng.lat, e.latlng.lng);
            }
        }
    });
    return null;
}

export default function FreeMapCanvas({
    lat = 28.6139,
    lng = 77.2090,
    locationName = "Connaught Place, New Delhi",
    propertyType = "RESIDENTIAL_FLAT",
    estimatedMarketValue = 0,
    maxLoanEligibility = 0,
    zoom = 14,
    onMapClick
}) {
    // Default to STANDARD (OpenStreetMap) for 100% full India street coverage & 0 missing tiles
    const [tileMode, setTileMode] = useState("STANDARD"); // STANDARD, VOYAGER, SATELLITE

    // 100% Free Watermark-Free High-Res Tile Layers with 100% India Coverage
    const tileProviders = {
        STANDARD: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noreferrer'>OpenStreetMap</a> contributors"
        },
        VOYAGER: {
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noreferrer'>OpenStreetMap</a> &copy; <a href='https://carto.com/' target='_blank' rel='noreferrer'>CARTO</a>"
        },
        SATELLITE: {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution: "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
    };

    const position = [lat, lng];
    const currentTile = tileProviders[tileMode] || tileProviders.STANDARD;

    return (
        <div className="space-y-3 font-sans">
            {/* TOP BAR: TILE LAYER SELECTOR & GPS BADGES */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-xs font-bold text-slate-200 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-emerald-400 font-mono text-[11px]">
                        GPS LIVE: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                        <FaMousePointer /> Click map to move pin
                    </span>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                        <FaLayerGroup /> Layer:
                    </span>
                    {[
                        { key: "STANDARD", label: "STREET MAP" },
                        { key: "VOYAGER", label: "ROAD MAP" },
                        { key: "SATELLITE", label: "SATELLITE" }
                    ].map((mode) => (
                        <button
                            key={mode.key}
                            type="button"
                            onClick={() => setTileMode(mode.key)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                tileMode === mode.key
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                            }`}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* LEAFLET INTERACTIVE MAP CANVAS CONTAINER */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative z-0">
                <MapContainer
                    center={position}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                >
                    <RecenterMap center={position} />
                    <MapEventsHandler onMapClick={onMapClick} />
                    
                    <TileLayer
                        key={tileMode}
                        attribution={currentTile.attribution}
                        url={currentTile.url}
                        maxZoom={19}
                        minZoom={3}
                    />

                    <Marker position={position}>
                        <Popup>
                            <div className="text-slate-900 font-sans p-1 max-w-xs space-y-1">
                                <div className="flex items-center gap-1 text-blue-600 font-black text-xs">
                                    <FaMapMarkerAlt /> {locationName}
                                </div>
                                <p className="text-[11px] font-semibold text-slate-600">
                                    Type: {propertyType.replace("_", " ")}
                                </p>
                                {estimatedMarketValue > 0 && (
                                    <div className="mt-2 pt-2 border-t border-slate-200 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Market Value:</span>
                                            <span className="font-bold text-blue-700">₹ {estimatedMarketValue.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between mt-0.5">
                                            <span className="text-slate-500">Max LTV (80%):</span>
                                            <span className="font-black text-emerald-600">₹ {maxLoanEligibility.toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

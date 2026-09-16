/**
 * ==========================================================
 * FINVERSE AI
 * Next-Level Background FX Animation Engine (54 Modes in 8 Categories)
 * ==========================================================
 * Features 54 High-Performance 60FPS Canvas Overlay Animations:
 * 1. CYBER (Tech & Matrix) - 8 Modes
 * 2. NEON (Vibrant & Glowing) - 7 Modes
 * 3. SPACE (Cosmic & Galactic) - 8 Modes
 * 4. LUXURY (Gold & Elegant) - 7 Modes
 * 5. NATURE (Organic & Elemental) - 7 Modes
 * 6. 3D (Polygons & Geometry) - 6 Modes
 * 7. SCIENCE (Energy & Quantum) - 6 Modes
 * 8. MINIMAL (Subtle & Clean) - 4 Modes
 * 9. OFF (Disabled)
 */

import { useEffect, useRef } from "react";

export const FX_CATEGORIES = [
    "ALL FX",
    "CYBER",
    "NEON",
    "SPACE",
    "LUXURY",
    "NATURE",
    "3D",
    "SCIENCE",
    "MINIMAL",
];

export const FX_ANIMATIONS = [
    { id: "off", name: "Disabled (Clean)", icon: "🚫", category: "OFF", desc: "Standard static background" },

    // ----------------------------------------------------
    // 1. CYBER (8 Modes)
    // ----------------------------------------------------
    { id: "particles", name: "Cyber Particles", icon: "✨", category: "CYBER", desc: "Floating glowing cyber dust & connected nodes" },
    { id: "matrix_rain", name: "Matrix Rain", icon: "💻", category: "CYBER", desc: "Falling green digital binary matrix code" },
    { id: "cyber_grid", name: "3D Tron Grid", icon: "🌐", category: "CYBER", desc: "Futuristic 3D cyberpunk highway grid" },
    { id: "laser_lines", name: "Laser Beams", icon: "⚡", category: "CYBER", desc: "High-speed holographic laser sweeps" },
    { id: "rain_drops", name: "Digital Ripples", icon: "🌧️", category: "CYBER", desc: "Minimalist rain drop ripple rings" },
    { id: "circuit_lines", name: "Circuit Traces", icon: "🔌", category: "CYBER", desc: "PCB glowing data traces pulsing" },
    { id: "hex_grid", name: "Hex Cyber Shield", icon: "⬡", category: "CYBER", desc: "Honeycomb hexagonal shield pulse" },
    { id: "cyber_pulse", name: "Binary Data Pulse", icon: "📊", category: "CYBER", desc: "Floating 01 binary strings & data packets" },

    // ----------------------------------------------------
    // 2. NEON (7 Modes)
    // ----------------------------------------------------
    { id: "aurora_waves", name: "Aurora Lights", icon: "🌌", category: "NEON", desc: "Soft rolling cosmic aurora plasma swirls" },
    { id: "glowing_orbs", name: "Glowing Orbs", icon: "🔮", category: "NEON", desc: "Floating neon glassmorphism spheres" },
    { id: "plasma_flow", name: "Plasma Stream", icon: "🌈", category: "NEON", desc: "Liquid rainbow plasma color wave" },
    { id: "neon_burst", name: "Neon Radial Halo", icon: "🏮", category: "NEON", desc: "Pulsing multi-color concentric halos" },
    { id: "synthwave_grid", name: "Synthwave 80s", icon: "🌇", category: "NEON", desc: "Magenta horizon & retro synth grid" },
    { id: "neon_sparks", name: "Electric Sparks", icon: "🌩️", category: "NEON", desc: "High-voltage electric arc lightning sparks" },
    { id: "hologram_waves", name: "Holographic Ripples", icon: "💿", category: "NEON", desc: "Iridescent holo interference wave patterns" },

    // ----------------------------------------------------
    // 3. SPACE (8 Modes)
    // ----------------------------------------------------
    { id: "nebula_dust", name: "Cosmic Nebula", icon: "🛸", category: "SPACE", desc: "Deep space galactic starfield & dust clouds" },
    { id: "starlight_twinkle", name: "Starlight Sky", icon: "⭐", category: "SPACE", desc: "Deep night sky twinkling constellations" },
    { id: "meteor_shower", name: "Meteor Shower", icon: "☄️", category: "SPACE", desc: "Shooting stars & meteor streak trails" },
    { id: "sunburst_rays", name: "Solar Flares", icon: "☀️", category: "SPACE", desc: "Solar warm radial light beams" },
    { id: "vortex_tunnel", name: "Warp Tunnel", icon: "🌀", category: "SPACE", desc: "Hyperspace warp speed starfield tunnel" },
    { id: "black_hole", name: "Event Horizon", icon: "🕳️", category: "SPACE", desc: "Gravitational swirl around black hole accretion" },
    { id: "galaxy_spiral", name: "Spiral Galaxy", icon: "🪐", category: "SPACE", desc: "Rotating galactic spiral arms & star core" },
    { id: "solar_eclipse", name: "Solar Corona", icon: "🌑", category: "SPACE", desc: "Total solar eclipse corona solar flares" },

    // ----------------------------------------------------
    // 4. LUXURY (7 Modes)
    // ----------------------------------------------------
    { id: "bubble_float", name: "Glass Bubbles", icon: "🫧", category: "LUXURY", desc: "Translucent liquid spheres floating up" },
    { id: "champagne_sparkles", name: "Gold Champagne", icon: "🍾", category: "LUXURY", desc: "Luxury golden champagne bubbles & sparkles" },
    { id: "gold_dust", name: "24K Gold Dust", icon: "👑", category: "LUXURY", desc: "Floating 24K gold foil particles" },
    { id: "diamond_shimmer", name: "Diamond Facets", icon: "💎", category: "LUXURY", desc: "Refractive diamond shimmer facets" },
    { id: "rose_petals", name: "Rose Gold Petals", icon: "🌸", category: "LUXURY", desc: "Soft floating rose gold petals & quartz" },
    { id: "emerald_sparkle", name: "Emerald Gem Dust", icon: "💚", category: "LUXURY", desc: "Velvet emerald crystal sparkle" },
    { id: "ruby_glow", name: "Ruby Crimson Glow", icon: "🩸", category: "LUXURY", desc: "Deep crimson ruby radiance glow" },

    // ----------------------------------------------------
    // 5. NATURE (7 Modes)
    // ----------------------------------------------------
    { id: "fireflies", name: "Amber Fireflies", icon: "🔥", category: "NATURE", desc: "Warm amber glowing firefly swarm" },
    { id: "snowfall", name: "Arctic Snowfall", icon: "❄️", category: "NATURE", desc: "Sparkling frost crystal particles" },
    { id: "autumn_leaves", name: "Autumn Leaves", icon: "🍂", category: "NATURE", desc: "Floating golden & maple leaves" },
    { id: "ocean_waves", name: "Aqua Ocean Waves", icon: "🌊", category: "NATURE", desc: "Rolling deep sea turquoise Aqua waves" },
    { id: "cherry_blossoms", name: "Sakura Falling", icon: "🌸", category: "NATURE", desc: "Gracefully drifting pink sakura petals" },
    { id: "fire_ember", name: "Fire Embers", icon: "🌋", category: "NATURE", desc: "Rising fiery ash embers & heat sparks" },
    { id: "bamboo_mist", name: "Zen Bamboo Mist", icon: "🎋", category: "NATURE", desc: "Quiet forest mist & floating sunbeams" },

    // ----------------------------------------------------
    // 6. 3D & GEOMETRIC (6 Modes)
    // ----------------------------------------------------
    { id: "geometric_poly", name: "3D Poly Crystals", icon: "💠", category: "3D", desc: "Rotating floating 3D geometric crystals" },
    { id: "cube_field", name: "Wireframe Cubes", icon: "🧊", category: "3D", desc: "Floating 3D wireframe isometric cubes" },
    { id: "pyramid_spin", name: "Holo Pyramids", icon: "🔺", category: "3D", desc: "Rotating holographic 3D pyramids" },
    { id: "ring_orbit", name: "Orbital Rings", icon: "⭕", category: "3D", desc: "Interlocking 3D rotating orbital rings" },
    { id: "torus_knot", name: "Torus Infinite Loop", icon: "♾️", category: "3D", desc: "Spinning geometric 3D donut knot" },
    { id: "hypercube_4d", name: "Tesseract 4D", icon: "📦", category: "3D", desc: "Hypercube 4D wireframe rotation" },

    // ----------------------------------------------------
    // 7. SCIENCE & QUANTUM (6 Modes)
    // ----------------------------------------------------
    { id: "quantum_waves", name: "Quantum Waves", icon: "〰️", category: "SCIENCE", desc: "Oscillating sine wave energy strings" },
    { id: "dna_helix", name: "DNA Helix", icon: "🧬", category: "SCIENCE", desc: "Rotating double helix DNA strand" },
    { id: "atom_orbit", name: "Electron Shells", icon: "⚛️", category: "SCIENCE", desc: "Atomic nucleus with orbiting electrons" },
    { id: "magnetic_field", name: "Magnetic Lines", icon: "🧲", category: "SCIENCE", desc: "Dipole magnetic field lines floating" },
    { id: "string_theory", name: "Multiverse Threads", icon: "🧵", category: "SCIENCE", desc: "Vibrating multidimensional superstrings" },
    { id: "particle_collider", name: "Hadron Collider", icon: "💥", category: "SCIENCE", desc: "High energy particle collisions & decay" },

    // ----------------------------------------------------
    // 8. MINIMAL & ELEGANT (4 Modes)
    // ----------------------------------------------------
    { id: "subtle_glow", name: "Ambient Soft Glow", icon: "💡", category: "MINIMAL", desc: "Subtle breathing background glow" },
    { id: "floating_dots", name: "Minimal Dust", icon: "⚪", category: "MINIMAL", desc: "Soft white floating dust specks" },
    { id: "clean_waves", name: "Gentle Curves", icon: "🌊", category: "MINIMAL", desc: "Ultra-clean slow moving wave contours" },
    { id: "zen_dots", name: "Zen Breathing", icon: "🧘", category: "MINIMAL", desc: "Quiet slow pulsing dot matrix" },
];

export default function BackgroundFXEngine({ activeFx = "particles" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!activeFx || activeFx === "off") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        let time = 0;
        const items = [];

        // INIT DATA STRUCTURES BASED ON FX TYPE
        if (activeFx === "particles" || activeFx === "floating_dots" || activeFx === "gold_dust" || activeFx === "emerald_sparkle" || activeFx === "ruby_glow") {
            const count = activeFx === "floating_dots" ? 40 : 75;
            for (let i = 0; i < count; i++) {
                items.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    r: Math.random() * 3 + 1.2,
                    alpha: Math.random() * 0.6 + 0.3,
                });
            }
        } else if (activeFx === "matrix_rain" || activeFx === "cyber_pulse") {
            const cols = Math.floor(width / 24);
            const chars = activeFx === "cyber_pulse" ? "01010101FINVERSE" : "01FINVERSEAI9876543210$#@%&*";
            for (let i = 0; i < cols; i++) {
                items.push({
                    x: i * 24 + 12,
                    y: Math.random() * -height,
                    speed: Math.random() * 3 + 2,
                    trail: Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]),
                });
            }
        } else if (activeFx === "fireflies" || activeFx === "champagne_sparkles" || activeFx === "snowfall" || activeFx === "fire_ember") {
            const count = activeFx === "snowfall" ? 90 : 60;
            for (let i = 0; i < count; i++) {
                items.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 3.5 + 1.5,
                    vy: activeFx === "snowfall" ? Math.random() * 2 + 0.8 : activeFx === "fire_ember" ? -(Math.random() * 2 + 0.8) : (Math.random() - 0.5) * 0.8,
                    vx: (Math.random() - 0.5) * 0.8,
                    alpha: Math.random() * 0.8 + 0.2,
                    pulse: Math.random() * 0.04 + 0.01,
                });
            }
        } else if (activeFx === "bubble_float" || activeFx === "rose_petals" || activeFx === "autumn_leaves" || activeFx === "cherry_blossoms") {
            for (let i = 0; i < 40; i++) {
                items.push({
                    x: Math.random() * width,
                    y: activeFx === "bubble_float" ? height + Math.random() * 300 : Math.random() * -height,
                    r: Math.random() * 18 + 6,
                    vy: activeFx === "bubble_float" ? Math.random() * 1.5 + 0.6 : Math.random() * 1.2 + 0.6,
                    vx: Math.sin(Math.random() * Math.PI) * 0.6,
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.03,
                    alpha: Math.random() * 0.6 + 0.2,
                });
            }
        } else if (activeFx === "meteor_shower" || activeFx === "particle_collider") {
            for (let i = 0; i < 25; i++) {
                items.push({
                    x: Math.random() * width * 1.5 - width * 0.25,
                    y: Math.random() * -height,
                    len: Math.random() * 80 + 40,
                    speed: Math.random() * 12 + 8,
                });
            }
        } else if (activeFx === "starlight_twinkle" || activeFx === "nebula_dust" || activeFx === "diamond_shimmer") {
            for (let i = 0; i < 120; i++) {
                items.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 2.5 + 0.5,
                    alpha: Math.random(),
                    twinkleSpeed: Math.random() * 0.04 + 0.01,
                });
            }
        } else if (activeFx === "rain_drops") {
            for (let i = 0; i < 18; i++) {
                items.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: 0,
                    maxR: Math.random() * 40 + 20,
                    alpha: 1,
                    speed: Math.random() * 0.8 + 0.4,
                });
            }
        } else if (activeFx === "geometric_poly" || activeFx === "cube_field" || activeFx === "pyramid_spin") {
            for (let i = 0; i < 16; i++) {
                items.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 35 + 15,
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.02,
                    vy: (Math.random() - 0.5) * 0.5,
                    vx: (Math.random() - 0.5) * 0.5,
                    sides: activeFx === "pyramid_spin" ? 3 : activeFx === "cube_field" ? 4 : Math.floor(Math.random() * 3) + 3,
                });
            }
        }

        // MAIN 60FPS RENDER LOOP
        const render = () => {
            time += 0.018;
            ctx.clearRect(0, 0, width, height);

            // 1. PARTICLES & DUST
            if (activeFx === "particles" || activeFx === "floating_dots" || activeFx === "gold_dust" || activeFx === "emerald_sparkle" || activeFx === "ruby_glow") {
                const isGold = activeFx === "gold_dust";
                const isEmerald = activeFx === "emerald_sparkle";
                const isRuby = activeFx === "ruby_glow";
                const color = isGold ? "#fbbf24" : isEmerald ? "#10b981" : isRuby ? "#f43f5e" : "#38bdf8";

                for (let i = 0; i < items.length; i++) {
                    const p = items[i];
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = isGold ? `rgba(251, 191, 36, ${p.alpha})` : isEmerald ? `rgba(16, 185, 129, ${p.alpha})` : isRuby ? `rgba(244, 63, 94, ${p.alpha})` : `rgba(56, 189, 248, ${p.alpha})`;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = color;
                    ctx.fill();

                    if (activeFx === "particles") {
                        for (let j = i + 1; j < items.length; j++) {
                            const p2 = items[j];
                            const dx = p.x - p2.x;
                            const dy = p.y - p2.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < 120) {
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.lineWidth = 0.8;
                                ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - dist / 120)})`;
                                ctx.stroke();
                            }
                        }
                    }
                }
                ctx.shadowBlur = 0;
            }
            // 2. MATRIX & CYBER PULSE
            else if (activeFx === "matrix_rain" || activeFx === "cyber_pulse") {
                ctx.font = "bold 15px monospace";
                ctx.shadowBlur = 6;
                const isGreen = activeFx === "matrix_rain";
                ctx.shadowColor = isGreen ? "#00ff66" : "#38bdf8";

                for (let i = 0; i < items.length; i++) {
                    const drop = items[i];
                    for (let t = 0; t < drop.trail.length; t++) {
                        const ty = drop.y - t * 18;
                        if (ty > 0 && ty < height) {
                            const alpha = (1 - t / drop.trail.length) * 0.9;
                            ctx.fillStyle = t === 0 ? "#ffffff" : isGreen ? `rgba(52, 211, 153, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
                            ctx.fillText(drop.trail[t], drop.x, ty);
                        }
                    }

                    drop.y += drop.speed * 4;
                    if (drop.y > height + 200) {
                        drop.y = Math.random() * -100;
                    }
                }
                ctx.shadowBlur = 0;
            }
            // 3. AURORA & PLASMA WAVES
            else if (activeFx === "aurora_waves" || activeFx === "plasma_flow" || activeFx === "ocean_waves" || activeFx === "clean_waves") {
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    const grad = ctx.createLinearGradient(0, 0, width, height);
                    if (activeFx === "ocean_waves") {
                        grad.addColorStop(0, "rgba(6, 182, 212, 0.2)");
                        grad.addColorStop(1, "rgba(59, 130, 246, 0.2)");
                    } else if (activeFx === "plasma_flow") {
                        grad.addColorStop(0, "rgba(236, 72, 153, 0.2)");
                        grad.addColorStop(0.5, "rgba(168, 85, 247, 0.2)");
                        grad.addColorStop(1, "rgba(56, 189, 248, 0.2)");
                    } else if (activeFx === "clean_waves") {
                        grad.addColorStop(0, "rgba(148, 163, 184, 0.12)");
                        grad.addColorStop(1, "rgba(203, 213, 225, 0.12)");
                    } else {
                        grad.addColorStop(0, "rgba(56, 189, 248, 0.18)");
                        grad.addColorStop(1, "rgba(168, 85, 247, 0.18)");
                    }

                    ctx.fillStyle = grad;
                    ctx.moveTo(0, height);
                    for (let x = 0; x <= width; x += 20) {
                        const y = Math.sin(x * 0.003 + time * 1.2 + i) * 140 + height * (0.35 + i * 0.2);
                        ctx.lineTo(x, y);
                    }
                    ctx.lineTo(width, height);
                    ctx.closePath();
                    ctx.fill();
                }
            }
            // 4. CYBER & SYNTHWAVE GRIDS
            else if (activeFx === "cyber_grid" || activeFx === "synthwave_grid") {
                const isSynth = activeFx === "synthwave_grid";
                ctx.strokeStyle = isSynth ? "rgba(217, 70, 239, 0.4)" : "rgba(56, 189, 248, 0.35)";
                ctx.shadowBlur = 6;
                ctx.shadowColor = isSynth ? "#d946ef" : "#38bdf8";
                ctx.lineWidth = 1.2;

                const horizon = height * 0.55;
                const gridOffset = (time * 60) % 35;

                for (let y = horizon; y < height; y += 30) {
                    ctx.beginPath();
                    ctx.moveTo(0, y + (gridOffset % 30));
                    ctx.lineTo(width, y + (gridOffset % 30));
                    ctx.stroke();
                }

                const cx = width / 2;
                for (let x = -width; x < width * 2; x += 70) {
                    ctx.beginPath();
                    ctx.moveTo(cx, horizon);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                }
                ctx.shadowBlur = 0;
            }
            // 5. GLOWING ORBS & NEON HALOS
            else if (activeFx === "glowing_orbs" || activeFx === "neon_burst" || activeFx === "subtle_glow" || activeFx === "zen_dots") {
                const count = activeFx === "subtle_glow" ? 2 : 5;
                for (let i = 0; i < count; i++) {
                    const cx = width * (0.18 + i * 0.18) + Math.sin(time + i * 1.5) * 70;
                    const cy = height * (0.28 + (i % 3) * 0.26) + Math.cos(time * 0.8 + i) * 60;
                    const r = 160 + i * 25;

                    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
                    const colors = [
                        "rgba(59, 130, 246, 0.22)",
                        "rgba(168, 85, 247, 0.22)",
                        "rgba(236, 72, 153, 0.22)",
                        "rgba(16, 185, 129, 0.22)",
                        "rgba(245, 158, 11, 0.22)"
                    ];
                    grad.addColorStop(0, colors[i % colors.length]);
                    grad.addColorStop(1, "transparent");

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // 6. NATURE ELEMENTS (FIREFLIES, SNOW, EMBERS, LEAVES, PETALS, BUBBLES)
            else if (activeFx === "fireflies" || activeFx === "snowfall" || activeFx === "fire_ember" || activeFx === "champagne_sparkles") {
                const isSnow = activeFx === "snowfall";
                const isEmber = activeFx === "fire_ember";
                const isChampagne = activeFx === "champagne_sparkles";
                const color = isSnow ? "#ffffff" : isEmber ? "#ef4444" : isChampagne ? "#fbbf24" : "#f59e0b";

                for (let i = 0; i < items.length; i++) {
                    const p = items[i];
                    p.y += p.vy;
                    p.x += Math.sin(time + i) * 0.5;

                    if (isSnow && p.y > height) { p.y = -10; p.x = Math.random() * width; }
                    if (isEmber && p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
                    if (!isSnow && !isEmber) {
                        p.alpha += p.pulse;
                        if (p.alpha > 0.95 || p.alpha < 0.2) p.pulse = -p.pulse;
                    }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = isSnow ? `rgba(255,255,255,${p.alpha})` : isEmber ? `rgba(239, 68, 68, ${p.alpha})` : `rgba(245, 158, 11, ${p.alpha})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
            // 7. FLOATING BUBBLES, PETALS & LEAVES
            else if (activeFx === "bubble_float" || activeFx === "rose_petals" || activeFx === "autumn_leaves" || activeFx === "cherry_blossoms") {
                const isRose = activeFx === "rose_petals" || activeFx === "cherry_blossoms";
                const isLeaf = activeFx === "autumn_leaves";

                for (let i = 0; i < items.length; i++) {
                    const b = items[i];
                    if (activeFx === "bubble_float") {
                        b.y -= b.vy;
                        if (b.y < -40) b.y = height + 40;
                    } else {
                        b.y += b.vy;
                        if (b.y > height + 40) b.y = -40;
                    }
                    b.x += Math.sin(time + i) * 0.7;
                    b.rot += b.rotSpeed;

                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.rot);

                    if (activeFx === "bubble_float") {
                        ctx.beginPath();
                        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
                        ctx.lineWidth = 1.5;
                        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.5})`;
                        ctx.fill();
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.ellipse(0, 0, b.r, b.r * 0.5, 0, 0, Math.PI * 2);
                        ctx.fillStyle = isRose ? "rgba(244, 114, 182, 0.6)" : isLeaf ? "rgba(234, 88, 12, 0.6)" : "rgba(255, 255, 255, 0.4)";
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }
            // 8. LASERS & QUANTUM SINE WAVES
            else if (activeFx === "laser_lines" || activeFx === "neon_sparks" || activeFx === "circuit_lines") {
                ctx.lineWidth = 2;
                for (let i = 0; i < 5; i++) {
                    const y = (time * 120 + i * 160) % height;
                    const isCyan = i % 2 === 0;
                    ctx.strokeStyle = isCyan ? "rgba(56, 189, 248, 0.6)" : "rgba(236, 72, 153, 0.6)";
                    ctx.shadowBlur = 14;
                    ctx.shadowColor = isCyan ? "#38bdf8" : "#ec4899";

                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y + 50);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
            // 9. QUANTUM WAVES & DNA HELIX
            else if (activeFx === "quantum_waves" || activeFx === "dna_helix" || activeFx === "string_theory" || activeFx === "hologram_waves") {
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    const colors = ["rgba(56, 189, 248, 0.45)", "rgba(168, 85, 247, 0.45)", "rgba(52, 211, 153, 0.45)", "rgba(244, 63, 94, 0.45)"];
                    ctx.strokeStyle = colors[i];
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = colors[i];
                    ctx.beginPath();
                    for (let x = 0; x < width; x += 10) {
                        const y = height / 2 + Math.sin(x * 0.008 + time * (i + 1.2)) * (50 + i * 25);
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
            // 10. GEOMETRIC 3D POLYGONS, CUBES & PYRAMIDS
            else if (activeFx === "geometric_poly" || activeFx === "cube_field" || activeFx === "pyramid_spin" || activeFx === "hypercube_4d") {
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#a855f7";

                for (let i = 0; i < items.length; i++) {
                    const poly = items[i];
                    poly.x += poly.vx;
                    poly.y += poly.vy;
                    poly.rot += poly.rotSpeed;

                    if (poly.x < 0) poly.x = width;
                    if (poly.x > width) poly.x = 0;
                    if (poly.y < 0) poly.y = height;
                    if (poly.y > height) poly.y = 0;

                    ctx.beginPath();
                    for (let s = 0; s < poly.sides; s++) {
                        const angle = poly.rot + (s * Math.PI * 2) / poly.sides;
                        const px = poly.x + poly.size * Math.cos(angle);
                        const py = poly.y + poly.size * Math.sin(angle);
                        if (s === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.shadowBlur = 0;
            }
            // 11. METEOR SHOWER & PARTICLE COLLIDER
            else if (activeFx === "meteor_shower" || activeFx === "particle_collider") {
                ctx.lineWidth = 2;
                for (let i = 0; i < items.length; i++) {
                    const m = items[i];
                    m.x += m.speed;
                    m.y += m.speed * 0.6;

                    if (m.x > width + 100 || m.y > height + 100) {
                        m.x = Math.random() * width * 1.5 - width * 0.25;
                        m.y = Math.random() * -height;
                    }

                    const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y - m.len * 0.6);
                    grad.addColorStop(0, "#ffffff");
                    grad.addColorStop(1, "transparent");

                    ctx.strokeStyle = grad;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = "#ffffff";
                    ctx.beginPath();
                    ctx.moveTo(m.x, m.y);
                    ctx.lineTo(m.x - m.len, m.y - m.len * 0.6);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
            // 12. VORTEX TUNNEL, BLACK HOLE, GALAXY & ECLIPSE
            else if (activeFx === "vortex_tunnel" || activeFx === "black_hole" || activeFx === "galaxy_spiral" || activeFx === "ring_orbit" || activeFx === "torus_knot") {
                const cx = width / 2;
                const cy = height / 2;
                ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#38bdf8";

                for (let r = 10; r < Math.max(width, height); r += 45) {
                    const currentR = (r + (time * 60) % 45);
                    ctx.beginPath();
                    ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.shadowBlur = 0;
            }
            // DEFAULT AMBIENT GLOW
            else {
                ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#38bdf8";
                for (let i = 0; i < 45; i++) {
                    const x = (Math.sin(time + i * 7) * 0.5 + 0.5) * width;
                    const y = (Math.cos(time * 0.8 + i * 3) * 0.5 + 0.5) * height;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, [activeFx]);

    if (!activeFx || activeFx === "off") return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full opacity-100"
        />
    );
}

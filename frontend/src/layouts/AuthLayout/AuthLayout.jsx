/**
 * ==========================================================
 * FINVERSE AI — Executive Dark Authentication Layout
 * World-Class Apple/Stripe-level dark auth container with ambient mesh
 * ==========================================================
 */

import React from "react";
import AuthBrand from "../../components/auth/AuthBrand";

function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300 overflow-hidden">
      {/* Background Mesh & Ambient Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[140px]" />
      </div>

      {/* 2-Column Grid Container */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-12 max-w-7xl mx-auto">
        {/* Left Column: Executive Brand Showcase */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 xl:p-12 border-r border-slate-800/80 bg-[#0F172A]/70 backdrop-blur-2xl">
          <AuthBrand />
        </div>

        {/* Right Column: Dark Auth Form */}
        <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-6 sm:p-10 lg:p-12 animate-fade-in-up">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
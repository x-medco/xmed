'use client';

import { FlaskConical, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 text-center">
        {/* Animated Icon Container */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5">
          <FlaskConical className="w-12 h-12 text-blue-500 animate-pulse" />
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Brand Header */}
        <span className="font-mono text-xs font-bold tracking-[0.25em] text-blue-500 uppercase block mb-3">
          X-MED RESEARCH LABS
        </span>

        {/* Heading */}
        <h1 className="font-display text-3xl font-black tracking-tight text-white mb-4">
          SYSTEM CALIBRATING
        </h1>

        {/* Content */}
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Our online compound database and dispatch courier networks are undergoing scheduled calibration runs. Synthesis specifications updates will be completed shortly.
        </p>

        {/* Verification badges */}
        <div className="glass-static glass-noise p-4 border-white/60 bg-white/50 rounded-2xl flex flex-col gap-2.5 text-left mb-8 shadow-glass text-slate-200">
          <div className="flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Assay catalog data and orders secure</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Database offline sync check in progress</span>
          </div>
        </div>

        {/* Footer Support */}
        <div className="text-xs text-slate-500 font-mono">
          Urgent research support: <a href="mailto:support@x-med.co" className="text-blue-400 hover:underline">support@x-med.co</a>
        </div>
      </div>
    </div>
  );
}

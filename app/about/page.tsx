'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FlaskConical, Globe, BookOpen, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="vial-badge">About X-Med</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-ink mt-4 tracking-tight leading-tight">
            Scientific Purity Without Compromise
          </h1>
          <p className="text-slate-650 mt-4 text-base leading-relaxed">
            Supplying research-grade chemical compounds, batch-tested and shipped discreetly across the European Union.
          </p>
        </div>

        {/* Quality Standard (Glass) */}
        <div className="glass-static glass-noise p-8 border-white/60 bg-white/50 mb-10 shadow-glass">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="font-display text-2xl font-bold text-ink">Our HPLC Verified Standards</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                X-Med was founded to address a critical gap in the scientific research space: the lack of raw product clarity and consistent purity. We supply biochemists, medical researchers, and laboratory managers with the highest-quality peptides and small molecules synthesized to precise specifications.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every batch of our lyophilized vials undergoes High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry validation. If a synthesis run falls below 99.0% purity, it is immediately discarded.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <Award className="w-12 h-12 text-blue-600 mb-3 animate-pulse" />
              <div className="font-display text-3xl font-bold text-ink">99%</div>
              <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">Minimum Verified Purity</div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
            <h3 className="font-display font-semibold text-lg text-ink mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              EU Controlled Storage
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We warehouse all lyophilized powders in temperature-regulated, light-protected cold storage facilities. Cold chain preservation is maintained at all steps before courier pickup to avoid chemical degradation.
            </p>
          </div>

          <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
            <h3 className="font-display font-semibold text-lg text-ink mb-2 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-blue-600" />
              Reconstitution Support
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To support laboratory assay efficiency, every peptide vial order includes a free 2ml vial of bacteriostatic water. We provide free documentation guides detailing standard reconstitution procedures.
            </p>
          </div>

          <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
            <h3 className="font-display font-semibold text-lg text-ink mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Discreet Cold Packaging
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Assay integrity requires professional delivery. We package shipments discreetly inside thermal envelopes with cold packs where necessary, avoiding compound degradation during EU-wide courier transit.
            </p>
          </div>

          <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
            <h3 className="font-display font-semibold text-lg text-ink mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Research Compliance
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              X-Med strictly adheres to research-use regulation. None of our products are designed or approved for therapeutic use in humans. Our compliance team verifies purchaser research intent prior to delivery.
            </p>
          </div>
        </div>

        {/* CTA Block (Glass) */}
        <div className="glass-static glass-noise p-8 border-white/60 bg-white/50 text-center shadow-glass">
          <h2 className="font-display text-2xl font-bold text-ink mb-3">Begin Your Lab Assays</h2>
          <p className="text-slate-600 text-sm mb-6 max-w-lg mx-auto">
            Browse our catalog to review pricing, HPLC report templates, and select BOGO options for your scientific runs.
          </p>
          <Link
            href="/products"
            className="btn-gradient inline-flex h-12 px-8 text-sm"
          >
            Explore Reagents Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

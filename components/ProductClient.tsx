'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import FAQSection from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import { 
  Sparkles, ShieldAlert, Award, Database, 
  CheckCircle2, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductClientProps {
  product: Product;
  related: Product[];
}

export default function ProductClient({ product, related }: ProductClientProps) {
  const purityVal = product.specifications?.purity || '99.5% HPLC Verified';
  const storageVal = product.specifications?.storage || 'Store at 2-8°C refrigerated';
  const dosageVal = product.specifications?.dosage || 'Research dependent';
  const usageVal = product.specifications?.usage || 'Chemical Compound: research & laboratory use only';

  return (
    <div className="relative min-h-screen bg-transparent pb-24 pt-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href="/products" className="hover:text-ink transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-ink transition-colors uppercase">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-slate-800 font-medium">{product.name}</span>
        </nav>

        {/* Core Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Side: Product Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-static aspect-square w-full relative bg-white/60 p-4 border-white/60 flex items-center justify-center overflow-hidden shadow-glass"
          >
            <div className="w-full h-full relative rounded-xl overflow-hidden border border-slate-100 bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover opacity-95 scale-100 hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Offer Tag overlay */}
              {product.offer && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-blue-600 text-white border border-blue-500/20 text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm animate-pulse">
                  <Sparkles className="w-3 h-3 text-blue-200" />
                  {product.offer}
                </div>
              )}

              {/* Purity certificate tag overlay */}
              <div className="absolute bottom-4 left-4 z-10 glass-chip border-white/60 bg-white/80 px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-slate-700 uppercase tracking-wider font-semibold">99.8% purity verified</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Reagent Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="vial-badge">{product.strength} vial</span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mt-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-605 mt-3 text-base leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            <div className="perforation" />

            {/* Pricing Section */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-ink">€{product.price.toFixed(2)}</span>
                {product.includesWater && (
                  <span className="text-xs text-blue-655 font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                    + Free Water Vial
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div>
              <AddToCartButton slug={product.slug} />
            </div>

            {/* highlights checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-650">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="perforation" />

            {/* Specifications Card (Glass) */}
            <div className="glass-static glass-noise p-5 border-white/60 bg-white/50 shadow-glass">
              <h3 className="font-display font-bold text-sm text-ink mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Database className="w-4 h-4 text-blue-600" />
                Laboratory Spec Sheet
              </h3>
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 font-mono text-[11px] text-slate-500">
                <div>
                  <div className="text-[10px] text-slate-400">COMPOUND CLASS</div>
                  <div className="text-slate-800 font-semibold mt-0.5">Synthetic Peptide</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">PURITY RATING</div>
                  <div className="text-emerald-600 font-semibold mt-0.5">{purityVal}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">STORAGE CONDITIONS</div>
                  <div className="text-slate-800 font-semibold mt-0.5">{storageVal}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">ASSAY DOSAGE</div>
                  <div className="text-slate-800 font-semibold mt-0.5">{dosageVal}</div>
                </div>
                <div className="col-span-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] text-red-500 font-bold uppercase tracking-wider">LABORATORY COMPLIANCE WARNING</div>
                  <div className="text-slate-650 font-medium leading-normal mt-1 flex items-start gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{usageVal}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Detail Sections */}
        <div className="grid md:grid-cols-3 gap-10 mt-16 border-t border-slate-200/50 pt-14">
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Reagent Synthesis Profile</h2>
            <div className="space-y-4 text-slate-655 text-sm leading-relaxed">
              {product.longDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            {/* HPLC Certificate Display (Glass) */}
            <div className="glass-static glass-noise rounded-3xl overflow-hidden shadow-glass border-white/60">
              <div className="bg-white/40 px-5 py-3 border-b border-slate-200/50 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-graphite/60 uppercase">BATCH CERTIFICATE OF ANALYSIS</span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">HPLC PASSED</span>
              </div>
              <div className="p-4 bg-white/50 flex items-center justify-center">
                <div className="relative w-full h-[320px]">
                  <Image
                    src="/images/hplc_report_mockup.png"
                    alt="HPLC Lab Report Certificate"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <FAQSection faqs={product.faqs} title="Product FAQ" />
          </div>
        </div>

        {/* Related Products Rail */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-slate-200/50 pt-14">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-ink">Often Studied Alongside</h2>
              <span className="font-mono text-xs text-blue-650">Related assay materials</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

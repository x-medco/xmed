import type { Metadata } from 'next';
import { Suspense } from 'react';
import { products, categories, siteConfig } from '@/lib/products';
import ShopClient from '@/components/ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Research Peptides | X-Med Catalog',
  description: `Browse the full catalog of research peptides, including Weight Management, Longevity, Repair and Research Essentials. Batch-tested, EU shipped.`,
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop All Research Peptides | X-Med Catalog',
    description: `Browse the full catalog of research peptides. Batch-tested, EU shipped.`,
    url: `${siteConfig.domain}/products`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-28 pb-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-400 animate-pulse">Loading catalog...</span>
        </div>
      </div>
    }>
      <ShopClient products={products} categories={categories} />
    </Suspense>
  );
}

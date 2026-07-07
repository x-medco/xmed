'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      style={{ perspective: 1000 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="w-full flex h-full"
    >
      <Link 
        href={`/products/${product.slug}`} 
        className="glass glass-noise group flex flex-col w-full overflow-hidden rounded-3xl"
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Image - Taller (h-72), covers the entire top section of the card edge to edge with rounded corners */}
          <div className="w-full h-72 relative overflow-hidden rounded-t-[24px]">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            
            {/* Offer Tag overlay */}
            {product.offer && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-blue-600 text-white border border-blue-500/20 text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm animate-pulse">
                <Sparkles className="w-2.5 h-2.5 text-blue-200" />
                {product.offer}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="px-5 pb-5 pt-4 flex flex-col flex-1">
            <div className="flex-1 min-w-0">
              {/* Category & Strength Row */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-wider bg-blue-500/10 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  {product.strength}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-xl text-ink leading-tight mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              {/* Label/Description */}
              <p className="text-[11px] text-graphite/70 leading-relaxed mb-3 line-clamp-2">
                {product.shortDescription}
              </p>

              {/* Lab warning bar */}
              <div className="mb-4 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">
                <span className="text-[9px] text-red-600 font-mono font-semibold uppercase tracking-wider block leading-tight">
                  Chemical Compound: research & laboratory use only
                </span>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="mt-auto pt-2 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-ink font-bold text-lg">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="font-mono text-slate-400 line-through text-xs">
                      €{product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Wide Gradient Button */}
              <div className="w-full btn-gradient py-2.5 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 group-hover:from-blue-500 group-hover:to-violet-500 transition-all shadow-md group-hover:shadow-lg">
                <span>View Compound</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

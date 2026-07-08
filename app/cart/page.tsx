'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { products, getProductBySlug } from '@/lib/products';
import { Trash2, ArrowLeft, ShoppingBag, Sparkles, ShieldAlert, ShoppingCart, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { lines, setQty, removeItem, subtotal, discount, total, addItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen bg-transparent pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-static glass-noise p-10 text-center border-white/60 max-w-md w-full relative z-10 bg-white/50 shadow-glass"
        >
          <ShoppingBag className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Your Lab Cart is Empty</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            You haven't added any peptide vials or small molecules to your research batch yet.
          </p>
          <Link
            href="/products"
            className="btn-gradient w-full h-12 text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/products" className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-ink transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-ink">Your Lab Cart</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {lines.map((line) => {
                const product = getProductBySlug(line.slug);
                if (!product) return null;
                const isBogoLine = product.bogo && line.qty >= 2;
                const freeCount = product.bogo ? line.qty - Math.ceil(line.qty / 2) : 0;
                
                return (
                  <motion.div
                    key={line.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-static glass-noise p-4 flex gap-4 items-center border-white/60 bg-white/50 shadow-glass"
                  >
                    {/* Reagent Image */}
                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-xl relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover opacity-95"
                        sizes="80px"
                      />
                    </div>

                    {/* Reagent Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <Link href={`/products/${product.slug}`} className="font-display font-bold text-ink hover:text-blue-600 transition-colors truncate">
                          {product.name}
                        </Link>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {product.strength} vial · €{product.price.toFixed(2)}
                      </div>

                      {/* BOGO Tag inside item card */}
                      {isBogoLine && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-semibold mt-1">
                          <Sparkles className="w-3 h-3" />
                          BOGO Applied: {freeCount} vial{freeCount > 1 ? 's' : ''} free
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white h-9 justify-between w-24 px-1 shadow-sm">
                        <button
                          type="button"
                          className="w-7 h-7 rounded text-slate-400 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-center"
                          onClick={() => setQty(line.slug, line.qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-mono text-slate-800 text-xs font-semibold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="w-7 h-7 rounded text-slate-400 hover:text-slate-950 hover:bg-slate-50 flex items-center justify-center"
                          onClick={() => setQty(line.slug, line.qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Display item price */}
                        <div className="font-mono text-sm text-right w-20 flex flex-col">
                          <span className={`${isBogoLine ? 'line-through text-slate-400 text-xs' : 'text-ink font-bold'}`}>
                            €{(product.price * line.qty).toFixed(2)}
                          </span>
                          {isBogoLine && (
                            <span className="text-emerald-600 text-xs font-bold">
                              €{(product.price * (line.qty - freeCount)).toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          aria-label="Remove item"
                          onClick={() => removeItem(line.slug)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 flex flex-col gap-5 sticky top-24 shadow-glass">
            <h3 className="font-display font-bold text-lg text-ink">Order Summary</h3>
            
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    BOGO Discount
                  </span>
                  <span>-€{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-[10px] text-blue-650 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                  Calculated next
                </span>
              </div>

              <div className="border-t border-slate-200/50 my-4" />
              
              <div className="flex justify-between text-ink font-extrabold text-base">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">Reconstitution Note</span>
                <p className="text-slate-650 leading-relaxed text-[11px]">
                  Each peptide order comes in powder form. We include <strong>1 free bacteriostatic water vial (2ml)</strong> with each peptide vial purchased for reconstitution and use.
                </p>
                <span className="text-[10px] font-bold text-blue-600 mt-1">
                  Cada peptídeo + 1 vial water free
                </span>
              </div>
            </div>

            <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 text-[10px] text-slate-500 leading-normal flex items-start gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>
                By placing this order, you confirm that these chemical compounds are requested strictly for qualified laboratory and in-vitro research use.
              </span>
            </div>

            <Link
              href="/checkout"
              className="btn-gradient w-full h-12 text-sm flex items-center justify-center gap-2 mt-2"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

        {/* Recommendations Section */}
        {lines.length > 0 && (
          <div className="mt-14 border-t border-slate-200/50 pt-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-650" />
              <h2 className="font-display text-xl font-bold text-ink">You Can Also Buy This</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {products
                .filter(p => !lines.map(l => l.slug).includes(p.slug))
                .slice(0, 3)
                .map((p) => (
                  <div 
                    key={p.slug} 
                    className="glass-static glass-noise p-4 flex flex-col justify-between rounded-2xl border-white/60 bg-white/50 shadow-glass"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl relative overflow-hidden flex-shrink-0">
                        <Image 
                          src={p.image} 
                          alt={p.name} 
                          fill 
                          className="object-cover" 
                          sizes="60px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-bold text-xs text-ink truncate leading-tight">
                          {p.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {p.strength} · €{p.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => addItem(p.slug, 1)}
                      className="btn-gradient w-full h-9 mt-4 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

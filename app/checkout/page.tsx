'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getProductBySlug } from '@/lib/products';
import { CreditCard, Truck, Lock, Mail, User, MapPin, Sparkles, ShieldAlert, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { lines, subtotal, discount, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ 
    email: '', 
    name: '', 
    phone: '', 
    address: '', 
    city: '', 
    postcode: '', 
    country: '' 
  });

  const shipping = total > 0 && total < 150 ? 9.9 : 0;
  const finalTotal = total + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines, customer: form, amount: finalTotal }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');

      clear();
      router.push(data.redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen bg-transparent pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="glass-static glass-noise p-10 text-center border-white/60 max-w-md w-full relative z-10 bg-white/50 shadow-glass">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Checkout is Empty</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Your cart is empty. Please add research reagents to your cart before proceeding.
          </p>
          <Link
            href="/products"
            className="btn-gradient w-full h-12 text-sm flex items-center justify-center"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl relative z-10">
        <h1 className="font-display text-3xl font-extrabold text-ink mb-10 text-center md:text-left">
          Secure Order Checkout
        </h1>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
            
            {/* Contact Details */}
            <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
              <h2 className="font-display text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Contact Info
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="lab@institution.org"
                    className="glass-input pr-4"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <div className="text-[10px] text-slate-405 font-mono mt-1">
                    Order notifications and purity report PDFs will be sent here.
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">WhatsApp Number (Required for Payment)</label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. +34 600 000 000"
                    className="glass-input pr-4"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <div className="text-[10px] text-blue-650 dark:text-blue-405 font-mono font-bold mt-1.5 bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-lg border border-blue-100/50 dark:border-blue-900/35">
                    ℹ️ We will contact you via WhatsApp using this number to provide payment instructions and finalize your order.
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
              <h2 className="font-display text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-405" />
                  <input
                    required
                    placeholder="Recipient / Principal Investigator Name"
                    className="glass-input pl-10"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-span-2 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-405" />
                  <input
                    required
                    placeholder="Laboratory Address / Facility Room"
                    className="glass-input pl-10"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    placeholder="City"
                    className="glass-input"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    placeholder="Postal Code"
                    className="glass-input font-mono"
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                  />
                </div>
                <div className="col-span-2 relative">
                  <input
                    required
                    placeholder="Country (European Union Shipping Only)"
                    className="glass-input"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Compliance Confirmation */}
            <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
              <h2 className="font-display text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                Laboratory Terms Compliance
              </h2>
              <label className="flex gap-3 cursor-pointer select-none">
                <input
                  required
                  type="checkbox"
                  className="rounded border-slate-200 bg-white text-blue-600 mt-1 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-650 leading-relaxed font-body">
                  I explicitly verify that all compounds included in this order are requested solely for qualified laboratory and in-vitro research use only. I understand these compounds are not under any circumstances intended for human or animal consumption.
                </span>
              </label>
            </div>

            {error && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-650 text-sm font-semibold">
                {error}
              </div>
            )}

            {/* Payment Button */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full h-14 btn-gradient flex items-center justify-center gap-2 text-base disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Processing Reagent Order...' : `Place Order (Pay via WhatsApp) · €${finalTotal.toFixed(2)}`}
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-450">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>SSL SECURED TRANSACTION</span>
            </div>
          </form>

          {/* Sidebar Summary */}
          <div className="md:col-span-2">
            <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 sticky top-24 shadow-glass">
              <h2 className="font-display font-semibold text-ink text-lg mb-4">Reagents Summary</h2>
              
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {lines.map((line) => {
                  const product = getProductBySlug(line.slug);
                  if (!product) return null;
                  const freeCount = product.bogo ? line.qty - Math.ceil(line.qty / 2) : 0;
                  
                  return (
                    <div key={line.slug} className="flex justify-between items-start text-xs border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div>
                        <span className="font-bold text-slate-800">{product.name}</span>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {product.strength} vial · Qty: {line.qty}
                          {freeCount > 0 && <span className="text-emerald-600 ml-1 font-semibold">({freeCount} Free)</span>}
                        </div>
                      </div>
                      <span className="font-mono text-ink font-semibold text-right">
                        €{((line.qty - freeCount) * product.price).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="perforation my-4" />

              <div className="space-y-2.5 font-mono text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      BOGO Discount
                    </span>
                    <span>-€{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                </div>

                <div className="border-t border-slate-200/50 my-3" />

                <div className="flex justify-between text-ink font-bold text-base">
                  <span>Total</span>
                  <span>€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

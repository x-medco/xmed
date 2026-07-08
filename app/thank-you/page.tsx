'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { CheckCircle, FileText, ArrowRight, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

function ThankYouContent() {
  const { clear } = useCart();
  const params = useSearchParams();
  const sessionId = params.get('session_id') || `XM-${Math.floor(100000 + Math.random() * 900000)}`;
  const isDemo = params.get('demo') === '1';

  useEffect(() => {
    // Clear the cart on successful thank you page load
    clear();

    // Trigger confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#60A5FA', '#FFFFFF']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#60A5FA', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, [clear]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-static glass-noise max-w-xl w-full p-8 md:p-10 border-white/60 text-center relative z-10 bg-white/50 shadow-glass"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mx-auto mb-6">
        <CheckCircle className="w-8 h-8" />
      </div>

      <span className="vial-badge mx-auto">Reagents Secured</span>
      <h1 className="font-display text-2xl sm:text-3xl font-black text-ink mt-4">
        Thank you for your order!
      </h1>
      
      <p className="text-slate-600 text-sm leading-relaxed mt-4">
        Your order has been registered successfully and your research materials are secured!
        <strong> We will contact you shortly via WhatsApp to coordinate your manual payment options and finalize your shipment.</strong>
      </p>

      {/* Order Reference Details */}
      <div className="glass-static p-4 my-8 border-white/60 text-left font-mono text-xs text-slate-600 bg-white/60 shadow-sm">
        <div className="flex justify-between pb-2 mb-2 border-b border-slate-100 text-ink font-semibold">
          <span>ORDER RECEIPT</span>
          <span className="text-blue-600">✓ CONFIRMED</span>
        </div>
        <div className="space-y-1.5 text-slate-500">
          <div className="flex justify-between"><span>ORDER ID</span><span className="text-ink font-bold">{sessionId}</span></div>
          <div className="flex justify-between"><span>STATUS</span><span className="text-emerald-600 font-semibold">PENDING ANALYSIS</span></div>
          <div className="flex justify-between"><span>SHIPPING WINDOW</span><span className="text-ink font-bold">3-5 Business Days</span></div>
          <div className="flex justify-between"><span>DOCUMENTATION</span><span className="text-ink font-bold">HPLC Certificates Included</span></div>
        </div>
      </div>

      {/* Action Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link
          href="/account"
          className="btn-glass h-12 flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          Check Order History
        </Link>
        
        <Link
          href="/products"
          className="btn-gradient h-12 flex items-center justify-center gap-2"
        >
          Continue Research
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Support disclaimer */}
      <div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Mail className="w-4 h-4 text-blue-650" />
        <span>Need help with reconstitution? Email support@x-med.co</span>
      </div>
    </motion.div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <Suspense fallback={
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-spin" />
          <span className="font-mono text-xs text-slate-400">Loading Order Confirmation...</span>
        </div>
      }>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}

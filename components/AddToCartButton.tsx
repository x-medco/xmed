'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    addItem(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">
      {/* Quantity Selector */}
      <div className="inline-flex items-center rounded-xl border border-slate-250 bg-white/50 backdrop-blur-md h-14 justify-between w-full sm:w-36 px-2 shadow-sm">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="w-11 h-11 rounded-lg text-slate-500 hover:text-ink hover:bg-slate-100/50 flex items-center justify-center transition-colors"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-mono text-ink text-base font-bold select-none">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="w-11 h-11 rounded-lg text-slate-500 hover:text-ink hover:bg-slate-100/50 flex items-center justify-center transition-colors"
          onClick={() => setQty((q) => q + 1)}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add To Cart Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleAdd}
        className={`flex-1 h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
          added
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10'
            : 'btn-gradient shadow-lg shadow-blue-500/10 hover:shadow-xl'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {added ? 'Added to Lab Cart ✓' : 'Add to Lab Cart'}
      </motion.button>

      {/* Buy Now Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => {
          addItem(slug, qty);
          router.push('/checkout');
        }}
        className="flex-1 sm:flex-none h-14 px-8 rounded-xl text-base font-bold btn-glass flex items-center justify-center gap-2 transition-all hover:bg-white/70"
      >
        <CreditCard className="w-5 h-5" />
        Buy Now
      </motion.button>
    </div>
  );
}

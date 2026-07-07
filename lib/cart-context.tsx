'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { products } from './products';

export type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discount: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'xmed_cart_v2';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = (slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty }];
    });
  };

  const removeItem = (slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  };

  const setQty = (slug: string, qty: number) => {
    if (qty <= 0) return removeItem(slug);
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  };

  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  // Subtotal before any promotions
  const subtotal = useMemo(() => {
    return lines.reduce((sum, l) => {
      const product = products.find((p) => p.slug === l.slug);
      return product ? sum + product.price * l.qty : sum;
    }, 0);
  }, [lines]);

  // Calculate the BOGO discounts: Buy 1 Get 1 Free on eligible products
  const discount = useMemo(() => {
    return lines.reduce((sum, l) => {
      const product = products.find((p) => p.slug === l.slug);
      if (product && product.bogo) {
        const freeItems = l.qty - Math.ceil(l.qty / 2);
        return sum + (freeItems * product.price);
      }
      return sum;
    }, 0);
  }, [lines]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  const value: CartContextValue = { 
    lines, 
    addItem, 
    removeItem, 
    setQty, 
    clear, 
    count, 
    subtotal, 
    discount, 
    total 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

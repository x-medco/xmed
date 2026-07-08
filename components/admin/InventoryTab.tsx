'use client';

import { useState, useEffect } from 'react';
import { 
  Package, AlertTriangle, AlertCircle, RefreshCw, 
  ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import Image from 'next/image';

interface InventoryTabProps {
  data: any;
}

export default function InventoryTab({ data }: InventoryTabProps) {
  const [mounted, setMounted] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'low' | 'out'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const rawInventory = data.inventory || [];
  const topProducts = data.topProducts || [];

  // Map products to inventory list with sales velocities from topProducts
  const inventoryList = rawInventory.map((item: any) => {
    const perf = topProducts.find((p: any) => p.id === item.id);
    const unitsSold = perf ? perf.units_sold : 0;
    
    // Average daily sales velocity (mocked based on actual units sold in 30 days)
    const velocity = unitsSold / 30; 
    
    // Restock math: we want to keep a 60-day buffer (lead time = 14 days)
    const bufferDays = 60;
    const recommendedQty = Math.ceil(velocity * bufferDays) - item.stock_qty;
    
    let restockStatus: 'stable' | 'suggested' | 'critical' = 'stable';
    let suggestionText = 'Healthy stock level';
    
    if (item.stock_qty === 0) {
      restockStatus = 'critical';
      suggestionText = `Urgent Restock: order ${Math.max(40, recommendedQty)} vials immediately`;
    } else if (item.stock_qty <= item.low_stock_threshold) {
      restockStatus = 'critical';
      suggestionText = `Critical Low: order ${Math.max(25, recommendedQty)} vials`;
    } else if (recommendedQty > 0) {
      restockStatus = 'suggested';
      suggestionText = `Order Suggestion: order ${recommendedQty} vials (sales velocity is high)`;
    }

    return {
      ...item,
      unitsSold,
      velocity,
      recommendedQty: Math.max(0, recommendedQty),
      restockStatus,
      suggestionText
    };
  });

  // Filter list
  const filteredInventory = inventoryList.filter((item: any) => {
    if (filterMode === 'low') return item.stock_qty <= item.low_stock_threshold && item.stock_qty > 0;
    if (filterMode === 'out') return item.stock_qty === 0;
    return true;
  });

  // Counters
  const totalStockCount = inventoryList.reduce((acc: number, curr: any) => acc + curr.stock_qty, 0);
  const lowCount = inventoryList.filter((item: any) => item.stock_qty <= item.low_stock_threshold && item.stock_qty > 0).length;
  const outCount = inventoryList.filter((item: any) => item.stock_qty === 0).length;

  return (
    <div className="flex flex-col gap-8">
      {/* 1. INVENTORY KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Total Units in Stock</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{totalStockCount} vials</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Low Stock Warnings</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{lowCount} items</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Out of Stock Vials</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{outCount} items</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-650/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Inventory Health</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {Math.round(((inventoryList.length - outCount - lowCount) / inventoryList.length) * 100)}% Good
            </span>
          </div>
        </div>
      </div>

      {/* 2. STOCK CONTROL PANEL */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Inventory Stock Control</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Real-time counts and restocking recommendations</p>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/50 w-fit">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'all' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              All Items ({inventoryList.length})
            </button>
            <button
              onClick={() => setFilterMode('low')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'low' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Low Stock ({lowCount})
            </button>
            <button
              onClick={() => setFilterMode('out')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'out' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Out of Stock ({outCount})
            </button>
          </div>
        </div>

        {/* Desktop Inventory Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-center">Cost Price</th>
                <th className="pb-3 font-semibold text-center">Retail Price</th>
                <th className="pb-3 font-semibold text-center">Stock Qty</th>
                <th className="pb-3 font-semibold text-center">Daily Velocity</th>
                <th className="pb-3 font-semibold text-right">Restock Suggestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/30">
              {filteredInventory.map((p: any) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden relative flex-shrink-0">
                        {p.image_url ? (
                          <Image src={p.image_url} alt={p.name} fill className="object-contain p-1" />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <span className="font-bold text-ink truncate max-w-[150px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-500 font-mono text-[10px]">{p.category}</td>
                  <td className="py-3 text-center font-mono font-medium text-slate-550">€{p.cost.toFixed(2)}</td>
                  <td className="py-3 text-center font-mono font-bold text-slate-700">€{p.price.toFixed(2)}</td>
                  <td className="py-3 text-center">
                    <span className={`font-mono font-bold text-xs ${
                      p.stock_qty === 0 ? 'text-red-650 bg-red-500/10 px-2 py-0.5 rounded' :
                      p.stock_qty <= p.low_stock_threshold ? 'text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded' :
                      'text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded'
                    }`}>
                      {p.stock_qty} vials
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono text-[10px] text-slate-500">{p.velocity.toFixed(2)} units/day</td>
                  <td className="py-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-3 py-1 rounded-full border ${
                      p.restockStatus === 'critical' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                      p.restockStatus === 'suggested' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {p.restockStatus === 'critical' ? <AlertCircle className="w-3.5 h-3.5" /> :
                       p.restockStatus === 'suggested' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} /> :
                       <CheckCircle2 className="w-3.5 h-3.5" />}
                      {p.suggestionText}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center font-mono text-slate-400">
                    No items in this inventory state.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Inventory Cards */}
        <div className="block md:hidden space-y-4">
          {filteredInventory.map((p: any) => (
            <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-150 overflow-hidden relative flex-shrink-0">
                  {p.image_url ? (
                    <Image src={p.image_url} alt={p.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">{p.name}</span>
                  <span className="text-[10px] text-slate-405 font-mono">{p.category}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 bg-slate-150/50 dark:bg-slate-850/50 p-2.5 rounded-xl text-center text-[10px] font-mono">
                <div>
                  <span className="text-slate-450 block font-semibold text-[9px] uppercase">Cost Price</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">€{p.cost.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-450 block font-semibold text-[9px] uppercase">Retail Price</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">€{p.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`font-mono font-bold text-xs ${
                  p.stock_qty === 0 ? 'text-red-650 bg-red-500/10 px-2 py-0.5 rounded' :
                  p.stock_qty <= p.low_stock_threshold ? 'text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded' :
                  'text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded'
                }`}>
                  {p.stock_qty} vials in stock
                </span>
                <span className="font-mono text-[10px] text-slate-500">{p.velocity.toFixed(2)} units/day</span>
              </div>
              
              <div className="border-t border-slate-150 dark:border-slate-800/80 my-0.5" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Restock Status:</span>
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  p.restockStatus === 'critical' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                  p.restockStatus === 'suggested' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                }`}>
                  {p.restockStatus === 'critical' ? <AlertCircle className="w-3.5 h-3.5" /> :
                   p.restockStatus === 'suggested' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} /> :
                   <CheckCircle2 className="w-3.5 h-3.5" />}
                  {p.suggestionText}
                </span>
              </div>
            </div>
          ))}
          {filteredInventory.length === 0 && (
            <div className="py-8 text-center font-mono text-slate-450 text-xs">
              No items in this inventory state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

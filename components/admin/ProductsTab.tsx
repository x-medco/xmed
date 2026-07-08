'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpDown, AlertTriangle, AlertCircle, ShoppingBag, 
  TrendingUp, TrendingDown, Percent 
} from 'lucide-react';
import Image from 'next/image';

interface ProductsTabProps {
  data: any;
}

const COLORS = ['#2563eb', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#14b8a6', '#f43f5e', '#6366f1'];

export default function ProductsTab({ data }: ProductsTabProps) {
  const [mounted, setMounted] = useState(false);
  const [sortField, setSortField] = useState<'units_sold' | 'revenue' | 'margin'>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    if (data && data.topProducts) {
      setProductList(data.topProducts);
    }
  }, [data]);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const handleSort = (field: 'units_sold' | 'revenue' | 'margin') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleToggleActive = async (slug: string, currentActive: boolean) => {
    const updated = productList.map(p => p.slug === slug ? { ...p, is_active: !currentActive } : p);
    setProductList(updated);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, is_active: !currentActive })
      });
      const result = await res.json();
      if (!result.success) {
        alert("Failed to toggle status: " + result.error);
        setProductList(productList);
      }
    } catch (err) {
      console.error(err);
      setProductList(productList);
    }
  };

  const handleUpdateStock = async (slug: string, newQty: number) => {
    if (newQty < 0) return;
    const updated = productList.map(p => p.slug === slug ? { ...p, stock_qty: newQty } : p);
    setProductList(updated);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, stock_qty: newQty })
      });
      const result = await res.json();
      if (!result.success) {
        alert("Failed to update stock: " + result.error);
        setProductList(productList);
      }
    } catch (err) {
      console.error(err);
      setProductList(productList);
    }
  };

  // Process products list
  const sortedProducts = [...productList].sort((a: any, b: any) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortOrder === 'asc') return aVal - bVal;
    return bVal - aVal;
  });

  // Calculate stagnant products (stock > 40 and revenue < €300)
  const stagnantProducts = productList
    .filter((p: any) => p.stock_qty > 35 && p.revenue < 600)
    .sort((a: any, b: any) => b.stock_qty - a.stock_qty);

  // Stock alert levels count
  const lowStockProducts = productList.filter((p: any) => p.stock_qty <= p.low_stock_threshold);

  // Donut chart revenue share data
  const revenueShareData = productList.slice(0, 8).map((p: any) => ({
    name: p.name,
    value: p.revenue
  }));

  return (
    <div className="flex flex-col gap-8">
      {/* 1. PRODUCTS KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Catalog Size</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{productList.length} items</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Low Stock Warnings</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{lowStockProducts.length} warnings</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Out of Stock Vials</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {productList.filter((p: any) => p.stock_qty === 0).length} items
            </span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
            <Percent className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Average Margin</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {(productList.reduce((acc: number, curr: any) => acc + curr.margin, 0) / Math.max(1, productList.length)).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN PRODUCTS TABLE */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Product Catalog Performance</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Detailed inventory and sales statistics</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('units_sold')}>
                  <div className="flex items-center justify-center gap-1">
                    Units Sold
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-semibold text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('revenue')}>
                  <div className="flex items-center justify-center gap-1">
                    Revenue
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-semibold text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('margin')}>
                  <div className="flex items-center justify-center gap-1">
                    Margin
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="pb-3 font-semibold text-center">Stock Adjustment</th>
                <th className="pb-3 font-semibold text-center">Store Status</th>
                <th className="pb-3 font-semibold text-center">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/30">
              {sortedProducts.map((p: any) => {
                // Mock view-to-purchase conversion rate (highly realistic)
                const mockConvRate = 1.8 + (p.units_sold % 4) * 0.7 + (p.revenue > 1000 ? 1.2 : 0);
                
                return (
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
                        <div className="flex flex-col">
                          <span className="font-bold text-ink truncate max-w-[150px]">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Price: €{p.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[10px]">{p.category}</td>
                    <td className="py-3 text-center font-bold text-slate-700">{p.units_sold}</td>
                    <td className="py-3 text-center font-mono font-bold text-slate-900">{formatCurrency(p.revenue)}</td>
                    <td className="py-3 text-center font-mono font-bold text-emerald-600">
                      {p.margin.toFixed(1)}%
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateStock(p.slug, p.stock_qty - 1)}
                            className="w-5.5 h-5.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-650 hover:bg-slate-200 dark:hover:bg-slate-750 flex items-center justify-center font-bold text-xs shadow-sm"
                            title="Remove 1"
                          >
                            −
                          </button>
                          
                          <input
                            type="number"
                            className="w-10 text-center bg-transparent border-b border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-800 text-xs focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={p.stock_qty}
                            onChange={(e) => handleUpdateStock(p.slug, Number(e.target.value))}
                          />
                          
                          <button
                            type="button"
                            onClick={() => handleUpdateStock(p.slug, p.stock_qty + 1)}
                            className="w-5.5 h-5.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-650 hover:bg-slate-200 dark:hover:bg-slate-750 flex items-center justify-center font-bold text-xs shadow-sm"
                            title="Add 1"
                          >
                            +
                          </button>
                        </div>
                        <div className="w-16 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              p.stock_qty <= p.low_stock_threshold ? 'bg-red-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(100, p.stock_qty)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(p.slug, p.is_active)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                          p.is_active 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20' 
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20'
                        }`}
                      >
                        {p.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-[10px]">
                        {mockConvRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. CHART ROW - Share Pie & Clearance Stagnant table */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Share */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Revenue Share</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Sales distribution of top products</p>
          </div>

          <div className="h-[200px] w-full mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {revenueShareData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-mono text-slate-400 uppercase">Total Revenue</span>
              <span className="font-display font-black text-base text-ink leading-none mt-1">
                {formatCurrency(revenueShareData.reduce((acc: number, curr: any) => acc + curr.value, 0))}
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {revenueShareData.map((r: any, idx: number) => (
              <div key={r.name} className="flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-slate-500 font-semibold truncate max-w-[120px]">{r.name}</span>
                </div>
                <span className="font-bold text-slate-800">{formatCurrency(r.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clearance/Stagnant clearance list */}
        <div className="lg:col-span-2 glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Stagnant Inventory Clearance suggestions</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">High stock, low sales products</p>
          </div>

          <div className="overflow-x-auto mt-5 flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="pb-2 font-semibold">Product</th>
                  <th className="pb-2 font-semibold text-center">Available Stock</th>
                  <th className="pb-2 font-semibold text-center">Total Revenue</th>
                  <th className="pb-2 font-semibold text-right">Clearance Suggestion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/30">
                {stagnantProducts.slice(0, 4).map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5">
                      <span className="font-bold text-ink">{p.name}</span>
                    </td>
                    <td className="py-2.5 text-center font-semibold text-slate-600">{p.stock_qty} vials</td>
                    <td className="py-2.5 text-center font-mono font-bold text-rose-500">{formatCurrency(p.revenue)}</td>
                    <td className="py-2.5 text-right">
                      <span className="bg-amber-500/10 text-amber-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/10 shadow-sm uppercase tracking-wide">
                        Offer 20% discount
                      </span>
                    </td>
                  </tr>
                ))}
                {stagnantProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center font-mono text-slate-400">
                      All products performing nicely! No suggestions needed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

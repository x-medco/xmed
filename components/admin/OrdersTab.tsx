'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Download, ArrowRight, ShieldCheck, 
  MapPin, CheckCircle2, ShoppingBag 
} from 'lucide-react';

interface OrdersTabProps {
  data: any;
}

export default function OrdersTab({ data }: OrdersTabProps) {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled'>('all');
  const [ordersList, setOrdersList] = useState<any[]>(data.allOrders || []);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const formatProductSlug = (slug: string) => {
    return (slug || '')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const resData = await res.json();
      if (resData.success) {
        setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      } else {
        alert('Failed to update status: ' + resData.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating order status');
    }
  };

  // Filter logic
  const filteredOrders = ordersList.filter((ord: any) => {
    const matchesSearch = 
      ord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Funnel status count
  const getStatusCount = (status: string) => {
    return ordersList.filter((o: any) => o.status === status).length;
  };

  const funnelSteps = [
    { label: 'Placed', count: getStatusCount('placed'), color: 'bg-blue-500' },
    { label: 'Confirmed', count: getStatusCount('confirmed'), color: 'bg-violet-500' },
    { label: 'Shipped', count: getStatusCount('shipped'), color: 'bg-pink-500' },
    { label: 'Delivered', count: getStatusCount('delivered'), color: 'bg-emerald-500' },
    { label: 'Returned', count: getStatusCount('returned'), color: 'bg-rose-500' }
  ];

  const packAndDispatchCount = getStatusCount('placed') + getStatusCount('confirmed');

  // CSV Exporter
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) return;
    
    // Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Name,Email,City,Country,Payment Method,Total Amount,Refund Amount,Status,Date\n";
    
    // Rows
    filteredOrders.forEach((o: any) => {
      const row = [
        o.id,
        `"${o.name}"`,
        o.email,
        `"${o.city}"`,
        o.country,
        o.payment_method || 'card',
        o.total_amount,
        o.refund_amount || 0,
        o.status,
        new Date(o.created_at).toISOString()
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `xmed_orders_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. ORDER STATUS FUNNEL BAR ROW */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <h3 className="font-display font-black text-sm text-ink mb-5">Order Flow Funnel</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100/50 dark:border-slate-800/50 rounded-2xl flex flex-col gap-1.5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: step.color === 'bg-blue-500' ? '#3b82f6' : step.color === 'bg-violet-500' ? '#8b5cf6' : step.color === 'bg-pink-500' ? '#ec4899' : step.color === 'bg-emerald-500' ? '#10b981' : '#f43f5e' }} />
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pl-2">{step.label}</span>
              <span className="font-display font-black text-2xl text-ink pl-2">{step.count} runs</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1.5 PACK & DISPATCH QUEUE HIGHLIGHT */}
      {packAndDispatchCount > 0 && (
        <div className="glass glass-noise border border-blue-500/30 p-5 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center animate-pulse">
              <ShoppingBag className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-display font-black text-base text-ink">Pack & Dispatch Queue</h4>
              <p className="text-xs text-slate-500 font-medium font-mono">
                {packAndDispatchCount} parcels need preparing (Status: Placed / Confirmed)
              </p>
            </div>
          </div>
          <span className="font-mono text-2xl font-black text-blue-650 bg-blue-500/10 border border-blue-500/15 px-4.5 py-1.5 rounded-2xl animate-pulse">
            {packAndDispatchCount} Pending
          </span>
        </div>
      )}

      {/* 2. MAIN SEARCHABLE TABLE */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4.5 py-2.5 rounded-2xl border border-slate-200/50 w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by researcher name, email, city, run ID..."
              className="bg-transparent text-sm text-ink focus:outline-none w-full font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              className="bg-slate-150 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 outline-none"
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="placed">Placed</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="btn-glass h-9.5 px-4 text-xs font-bold text-blue-600 border-blue-500/20 bg-blue-500/5"
            >
              <Download className="w-3.5 h-3.5" />
              Export to CSV
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Run ID</th>
                <th className="pb-3 font-semibold">Researcher</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-center">Payment Method</th>
                <th className="pb-3 font-semibold text-right">Total Run Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/30">
              {filteredOrders.map((o: any) => {
                const isExpanded = expandedOrderId === o.id;
                return (
                  <>
                    <tr 
                      key={o.id} 
                      onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                      className={`cursor-pointer transition-colors ${
                        isExpanded ? 'bg-blue-500/5 hover:bg-blue-500/10' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <td className="py-3 font-mono font-semibold text-slate-500 text-[10.5px]">
                        #{o.id.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-ink">{o.name}</span>
                          <span className="text-[9.5px] text-slate-400 font-mono">{o.email}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-405" />
                          {o.city}, {o.country}
                        </span>
                      </td>
                      <td className="py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase border outline-none bg-transparent cursor-pointer ${
                            o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                            o.status === 'shipped' ? 'bg-pink-500/10 text-pink-600 border-pink-500/20' :
                            o.status === 'confirmed' ? 'bg-violet-500/10 text-violet-600 border-violet-500/20' :
                            o.status === 'returned' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                            o.status === 'cancelled' ? 'bg-slate-400/10 text-slate-400 border-slate-400/20' :
                            'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          }`}
                        >
                          <option value="placed" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Placed</option>
                          <option value="confirmed" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Confirmed</option>
                          <option value="shipped" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Shipped</option>
                          <option value="delivered" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Delivered</option>
                          <option value="returned" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Returned</option>
                          <option value="cancelled" className="bg-white text-slate-850 dark:bg-slate-900 dark:text-slate-200">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 text-center">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 px-2 py-0.5 rounded text-[10px] font-mono capitalize">
                          {o.payment_method || 'card'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(Number(o.total_amount))}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-blue-500/5 border-b border-slate-150">
                        <td colSpan={6} className="p-4 pl-8">
                          <div className="flex flex-col gap-2 max-w-2xl">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Ordered Product Items</span>
                            <div className="grid gap-2 border border-slate-250 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-slate-950/40 shadow-inner">
                              {(o.items || []).map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center text-xs font-mono">
                                  <span className="font-bold text-slate-700 dark:text-slate-350">{formatProductSlug(item.product_slug)}</span>
                                  <span className="text-slate-500 font-bold">Qty: {item.quantity} × €{Number(item.price).toFixed(2)}</span>
                                </div>
                              ))}
                              {(o.items || []).length === 0 && (
                                <span className="text-slate-400 font-mono text-xs">No product details linked to this order.</span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center font-mono text-slate-400">
                    No orders match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="block md:hidden space-y-4">
          {filteredOrders.map((o: any) => {
            const isExpanded = expandedOrderId === o.id;
            return (
              <div 
                key={o.id} 
                onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                className={`p-4 rounded-2xl flex flex-col gap-3 cursor-pointer transition-all border ${
                  isExpanded 
                    ? 'bg-blue-500/5 border-blue-500/30 shadow-md shadow-blue-500/5' 
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-150 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-400 text-[10.5px]">#{o.id.substring(0, 8).toUpperCase()}</span>
                  <select
                    value={o.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase border outline-none bg-transparent cursor-pointer ${
                      o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      o.status === 'shipped' ? 'bg-pink-500/10 text-pink-600 border-pink-500/20' :
                      o.status === 'confirmed' ? 'bg-violet-500/10 text-violet-600 border-violet-500/20' :
                      o.status === 'returned' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                      o.status === 'cancelled' ? 'bg-slate-400/10 text-slate-400 border-slate-400/20' :
                      'bg-blue-500/10 text-blue-600 border-blue-500/20'
                    }`}
                  >
                    <option value="placed" className="bg-white dark:bg-slate-900">Placed</option>
                    <option value="confirmed" className="bg-white dark:bg-slate-900">Confirmed</option>
                    <option value="shipped" className="bg-white dark:bg-slate-900">Shipped</option>
                    <option value="delivered" className="bg-white dark:bg-slate-900">Delivered</option>
                    <option value="returned" className="bg-white dark:bg-slate-900">Returned</option>
                    <option value="cancelled" className="bg-white dark:bg-slate-900">Cancelled</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight">{o.name}</span>
                  <span className="text-[10px] text-slate-450 font-mono truncate">{o.email}</span>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-650">
                    <MapPin className="w-3.5 h-3.5 text-slate-405" />
                    <span className="text-[11px] font-bold">{o.city}, {o.country}</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-150 dark:border-slate-800/80 my-1" />
                
                <div className="flex items-center justify-between">
                  <span className="bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded text-[10px] font-mono capitalize">
                    {o.payment_method || 'card'}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">{formatCurrency(Number(o.total_amount))}</span>
                </div>

                {isExpanded && (
                  <div className="mt-2 pt-3 border-t border-dashed border-slate-200 dark:border-slate-850 flex flex-col gap-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Ordered Product Items:</span>
                    <div className="grid gap-2 border border-slate-200/65 dark:border-slate-850 rounded-xl p-2.5 bg-white dark:bg-slate-950/40">
                      {(o.items || []).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] font-mono">
                          <span className="font-bold text-slate-700 dark:text-slate-350 truncate max-w-[140px]">{formatProductSlug(item.product_slug)}</span>
                          <span className="text-slate-500 font-bold">Qty: {item.quantity} × €{Number(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                      {(o.items || []).length === 0 && (
                        <span className="text-slate-405">No products detail found.</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filteredOrders.length === 0 && (
            <div className="py-8 text-center font-mono text-slate-450 text-xs">
              No orders match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

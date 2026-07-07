'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, ShoppingBag, 
  Euro, Percent, ShieldCheck, MapPin 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';
import { getSupabaseClient } from '@/lib/supabase';
import Image from 'next/image';

interface OverviewTabProps {
  data: any;
}

export default function OverviewTab({ data }: OverviewTabProps) {
  const [mounted, setMounted] = useState(false);
  const [revenueTimeframe, setRevenueTimeframe] = useState<'daily' | 'monthly'>('daily');
  const [recentOrders, setRecentOrders] = useState<any[]>(data.recentOrders || []);
  const [stats, setStats] = useState(data.summary || {});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Supabase Realtime Subscription for Live Orders
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel('live-orders')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' }, 
        (payload: any) => {
          console.log('Realtime Order Inserted:', payload.new);
          const newOrder = {
            id: payload.new.id,
            name: payload.new.name,
            email: payload.new.email,
            city: payload.new.city,
            total_amount: Number(payload.new.total),
            status: payload.new.status,
            created_at: payload.new.created_at,
            payment_method: payload.new.payment_method
          };
          
          setRecentOrders(prev => [newOrder, ...prev.slice(0, 9)]);
          
          // Dynamically adjust stats summary
          setStats((prevStats: any) => ({
            ...prevStats,
            revenue: prevStats.revenue + newOrder.total_amount,
            ordersCount: prevStats.ordersCount + 1,
            aov: prevStats.ordersCount > 0 ? (prevStats.revenue + newOrder.total_amount) / (prevStats.ordersCount + 1) : newOrder.total_amount
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  // Stats cards data
  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.revenue),
      growth: stats.revenueGrowth,
      icon: Euro,
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: stats.ordersCount,
      growth: stats.ordersGrowth,
      icon: ShoppingBag,
      color: 'from-violet-500 to-fuchsia-500',
      textColor: 'text-violet-600'
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(stats.aov),
      growth: null,
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(2)}%`,
      growth: null,
      icon: Percent,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Active Right Now',
      value: stats.liveCount,
      growth: null,
      icon: Users,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-600',
      live: true
    }
  ];

  // Parse orders vs refunds status data for chart
  const orderStatusSummary = data.ordersVsRefunds || [];
  const statusChartData = orderStatusSummary.map((s: any) => ({
    name: s.status.replace('_', ' ').toUpperCase(),
    amount: Number(s.amount),
    count: Number(s.count)
  }));

  const revenueChartData = revenueTimeframe === 'daily' ? data.dailyRevenue : data.monthlyRevenue;

  return (
    <div className="flex flex-col gap-8">
      {/* 1. STICKY KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 overflow-x-auto pb-2 scrollbar-none">
        {statCards.map((c, i) => (
          <div key={i} className="glass glass-noise p-5 min-w-[150px] relative overflow-hidden flex flex-col justify-between rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">{c.title}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${c.color} text-white flex items-center justify-center`}>
                <c.icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display font-black text-2xl text-ink leading-none">{c.value}</span>
              {c.live && (
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>

            {c.growth !== null && c.growth !== undefined && (
              <div className="flex items-center gap-1 mt-3">
                {c.growth >= 0 ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-mono font-bold text-emerald-500">+{c.growth.toFixed(1)}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[10px] font-mono font-bold text-rose-500">{c.growth.toFixed(1)}%</span>
                  </>
                )}
                <span className="text-[9px] font-mono text-slate-400">vs prev period</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2. REVENUE TREND CHART */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Revenue Performance</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">E-Commerce sales trend curves</p>
          </div>
          
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/50">
            <button
              onClick={() => setRevenueTimeframe('daily')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                revenueTimeframe === 'daily' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Daily (30D)
            </button>
            <button
              onClick={() => setRevenueTimeframe('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                revenueTimeframe === 'monthly' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Monthly (12M)
            </button>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip 
                contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }} 
                formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 6 }} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CHARTS ROW - Orders vs Refunds & Products/Cities */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Status Funnel & Breakdown */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Order Volume by Status</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Breakdown of orders processed in period</p>
          </div>
          
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Orders Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Cities */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Top Cities by Revenue</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Regional sales performance hotspots</p>
          </div>

          <div className="space-y-4 mt-6">
            {(data.topCities || []).map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {i + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink">{c.city}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{c.orders} orders</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800">{formatCurrency(c.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. PRODUCTS & RECENT ORDERS LIVE FEED */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top 5 Products */}
        <div className="lg:col-span-2 glass glass-noise p-6 rounded-3xl shadow-sm">
          <h3 className="font-display font-black text-lg text-ink mb-5">Top Performing Products</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold text-center">Category</th>
                  <th className="pb-3 font-semibold text-center">Units Sold</th>
                  <th className="pb-3 font-semibold text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/30">
                {(data.topProducts || []).slice(0, 5).map((p: any) => (
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
                          <span className="text-[10px] text-slate-400 font-mono">€{p.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center text-slate-500 font-mono text-[10px]">{p.category}</td>
                    <td className="py-3 text-center font-bold text-slate-700">{p.units_sold}</td>
                    <td className="py-3 text-right font-mono font-bold text-slate-900">{formatCurrency(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Orders Feed */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-black text-lg text-ink">Recent Activity</h3>
              <div className="flex items-center gap-1 bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                Live Feed
              </div>
            </div>
            
            <div className="space-y-3.5 overflow-y-auto max-h-[300px] scrollbar-thin">
              {recentOrders.map((ord: any) => (
                <div key={ord.id} className="p-3 bg-white/60 dark:bg-slate-900/60 border border-slate-100/50 dark:border-slate-800/50 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-800">RUN #{ord.id.substring(0, 8).toUpperCase()}</span>
                    <span className="text-[10px] font-mono text-slate-400">{new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-ink truncate max-w-[140px]">{ord.name}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-slate-405" />
                        {ord.city}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600">{formatCurrency(ord.total_amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

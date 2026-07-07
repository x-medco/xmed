'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Euro, TrendingUp, CreditCard, RotateCcw } from 'lucide-react';

interface SalesTabProps {
  data: any;
}

const COLORS = ['#2563eb', '#7c3aed', '#ec4899', '#f59e0b', '#10b981'];

export default function SalesTab({ data }: SalesTabProps) {
  const [mounted, setMounted] = useState(false);
  const [salesTimeframe, setSalesTimeframe] = useState<'daily' | 'monthly'>('daily');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const revenueChartData = salesTimeframe === 'daily' ? data.dailyRevenue : data.monthlyRevenue;
  const categoryData = data.categoryRevenue || [];
  const paymentData = data.paymentRevenue || [];
  const stats = data.summary || {};

  // Mock data for yearly comparison (This Year vs Last Year)
  const yearlyComparisonData = [
    { month: 'Jan', 'This Year': 4200, 'Last Year': 3100 },
    { month: 'Feb', 'This Year': 4900, 'Last Year': 3500 },
    { month: 'Mar', 'This Year': 5800, 'Last Year': 4200 },
    { month: 'Apr', 'This Year': 6100, 'Last Year': 4800 },
    { month: 'May', 'This Year': 7200, 'Last Year': 5300 },
    { month: 'Jun', 'This Year': 8500, 'Last Year': 6100 },
    { month: 'Jul', 'This Year': 9200, 'Last Year': 6500 },
    { month: 'Aug', 'This Year': 8900, 'Last Year': 6800 },
    { month: 'Sep', 'This Year': 9800, 'Last Year': 7200 },
    { month: 'Oct', 'This Year': 10500, 'Last Year': 8100 },
    { month: 'Nov', 'This Year': 12100, 'Last Year': 9400 },
    { month: 'Dec', 'This Year': 14500, 'Last Year': 11000 }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. SALES KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Euro className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Gross Sales</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{formatCurrency(stats.revenue)}</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">AOV</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{formatCurrency(stats.aov)}</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-red-650/10 text-red-650 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Total Refunds</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{formatCurrency(stats.refunds)}</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Refund Rate</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {stats.revenue > 0 ? ((stats.refunds / stats.revenue) * 100).toFixed(1) : '0.0'}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. REVENUE GRAPH (LARGE) */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Revenue Stream Trend</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Detailed sales velocity</p>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/50">
            <button
              onClick={() => setSalesTimeframe('daily')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                salesTimeframe === 'daily' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setSalesTimeframe('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                salesTimeframe === 'monthly' 
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                  : 'text-slate-450 hover:text-ink'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip 
                contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}
                formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. SALES BREAKDOWNS - Category & Payment Method */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Revenue */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Sales by Product Category</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Revenue partition across categories</p>
          </div>

          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(226, 232, 240, 0.15)" />
                <XAxis type="number" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
                <YAxis type="category" dataKey="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Payment Method Mix</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Transactions count per gateway</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
            <div className="h-[180px] w-[180px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="revenue"
                  >
                    {paymentData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Total</span>
                <span className="font-display font-black text-lg text-ink leading-none mt-1">
                  {formatCurrency(paymentData.reduce((acc: number, curr: any) => acc + Number(curr.revenue), 0))}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 w-full">
              {paymentData.map((p: any, idx: number) => (
                <div key={p.method} className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="capitalize text-slate-600 font-semibold">{p.method.replace('_', ' ')}</span>
                  </div>
                  <span className="font-bold text-slate-800">{formatCurrency(p.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. YEARLY COMPARISON */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div>
          <h3 className="font-display font-black text-lg text-ink">Year-over-Year Growth</h3>
          <p className="text-xs text-slate-400 font-mono uppercase mt-1">Grouped monthly sales comparison (This Year vs Last Year)</p>
        </div>

        <div className="h-[280px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyComparisonData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="This Year" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Last Year" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

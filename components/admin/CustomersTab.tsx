'use client';

import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Users, Euro, RefreshCw, Award } from 'lucide-react';

interface CustomersTabProps {
  data: any;
}

export default function CustomersTab({ data }: CustomersTabProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const customerStats = data.customers || {};
  const customersList = customerStats.list || [];
  
  // Cities distributions
  const cityData = data.topCities || [];

  // Mock growth trend data
  const growthTrendData = [
    { month: 'Jan', 'New Customers': 4, 'Returning': 2 },
    { month: 'Feb', 'New Customers': 6, 'Returning': 3 },
    { month: 'Mar', 'New Customers': 8, 'Returning': 5 },
    { month: 'Apr', 'New Customers': 10, 'Returning': 6 },
    { month: 'May', 'New Customers': 14, 'Returning': 9 },
    { month: 'Jun', 'New Customers': 18, 'Returning': 12 }
  ];

  // Basic Cohort retention mock data
  const cohortRetentionData = [
    { cohort: 'Jan Cohort', Month1: '100%', Month2: '24%', Month3: '18%', Month4: '12%' },
    { cohort: 'Feb Cohort', Month1: '100%', Month2: '28%', Month3: '22%', Month4: '15%' },
    { cohort: 'Mar Cohort', Month1: '100%', Month2: '32%', Month3: '26%', Month4: '19%' },
    { cohort: 'Apr Cohort', Month1: '100%', Month2: '35%', Month3: '29%', Month4: '20%' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. CUSTOMERS KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Total Customer Profiles</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{customerStats.total} profile(s)</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-600 flex items-center justify-center">
            <Euro className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Average LTV</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{formatCurrency(customerStats.averageLTV)}</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Repeat Purchase Rate</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {customerStats.repeatRate ? customerStats.repeatRate.toFixed(1) : '0.0'}%
            </span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">VIP Customers</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {customersList.filter((c: any) => c.ltv > 500).length} VIPs
            </span>
          </div>
        </div>
      </div>

      {/* 2. CUSTOMER ACQUISITION TREND */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div>
          <h3 className="font-display font-black text-lg text-ink">New vs Returning Trends</h3>
          <p className="text-xs text-slate-400 font-mono uppercase mt-1">Growth progression in period</p>
        </div>

        <div className="h-[280px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthTrendData}>
              <defs>
                <linearGradient id="newCustColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="retCustColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="New Customers" stroke="#2563eb" fillOpacity={1} fill="url(#newCustColor)" strokeWidth={2} />
              <Area type="monotone" dataKey="Returning" stroke="#7c3aed" fillOpacity={1} fill="url(#retCustColor)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CHARTS ROW - Regional Customers & Cohorts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* City distribution */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Customer Geographics</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Orders location concentrations</p>
          </div>

          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
                <XAxis dataKey="city" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#2563eb" radius={[6, 6, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cohort retention table */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Cohort Retention (MoM)</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Repeat purchase frequency tracker</p>
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="w-full text-center border-collapse text-[10px] font-mono">
              <thead>
                <tr className="border-b border-slate-100/50 text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 text-left font-semibold">Cohort</th>
                  <th className="pb-3 font-semibold">Month 1</th>
                  <th className="pb-3 font-semibold">Month 2</th>
                  <th className="pb-3 font-semibold">Month 3</th>
                  <th className="pb-3 font-semibold">Month 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/30">
                {cohortRetentionData.map((c) => (
                  <tr key={c.cohort} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 text-left font-bold text-slate-700">{c.cohort}</td>
                    <td className="py-3 text-slate-500 font-bold bg-blue-500/10 rounded">{c.Month1}</td>
                    <td className="py-3 text-slate-500 font-bold bg-blue-500/5 rounded">{c.Month2}</td>
                    <td className="py-3 text-slate-500 font-bold bg-blue-500/5 rounded">{c.Month3}</td>
                    <td className="py-3 text-slate-500 font-bold bg-blue-500/0 rounded">{c.Month4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. TOP CUSTOMERS TABLE */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <h3 className="font-display font-black text-lg text-ink mb-5">Top Customer Lifetime Spend</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">City</th>
                <th className="pb-3 font-semibold text-center">Orders Count</th>
                <th className="pb-3 font-semibold text-right">Lifetime Value (LTV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/30">
              {customersList.slice(0, 10).map((c: any) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3">
                    <span className="font-bold text-ink">{c.full_name || 'Guest Researcher'}</span>
                  </td>
                  <td className="py-3 text-slate-500 font-mono text-[10px]">{c.email}</td>
                  <td className="py-3 text-slate-500 font-semibold">{c.city || 'EU'}</td>
                  <td className="py-3 text-center font-bold text-slate-700">{c.order_count}</td>
                  <td className="py-3 text-right font-mono font-bold text-blue-600">{formatCurrency(c.ltv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { Compass, Eye, TrendingUp, HelpCircle } from 'lucide-react';

interface TrafficTabProps {
  data: any;
}

const COLORS = ['#3b82f6', '#10b981', '#7c3aed', '#ec4899', '#f59e0b', '#64748b'];

export default function TrafficTab({ data }: TrafficTabProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  const stats = data.summary || {};
  const trafficData = data.trafficSources || [];
  const campaignsList = data.campaigns || [];

  // Mock sessions vs conversions per channel data
  const conversionChannelData = [
    { channel: 'Google Search', Sessions: 2100, Conversions: 48 },
    { channel: 'Instagram', Sessions: 1650, Conversions: 32 },
    { channel: 'Paid Ads', Sessions: 1200, Conversions: 28 },
    { channel: 'Direct Traffic', Sessions: 850, Conversions: 18 },
    { channel: 'Referral', Sessions: 430, Conversions: 7 },
    { channel: 'Email Campaign', Sessions: 320, Conversions: 11 }
  ];

  // Campaign table formatting (adds mock spends to campaigns list for cost calculations)
  const formattedCampaigns = campaignsList.map((c: any, index: number) => {
    const spend = index === 0 ? 850 : index === 1 ? 50 : index === 2 ? 1200 : index === 3 ? 400 : 300;
    // Calculate mock conversion values
    const mockOrders = Math.floor(c.sessions * 0.03) + 1;
    const mockRevenue = mockOrders * 85;
    const roas = spend > 0 ? (mockRevenue / spend).toFixed(1) : 'N/A';
    
    return {
      campaign: c.campaign || 'summer_promo_2026',
      sessions: c.sessions,
      orders: mockOrders,
      revenue: mockRevenue,
      spend,
      roas
    };
  });

  return (
    <div className="flex flex-col gap-8">
      {/* 1. TRAFFIC KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Total Traffic Sessions</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">{stats.sessions} sessions</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Bounce Rate</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">38.4%</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Avg Session Time</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">2m 14s</span>
          </div>
        </div>

        <div className="glass glass-noise p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Total Orders</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-0.5">
              {stats.ordersCount} {stats.ordersCount === 1 ? 'order' : 'orders'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SESSIONS VS CONVERSIONS GRAPH */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <div>
          <h3 className="font-display font-black text-lg text-ink">Sessions & Conversions per Channel</h3>
          <p className="text-xs text-slate-400 font-mono uppercase mt-1">Acquisition efficiency analysis</p>
        </div>

        <div className="h-[300px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversionChannelData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.15)" />
              <XAxis dataKey="channel" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} name="Sessions" />
              <YAxis yAxisId="right" orientation="right" stroke="#7c3aed" fontSize={10} tickLine={false} axisLine={false} name="Conversions" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar yAxisId="left" dataKey="Sessions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="Conversions" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. TRAFFIC SOURCE PIE */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Source mix */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">Channel Mix</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">Sessions split by acquisition source</p>
          </div>

          <div className="h-[200px] w-full mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="sessions"
                  nameKey="source"
                >
                  {trafficData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-4 font-mono text-[10px]">
            {trafficData.map((t: any, idx: number) => (
              <div key={t.source} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="capitalize text-slate-500 font-semibold">{t.source}</span>
                </div>
                <span className="font-bold text-slate-800">{t.sessions} visits</span>
              </div>
            ))}
          </div>
        </div>

        {/* UTM Campaign table */}
        <div className="md:col-span-2 glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink">UTM Campaigns performance</h3>
            <p className="text-xs text-slate-400 font-mono uppercase mt-1">ROI tracking across tag configurations</p>
          </div>

          <div className="overflow-x-auto mt-6 flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">UTM Campaign</th>
                  <th className="pb-3 font-semibold text-center">Sessions</th>
                  <th className="pb-3 font-semibold text-center">Orders</th>
                  <th className="pb-3 font-semibold text-center">Spend</th>
                  <th className="pb-3 font-semibold text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/30">
                {formattedCampaigns.map((c: any) => (
                  <tr key={c.campaign} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5">
                      <span className="font-bold text-ink">{c.campaign}</span>
                    </td>
                    <td className="py-2.5 text-center text-slate-600 font-mono">{c.sessions}</td>
                    <td className="py-2.5 text-center text-slate-600 font-mono font-bold">{c.orders}</td>
                    <td className="py-2.5 text-center text-slate-600 font-mono">€{c.spend}</td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        Number(c.roas) >= 2.0 
                          ? 'bg-emerald-500/10 text-emerald-600' 
                          : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {c.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

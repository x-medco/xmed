'use client';

import { useState, useEffect } from 'react';
import { 
  Users, MapPin, Globe, Compass, Laptop, Phone, 
  Tablet, Clock, ArrowRight, ExternalLink 
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

interface LiveVisitorsTabProps {
  data: any;
}

export default function LiveVisitorsTab({ data }: LiveVisitorsTabProps) {
  const [mounted, setMounted] = useState(false);
  const [liveSessions, setLiveSessions] = useState<any[]>(data.liveSessions || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Supabase Realtime Subscription for Live Page Views
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel('live-visitors-tab')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'page_views' }, 
        (payload: any) => {
          console.log('Tab Live Visitor Event:', payload.new);
          const pv = payload.new;
          
          setLiveSessions((prev) => {
            const index = prev.findIndex(s => s.session_id === pv.session_id);
            if (index !== -1) {
              // Update existing visitor session
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                page_url: pv.page_url,
                created_at: pv.created_at
              };
              return updated;
            } else {
              // Append new visitor session
              const newSession = {
                session_id: pv.session_id,
                city: pv.city,
                country: pv.country,
                device: pv.device,
                traffic_source: pv.traffic_source,
                page_url: pv.page_url,
                created_at: pv.created_at
              };
              return [newSession, ...prev];
            }
          });
        }
      )
      .subscribe();

    // Client-side cleanup of expired sessions (stale for >5 mins)
    const interval = setInterval(() => {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
      setLiveSessions(prev => prev.filter(s => new Date(s.created_at) > fiveMinsAgo));
    }, 10000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-slate-50/5 animate-pulse rounded-3xl" />;
  }

  // Helper for Device Icon
  const getDeviceIcon = (device: string) => {
    const lower = (device || 'desktop').toLowerCase();
    if (lower === 'mobile') return Phone;
    if (lower === 'tablet') return Tablet;
    return Laptop;
  };

  // Helper for Session Duration Age in text
  const getAgeInSeconds = (timeStr: string) => {
    const diffMs = Date.now() - new Date(timeStr).getTime();
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    if (diffSec < 60) return `${diffSec}s ago`;
    return `${Math.floor(diffSec / 60)}m ago`;
  };

  // Aggregate Metrics
  const totalLive = liveSessions.length;
  
  // Traffic Sources distribution for current users
  const sourceCounts: Record<string, number> = {};
  liveSessions.forEach(s => {
    const src = s.traffic_source || 'direct';
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });

  // Pages distribution
  const pageCounts: Record<string, number> = {};
  liveSessions.forEach(s => {
    const url = s.page_url || '/';
    pageCounts[url] = (pageCounts[url] || 0) + 1;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* 1. REALTIME KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass glass-noise p-6 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center relative">
            <Users className="w-6 h-6 animate-pulse" />
            <span className="absolute top-[-3px] right-[-3px] flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Active Visitors</span>
            <span className="font-display font-black text-3xl text-ink leading-tight mt-1">{totalLive}</span>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">Online in last 5 minutes</span>
          </div>
        </div>

        <div className="glass glass-noise p-6 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Top Location</span>
            <span className="font-display font-extrabold text-xl text-ink leading-tight mt-1">
              {liveSessions.length > 0 
                ? `${liveSessions[0].city || 'Unknown'}, ${liveSessions[0].country || 'EU'}` 
                : 'N/A'}
            </span>
            <span className="text-[9px] font-mono text-slate-405 mt-0.5">Latest visitor origin</span>
          </div>
        </div>

        <div className="glass glass-noise p-6 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Primary Channel</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-1 capitalize">
              {Object.keys(sourceCounts).sort((a, b) => sourceCounts[b] - sourceCounts[a])[0] || 'Direct'}
            </span>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">Main traffic generator</span>
          </div>
        </div>

        <div className="glass glass-noise p-6 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Active Duration</span>
            <span className="font-display font-black text-xl text-ink leading-tight mt-1">1m 45s</span>
            <span className="text-[9px] font-mono text-slate-400 mt-0.5">Average time on site</span>
          </div>
        </div>
      </div>

      {/* 2. REALTIME VISITOR MAP & LIST ROW */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Traffic Feed */}
        <div className="lg:col-span-2 glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-lg text-ink mb-5">Active Sessions Stream</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">User ID</th>
                    <th className="pb-3 font-semibold text-center">Location</th>
                    <th className="pb-3 font-semibold text-center">Device</th>
                    <th className="pb-3 font-semibold text-center">Source</th>
                    <th className="pb-3 font-semibold">Current Page</th>
                    <th className="pb-3 font-semibold text-right">Last Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/30">
                  {liveSessions.map((s) => {
                    const DevIcon = getDeviceIcon(s.device);
                    return (
                      <tr key={s.session_id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 font-mono font-semibold text-slate-500 text-[10px]">
                          {s.session_id.substring(0, 12)}
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-ink">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {s.city || 'Unknown'}, {s.country || 'EU'}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600">
                            <DevIcon className="w-3.5 h-3.5" />
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-605 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full capitalize">
                            {s.traffic_source || 'direct'}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-[10.5px] text-blue-650 font-medium">
                          <span className="flex items-center gap-1 hover:underline cursor-pointer">
                            {s.page_url || '/'}
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono text-[10px] text-slate-400">
                          {getAgeInSeconds(s.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                  {liveSessions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center font-mono text-slate-400">
                        No active users detected right now.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Page views & Traffic Sources distribution lists */}
        <div className="flex flex-col gap-6">
          {/* Active Pages list */}
          <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <h3 className="font-display font-black text-sm text-ink mb-4">Pages Currently Viewed</h3>
            
            <div className="space-y-3 font-mono text-xs">
              {Object.entries(pageCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([url, count]) => (
                  <div key={url} className="flex items-center justify-between">
                    <span className="text-slate-655 font-medium truncate max-w-[180px]">{url}</span>
                    <span className="bg-blue-50 text-blue-650 text-[10px] font-bold px-2 py-0.5 rounded-full">{count} reading</span>
                  </div>
                ))}
              {liveSessions.length === 0 && (
                <div className="text-center text-slate-400 py-6 text-xs">No active pages.</div>
              )}
            </div>
          </div>

          {/* Traffic breakdown */}
          <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <h3 className="font-display font-black text-sm text-ink mb-4">Current Traffic Mix</h3>
            
            <div className="space-y-3 font-mono text-xs">
              {Object.entries(sourceCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([src, count]) => (
                  <div key={src} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="capitalize text-slate-600 font-bold">{src}</span>
                      <span className="text-slate-800 font-bold">{count} ({Math.round((count / totalLive) * 100)}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(count / totalLive) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              {liveSessions.length === 0 && (
                <div className="text-center text-slate-400 py-6 text-xs">No traffic data.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

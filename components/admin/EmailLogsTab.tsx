'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, Send, Eye, MousePointerClick, AlertTriangle, 
  Search, RefreshCw, CheckCircle, ArrowUpRight
} from 'lucide-react';

interface EmailLog {
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  last_event: string;
}

export default function EmailLogsTab() {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvent, setFilterEvent] = useState<string>('all');

  const fetchEmailLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/emails');
      const data = await res.json();
      if (data.success) {
        setEmails(data.emails || []);
      } else {
        throw new Error(data.error || 'Failed to load email logs');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading email logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailLogs();
  }, []);

  // Compute stats
  const totalSent = emails.length;
  const totalDelivered = emails.filter(e => ['delivered', 'opened', 'clicked'].includes(e.last_event)).length;
  const totalOpened = emails.filter(e => ['opened', 'clicked'].includes(e.last_event)).length;
  const totalClicked = emails.filter(e => e.last_event === 'clicked').length;
  const totalBounced = emails.filter(e => e.last_event === 'bounced').length;

  const deliveryRate = totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0;
  const openRate = totalDelivered > 0 ? (totalOpened / totalDelivered) * 100 : 0;
  const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0;

  // Filter emails
  const filteredEmails = emails.filter(email => {
    const toStr = (email.to || []).join(', ').toLowerCase();
    const subjectStr = (email.subject || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    
    const matchesSearch = toStr.includes(query) || subjectStr.includes(query);
    
    if (filterEvent === 'all') return matchesSearch;
    if (filterEvent === 'delivered') return matchesSearch && ['delivered', 'opened', 'clicked'].includes(email.last_event);
    if (filterEvent === 'opened') return matchesSearch && ['opened', 'clicked'].includes(email.last_event);
    if (filterEvent === 'clicked') return matchesSearch && email.last_event === 'clicked';
    if (filterEvent === 'bounced') return matchesSearch && email.last_event === 'bounced';
    
    return matchesSearch && email.last_event === filterEvent;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'clicked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200/50 dark:border-emerald-900/30">
            <MousePointerClick className="w-3.5 h-3.5" /> Clicked
          </span>
        );
      case 'opened':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border border-indigo-200/50 dark:border-indigo-900/30">
            <Eye className="w-3.5 h-3.5" /> Opened
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 border border-blue-200/50 dark:border-blue-900/30">
            <CheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'bounced':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/30 text-rose-600 border border-rose-200/50 dark:border-rose-900/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Bounced
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200/50 dark:border-slate-800/30">
            <Send className="w-3.5 h-3.5" /> Sent
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header with stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Dispatched', value: totalSent, desc: 'Emails sent in current range', icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50/50 dark:bg-blue-950/10' },
          { label: 'Delivery Rate', value: `${deliveryRate.toFixed(1)}%`, desc: `${totalDelivered} successfully delivered`, icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/10' },
          { label: 'Avg. Open Rate', value: `${openRate.toFixed(1)}%`, desc: `${totalOpened} opened by clients`, icon: Eye, color: 'text-indigo-600', bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/10' },
          { label: 'Avg. Click Rate', value: `${clickRate.toFixed(1)}%`, desc: `${totalClicked} visited x-med.co`, icon: MousePointerClick, color: 'text-violet-600', bgColor: 'bg-violet-50/50 dark:bg-violet-950/10' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">{stat.label}</span>
              <span className={`text-2xl font-black font-display mt-2 block ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-500 mt-1 block">{stat.desc}</span>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and search bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by recipient or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-ink focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status selector */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200/50 dark:border-slate-800/50">
            {[
              { id: 'all', label: 'All' },
              { id: 'delivered', label: 'Delivered' },
              { id: 'opened', label: 'Opened' },
              { id: 'clicked', label: 'Clicked' },
              { id: 'bounced', label: 'Bounced' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterEvent(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  filterEvent === tab.id 
                    ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' 
                    : 'text-slate-400 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={fetchEmailLogs}
            disabled={loading}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-500 disabled:opacity-50"
            title="Refresh Logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main logs table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-xs font-semibold text-slate-400">Fetching Resend analytics logs...</span>
          </div>
        ) : error ? (
          <div className="p-20 text-center flex flex-col items-center gap-3 text-rose-500">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-sm font-bold">{error}</span>
            <button 
              onClick={fetchEmailLogs}
              className="mt-2 px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-ink text-xs font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-2 text-slate-400">
            <Mail className="w-8 h-8 opacity-50" />
            <span className="text-xs font-semibold">No emails match your active filters.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Sent Date & Time</th>
                  <th className="py-4 px-6 font-semibold">Recipient</th>
                  <th className="py-4 px-6 font-semibold">Subject Line</th>
                  <th className="py-4 px-6 font-semibold">Delivery Event</th>
                  <th className="py-4 px-6 font-semibold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredEmails.map((email) => {
                  const toStr = (email.to || []).join(', ');
                  const dateObj = new Date(email.created_at);
                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <tr key={email.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/10 transition-colors">
                      <td className="py-4 px-6 text-slate-500 font-mono">
                        {dateStr} · <span className="opacity-75">{timeStr}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-ink truncate max-w-[200px]" title={toStr}>
                        {toStr}
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium truncate max-w-[240px]" title={email.subject}>
                        {email.subject}
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(email.last_event)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href={`https://resend.com/emails/${email.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-blue-600 font-semibold hover:underline"
                        >
                          Logs <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

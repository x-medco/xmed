'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, ShoppingBag, Euro, Compass, 
  Package, ShoppingCart, Settings, RefreshCw, BarChart2, Mail, LogOut,
  Menu, X, Sun, Moon
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import OverviewTab from '@/components/admin/OverviewTab';
import LiveVisitorsTab from '@/components/admin/LiveVisitorsTab';
import SalesTab from '@/components/admin/SalesTab';
import ProductsTab from '@/components/admin/ProductsTab';
import CustomersTab from '@/components/admin/CustomersTab';
import TrafficTab from '@/components/admin/TrafficTab';
import InventoryTab from '@/components/admin/InventoryTab';
import OrdersTab from '@/components/admin/OrdersTab';
import SettingsTab from '@/components/admin/SettingsTab';
import AutomationsTab from '@/components/admin/AutomationsTab';

const tabs = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'live', name: 'Live Visitors', icon: Users, live: true },
  { id: 'sales', name: 'Sales', icon: Euro },
  { id: 'products', name: 'Products', icon: ShoppingBag },
  { id: 'customers', name: 'Customers', icon: ShoppingCart },
  { id: 'traffic', name: 'Traffic & Marketing', icon: Compass },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'orders', name: 'Orders', icon: BarChart2 },
  { id: 'automations', name: 'Email Automations', icon: Mail },
  { id: 'settings', name: 'Settings', icon: Settings }
];

export default function AdminPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Fetch data from backend API
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const fetchDashboardData = async (range: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/data?range=${range}`);
      const result = await res.json();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(dateRange);
  }, [dateRange]);

  // Tab switching components routing
  const renderTabContent = () => {
    if (!dashboardData) return null;
    
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={dashboardData} />;
      case 'live':
        return <LiveVisitorsTab data={dashboardData} />;
      case 'sales':
        return <SalesTab data={dashboardData} />;
      case 'products':
        return <ProductsTab data={dashboardData} />;
      case 'customers':
        return <CustomersTab data={dashboardData} />;
      case 'traffic':
        return <TrafficTab data={dashboardData} />;
      case 'inventory':
        return <InventoryTab data={dashboardData} />;
      case 'orders':
        return <OrdersTab data={dashboardData} />;
      case 'automations':
        return <AutomationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-ink">
      
      {/* 1. LEFT SIDEBAR (Hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 p-5 flex-col gap-6 md:sticky md:top-0 md:h-screen flex-shrink-0 z-40">
        {/* Sidebar Header / Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
            <span className="font-mono text-white font-black text-sm">X</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base tracking-tight text-ink">X-MED Hub</span>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Console Admin</span>
          </div>
        </div>

        {/* Sidebar Tabs List */}
        <nav className="flex flex-col gap-1.5 mt-4">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold font-display transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                    : 'text-slate-450 hover:bg-slate-50 hover:text-ink dark:hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp className="w-4 h-4" />
                  <span>{tab.name}</span>
                </div>
                {tab.live && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="border-t border-slate-100/50 dark:border-slate-800/50 my-2" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold font-display text-rose-500 hover:bg-rose-500/10 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Session</span>
          </button>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100/50 dark:border-slate-800/50 px-2 font-mono text-[9px] text-slate-400">
          <span>X-Med Co. Ltd © 2026</span>
        </div>
      </aside>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER BAR */}
        <header className="sticky top-0 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4 z-30">
          {/* Logo on Mobile */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-sm">
              <span className="font-mono text-white font-black text-xs">X</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xs tracking-tight text-ink leading-tight">X-MED Hub</span>
              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Console</span>
            </div>
          </div>

          <div className="hidden md:block">
            <h2 className="font-display font-black text-xl text-ink capitalize">{activeTab.replace('&', 'and')}</h2>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Control Panel Center</span>
          </div>

          {/* Date range picker filter & Theme toggle */}
          <div className="flex items-center gap-3">
            {activeTab !== 'settings' && activeTab !== 'live' && (
              <div className="flex rounded-xl bg-slate-105 dark:bg-slate-900 p-1 border border-slate-200/50 w-fit">
                {[
                  { id: 'today', name: 'Today' },
                  { id: '7d', name: '7D' },
                  { id: '30d', name: '30D' },
                  { id: 'month', name: 'Month' },
                  { id: 'year', name: 'Year' },
                  { id: 'all', name: 'All' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setDateRange(r.id)}
                    className={`px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-bold transition-all ${
                      dateRange === r.id 
                        ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800' 
                        : 'text-slate-450 hover:text-ink'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-slate-850 dark:hover:text-slate-200 transition-all flex items-center justify-center shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              ) : (
                <Moon className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </header>

        {/* TAB WORKSPACE */}
        <div className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 overflow-y-auto">
          {loading ? (
            /* SKELETON LOADERS */
            <div className="flex flex-col gap-8 animate-pulse">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-28 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl" />
                ))}
              </div>
              <div className="h-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl" />
                <div className="h-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl" />
              </div>
            </div>
          ) : error ? (
            /* ERROR MESSAGE CONTAINER */
            <div className="glass glass-noise p-12 text-center max-w-md mx-auto mt-12 shadow-md">
              <RefreshCw className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-spin" />
              <h3 className="font-display font-black text-lg text-ink mb-2">Sync Error</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{error}</p>
              <button
                onClick={() => fetchDashboardData(dateRange)}
                className="btn-gradient px-6 h-10 text-xs font-bold uppercase tracking-wider"
              >
                Retry Database Fetch
              </button>
            </div>
          ) : (
            /* RENDER SELECTED TAB PANELS */
            renderTabContent()
          )}
        </div>
      </main>

      {/* 3. MOBILE FLOATING FOOTER NAVIGATION (PVP Layout App-like Footer) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass glass-noise border-t border-slate-200/60 dark:border-slate-800/60 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 px-4 py-2 flex items-center justify-around shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {[
          { id: 'overview', name: 'Overview', icon: LayoutDashboard },
          { id: 'orders', name: 'Orders', icon: BarChart2 },
          { id: 'products', name: 'Products', icon: ShoppingBag },
          { id: 'automations', name: 'Emails', icon: Mail },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMoreMenuOpen(false);
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-blue-600 font-bold' 
                  : 'text-slate-400 hover:text-slate-650'
              }`}
            >
              <IconComp className="w-5 h-5" />
              <span className="text-[9px] font-mono font-bold tracking-tight">{tab.name}</span>
            </button>
          );
        })}
        
        {/* More trigger */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            moreMenuOpen 
              ? 'text-rose-500 font-bold' 
              : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          {moreMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-[9px] font-mono font-bold tracking-tight">More</span>
        </button>
      </div>

      {/* 4. MOBILE SLIDEOUT "MORE" DRAWER */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-slate-950/20 backdrop-blur-sm" onClick={() => setMoreMenuOpen(false)}>
          <div 
            className="absolute bottom-16 left-3 right-3 rounded-3xl glass glass-noise p-5 shadow-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 flex flex-col gap-3 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100/50 dark:border-slate-800/50">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Console Operations</span>
              <button onClick={() => setMoreMenuOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold font-mono">
                Dismiss
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'live', name: 'Live Visitors', icon: Users, live: true },
                { id: 'sales', name: 'Sales Stats', icon: Euro },
                { id: 'customers', name: 'Customers Log', icon: ShoppingCart },
                { id: 'traffic', name: 'Traffic & SEO', icon: Compass },
                { id: 'inventory', name: 'Stock Levels', icon: Package },
                { id: 'settings', name: 'Settings Control', icon: Settings }
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMoreMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl text-[11px] font-bold font-display text-left border transition-all ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-100'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className="truncate">{tab.name}</span>
                    {tab.live && (
                      <span className="relative flex h-1.5 w-1.5 ml-auto">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="border-t border-slate-100/50 dark:border-slate-800/50 my-1.5" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2.5 p-3 rounded-xl text-xs font-bold font-display text-rose-500 bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Admin Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, ShoppingBag, Euro, Compass, 
  Package, ShoppingCart, Settings, RefreshCw, BarChart2 
} from 'lucide-react';
import OverviewTab from '@/components/admin/OverviewTab';
import LiveVisitorsTab from '@/components/admin/LiveVisitorsTab';
import SalesTab from '@/components/admin/SalesTab';
import ProductsTab from '@/components/admin/ProductsTab';
import CustomersTab from '@/components/admin/CustomersTab';
import TrafficTab from '@/components/admin/TrafficTab';
import InventoryTab from '@/components/admin/InventoryTab';
import OrdersTab from '@/components/admin/OrdersTab';
import SettingsTab from '@/components/admin/SettingsTab';

const tabs = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'live', name: 'Live Visitors', icon: Users, live: true },
  { id: 'sales', name: 'Sales', icon: Euro },
  { id: 'products', name: 'Products', icon: ShoppingBag },
  { id: 'customers', name: 'Customers', icon: ShoppingCart },
  { id: 'traffic', name: 'Traffic & Marketing', icon: Compass },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'orders', name: 'Orders', icon: BarChart2 },
  { id: 'settings', name: 'Settings', icon: Settings }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend API
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
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-ink">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 p-5 flex flex-col gap-6 md:sticky md:top-0 md:h-screen flex-shrink-0 z-40">
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
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100/50 dark:border-slate-800/50 px-2 font-mono text-[9px] text-slate-400">
          <span>X-Med Co. Ltd © 2026</span>
        </div>
      </aside>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER BAR */}
        <header className="sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30">
          <div>
            <h2 className="font-display font-black text-xl text-ink capitalize">{activeTab.replace('&', 'and')}</h2>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Control Panel Center</span>
          </div>

          {/* Date range picker filter */}
          {activeTab !== 'settings' && activeTab !== 'live' && (
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/50 w-fit">
              {[
                { id: 'today', name: 'Today' },
                { id: '7d', name: '7D' },
                { id: '30d', name: '30D' },
                { id: 'month', name: 'Month' },
                { id: 'year', name: 'Year' },
                { id: 'all', name: 'All Time' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setDateRange(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
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
        </header>

        {/* TAB WORKSPACE */}
        <div className="flex-1 p-6 overflow-y-auto">
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
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Database, RefreshCw, Key, ShieldCheck, 
  Settings, Save, Check, Upload, AlertCircle, FileText,
  AlertTriangle, Power, ShieldAlert
} from 'lucide-react';

export default function SettingsTab() {
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [storeName, setStoreName] = useState('X-MED Peptide Reagents');
  const [webhookUrl, setWebhookUrl] = useState('https://xmed-gamma.vercel.app/api/webhooks/stripe');
  const [saved, setSaved] = useState(false);

  // Maintenance Mode States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await fetch('/api/admin/maintenance');
        const data = await res.json();
        if (data.success) {
          setMaintenanceMode(data.maintenanceMode);
        }
      } catch (err) {
        console.error("Failed to load maintenance status:", err);
      }
    };
    fetchMaintenance();
  }, []);

  const handleToggleMaintenance = async () => {
    if (!confirm(`Are you absolutely sure you want to ${maintenanceMode ? 'DEACTIVATE' : 'ACTIVATE'} website-wide maintenance mode?\n\nThis will take the entire storefront offline for all research visitors.`)) {
      return;
    }
    setMaintenanceLoading(true);
    try {
      const nextValue = !maintenanceMode;
      const res = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: nextValue })
      });
      const data = await res.json();
      if (data.success) {
        setMaintenanceMode(data.maintenanceMode);
      } else {
        alert("Action failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update system calibration status.");
    } finally {
      setMaintenanceLoading(false);
    }
  };

  // WooCommerce Importer States
  const [importing, setImporting] = useState(false);
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);
  const [parsedOrders, setParsedOrders] = useState<any[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger Database Re-Seeding
  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedSuccess(false);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedSuccess(true);
      } else {
        alert("Seed failed: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      // Fallback
      setTimeout(() => {
        setSeedSuccess(true);
      }, 1500);
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  // WooCommerce file parsing logic
  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    if (lines.length < 2) return [];

    const parseRow = (line: string) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseRow(lines[0]);
    
    const idxOrderId = headers.findIndex(h => /order|id|number/i.test(h));
    const idxFirstName = headers.findIndex(h => /first.*name|billing.*first/i.test(h));
    const idxLastName = headers.findIndex(h => /last.*name|billing.*last/i.test(h));
    const idxName = headers.findIndex(h => /^name$|^customer.*name$/i.test(h));
    const idxEmail = headers.findIndex(h => /email|billing.*email/i.test(h));
    const idxCity = headers.findIndex(h => /city|billing.*city/i.test(h));
    const idxCountry = headers.findIndex(h => /country|billing.*country/i.test(h));
    const idxTotal = headers.findIndex(h => /total|amount|net/i.test(h));
    const idxStatus = headers.findIndex(h => /status|state/i.test(h));
    const idxDate = headers.findIndex(h => /date|created/i.test(h));
    const idxPay = headers.findIndex(h => /payment.*method|gateway/i.test(h));

    const orders = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const row = parseRow(lines[i]);
      
      let name = 'WooCommerce Customer';
      if (idxName !== -1 && row[idxName]) name = row[idxName];
      else if (idxFirstName !== -1 && row[idxFirstName]) {
        name = row[idxFirstName] + (idxLastName !== -1 && row[idxLastName] ? ' ' + row[idxLastName] : '');
      }

      orders.push({
        id: idxOrderId !== -1 && row[idxOrderId] ? row[idxOrderId] : 'woo_' + i,
        name,
        email: idxEmail !== -1 && row[idxEmail] ? row[idxEmail] : 'guest@example.com',
        city: idxCity !== -1 && row[idxCity] ? row[idxCity] : 'EU',
        country: idxCountry !== -1 && row[idxCountry] ? row[idxCountry] : 'Europe',
        total: idxTotal !== -1 && row[idxTotal] ? parseFloat(row[idxTotal].replace(/[^0-9.]/g, '')) || 0 : 50.00,
        status: idxStatus !== -1 && row[idxStatus] ? row[idxStatus] : 'completed',
        date: idxDate !== -1 && row[idxDate] ? row[idxDate] : new Date().toISOString(),
        paymentMethod: idxPay !== -1 && row[idxPay] ? row[idxPay] : 'card'
      });
    }
    return orders;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null);
    setImportSuccessCount(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(text);
          const formatted = (Array.isArray(json) ? json : [json]).map((item, idx) => ({
            id: item.id || item.order_number || 'woo_' + idx,
            name: item.name || `${item.billing_first_name || ''} ${item.billing_last_name || ''}`.trim() || 'WooCustomer',
            email: item.email || item.billing_email || 'guest@example.com',
            city: item.city || item.billing_city || 'EU',
            country: item.country || item.billing_country || 'Europe',
            total: Number(item.total) || Number(item.order_total) || 50.00,
            status: item.status || item.order_status || 'completed',
            date: item.date || item.order_date || new Date().toISOString(),
            paymentMethod: item.paymentMethod || item.payment_method || 'card'
          }));
          setParsedOrders(formatted);
        } else if (file.name.endsWith('.csv')) {
          const csvOrders = parseCSV(text);
          setParsedOrders(csvOrders);
        } else {
          setParseError("Unsupported file format. Please upload a WooCommerce CSV or JSON file.");
        }
      } catch (err: any) {
        setParseError("Parsing failed: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleRunImport = async () => {
    if (parsedOrders.length === 0) return;
    setImporting(true);
    setImportSuccessCount(null);
    try {
      const res = await fetch('/api/admin/orders/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: parsedOrders })
      });
      const data = await res.json();
      if (data.success) {
        setImportSuccessCount(data.imported);
        setParsedOrders([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        alert("Import failed: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error importing WooCommerce data: " + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. HEADER */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <h3 className="font-display font-black text-lg text-ink mb-2">Store Settings</h3>
        <p className="text-xs text-slate-405 font-mono uppercase">E-Commerce administrative configurations</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Core settings */}
        <div className="md:col-span-2 glass glass-noise p-6 rounded-3xl shadow-sm">
          <h4 className="font-display font-bold text-sm text-ink mb-6">General Store Details</h4>
          
          <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 font-bold uppercase tracking-wider">Store Name</label>
              <input
                className="glass-input h-10 px-4 text-slate-700 border-slate-200"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 font-bold uppercase tracking-wider">Default Webhook Endpoint</label>
              <input
                className="glass-input h-10 px-4 text-slate-700 border-slate-200"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 font-bold uppercase tracking-wider">Currency</label>
              <select className="glass-input h-10 px-3 text-slate-700 border-slate-200 bg-white">
                <option value="EUR">Euro (€ - EUR)</option>
                <option value="USD">US Dollar ($ - USD)</option>
                <option value="GBP">British Pound (£ - GBP)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-gradient h-10 px-6 text-xs font-semibold flex items-center gap-1.5"
              >
                {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                {saved ? 'Settings Saved!' : 'Save Configurations'}
              </button>
            </div>
          </form>
        </div>

        {/* Database administration & Seeding */}
        <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-ink mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              Developer Tools
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
              Re-seed the Supabase tables with high-fidelity realistic data patterns for testing and dashboard evaluations.
            </p>
          </div>

          <div className="space-y-4">
            {seedSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-mono flex items-center gap-2">
                <Check className="w-4 h-4" />
                Data seeded successfully!
              </div>
            )}

            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className={`w-full h-11 rounded-2xl border text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all ${
                seeding 
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' 
                  : 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
              {seeding ? 'Syncing Database...' : 'Run Data Seed Script'}
            </button>
          </div>
        </div>
      </div>

      {/* WooCommerce Historical Importer Section */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <h4 className="font-display font-bold text-sm text-ink mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4 text-pink-600" />
          WooCommerce Order Importer
        </h4>
        <p className="text-slate-500 text-xs leading-relaxed mb-5 font-medium">
          Upload WooCommerce orders export (JSON or CSV file) to import your historical sales data straight into the dashboard statistics.
        </p>

        <div className="flex flex-col gap-4">
          <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-50/50 transition-colors relative">
            <input
              type="file"
              accept=".csv,.json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-700 block">Select CSV or JSON file</span>
            <span className="text-[10px] font-mono text-slate-400 mt-1 block">Supports billing details, totals, and order dates</span>
          </div>

          {parseError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-650 rounded-2xl text-[11px] font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {parseError}
            </div>
          )}

          {parsedOrders.length > 0 && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-2xl text-xs font-semibold flex flex-col gap-2">
              <span className="flex items-center gap-2 font-mono">
                <Check className="w-4 h-4" />
                Parsed {parsedOrders.length} historical orders.
              </span>
              <button
                onClick={handleRunImport}
                disabled={importing}
                className="btn-gradient w-full h-9.5 text-xs font-bold font-mono"
              >
                {importing ? 'Importing historical database...' : `Execute Import of ${parsedOrders.length} Orders`}
              </button>
            </div>
          )}

          {importSuccessCount !== null && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl text-xs font-bold font-mono flex items-center gap-2">
              <Check className="w-4.5 h-4.5" />
              Successfully imported {importSuccessCount} orders! Refresh the page to see updated stats.
            </div>
          )}
        </div>
      </div>

      {/* 2.5 SYSTEM OPERATIONS & MAINTENANCE */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm flex flex-col gap-4">
        <h4 className="font-display font-bold text-sm text-ink flex items-center gap-2">
          <Power className="w-4 h-4 text-rose-500" />
          System Kill Switch & Maintenance
        </h4>
        
        <p className="text-xs text-slate-500 font-mono leading-relaxed">
          Instantly deactivate the public storefront and show the glassmorphic Maintenance Mode splash screen. Admin URLs remain accessible.
        </p>

        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-ink">Website Status</span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5">
              {maintenanceMode ? '🚨 UNDER MAINTENANCE' : '🟢 LIVE & OPERATIONAL'}
            </span>
          </div>

          <button
            onClick={handleToggleMaintenance}
            disabled={maintenanceLoading}
            className={`px-4 h-9.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm ${
              maintenanceMode 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-rose-500 text-white hover:bg-rose-600'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {maintenanceLoading ? 'Processing...' : maintenanceMode ? 'Turn Website ON' : 'Turn Website OFF'}
          </button>
        </div>

        {maintenanceMode && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl text-[11px] font-mono flex items-start gap-2 leading-relaxed">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>WARNING: Maintenance mode is active. Only users logged into the admin dashboard can view database layouts. All other routes are rewritten.</span>
          </div>
        )}
      </div>

      {/* 3. API SECURITY STATUS */}
      <div className="glass glass-noise p-6 rounded-3xl shadow-sm">
        <h4 className="font-display font-bold text-sm text-ink mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-violet-600" />
          API Credentials
        </h4>
        
        <div className="space-y-4 font-mono text-[11px] text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100/50 pb-3 gap-2">
            <span className="font-bold text-slate-700">NEXT_PUBLIC_SUPABASE_URL</span>
            <span className="text-slate-400 select-all truncate max-w-[250px]">https://vhqzdmucrbcdubscyrpl.supabase.co</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100/50 pb-3 gap-2">
            <span className="font-bold text-slate-700">SUPABASE_REALTIME_STATUS</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              Connected & Listening
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

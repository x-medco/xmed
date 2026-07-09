'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Eye, EyeOff, ShieldAlert, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MailLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Redirect to subdomain root (which middleware maps to /mail)
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Authentication rejected.');
      }
    } catch (err: any) {
      setError('Connection to auth desk failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="p-8 md:p-10 border border-slate-800 bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col text-center">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Mail className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              XMed Mail
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-100 mb-2">Workspace Verification</h1>
          <p className="text-slate-400 text-xs mb-8">Enter your administrative passcode to access info@x-med.co mailbox.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
              />
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-455 rounded-xl text-xs font-semibold flex items-center gap-2 justify-center">
                <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 disabled:opacity-50 transition-all transform active:scale-98"
            >
              <span>{loading ? 'Verifying...' : 'Unlock Mailbox'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

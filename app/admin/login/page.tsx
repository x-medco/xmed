'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
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
        router.push('/admin');
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="glass-static glass-noise p-8 border-white/60 bg-white/50 rounded-3xl shadow-glass flex flex-col text-center">
          
          {/* Logo Header */}
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
              <span className="font-mono text-white font-black text-xs">X</span>
            </div>
            <span className="font-display font-black text-lg tracking-tight text-ink">X-MED Console</span>
          </div>

          <h1 className="font-display font-extrabold text-xl text-ink mb-2">Security Verification</h1>
          <p className="text-slate-500 text-xs mb-6">Enter authorization credential to unlock control panel.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Admin Passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input pl-10 pr-10 text-sm h-11"
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-650 rounded-xl text-xs font-semibold flex items-center gap-1.5 justify-center">
                <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="btn-gradient w-full h-11 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <span>{loading ? 'Authorizing...' : 'Unlock Console'}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  User, Mail, Lock, Package, LogOut, FileText, 
  CheckCircle, Calendar, Building, ShieldAlert, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBlob, { GridOverlay } from '@/components/GlassBlob';

export default function AccountPage() {
  const supabaseClient = getSupabaseClient();
  
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [facility, setFacility] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    try {
      const { data } = await supabaseClient.auth.getUser();
      if (data?.user) {
        setSessionUser(data.user);
        fetchOrders(data.user.email);
      } else {
        setSessionUser(null);
      }
    } catch (err) {
      console.error('Error checking user session:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (userEmail: string) => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (authMode === 'login') {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setAuthSuccess('Sign in successful!');
        setSessionUser(data.user);
        fetchOrders(data.user.email);
      } else {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              facility_name: facility
            }
          }
        });
        if (error) throw error;
        setAuthSuccess('Registration successful! Session initialized.');
        setSessionUser(data.user);
        fetchOrders(data.user.email);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabaseClient.auth.signOut();
      setSessionUser(null);
      setOrders([]);
      setEmail('');
      setPassword('');
      setFullName('');
      setFacility('');
    } catch (err) {
      console.error('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !sessionUser) {
    return (
      <div className="relative min-h-screen bg-transparent flex items-center justify-center pt-28 pb-20">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
            <User className="w-5 h-5 animate-spin" />
          </div>
          <span className="font-mono text-xs text-slate-400">Loading Account Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">

      <div className="mx-auto max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {!sessionUser ? (
            /* AUTH FORM PANEL */
            <motion.div
              key="auth-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="glass-static glass-noise max-w-md mx-auto p-8 border-white/60 bg-white/50 shadow-glass"
            >
              {/* Tabs */}
              <div className="flex border-b border-slate-100 pb-4 mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setAuthError(null); }}
                  className={`flex-1 font-display font-bold text-sm pb-2 border-b-2 transition-colors ${
                    authMode === 'login'
                      ? 'border-blue-650 text-blue-600'
                      : 'border-transparent text-slate-400 hover:text-ink'
                  }`}
                >
                  Researcher Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setAuthError(null); }}
                  className={`flex-1 font-display font-bold text-sm pb-2 border-b-2 transition-colors ${
                    authMode === 'register'
                      ? 'border-blue-650 text-blue-600'
                      : 'border-transparent text-slate-400 hover:text-ink'
                  }`}
                >
                  Create Lab Account
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <input
                        required
                        placeholder="Principal Investigator Name"
                        className="glass-input pl-10 text-sm h-11 border-slate-200"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <input
                        placeholder="Research Institution / Facility"
                        className="glass-input pl-10 text-sm h-11 border-slate-200"
                        value={facility}
                        onChange={(e) => setFacility(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    required
                    type="email"
                    placeholder="lab@institution.org"
                    className="glass-input pl-10 text-sm h-11 border-slate-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    required
                    type="password"
                    placeholder="Secure Password"
                    className="glass-input pl-10 text-sm h-11 border-slate-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-650 text-xs font-semibold leading-relaxed">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-11 btn-gradient flex items-center justify-center gap-2 text-sm mt-6 font-semibold"
                >
                  {authMode === 'login' ? 'Authenticate Access' : 'Register Lab Account'}
                </button>
              </form>
            </motion.div>
          ) : (
            /* ACCOUNT HUB PANEL */
            <motion.div
              key="account-hub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              {/* Profile Card Sidebar */}
              <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 flex flex-col gap-5 shadow-glass">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-ink">
                      {sessionUser.user_metadata?.full_name || 'Verified Researcher'}
                    </h2>
                    <span className="text-[10px] font-mono text-slate-450">
                      ID: {sessionUser.id.substring(0, 10).toUpperCase()}...
                    </span>
                  </div>
                </div>

                <div className="perforation" />

                <div className="space-y-3.5 font-mono text-xs text-slate-650 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">FACILITY</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[150px]">
                      {sessionUser.user_metadata?.facility_name || 'General Access'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">EMAIL</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[150px]">{sessionUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">CLEARANCE</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">RESEARCH LEVEL-1</span>
                  </div>
                </div>

                <div className="perforation" />

                {/* Downloads List */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Lab Documentation
                  </h3>
                  <div className="space-y-2 text-xs">
                    <a href="#" className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 shadow-sm">
                      <span>Reconstitution Guide.pdf</span>
                      <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold">Download</span>
                    </a>
                    <a href="#" className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 shadow-sm">
                      <span>HPLC Analysis Template.pdf</span>
                      <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold">Download</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full h-10 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mt-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  De-authorize Session
                </button>
              </div>

              {/* Order History */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl font-bold text-ink">Research Orders History</h2>
                  <span className="text-xs font-mono text-slate-500">{orders.length} Registered Runs</span>
                </div>

                {ordersLoading ? (
                  <div className="glass-static glass-noise p-10 border-white/60 text-center flex flex-col items-center gap-3 bg-white/50 shadow-glass">
                    <Package className="w-10 h-10 text-blue-600 animate-spin" />
                    <span className="text-xs text-slate-500">Fetching order history records...</span>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="glass-static glass-noise p-5 border-white/60 bg-white/50 shadow-glass">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-600" />
                            <span className="font-mono text-xs text-slate-800 font-bold">
                              RUN #{ord.id.substring(0, 8).toUpperCase()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(ord.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase font-mono">
                            {ord.status.replace('_', ' ')}
                          </div>
                        </div>

                        <div className="space-y-1 mt-2 text-xs text-slate-600 font-mono">
                          <div className="flex justify-between">
                            <span>SHIPPED TO</span>
                            <span className="text-slate-800 font-semibold text-right">{ord.name}, {ord.city}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>METHOD</span>
                            <span className="text-slate-800 font-semibold text-right">Discreet EU Courier</span>
                          </div>
                          {ord.discount > 0 && (
                            <div className="flex justify-between text-emerald-600 font-semibold">
                              <span>BOGO SAVINGS</span>
                              <span>-€{parseFloat(ord.discount).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-ink font-bold border-t border-slate-100 pt-2 mt-2">
                            <span>TOTAL RUN VALUE</span>
                            <span>€{parseFloat(ord.total).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-static glass-noise p-10 border-white/60 text-center bg-white/50 shadow-glass">
                    <Package className="w-12 h-12 text-slate-405 mx-auto mb-4" />
                    <h3 className="font-display font-semibold text-lg text-ink mb-2">No Order Runs Registered</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      You haven't initiated any research orders under this researcher credential yet. Browse our catalog to request compounds.
                    </p>
                    <Link
                      href="/products"
                      className="btn-gradient px-6 h-10 text-sm font-semibold inline-flex items-center justify-center"
                    >
                      Explore Peptides Catalog
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

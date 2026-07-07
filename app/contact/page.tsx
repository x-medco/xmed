'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { Mail, Building, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
  const supabaseClient = getSupabaseClient();
  const [form, setForm] = useState({ name: '', email: '', facility: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: dbErr } = await supabaseClient
        .from('contact_messages')
        .insert({
          name: form.name,
          email: form.email,
          message: `${form.facility ? `[Facility: ${form.facility}] ` : ''}${form.message}`
        });

      if (dbErr) throw dbErr;

      setSuccess(true);
      setForm({ name: '', email: '', facility: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to submit message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="vial-badge">Contact Lab Support</span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-ink mt-4">
            Research Consultation & Inquiries
          </h1>
          <p className="text-slate-605 mt-3 text-sm leading-relaxed">
            Have questions regarding HPLC batch certifications, specific peptide volumes, or customs courier packaging? Submit an inquiry to our lab support desk.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Contact Details Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
              <h3 className="font-display font-semibold text-ink mb-4">Laboratory Desk</h3>
              
              <div className="space-y-4 text-sm text-slate-650">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="text-xs text-slate-500 font-mono">SUPPORT EMAIL</div>
                    <a href="mailto:support@x-med.co" className="hover:underline text-ink font-medium">support@x-med.co</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="text-xs text-slate-500 font-mono">DISTRIBUTION</div>
                    <span className="text-ink font-medium">Schengen Zone Courier Hubs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-static p-5 border-white/60 bg-white/50 text-xs text-slate-500 leading-normal flex items-start gap-2 shadow-glass">
              <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>
                NOTICE: We do not provide dosage recommendations, therapeutic evaluations, or compounding advice for human use. All inquiries must relate strictly to in-vitro research runs.
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="glass-static glass-noise p-6 md:p-8 border-white/60 bg-white/50 shadow-glass">
              {success ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">Message Transmitted</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Your scientific inquiry has been uploaded. A support analyst will review your message and reply within 12-24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-gradient px-6 h-10 text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        required
                        placeholder="Your Name"
                        className="glass-input text-sm h-11"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        required
                        type="email"
                        placeholder="lab@institution.org"
                        className="glass-input text-sm h-11"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      placeholder="Research Institution / Facility (Optional)"
                      className="glass-input text-sm h-11"
                      value={form.facility}
                      onChange={(e) => setForm({ ...form, facility: e.target.value })}
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      placeholder="Write your research compounds query or shipment details..."
                      rows={5}
                      className="glass-input text-sm py-3 h-32 resize-none"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-650 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 btn-gradient flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {loading ? 'Transmitting inquiry...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

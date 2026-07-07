import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-20 px-4 sm:px-6 text-slate-700">
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h1 className="font-display text-3xl font-black text-ink">Privacy Policy</h1>
        </div>

        <div className="glass-static glass-noise p-8 border-white/60 bg-white/50 space-y-6 text-sm leading-relaxed shadow-glass">
          <p className="text-xs text-slate-500 font-mono">LAST UPDATED: 07-JULY-2026</p>
          
          <h2 className="text-lg font-bold text-ink font-display">1. Data Collection Framework</h2>
          <p>
            At X-Med, we collect details necessary to process research supply requests and verify laboratory intent. This includes contact parameters (PI name, facility email, phone number) and shipping information. No medical or physical health records are requested or processed by our platforms.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">2. Use of Information</h2>
          <p>
            Collected details are utilized exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process chemical reagent order requests and secure payments.</li>
            <li>Distribute order tracking and HPLC analytical certificate reports.</li>
            <li>Maintain institutional user registries.</li>
            <li>Verify compliance parameters (research-use verification).</li>
          </ul>

          <h2 className="text-lg font-bold text-ink font-display">3. Information Protection</h2>
          <p>
            We deploy secure sockets layer (SSL) encryption protocols and secure database backends (via Supabase) to restrict data leaks. Credentials, order logs, and analytical profiles are locked from public crawling.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">4. Cookies and Web Identifiers</h2>
          <p>
            Our website uses session identifiers and local storage settings to maintain shopping cart consistency and authentication states. We do not use third-party tracking pixels or marketing cookies designed to track visitors beyond our domain.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">5. Compliance and Rights</h2>
          <p>
            European Union residents retain all rights under General Data Protection Regulation (GDPR) standards, including the right to inspect, edit, or delete personal account profiles. To delete laboratory credentials, submit a ticket to support@x-med.co.
          </p>
        </div>
      </div>
    </div>
  );
}

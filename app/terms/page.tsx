import { ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-20 px-4 sm:px-6 text-slate-700">
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-650">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <h1 className="font-display text-3xl font-black text-ink">Terms & Conditions</h1>
        </div>

        <div className="glass-static glass-noise p-8 border-white/60 bg-white/50 space-y-6 text-sm leading-relaxed shadow-glass">
          <p className="text-xs text-slate-500 font-mono">LAST UPDATED: 07-JULY-2026</p>
          
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 font-bold uppercase tracking-wider text-xs">
            CRITICAL DISCLOSURE: CHEMICAL COMPOUNDS SUPPLIED STRICTLY FOR LABORATORY RESEARCH USE ONLY
          </div>

          <h2 className="text-lg font-bold text-ink font-display">1. Use of Products</h2>
          <p>
            All products listed on this website are synthesized and supplied exclusively for in-vitro laboratory analysis and research use. They are not medications, supplements, food, or cosmetic preparations. They must not under any circumstances be administered to humans or animals.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">2. Researcher Responsibility</h2>
          <p>
            By purchasing, the buyer represents and warrants that they are associated with an authorized research laboratory, institution, or university, and that they possess the proper facilities, training, and safety procedures to handle hazardous biochemical materials. The buyer accepts all liability for handling, storage, and results.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">3. Disclaimer of Liability</h2>
          <p>
            X-Med, its directors, developers, and partners disclaim all liability for any damages (direct, indirect, or incidental) resulting from improper usage, accidental exposure, or therapeutic attempts involving these compounds. All material risks are assumed by the purchasing researcher.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">4. Shipping & Legality</h2>
          <p>
            We ship to Schengen zone countries from hubs within the European Union. Buyers are responsible for confirming the regulatory status of the requested reagents under local laws in their specific jurisdiction before ordering.
          </p>

          <h2 className="text-lg font-bold text-ink font-display">5. Return & Analysis Policy</h2>
          <p>
            Due to the chemical stability requirements of lyophilized compounds, we do not accept returns. If a researcher can verify via HPLC report that a compound batch fails to match our certificate parameters, a replacement or refund will be processed upon audit validation.
          </p>
        </div>
      </div>
    </div>
  );
}

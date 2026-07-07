'use client';

import Link from 'next/link';
import FAQSection from '@/components/FAQ';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqCategories = [
    {
      title: 'Purity & Quality Verification',
      faqs: [
        { q: 'What quality grade are your products?', a: 'All compounds are manufactured to research-grade specifications, targeting a minimum purity index of 99.0%+. Synthesis folding and exact amino-acid counts are verified per-batch.' },
        { q: 'How do I access the Certificate of Analysis (CoA) for my batch?', a: 'Registered researchers can request batch-specific HPLC analysis reports. Simply email support@x-med.co referencing your order ID or download templates from your Account Hub.' },
        { q: 'Why is there a compliance warning on all products?', a: 'Our compounds are synthetic chemical materials intended strictly for laboratory and in-vitro testing. They are not approved for human or veterinary use. Labels keep laboratory compliance clear.' }
      ]
    },
    {
      title: 'Storage & Reconstitution',
      faqs: [
        { q: 'How should I store lyophilized peptide vials?', a: 'Lyophilized (freeze-dried) vials should be kept refrigerated at 2°C to 8°C. For long-term preservation before assays, store in a lab freezer at -20°C, protected from light.' },
        { q: 'What is the shelf life of these compounds?', a: 'In dry lyophilized form under refrigeration, peptides remain stable for 24-36 months. Reconstituted peptides should be stored chilled (2-8°C) and consumed in assays within 14-21 days.' },
        { q: 'Does every order ship with reconstitution water?', a: 'Yes — every peptide vial (excluding tablets, pills, and the pre-loaded pen) includes one free 2ml vial of sterile Bacteriostatic Water containing 0.9% benzyl alcohol as preservative.' }
      ]
    },
    {
      title: 'Shipping & Delivery',
      faqs: [
        { q: 'Where do you ship from?', a: 'We distribute from specialized courier hubs located within the European Union, ensuring fast transit times and zero customs checks for Schengen Zone destinations.' },
        { q: 'Is shipping secure and discreet?', a: 'Yes. Reagents are packaged inside unmarked, thermal padded envelopes with cold-packs when temperature control is required. Package descriptions do not mention chemical compounds.' },
        { q: 'How long does delivery take?', a: 'Standard EU shipping typically takes 3-5 business days. Tracking numbers are generated and emailed to your laboratory address upon dispatch.' }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl font-black text-ink tracking-tight">
            Laboratory Support Center
          </h1>
          <p className="text-slate-605 mt-3 text-sm max-w-lg mx-auto">
            Review detailed answers concerning synthesis verification, cold storage handling, EU delivery hubs, and compliance codes.
          </p>
        </div>

        {/* FAQ lists */}
        <div className="space-y-12">
          {faqCategories.map((cat, idx) => (
            <div key={idx} className="glass-static glass-noise p-6 border-white/60 bg-white/50 shadow-glass">
              <h2 className="font-display text-xl font-bold text-ink mb-6 border-b border-slate-100 pb-3 font-semibold">
                {cat.title}
              </h2>
              <FAQSection faqs={cat.faqs} title="" />
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 text-center mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glass">
          <div className="text-left">
            <h3 className="font-display font-semibold text-ink">Have a specific compounding query?</h3>
            <p className="text-xs text-slate-500 mt-1">Our support desk is available to assist qualified investigators.</p>
          </div>
          <Link
            href="/contact"
            className="btn-gradient h-10 px-6 text-xs"
          >
            Submit Lab Ticket
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

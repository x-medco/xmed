import type { FAQ } from '@/lib/products';

export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }: { faqs: FAQ[]; title?: string }) {
  if (!faqs?.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="faq" className="mt-6">
      {title && (
        <h2 className="font-display text-2xl font-bold mb-6 text-ink text-center md:text-left">{title}</h2>
      )}
      <div className="glass-static glass-noise divide-y divide-slate-200/50 overflow-hidden shadow-glass border-white/60">
        {faqs.map((f, i) => (
          <details key={i} className="group p-5 hover:bg-slate-50/30 transition-colors duration-150">
            <summary className="cursor-pointer list-none flex items-center justify-between font-display font-semibold text-ink select-none hover:text-blue-650 transition-colors">
              <span className="pr-4">{f.q}</span>
              <span className="font-mono text-blue-600 group-open:rotate-45 transition-transform duration-200 text-lg">＋</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-body pr-4">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

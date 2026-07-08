'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, Play,
  Beaker, Shield, FileText, Globe, Microscope,
  FlaskConical, TestTubes, Factory, Truck, ShoppingBag
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/lib/products';
import type { Variants } from 'framer-motion';

/* ===== Animation Variants ===== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }, // slightly faster stagger for 16 items
};

/* ===== Section Wrapper with scroll-triggered fade ===== */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface HomeClientProps {
  products: Product[];
  categories: readonly string[];
}

export default function HomeClient({ products, categories }: HomeClientProps) {
  const [newOrderNotification, setNewOrderNotification] = useState<any>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel('homepage-order-notifications')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' }, 
        (payload: any) => {
          console.log('Homepage Realtime Order:', payload.new);
          setNewOrderNotification({
            id: payload.new.id,
            name: payload.new.name,
            total: Number(payload.new.total),
            city: payload.new.city
          });
          // Hide notification after 8 seconds
          setTimeout(() => {
            setNewOrderNotification(null);
          }, 8000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* Best Seller products to display on home page */
  const bestSellerSlugs = [
    'bpc-157-5mg',
    'tb-500-10mg',
    'retatrutide-5mg',
    'retatrutide-10mg',
    'retatrutide-10mg-quick-pen',
    'tirzepatide-5mg',
    'nad-500mg',
    '5-amino-1mq-50mg'
  ];
  const featuredProducts = products.filter(p => bestSellerSlugs.includes(p.slug));

  /* Process timeline scroll progress */
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end center'] });
  const lineWidth = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative min-h-screen overflow-hidden pb-8">

      {/* ============== HERO ============== */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Eyebrow chip */}
            <div className="glass-chip px-4 py-1.5 inline-flex items-center gap-2 w-fit">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-graphite uppercase">
                Premium Peptide Research
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-[82px] font-black leading-[0.9] tracking-tighter text-ink">
              SCIENCE<br />
              <span className="gradient-text">ENGINEERED.</span>
              <br />RESULTS
            </h1>

            {/* Subtext */}
            <p className="text-graphite text-base md:text-lg leading-relaxed max-w-lg">
              High purity research peptides engineered for performance, precision, and progress.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/products" className="btn-gradient h-12 px-8 text-sm">
                Explore Peptides
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-glass h-12 px-6 text-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                About X-MED
              </Link>
            </div>

            {/* Stats — each in a glass tile */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {[
                { val: '99%+', label: 'PURITY' },
                { val: '100+', label: 'RESEARCHERS' },
                { val: '50+', label: 'COUNTRIES' },
                { val: '0', label: 'COMPROMISES' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-chip px-5 py-3 flex flex-col text-left"
                >
                  <span className="font-display font-black text-xl gradient-text leading-none">
                    {stat.val}
                  </span>
                  <span className="text-[9px] font-mono text-graphite/60 font-bold mt-1 tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Product showcase on glass platform */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="w-full relative h-[450px] md:h-[500px] lg:h-[550px]"
          >
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
              <Image 
                src="https://res.cloudinary.com/tedfhije/image/upload/v1783446109/home_1_qceldg.jpg" 
                alt="X-Med Premium Peptide Research" 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== FEATURED PEPTIDES (16 PRODUCTS) ============== */}
      <RevealSection className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase gradient-text">Best Sellers</span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-ink tracking-tight">
                Our Top Selling Research Peptides
              </h2>
            </div>
            <Link href="/products" className="hidden md:flex btn-glass h-10 px-5 text-xs font-bold text-ink/70">
              View All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Responsive grid displaying best seller items */}
          <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((p) => (
              <motion.div key={p.slug} variants={fadeUp} className="h-full flex">
                <Link
                  href={`/products/${p.slug}`}
                  className="glass glass-noise group flex flex-col w-full overflow-hidden rounded-3xl"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image - Responsive height, covers top section of the card */}
                    <div className="w-full h-44 sm:h-56 md:h-64 lg:h-72 relative overflow-hidden rounded-t-[24px]">
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Info Section */}
                    <div className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4 flex flex-col flex-1">
                      <div className="flex-1 min-w-0">
                        {/* Strength Row */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider bg-blue-500/10 text-blue-700 px-2 py-0.5 sm:px-2.5 rounded-full border border-blue-500/20">
                            {p.strength}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-ink leading-tight mb-1.5 tracking-tight group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h3>

                        {/* Label/Description */}
                        <p className="text-[10px] sm:text-[11px] text-graphite/70 leading-relaxed mb-2.5 line-clamp-2">
                          {p.shortDescription}
                        </p>

                        {/* Lab warning bar */}
                        <div className="mb-2 sm:mb-4 bg-red-500/5 border border-red-500/10 rounded-lg p-1 sm:p-2 text-center">
                          <span className="text-[8px] sm:text-[9px] text-red-600 font-mono font-semibold uppercase tracking-wider block leading-tight">
                            Chemical Compound: research & laboratory use only
                          </span>
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div className="mt-auto pt-1 sm:pt-2 flex flex-col gap-2 sm:gap-2.5">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-ink font-bold text-sm sm:text-base md:text-lg">
                              €{p.price.toFixed(2)}
                            </span>
                            {p.compareAtPrice && (
                              <span className="font-mono text-slate-400 line-through text-[10px] sm:text-xs">
                                €{p.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full btn-gradient py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold text-white flex items-center justify-center gap-1.5 sm:gap-2 group-hover:from-blue-500 group-hover:to-violet-500 transition-all shadow-md group-hover:shadow-lg">
                          <span>View Compound</span>
                          <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ============== WHY CHOOSE US ============== */}
      <RevealSection className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp} className="mb-14">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase gradient-text">Why Choose X-MED</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-ink tracking-tight mt-2">
              Science. Quality. You Can Trust.
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Beaker, title: 'Research Grade', desc: 'For laboratory research use only.' },
              { icon: Shield, title: 'High Purity', desc: '≥ 99% purity assured.' },
              { icon: FileText, title: 'COA Tested', desc: 'Every batch quality verified.' },
              { icon: Globe, title: 'Worldwide Shipping', desc: 'Fast, discreet & reliable delivery.' },
              { icon: Microscope, title: 'Science Backed', desc: 'Driven by research. Built on integrity.' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="glass glass-noise flex flex-col justify-between h-44 p-6 group cursor-default">
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 4 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.15) 100%)' }}
                  >
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </motion.div>
                </div>
                <div className="relative z-10">
                  <h3 className="font-display font-extrabold text-ink text-sm leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-graphite/60 leading-normal mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ============== GLOBAL IMPACT (RESTORED WITH DEEP GLASS & EARTH IMAGE) ============== */}
      <RevealSection className="py-24 relative overflow-hidden flex items-center justify-center">
        {/* Old half earth image backdrop */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none">
          <Image
            src="/images/global_impact_earth.png"
            alt="Atmospheric Glow Earth"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-[#f8fafc]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase gradient-text">
            MAKING AN IMPACT GLOBALLY
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-ink mt-3 tracking-tight">
            Science. Quality. Global Impact.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { val: '120+', label: 'Countries Served' },
              { val: '500K+', label: 'Vials Delivered' },
              { val: '10K+', label: 'Research Clients' },
              { val: '99.9%', label: 'Quality Commitment' },
            ].map((st, i) => (
              <div 
                key={i} 
                className="glass glass-noise p-6 flex flex-col justify-center items-center shadow-glass"
              >
                <div className="font-display font-black text-3xl md:text-4xl gradient-text">{st.val}</div>
                <div className="text-xs text-graphite font-semibold mt-2">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ============== SCIENTIFIC PROCESS ============== */}
      <RevealSection className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase gradient-text">Our Scientific Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-ink tracking-tight leading-tight">
              From Research<br />to Results
            </h2>
            <p className="text-graphite text-sm leading-relaxed max-w-md">
              Every peptide we offer goes through rigorous testing and quality control to ensure unmatched purity and reliability.
            </p>
            <div className="mt-2">
              <Link href="/about" className="btn-gradient h-11 px-6 text-xs">
                Learn Our Process
              </Link>
            </div>
          </motion.div>

          {/* Right — Timeline panel */}
          <motion.div variants={fadeUp} ref={timelineRef} className="glass-static glass-noise rounded-[28px] p-8 md:p-10 relative overflow-hidden shadow-glass">
            {/* Animated gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/30 rounded-full overflow-hidden z-20">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: lineWidth,
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-6">
              {[
                { icon: FlaskConical, step: 'Research', desc: 'Innovating the future through science.' },
                { icon: TestTubes, step: 'Testing', desc: 'Advanced testing for purity.' },
                { icon: Factory, step: 'Manufacturing', desc: 'Precision manufacturing in controlled labs.' },
                { icon: Truck, step: 'Worldwide Distribution', desc: 'Delivering excellence worldwide.' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600"
                      style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))' }}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-extrabold text-ink text-sm">{item.step}</h4>
                  </div>
                  <p className="text-[11px] text-graphite/60 leading-normal pl-11">{item.desc}</p>
                </div>
              ))}
            </div>


          </motion.div>
        </div>
      </RevealSection>

      {/* ============== CTA BANNER ============== */}
      <RevealSection className="py-16">
        <motion.div variants={fadeUp} className="mx-auto max-w-7xl px-6">
          <div className="glass-dark glass-noise rounded-[28px] relative overflow-hidden min-h-[380px] flex items-center shadow-glass-strong">
            {/* Crystal BG */}
            <div className="absolute inset-0 z-0">
              <Image src="/images/cta_crystals_bg.jpg" alt="Crystal background" fill className="object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-violet-600/20 to-transparent" />
            </div>

            <div className="relative z-10 p-10 md:p-16 max-w-xl">
              <span className="glass-chip px-3 py-1 text-[10px] font-mono font-bold tracking-[0.2em] text-graphite uppercase inline-block">
                Ready to elevate your research?
              </span>
              <h3 className="font-display font-black text-3xl md:text-5xl mt-4 leading-[1.05] tracking-tight text-ink">
                Premium Peptides.<br />
                Proven <span className="gradient-text">Results.</span>
              </h3>
              <p className="text-graphite text-sm max-w-md font-medium leading-relaxed mt-4">
                Discover our premium range of research peptides engineered for scientists who demand the best.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-gradient h-12 px-8 text-sm">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </RevealSection>

      {/* Realtime Order Notification Toast */}
      <AnimatePresence>
        {newOrderNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 glass-static glass-noise border border-blue-500/30 p-5 rounded-2xl shadow-glass-strong max-w-sm flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center flex-shrink-0 animate-bounce">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] font-mono font-bold text-blue-650 uppercase tracking-widest leading-none">New Order Received!</span>
              <span className="text-xs font-bold text-ink leading-tight mt-1">
                {newOrderNotification.name} from {newOrderNotification.city} just placed a run.
              </span>
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100/50">
                <span className="font-mono text-[9px] font-semibold text-slate-400">RUN #{newOrderNotification.id.substring(0, 8).toUpperCase()}</span>
                <span className="font-mono text-xs font-bold text-blue-600">€{newOrderNotification.total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => setNewOrderNotification(null)}
              className="text-slate-400 hover:text-ink text-xs font-bold font-mono ml-2 flex-shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useTheme } from '@/lib/theme-context';
import { ShoppingBag, User, Search, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isAdminSubdomain = typeof window !== 'undefined' && 
    (window.location.hostname.startsWith('admin.') || window.location.hostname.startsWith('admin.localhost'));
  if (pathname.startsWith('/admin') || isAdminSubdomain) {
    return null;
  }
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Shop', href: '/products', hasDropdown: false },
    { name: 'About', href: '/about', hasDropdown: false },
    { name: 'FAQ', href: '/faq', hasDropdown: false },
    { name: 'Contact', href: '/contact', hasDropdown: false },
    { name: 'Account', href: '/account', hasDropdown: false },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2 px-4' : 'py-4 px-4'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ${
            scrolled
              ? 'rounded-2xl bg-white/70 backdrop-blur-[24px] backdrop-saturate-[160%] border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.08)]'
              : 'rounded-2xl bg-white/40 backdrop-blur-[12px] backdrop-saturate-[140%] border border-white/40'
          }`}
        >
          <div className="flex items-center justify-between h-14 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <span className="font-display font-extrabold text-[1.35rem] leading-none tracking-tight text-ink">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">X-</span>MED
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-body font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-1 py-1.5 transition-colors duration-200 hover:text-blue-600 ${
                      isActive ? 'text-blue-600' : 'text-ink/70'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-ink/50 hover:text-blue-600 hover:bg-white/60 transition-all"
                aria-label="Search products"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link
                href="/account"
                className={`hidden sm:flex p-2 rounded-xl transition-all ${
                  pathname.startsWith('/account')
                    ? 'text-blue-600 bg-blue-50/60'
                    : 'text-ink/50 hover:text-blue-600 hover:bg-white/60'
                }`}
                aria-label="User Account"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
              <Link
                href="/cart"
                className="relative p-2 rounded-xl text-ink/50 hover:text-blue-600 hover:bg-white/60 transition-all"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[9px] font-mono font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm ring-2 ring-white">
                    {count}
                  </span>
                )}
              </Link>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[13px] font-semibold hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.02]"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-ink/50 hover:text-blue-600 hover:bg-white/60 transition-all ml-0.5"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-4 shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/60"
            >
              <div className="flex items-center justify-between border-b border-slate-100/80 pb-3">
                <span className="font-display font-bold text-ink">Search Products</span>
                <button onClick={() => setSearchOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-ink hover:bg-white/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form action="/products" method="GET" className="relative">
                <input
                  type="text" name="search" placeholder="Search by name, purpose, strength..."
                  autoFocus
                  className="w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm text-ink placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all pr-12"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white hover:from-blue-500 hover:to-violet-500 transition-all">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[11px] text-graphite font-mono">
                Suggested: <Link href="/products?search=Retatrutide" className="text-blue-600 hover:underline">Retatrutide</Link>,{' '}
                <Link href="/products?search=BPC-157" className="text-blue-600 hover:underline">BPC-157</Link>,{' '}
                <Link href="/products?search=Tirzepatide" className="text-blue-600 hover:underline">Tirzepatide</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[80px] left-4 right-4 z-40 lg:hidden bg-white/75 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.12)]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-ink font-display font-semibold text-[15px] border-b border-slate-100/60 last:border-b-0 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-graphite" />}
                </Link>
              ))}
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-600/20"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

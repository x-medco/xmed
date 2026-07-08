'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopClientProps {
  products: Product[];
  categories: readonly string[];
}

export default function ShopClient({ products, categories }: ShopClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial values from URL
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState(initialSort);

  // Sync state with URL if they change externally (e.g. back button)
  useMemo(() => {
    setActiveCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
    setSortOption(searchParams.get('sort') || 'popular');
  }, [searchParams]);

  // Update URL helper
  const updateUrl = (cat: string, search: string, sort: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    if (search) params.set('search', search);
    if (sort && sort !== 'popular') params.set('sort', sort);
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (categoryName: string) => {
    const newVal = activeCategory === categoryName ? '' : categoryName;
    setActiveCategory(newVal);
    updateUrl(newVal, searchQuery, sortOption);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrl(activeCategory, query, sortOption);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    updateUrl(activeCategory, searchQuery, sort);
  };

  const handleClearFilters = () => {
    setActiveCategory('');
    setSearchQuery('');
    setSortOption('popular');
    router.push('/products');
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Sort items
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      const popularSlugs = [
        'bpc-157-5mg', 'tb-500-10mg', 'retatrutide-5mg', 'ipamorelin-5mg', 'ghk-cu-50mg', 'melanotan-2-10mg'
      ];
      result.sort((a, b) => {
        const aPop = popularSlugs.includes(a.slug) ? 1 : 0;
        const bPop = popularSlugs.includes(b.slug) ? 1 : 0;
        return bPop - aPop;
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, sortOption]);

  return (
    <div className="relative min-h-screen bg-transparent pb-24 pt-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header Title */}
        <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase gradient-text">
            Research Catalog
          </span>
          <h1 className="font-display text-4xl font-extrabold text-ink tracking-tight">
            Chemical Compound Index
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">
            {filteredProducts.length} Reagents Matching Analysis
          </p>
        </div>

        {/* Filter Controls Panel (Glass) */}
        <div className="glass-static glass-noise p-6 border-white/60 bg-white/50 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-glass">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by reagent name, code, purpose..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="glass-input pl-10 pr-10 text-sm h-11"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Sort Select */}
            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="glass-input pl-9 pr-8 text-sm h-11 appearance-none bg-white border-slate-200 text-slate-800 rounded-lg focus:border-blue-500"
              >
                <option value="popular">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A-Z</option>
                <option value="name-desc">Alphabetical: Z-A</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(activeCategory || searchQuery || sortOption !== 'popular') && (
              <button
                onClick={handleClearFilters}
                className="h-11 px-4 rounded-lg border border-red-500/20 bg-red-50/5 text-red-650 hover:bg-red-500/10 text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Categories Rail */}
        <div className="flex flex-wrap gap-2.5 mb-10 justify-center md:justify-start">
          <button
            onClick={() => handleCategorySelect('')}
            className={`text-xs font-semibold px-4 py-2.5 rounded-full border tracking-wide uppercase transition-all duration-200 ${
              !activeCategory
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 border-transparent text-white shadow-md shadow-blue-500/15'
                : 'border-white/50 bg-white/40 backdrop-blur-md text-slate-600 hover:border-blue-300 hover:text-ink'
            }`}
          >
            All Areas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategorySelect(c)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-full border tracking-wide uppercase transition-all duration-200 ${
                activeCategory === c
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 border-transparent text-white shadow-md shadow-blue-500/15'
                  : 'border-white/50 bg-white/40 backdrop-blur-md text-slate-600 hover:border-blue-300 hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-static glass-noise p-12 text-center border-white/60 bg-white/50 max-w-md mx-auto shadow-glass"
            >
              <SlidersHorizontal className="w-12 h-12 text-slate-405 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg text-ink mb-2">No Products Found</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                We couldn't find any research reagents matching your search criteria. Try modifying your filters or terms.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-gradient px-6 h-10 text-sm font-semibold"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

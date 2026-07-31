// app/products/page.tsx
'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Package, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Filter, 
  X,
  ChevronDown,
  Star,
  Grid3x3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import productsData from '@/data/products.json';

// Types
interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  startingPrice: number;
  featured: boolean;
  images: string[];
  badge?: string;
  category?: string;
  
}

// Get unique categories from products
const getAllCategories = (products: Product[]) => {
  const categories = new Set<string>();
  products.forEach(product => {
    if (product.category) {
      categories.add(product.category);
    }
    // Also check for category field as category
    if (product.category) {
      categories.add(product.category);
    }
  });
  return Array.from(categories);
};

function ProductsContent() {
  const products = productsData.products as Product[];
  const allCategories = getAllCategories(products);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFeatured, setShowFeatured] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Auto-select category from URL parameter
useEffect(() => {
  const categoryParam = searchParams.get("category");

  if (categoryParam) {
    setSelectedCategory(decodeURIComponent(categoryParam));
  } else {
    setSelectedCategory("All");
  }
}, [searchParams]);
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showFeatured, sortOption]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory || 
        product.category === selectedCategory
      );
    }

    // Featured filter
    if (showFeatured) {
      filtered = filtered.filter(product => product.featured === true);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id - b.id;
        });
        break;
    }

    return filtered;
  }, [products, selectedCategory, showFeatured, searchQuery, sortOption]);

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category change - clear URL params when "All" is selected
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    // If "All" is selected, remove the category parameter from URL
    if (category === 'All') {
      // Remove the category parameter
      const params = new URLSearchParams(searchParams.toString());
      params.delete('category');
      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      router.push(newUrl);
    }
    else {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  }
  };

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allCategories.forEach(cat => {
      counts[cat] = products.filter(p => 
        p.category === cat || p.category === cat
      ).length;
    });
    return counts;
  }, [products, allCategories]);

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
            className={`min-w-[40px] h-10 px-2 rounded-xl text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 lg:pt-24 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.8) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wide uppercase rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Our Collection
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
            Premium Packaging Solutions
          </h1>
          <p className="text-sm sm:text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Explore our complete range of customizable packaging solutions
            designed for quality, elegance, and durability.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-xl font-medium text-sm border border-amber-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <span className="bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 text-xs">
                {filteredProducts.length}
              </span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3">
              {/* Featured Toggle */}
              <button
                onClick={() => setShowFeatured(!showFeatured)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  showFeatured 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-4 h-4 ${showFeatured ? 'fill-white' : ''}`} />
                Featured
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-gray-100 text-gray-700 px-4 py-2 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer hover:bg-gray-200 transition-all"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="name-asc">Name A → Z</option>
                  <option value="name-desc">Name Z → A</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-3 pt-3 border-t border-gray-100 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFeatured(!showFeatured)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center ${
                      showFeatured 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${showFeatured ? 'fill-white' : ''}`} />
                    Featured
                  </button>

                  <div className="flex-1">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="name-asc">A → Z</option>
                      <option value="name-desc">Z → A</option>
                      <option value="price-asc">Price ↑</option>
                      <option value="price-desc">Price ↓</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-2">
                  {['All', ...allCategories].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryChange(category);
                        setIsFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCategory === category
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                      {category !== 'All' && (
                        <span className="ml-1 text-xs opacity-70">
                          ({categoryCounts[category] || 0})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Category Tabs - Desktop */}
      <section className="hidden md:block border-b border-gray-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Products
              <span className="ml-2 text-xs opacity-70">
                ({products.length})
              </span>
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({categoryCounts[category] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{currentProducts.length}</span> of{' '}
            <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {filteredProducts.length === 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
                setShowFeatured(false);
                setSortOption('default');
              }}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-14 md:py-16 lg:py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('All');
                  setShowFeatured(false);
                  setSortOption('default');
                }}
                className="px-6 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className={`group bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-100/20 hover:border-amber-200 transition-all duration-500 hover:-translate-y-1 ${
                        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-50 to-amber-50/30 ${
                        viewMode === 'grid' ? 'aspect-[4/3]' : 'aspect-[4/3] sm:aspect-auto sm:w-64'
                      }`}>
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package className="w-12 h-12" />
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
                              <Star className="w-3 h-3 fill-white" />
                              Featured
                            </span>
                          </div>
                        )}
                        {/* {product.badge && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center bg-white/95 text-gray-900 px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                              {product.badge}
                            </span>
                          </div>
                        )} */}
                      </div>

                      {/* Product Info */}
                      <div className={`p-5 flex flex-col ${
                        viewMode === 'list' ? 'flex-1' : ''
                      }`}>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="text-sm sm:text-sm sm:text-base font-bold text-neutral-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                              {product.name}
                            </h2>
                          </div>
                          {product.category && (
                            <span className="inline-block text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mb-2">
                              {product.category}
                            </span>
                          )}
                          <p className="text-neutral-600 text-sm mb-3 line-clamp-2 leading-7">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                          <div>
                            <span className="text-xs text-neutral-500 block">
                              Starting from
                            </span>
                            <span className="text-xl font-bold text-amber-600">
                              ₹{product.startingPrice}
                            </span>
                          </div>
                          <span className="flex items-center gap-1.5 text-amber-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading products...</div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
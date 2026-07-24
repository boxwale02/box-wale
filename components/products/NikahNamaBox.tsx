/// <reference types="react" />
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Star } from 'lucide-react';
import productsData from '@/data/products.json';

// Interface matching your JSON structure
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

interface FeaturedProductsProps {
  data?: {
    badge?: string;
    heading: string;
    description?: string;
    cta?: {
      text: string;
      href: string;
    };
  };
}

// Product Card Component for reusability
const ProductCard = ({ 
  product, 
  size = 'default',
  isFeatured = false,
  totalProducts = 0,
  className = '' 
}: { 
  product: Product; 
  size?: 'small' | 'default' | 'large' | 'hero';
  isFeatured?: boolean;
  totalProducts?: number;
  className?: string;
}) => {
  // Dynamic height for featured card based on total products
  const getFeaturedHeight = () => {
    if (totalProducts >= 6 && totalProducts <= 7) {
      return 'h-[400px] md:h-[500px] lg:h-[520px]';
    }
    if (totalProducts === 8) {
      return 'h-[400px] md:h-[500px] lg:h-[700px]';
    }
    // Default for 1-5 products
    return 'h-[400px] md:h-[500px] lg:h-[600px]';
  };

  const heightClasses = {
    small: 'h-[160px] md:h-[180px]',
    default: 'h-[200px] md:h-[240px]',
    large: 'h-[280px] md:h-[340px]',
    hero: isFeatured ? getFeaturedHeight() : 'h-[400px] md:h-[500px] lg:h-[600px]',
  };

  const imageHeight = heightClasses[size] || heightClasses.default;

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-100/50 hover:ring-amber-200/50 ${className}`}>
      <div className={`relative ${imageHeight} overflow-hidden bg-gray-100`}>
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          {/* {product.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-lg mb-2">
              <Star className="h-2.5 w-2.5 fill-white" />
              {product.badge}
            </span>
          )} */}
          
          <h3 className={`font-bold text-white ${size === 'hero' ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'}`}>
            {product.name}
          </h3>
          
          <p className={`mt-1 text-gray-200 ${size === 'hero' ? 'text-sm md:text-base line-clamp-2' : 'text-xs line-clamp-1'}`}>
            {product.description}
          </p>
          
          <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2 md:gap-3">
            <span className={`inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 md:px-3 md:py-1 font-bold text-gray-900 shadow-lg backdrop-blur-sm ${size === 'hero' ? 'text-sm md:text-base' : 'text-xs'}`}>
              From ₹{product.startingPrice}
            </span>
            
            <Link
              href={`/products/${product.slug}`}
              className={`inline-flex items-center gap-1.5 font-medium text-white transition-all duration-300 hover:text-amber-300 hover:gap-2 ${size === 'hero' ? 'text-sm md:text-base' : 'text-xs'}`}
            >
              Explore
              <ArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${size === 'hero' ? 'h-4 w-4' : 'h-3 w-3'}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small Card Component for side cards in bento layouts
const SmallProductCard = ({ product }: { product: Product }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-100/50 hover:ring-amber-200/50">
    <div className="flex h-[140px] md:h-[160px]">
      <div className="relative w-1/2 overflow-hidden bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="flex w-1/2 flex-col justify-center p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs md:text-sm font-bold text-gray-900">
            From ₹{product.startingPrice}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-medium text-amber-600 transition-all duration-300 hover:text-amber-700"
          >
            Explore →
          </Link>
        </div>
        {/* {product.badge && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white w-fit">
            <Star className="h-2 w-2 fill-white" />
            {product.badge}
          </span>
        )} */}
      </div>
    </div>
  </div>
);

export default function FeaturedProducts({ data }: FeaturedProductsProps) {
  // Filter products to only show featured ones with "Nikah Nama Box" category
  const allFeaturedProducts = productsData.products.filter(
    (product: Product) =>
      product.featured === true &&
      product.category === "Nikah Nama Box"
  );

  // Limit to maximum 8 products
  const products = allFeaturedProducts.slice(0, 8);
  const productCount = products.length;

  // If no featured products, show message
  if (productCount === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">No featured products available</h3>
          </div>
        </div>
      </section>
    );
  }

  // Section Header Component
  const SectionHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-10 md:mb-14 text-center"
    >
      {data?.badge && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200/50">
          <Package className="h-4 w-4" />
          {data.badge}
        </span>
      )}
      <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {data?.heading || "Nikah Nama Box"}
      </h2>
      {data?.description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          {data.description}
        </p>
      )}
    </motion.div>
  );

  // CTA Component
  const CTA = () => (
    data?.cta && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 md:mt-16 text-center"
      >
        <Link
          href={`${data.cta.href}?category=Nikah%20Nama%20Box`}
          className="group inline-flex items-center gap-3 rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-amber-600/25 transition-all duration-300 hover:bg-amber-700 hover:gap-4 md:text-lg"
        >
          {data.cta.text}
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    )
  );

  // ==================== LAYOUTS ====================

  // LAYOUT: 1 Product - Large centered hero card
  if (productCount === 1) {
    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="mx-auto max-w-3xl">
            <ProductCard 
              product={products[0]} 
              size="hero" 
              isFeatured={true}
              totalProducts={productCount}
            />
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 2 Products - Two equal-width large cards
  if (productCount === 2) {
    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} size="large" />
            ))}
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 3 Products - Three equal-width large cards
  if (productCount === 3) {
    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} size="large" />
            ))}
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 4 Products - Hero + 3 supporting cards (current bento)
  if (productCount === 4) {
    const heroProduct = products[0];
    const remainingProducts = products.slice(1);

    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hero Card - spans 2 rows */}
            <div className="lg:col-span-2 lg:row-span-2">
              <ProductCard 
                product={heroProduct} 
                size="hero" 
                isFeatured={true}
                totalProducts={productCount}
              />
            </div>
            
            {/* 3 Small Cards */}
            <div className="flex flex-col gap-6">
              {remainingProducts.map((product) => (
                <SmallProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 5 Products - Hero + 4 cards in 2x2 grid
  if (productCount === 5) {
    const heroProduct = products[0];
    const remainingProducts = products.slice(1);

    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hero Card - spans full left column */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ProductCard 
                product={heroProduct} 
                size="hero" 
                isFeatured={true}
                totalProducts={productCount}
              />
            </div>
            
            {/* 4 Cards in 2x2 grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="default" />
              ))}
            </div>
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 6 Products - Hero + 5 cards, center last row
  if (productCount === 6) {
    const heroProduct = products[0];
    const remainingProducts = products.slice(1);

    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hero Card - spans left side */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ProductCard 
                product={heroProduct} 
                size="hero" 
                isFeatured={true}
                totalProducts={productCount}
              />
            </div>
            
            {/* 5 Cards - 3 in first row, 2 centered in second row */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First 3 cards */}
              {remainingProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} size="default" />
              ))}
              {/* Last 2 cards - centered */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                {remainingProducts.slice(3, 5).map((product) => (
                  <ProductCard key={product.id} product={product} size="default" />
                ))}
              </div>
            </div>
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 7 Products - Hero + 6 cards in 3x2 grid
  if (productCount === 7) {
    const heroProduct = products[0];
    const remainingProducts = products.slice(1);

    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hero Card - spans left side */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ProductCard 
                product={heroProduct} 
                size="hero" 
                isFeatured={true}
                totalProducts={productCount}
              />
            </div>
            
            {/* 6 Cards in 3x2 grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {remainingProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="default" />
              ))}
            </div>
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // LAYOUT: 8 Products - Original bento with hero + 7 cards
  if (productCount === 8) {
    const heroProduct = products[0];
    const remainingProducts = products.slice(1);

    return (
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hero Card - spans 2 rows */}
            <div className="lg:col-span-2 lg:row-span-2">
              <ProductCard 
                product={heroProduct} 
                size="hero" 
                isFeatured={true}
                totalProducts={productCount}
              />
            </div>
            
            {/* Right column - max 4 small cards visible, rest hidden */}
            <div className="flex flex-col gap-6">
              {remainingProducts.slice(0, 4).map((product) => (
                <SmallProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <CTA />
        </div>
      </section>
    );
  }

  // Fallback - should never reach here
  return null;
}
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import productsData from '@/data/products.json';

// Interface matching your JSON structure
interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  startingPrice: number;
  featured: boolean;
  category: string;  
  images: string[];
  badge?: string;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function FeaturedProducts({ data }: FeaturedProductsProps) {
  // Filter products to only show featured ones
  // const featuredProducts = productsData.products.filter(
  //   (product: Product) => product.featured === true
  // );
  const featuredProducts = productsData.products.filter(
  (product: Product) =>
    product.featured === true &&
    product.category === "Luxury Hamper Boxes"
);

  // If no featured products, show message
  if (featuredProducts.length === 0) {
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

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            {data?.heading || "Featured Products"}
          </h2>

          {data?.description && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              {data.description}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {featuredProducts.map((product) => (
            <motion.article
              key={product.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-100/50 hover:ring-amber-200/50"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Badge */}
                {/* {product.badge && (
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                      <Star className="h-3 w-3 fill-white" />
                      {product.badge}
                    </span>
                  </div>
                )} */}

                {/* Price */}
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-sm">
                    From ₹{product.startingPrice}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <h3 className="mb-1.5 font-serif text-lg font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
                  {product.name}
                </h3>
                
                <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-medium text-amber-700 transition-all duration-300 hover:bg-amber-100 hover:gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        {data?.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 md:mt-10 text-center"
          >
            <Link
               href={`${data.cta.href}?category=Luxury%20Hamper%20Boxes`}

              className="group inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-amber-600/25 transition-all duration-300 hover:bg-amber-700 hover:gap-3 hover:shadow-2xl md:px-8 md:py-3.5"
            >
              {data.cta.text}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
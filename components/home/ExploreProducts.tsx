'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import type { ExploreProductsData } from '@/types/homepage';
import ExploreProductsBentoCard from './ExploreProductsBentoCard';
import ExploreProductsHeroCard from './ExploreProductsHeroCard';
import ExploreProductsCTACard from './ExploreProductsCTACard';

interface ExploreProductsProps {
  data: ExploreProductsData;
}

// DEFAULT EXPORT - This is crucial
export default function ExploreProducts({ data }: ExploreProductsProps) {
  // Safety check
  if (!data || !data.categories) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Loading product categories...</p>
        </div>
      </section>
    );
  }

  const heroCategory = data.categories.find((cat) => cat.isHero);
  const otherCategories = data.categories.filter((cat) => !cat.isHero);

  return (
    <section className="relative overflow-hidden bg-white py-5 md:py-10">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200/50">
            <Package className="h-4 w-4" />
            {data.badge}
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {data.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-sm sm:text-base leading-7 text-gray-600">
            {data.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {heroCategory && (
            <ExploreProductsHeroCard category={heroCategory} />
          )}

          {otherCategories.slice(0, 4).map((category, index) => (
            <ExploreProductsBentoCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}

          <ExploreProductsCTACard ctaCard={data.ctaCard} />
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-20 text-center">
          <h3 className="mb-4 text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 md:text-2xl sm:text-3xl lg:text-4xl">

            {data.bottomCTA.heading}
          </h3>

          <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-sm sm:text-base text-gray-600">
            {data.bottomCTA.description}
          </p>

          <Link
            href={data.bottomCTA.buttonHref}
            className="group inline-flex items-center gap-3 rounded-full bg-amber-600 px-8 py-4 text-sm sm:text-sm sm:text-base font-semibold text-white shadow-xl shadow-amber-600/25 transition-all duration-300 hover:bg-amber-700 hover:gap-4"
          >
            {data.bottomCTA.buttonText}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
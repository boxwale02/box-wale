'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Package } from 'lucide-react';
import type { ExploreCTACard } from '@/types/homepage';

interface ExploreProductsCTACardProps {
  ctaCard: ExploreCTACard;
}

const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const floatingGradientVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function ExploreProductsCTACard({
  ctaCard,
}: ExploreProductsCTACardProps) {
  return (
    <motion.article
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group relative col-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-amber-100/50 to-orange-50 p-8 shadow-lg shadow-amber-200/30 ring-1 ring-amber-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-300/40 md:p-10"
    >
      {/* Decorative Floating Gradients */}
      <motion.div
        variants={floatingGradientVariants}
        animate="animate"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-400/20 blur-3xl"
      />
      <motion.div
        variants={floatingGradientVariants}
        animate="animate"
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-300/30 to-yellow-400/20 blur-3xl"
      />

      Decorative Icons
      <div className="absolute right-8 top-8 opacity-10">
        <Package className="h-32 w-32 text-amber-900" />
      </div>

      {/* Content */}
      <div className="relative z-10">   
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-600/10 px-4 py-1.5 text-sm font-semibold text-amber-700">
            <Sparkles className="h-4 w-4" />
            Custom Solutions
          </span>
        </div>

        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">          {ctaCard.title}
        </h2>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-700">
          {ctaCard.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={ctaCard.primaryButton.href}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-amber-600/25 transition-all duration-300 hover:bg-amber-700 hover:gap-3 hover:shadow-xl hover:shadow-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-category={ctaCard.primaryButton.text}
          >
            {ctaCard.primaryButton.text}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            href={ctaCard.secondaryButton.href}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-300 bg-white/80 px-6 py-3 text-base font-semibold text-amber-700 backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:bg-white hover:gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-category={ctaCard.secondaryButton.text}
          >
            {ctaCard.secondaryButton.text}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ExploreCategory } from '@/types/homepage';
import { getCloudinaryUrl } from '@/lib/cloudinary';

interface ExploreProductsHeroCardProps {
  category: ExploreCategory;
}

const heroVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageScaleVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ExploreProductsHeroCard({
  category,
}: ExploreProductsHeroCardProps) {
  return (
    <motion.article
      variants={heroVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group relative col-span-2 row-span-2 flex min-h-[500px] flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-gray-200"
    >
      {/* Background Image */}
      <motion.div
        variants={imageScaleVariants}
        initial="rest"
        whileHover="hover"
        className="absolute inset-0"
      >
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority
        />
      </motion.div>

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/20">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Premium Category
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-3 font-serif text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
        >
          {category.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 max-w-xl text-lg leading-relaxed text-gray-200"
        >
          {category.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href={category.slug}
            className="group/btn inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-xl transition-all duration-300 hover:bg-amber-50 hover:gap-4 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-category={`Explore ${category.title} collection`}
          >
            Explore Collection
            <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-amber-600" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}



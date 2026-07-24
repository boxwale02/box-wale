'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import type { ExploreCategory } from '@/types/homepage';
import { getCloudinaryUrl } from '@/lib/cloudinary';

interface ExploreProductsBentoCardProps {
  category: ExploreCategory;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
    },
  }),
};

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const overlayVariants = {
  rest: { opacity: 0.5 },
  hover: {
    opacity: 0.65,
    transition: { duration: 0.4 },
  },
};

export default function ExploreProductsBentoCard({
  category,
  index,
}: ExploreProductsBentoCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-100/50 hover:ring-amber-200/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          variants={imageHoverVariants}
          initial="rest"
          whileHover="hover"
          className="h-full w-full"
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          variants={overlayVariants}
          initial="rest"
          whileHover="hover"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        />

        {/* Starting Price Badge */}
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            From {category.startingPrice}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
          {category.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {category.description}
        </p>

        {/* CTA */}
        <Link
          href={category.slug}
          className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-all duration-300 hover:bg-amber-100 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-category={`Explore ${category.title}`}
        >
          Explore Collection
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
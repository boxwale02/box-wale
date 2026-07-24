// components/ui/IndustryCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CustomLink from '@/components/ui/CustomLink';

interface IndustryCTAProps {
  onModalOpen?: () => void;
}

export default function IndustryCTA({ onModalOpen }: IndustryCTAProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 shadow-xl shadow-amber-200/50 md:p-12 lg:p-16"
        >
          {/* Decorative Blobs */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:gap-12 lg:gap-16 md:text-left">
            {/* Text */}
            <div className="flex-1 space-y-3 md:space-y-4">
              <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Need Packaging Tailored to <br className="hidden sm:block" />
                Your Industry?
              </h3>
              <p className="text-base text-amber-50/90 md:text-lg lg:text-xl max-w-2xl">
                Our team can design custom packaging solutions that match your brand, 
                product requirements, and customer expectations.
              </p>
            </div>

            {/* Button */}
            <CustomLink
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-amber-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-amber-50 md:px-10 md:py-5 lg:px-12 lg:py-6 lg:text-lg"
              openModal={true}
              onClick={onModalOpen}
            >
              Request Custom Packaging
              <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
            </CustomLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
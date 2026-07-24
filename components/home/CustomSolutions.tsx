'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Package, 
  Palette, 
  ArrowRight, 
  Shield, 
  Zap,
  Star,
  Truck,
  Clock,
  Award
} from 'lucide-react';

interface CustomSolutionsProps {
  badge?: string;
  heading?: string;
  description?: string;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  className?: string;
}

const defaultFeatures = [
  {
    icon: <Package className="h-6 w-6" />,
    title: "Bespoke Design",
    description: "Tailored packaging solutions that reflect your brand identity"
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Custom Finishes",
    description: "Premium materials, unique textures, and special printing effects"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control for every order"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Quick Turnaround",
    description: "Efficient production and delivery to meet your deadlines"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};
export default function CustomSolutions({
  badge = "Custom Solutions",
  heading = "Need Something Custom?",
  description = "Can't find the perfect packaging solution? We design completely custom packaging tailored to your brand, product, and business requirements.",
  features = defaultFeatures,
  ctaPrimary = {
    text: "Request Custom Packaging",
    href: "/custom-packaging"
  },
  ctaSecondary = {
    text: "Get Free Quote",
    href: "/quote"
  },
  className = "",
}: CustomSolutionsProps) {
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40" />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl animate-pulse" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl animate-pulse delay-1000" />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.amber.900)_1px,transparent_0)] bg-[size:32px_32px]" />
        </div>
        
        {/* Floating Decorative Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-[10%] top-[20%] hidden lg:block"
        >
          <Sparkles className="h-16 w-16 text-amber-400" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute right-[15%] bottom-[30%] hidden lg:block"
        >
          <Package className="h-20 w-20 text-amber-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute left-[5%] bottom-[20%] hidden lg:block"
        >
          <Palette className="h-14 w-14 text-amber-400" />
        </motion.div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200/50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                {badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              {heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-lg leading-relaxed text-gray-600"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href={ctaPrimary.href}
                className="group inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-600/25 transition-all duration-300 hover:bg-amber-700 hover:gap-3 hover:shadow-2xl hover:shadow-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {ctaPrimary.text}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                href={ctaSecondary.href}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-amber-200 bg-transparent px-6 py-3.5 text-base font-semibold text-amber-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {ctaSecondary.text}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">Premium Quality</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl bg-white/80 p-6 shadow-lg shadow-gray-200/50 backdrop-blur-sm ring-1 ring-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-100/50 hover:ring-amber-200/50 hover:bg-white"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/50 p-3 text-amber-600 transition-colors duration-300 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white">
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute -right-1 -top-1 h-16 w-16 rounded-full bg-gradient-to-br from-amber-200/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
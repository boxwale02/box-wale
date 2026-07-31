"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  ShoppingBag,
  CakeSlice,
  Sparkles,
  Gem,
  Gift,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

const targetCategories = [
  {
    id: "corporate-gifting",
    icon: Briefcase,
    title: "Corporate Gifting",
    description:
      "Premium gifting boxes for companies, employee rewards, client appreciation, and promotional campaigns.",
  },
  {
    id: "wedding-packaging",
    icon: Heart,
    title: "Wedding Packaging",
    description:
      "Elegant hamper boxes and customized packaging for weddings, invitations, favors, and celebrations.",
  },
  {
    id: "retail-packaging",
    icon: ShoppingBag,
    title: "Retail Packaging",
    description:
      "Custom packaging solutions designed to enhance retail presentation and strengthen brand identity.",
  },
  {
    id: "food-packaging",
    icon: CakeSlice,
    title: "Food Packaging",
    description:
      "Durable and attractive packaging for bakeries, sweets, snacks, and food brands.",
  },
  {
    id: "cosmetics",
    icon: Sparkles,
    title: "Cosmetics",
    description:
      "Luxury packaging designed for beauty, skincare, perfume, and cosmetic products.",
  },
  {
    id: "jewelry",
    icon: Gem,
    title: "Jewelry",
    description:
      "Premium rigid boxes and presentation packaging for jewelry brands and luxury accessories.",
  },
  {
    id: "festival-gifts",
    icon: Gift,
    title: "Festival Gifts",
    description:
      "Custom festive packaging for Diwali, Eid, Christmas, New Year, and corporate gifting campaigns.",
  },
  {
    id: "personal-gifting",
    icon: PartyPopper,
    title: "Personal Gifting",
    description:
      "Creative packaging solutions for birthdays, anniversaries, baby showers, and special occasions.",
  },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const WhoWeServe = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-10">
      {/* Subtle Amber Glow Effects */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/20 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
            Who We Serve
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:text-3xl lg:text-4xl md:text-5xl">
            Packaging Solutions for Every Industry & Occasion
          </h2>
          <p className="mt-4 text-sm sm:text-sm sm:text-base text-gray-600 md:text-xl">
            We help businesses, brands, and individuals create memorable
            packaging experiences with custom-designed boxes crafted for every
            purpose.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {targetCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-300/50"
              >
                {/* Top Row: Icon + Title */}
                <div className="flex items-center gap-4 mb-3">
                  {/* Icon - Left */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 inline-flex rounded-2xl bg-amber-50 p-3.5 text-amber-600"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </motion.div>

                  {/* Title - Right */}
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight pt-1">
                    {category.title}
                  </h3>
                </div>

                {/* Description - Bottom */}
                <p className="text-sm leading-7 text-gray-600">
                  {category.description}
                </p>

                {/* Hover Border Highlight */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-amber-300/50" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 md:mt-20"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
"use client";

import Image from "next/image";
import homepage from "@/data/homepage.json";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { iconMap, IconName } from "@/lib/iconMap";
import {
  sectionVariants,
  fadeUp,
  featuredCard,
  cardVariants,
} from "@/lib/motion";
import {
  FEATURE_CARD_HOVER,
  IMAGE_HOVER,
  ICON_HOVER,
  BUTTON_HOVER,
  BUTTON_TAP,
} from "@/lib/constants";
import type {
  WhyChooseUsData,
  WhyChooseFeature,
} from "@/types/homepage";

const data = homepage.whyChooseUs as WhyChooseUsData;

interface FeatureCardProps {
  feature: WhyChooseFeature;
}
function FeatureCard({ feature }: FeatureCardProps) {
  if (!feature) {
    console.error("Feature is undefined");
    return null;
  }

  const Icon = iconMap[feature.icon as IconName];

  return (
    <motion.article
      variants={cardVariants}
      whileHover={FEATURE_CARD_HOVER}
      tabIndex={0}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-500
        hover:border-amber-200
        hover:shadow-xl
        focus:outline-none
        focus:ring-2
        focus:ring-amber-400
      "
    >
      {/* Background pattern */}
      <div
        aria-hidden
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[radial-gradient(circle,#111_1px,transparent_1px)]
          [background-size:18px_18px]
        "
      />

      {/* First line: Icon + Heading side by side */}
      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          whileHover={ICON_HOVER}
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            transition-colors
            duration-300
            group-hover:border-amber-300
            group-hover:bg-amber-50
          "
        >
          <Icon
            className="h-6 w-6 text-amber-600 transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.8}
          />
        </motion.div>

        <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
          {feature.title}
        </h3>

        {/* Optional number badge - positioned to the right */}
        {/* <span className="ml-auto text-sm font-semibold tracking-[0.2em] text-neutral-300">
          {feature.number}
        </span> */}
      </div>

      {/* Description below */}
      <p className="relative z-10 mt-4 leading-7 text-neutral-600">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div 
        className="
          absolute 
          bottom-0 
          left-0 
          h-0.5 
          w-0 
          bg-gradient-to-r 
          from-amber-400 
          to-amber-600 
          transition-all 
          duration-500 
          group-hover:w-full
        " 
      />
    </motion.article>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      aria-category="Why Choose Box Wale"
      className="relative overflow-hidden bg-white pt-5 pb-0 lg:pt-2 lg:pb-0" // Removed bottom padding
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            bg-[radial-gradient(circle,#111_1px,transparent_1px)]
            [background-size:28px_28px]
          "
        />

        <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-amber-300 blur-[120px] opacity-10" />
        <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-amber-200 blur-[100px] opacity-10" />
        <div className="absolute top-40 left-16 h-20 w-20 rotate-12 rounded-[30px] border border-neutral-200 opacity-50" />
        <div className="absolute bottom-32 right-20 h-24 w-24 -rotate-12 rounded-[34px] border border-neutral-200 opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >
          <motion.header
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              {data.badge}
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
              {data.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-sm sm:text-base leading-8 text-neutral-600">
              {data.description}
            </p>
          </motion.header>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <motion.article
              variants={featuredCard}
              whileHover={FEATURE_CARD_HOVER}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-neutral-200
                bg-white
                shadow-[0_20px_70px_rgba(0,0,0,0.07)]
                lg:col-span-7
              "
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  right-8
                  top-8
                  z-10
                  h-20
                  w-20
                  rounded-full
                  bg-amber-300
                  blur-3xl
                  opacity-30
                "
              />

              <div className="absolute left-8 top-8 z-20">
                <span className="rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 backdrop-blur-sm">
                  {data.featured.badge}
                </span>
              </div>

              <div className="relative h-[430px] overflow-hidden">
                <motion.div
                  whileHover={IMAGE_HOVER}
                  transition={{ duration: 0.7 }}
                  className="h-full w-full"
                >
                  <Image
                    src={data.featured.image}
                    alt={data.featured.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10">
                <h3 className="max-w-xl text-2xl md:text-3xl lg:text-4xlfont-bold text-white">
                  {data.featured.title}
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-white/85">
                  {data.featured.description}
                </p>
              </div>
            </motion.article>

            <div className="grid gap-6 lg:col-span-5">
              {data.features.slice(0, 2).map((feature) => (
                <FeatureCard
                  key={feature.number}
                  feature={feature}
                />
              ))}
            </div>

            <div className="grid gap-6 lg:col-span-12 lg:grid-cols-12">
              {data.features.slice(2, 6).map((feature) => (
                <div
                  key={feature.number}
                  className="lg:col-span-3"
                >
                  <FeatureCard feature={feature} />
                </div>
              ))}

              {data.features.slice(6, 8).map((feature) => (
                <div
                  key={feature.number}
                  className="lg:col-span-3"
                >
                  <FeatureCard feature={feature} />
                </div>
              ))}

              <motion.article
                variants={cardVariants}
                whileHover={FEATURE_CARD_HOVER}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-amber-200
                  bg-amber-50
                  p-3
                  shadow-sm
                  lg:col-span-6
                "
              >
                <div
                  aria-hidden
                  className="
                    absolute
                    inset-0
                    opacity-[0.05]
                    bg-[radial-gradient(circle,#111_1px,transparent_1px)]
                    [background-size:18px_18px]
                  "
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    {/* <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                      BOX WALE
                    </span> */}

                    <h3 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900">
                      {data.cta.text}
                    </h3>

                    <p className="mt-4 max-w-lg leading-7 text-neutral-600">
                      Let's create premium packaging that reflects your brand,
                      protects your products, and leaves a lasting impression on
                      every customer.
                    </p>
                  </div>

                  {/* <motion.button
                    whileHover={BUTTON_HOVER}
                    whileTap={BUTTON_TAP}
                    className="
                      mt-10
                      inline-flex
                      w-fit
                      items-center
                      gap-3
                      rounded-full
                      bg-amber-500
                      px-7
                      py-4
                      font-medium
                      text-white
                      shadow-lg
                      transition-colors
                      duration-300
                      hover:bg-amber-600
                      focus:outline-none
                      focus:ring-2
                      focus:ring-amber-500
                      focus:ring-offset-2
                    "
                  >
                    {data.cta.button}

                    <motion.span
                      className="flex"
                      whileHover={{
                        x: 5,
                      }}
                    >
                      <ArrowRight
                        size={18}
                        strokeWidth={2}
                      />
                    </motion.span>
                  </motion.button> */}
                </div>
              </motion.article>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  PenTool,
  Layers,
  Palette,
  Factory,
  Truck,
  Users,
  Package,
  CheckCircle,
  MapPin,
  ArrowRight,
  ClipboardList,
  PhoneCall,
  ClipboardCheck,
} from "lucide-react";

const processSteps = [
  {
    id: "consultation",
    stepNumber: "01",
    icon: ClipboardList,
    title: "Fill The Form",
    description:
      "Fill out our simple form with your name, contact details, and packaging requirements to get started.",
  },
  {
    id: "design-prototyping",
    stepNumber: "02",
    icon: PhoneCall,
    title: "We Will Contact You In 12 Hour",
    description:
      "Our team will reach out to you within 12 hours to discuss your requirements, answer questions, and understand your vision.",
  },
  {
    id: "material-selection",
    stepNumber: "03",
    icon: ClipboardCheck,
    title: "Understand Your Requirements",
    description:
      "We'll thoroughly understand your needs, budget, and preferences to suggest the best packaging solutions for you.",
  },
  {
    id: "printing-branding",
    stepNumber: "04",
    icon: Truck,
    title: "Delivered To Your Doorstep",
    description:
      "Once finalized, your custom packaging is carefully manufactured and delivered safely to your doorstep.",
  },
];

const stats = [
  { icon: Users, category: "Happy Clients", value: "500+" },
  { icon: Package, category: "Packaging Projects", value: "1000+" },
  { icon: CheckCircle, category: "Quality Checked", value: "100%" },
  { icon: MapPin, category: "Pan India Delivery", value: "✓" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const ManufacturingProcess = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      {/* Subtle Amber Glow Effects */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/20 blur-3xl" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

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
            Step's To Order
          </span>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="relative hidden lg:block">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400/20" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-[calc(50%-60px)] ${
                      isEven ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 },
                      }}
                      className={`group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-300/50 ${
                        isEven ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      {/* Step Number */}
                      <div
                        className={`mb-3 text-sm font-bold tracking-wider text-amber-500 ${
                          isEven ? "text-right" : "text-left"
                        }`}
                      >
                        STEP {step.stepNumber}
                      </div>

                      {/* For Left Side Cards (Even) - Icon on Right, Title on Left */}
                      {isEven ? (
                        // Left side card - Icon right, Title left
                        <>
                          <div className="flex items-center gap-4 mb-3">
                            {/* Title - Left */}
                            <h3 className="flex-1 text-xl font-semibold text-gray-900 text-right">
                              {step.title}
                            </h3>
                            {/* Icon - Right */}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 inline-flex rounded-2xl bg-amber-50 p-3.5 text-amber-600"
                            >
                              <Icon className="h-7 w-7" strokeWidth={1.75} />
                            </motion.div>
                          </div>
                          {/* Description - Bottom */}
                          <p className="text-sm leading-relaxed text-gray-600 text-right">
                            {step.description}
                          </p>
                        </>
                      ) : (
                        // Right side card - Icon left, Title right
                        <>
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
                            <h3 className="flex-1 text-xl font-semibold text-gray-900 text-left">
                              {step.title}
                            </h3>
                          </div>
                          {/* Description - Bottom */}
                          <p className="text-sm leading-relaxed text-gray-600 text-left">
                            {step.description}
                          </p>
                        </>
                      )}

                      {/* Hover Border Highlight */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-amber-300/50" />
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-200/50">
                    <span className="text-sm font-bold text-white">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Empty spacer */}
                  <div className="w-[calc(50%-60px)]" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Timeline - Tablet & Mobile */}
        <div className="relative block lg:hidden">
          {/* Center Line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400/20" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative space-y-12 pl-16"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div key={step.id} variants={itemVariants}>
                  {/* Timeline Node */}
                  <div className="absolute left-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-200/50">
                    <span className="text-xs font-bold text-white">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Card - Mobile/Tablet: Icon left, Title right */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.3 },
                    }}
                    className="group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-300/50"
                  >
                    <div className="mb-3 text-xs font-bold tracking-wider text-amber-500">
                      STEP {step.stepNumber}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      {/* Icon - Left */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 inline-flex rounded-2xl bg-amber-50 p-3 text-amber-600"
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </motion.div>
                      {/* Title - Right */}
                      <h3 className="flex-1 text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description - Bottom */}
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>

                    {/* Hover Border Highlight */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-amber-300/50" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcess;
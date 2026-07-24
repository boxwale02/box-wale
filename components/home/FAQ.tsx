"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
  Clock,
  Users,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useModal } from '@/contexts/ModalContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you offer fully customized packaging boxes?",
    answer:
      "Yes. We specialize in custom packaging solutions, allowing you to choose box dimensions, materials, printing, branding, finishing, and design elements according to your requirements.",
  },
  {
    id: "faq-2",
    question: "What types of packaging boxes do you manufacture?",
    answer:
      "We manufacture hamper boxes, rigid boxes, corrugated boxes, gift boxes, cardboard packaging, retail packaging, festival packaging, and custom branding solutions.",
  },
  {
    id: "faq-3",
    question: "Is there a minimum order quantity (MOQ)?",
    answer:
      "Minimum order quantities depend on the product type, dimensions, and customization requirements. Contact us for a personalized quotation.",
  },
  {
    id: "faq-4",
    question: "Can I request a sample before placing a bulk order?",
    answer:
      "Yes. Sample and prototype options are available to help you evaluate the design, material quality, and finishing before full-scale production.",
  },
  {
    id: "faq-5",
    question: "How is pricing calculated?",
    answer:
      "Pricing is based on box dimensions, material selection, printing requirements, finishing options, and order quantity. Our website also provides an estimated price calculator.",
  },
  {
    id: "faq-6",
    question: "Do you deliver across India?",
    answer:
      "Yes. We offer reliable Pan India delivery and work with trusted logistics partners to ensure timely shipment of all orders.",
  },
  {
    id: "faq-7",
    question: "How long does production take?",
    answer:
      "Production timelines vary depending on order size and customization complexity. Most projects are completed within the agreed delivery schedule.",
  },
  {
    id: "faq-8",
    question: "Can you help with packaging design and branding?",
    answer:
      "Absolutely. Our team assists with packaging concepts, structural design, branding elements, printing specifications, and premium finishing recommendations.",
  },
];

const supportFeatures = [
  { icon: MessageCircle, category: "Free Consultation" },
  { icon: Sparkles, category: "Custom Packaging Guidance" },
  { icon: Clock, category: "Fast Quotation" },
  { icon: Users, category: "Expert Support" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { openModal } = useModal();

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden bg-white py-15 md:py-20">
      {/* Subtle Amber Glow Effects */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />
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
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Everything You Need to Know About Our Packaging Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Find answers to the most common questions about custom packaging,
            manufacturing, pricing, delivery, and order requirements.
          </p>
        </motion.div>

        {/* FAQ Accordion - 2 columns with wider boxes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px"}}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="col-span-1"
              >
                <div
                  className={`group relative rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                    openId === item.id
                      ? "border-amber-300/50 shadow-lg shadow-amber-200/30"
                      : ""
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors duration-200 hover:bg-amber-50/30 md:p-8"
                    aria-expanded={openId === item.id}
                  >
                    <span
                      className={`text-base font-semibold transition-colors duration-200 md:text-lg ${
                        openId === item.id
                          ? "text-amber-600"
                          : "text-gray-900 group-hover:text-amber-600"
                      }`}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        openId === item.id
                          ? "bg-amber-500 text-white rotate-45"
                          : "bg-amber-50 text-amber-600 group-hover:bg-amber-100 rotate-0"
                      }`}
                    >
                      <Plus className="h-5 w-5" strokeWidth={2} />
                    </div>
                  </button>

                  {/* Answer - Using max-height approach */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openId === item.id ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                      <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>

                  {/* Hover Border Highlight */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-amber-300/30 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Support CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-amber-50/50 p-8 shadow-xl shadow-amber-200/30 border border-amber-100/50 md:p-12">
            {/* Decorative Glow */}
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-100/20 blur-3xl" />

            <div className="relative">
              {/* Badge */}
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
                  Still Have Questions?
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Left Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Let&apos;s Discuss Your Packaging Requirements
                  </h3>
                  <p className="text-base text-gray-600 md:text-lg">
                    Our packaging experts are ready to help you choose the right
                    materials, dimensions, designs, and solutions for your
                    business or special occasion.
                  </p>

                  {/* Updated Buttons with Modal and Call functionality */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {/* Get Quote Button - Opens Modal */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openModal}
                      className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Get Quote</span>
                    </motion.button>

                    {/* Contact Button - Direct Call */}
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="tel:+918209293728"
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">Call Now</span>
                    </motion.a>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {supportFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="rounded-2xl bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:bg-white/90"
                      >
                        <div className="mb-2 flex justify-center">
                          <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {feature.category}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
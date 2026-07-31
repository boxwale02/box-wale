"use client";

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight, Users, Award, Package, CheckCircle2, X, ZoomIn } from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'
import company from "@/data/company.json";

export default function About() {
  const { openModal } = useModal()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Image Modal Component
  const ImageModal = () => {
    return (
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/gpto0thu/image/upload/v1785349365/mamu_iph3v7.webp"
                  alt="Mr. Unus Shalim - Legacy of Packaging Excellence"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">Mr. Unus Shalim</h3>
                  <p className="text-sm text-amber-200/90">Founder & Visionary • Legacy Since 1989</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5" />
                      35+ Years Experience
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5" />
                      1000+ Happy Clients
                    </span>
                  </div>
                </div>
              </div>

              {/* Legacy Quote */}
              <div className="p-4 bg-amber-50/50 border-t border-amber-100">
                <p className="text-sm text-gray-700 italic text-center">
                  "Honoring the past. Building the future."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <section
      id="about"
      className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Image Section with Legacy Theme */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Main Image Container - Clickable */}
              <div 
               
                className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-amber-100/50 cursor-pointer group"
              >
                <img
                  src="https://res.cloudinary.com/gpto0thu/image/upload/v1785429592/son_fscyev.webp"
                  alt="Father and Son - Legacy of Packaging Excellence"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                
                {/* Zoom Icon Overlay */}
                
                
                {/* Gradient Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Legacy Quote Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none">
                  <blockquote className="text-white">
                    <p className="text-lg md:text-xl font-semibold italic leading-tight">
                      "Honoring the past. Building the future."
                    </p>
                    <p className="mt-1 text-sm text-amber-200/90">
                      — The Legacy Continues
                    </p>
                  </blockquote>
                </div>

                {/* Click Hint */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Click to zoom
                </div>
              </div>

              {/* Legacy Badge - Top Left */}
              <div className="absolute -top-3 -left-3 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-amber-500/30 rotate-[-3deg] pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-wider">Legacy Since 1989</span>
              </div>

              {/* Father-Son Badge - Bottom Right */}
              <div className="absolute -bottom-3 -right-3 bg-white px-4 py-2.5 rounded-xl shadow-xl border border-amber-100 pointer-events-none">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Father & Son</p>
                    <p className="text-[10px] text-gray-500">Carrying the Legacy</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden lg:block pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl border border-amber-100 space-y-2">
                  <div className="text-center">
                    <p className="text-xl font-bold text-amber-500">35+</p>
                    <p className="text-[10px] text-gray-600">Years</p>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-amber-500">1000+</p>
                    <p className="text-[10px] text-gray-600">Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Legacy Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 border border-amber-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                {company.badge || "Legacy Continues"}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
              Carrying Forward the{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-600">Legacy</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-200/50 -z-0 rounded-full"></span>
              </span>
            </h2>

            {/* Description with Clickable Mr. Unus Shalim */}
            <div className="mt-3 flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                  Today, the next generation proudly continues the vision established by{' '}
                  <span 
                    onClick={() => setIsImageModalOpen(true)}
                    className="inline-flex items-center gap-1.5 font-semibold text-gray-900 bg-amber-50/80 px-2 py-0.5 rounded-full border border-amber-200/50 cursor-pointer hover:bg-amber-100/80 hover:border-amber-300 transition-all duration-200 group"
                  >
                    <span className="relative inline-block">
                      <img
                        src="https://res.cloudinary.com/gpto0thu/image/upload/v1785349365/mamu_iph3v7.webp" 
                        alt="Mr. Unus Shalim"
                        className="w-5 h-5 rounded-full object-cover border border-amber-300 group-hover:border-amber-400 transition-all"
                      />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
                    </span>
                    <span className="group-hover:text-amber-600 transition-colors">Mr. Unus Shalim</span>
                    <span className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </span>
                  , combining decades of experience with modern innovative ideas.
                </p>
              </div>
            </div>

            {/* Legacy Quote */}
            <div className="mt-4 p-4 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-xl">
              <p className="text-sm text-gray-700 italic">
                "From father to son, the commitment to quality packaging continues to grow stronger with each generation."
              </p>
            </div>

            {/* Legacy Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">35+</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide">Years of Excellence</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">1000+</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide">Happy Clients</p>
                </div>
              </div>
               <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">100K+</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide">Boxes Delivered</p>
                </div>
              </div>
               <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">100%</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide">Quality Assurance</p>
                </div>
              </div>
            </div>

            {/* Stats Grid - Original */}
            {/* <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {company.stats && company.stats.map((stat) => (
                <div
                  key={stat.category}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h4 className="text-xl sm:text-2xl font-bold text-amber-600">
                    {stat.number}
                  </h4>
                  <p className="mt-1 text-[10px] text-gray-600 uppercase tracking-wide">
                    {stat.category}
                  </p>
                </div>
              ))}
            </div> */}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-lg shadow-amber-500/25 transition-all duration-300 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Quote</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918209293728"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg shadow-green-500/25 transition-all duration-300 text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </motion.a>

             
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </section>
  );
}
// components/products/ProductCTA.tsx
'use client'

import { motion } from 'framer-motion'
import { Phone, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import QuoteDrawer from './QuoteDrawer'
import { Product } from '@/types/product'

interface ProductCTAProps {
  product?: Product
}

export function ProductCTA({ product }: ProductCTAProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleCallNow = () => {
    const phoneNumber = '+919876543210'
    if (window.innerWidth <= 768) {
      window.location.href = `tel:${phoneNumber}`
    } else {
      navigator.clipboard?.writeText(phoneNumber)
      alert(`Call us at ${phoneNumber}`)
    }
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-10 md:p-16"
      >
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl md:text-2xl sm:text-3xl lg:text-4xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            Ready to Customize Your Packaging?
          </h2>
          <p className="text-sm sm:text-sm sm:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a free quote and bring your packaging vision to life with our premium customization options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200/50 text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5" />
              Get Quote
            </button>
            <button
              onClick={handleCallNow}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-amber-600 hover:text-amber-600 transition-all text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
      </motion.section>

      {product && (
        <QuoteDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          product={product}
        />
      )}
    </>
  )
}
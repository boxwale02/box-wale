// components/products/ProductHero.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Shield, Truck, Award, Clock, Phone } from 'lucide-react'
import { Product } from '@/types/product'
import { useState } from 'react'
import QuoteDrawer from './QuoteDrawer'

interface ProductHeroProps {
  product: Product
}

export function ProductHero({ product }: ProductHeroProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [heroMainImage, setHeroMainImage] = useState(0)

  const trustBadges = [
    { icon: Award, category: 'Premium Quality' },
    { icon: Truck, category: 'Free Shipping' },
    { icon: Shield, category: 'Secure Payment' },
    { icon: Clock, category: 'Express Delivery' },
  ]

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-20 lg:mb-24 pt-4 md:pt-8"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 md:mb-10 flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href="/products" className="hover:text-amber-600 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-amber-600 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            {/* {product.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700 ring-1 ring-amber-200/50">
                {product.badge}
              </span>
            )} */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-amber-600">₹{product.startingPrice}</span>
              <span className="text-gray-500">Starting Price</span>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-2.5 text-sm text-gray-600"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="font-medium">{badge.category}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50 flex items-center gap-2 text-base"
              >
                Customize Your Box
              </button>
              <button
                onClick={handleCallNow}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-amber-600 hover:text-amber-600 transition-all flex items-center gap-2 text-base"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </button>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl shadow-amber-100/30">
              {product.images?.[heroMainImage] ? (
                <Image
                  src={product.images[heroMainImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setHeroMainImage(index)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden ring-2 transition-all cursor-pointer ${
                      heroMainImage === index
                        ? 'ring-amber-500 shadow-lg shadow-amber-200/50'
                        : 'ring-gray-200 hover:ring-amber-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <QuoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={product}
      />
    </>
  )
}
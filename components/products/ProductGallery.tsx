// components/products/ProductGallery.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn, X } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  const mainImage = images[selectedImage] || '/images/placeholder.jpg'

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setHoverPosition({ x, y })
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr,4fr] gap-4">
        {/* Thumbnail Gallery */}
        <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-20 h-20 md:w-full md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-amber-500 shadow-md shadow-amber-200/50'
                  : 'border-transparent hover:border-amber-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-amber-500/10"></div>
              )}
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="order-1 md:order-2 relative">
          <div
            className="relative aspect-square rounded-3xl overflow-hidden bg-amber-50 shadow-xl cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={mainImage}
              alt={productName}
              fill
              className={`object-cover transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={{
                transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
              }}
            />
            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-4xl aspect-square">
              <Image
                src={mainImage}
                alt={productName}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
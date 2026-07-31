// components/products/ProductHighlights.tsx
'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import * as LucideIcons from 'lucide-react'

interface ProductHighlightsProps {
  product: Product
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName]
    return Icon || LucideIcons.Package
  }

  // Specifications summary items
  const specItems = [
    { category: 'Material', value: product.specifications?.material },
    { category: 'Dimensions', value: product.specifications?.dimensions },
    { category: 'Printing', value: product.specifications?.printing },
    { category: 'MOQ', value: product.specifications?.moq },
    { category: 'Delivery Time', value: product.specifications?.deliveryTime },
  ].filter(item => item.value)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16 md:mb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Overview Text */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl md:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">
            Product Highlights
          </h2>
          <p className="text-sm sm:text-sm sm:text-base text-gray-600 leading-7 mb-6">
            {product.description}
          </p>
          <p className="text-gray-600 leading-7">
            Crafted with precision using premium materials, our {product.name} is designed to 
            elevate your brand presence and create a lasting impression on your customers.
          </p>

          {/* Specifications Summary */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {specItems.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {item.category}
                </p>
                <p className="font-semibold text-gray-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Feature Cards */}
        <div className="space-y-4">
          {product.features?.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
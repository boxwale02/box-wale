// components/products/ProductOverview.tsx
'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { Package, Ruler, Palette, Gauge } from 'lucide-react'

interface ProductOverviewProps {
  product: Product
}

export function ProductOverview({ product }: ProductOverviewProps) {
  const infoItems = [
    { icon: Package, category: 'Product Type', value: product.name },
    { icon: Ruler, category: 'Base Size', value: `${product.baseWidth} × ${product.baseHeight} × ${product.baseLength} cm` },
    { icon: Palette, category: 'Customization', value: 'Available' },
    { icon: Gauge, category: 'Starting Price', value: `₹${product.startingPrice}` },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-600 leading-7 mb-6">{product.description}</p>
          <p className="text-gray-600 leading-7">
            Our {product.name} is designed with precision and crafted using premium materials.
            Perfect for businesses looking to make a lasting impression with their packaging.
          </p>
        </div>
        <div className="bg-amber-50 rounded-3xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="space-y-4">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <item.icon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
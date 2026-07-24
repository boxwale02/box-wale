// components/products/ProductSpecifications.tsx
'use client'

import { motion } from 'framer-motion'
import { Specifications } from '@/types/product'
import { Ruler, Palette, Printer, Sparkles, Package, Clock } from 'lucide-react'

interface ProductSpecificationsProps {
  specifications: Specifications
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null
  }

  const specs = [
    { icon: Package, category: 'Material', value: specifications.material },
    { icon: Ruler, category: 'Dimensions', value: specifications.dimensions },
    { icon: Printer, category: 'Printing', value: specifications.printing },
    { icon: Sparkles, category: 'Finishing', value: specifications.finishing },
    { icon: Palette, category: 'MOQ', value: specifications.moq },
    { icon: Clock, category: 'Delivery Time', value: specifications.deliveryTime },
  ]

  return (
    <motion.section
      id="specifications"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Specifications</h2>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 flex items-start gap-4"
            >
              <spec.icon className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-500 mb-1">{spec.category}</p>
                <p className="font-medium text-gray-900">{spec.value || 'N/A'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
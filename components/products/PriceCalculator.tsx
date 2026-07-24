// components/products/PriceCalculator.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { Calculator, DollarSign, Package } from 'lucide-react'

interface PriceCalculatorProps {
  product: Product
}

export default function PriceCalculator({ product }: PriceCalculatorProps) {
  const [width, setWidth] = useState(product.baseWidth)
  const [height, setHeight] = useState(product.baseHeight)
  const [length, setLength] = useState(product.baseLength)
  const [quantity, setQuantity] = useState(1)

  const result = useMemo(() => {
    const baseVolume = product.baseWidth * product.baseHeight * product.baseLength
    const currentVolume = width * height * length
    const multiplier = baseVolume > 0 ? currentVolume / baseVolume : 1
    const estimatedPrice = product.startingPrice * multiplier
    const totalCost = estimatedPrice * quantity

    return {
      estimatedPrice: Math.round(estimatedPrice * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
    }
  }, [width, height, length, quantity, product])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-amber-500" />
          <h2 className="text-3xl font-serif font-bold text-gray-900">Price Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (cm)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (cm)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-amber-50 rounded-2xl p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Price per Unit</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                  <span className="text-3xl font-bold text-amber-600">
                    ₹{result.estimatedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="h-px bg-amber-200"></div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Estimated Cost</p>
                <div className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-amber-600" />
                  <span className="text-3xl font-bold text-amber-600">
                    ₹{result.totalCost.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">for {quantity} unit{quantity > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
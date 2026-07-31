// components/products/ProductFeatures.tsx
'use client'

import { motion } from 'framer-motion'
import { Feature } from '@/types/product'
import * as LucideIcons from 'lucide-react'

interface ProductFeaturesProps {
  features: Feature[]
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName]
    return Icon || LucideIcons.Package
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-8">Key Features</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = getIcon(feature.icon)
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                <Icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm sm:text-sm sm:text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
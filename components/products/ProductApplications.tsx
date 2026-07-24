// components/products/ProductApplications.tsx
'use client'

import { motion } from 'framer-motion'
import { Gift, Users, ShoppingBag, Sparkles, Diamond, PartyPopper } from 'lucide-react'

interface ProductApplicationsProps {
  applications: string[]
}

export function ProductApplications({ applications }: ProductApplicationsProps) {
  const iconMap: Record<string, any> = {
    'Corporate Gifting': Gift,
    'Weddings': Users,
    'Retail': ShoppingBag,
    'Cosmetics': Sparkles,
    'Jewelry': Diamond,
    'Festival Hampers': PartyPopper,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Applications</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-4"
      >
        {applications.map((app, index) => {
          const Icon = iconMap[app] || Gift
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors cursor-default"
            >
              <Icon className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
              <span className="text-gray-700 font-medium">{app}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
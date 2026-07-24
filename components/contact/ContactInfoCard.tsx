
// components/contact/ContactInfoCard.tsx
'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ContactInfoCardProps {
  icon: LucideIcon
  title: string
  value: string
  description: string
  delay?: number
}

export default function ContactInfoCard({
  icon: Icon,
  title,
  value,
  description,
  delay = 0,
}: ContactInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-0.5">
          {title}
        </p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </motion.div>
  )
}


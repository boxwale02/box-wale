// components/products/QuoteDrawer.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/product'
import {
  X,
  User,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Package,
  Calculator,
  Send,
  Loader2
} from 'lucide-react'

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export default function QuoteDrawer({ isOpen, onClose, product }: QuoteDrawerProps) {
  const [width, setWidth] = useState(product.baseWidth || 10)
  const [height, setHeight] = useState(product.baseHeight || 10)
  const [length, setLength] = useState(product.baseLength || 10)
  const [quantity, setQuantity] = useState(100)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    message: '',
  })

  // Calculate price
  const result = useMemo(() => {
    const baseVolume = (product.baseWidth || 10) * (product.baseHeight || 10) * (product.baseLength || 10)
    const currentVolume = width * height * length
    const multiplier = baseVolume > 0 ? currentVolume / baseVolume : 1
    const estimatedPrice = product.startingPrice * multiplier
    const totalCost = estimatedPrice * quantity

    return {
      estimatedPrice: Math.round(estimatedPrice * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
    }
  }, [width, height, length, quantity, product])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Reset status when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Prepare data with correct field names
    const quoteData = {
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phoneNumber: formData.phone,
      whatsappNumber: formData.whatsapp || formData.phone,
      productName: product.name,
      productType: product.category || product.name,
      width: width,
      height: height,
      length: length,
      quantity: quantity,
      estimatedPrice: result.estimatedPrice,
      totalCost: result.totalCost,
      message: formData.message,
    }

    console.log('📤 Submitting quote request:', quoteData)

    try {
      // Call your Next.js API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to submit quote')
      }

      console.log('✅ Quote submitted successfully:', data)

      setSubmitStatus("success")

      // Reset form
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        whatsapp: '',
        message: '',
      })
      setWidth(product.baseWidth || 10)
      setHeight(product.baseHeight || 10)
      setLength(product.baseLength || 10)
      setQuantity(100)

      // Close drawer after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)

    } catch (error: any) {
      console.error('❌ Error submitting quote:', error)
      setSubmitStatus("error")
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name === "phone") {
    // Sirf digits allow
    if (!/^\d*$/.test(value)) return;

    // Max 10 digits
    if (value.length > 10) return;

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Customize Your Box</h2>
                <p className="text-sm text-gray-500">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
                aria-category="Close drawer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Product Info */}
              <div className="bg-amber-50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-700">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Selected Product</span>
                </div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              {/* Price Calculator */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-gray-900">Price Calculator</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      min="1"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      min="1"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      min="1"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      min="1"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                    />
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-4 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Total</p>
                    <p className="text-xs text-gray-400">for {quantity} units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">
                      ₹{result.totalCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      ₹{result.estimatedPrice.toFixed(2)} per unit
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Form */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Send className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-gray-900">Request Quote</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <User className="w-4 h-4 inline mr-1.5" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Building className="w-4 h-4 inline mr-1.5" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                      placeholder="Company Pvt Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-1.5" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Phone className="w-4 h-4 inline mr-1.5" />
                      Phone Number *
                    </label>

                   <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  maxLength={10}
  placeholder="9876543210"
/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Phone className="w-4 h-4 inline mr-1.5" />
                      Phone number                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                      placeholder="+91 98sssssssssss765 43210"
                    />
                  </div> 

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <MessageSquare className="w-4 h-4 inline mr-1.5" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed
"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700"
                >
                  ✅ Thank you! Your quote request has been submitted successfully. We'll get back to you shortly.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                >
                  ❌ {errorMessage || "Something went wrong. Please try again."}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200/50 flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Quote Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
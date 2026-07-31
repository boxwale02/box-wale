'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Send, Loader2, CheckCircle, X } from 'lucide-react'

interface ProductCTAClientProps {
  product: any
}

export default function ProductCTAClient({ product }: ProductCTAClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          whatsappNumber: formData.phone,
          phone: formData.phone,
          productType: product.name,
          productName: product.name,
          message: formData.message || `Interested in ${product.name}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
      }, 3000)

    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"

  return (
    <section className="py-16 md:py-14 md:py-16 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 md:text-2xl sm:text-3xl lg:text-4xl">
            Ready to Order {product.name}?
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-sm sm:text-base text-gray-600">
            Get a free quote for custom packaging solutions. We deliver premium quality
            with fast turnaround times.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-600 px-8 py-4 text-sm sm:text-sm sm:text-base font-semibold text-white shadow-lg shadow-amber-200/50 transition-all hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-300/50"
          >
            Request Free Quote
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900">Thank You!</h3>
                  <p className="mt-2 text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    Get Your Quote for {product.name}
                  </h3>
                  
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      ❌ {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="john@company.com"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell us about your specific requirements..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-amber-600 py-3.5 font-semibold text-white transition-all hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Get My Quote
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
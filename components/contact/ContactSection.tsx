// components/contact/ContactSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { PhoneInput } from "react-international-phone";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Building,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import ContactInfoCard from './ContactInfoCard'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    productType: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    productType: "",
    message: "",
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors bg-white text-gray-900 placeholder:text-gray-400";

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // WhatsApp Number
    if (name === "whatsappNumber") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        whatsappNumber: numbersOnly,
      }));

      setErrors((prev) => ({
        ...prev,
        whatsappNumber: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      whatsappNumber: "",
      productType: "",
      message: "",
    };

    let isValid = true;

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }

    // WhatsApp

    // WhatsApp Validation
   const phone = formData.whatsappNumber.replace(/\D/g, "").slice(-10);

if (!/^[6-9]\d{9}$/.test(phone)) {
  newErrors.whatsappNumber =
    "Please enter a valid 10-digit WhatsApp number.";
  isValid = false;
}

    // Product
    if (!formData.productType) {
      newErrors.productType = "Please select a product.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setIsSubmitted(false);

    try {
      console.log("📤 Sending data:", formData);

      // Step 1: Send Email via NodeMailer
      console.log("📧 Sending email...");
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          name: formData.name,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          productType: formData.productType,
          message: formData.message,
        }),
      });

      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailData.error || emailData.details || "Failed to send email");
      }
      console.log("✅ Email sent successfully!");

      // Step 2: Save to Google Sheet
      console.log("📤 Saving to Google Sheet...");
      
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzMtn5kmX7j6jb2p7y9D7dHTjjmK__BAViWbXNqcnUTkzK5G6WiQu7ICLfsrllioh1ZQA/exec";
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          productType: formData.productType,
          message: formData.message,
        }),
      });

      console.log("✅ Data sent to Google Sheet");

      // Success
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        whatsappNumber: "",
        productType: "",
        message: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error: any) {
      console.error("❌ Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    phone: {
      icon: Phone,
      title: 'Phone',
      value: '+91 98765 43210',
      description: 'Mon-Fri 9:00 AM - 6:00 PM',
    },
    email: {
      icon: Mail,
      title: 'Email',
      value: 'info@boxwale.com',
      description: 'We\'ll respond within 24 hours',
    },
    address: {
      icon: MapPin,
      title: 'Address',
      value: '123 Packaging Lane, Mumbai, Maharashtra 400001',
      description: 'Visit us at our headquarters',
    },
    hours: {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon-Fri: 9:00 AM - 6:00 PM',
      description: 'Saturday: 10:00 AM - 4:00 PM',
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left Side - Contact Information */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions about our premium packaging solutions? Reach out to us and
              we&apos;ll be happy to assist you.
            </p>
          </motion.div>

          <div className="space-y-4">
            <ContactInfoCard
              icon={contactInfo.phone.icon}
              title={contactInfo.phone.title}
              value={contactInfo.phone.value}
              description={contactInfo.phone.description}
              delay={0.1}
            />
            <ContactInfoCard
              icon={contactInfo.email.icon}
              title={contactInfo.email.title}
              value={contactInfo.email.value}
              description={contactInfo.email.description}
              delay={0.2}
            />
            <ContactInfoCard
              icon={contactInfo.address.icon}
              title={contactInfo.address.title}
              value={contactInfo.address.value}
              description={contactInfo.address.description}
              delay={0.3}
            />
            <ContactInfoCard
              icon={contactInfo.hours.icon}
              title={contactInfo.hours.title}
              value={contactInfo.hours.value}
              description={contactInfo.hours.description}
              delay={0.4}
            />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">Thank You!</h3>
                <p className="mt-2 text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                  >
                    ❌ {errorMessage}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4 inline mr-1.5" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 inline mr-1.5" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
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
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
            <Phone className="w-4 h-4 inline mr-1.5" />
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            defaultCountry="in"
            value={formData.whatsappNumber}
            onChange={(phone) => {
              setFormData((prev) => ({
                ...prev,
                whatsappNumber: phone,
              }));

              setErrors((prev) => ({
                ...prev,
                whatsappNumber: "",
              }));
            }}
            disabled={isSubmitting}
          />
          {errors.whatsappNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.whatsappNumber}
            </p>
          )}
        </div>

                <div>
                  <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Building className="w-4 h-4 inline mr-1.5" />
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} appearance-none`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a product type</option>
                    <option value="Nikah Nama Box">Nikah Nama Box</option>
                    <option value="Hamper Box">Hamper Box</option>
                    <option value="Attar Box">Attar Box</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <MessageSquare className="w-4 h-4 inline mr-1.5" />
                    Message <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your packaging requirements..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:from-amber-700 hover:to-amber-600 hover:shadow-lg hover:shadow-amber-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Request
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
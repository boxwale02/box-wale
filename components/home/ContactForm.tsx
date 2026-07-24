"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { PhoneInput } from "react-international-phone";
import { Product } from '@/types/product'
import {
  MessageCircle,
  Package,
  Clock3,
  Truck,
  Users,
  ClipboardCheck,
  MapPin,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  Building2,
  ListChecks,
} from "lucide-react";

const trustFeatures = [
  {
    icon: MessageCircle,
    category: "Free Consultation",
    description: "Expert advice on your packaging needs",
  },
  {
    icon: Package,
    category: "Custom Packaging Solutions",
    description: "Tailored to your brand requirements",
  },
  {
    icon: Clock3,
    category: "Fast Quotation Process",
    description: "Quick turnaround on pricing",
  },
  {
    icon: Truck,
    category: "Pan India Delivery",
    description: "Reliable shipping across India",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
import { Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const ContactForm = () => {
  // ✅ SIRF YEH FIELDS - ContactFormSimple jaisa
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
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20";

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };


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
 const phone = formData.whatsappNumber.replace(/\D/g, "");

if (!/^\d{8,15}$/.test(phone)) {
  newErrors.whatsappNumber =
    "Please enter a valid WhatsApp number.";
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
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

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
          name: formData.name,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          productType: formData.productType,
          message: formData.message,

        }),
      });

      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailData.error || "Failed to send email");
      }
      console.log("✅ Email sent successfully!");

      // Step 2: Save to Google Sheet via Apps Script
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

    } catch (error: any) {
      console.error("❌ Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="relative overflow-hidden bg-white py-14 md:py-10">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">Thank You!</h3>
            <p className="mt-2 text-gray-600">We'll get back to you within 24 hours.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-6 py-2.5 font-semibold text-amber-700 transition-colors hover:bg-amber-200"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-14 md:py-10">
      {/* Subtle Amber Glow Effects */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/20 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Request Your Free Packaging Quote
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Tell us about your packaging requirements and our team will provide
            a customized quotation tailored to your needs.
          </p>
        </motion.div>

        {/* Contact Form Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Trust Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
                Why Choose Box Wale
              </span>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                Premium Packaging Solutions Built Around Your Needs
              </h3>
              <p className="mt-4 text-base text-gray-600">
                We combine quality craftsmanship, innovative design, and
                personalized service to deliver packaging solutions that exceed
                expectations and strengthen your brand identity.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {trustFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.category}
                    variants={itemVariants}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-300/50"
                  >
                    <div className="mb-2 inline-flex rounded-xl bg-amber-50 p-2.5 text-amber-600 transition-colors duration-300 group-hover:bg-amber-100">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {feature.category}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg shadow-amber-200/20 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    ❌ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      <User className="w-4 h-4 inline mr-1.5" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-1.5" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="john@company.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>



                <div>
                  <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Package className="w-4 h-4 inline mr-1.5" />
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

                {/* WhatsApp Number */}
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

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <MessageCircle className="w-4 h-4 inline mr-1.5" />
                    Message <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your packaging requirements..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 py-4 font-semibold text-white shadow-lg shadow-amber-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-300/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free Quote
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500">
                  By submitting this form, you agree to our privacy policy.
                  Your information is safe with us.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
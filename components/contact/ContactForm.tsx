"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { PhoneInput } from "react-international-phone";
import {
  User,
  Mail,
  Phone,
  Package,
  MessageSquare,
  Send,
} from "lucide-react";

const ContactForm = () => {
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // ✅ UPDATED SUBMIT LOGIC

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
    setSubmitStatus("idle");
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

      // Step 2: Save to Google Sheet via Next.js API
      console.log("📤 Saving to Google Sheet...");
      const sheetResponse = await fetch("/api/google-sheet", {
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

      const sheetData = await sheetResponse.json();

      if (!sheetResponse.ok) {
        console.warn("⚠️ Google Sheet save failed:", sheetData.error);
        // Google Sheet fail ho toh bhi chalega, email toh send ho gayi
      } else {
        console.log("✅ Data saved to Google Sheet!");
      }

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        whatsappNumber: "",
        productType: "",
        message: "",
      });

    } catch (error: any) {
      console.error("❌ Error:", error);
      setSubmitStatus("error");

      // User-friendly error message
      if (error.message.includes("401")) {
        setErrorMessage("Access denied. Please check your configuration.");
      } else if (error.message.includes("404")) {
        setErrorMessage("Service not found. Please try again later.");
      } else if (error.message.includes("fetch")) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700"
          >
            ✅ Thank you! Your message has been sent successfully. We'll get back to you shortly.
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
// components/home/ContactFormSimple.tsx
'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, User, Package, Mail, Phone, MessageSquare } from 'lucide-react';

import { PhoneInput } from "react-international-phone";

export default function ContactFormSimple() {
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
    productType: "",
    whatsappNumber: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let newValue = value;

    // Name: only letters & spaces
    if (name === "name") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    // Phone: allow only digits (temporary, PhoneInput lagne tak)
    if (name === "whatsappNumber") {
      newValue = value.replace(/\D/g, "").slice(0, 15);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      productType: "",
      whatsappNumber: "",
      message: "",
    };

    let isValid = true;

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Product
    if (!formData.productType) {
      newErrors.productType = "Please select a product.";
      isValid = false;
    }

    // Phone
    if (!formData.whatsappNumber) {
      newErrors.whatsappNumber = "WhatsApp Number is required.";
      isValid = false;
    } else if (
      formData.whatsappNumber.length < 10 ||
      formData.whatsappNumber.length > 15
    ) {
      newErrors.whatsappNumber =
        "Phone number must be between 10 and 15 digits.";
      isValid = false;
    }

    // Message
    if (formData.message.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) return;

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
          productType: formData.productType, // Default value since we removed dropdown
          message: formData.message,
        }),
      });

      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailData.error || "Failed to send email");
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

    } catch (error: any) {
      console.error("❌ Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-gray-900">Thank You!</h3>
        <p className="mt-2 text-gray-600">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
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
          WhatsApp Number <span className="text-red-500">*</span>
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
          <MessageSquare className="w-4 h-4 inline mr-1.5" />
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
  );
}
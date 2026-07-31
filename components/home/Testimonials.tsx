"use client";

import { motion } from "framer-motion";
import {
    Star,
    Quote,
} from "lucide-react";

const testimonials = [
    {
        id: "testimonial-1",
        name: "Rajesh Sharma",
        company: "Corporate Gifting Solutions",
        rating: 5,
        review:
            "The quality of the hamper boxes exceeded our expectations. The team delivered exactly what we envisioned, and our clients loved the presentation.",
    },
    {
        id: "testimonial-2",
        name: "Priya Mehta",
        company: "Wedding Planner",
        rating: 5,
        review:
            "Beautiful custom packaging and timely delivery. The wedding hampers looked premium and added a special touch to our event.",
    },
    {
        id: "testimonial-3",
        name: "Amit Jain",
        company: "Jewelry Brand Owner",
        rating: 5,
        review:
            "The rigid boxes were elegant, durable, and perfectly aligned with our luxury branding. Highly recommended.",
    },
    {
        id: "testimonial-4",
        name: "Neha Verma",
        company: "Cosmetics Business",
        rating: 5,
        review:
            "Excellent attention to detail and premium finishing. The packaging significantly improved our product presentation.",
    },
    {
        id: "testimonial-5",
        name: "Sanjay Gupta",
        company: "Retail Packaging Client",
        rating: 5,
        review:
            "Professional service, quality materials, and fast turnaround times. We have now become repeat customers.",
    },
    {
        id: "testimonial-6",
        name: "Anjali Kapoor",
        company: "Festival Hamper Buyer",
        rating: 5,
        review:
            "Outstanding customer support and beautiful packaging designs. The festive hampers received amazing feedback.",
    },
];

const CustomerTestimonials = () => {
    // Double the testimonials for seamless looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
            {/* Subtle Amber Glow Effects */}
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/20 blur-3xl" />

            {/* 🟢 CHANGE 1: Mobile par side padding (px-4) ko kam kar diya */}
            <div className="container relative mx-auto px-2 sm:px-6 lg:px-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-10 max-w-3xl text-center"
                >
                    <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
                        Customer Testimonials
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                        Trusted by Businesses & Brands
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-600">
                        From corporate gifting to luxury packaging solutions
                    </p>
                </motion.div>

                {/* First Row - Moving Left */}
                <div className="overflow-hidden">
                    <motion.div
                        // 🟢 CHANGE 2: gap-4 se kam kar ke gap-3 kar diya
                        className="flex gap-3" 
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {doubledTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                // 🟢 CHANGE 3: width aur padding ko bahut chhota kar diya
                                className="w-[220px] sm:min-w-[260px] flex-shrink-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-300/50"
                            >
                                {/* Quote Icon - Chhota kiya */}
                                <div className="mb-2 text-amber-400/60">
                                    <Quote className="h-4 w-4" strokeWidth={1.5} />
                                </div>

                                {/* Rating - Chhota kiya */}
                                <div className="mb-2 flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-3 w-3 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* Review - Font aur line height chhota kiya */}
                                <p className="mb-3 text-[11px] sm:text-sm leading-5 sm:leading-7 text-gray-700 line-clamp-3">
                                    &ldquo;{testimonial.review}&rdquo;
                                </p>

                                {/* Customer Info - Padding aur font chhota kiya */}
                                <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                                    <img 
                                        src="https://res.cloudinary.com/gpto0thu/image/upload/v1783975398/jn_h1ffa8.png" 
                                        alt={testimonial.name}
                                        className="h-8 w-8 shrink-0 rounded-full object-cover shadow-sm"
                                    />
                                    <div>
                                        {/* Name ka font size chhota kiya */}
                                        <h4 className="text-[11px] sm:text-sm font-semibold text-gray-900">
                                            {testimonial.name}
                                        </h4>
                                        {/* Company ka font size chhota kiya */}
                                        <p className="text-[10px] sm:text-xs text-gray-500">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Second Row - Moving Right */}
                <div className="mt-4 overflow-hidden">
                    <motion.div
                        // 🟢 CHANGE 2: gap-4 se kam kar ke gap-3 kar diya
                        className="flex gap-3"
                        animate={{
                            x: ["-50%", "0%"],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {doubledTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                // 🟢 CHANGE 3: width aur padding ko bahut chhota kar diya
                                className="w-[220px] sm:min-w-[260px] flex-shrink-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-300/50"
                            >
                                {/* Quote Icon */}
                                <div className="mb-2 text-amber-400/60">
                                    <Quote className="h-4 w-4" strokeWidth={1.5} />
                                </div>

                                {/* Rating */}
                                <div className="mb-2 flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-3 w-3 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="mb-3 text-[11px] sm:text-sm leading-5 sm:leading-7 text-gray-700 line-clamp-3">
                                    &ldquo;{testimonial.review}&rdquo;
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                                    <img 
                                        src="https://res.cloudinary.com/gpto0thu/image/upload/v1783975398/jn_h1ffa8.png" 
                                        alt={testimonial.name}
                                        className="h-8 w-8 shrink-0 rounded-full object-cover shadow-sm"
                                    />
                                    <div>
                                        <h4 className="text-[11px] sm:text-sm font-semibold text-gray-900">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-gray-500">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;
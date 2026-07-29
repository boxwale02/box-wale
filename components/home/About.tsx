// "use client";

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { MessageCircle, Phone, X, Mail, Send, ArrowRight } from 'lucide-react'
// import { useModal } from '@/contexts/ModalContext'
// import Image from "next/image";

// // import { motion } from "framer-motion";
// import {
//   Target,
//   Award,
//   PackageCheck,
//   CheckCircle2,
// } from "lucide-react";

// import company from "@/data/company.json";

// export default function About() {
//   return (
//     <section
//       id="about"
//       className="bg-white py-15 lg:py-22"
//       aria-categoryledby="about-heading"
//     >
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="grid items-center gap-16 lg:grid-cols-2">
//           {/* Image */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[600px] w-full">
//               <img
//                 src="https://res.cloudinary.com/gpto0thu/image/upload/v1783022916/Cozy_Winter_Decor_Ideas_to_Transform_Your_Space_f5viqh.jpg"
//                 alt="Box Wale Packaging Manufacturing"
//                 width={700}
//                 height={700}
//                 className="h-full w-full object-cover"
//               />
//               {/* Optional: Overlay for better visibility */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>

//             {/* Floating Card */}
//             <div className="absolute -bottom-8 left-8 rounded-2xl bg-white p-6 shadow-xl">
//               <h4 className="text-3xl font-bold text-amber-600">10+</h4>
//               <p className="text-sm text-gray-600">
//                 Years of Packaging Excellence
//               </p>
//             </div>
//           </motion.div>

//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//           >
//             {/* Badge */}
//             <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
//               {company.badge}
//             </span>

//             {/* Heading */}
//             <h2
//               id="about-heading"
//               className="mt-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5x2"
//             >
//               {company.heading}
//             </h2>

//             {/* Intro */}
//             {/* <p className="mt-6 text-lg leading-8 text-gray-600">
//               {company.introduction}
//             </p> */}

//             {/* Highlights */}
//             <div className="mt-10 space-y-8">
//               {/* <div className="flex gap-4">
//                 <Target className="mt-1 h-7 w-7 text-amber-600" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">
//                     Our Mission
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     {company.mission}
//                   </p>
//                 </div>
//               </div> */}
// {/* 
//               <div className="flex gap-4">
//                 <Award className="mt-1 h-7 w-7 text-amber-600" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">
//                     Industry Experience
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     {company.experience}
//                   </p>
//                 </div>
//               </div> */}

//               <div className="flex gap-4">
//                 <PackageCheck className="mt-1 h-7 w-7 text-amber-600" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">
//                    Types
//                   </h3>

//                   <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                     {company.expertise.map((item) => (
//                       <li
//                         key={item}
//                         className="flex items-center gap-2 text-gray-700"
//                       >
//                         <CheckCircle2 className="h-5 w-5 text-green-600" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
//               {company.stats.map((stat) => (
//                 <div
//                   key={stat.category}
//                   className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg"
//                 >
//                   <h4 className="text-3xl font-bold text-amber-600">
//                     {stat.number}
//                   </h4>
//                   <p className="mt-2 text-sm text-gray-600">
//                     {stat.category}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, X, Mail, Send, ArrowRight, Target, Award, PackageCheck, CheckCircle2 } from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'
import Image from "next/image";
import company from "@/data/company.json";

export default function About() {
  const { openModal } = useModal()
  const [isContactOpen, setIsContactOpen] = useState(false)

  // Replace with your actual WhatsApp number
  const whatsappNumber = "919999999999"
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  
  // Replace with your actual phone number
  const phoneNumber = "+919999999999"

  return (
    <section
      id="about"
      className="bg-white py-15 lg:py-22"
      aria-categoryledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[600px] w-full">
              <img
                src="https://res.cloudinary.com/gpto0thu/image/upload/v1783022916/Cozy_Winter_Decor_Ideas_to_Transform_Your_Space_f5viqh.jpg"
                alt="Box Wale Packaging Manufacturing"
                width={700}
                height={700}
                className="h-full w-full object-cover"
              />
              {/* Optional: Overlay for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 left-8 rounded-2xl bg-white p-6 shadow-xl">
              <h4 className="text-3xl font-bold text-amber-600">10+</h4>
              <p className="text-sm text-gray-600">
                Years of Packaging Excellence
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              {company.badge}
            </span>

            {/* Heading */}
            <h2
              id="about-heading"
              className="mt-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5x2"
            >
              {company.heading}
            </h2>

            

            {/* Highlights */}
            <div className="mt-10 space-y-8">
              <div className="flex gap-4">
                <PackageCheck className="mt-1 h-7 w-7 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Types</h3>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {company.expertise.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {company.stats.map((stat) => (
                <div
                  key={stat.category}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h4 className="text-3xl font-bold text-amber-600">
                    {stat.number}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {stat.category}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons - Added here */}
<div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"git >
  {/* Get Quote Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={openModal}
    className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-300"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="font-medium">Get Quote</span>
  </motion.button>

  {/* Contact Button - Direct Call */}
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href="tel:+918209293728"
    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300"
  >
    <Phone className="w-5 h-5" />
    <span className="font-medium">Call Now</span>
  </motion.a>
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  Star,
  ShieldCheck,
  Users,
  Truck,
  Sparkles,
} from 'lucide-react';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' } },
};

const Footer: React.FC = () => {
  const currentYear = 2026;

  const products = [
    { name: 'Luxury Hamper Boxes', href: '/products/?category=Luxury%20Hamper%20Boxes' },
    { name: 'Premium Atta Box', href: '/products/?category=Premium%20Attar%20Box' },
    { name: 'Nikah Nama Box', href: '/products/?category=Nikah%20Nama%20Box' },
   
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Get Quote', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/8209293728',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/boxwale',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/boxwale',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
   
  ];

  // const trustStats = [
  //   {
  //     icon: <Users className="w-5 h-5" />,
  //     value: '500+',
  //     category: 'Happy Clients',
  //   },
  //   {
  //     icon: <Sparkles className="w-5 h-5" />,
  //     value: '1000+',
  //     category: 'Packaging Designs',
  //   },
  //   {
  //     icon: <ShieldCheck className="w-5 h-5" />,
  //     value: '100%',
  //     category: 'Quality Assurance',
  //   },
  //   {
  //     icon: <Truck className="w-5 h-5" />,
  //     value: 'Pan India',
  //     category: 'Delivery',
  //   },
  // ];

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden font-sans selection:bg-amber-500/30">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* CTA Section */}
      

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pt-20"
        >
          {/* Company Info */}
          <motion.div variants={fadeUp} className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-auto">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Box<span className="text-amber-400">Wale</span>
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400/80 to-transparent" />
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-7 max-w-xs">
              Premium Packaging Solutions for Businesses, Brands & Every
              Special Occasion.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-category={social.name}
                  variants={scaleOnHover}
                  initial="rest"
                  whileHover="hover"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 backdrop-blur-sm transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.2em]">
              Products
            </h3>
            <ul className="space-y-3.5">
              {products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    <span className="w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-3" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.2em]">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    <span className="w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-3" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.2em]">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918209293728"
                  className="group flex items-start gap-3 text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-amber-400/70 shrink-0" />
                  <span>+91 8209 293 728</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@boxwale.com"
                  className="group flex items-start gap-3 text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-amber-400/70 shrink-0" />
                  <span>boxwale02@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-400/70 shrink-0" />
                <span>Box Wale, HNKB Cycle 1st floor, Opposite Sumer Market Dhan Mandi, Manak Chowk Road, Jodhpur, Rajasthan, 342001</span>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-amber-400/70 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar */}
    

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-white/40 text-sm">
                © {currentYear} Box Wale. All Rights Reserved.
              </span>
              <span className="hidden sm:block text-white/20">•</span>
              <span className="text-white/30 text-xs">
                Premium Packaging Solutions for Businesses, Brands & Every
                Special Occasion.
              </span>
            </div>
            <div className="flex items-center gap-6">
            
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
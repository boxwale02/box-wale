// components/ui/SlideModal.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ContactFormSimple from '@/components/home/ContactFormSimple';

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideModal({ isOpen, onClose }: SlideModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Slide Panel - Clean, Only Contact Form */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
          >
            {/* Header - Minimal */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Request Custom Packaging</h2>
                <p className="mt-0.5 text-sm text-gray-500">Fill in the details and we'll get back to you</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-category="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Only Contact Form */}
            <div className="flex-1 overflow-y-auto p-6">
              <ContactFormSimple />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
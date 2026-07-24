// components/ui/CustomLink.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  openModal?: boolean;
}

export default function CustomLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  openModal = false 
}: CustomLinkProps) {
  const { openModal: openModalContext } = useModal();

  const handleClick = (e: React.MouseEvent) => {
    if (openModal) {
      e.preventDefault();
      openModalContext();
    }
    if (onClick) {
      onClick();
    }
  };

  // If it's a modal link, use button behavior
  if (openModal) {
    return (
      <button
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
    );
  }

  // Otherwise, use Next.js Link
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
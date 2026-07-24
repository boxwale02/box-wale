// app/contact/ContactSectionWrapper.tsx
'use client'

import { ReactNode } from 'react'

interface ContactSectionWrapperProps {
  children: ReactNode
}

export default function ContactSectionWrapper({ children }: ContactSectionWrapperProps) {
  return (
    <div className="contact-wrapper">
      {/* Add any wrapper logic here */}
      {children}
    </div>
  )
}
// app/contact/page.tsx
import { Metadata } from 'next'
import ClientContactPage from './ClientContactPage'

export const metadata: Metadata = {
  title: 'Contact Us | Box Wale',
  description: 'Get in touch with Box Wale for premium packaging solutions. We\'re here to help with all your packaging needs.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ClientContactPage />
      </div>
    </main>
  )
}
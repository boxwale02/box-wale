// app/products/[slug]/ProductCTAWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

// ✅ Dynamic import with ssr: false - NOW IN A CLIENT COMPONENT
const ProductCTAClient = dynamic(
  () => import('@/components/products/ProductCTAClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading quote form...</div>
      </div>
    )
  }
)

interface ProductCTAWrapperProps {
  product: any
}

export default function ProductCTAWrapper({ product }: ProductCTAWrapperProps) {
  return <ProductCTAClient product={product} />
}
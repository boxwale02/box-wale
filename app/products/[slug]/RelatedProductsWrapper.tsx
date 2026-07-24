// app/products/[slug]/RelatedProductsWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

// ✅ Dynamic import with ssr: false - NOW IN A CLIENT COMPONENT
const RelatedProductsClient = dynamic(
  () => import('@/components/products/RelatedProductsClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading related products...</div>
      </div>
    )
  }
)

interface RelatedProductsWrapperProps {
  currentProductId: number;
}

export default function RelatedProductsWrapper({
  currentProductId,
}: RelatedProductsWrapperProps) {
  return <RelatedProductsClient currentProductId={currentProductId} />;
}
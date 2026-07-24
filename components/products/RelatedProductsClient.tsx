'use client'

import { useState } from 'react'
import { RelatedProducts } from './RelatedProducts'
import QuoteDrawer from './QuoteDrawer'

interface RelatedProductsClientProps {
  currentProductId: number;
}

export default function RelatedProductsClient({ currentProductId }: RelatedProductsClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleQuoteClick = (product: any) => {
    setSelectedProduct(product)
    setIsQuoteOpen(true)
  }

  return (
    <>
      <RelatedProducts
  currentProductId={currentProductId}
/>
      
      {selectedProduct && (
        <QuoteDrawer
          isOpen={isQuoteOpen}
          onClose={() => {
            setIsQuoteOpen(false)
            setSelectedProduct(null)
          }}
          product={selectedProduct}
        />
      )}
    </>
  )
}
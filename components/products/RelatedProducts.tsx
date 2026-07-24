'use client'

import { useState, useEffect } from 'react'
import productsData from '@/data/products.json'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface RelatedProductsProps {
  currentProductId: number;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

 useEffect(() => {
  // Current product by ID
  const currentProduct = productsData.products.find(
    (p: any) => p.id === currentProductId
  );

  if (!currentProduct) {
    return;
  }

  // Same category products
  let related = productsData.products.filter(
    (p: any) =>
      p.id !== currentProductId &&
      p.category === currentProduct.category
  );

  // Agar same category me 3 se kam hain
  if (related.length < 3) {
    const extra = productsData.products.filter(
      (p: any) =>
        p.id !== currentProductId &&
        p.category !== currentProduct.category
    );

    related = [...related, ...extra];
  }

  setRelatedProducts(related.slice(0, 3));
}, [currentProductId]);
  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 md:text-3xl">
          You May Also Like
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-amber-50">
                  <span className="text-4xl">📦</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            {product.price && (
              <p className="mt-2 font-bold text-amber-600">₹{product.price}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
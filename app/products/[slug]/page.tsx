// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import productsData from '@/data/products.json'
import {
  ProductHero,
  ProductGallery,
  ProductHighlights,
  ProductSpecifications,
  RelatedProducts,
  ProductCTA
} from '@/components/products'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  const product = productsData.products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Box Wale`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.length ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = productsData.products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ProductHero product= {product} />

        

        <ProductHighlights product={product} />

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <ProductSpecifications specifications={product.specifications} />
        )}

        <RelatedProducts currentProductId={product.id} />
        <ProductCTA product={product} />
      </div>
    </main>
  )
}
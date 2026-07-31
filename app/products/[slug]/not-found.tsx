// app/products/[slug]/not-found.tsx
import Link from "next/link";
import { Package } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-amber-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
          Product Not Found
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
          Browse our collection of premium packaging solutions.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          View All Products
        </Link>
      </div>
    </main>
  );
}
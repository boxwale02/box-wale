

// types/product.ts
export interface Product {
  id: number
  slug: string
  name: string
  description: string
  startingPrice: number
  baseWidth: number
  baseHeight: number
  category: string;
    badge?: string; 
  baseLength: number
  featured: boolean
  images: string[]
  features: Feature[]
  specifications: Specifications
  applications: string[]
}

export interface Feature {
  icon: string
  title: string
  description: string
  featured?: boolean
}

export interface Specifications {
  material: string
  dimensions: string
  printing: string
  finishing: string
  moq: string
  deliveryTime: string
}
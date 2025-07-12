export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  images: string[]
  rating: number
  reviewCount: number
  category: string
  badge: string
  description: string
  longDescription: string
  features: string[]
  nutrition: {
    servingSize: string
    calories: number
    protein: string
    fat: string
    carbs: string
    fiber: string
  }
  customerReviews: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

// Remove all mock products
export const products: Product[] = []

export function getProductById(id: number): Product | undefined {
  return undefined
}

export function getProductsByCategory(category: string): Product[] {
  return []
}

export function getFeaturedProducts(): Product[] {
  return []
}

export function getAllProducts(): Product[] {
  return []
}

export interface Category {
  name: string
  slug: string
  count: number
}

export function getCategories(): Category[] {
  return []
} 
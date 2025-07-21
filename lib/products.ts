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
  nutrition: any
  customerReviews: any[]
}

export interface Category {
  name: string
  slug: string
  count: number
}

export function getCategories(): Category[] {
  return [
    { name: "Dry Fruits & Nuts", slug: "dry-fruits-and-nuts", count: 5 },
    { name: "Seeds", slug: "seeds", count: 3 },
  ];
}

export function getAllProducts(): Product[] {
  return [
    { id: 1, name: "Premium Almonds", price: 499, originalPrice: 599, images: ["/placeholder.svg"], rating: 4.8, reviewCount: 120, category: "almonds", badge: "Best Seller", description: "Fresh and crunchy almonds.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 2, name: "California Walnuts", price: 399, originalPrice: 499, images: ["/placeholder.svg"], rating: 4.7, reviewCount: 80, category: "walnuts", badge: "Popular", description: "Premium quality walnuts.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 3, name: "Turkish Pistachios", price: 599, originalPrice: 699, images: ["/placeholder.svg"], rating: 4.9, reviewCount: 60, category: "pistachios", badge: "New", description: "Delicious Turkish pistachios.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 4, name: "Goa Cashews", price: 299, originalPrice: 399, images: ["/placeholder.svg"], rating: 4.6, reviewCount: 50, category: "cashews", badge: "Premium", description: "Creamy cashews from Goa.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 5, name: "Assorted Dried Fruits", price: 699, originalPrice: 799, images: ["/placeholder.svg"], rating: 4.5, reviewCount: 70, category: "dried-fruits", badge: "Healthy", description: "Mix of premium dried fruits.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 6, name: "Mixed Nuts Combo", price: 899, originalPrice: 999, images: ["/placeholder.svg"], rating: 4.7, reviewCount: 90, category: "mixed-nuts", badge: "Combo", description: "Best of all nuts.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 7, name: "Dry Fruits & Nuts Special", price: 799, originalPrice: 899, images: ["/placeholder.svg"], rating: 4.8, reviewCount: 55, category: "dry-fruits-and-nuts", badge: "Special", description: "A special mix of dry fruits and nuts.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
    { id: 8, name: "Premium Seeds Mix", price: 299, originalPrice: 399, images: ["/placeholder.svg"], rating: 4.6, reviewCount: 30, category: "seeds", badge: "Healthy", description: "A nutritious mix of premium seeds.", longDescription: "", features: [], nutrition: {}, customerReviews: [] },
  ];
} 
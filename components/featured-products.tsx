"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/lib/firebase"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getAllProducts()
      setFeaturedProducts(allProducts.slice(0, 4)) // First 4 as featured
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-16 md:py-24 relative ethnic-gradient">
      {/* Traditional Background Pattern */}
      <div className="absolute inset-0 paisley-pattern opacity-20"></div>
      <div className="absolute inset-0 nut-pattern"></div>

      <div className="container px-4 relative z-10">
        {/* Traditional Header Design */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-24"></div>
            <div className="flex space-x-2">
              <span className="text-2xl">🌰</span>
              <span className="text-2xl">🥜</span>
              <span className="text-2xl">🌳</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-24"></div>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-playfair mb-4 ethnic-text">
            Featured Products
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked selection of our most popular and highest quality nuts and dried fruits, blessed by tradition and
            nature's bounty
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-amber-600 text-amber-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 ethnic-hover bg-transparent"
            asChild
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>

      {/* Bottom Traditional Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 opacity-40"></div>
    </section>
  )
}

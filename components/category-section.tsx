"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getAllProducts } from "@/lib/firebase"

const categoryImages: Record<string, string> = {
  "Spices": "/images/category-thumbnails/w.jpeg",
  "Dry Fruits & Nuts": "/images/category-thumbnails/dry.jpeg",
  "Seeds": "/images/category-thumbnails/seeds.jpeg",
}
const defaultImage = "/images/logo.jpeg"

const categorySlugs: Record<string, string> = {
  "Dry Fruits & Nuts": "dry-fruits-and-nuts",
  "Seeds": "seeds",
  "Spices": "spices",
  // Add more mappings as needed
};

export function CategorySection() {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    getAllProducts().then(products => {
      const catMap: Record<string, number> = {}
      products.forEach(p => {
        if (p.category) {
          catMap[p.category] = (catMap[p.category] || 0) + 1
        }
      })
      setCategories(Object.entries(catMap).map(([name, count]) => ({ name, count })))
    })
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-turmeric-50 to-gold-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ethnic-text">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <div key={cat.name} className="rounded-2xl overflow-hidden shadow-lg bg-white/90 hover:shadow-2xl transition-all duration-300 card-ethnic flex flex-col items-center p-6">
              <div className="w-full h-56 relative mb-6">
                <Image
                  src={categoryImages[cat.name] || defaultImage}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center ethnic-text">{cat.name}</h3>
              <div className="mb-2 text-sm text-gray-500">{cat.count} product{cat.count !== 1 ? "s" : ""}</div>
              <Button asChild className="btn-traditional px-8 py-3 text-lg font-semibold mt-auto">
                <Link href={`/categories/${categorySlugs[cat.name] || cat.name.toLowerCase().replace(/\s+/g, "-")}`}>Shop Now</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
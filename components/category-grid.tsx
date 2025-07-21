import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Almonds",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/almonds",
    count: 12,
  },
  {
    name: "Walnuts",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/walnuts",
    count: 8,
  },
  {
    name: "Pistachios",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/pistachios",
    count: 6,
  },
  {
    name: "Cashews",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/cashews",
    count: 10,
  },
  {
    name: "Dried Fruits",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/dried-fruits",
    count: 15,
  },
  {
    name: "Mixed Nuts",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/mixed-nuts",
    count: 7,
  },
  {
    name: "Dry Fruits & Nuts",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/dry-fruits-and-nuts",
    count: 5,
  },
  {
    name: "Seeds",
    image: "/placeholder.svg?height=200&width=200",
    href: "/categories/seeds",
    count: 3,
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/50 relative">
      {/* Traditional Background Patterns */}
      <div className="absolute inset-0 mandala-pattern opacity-15"></div>
      <div className="absolute inset-0 leaf-pattern"></div>

      <div className="container px-4 relative z-10">
        {/* Traditional Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-32"></div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
              <span className="text-xl">🌳</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-32"></div>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-playfair mb-4 ethnic-text">
            Shop by Category
          </h2>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-amber-600 rounded-full"></div>
            <div className="w-4 h-1 bg-orange-600 rounded-full"></div>
            <div className="w-8 h-1 bg-red-600 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our wide range of premium nuts and dried fruits, carefully categorized from nature's treasure trove
            for your convenience
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card className="group overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ethnic-hover bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0 relative">
                  {/* Traditional Frame */}
                  <div className="absolute inset-2 border-2 border-amber-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  {/* Corner Decorations */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-3 border-t-3 border-amber-500 rounded-tl-lg z-10"></div>
                  <div className="absolute top-3 right-3 w-8 h-8 border-r-3 border-t-3 border-amber-500 rounded-tr-lg z-10"></div>

                  <div className="relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="aspect-[4/3] object-cover w-full transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Ethnic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Traditional Pattern Overlay */}
                    <div className="absolute inset-0 paisley-pattern opacity-10"></div>

                    {/* Category Info with Traditional Styling */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                          <span className="text-xs">🌿</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-amber-400 to-transparent w-16"></div>
                      </div>
                      <h3 className="text-xl font-bold font-playfair ethnic-text drop-shadow-lg">{category.name}</h3>
                      <p className="text-sm opacity-90 drop-shadow">{category.count} premium products</p>

                      {/* Traditional Decorative Element */}
                      <div className="flex items-center space-x-1 mt-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Floating Decorative Nuts */}
                    <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      <div className="text-2xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                        {index % 4 === 0 ? "🥜" : index % 4 === 1 ? "🌰" : index % 4 === 2 ? "🥥" : "🍇"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 opacity-20"></div>
    </section>
  )
}

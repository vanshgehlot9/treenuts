"use client"

import { useWishlist } from "@/components/wishlist-provider"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlist()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Wishlist Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-4xl font-bold font-playfair ethnic-text bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            My Wishlist
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your saved products and favorites. Keep track of items you love!
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {wishlistItems.length} Items
          </Badge>
          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearWishlist}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard 
                product={{
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  originalPrice: null,
                  images: [item.image],
                  rating: 0,
                  reviewCount: 0,
                  category: item.category,
                  badge: "",
                  description: "",
                  longDescription: "",
                  features: [],
                  nutrition: {
                    servingSize: "",
                    calories: 0,
                    protein: "",
                    fat: "",
                    carbs: "",
                    fiber: ""
                  },
                  customerReviews: []
                }} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Start adding products to your wishlist to save them for later!
          </p>
          <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
            <Link href="/products">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
} 
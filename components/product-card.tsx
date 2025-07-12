"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/products"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

// Utility to strip HTML tags
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()
  // No variant selection in card view

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const price = product.variants && product.variants.length > 0 ? product.variants[0].price : product.price
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.images[0],
      quantity: 1
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="group overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 ethnic-hover bg-white/90 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        {/* Traditional Corner Decorations */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-500 rounded-tl-lg z-10"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-500 rounded-tr-lg z-10"></div>

        <Link href={`/products/${product.id}`}>
          <Image
            src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Ethnic Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300"
          >
            {product.badge}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className={`h-8 w-8 ${
              isInWishlist(product.id)
                ? "bg-red-100 hover:bg-red-200 text-red-600"
                : "bg-white/90 hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        {product.originalPrice && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-orange-500">
              Save ₹{((product.originalPrice - product.price) / 100).toFixed(0)}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 bg-gradient-to-b from-white to-amber-50/30">
        <div className="space-y-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg leading-tight ethnic-text hover:text-amber-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{stripHtml(product.description)}</p>

          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary ethnic-text">
              ₹{product.variants && product.variants.length > 0 ? product.variants[0].price : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 bg-gradient-to-b from-amber-50/30 to-orange-50/20">
        <div className="flex w-full space-x-2">
          <Button
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
            asChild
          >
            <Link href={`/products/${product.id}`}>View</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { getProductById } from "@/lib/firebase"
import React from "react"

// Utility to strip HTML tags
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const prod = await getProductById(resolvedParams.id)
      setProduct(prod)
      setSelectedVariant(prod?.variants && prod.variants.length > 0 ? prod.variants[0] : null)
      setLoading(false)
    }
    fetchProduct()
  }, [resolvedParams.id])

  if (loading) {
    return <div className="container px-4 py-8 text-center">Loading...</div>
  }

  if (!product) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Removed similarProducts line as it was causing an error

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem({
        id: product.id + (selectedVariant.sku ? `-${selectedVariant.sku}` : ''),
        name: product.name + (selectedVariant.weight ? ` (${selectedVariant.weight})` : ''),
        price: selectedVariant.price,
        image: product.images[0],
        quantity
      })
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      })
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <Image
              src={product.images[selectedImage]}
              alt={`${product.name} - Image ${selectedImage + 1}`}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImage + 1} / {product.images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-amber-500 ring-2 ring-amber-200' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setLightboxOpen(false)}>&times;</button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2"
                onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - Large Image ${selectedImage + 1}`}
                width={800}
                height={800}
                className="max-h-[80vh] w-auto rounded shadow-lg"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2"
                onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800">
                {product.badge}
              </Badge>
              {product.originalPrice && (
                <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-orange-500">
                  Save ₹{(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              {product.variants && product.variants.length > 0 && (
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Variant:</label>
                  <select
                    className="input w-full border rounded px-2 py-1"
                    value={selectedVariant?.weight || ''}
                    onChange={e => {
                      const v = product.variants.find(v => v.weight === e.target.value)
                      setSelectedVariant(v || null)
                    }}
                  >
                    {product.variants.map(v => (
                      <option key={v.sku || v.weight} value={v.weight}>
                        {v.weight} - ₹{v.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <span className="text-3xl font-bold text-primary">₹{selectedVariant ? selectedVariant.price : product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{stripHtml(product.description)}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8"
                >
                  -
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {(product.features ?? []).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Truck className="h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium">Free Shipping</span>
                <span className="text-xs text-muted-foreground">On orders above ₹999</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Shield className="h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium">Quality Guarantee</span>
                <span className="text-xs text-muted-foreground">100% satisfaction</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RefreshCw className="h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium">Easy Returns</span>
                <span className="text-xs text-muted-foreground">7-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 border-t pt-8">
        <div className="space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <div className="prose max-w-none">
              {(product.longDescription ?? "").split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Nutrition Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Nutrition Information</h3>
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Serving Size</span>
                  <p className="font-medium">{product.nutrition?.servingSize ?? ""}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Calories</span>
                  <p className="font-medium">{product.nutrition?.calories ?? ""}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Protein</span>
                  <p className="font-medium">{product.nutrition?.protein ?? ""}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Fiber</span>
                  <p className="font-medium">{product.nutrition?.fiber ?? ""}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {(product.customerReviews ?? []).map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {/* Removed similarProducts block as it was causing an error */}
    </div>
  )
} 
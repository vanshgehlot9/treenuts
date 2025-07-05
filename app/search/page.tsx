"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getAllProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Star } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      const allProducts = getAllProducts()
      
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(query.toLowerCase())
        )
      )
      
      setSearchResults(results)
      setIsLoading(false)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [query])

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">
            Search Products
          </h1>
          <p className="text-gray-500">
            Enter a search term to find products
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-amber-600 mr-3" />
          <h1 className="text-4xl font-bold font-playfair ethnic-text bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
            Search Results
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Showing results for "{query}"
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            {searchResults.length} Products Found
          </Badge>
          <div className="flex items-center text-amber-600">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching products...</p>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && (
        <>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any products matching "{query}"
              </p>
              <div className="text-sm text-gray-400">
                <p>Try searching for:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Almonds, Walnuts, Pistachios</li>
                  <li>• Dried fruits like apricots, raisins</li>
                  <li>• Traditional candies and snacks</li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
} 
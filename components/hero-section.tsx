import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Award, Truck, Star, Heart, ShoppingCart, Sparkles, Zap, Shield } from "lucide-react"
import { getFeaturedProducts } from "@/lib/products"

export function HeroSection() {
  const featuredProducts = getFeaturedProducts().slice(0, 4)

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-orange-200 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-br from-red-200 to-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container px-4 py-16 md:py-24 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full px-4 py-2 w-fit">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Premium Quality Since 1995</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-gray-900">Tree Nuts</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Premium Collection
                </span>
                <span className="block text-gray-900">of Nature's Finest</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Discover our carefully curated selection of premium nuts and dried fruits, 
                sourced from the world's finest orchards. Every bite tells a story of tradition, 
                quality, and authentic flavors.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/products" className="flex items-center space-x-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link href="/products" className="flex items-center space-x-2">
                  <span>View All Products</span>
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center group">
                <div className="mb-3 mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">100% Natural</h3>
                <p className="text-sm text-gray-600">No Preservatives</p>
              </div>
              
              <div className="text-center group">
                <div className="mb-3 mx-auto w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
                <p className="text-sm text-gray-600">Hand-Selected</p>
              </div>
              
              <div className="text-center group">
                <div className="mb-3 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Across India</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">4.9/5</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">10,000+</span> Happy Customers
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Main Product Display */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl blur-2xl opacity-30"></div>
              
                             {/* Product Grid */}
               <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-100">
                 <div className="grid grid-cols-2 gap-6">
                   {/* Featured Product 1 */}
                   <Link href={`/products/${featuredProducts[0]?.id || 1}`} className="block">
                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                       <div className="absolute top-2 right-2">
                         <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                           {featuredProducts[0]?.badge || "Best Seller"}
                         </div>
                       </div>
                       <div className="aspect-square relative mb-4">
                         <Image
                           src={featuredProducts[0]?.images[0] || "/placeholder.svg"}
                           alt={featuredProducts[0]?.name || "Product"}
                           fill
                           className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                         />
                       </div>
                       <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                         {featuredProducts[0]?.name || "Tree Nuts Almonds"}
                       </h3>
                       <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-amber-600">₹{featuredProducts[0]?.price || "1999"}</span>
                         <div className="flex items-center space-x-1 text-sm text-gray-500">
                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           <span>{featuredProducts[0]?.rating || "4.8"}</span>
                         </div>
                       </div>
                     </div>
                   </Link>

                   {/* Featured Product 2 */}
                   <Link href={`/products/${featuredProducts[1]?.id || 2}`} className="block">
                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                       <div className="absolute top-2 right-2">
                         <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                           {featuredProducts[1]?.badge || "Organic"}
                         </div>
                       </div>
                       <div className="aspect-square relative mb-4">
                         <Image
                           src={featuredProducts[1]?.images[0] || "/placeholder.svg"}
                           alt={featuredProducts[1]?.name || "Product"}
                           fill
                           className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                         />
                       </div>
                       <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                         {featuredProducts[1]?.name || "Tree Nuts Amla Candy"}
                       </h3>
                       <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-green-600">₹{featuredProducts[1]?.price || "1499"}</span>
                         <div className="flex items-center space-x-1 text-sm text-gray-500">
                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           <span>{featuredProducts[1]?.rating || "4.9"}</span>
                         </div>
                       </div>
                     </div>
                   </Link>

                   {/* Featured Product 3 */}
                   <Link href={`/products/${featuredProducts[2]?.id || 3}`} className="block">
                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                       <div className="absolute top-2 right-2">
                         <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                           {featuredProducts[2]?.badge || "Premium"}
                         </div>
                       </div>
                       <div className="aspect-square relative mb-4">
                         <Image
                           src={featuredProducts[2]?.images[0] || "/placeholder.svg"}
                           alt={featuredProducts[2]?.name || "Product"}
                           fill
                           className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                         />
                       </div>
                       <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                         {featuredProducts[2]?.name || "Tree Nuts Dried Apricot"}
                       </h3>
                       <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-orange-600">₹{featuredProducts[2]?.price || "2799"}</span>
                         <div className="flex items-center space-x-1 text-sm text-gray-500">
                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           <span>{featuredProducts[2]?.rating || "4.7"}</span>
                         </div>
                       </div>
                     </div>
                   </Link>

                   {/* Featured Product 4 */}
                   <Link href={`/products/${featuredProducts[3]?.id || 4}`} className="block">
                     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                       <div className="absolute top-2 right-2">
                         <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                           {featuredProducts[3]?.badge || "Popular"}
                         </div>
                       </div>
                       <div className="aspect-square relative mb-4">
                         <Image
                           src={featuredProducts[3]?.images[0] || "/placeholder.svg"}
                           alt={featuredProducts[3]?.name || "Product"}
                           fill
                           className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                         />
                       </div>
                       <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                         {featuredProducts[3]?.name || "Tree Nuts Black Currant"}
                       </h3>
                       <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-blue-600">₹{featuredProducts[3]?.price || "1899"}</span>
                         <div className="flex items-center space-x-1 text-sm text-gray-500">
                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           <span>{featuredProducts[3]?.rating || "4.6"}</span>
                         </div>
                       </div>
                     </div>
                   </Link>
                 </div>
               </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: "2s" }}></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-amber-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Product Varieties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Natural Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}


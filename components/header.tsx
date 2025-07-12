"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, Heart, LogOut, Settings, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useAuth } from "@/components/auth-provider"
import { getCategories } from "@/lib/products"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()
  const { wishlistItems } = useWishlist()
  const { user, signOut } = useAuth()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const categories = getCategories()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-amber-200 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-red-50/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Traditional Top Border */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600"></div>

      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile Menu - keep existing */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-amber-100">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-gradient-to-b from-amber-50 to-orange-50 ethnic-pattern">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-semibold ethnic-text">
                Home
              </Link>
              <Link href="/products" className="text-lg ethnic-text hover:text-amber-700">
                All Products
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/categories/${category.slug}`} 
                  className="text-lg ethnic-text hover:text-amber-700"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/about" className="text-lg ethnic-text hover:text-amber-700">
                About
              </Link>
              <Link href="/contact" className="text-lg ethnic-text hover:text-amber-700">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Enhanced Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Image 
              src="/images/logo.jpeg" 
              alt="Tree Nuts Logo" 
              width={40} 
              height={40}
              className="group-hover:scale-110 transition-transform duration-300 rounded-lg w-10 h-auto"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold font-playfair ethnic-text bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              Tree Nuts
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with ethnic styling */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-amber-700 transition-colors ethnic-text relative group"
          >
            Home
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-amber-700 transition-colors ethnic-text">
              Products
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gradient-to-b from-amber-50 to-orange-50 border-amber-200">
              <DropdownMenuItem asChild>
                <Link href="/products" className="ethnic-text hover:bg-amber-100">
                  All Products
                </Link>
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/categories/${category.slug}`} className="ethnic-text hover:bg-amber-100">
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-amber-700 transition-colors ethnic-text relative group"
          >
            About
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-amber-700 transition-colors ethnic-text relative group"
          >
            Contact
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></div>
          </Link>
        </nav>

        {/* Search and Actions with ethnic styling */}
        <div className="flex items-center space-x-2">
          {/* Enhanced Search */}
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-600" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-8 border-amber-200 focus:border-amber-400 bg-white/80"
              />
            </form>
          </div>

          {/* Action Buttons with ethnic styling */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-amber-100"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5 text-amber-700" />
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-amber-100" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5 text-amber-700" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-amber-100" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 text-amber-700" />
              {itemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-amber-100">
                <User className="h-5 w-5 text-amber-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gradient-to-b from-amber-50 to-orange-50 border-amber-200">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="ethnic-text hover:bg-amber-100">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="ethnic-text hover:bg-amber-100">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="ethnic-text hover:bg-amber-100">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="ethnic-text hover:bg-amber-100">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="ethnic-text hover:bg-amber-100">
                      <Settings className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Enhanced Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-amber-200 px-4 py-2 md:hidden bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-600" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 border-amber-200 focus:border-amber-400 bg-white/80"
            />
          </div>
        </div>
      )}
    </header>
  )
}

import { notFound } from "next/navigation"
import { getAllProducts } from "@/lib/firebase"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Package, Star } from "lucide-react"

export async function generateStaticParams() {
  const products = await getAllProducts();
  const uniqueSlugs = Array.from(new Set(products.map(p => p.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"))));
  return uniqueSlugs.map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: { params: { slug: string } } | { params: Promise<{ slug: string }> }) {
  // Await params if it's a Promise (for Next.js streaming)
  const resolvedParams = typeof params.then === 'function' ? await params : params;
  const { slug } = resolvedParams;

  const allProducts = await getAllProducts();
  // Find products matching the slug (normalize category name to slug)
  const products = allProducts.filter(p => {
    const catSlug = p.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
    return catSlug === slug;
  });
  const currentCategoryName = products.length > 0 ? products[0].category : slug;
  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-amber-600 mr-3" />
          <h1 className="text-4xl font-bold font-playfair ethnic-text bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
            {currentCategoryName}
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our premium collection of {currentCategoryName.toLowerCase()}. 
          Each product is carefully selected for quality, taste, and nutritional value.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            {products.length} Products
          </Badge>
          <div className="flex items-center text-amber-600">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found in this category
          </h3>
          <p className="text-gray-500">
            We're working on adding more products to this category. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
} 
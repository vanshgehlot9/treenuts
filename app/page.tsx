import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
//import { CategoryGrid } from "@/components/category-grid"
import { AboutSection } from "@/components/about-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <FeaturedProducts />
      </Suspense>
      <AboutSection />
      <NewsletterSection />
    </main>
  )
}

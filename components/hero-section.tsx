import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles, Leaf } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-saffron-50 via-turmeric-50 to-gold-50 kolam-pattern">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-saffron-200 to-turmeric-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-turmeric-200 to-gold-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-br from-gold-200 to-saffron-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-saffron-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Traditional Diya Lights */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-diya-flicker"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-300 rounded-full animate-diya-flicker animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-diya-flicker animation-delay-4000"></div>

      <div className="container px-4 py-16 md:py-24 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Right Content - Image: On mobile, show first; on desktop, show right */}
          <div className="order-1 lg:order-2 w-full flex justify-center items-center">
            <div className="relative w-full h-64 sm:h-80 md:h-96 max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-saffron-100 traditional-border bg-white/80">
              <Image
                src="/images/category-thumbnails/hero.jpeg"
                alt="Premium Selection"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-8">
            {/* Premium Badge with Traditional Motifs */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 to-turmeric-100 border border-saffron-200 rounded-full px-4 py-2 w-fit traditional-motif animate-pulse-glow">
              <Sparkles className="h-4 w-4 text-saffron-600" />
              <span className="text-sm font-medium text-saffron-800 ethnic-text-body">Premium Quality Since 1995</span>
              <Leaf className="h-4 w-4 text-saffron-600" />
            </div>

            {/* Main Heading with Enhanced Typography */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-gray-900 ethnic-text">Tree Nuts</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
                  Premium Collection
                </span>
                <span className="block text-gray-900 ethnic-text">of Nature's Finest</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl ethnic-text-body">
                Taste the joy of nature in every bite. Handpicked, wholesome, and delicious—just for you. Discover your new favorite treat today.
              </p>
            </div>

            {/* CTA Button Only */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-traditional px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
                asChild
              >
                <Link href="/products" className="flex items-center space-x-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Award, Globe, Users, Heart, Shield } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We work with eco-friendly farms and use sustainable packaging to protect our planet.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Every product undergoes rigorous quality testing to ensure you receive only the best.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description: "We partner with premium growers worldwide to bring you authentic flavors.",
  },
  {
    icon: Users,
    title: "Family Heritage",
    description: "Three generations of expertise in selecting and processing the finest nuts.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Your satisfaction is our priority. We stand behind every product we sell.",
  },
  {
    icon: Shield,
    title: "Food Safety",
    description: "We maintain the highest food safety standards throughout our supply chain.",
  },
]

export default function AboutPage() {
  return (
    <div className="container px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl ethnic-pattern mb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-playfair">Our Story</h1>
          <p className="text-xl text-muted-foreground">
            Three generations of passion for bringing you the world's finest nuts and dried fruits
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter font-playfair">A Legacy of Excellence</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Tree Nuts began as a small family business in 1952 when our grandfather, Ahmad Hassan, started importing
              premium nuts from his homeland in the Middle East. What began as a passion for sharing authentic flavors
              has grown into a trusted source for the finest nuts and dried fruits from around the world.
            </p>
            <p>
              Today, we continue his legacy with the same commitment to quality and authenticity. Our team travels the
              globe to source directly from the best growers, ensuring that every product meets our exacting standards
              for freshness, flavor, and quality.
            </p>
            <p>
              We believe that food connects us to our heritage and to each other. Every nut and dried fruit we offer
              tells a story of tradition, craftsmanship, and the dedication of the farmers who grow them.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Our heritage"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-playfair mb-4">Our Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="border-0 shadow-md">
              <CardContent className="p-6 text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-playfair mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The passionate people behind Tree Nuts</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center space-y-4">
            <div className="aspect-square rounded-full overflow-hidden mx-auto w-32 h-32">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Sarah Hassan"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Sarah Hassan</h3>
              <p className="text-sm text-muted-foreground">CEO & Founder</p>
              <p className="text-sm text-muted-foreground mt-2">
                Third-generation leader continuing the family tradition of excellence.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="aspect-square rounded-full overflow-hidden mx-auto w-32 h-32">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Michael Chen"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Michael Chen</h3>
              <p className="text-sm text-muted-foreground">Head of Sourcing</p>
              <p className="text-sm text-muted-foreground mt-2">
                Expert in global nut markets with 15 years of sourcing experience.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="aspect-square rounded-full overflow-hidden mx-auto w-32 h-32">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Elena Rodriguez"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Elena Rodriguez</h3>
              <p className="text-sm text-muted-foreground">Quality Manager</p>
              <p className="text-sm text-muted-foreground mt-2">
                Ensures every product meets our rigorous quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl ethnic-pattern">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter font-playfair">Experience the Difference</h2>
          <p className="text-muted-foreground text-lg">
            Taste the quality that comes from three generations of expertise and passion.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            asChild
          >
            <Link href="/products">Shop Our Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

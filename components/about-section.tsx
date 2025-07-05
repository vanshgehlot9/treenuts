import { Leaf, Award, Globe, Users } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Naturally Sourced",
    description: "All our products are sourced from organic farms and natural orchards worldwide.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We maintain the highest quality standards through rigorous testing and selection.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Direct partnerships with farmers and suppliers across different continents.",
  },
  {
    icon: Users,
    title: "Family Tradition",
    description: "Three generations of expertise in selecting and processing the finest nuts.",
  },
]

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 leaf-pattern">
      <div className="container px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-playfair">Our Story & Commitment</h2>
              <p className="text-muted-foreground text-lg">
                For over three generations, Tree Nuts has been dedicated to bringing you the finest quality nuts and
                dried fruits from around the world. Our roots in Jodhpur, Rajasthan give us a rich heritage of trading
                in premium tree-grown treasures.
              </p>
              <p className="text-muted-foreground">
                We work directly with farmers and suppliers who share our values of quality, sustainability, and fair
                trade. Every product in our collection is carefully selected, tested, and packaged to ensure you receive
                only the best that nature has to offer.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/30"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

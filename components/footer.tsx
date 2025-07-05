import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { TreeLogo } from "@/components/tree-logo"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TreeLogo size="sm" />
              <span className="text-lg font-bold font-playfair">Tree Nuts</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium quality nuts and dried fruits sourced from the finest orchards worldwide. Rooted in tradition,
              growing with quality - bringing nature's best tree-grown treasures to your table.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/almonds" className="text-muted-foreground hover:text-primary">
                  Almonds
                </Link>
              </li>
              <li>
                <Link href="/categories/walnuts" className="text-muted-foreground hover:text-primary">
                  Walnuts
                </Link>
              </li>
              <li>
                <Link href="/categories/pistachios" className="text-muted-foreground hover:text-primary">
                  Pistachios
                </Link>
              </li>
              <li>
                <Link href="/categories/dried-fruits" className="text-muted-foreground hover:text-primary">
                  Dried Fruits
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+91 9509401639</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info.treenuts@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  Jata Bas,
                  <br />
                  Ghanchiyo Ka Bass , Mahamandir , Jodhpur,
                  <br />
                  Rajasthan, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© 2024 Tree Nuts. All rights reserved.</p>
          <div className="flex space-x-4 text-xs text-muted-foreground mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-primary">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

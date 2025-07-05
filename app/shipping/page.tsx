import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck, Clock, MapPin, Package, Shield } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary">Shipping Information</span>
      </div>

      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
        
        <div className="space-y-8">
          {/* Shipping Options */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="flex items-center space-x-3 mb-4">
                  <Truck className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="text-lg font-semibold">Standard Shipping</h3>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">₹99</p>
                  <p className="text-sm text-muted-foreground">Free on orders above ₹999</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tracking number provided</li>
                    <li>• Delivery confirmation</li>
                    <li>• Insurance included</li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold">Express Shipping</h3>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">₹199</p>
                  <p className="text-sm text-muted-foreground">Available for all orders</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Priority handling</li>
                    <li>• Real-time tracking</li>
                    <li>• Guaranteed delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Areas */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Major Cities</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  We deliver to all major cities across India including:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>• Mumbai</div>
                  <div>• Delhi</div>
                  <div>• Bangalore</div>
                  <div>• Chennai</div>
                  <div>• Kolkata</div>
                  <div>• Hyderabad</div>
                  <div>• Pune</div>
                  <div>• Ahmedabad</div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold">Remote Areas</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  We also deliver to smaller cities and towns with additional delivery time:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 7-10 business days for standard shipping</li>
                  <li>• 4-6 business days for express shipping</li>
                  <li>• Additional charges may apply</li>
                  <li>• Contact us for specific locations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Shipping Process */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Process</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Order Placed</h3>
                <p className="text-sm text-muted-foreground">Your order is confirmed and processed</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Processing</h3>
                <p className="text-sm text-muted-foreground">Items are packed and prepared for shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Shipped</h3>
                <p className="text-sm text-muted-foreground">Package is picked up by courier partner</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Delivered</h3>
                <p className="text-sm text-muted-foreground">Package arrives at your doorstep</p>
              </div>
            </div>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package using:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• The tracking link provided in your shipping confirmation email</li>
                <li>• Your order number on our website's tracking page</li>
                <li>• Direct tracking on our courier partner's website</li>
                <li>• SMS updates at each delivery stage</li>
              </ul>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Packaging & Handling</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Safe Packaging</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Food-grade packaging materials</li>
                  <li>• Moisture-resistant containers</li>
                  <li>• Temperature-controlled shipping when needed</li>
                  <li>• Fragile item protection</li>
                  <li>• Tamper-evident seals</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">Special Handling</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Careful handling of fragile items</li>
                  <li>• Proper stacking and arrangement</li>
                  <li>• Climate-controlled storage</li>
                  <li>• Quality checks before shipping</li>
                  <li>• Insurance coverage included</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery Issues */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Issues & Solutions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Package Not Received</h3>
                <p className="text-sm text-muted-foreground">
                  If your package hasn't arrived within the expected timeframe, please contact our customer support 
                  with your order number. We'll investigate and provide updates.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Damaged Package</h3>
                <p className="text-sm text-muted-foreground">
                  If your package arrives damaged, please take photos and contact us immediately. We'll arrange 
                  a replacement or refund.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Wrong Address</h3>
                <p className="text-sm text-muted-foreground">
                  If you provided an incorrect address, contact us as soon as possible. We may be able to redirect 
                  the package if it hasn't been delivered yet.
                </p>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Currently, we only ship within India. We're working on expanding our international shipping 
                capabilities. Please check back later for updates.
              </p>
              <p className="text-muted-foreground">
                For international customers, we recommend using a package forwarding service or having a friend 
                or family member in India receive your order.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Support</h2>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Have questions about shipping? Our customer support team is here to help:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> shipping@treenuts.com<br />
                    <strong>Phone:</strong> +1 (555) 123-4567<br />
                    <strong>Hours:</strong> Mon-Fri 9AM-6PM IST
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Support</h3>
                  <p className="text-sm text-muted-foreground">
                    For urgent shipping issues, please include your order number in your message for faster assistance.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 
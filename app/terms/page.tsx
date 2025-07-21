import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary">Terms and Conditions</span>
      </div>

      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Tree Nuts website, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
            <p className="text-muted-foreground mb-3">
              Permission is granted to temporarily download one copy of the materials (information or software) on Tree Nuts website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on Tree Nuts website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Product Information</h2>
            <p className="text-muted-foreground mb-3">
              We strive to provide accurate product information, including descriptions, prices, and availability. However, we do not warrant that 
              product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-muted-foreground">
              Product images are for illustrative purposes only and may not reflect the exact appearance of the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Pricing and Payment</h2>
            <p className="text-muted-foreground mb-3">
              All prices are in Indian Rupees (₹) and are subject to change without notice. We reserve the right to modify or discontinue any 
              product at any time.
            </p>
            <p className="text-muted-foreground">
              Payment must be made at the time of ordering. We accept various payment methods as displayed during checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Shipping and Delivery</h2>
            <p className="text-muted-foreground mb-3">
              We offer shipping across India. Delivery times may vary depending on your location and the shipping method selected.
            </p>
            <p className="text-muted-foreground">
              Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Returns and Refunds</h2>
            <p className="text-muted-foreground mb-3">
              We accept returns within 7 days of delivery for products that are unused and in their original packaging.
            </p>
            <p className="text-muted-foreground">
              Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Privacy Policy</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, 
              which also governs your use of the website, to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall Tree Nuts or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on Tree Nuts website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the 
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. 
              Your continued use of the website constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mt-3">
              <p className="text-muted-foreground">
                <strong>Email:</strong> treenuts09@gmail.com<br />
                <strong>Phone:</strong> +1 (555) 123-4567<br />
                <strong>Address:</strong> 123 Umaid Heritage, Paota, Jodhpur 342001, Rajasthan, India
              </p>
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
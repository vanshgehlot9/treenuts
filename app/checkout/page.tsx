"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { getUserProfile, setUserProfile } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { createOrder } from "@/lib/firebase"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  })
  const [showPayment, setShowPayment] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: ""
  })

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const profile = await getUserProfile(user.id)
        if (profile) {
          setForm({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            city: profile.city || "",
            zipCode: profile.zipCode || ""
          })
        } else {
          setForm(f => ({ ...f, email: user.email || "" }))
        }
      }
    }
    fetchProfile()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.id]: e.target.value })
  }

  const handleRazorpayClick = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save/update user profile
    if (user) {
      await setUserProfile(user.id, form)
    }
    setShowPayment(true)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate Razorpay payment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Build order object
    const order = {
      buyer: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.zipCode}`
      },
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price
      })),
      total: total,
      status: "processing",
      date: new Date().toISOString(),
      payment: {
        ...paymentForm,
        method: "razorpay-mock"
      }
    }
    try {
      const createdOrder = await createOrder(order)
      await fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: { ...order, id: createdOrder.id },
          customerEmail: order.buyer.email,
        }),
      })
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      })
      clearCart()
      setForm({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        zipCode: ""
      })
      setPaymentForm({ cardNumber: "", expiry: "", cvv: "", cardName: "" })
      setShowPayment(false)
      router.push(`/orders/${createdOrder.id}`)
    } catch (err) {
      toast({ title: "Order failed", description: "There was a problem placing your order. Please try again." })
    }
    setIsProcessing(false)
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before proceeding to checkout.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-playfair mb-8">Checkout</h1>
      <form onSubmit={showPayment ? handlePaymentSubmit : handleRazorpayClick}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" value={form.zipCode} onChange={handleChange} required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information - only show after Razorpay click */}
            {showPayment && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={paymentForm.cardNumber} onChange={handlePaymentChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" value={paymentForm.expiry} onChange={handlePaymentChange} required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" value={paymentForm.cvv} onChange={handlePaymentChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" value={paymentForm.cardName} onChange={handlePaymentChange} required />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>₹{(total * 0.18).toFixed(0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(total * 1.18).toFixed(0)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Place Order */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
                {!showPayment ? (
                  <Button type="button" className="w-full" size="lg" disabled={isProcessing} onClick={handleRazorpayClick}>
                    {isProcessing ? "Processing..." : "Pay with Razorpay"}
                  </Button>
                ) : (
                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Confirm Payment"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

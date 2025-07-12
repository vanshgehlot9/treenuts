"use client"

import { useEffect, useState } from "react"
import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAllOrders } from "@/lib/firebase"
import { Package, MapPin, Truck, CheckCircle, Clock } from "lucide-react"

const getStatusIcon = (status) => {
  switch (status) {
    case "delivered": return <CheckCircle className="h-5 w-5 text-green-600" />
    case "shipped": return <Truck className="h-5 w-5 text-blue-600" />
    case "processing": return <Clock className="h-5 w-5 text-amber-600" />
    default: return <Package className="h-5 w-5 text-gray-600" />
  }
}

export default function OrderDetailsPage({ params }) {
  const resolvedParams = React.use(params)
  const { orderId } = resolvedParams
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true)
      const allOrders = await getAllOrders()
      const found = allOrders.find(o => o.id === orderId)
      setOrder(found)
      setLoading(false)
    }
    fetchOrder()
  }, [orderId])

  if (loading) return <div className="container px-4 py-8 text-center">Loading order...</div>
  if (!order) return <div className="container px-4 py-8 text-center">Order not found.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              {getStatusIcon(order.status)}
              <div>
                <CardTitle className="text-lg font-playfair ethnic-text">Order {order.id}</CardTitle>
                <CardDescription className="text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Buyer:</h4>
                <div className="text-sm text-gray-600">{order.buyer?.name} ({order.buyer?.email})</div>
                <div className="text-sm text-gray-600">{order.buyer?.phone}</div>
                <div className="text-sm text-gray-600 flex items-center"><MapPin className="h-4 w-4 mr-1" />{order.buyer?.address}</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} × {item.qty}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span>{order.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
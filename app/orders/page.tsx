"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  ShoppingBag,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getOrdersForUser } from "@/lib/firebase"

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "shipped":
      return <Truck className="h-5 w-5 text-blue-600" />
    case "processing":
      return <Clock className="h-5 w-5 text-amber-600" />
    default:
      return <Package className="h-5 w-5 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
    case "shipped":
      return <Badge className="bg-blue-100 text-blue-800">Shipped</Badge>
    case "processing":
      return <Badge className="bg-amber-100 text-amber-800">Processing</Badge>
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    async function fetchOrders() {
      setLoading(true)
      const userOrders = await getOrdersForUser(user.email)
      setOrders(userOrders)
      setLoading(false)
    }
    fetchOrders()
  }, [user, router])

  if (!user) {
    return null
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading orders...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Orders Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold font-playfair ethnic-text bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              My Orders
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your orders and view your purchase history
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <CardTitle className="text-lg font-playfair ethnic-text">
                        Order {order.id}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-amber-700">
                      ₹{order.total}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} × {item.qty}
                          </span>
                          <span className="font-medium">
                            ₹{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Shipping Address:
                    </h4>
                    <p className="text-sm text-gray-600">{order.buyer?.address}</p>
                  </div>

                  {/* Tracking (optional, if you add it to your order model) */}
                  {order.tracking && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Tracking Number:</h4>
                      <p className="text-sm text-gray-600 font-mono">{order.tracking}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                    <Button variant="outline" size="sm" className="border-amber-200 text-amber-600 hover:bg-amber-50">
                      <Package className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.tracking && (
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && !loading && (
          <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
            <CardContent className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start shopping to see your orders here!
              </p>
              <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 
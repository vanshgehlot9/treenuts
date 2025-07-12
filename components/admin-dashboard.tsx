"use client"

import { useEffect, useState } from "react"
import { getAllProducts, getAllOrders, getMessages } from "@/lib/firebase"

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [productsSold, setProductsSold] = useState(0)
  const [returns, setReturns] = useState(0)
  const [buyerMessages, setBuyerMessages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getAllProducts(),
      getAllOrders(),
      getMessages()
    ]).then(([products, orders, messages]) => {
      setProductCount(products.length)
      setOrderCount(orders.length)
      setProductsSold(orders.reduce((sum, o) => sum + (o.status.toLowerCase().includes("return") ? 0 : o.items.reduce((s, i) => s + i.qty, 0)), 0))
      setReturns(orders.filter(o => o.status.toLowerCase().includes("return")).length)
      setBuyerMessages(messages.length)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {loading && <div className="text-center py-8 text-gray-500">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-4xl font-bold text-amber-700">{productCount}</div>
          <div className="mt-2 text-gray-600">Total Products</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-4xl font-bold text-blue-700">{orderCount}</div>
          <div className="mt-2 text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-4xl font-bold text-green-700">{productsSold}</div>
          <div className="mt-2 text-gray-600">Products Sold</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-4xl font-bold text-red-700">{returns}</div>
          <div className="mt-2 text-gray-600">Returns</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 text-center max-w-xs mx-auto">
        <div className="text-3xl font-bold text-amber-600">{buyerMessages}</div>
        <div className="mt-2 text-gray-600">Buyer Messages</div>
      </div>
    </div>
  )
} 
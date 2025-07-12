"use client"

import { useState, useEffect } from "react"
import { getAllOrders, deleteOrder, Order, updateOrder } from "@/lib/firebase"
import type { Order } from '@/lib/firebase'
// Send email via custom API route using Gmail SMTP
async function sendOrderConfirmationEmail(order: Order, status: string) {
  const res = await fetch('/api/send-order-confirmation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order, status })
  })
  if (!res.ok) throw new Error('Failed to send email')
}

export default function AdminOrders() {
  const [search, setSearch] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [viewOrder, setViewOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllOrders().then(orders => {
      setOrders(orders)
      setLoading(false)
    })
  }, [])

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.buyer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.items.map(i => i.name).join(", ").toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteOrder(id)
    setOrders(orders.filter(o => o.id !== id))
    if (viewOrder && viewOrder.id === id) setViewOrder(null)
    setLoading(false)
  }

  const handleStatusUpdate = async (order: Order, status: string) => {
    setLoading(true)
    await updateOrder(order.id, { status })
    setOrders(orders.map(o => o.id === order.id ? { ...o, status } : o))
    setViewOrder(viewOrder && viewOrder.id === order.id ? { ...viewOrder, status } : viewOrder)
    // Send email to customer and admin
    if (status === 'confirmed') {
      await sendOrderConfirmationEmail(order, status)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="mb-6">
        <input
          type="text"
          className="input"
          placeholder="Search by order ID, buyer, product, status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading && <div className="text-center py-8 text-gray-500">Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Buyer</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Total (₹)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.buyer.name}</td>
                <td className="px-4 py-2">{order.items.map(i => i.name).join(", ")}</td>
                <td className="px-4 py-2">{order.items.reduce((sum, i) => sum + i.qty, 0)}</td>
                <td className="px-4 py-2">₹{order.total}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{typeof order.date === "string" ? order.date.slice(0, 10) : order.date.toDate().toISOString().slice(0, 10)}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => setViewOrder(order)}>View</button>
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleStatusUpdate(order, 'confirmed')}>Confirm</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleStatusUpdate(order, 'declined')}>Decline</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl" onClick={() => setViewOrder(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="mb-2"><b>Order ID:</b> {viewOrder.id}</div>
            <div className="mb-2"><b>Buyer:</b> {viewOrder.buyer.name}</div>
            <div className="mb-2"><b>Email:</b> {viewOrder.buyer.email}</div>
            <div className="mb-2"><b>Phone:</b> {viewOrder.buyer.phone}</div>
            <div className="mb-2"><b>Address:</b> {viewOrder.buyer.address}</div>
            <div className="mb-2"><b>Products:</b>
              <ul className="list-disc ml-6">
                {viewOrder.items.map(i => (
                  <li key={i.productId}>{i.name} (Qty: {i.qty}, Price: ₹{i.price})</li>
                ))}
              </ul>
            </div>
            <div className="mb-2"><b>Total:</b> ₹{viewOrder.total}</div>
            <div className="mb-2"><b>Status:</b> {viewOrder.status}</div>
            <div className="mb-2"><b>Date:</b> {typeof viewOrder.date === "string" ? viewOrder.date.slice(0, 10) : viewOrder.date.toDate().toISOString().slice(0, 10)}</div>
          </div>
        </div>
      )}
    </div>
  )
} 
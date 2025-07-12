"use client"

import { useEffect, useState } from "react"
import { getAllOrders, Order } from "@/lib/firebase"

function getMonthYear(date: string) {
  const d = new Date(date)
  return d.toLocaleString("default", { month: "long", year: "numeric" })
}

export default function AdminReports() {
  const [reports, setReports] = useState<{ month: string, sales: number, returns: number, revenue: number }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllOrders().then(orders => {
      // Group by month
      const map = new Map<string, { sales: number, returns: number, revenue: number }>()
      orders.forEach(order => {
        const month = getMonthYear(typeof order.date === "string" ? order.date : order.date.toDate().toISOString())
        const isReturn = order.status.toLowerCase().includes("return")
        if (!map.has(month)) map.set(month, { sales: 0, returns: 0, revenue: 0 })
        if (isReturn) {
          map.get(month)!.returns += 1
        } else {
          map.get(month)!.sales += 1
          map.get(month)!.revenue += order.total
        }
      })
      setReports(Array.from(map.entries()).map(([month, data]) => ({ month, ...data })))
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monthly Reports</h1>
      <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 mb-6" disabled>Generate Report</button>
      {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Sales</th>
              <th className="px-4 py-2">Returns</th>
              <th className="px-4 py-2">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.month} className="border-t">
                <td className="px-4 py-2">{r.month}</td>
                <td className="px-4 py-2">{r.sales}</td>
                <td className="px-4 py-2">{r.returns}</td>
                <td className="px-4 py-2">₹{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
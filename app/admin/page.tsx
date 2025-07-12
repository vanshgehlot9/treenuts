"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import AdminProducts from "@/components/admin-products"
import AdminDashboard from "@/components/admin-dashboard"
import AdminOrders from "@/components/admin-orders"
import AdminKeywords from "@/components/admin-keywords"
import AdminInventory from "@/components/admin-inventory"
import AdminReports from "@/components/admin-reports"

const TABS = ["dashboard", "orders", "products", "keywords", "inventory", "reports"]

function getTabContent(tab: string) {
  switch (tab) {
    case "dashboard":
      return <AdminDashboard />
    case "orders":
      return <AdminOrders />
    case "products":
      return <AdminProducts />
    case "keywords":
      return <AdminKeywords />
    case "inventory":
      return <AdminInventory />
    case "reports":
      return <AdminReports />
    default:
      return <AdminDashboard />
  }
}

function AdminContent() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const tab = (searchParams.get("tab") || "dashboard").toLowerCase()
  const activeTab = TABS.includes(tab) ? tab : "dashboard"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin2025") {
      setLoggedIn(true)
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-xs">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            className="input mb-4"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded w-full hover:bg-amber-700">Login</button>
        </form>
      </div>
    )
  }

  return (
    <AdminLayout activeTab={activeTab}>
      {getTabContent(activeTab)}
    </AdminLayout>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading admin panel...</p>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  )
} 
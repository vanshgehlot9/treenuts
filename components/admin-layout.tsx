import Link from "next/link"
import { ReactNode } from "react"

const navItems = [
  { href: "/admin?tab=dashboard", label: "Dashboard" },
  { href: "/admin?tab=orders", label: "Orders" },
  { href: "/admin?tab=products", label: "Product Listing" },
  { href: "/admin?tab=keywords", label: "Keywords" },
  { href: "/admin?tab=inventory", label: "Inventory Management" },
  { href: "/admin?tab=reports", label: "Monthly Reports" },
]

export function AdminLayout({ children, activeTab }: { children: ReactNode, activeTab: string }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 font-bold text-xl text-amber-700 border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded hover:bg-amber-50 font-medium ${activeTab === item.label.toLowerCase().replace(/ /g, "") ? "bg-amber-100 text-amber-700" : "text-gray-700"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
} 
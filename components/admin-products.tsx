"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Product, getAllProducts, deleteProduct } from "@/lib/firebase"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  // Filtered products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.gstNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.hsnCode.toLowerCase().includes(search.toLowerCase())
  )

  // Export CSV
  const handleExportCSV = () => {
    const header = [
      "Name", "Description", "Category", "GST Number", "HSN Code", "Tax", "Shipping", "Variants", "Created By"
    ]
    const rows = filtered.map(p => [
      p.name,
      p.description,
      p.category,
      p.gstNumber,
      p.hsnCode,
      p.tax,
      p.shipping,
      p.variants.map(v => `${v.weight}:${v.price}`).join("|"),
      p.createdBy
    ])
    const csv = [header, ...rows].map(r => r.map(x => `"${x}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "products.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product Listing</h1>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">Export CSV</button>
          <a href="/admin/products/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</a>
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          className="input"
          placeholder="Search by name, category, GST, HSN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">GST No</th>
              <th className="px-4 py-2">HSN Code</th>
              <th className="px-4 py-2">Tax (%)</th>
              <th className="px-4 py-2">Shipping</th>
              <th className="px-4 py-2">Variants</th>
              <th className="px-4 py-2">Added By</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(prod => (
              <tr key={prod.id} className="border-t">
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    {prod.images?.map((img, idx) => (
                      <Image key={idx} src={img} alt={prod.name} width={48} height={48} className="rounded" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2">{prod.gstNumber}</td>
                <td className="px-4 py-2">{prod.hsnCode}</td>
                <td className="px-4 py-2">{prod.tax}</td>
                <td className="px-4 py-2">{prod.shipping}</td>
                <td className="px-4 py-2">
                  <ul>
                    {prod.variants.map(v => (
                      <li key={v.weight}>{v.weight}: ₹{v.price}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2">{prod.createdBy}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <a href={`/admin/products/${prod.id}/edit`} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</a>
                    <button onClick={() => handleDelete(prod.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
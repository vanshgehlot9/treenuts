"use client"

import { useEffect, useState } from "react"
import { getAllProducts, updateProduct, Product } from "@/lib/firebase"

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [bulkStock, setBulkStock] = useState<{ [key: string]: number }>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch all products from Firestore
    getAllProducts().then(setProducts)
  }, [])

  // Compute analytics
  const allVariants = products
    .filter(p => Array.isArray(p?.variants))
    .flatMap(p => p.variants.map(v => ({ ...v, product: p.name })))
  const totalStock = allVariants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
  const lowStockVariants = allVariants.filter(v => (v.stock ?? 0) < 5)
  const inventoryValue = allVariants.reduce((sum, v) => sum + ((v.stock ?? 0) * (v.price ?? 0)), 0)

  // Bulk update stock handler
  const handleBulkSave = async () => {
    setLoading(true)
    try {
      for (const key in bulkStock) {
        const [productId, weight] = key.split("__")
        const product = products.find(p => p.id === productId)
        if (!product) continue
        const updatedVariants = product.variants.map(v =>
          v.weight === weight ? { ...v, stock: bulkStock[key] } : v
        )
        await updateProduct(productId, { variants: updatedVariants })
      }
      // Refresh products
      const updated = await getAllProducts()
      setProducts(updated)
      setBulkStock({})
      setToast({ type: 'success', message: 'Bulk stock update successful!' })
      setTimeout(() => setToast(null), 3000)
    } catch (err) {
      setToast({ type: 'error', message: 'Bulk stock update failed.' })
      setTimeout(() => setToast(null), 3000)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      {/* Render analytics at the top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-2xl font-bold text-amber-700">{totalStock}</div>
          <div className="mt-2 text-gray-600">Total Stock</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-2xl font-bold text-red-700">{lowStockVariants.length}</div>
          <div className="mt-2 text-gray-600">Low Stock Variants (&lt; 5)</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-2xl font-bold text-green-700">₹{inventoryValue}</div>
          <div className="mt-2 text-gray-600">Inventory Value</div>
        </div>
      </div>
      {/* Bulk Save All button */}
      {Object.keys(bulkStock).length > 0 && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={handleBulkSave}
          disabled={loading}
        >Save All</button>
      )}
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Variant</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Update Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              Array.isArray(product.variants)
                ? product.variants.map((variant) => (
                    <tr key={product.id + variant.weight} className={`border-t ${((variant.stock ?? 0) < 5) ? 'bg-red-50' : ''}`}>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{variant.weight}</td>
                      <td className="px-4 py-2">{variant.stock ?? 0}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="input w-24"
                          value={bulkStock[`${product.id}__${variant.weight}`] ?? variant.stock ?? 0}
                          min={0}
                          onChange={e => setBulkStock(bs => ({ ...bs, [`${product.id}__${variant.weight}`]: Number(e.target.value) }))}
                          disabled={loading}
                        />
                      </td>
                    </tr>
                  ))
                : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
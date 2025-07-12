"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getProductById, updateProduct, uploadProductImage } from "@/lib/firebase"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'

const initialProduct = {
  name: "",
  description: "",
  category: "",
  images: [] as string[],
  imageFiles: [] as File[],
  gstNumber: "08CYZPJ048Q1Z9",
  hsnCode: "",
  tax: 0,
  shipping: "",
  variants: [
    { weight: '250gm', price: 0, stock: 0, sku: '', originalPrice: 0, discountPrice: 0 },
    { weight: '500gm', price: 0, stock: 0, sku: '', originalPrice: 0, discountPrice: 0 },
  ],
  status: "active",
  tags: [] as string[],
  seoTitle: "",
  seoDescription: "",
  keyFeatures: "",
  nutritionInfo: "",
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string
  const [product, setProduct] = useState(initialProduct)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!productId) return
    getProductById(productId).then((prod: any) => {
      if (!prod) return
      setProduct({ ...prod, imageFiles: [] })
      setImagePreviews(prod.images || [])
      setFetched(true)
    })
  }, [productId])

  const validateProduct = (prod: typeof product) => {
    const errs: any = {}
    if (!(prod.name || "").trim()) errs.name = 'Title is required.'
    if (!(prod.description || "").trim()) errs.description = 'Description is required.'
    if (!(prod.category || "").trim()) errs.category = 'Category is required.'
    if (!(prod.hsnCode || "").trim()) errs.hsnCode = 'HSN Code is required.'
    const imageCount = (prod.images?.length || 0) + (prod.imageFiles?.length || 0);
    if (imageCount < 3) errs.images = 'At least 3 images are required.'
    if (!prod.variants.length) errs.variants = 'At least one variant is required.'
    if (!prod.variants.every(v => v.price > 0)) errs.variants = 'All variants must have a price.'
    if (!(prod.seoTitle || "").trim()) errs.seoTitle = 'SEO title is required.'
    if (!(prod.seoDescription || "").trim()) errs.seoDescription = 'SEO description is required.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateProduct(product)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      alert("Please fix the errors in the form before updating.")
      return
    }
    setLoading(true)
    try {
      let images: string[] = product.images
      if (product.imageFiles && product.imageFiles.length) {
        images = [
          ...product.images,
          ...await Promise.all(product.imageFiles.map(file => uploadProductImage(file)))
        ]
      }
      const safeVariants = product.variants.map(v => ({
        ...v,
        weight: v.weight as '250gm' | '500gm',
        price: v.price ?? 0,
        originalPrice: v.originalPrice ?? 0,
        discountPrice: v.discountPrice ?? 0,
        stock: v.stock ?? 0,
        sku: v.sku ?? "",
      }))
      // Only send fields that are required and non-empty
      const updatedProduct = {
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        hsnCode: product.hsnCode || "",
        gstNumber: product.gstNumber || "",
        tax: product.tax ?? 0,
        shipping: product.shipping || "",
        images,
        variants: safeVariants,
        status: product.status || "active",
        tags: product.tags || [],
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
        keyFeatures: product.keyFeatures || "",
        nutritionInfo: product.nutritionInfo || "",
        price: safeVariants[0]?.price ?? 0,
        originalPrice: safeVariants[0]?.originalPrice ?? 0,
        rating: product.rating ?? 0,
        reviewCount: product.reviewCount ?? 0,
        badge: product.badge || "",
        createdBy: product.createdBy || "admin",
      }
      console.log("Updating product with:", updatedProduct)
      await updateProduct(productId, updatedProduct)
      alert("Product updated successfully!")
      router.push("/admin?tab=products")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product. Please try again.\n" + (error?.message || error))
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setProduct((p) => ({ ...p, imageFiles: [...(p.imageFiles || []), ...files] }))
    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    })
    Promise.all(readers).then(newPreviews => {
      setImagePreviews(prev => [...prev, ...newPreviews])
    })
  }

  const editor = useEditor({
    extensions: [StarterKit, Link, Bold, Italic, Underline, ListItem, BulletList, OrderedList],
    content: product.description,
    onUpdate: ({ editor }) => {
      setProduct(p => ({ ...p, description: editor.getHTML() }))
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && fetched) {
      editor.commands.setContent(product.description || "")
    }
  }, [editor, fetched])

  if (!fetched) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-8">
      <a href="/admin?tab=products" className="inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">← Back</a>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow space-y-8">
        {/* Product Title */}
        <div>
          <label className="block font-semibold mb-1">Product Title</label>
          <input type="text" className="input w-full" required value={product.name} onChange={e => setProduct(p => ({ ...p, name: e.target.value }))} />
          {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
        </div>
        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <div className="border rounded bg-white p-2 min-h-[120px]">
            <EditorContent editor={editor} />
          </div>
          {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
        </div>
        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select 
            className="input w-full" 
            required 
            value={product.category} 
            onChange={e => setProduct(p => ({ ...p, category: e.target.value }))}
          >
            <option value="">Select a category</option>
            <option value="Dry Fruits & Nuts">Dry Fruits & Nuts</option>
            <option value="Spices">Spices</option>
            <option value="Seeds">Seeds</option>
          </select>
          {errors.category && <div className="text-red-600 text-xs mt-1">{errors.category}</div>}
        </div>
        {/* HSN Code Section */}
        <div>
          <label className="block font-semibold mb-1">HSN Code</label>
          <input
            type="text"
            className="input w-full"
            value={product.hsnCode || ""}
            onChange={e => setProduct(p => ({ ...p, hsnCode: e.target.value }))}
            required
          />
          {errors.hsnCode && <div className="text-red-600 text-xs mt-1">{errors.hsnCode}</div>}
        </div>
        {/* Key Features */}
        <div>
          <label className="block font-semibold mb-1">Key Features</label>
          <textarea
            className="input w-full min-h-[80px]"
            placeholder="Enter key features of the product (one per line or separated by commas)"
            value={product.keyFeatures}
            onChange={e => setProduct(p => ({ ...p, keyFeatures: e.target.value }))}
          />
        </div>
        {/* Nutrition Information */}
        <div>
          <label className="block font-semibold mb-1">Nutrition Information</label>
          <textarea
            className="input w-full min-h-[100px]"
            placeholder="Enter nutrition information (e.g., calories, protein, fat, etc.)"
            value={product.nutritionInfo}
            onChange={e => setProduct(p => ({ ...p, nutritionInfo: e.target.value }))}
          />
        </div>
        {/* Image Upload & Gallery */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center mb-2 bg-gray-50">
            <input type="file" accept="image/*" multiple className="hidden" id="product-images" onChange={handleImageChange} />
            <label htmlFor="product-images" className="cursor-pointer text-amber-700 font-medium">Click or drag images here to upload</label>
          </div>
          <div className="flex gap-2 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="preview" className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
          {errors.images && <div className="text-red-600 text-xs mt-1">{errors.images}</div>}
        </div>
        {/* Variants Section */}
        <div>
          <label className="block font-semibold mb-1">Variants</label>
          <div className="space-y-4">
            {product.variants.map((variant, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-end gap-4 border p-4 rounded">
                <div>
                  <label className="block text-sm font-medium">Weight</label>
                  <input
                    type="text"
                    className="input"
                    value={variant.weight}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].weight = e.target.value
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Price (INR)</label>
                  <input
                    type="number"
                    className="input"
                    min={0}
                    value={variant.price ?? ""}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].price = Number(e.target.value)
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Original Price (INR)</label>
                  <input
                    type="number"
                    className="input"
                    min={0}
                    value={variant.originalPrice ?? ""}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].originalPrice = Number(e.target.value)
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Discount Price (INR)</label>
                  <input
                    type="number"
                    className="input"
                    min={0}
                    value={variant.discountPrice ?? ""}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].discountPrice = Number(e.target.value)
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Stock</label>
                  <input
                    type="number"
                    className="input"
                    min={0}
                    value={variant.stock ?? ""}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].stock = Number(e.target.value)
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SKU</label>
                  <input
                    type="text"
                    className="input"
                    value={variant.sku}
                    onChange={e => {
                      const variants = [...product.variants]
                      variants[idx].sku = e.target.value
                      setProduct(p => ({ ...p, variants }))
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Save Button */}
        <div className="sticky bottom-0 bg-white pt-4 pb-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  )
} 
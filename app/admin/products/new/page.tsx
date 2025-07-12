"use client"

import { useState } from "react"
import { Product, addProduct, uploadProductImage } from "@/lib/firebase"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
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

export default function AddProductPage() {
  const [product, setProduct] = useState(initialProduct)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const validateProduct = (prod: typeof product) => {
    const errs: any = {}
    if (!prod.name.trim()) errs.name = 'Title is required.'
    if (!prod.description.trim()) errs.description = 'Description is required.'
    if (!prod.category.trim()) errs.category = 'Category is required.'
    const imageCount = (prod.images?.length || 0) + (prod.imageFiles?.length || 0);
    if (imageCount < 3) errs.images = 'At least 3 images are required.'
    if (!prod.variants.length) errs.variants = 'At least one variant is required.'
    if (!prod.variants.every(v => v.price > 0)) errs.variants = 'All variants must have a price.'
    if (!prod.seoTitle.trim()) errs.seoTitle = 'SEO title is required.'
    if (!prod.seoDescription.trim()) errs.seoDescription = 'SEO description is required.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateProduct(product)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    
    try {
      let images: string[] = product.images
      if (product.imageFiles && product.imageFiles.length) {
        images = await Promise.all(product.imageFiles.map(file => uploadProductImage(file)))
      }
      const safeVariants = product.variants.map(v => ({
        ...v,
        weight: v.weight as '250gm' | '500gm',
      }))
      const newProduct = {
        ...product,
        images,
        createdBy: "admin",
        variants: safeVariants,
        // Add missing required fields with default values
        price: safeVariants[0]?.price || 0,
        originalPrice: product.originalPrice || null,
        rating: 0,
        reviewCount: 0,
        badge: "",
      }
      const { imageFiles, ...productData } = newProduct
      await addProduct(productData)
      setProduct(initialProduct)
      setImagePreviews([])
      alert("Product added successfully!")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Error adding product. Please try again.")
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

  return (
    <div className="max-w-3xl mx-auto p-8">
      <a href="/admin?tab=products" className="inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">← Back</a>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
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
        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Product Images</label>
          <div
            className="border-2 border-dashed border-amber-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-amber-50 hover:bg-amber-100 transition relative min-h-[140px] mb-2"
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={e => {
              e.preventDefault();
              e.stopPropagation();
              const files = Array.from(e.dataTransfer.files || [])
              if (!files.length) return
              setProduct(p => ({ ...p, imageFiles: [...(p.imageFiles || []), ...files] }))
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
            }}
            onClick={() => document.getElementById('product-images')?.click()}
          >
            <input
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-amber-700 font-medium text-center select-none">
              Click or drag images here to upload
            </span>
            <span className="text-xs text-gray-500 mt-1">(At least 3 images required)</span>
          </div>
          {errors.images && <div className="text-red-600 text-xs mt-1">{errors.images}</div>}
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="w-24 h-24 relative border rounded overflow-hidden bg-white shadow">
                  <img src={src} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
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
        {/* Pricing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">GST Number</label>
            <input type="text" className="input w-full" required value={product.gstNumber} onChange={e => setProduct(p => ({ ...p, gstNumber: e.target.value }))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">HSN Code</label>
            <input type="text" className="input w-full" required value={product.hsnCode} onChange={e => setProduct(p => ({ ...p, hsnCode: e.target.value }))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Tax (%)</label>
            <input type="number" className="input w-full" required min={0} value={product.tax} onChange={e => setProduct(p => ({ ...p, tax: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Shipping Info</label>
            <input type="text" className="input w-full" required value={product.shipping} onChange={e => setProduct(p => ({ ...p, shipping: e.target.value }))} />
          </div>
        </div>
        {/* SEO Title */}
        <div>
          <label className="block font-semibold mb-1">SEO Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="SEO title"
            value={product.seoTitle}
            onChange={e => setProduct(p => ({ ...p, seoTitle: e.target.value }))}
            maxLength={60}
          />
          <div className="text-xs text-gray-500">{product.seoTitle.length}/60 characters</div>
          {errors.seoTitle && <div className="text-red-600 text-xs mt-1">{errors.seoTitle}</div>}
        </div>
        {/* SEO Description */}
        <div>
          <label className="block font-semibold mb-1">SEO Description</label>
          <textarea
            className="input w-full min-h-[60px]"
            placeholder="SEO description"
            value={product.seoDescription}
            onChange={e => setProduct(p => ({ ...p, seoDescription: e.target.value }))}
            maxLength={160}
          />
          <div className="text-xs text-gray-500">{product.seoDescription.length}/160 characters</div>
          {errors.seoDescription && <div className="text-red-600 text-xs mt-1">{errors.seoDescription}</div>}
        </div>
        {/* Google preview (optional) */}
        <div className="border rounded bg-gray-50 p-3 mt-2">
          <div className="text-blue-700 text-sm font-medium">{product.seoTitle || 'SEO Title Preview'}</div>
          <div className="text-green-700 text-xs">https://treenuts.com/products/{product.name.toLowerCase().replace(/\s+/g, '-') || 'product'}</div>
          <div className="text-gray-700 text-sm">{product.seoDescription || 'SEO description preview...'}</div>
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
                    value={variant.price}
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
                    value={variant.originalPrice}
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
                    value={variant.discountPrice}
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
                    value={variant.stock}
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
          <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 w-full" disabled={loading}>{loading ? "Adding..." : "Add Product"}</button>
        </div>
      </form>
    </div>
  )
} 
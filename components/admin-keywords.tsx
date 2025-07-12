"use client"

import { useState, useEffect } from "react"
import { getKeywords, addKeyword, deleteKeyword } from "@/lib/firebase"

export default function AdminKeywords() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [newKeyword, setNewKeyword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getKeywords().then(ks => {
      setKeywords(ks)
      setLoading(false)
    })
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim().toLowerCase())) {
      setLoading(true)
      await addKeyword(newKeyword.trim().toLowerCase())
      const ks = await getKeywords()
      setKeywords(ks)
      setNewKeyword("")
      setLoading(false)
    }
  }
  const handleDelete = async (kw: string) => {
    setLoading(true)
    await deleteKeyword(kw)
    setKeywords(keywords.filter(k => k !== kw))
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Keywords</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          className="input"
          placeholder="Add new keyword"
          value={newKeyword}
          onChange={e => setNewKeyword(e.target.value)}
        />
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700" disabled={loading}>Add</button>
      </form>
      {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
      <ul className="bg-white rounded shadow p-4">
        {keywords.map(kw => (
          <li key={kw} className="flex items-center justify-between border-b last:border-b-0 py-2">
            <span>{kw}</span>
            <button onClick={() => handleDelete(kw)} className="bg-red-600 text-white px-2 py-1 rounded" disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
} 
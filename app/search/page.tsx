"use client"

import { Suspense } from "react"
import { SearchResults } from "./search-results"

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading search...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
} 
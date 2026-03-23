import { useState } from 'react'

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

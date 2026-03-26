'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    onSearch(city)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Digite o nome da cidade..."
        className="w-full max-w-md px-4 py-2 text-white bg-white/10 rounded-full border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="px-5 py-2 bg-blue-500 hover:bg-blue-400 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}

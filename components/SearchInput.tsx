'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import debounce from 'lodash.debounce'
import { Input } from '@/components/ui/input'

export const SearchInput = () => {
  const [term, setTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()
  const fetchSuggestionsRef = useRef<ReturnType<typeof debounce> | null>(null)

  useEffect(() => {
    fetchSuggestionsRef.current = debounce(async (value: string) => {
      if (!value.trim()) {
        setSuggestions([])
        return
      }
      try {
        const res = await fetch(`/api/search-suggestions?q=${value}`)
        const data = await res.json()
        setSuggestions(data.results)
      } catch (error) {
        console.error('Suggestion fetch error:', error)
        setSuggestions([])
      }
    }, 300)

    return () => {
      fetchSuggestionsRef.current?.cancel()
    }
  }, [])

  useEffect(() => {
    fetchSuggestionsRef.current?.(term)
  }, [term])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term)}`)
      setSuggestions([])
    }
  }

  return (
    <div className="flex flex-col gap-2 w-2/5 rounded-lg">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          className="bg-card focus-visible:ring-[2px]"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 top-[calc(100%+3px)] flex flex-col gap-3 p-3 w-full bg-card border-1 border-input rounded">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(s)}`)
                  setSuggestions([])
                }}
                className="hover:text-[var(--primary)] cursor-pointer transition-all"
              >
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}

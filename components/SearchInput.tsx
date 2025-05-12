'use client'

import Image from 'next/image'
import debounce from 'lodash.debounce'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Suggestion } from '@/interfaces/ui'

export const SearchInput = () => {
  const [term, setTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
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
          <ul className="absolute z-10 top-[calc(100%+3px)] flex flex-col w-full bg-card border border-input rounded">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(s.title)}`)
                  setSuggestions([])
                }}
                className="flex items-center gap-3 p-3 text-sm hover:bg-muted cursor-pointer transition-all rounded hover:bg-[var(--secondary)]"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  width={40}
                  height={40}
                  className="object-contain rounded"
                />
                <span>{s.title}</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}

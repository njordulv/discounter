'use client'

import Image from 'next/image'
import debounce from 'lodash.debounce'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TbX } from 'react-icons/tb'
import { Input } from '@/components/ui/input'
import { Suggestion } from '@/interfaces/ui'
import { shortenText } from '@/utils'
import config from '@/config'

export const SearchInput = () => {
  const [term, setTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const router = useRouter()
  const fetchSuggestionsRef = useRef<ReturnType<typeof debounce> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term)}`)
      setSuggestions([])
    }
  }

  const handleClear = () => {
    setTerm('')
    setSuggestions([])
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2 w-2/5 rounded-lg">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder={config.search.placeholder}
          className="bg-card focus-visible:ring-[2px] focus-visible:ring-[var(--accent)]"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => {
            if (term.trim() && suggestions.length === 0) {
              fetchSuggestionsRef.current?.(term)
            }
          }}
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 top-[calc(100%+3px)] flex flex-col w-full bg-card border border-input rounded">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(item.title)}`)
                  setSuggestions([])
                }}
                className="flex items-center gap-3 p-3 text-sm hover:bg-muted cursor-pointer transition-all rounded hover:bg-[var(--secondary)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain rounded"
                />
                <span>{shortenText(item.title, 80)}</span>
              </li>
            ))}
          </ul>
        )}
        {term.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 hover:text-[var(--primary)] cursor-pointer transition-all"
          >
            <TbX className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  )
}

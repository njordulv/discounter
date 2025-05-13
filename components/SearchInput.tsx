'use client'

import Image from 'next/image'
import debounce from 'lodash.debounce'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TbX, TbZoom, TbLoader2 } from 'react-icons/tb'
import { motion as m } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Suggestion } from '@/interfaces/ui'
import { shortenText } from '@/utils'
import config from '@/config'

export const SearchInput = () => {
  const [term, setTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const fetchSuggestionsRef = useRef<ReturnType<typeof debounce> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchSuggestionsRef.current = debounce(async (value: string) => {
      if (!value.trim()) {
        setSuggestions([])
        setLoading(false)
        return
      }

      setLoading(true)

      const MIN_LOADING_TIME = 400
      const start = Date.now()

      try {
        const res = await fetch(`/api/search-suggestions?q=${value}`)
        const data = await res.json()

        const elapsed = Date.now() - start
        const delay = Math.max(MIN_LOADING_TIME - elapsed, 0)

        await new Promise((resolve) => setTimeout(resolve, delay))

        setSuggestions(data.results)
      } catch (error) {
        console.error('Suggestion fetch error:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
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
        setLoading(false)
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
      setLoading(false)
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
          className="bg-card px-8 focus-visible:ring-[2px] focus-visible:ring-[var(--accent)]"
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

        <m.div
          key="clear-button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            term.length > 0
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: term.length > 0 ? 'auto' : 'none' }}
          className="absolute right-2 top-2 flex items-center"
        >
          <button
            type="button"
            onClick={handleClear}
            className="text-xl hover:text-[var(--primary)] cursor-pointer transition-all"
          >
            <TbX />
          </button>
        </m.div>

        <m.div
          key="loader"
          initial={{ opacity: 1, scale: 0.97 }}
          animate={
            loading ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.97 }
          }
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.1 }}
          className="absolute left-2 top-2 text-xl text-muted-foreground"
        >
          {loading ? <TbLoader2 className="animate-spin" /> : <TbZoom />}
        </m.div>
      </form>
    </div>
  )
}

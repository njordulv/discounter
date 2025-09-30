'use client'

import Image from 'next/image'
import debounce from 'lodash.debounce'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TbX, TbZoom, TbLoader2 } from 'react-icons/tb'
import { motion as m, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { shortenText } from '@/utils'
import { cn } from '@/lib/utils'
import type { Suggestion } from '@/interfaces/ui'
import styles from '@/styles/Search.module.scss'
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
    <div ref={containerRef} className={styles.search}>
      <form onSubmit={handleSubmit} className={styles.search__form}>
        <Input
          type="text"
          name="search-input"
          placeholder={config.search.placeholder}
          className={cn(
            'focus-visible:ring-[var(--accent)] focus-visible:ring-[0px]',
            styles.search__input
          )}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => {
            if (term.trim() && suggestions.length === 0) {
              fetchSuggestionsRef.current?.(term)
            }
          }}
        />
        <AnimatePresence mode="wait">
          {suggestions.length > 0 && (
            <m.ul
              initial={{ opacity: 0, y: -5, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.6,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              className={styles.search__suggestions}
            >
              {suggestions.map((item, index) => (
                <m.li
                  key={item._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{
                    backgroundColor: 'var(--secondary)',
                    scale: 1.02,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  onClick={() => {
                    router.push(`/deals/${item._id}`)
                    setSuggestions([])
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className={styles.search__image}
                  />
                  <span>{shortenText(item.title, 80)}</span>
                </m.li>
              ))}
            </m.ul>
          )}
        </AnimatePresence>

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
          className={styles.search__clear}
        >
          <button
            type="button"
            onClick={handleClear}
            className={styles.search__clear__button}
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
          className={styles.search__loader}
        >
          {loading ? <TbLoader2 className="animate-spin" /> : <TbZoom />}
        </m.div>
      </form>
    </div>
  )
}

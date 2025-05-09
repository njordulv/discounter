'use client'

import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState(initialValue)

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(window.location.search)

        if (value) {
          params.set('search', value)
        } else {
          params.delete('search')
        }

        router.push(`/all-deals?${params.toString()}`)
      }, 400),
    [router]
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchTerm, debouncedSearch])

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Search"
        id="search"
        value={searchTerm}
        className="bg-card focus-visible:ring-[1px]"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default Search

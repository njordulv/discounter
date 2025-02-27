import useSWR from 'swr'

interface FetcherOptions {
  url: string
  params?: Record<string, string | number>
}

const useFetcher = (options: FetcherOptions) => {
  const buildUrl = () => {
    if (!options.params) return options.url

    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(options.params)) {
      params.append(key, String(value))
    }
    return `${options.url}?${params.toString()}`
  }

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error, isLoading } = useSWR(buildUrl(), fetcher)

  return {
    data,
    error: error as Error | undefined,
    isLoading,
  }
}

export default useFetcher

import config from '@/config'

export function normalizeImageUrl(url: string): string {
  url = url.replace(/^https?:/i, 'https://')
  const parts = url.split('://')
  const lastPart = parts.pop() || ''
  return `https://${lastPart}`.replace(/\/+/g, '/')
}

export function getCategoryName(slug: string) {
  return Object.values(config.emag.categories).find((cat) => cat.slug === slug)
    ?.name
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function userAgent() {
  return config.userAgents[Math.floor(Math.random() * config.userAgents.length)]
}

export function getMonthAndYear(options?: {
  month?: string | null
  year?: number | null
}) {
  const date = new Date()

  return {
    month: options?.month ?? date.toLocaleString('en-US', { month: 'long' }),
    year: options?.year ?? date.getFullYear(),
  }
}

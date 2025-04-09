export const PAGINATION = {
  PER_PAGE_DEFAULT: 24,
  PER_PAGE_OPTIONS: ['24', '48', '60'],
} as const

export const CACHE_EXPIRATION = {
  DEFAULT: 60 * 60, // 1 hour
} as const

export const SCRAPER = {
  MAX_PAGES: 15,
} as const

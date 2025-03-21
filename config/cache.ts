export const CACHE_EXPIRATION = 60 * 60 // 1 hour in seconds

export const categoryCacheTimes: Record<string, number> = {
  'Smart Deals': 60 * 30, // 30 minutes
  'Genius Deals': 60 * 60, // 1 hour
  default: 60 * 60, // 1 hour by default
}

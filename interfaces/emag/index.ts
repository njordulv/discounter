export interface DealProps {
  id?: number
  name: string
  image: Image
  url: Url
  offer: Price
}

interface ResizedImage {
  size: string
  url: string
}

interface Image {
  original: string
  resized_images: ResizedImage[]
}

interface Url {
  path: string
  desktop_base: string
  mobile_base: string
}

interface Price {
  price: {
    current: number
    currency: Currency
    discount: {
      percent: number
    }
    lowest_price_30_days: {
      amount: number
    }
  }
}

interface Currency {
  name: {
    default: string
  }
}

export interface ScrapeProps {
  _id?: string
  index?: number
  title: string
  price: number
  oldPrice: number | null
  discount: number
  isGenius?: boolean
  stock: string | null
  stockOut: string
  stockLimited: string
  toOrder: string
  imageUrl: string
  link: string
  timestamp: number
  store: string
}

export interface StockProps {
  stockOut?: string
  stockLimited?: string
  toOrder?: string
  stock?: string | null
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  setAccumulatedData: (data: ScrapeProps[]) => void
  setCurrentPage: (page: number) => void
}

export interface EmagCats {
  name: string
  url: string
}

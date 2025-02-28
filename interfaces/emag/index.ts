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

export interface CardProps {
  title: string
  price: string
  oldPrice: string | null
  discount: string
  imageUrl: string
  link: string
  timestamp: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  setAccumulatedData: (data: CardProps[]) => void
  setCurrentPage: (page: number) => void
}

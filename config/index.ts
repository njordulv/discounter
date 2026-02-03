import { TbHome, TbTag, TbCategory } from 'react-icons/tb'
import { catsConfig } from '@/config/categories'

const config = {
  site: {
    name: 'DiSCOUNTER',
    locale: 'Bulgaria',
    logoLabel: 'Home',
    rel: 'Home',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    labelLight: 'Light Mode',
    labelDark: 'Dark Mode',
  },
  mainMenu: {
    home: {
      name: 'Home',
      slug: '/',
      icon: TbHome,
      scrapeUrl: '',
    },
    deals: {
      name: 'All Deals',
      slug: '/deals',
      icon: TbTag,
      scrapeUrl: '',
    },
    categories: {
      name: 'All Categories',
      slug: '/tag',
      icon: TbCategory,
      scrapeUrl: '',
    },
  },
  categories: {
    ...catsConfig,
  },
  emag: {
    title: 'eMAG',
    url: 'https://www.emag.bg',
    currency: '€',
    smartDeals: 'https://sapi.emag.bg/label-campaign/flash-deals?source_id=',
    errorFetch: 'Error fetching data',
  },
  messages: {
    endOfDeals: 'You have reached the end of the deals',
    failedToLoad: 'Failed to load deals. Please try again.',
  },
  pages: {
    notFound: {
      error: '404',
      title: 'This page could not be found',
      goHome: 'Go to Home',
    },
  },
  pagination: {
    page: 'Page',
    perPage: 'per page',
    productsPerPage: 'Products per page',
  },
  sorting: {
    sortBy: 'Sort by',
    default: 'Popular',
    priceAsc: 'Lowest price',
    priceDesc: 'Highest price',
  },
  card: {
    shop: 'Налично в: ',
  },
  search: {
    placeholder: 'Search deals...',
  },
  imageBase64:
    'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzRhNTU2NSIgZD0iTTE4IDBIMmEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJabS01LjUgNGExLjUgMS41IDAgMSAxIDAgMyAxLjUgMS41IDAgMCAxIDAtM1ptNC4zNzYgMTAuNDgxQTEgMSAwIDAgMSAxNiAxNUg0YTEgMSAwIDAgMS0uODk1LTEuNDQ3bDMuNS03QTEgMSAwIDAgMSA3LjQ2OCA2YS45NjUuOTY1IDAgMCAxIC45LjVsMi43NzUgNC43NTcgMS41NDYtMS44ODdhMSAxIDAgMCAxIDEuNjE4LjFsMi41NDEgNGExIDEgMCAwIDEgLjAyOCAxLjAxMVoiIC8+Cjwvc3ZnPgo=',
  browserConfig: {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  },
}

export default config

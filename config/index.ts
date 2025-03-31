import { TbHome, TbTag, TbCategory } from 'react-icons/tb'
import { catsConfig } from '@/config/categories'

const config = {
  site: {
    name: 'DiSCOUNTER',
    locale: 'Bulgaria',
    logoLabel: 'Home',
    rel: 'Home',
  },
  emag: {
    title: 'eMAG',
    url: 'https://www.emag.bg',
    smartDeals: 'https://sapi.emag.bg/label-campaign/flash-deals?source_id=',
    errorFetch: 'Error fetching data',
    mainMenu: {
      home: {
        name: 'Home',
        slug: '/',
        icon: TbHome,
      },
      allDeals: {
        name: 'All Deals',
        slug: '/all-deals',
        icon: TbTag,
      },
      categories: {
        name: 'All Categories',
        slug: '/tag',
        icon: TbCategory,
      },
    },
    categories: {
      ...catsConfig,
    },
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
  },
  card: {
    shop: 'Налично в: ',
  },
  imageBase64:
    'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzRhNTU2NSIgZD0iTTE4IDBIMmEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJabS01LjUgNGExLjUgMS41IDAgMSAxIDAgMyAxLjUgMS41IDAgMCAxIDAtM1ptNC4zNzYgMTAuNDgxQTEgMSAwIDAgMSAxNiAxNUg0YTEgMSAwIDAgMS0uODk1LTEuNDQ3bDMuNS03QTEgMSAwIDAgMSA3LjQ2OCA2YS45NjUuOTY1IDAgMCAxIC45LjVsMi43NzUgNC43NTcgMS41NDYtMS44ODdhMSAxIDAgMCAxIDEuNjE4LjFsMi41NDEgNGExIDEgMCAwIDEgLjAyOCAxLjAxMVoiIC8+Cjwvc3ZnPgo=',
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  ],
  // Browser configuration
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

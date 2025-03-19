const config = {
  site: {
    name: 'DiSCOUNTER',
    logoLabel: 'Home',
    rel: 'Home',
  },
  emag: {
    title: 'eMAG',
    url: 'https://www.emag.bg',
    smartDeals: 'https://sapi.emag.bg/label-campaign/flash-deals?source_id=',
    errorFetch: 'Error fetching data',
    categories: {
      livingRoom: {
        name: 'Smart Home',
        slug: 'smart-home',
        path: 'Smart Home',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
      },
      cooking: {
        name: 'Cooking',
        slug: 'kitchen',
        path: 'Cooking',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cooking-And-Serving-Items',
      },
      auto: {
        name: 'Auto Products',
        slug: 'auto-products',
        path: 'Auto Products',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
      },
      clothing: {
        name: 'Clothing',
        slug: 'clothing',
        path: 'Clothing',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Men-And-Women-Clothing',
      },
      perfumes: {
        name: 'Perfumes',
        slug: 'perfumes',
        path: 'Perfumes',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Perfumes',
      },
      toys: {
        name: 'Toys',
        slug: 'toys',
        path: 'Toys',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Baby-Toys',
      },
      cleaning: {
        name: 'Cleaning',
        slug: 'cleaning',
        path: 'Cleaning',
        url: 'https://www.emag.bg/label/Smart-Deals-Detergents-And-Cleaning-Products',
      },
      casesAndCards: {
        name: 'Phones & Accessories',
        slug: 'cases-and-cards',
        path: 'Phones & Accessories',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cases-And-Memory-Cards',
      },
      mda: {
        name: 'Electric Accessories',
        slug: 'electronics-accessories',
        path: 'Electric Accessories',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Mda',
      },
      audioAndVideo: {
        name: 'Audio & Video',
        slug: 'audio-video',
        path: 'Audio & Video',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
      },
      pcComponents: {
        name: 'Computer & Tablets',
        slug: 'pc-components',
        path: 'Computer & Tablets',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Desktop-Pcs-Components-And-Peripherals',
      },
    },
  },
  messages: {
    endOfDeals: 'You have reached the end of the deals',
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
}

export default config

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
        path: 'Living room, hallway and office furniture',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
      },
      cooking: {
        name: 'Cooking',
        slug: 'kitchen',
        path: 'Cooking and serving items',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cooking-And-Serving-Items',
      },
      auto: {
        name: 'Auto Products',
        slug: 'auto-products',
        path: 'Auto products',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
      },
      clothing: {
        name: 'Clothing',
        slug: 'clothing',
        path: 'Men and Women Clothing',
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
        path: 'Baby Toys',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Baby-Toys',
      },
      cleaning: {
        name: 'Cleaning',
        slug: 'cleaning',
        path: 'Detergents and cleaning products',
        url: 'https://www.emag.bg/label/Smart-Deals-Detergents-And-Cleaning-Products',
      },
      casesAndCards: {
        name: 'Phones & Accessories',
        slug: 'cases-and-cards',
        path: 'Cases and memory cards',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cases-And-Memory-Cards',
      },
      mda: {
        name: 'Electric Accessories',
        slug: 'electronics-accessories',
        path: 'Mda',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Mda',
      },
      audioAndVideo: {
        name: 'Audio & Video',
        slug: 'audio-video',
        path: 'Audio Video And Photo',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
      },
      pcComponents: {
        name: 'Computer & Tablets',
        slug: 'pc-components',
        path: "Desktop PC's components and peripherals",
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
}

export default config

export const categorySlugMap: Record<string, string> = {
  'smart-home': 'Living room, hallway and office furniture',
  'pc-components': "Desktop PC's components and peripherals",
}

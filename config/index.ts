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
        name: 'Living room, hallway and office furniture',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
      },
      cooking: {
        name: 'Cooking and serving items',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cooking-And-Serving-Items',
      },
      auto: {
        name: 'Auto products',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
      },
      clothing: {
        name: 'Men and women clothing',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Men-And-Women-Clothing',
      },
      perfumes: {
        name: 'Perfumes',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Perfumes',
      },
      toys: {
        name: 'Baby toys',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Baby-Toys',
      },
      cleaning: {
        name: 'Detergents and cleaning products',
        url: 'https://www.emag.bg/label/Smart-Deals-Detergents-And-Cleaning-Products',
      },
      casesAndCards: {
        name: 'Cases and memory cards',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cases-And-Memory-Cards',
      },
      mda: {
        name: 'Electric devices',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Mda',
      },
      audioAndVideo: {
        name: 'Audio video and photo',
        url: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
      },
      pcComponents: {
        name: "Desktop PC's components and peripherals",
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

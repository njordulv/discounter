const config = {
  emag: {
    title: 'eMAG',
    url: 'https://www.emag.bg',
    smartDeals: 'https://sapi.emag.bg/label-campaign/flash-deals?source_id=',
    errorFetch: 'Error fetching data',
    categories: {
      livingRoom:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
      cooking:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cooking-And-Serving-Items',
      auto: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
      clothing:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Men-And-Women-Clothing',
      perfumes: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Perfumes',
      toys: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Baby-Toys',
      cleaning:
        'https://www.emag.bg/label/Smart-Deals-Detergents-And-Cleaning-Products',
      casesAndCards:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Cases-And-Memory-Cards',
      mda: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Mda',
      audioAndVideo:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
      pcComponents:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Desktop-Pcs-Components-And-Peripherals',
    },
  },
  messages: {
    endOfDeals: 'You have reached the end of the deals',
  },
  sizes: {
    sm: 'text-md px-4 py-1',
    md: 'text-lg px-6 py-1',
    lg: 'text-xl px-10 py-2',
    xl: 'text-2xl px-6 py-4',
    round: 'text-sm min-w-8 min-h-8 px-0 rounded-full',
  },
  colors: {
    orange:
      'bg-orange-500/50 border-orange-500/70 text-orange-50 hover:bg-orange-500/80 hover:text-white',
    sky: 'bg-sky-500/40 border-sky-500/70 text-sky-50 hover:bg-sky-500/80 hover:text-white',
    cyan: 'bg-cyan-500/50 border-cyan-500/70 text-cyan-50 hover:bg-cyan-500/80 hover:text-white',
    gray: 'bg-gray-500/40 border-gray-500/70 text-gray-50 hover:bg-gray-500/80 hover:text-white',
  },
  imageBase64:
    'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzRhNTU2NSIgZD0iTTE4IDBIMmEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJabS01LjUgNGExLjUgMS41IDAgMSAxIDAgMyAxLjUgMS41IDAgMCAxIDAtM1ptNC4zNzYgMTAuNDgxQTEgMSAwIDAgMSAxNiAxNUg0YTEgMSAwIDAgMS0uODk1LTEuNDQ3bDMuNS03QTEgMSAwIDAgMSA3LjQ2OCA2YS45NjUuOTY1IDAgMCAxIC45LjVsMi43NzUgNC43NTcgMS41NDYtMS44ODdhMSAxIDAgMCAxIDEuNjE4LjFsMi41NDEgNGExIDEgMCAwIDEgLjAyOCAxLjAxMVoiIC8+Cjwvc3ZnPgo=',
}

export default config

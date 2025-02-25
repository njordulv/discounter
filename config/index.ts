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
  sizes: {
    sm: 'text-md px-4 py-1',
    md: 'text-lg px-6 py-1',
    lg: 'text-xl px-10 py-2',
    xl: 'text-2xl px-6 py-4',
  },
  colors: {
    orange:
      'bg-orange-500/50 border-orange-500/70 text-orange-50 hover:bg-orange-500/80 hover:text-white',
    sky: 'bg-sky-500/40 border-sky-500/70 text-sky-50 hover:bg-sky-500/80 hover:text-white',
    cyan: 'bg-cyan-500/50 border-cyan-500/70 text-cyan-50 hover:bg-cyan-500/80 hover:text-white',
  },
}

export default config

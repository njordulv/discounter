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
  weekday: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  weekdayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

export default config

const config = {
  emag: {
    title: 'eMAG',
    url: 'https://www.emag.bg',
    smartDeals: 'https://sapi.emag.bg/label-campaign/flash-deals?source_id=',
    errorFetch: 'Error fetching data',
    categories: {
      clothing:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Men-And-Women-Clothing',
      livingRoom:
        'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
      auto: 'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Auto-Products',
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

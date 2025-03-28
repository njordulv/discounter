import {
  TbDeviceWatch,
  TbDeviceMobile,
  TbDeviceDesktopAnalytics,
  TbDeviceLaptop,
  TbDeviceGamepad2,
  TbDeviceDesktop,
  TbCamera,
} from 'react-icons/tb'

export const catsConfig = {
  electronics: {
    name: 'Electronics',
    slug: 'electronics',
    icon: TbDeviceMobile,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Cases-And-Memory-Cards',
    subcategories: {
      phones: {
        name: 'Phones',
        slug: 'phones',
        icon: TbDeviceMobile,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Mobile-Phones-And-Tablets',
      },
      wearable: {
        name: 'Wearable',
        slug: 'wearable',
        icon: TbDeviceWatch,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Wearables-And-Gadgets',
      },
      gamingConsoles: {
        name: 'Gaming',
        slug: 'gaming',
        icon: TbDeviceGamepad2,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Gaming-Consoles-And-Accessories',
      },
      tv: {
        name: 'TVs',
        slug: 'tv',
        icon: TbDeviceDesktopAnalytics,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Tv-Stands-And-Accessories',
      },
      multimedia: {
        name: 'Multimedia',
        slug: 'multimedia',
        icon: TbCamera,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
      },
      pcComponents: {
        name: 'Computers',
        slug: 'computers',
        icon: TbDeviceDesktop,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Desktop-Pcs-Components-And-Peripherals',
      },
      laptops: {
        name: 'Laptops',
        slug: 'laptops',
        icon: TbDeviceLaptop,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Laptops-And-Accessories',
      },
    },
  },
}

import {
  TbDeviceWatch,
  TbDeviceMobile,
  TbDeviceLaptop,
  TbDeviceGamepad2,
  TbCamera,
  TbCpu,
  TbDeviceTv,
  TbUsb,
} from 'react-icons/tb'

export const catsConfig = {
  phones: {
    name: 'Phones & Tablets',
    slug: 'phones',
    icon: TbDeviceMobile,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Mobile-Phones-And-Tablets',
  },
  wearable: {
    name: 'Wearables & Gadgets',
    slug: 'wearable',
    icon: TbDeviceWatch,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Wearables-And-Gadgets',
  },
  gaming: {
    name: 'Gaming',
    slug: 'gaming',
    icon: TbDeviceGamepad2,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Gaming-Consoles-And-Accessories',
  },
  tvAudio: {
    name: 'TV & Audio',
    slug: 'tv-audio',
    icon: TbDeviceTv,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Tv-Stands-And-Accessories',
  },
  photoAudio: {
    name: 'Photo & Audio',
    slug: 'photo-audio',
    icon: TbCamera,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Smart-Deals-Audio-Video-And-Photo',
  },
  computers: {
    name: 'Laptops & PCs',
    slug: 'computers',
    icon: TbDeviceLaptop,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Laptops-And-Accessories',
  },
  pcComponents: {
    name: 'PC Components',
    slug: 'pc-components',
    icon: TbCpu,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Desktop-Pcs-Components-And-Peripherals',
  },
  accessories: {
    name: 'Accessories & Storage',
    slug: 'accessories',
    icon: TbUsb,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Cases-And-Memory-Cards',
  },
}

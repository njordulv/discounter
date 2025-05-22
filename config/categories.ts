// config/categories.ts
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
  },
  wearable: {
    name: 'Wearables & Gadgets',
    slug: 'wearable',
    icon: TbDeviceWatch,
  },
  gaming: {
    name: 'Gaming',
    slug: 'gaming',
    icon: TbDeviceGamepad2,
  },
  tvAudio: {
    name: 'TV & Audio',
    slug: 'tv-audio',
    icon: TbDeviceTv,
  },
  photoAudio: {
    name: 'Photo & Audio',
    slug: 'photo-audio',
    icon: TbCamera,
  },
  computers: {
    name: 'Laptops & PCs',
    slug: 'computers',
    icon: TbDeviceLaptop,
  },
  pcComponents: {
    name: 'PC Components',
    slug: 'pc-components',
    icon: TbCpu,
  },
  accessories: {
    name: 'Accessories & Storage',
    slug: 'accessories',
    icon: TbUsb,
  },
}

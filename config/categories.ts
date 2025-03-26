import {
  TbSofa,
  TbBlender,
  TbCar,
  TbShirt,
  TbPerfume,
  TbHorseToy,
  TbWash,
  TbDeviceMobile,
  TbPlug,
  TbDeviceSpeaker,
  TbDeviceLaptop,
  TbToolsKitchen,
  TbBed,
  TbBath,
  TbGrill,
  TbPlant,
  TbIroning,
  TbBox,
  TbTexture,
  TbCropPortrait,
  TbArmchair,
  TbFilter,
  TbHammer,
  TbPlugConnected,
  TbEngine,
  TbTool,
  TbLock,
  TbLadder,
  TbShoe,
  TbBabyCarriage,
  TbBallFootball,
  TbPuzzle,
  TbBottle,
  TbDogBowl,
  TbCoffee,
  TbSmartHome,
  TbBook,
  TbAirConditioning,
  TbMicrowave,
  TbBatteryCharging,
  TbDeviceGamepad,
  TbDeviceDesktop,
  TbBriefcase,
} from 'react-icons/tb'

export const catsConfig = {
  homeOffice: {
    name: 'Home & Office',
    slug: 'home-office',
    icon: TbSofa,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Living-Room-Hallway-And-Office-Furniture',
    subcategories: {
      kitchen: {
        name: 'Kitchen',
        slug: 'kitchen',
        icon: TbToolsKitchen,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Kitchen-Furniture',
      },
      bedroom: {
        name: 'Bedroom',
        slug: 'bedroom',
        icon: TbBed,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Bedroom-Furniture-Mattresses-And-Toppers',
      },
      plumbing: {
        name: 'Plumbing',
        slug: 'plumbing',
        icon: TbBath,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Bathroom-And-Kitchen-Sanitary',
      },
      bathroom: {
        name: 'Bathroom',
        slug: 'bathroom',
        icon: TbBath,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Bathroom-Furniture',
      },
      outdoor: {
        name: 'Outdoor',
        slug: 'outdoor',
        icon: TbGrill,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Garden-Furniture-And-Items',
      },
      gardening: {
        name: 'Gardening',
        slug: 'gardening',
        icon: TbPlant,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Gardening-Tools-And-Equipment',
      },
    },
  },
  kitchenware: {
    name: 'Kitchenware',
    slug: 'kitchenware',
    icon: TbBlender,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Cooking-And-Serving-Items',
    subcategories: {
      laundry: {
        name: 'Laundry',
        slug: 'laundry',
        icon: TbIroning,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Ironing-Boards-Dryers-Cleaning-Sets',
      },
      bedding: {
        name: 'Bedding',
        slug: 'bedding',
        icon: TbBed,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Bed-Linen-Pillows-Duvets-And-Blankets',
      },
      storage: {
        name: 'Storage',
        slug: 'storage',
        icon: TbBox,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Organization-And-Storage',
      },
      textiles: {
        name: 'Textiles',
        slug: 'textiles',
        icon: TbTexture,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Curtains-Drapes-And-Rugs',
      },
      towels: {
        name: 'Towels',
        slug: 'towels',
        icon: TbCropPortrait,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Towels-And-Bathrobes',
      },
      decor: {
        name: 'Decor',
        slug: 'decor',
        icon: TbArmchair,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Home-Decor',
      },
      kitchenTextiles: {
        name: 'Kitchen Textiles',
        slug: 'kitchen-textiles',
        icon: TbToolsKitchen,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Kitchen-Accessories-And-Textiles',
      },
      waterFilters: {
        name: 'Water Filters',
        slug: 'water-filters',
        icon: TbFilter,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Water-Filtration',
      },
    },
  },
  auto: {
    name: 'Tools & Auto',
    slug: 'tools-auto',
    icon: TbCar,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Auto-Products',
    subcategories: {
      powerTools: {
        name: 'Power Tools',
        slug: 'power-tools',
        icon: TbHammer,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Power-Tools-Drills-And-Rotary-Hammers',
      },
      electrical: {
        name: 'Electrical',
        slug: 'electrical',
        icon: TbPlugConnected,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Electrical-Installations',
      },
      generators: {
        name: 'Generators',
        slug: 'generators',
        icon: TbEngine,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Generators-Compressors-And-Welding',
      },
      handTools: {
        name: 'Hand Tools',
        slug: 'hand-tools',
        icon: TbTool,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Hand-Tools',
      },
      safety: {
        name: 'Safety',
        slug: 'safety',
        icon: TbLock,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Protection-And-Storage',
      },
      hardware: {
        name: 'Hardware',
        slug: 'hardware',
        icon: TbLadder,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Accessories-And-Hardware',
      },
      construction: {
        name: 'Construction',
        slug: 'construction',
        icon: TbHammer,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Construction-Materials-And-Tools',
      },
    },
  },
  fashion: {
    name: 'Fashion',
    slug: 'fashion',
    icon: TbShirt,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Men-And-Women-Clothing',
    subcategories: {
      shoes: {
        name: 'Shoes',
        slug: 'shoes',
        icon: TbShoe,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Men-And-Women-Footwear',
      },
      kids: {
        name: 'Kids',
        slug: 'kids',
        icon: TbBabyCarriage,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Kids-Fashion',
      },
      accessories: {
        name: 'Accessories',
        slug: 'accessories',
        icon: TbBriefcase,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Watches-Bags-And-Accessories',
      },
      sports: {
        name: 'Sports',
        slug: 'sports',
        icon: TbBallFootball,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Sport-And-Travel',
      },
    },
  },
  beautyHealth: {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    icon: TbPerfume,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Perfumes',
    subcategories: {
      skinCare: {
        name: 'Skincare',
        slug: 'skin-care',
        icon: TbCropPortrait,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Skin-Care',
      },
      bodyCare: {
        name: 'Bodycare',
        slug: 'body-care',
        icon: TbBottle,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Body-Care',
      },
      hairCare: {
        name: 'Haircare',
        slug: 'hair-care',
        icon: TbWash,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Hair-Care',
      },
      oralCare: {
        name: 'Oral Care',
        slug: 'oral-care',
        icon: TbBottle,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Oral-Care',
      },
      makeup: {
        name: 'Makeup',
        slug: 'makeup',
        icon: TbPerfume,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Makeup',
      },
      grooming: {
        name: 'Grooming',
        slug: 'grooming',
        icon: TbDeviceMobile,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Personal-Care-Devices',
      },
      supplements: {
        name: 'Supplements',
        slug: 'supplements',
        icon: TbBottle,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Food-Supplements',
      },
      medical: {
        name: 'Medical',
        slug: 'medical',
        icon: TbBriefcase,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Protective-Products-And-Medical-Devices',
      },
    },
  },
  toys: {
    name: 'Toys',
    slug: 'toys',
    icon: TbHorseToy,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Baby-Toys',
    subcategories: {
      outdoorToys: {
        name: 'Outdoor Toys',
        slug: 'outdoor-toys',
        icon: TbBallFootball,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Outdoor-Toys',
      },
      buildingSets: {
        name: 'Building',
        slug: 'building-sets',
        icon: TbTool,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Building-Sets',
      },
      puzzles: {
        name: 'Puzzles',
        slug: 'puzzles',
        icon: TbPuzzle,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Games-And-Puzzles',
      },
      dolls: {
        name: 'Dolls',
        slug: 'dolls',
        icon: TbHorseToy,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Dolls-Plushies-And-Creative-Toys',
      },
      babyCare: {
        name: 'Baby Care',
        slug: 'baby-care',
        icon: TbBabyCarriage,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Diapers-And-Hygiene',
      },
      feeding: {
        name: 'Feeding',
        slug: 'feeding',
        icon: TbBottle,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Baby-Food-And-Feeding-Accessories',
      },
      strollers: {
        name: 'Strollers',
        slug: 'strollers',
        icon: TbBabyCarriage,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Strollers-Carriers-And-Car-Seats',
      },
      monitoring: {
        name: 'Monitoring',
        slug: 'monitoring',
        icon: TbDeviceMobile,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Baby-Monitoring',
      },
    },
  },
  cleaning: {
    name: 'Cleaning',
    slug: 'cleaning',
    icon: TbWash,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Detergents-And-Cleaning-Products',
    subcategories: {
      petFood: {
        name: 'Pet Food',
        slug: 'pet-food',
        icon: TbDogBowl,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Pet-Food',
      },
      petGear: {
        name: 'Pet Gear',
        slug: 'pet-gear',
        icon: TbDogBowl,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Pet-Accessories',
      },
      beverages: {
        name: 'Beverages',
        slug: 'beverages',
        icon: TbCoffee,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Beverages-And-Coffee',
      },
    },
  },
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
      wearables: {
        name: 'Wearables',
        slug: 'wearables',
        icon: TbDeviceGamepad,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Wearables-And-Gadgets',
      },
      homeGadgets: {
        name: 'Smart Home',
        slug: 'smart-home',
        icon: TbSmartHome,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Smart-Home-And-Gadgets',
      },
      booksMusicMovies: {
        name: 'Media',
        slug: 'media',
        icon: TbBook,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Books-Music-And-Movies',
      },
    },
  },
  appliances: {
    name: 'Appliances',
    slug: 'appliances',
    icon: TbPlug,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Mda',
    subcategories: {
      acHeating: {
        name: 'Climate',
        slug: 'climate',
        icon: TbAirConditioning,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Ac-And-Heating',
      },
      kitchenAppliances: {
        name: 'Kitchen',
        slug: 'kitchen-appliances',
        icon: TbMicrowave,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Kitchen-Appliances',
      },
      homeCare: {
        name: 'Home Care',
        slug: 'home-care',
        icon: TbWash,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Home-Care-And-Fabrics',
      },
    },
  },
  audioAndVideo: {
    name: 'Entertainment',
    slug: 'entertainment',
    icon: TbDeviceSpeaker,
    scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Audio-Video-And-Photo',
    subcategories: {
      charges: {
        name: 'Chargers',
        slug: 'chargers',
        icon: TbBatteryCharging,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Chargers-And-External-Batteries',
      },
      gamingConsoles: {
        name: 'Gaming',
        slug: 'gaming',
        icon: TbDeviceGamepad,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Gaming-Consoles-And-Accessories',
      },
      tv: {
        name: 'TV',
        slug: 'tv',
        icon: TbDeviceDesktop,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Tv-Stands-And-Accessories',
      },
    },
  },
  pcComponents: {
    name: 'Computers',
    slug: 'computers',
    icon: TbDeviceLaptop,
    scrapeUrl:
      'https://www.emag.bg/label/Smart-Deals-Desktop-Pcs-Components-And-Peripherals',
    subcategories: {
      monitors: {
        name: 'Monitors',
        slug: 'monitors',
        icon: TbDeviceDesktop,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Monitors-Printers-Networking',
      },
      laptops: {
        name: 'Laptops',
        slug: 'laptops',
        icon: TbDeviceLaptop,
        scrapeUrl:
          'https://www.emag.bg/label/Smart-Deals-Laptops-And-Accessories',
      },
      officeSupplies: {
        name: 'Office',
        slug: 'office',
        icon: TbBriefcase,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-Office-Supplies',
      },
      schoolSupplies: {
        name: 'Tablets',
        slug: 'tablets',
        icon: TbDeviceMobile,
        scrapeUrl: 'https://www.emag.bg/label/Smart-Deals-School-Supplies',
      },
    },
  },
}

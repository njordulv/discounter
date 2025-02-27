import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's13emagst.akamaized.net',
        pathname: '/products/**',
      },
    ],
  },
  headers: async () => [
    {
      source: '/all-deals.json',
      headers: [{ key: 'Cache-Control', value: 'no-store' }],
    },
  ],
}

export default nextConfig

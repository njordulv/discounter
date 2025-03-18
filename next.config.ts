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
}

export default nextConfig

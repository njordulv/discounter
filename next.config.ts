import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.akamaized.net',
        pathname: '/products/**/images/**',
      },
    ],
  },
}

export default nextConfig

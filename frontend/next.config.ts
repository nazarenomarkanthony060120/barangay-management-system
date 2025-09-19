import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      root: './frontend'
    }
  }
}

export default nextConfig

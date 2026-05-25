/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Required for PWA — allow service worker at root
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
        ],
      },
    ]
  },

  // Compress assets for faster PWA loading
  compress: true,

  // Image optimization
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig

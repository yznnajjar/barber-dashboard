import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    // Enables styled-components SSR + better debug labels
    styledComponents: true,
  },
}

export default withNextIntl(nextConfig)

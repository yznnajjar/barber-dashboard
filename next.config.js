/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Disable Next.js built-in SC compiler — we use babel-plugin-styled-components
    styledComponents: false,
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Using src directory structure
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // If using external images, add domains here
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    // ],
  },
  // Optional: Enable experimental features if needed
  experimental: {
    // serverActions: true, // Uncomment if using Next.js 14+ server actions
  },
  // Optional: Add redirects/rewrites if needed
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
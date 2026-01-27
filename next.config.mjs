/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This tells Next.js to generate static HTML
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', port: '', pathname: '**' },
      { protocol: 'http', hostname: '**', port: '', pathname: '**' },
    ],
    deviceSizes: [640, 750],
    minimumCacheTTL: 60,
  },
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}
export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }

  // IMPORTANT:
  // Do NOT override webpack cache in Next.js 14.
  // Next manages filesystem caching internally and
  // custom cache configs will break the dev server.
};

module.exports = nextConfig;

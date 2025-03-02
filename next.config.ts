const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      }
    ],
    // Enable aggressive caching for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    formats: ["image/avif", "image/webp"], // Use next-gen formats
  },

  async headers() {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          }
        ]
      },
      {
        source: "/(.*).(png|jpg|jpeg|gif|webp|avif)", // Match image types
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

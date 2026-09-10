import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(favicon.ico|icon.png|apple-icon.png|favicon.png|favicon-32x32.png|favicon-16x16.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

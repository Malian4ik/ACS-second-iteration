import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  distDir: ".next-local",
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

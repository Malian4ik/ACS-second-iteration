import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep local builds isolated, but let Vercel use the default `.next` output.
  distDir: process.env.VERCEL ? undefined : ".next-local",
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
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

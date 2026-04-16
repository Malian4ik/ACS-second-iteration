import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3001";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: 1
  }));
}

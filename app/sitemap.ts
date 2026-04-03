import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3001";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/cyberclub", "/restaurant", "/rooms", "/en", "/en/cyberclub", "/en/restaurant", "/en/rooms"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "/" || route === "/en" ? 1 : 0.8
  }));
}

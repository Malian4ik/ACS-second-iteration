import type { Metadata } from "next";

import { type Locale, getSharedContent, withLocale } from "@/lib/content";

type PageKey = "home" | "cyberclub" | "restaurant" | "rooms";

function getPageMeta(locale: Locale, page: PageKey) {
  const c = getSharedContent(locale);

  switch (page) {
    case "home":
      return { title: c.homeTitle, description: c.homeDescription, path: "/" };
    case "cyberclub":
      return { title: c.cyberclubMetaTitle, description: c.cyberclubMetaDescription, path: "/cyberclub" };
    case "restaurant":
      return { title: c.restaurantMetaTitle, description: c.restaurantMetaDescription, path: "/restaurant" };
    case "rooms":
      return { title: c.roomsMetaTitle, description: c.roomsMetaDescription, path: "/rooms" };
  }
}

export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = getPageMeta(locale, page);
  const canonicalPath = withLocale(locale, meta.path);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ru: withLocale("ru", meta.path),
        en: withLocale("en", meta.path)
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalPath,
      siteName: "Avulus Cyber Space",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description
    }
  };
}

"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/content";

export function LocaleHtmlController({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { stripLocaleFromPathname, type Locale, withLocale } from "@/lib/content";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const basePath = stripLocaleFromPathname(pathname);

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-black/35 p-1">
      {(["ru", "en"] as const).map((targetLocale) => {
        const href = withLocale(targetLocale, basePath);
        const active = locale === targetLocale;

        return (
          <Link
            key={targetLocale}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
              active ? "bg-[#b11b36] text-white" : "text-white/60 hover:text-white"
            }`}
            href={href}
          >
            {targetLocale}
          </Link>
        );
      })}
    </div>
  );
}

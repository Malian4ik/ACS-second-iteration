import Image from "next/image";
import Link from "next/link";

import { LanguageSwitch } from "@/components/layout/language-switch";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getSharedContent, type Locale, type NavItem, withLocale } from "@/lib/content";

export function AvulusNav({
  ctaHref,
  ctaLabel,
  items,
  locale
}: {
  items: NavItem[];
  ctaHref: string;
  ctaLabel: string;
  locale: Locale;
}) {
  const c = getSharedContent(locale);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(10,10,10,0.88)] px-4 py-3 backdrop-blur-xl md:px-6">
        <Link href={withLocale(locale, "/")} className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white">
            <Image alt="Avulus logo" className="object-contain p-1" fill sizes="36px" src="/images/avulus-logo-rgb.png" />
          </div>
          <div className="hidden md:block">
            <div className="font-[family:var(--font-oswald)] text-2xl uppercase leading-none tracking-[0.16em] text-white">
              Avulus
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">{c.brandSubtitle}</div>
          </div>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                item.active ? "text-[#f4f1ea]" : "text-white/68 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitch locale={locale} />
        </div>

        <TrackedLink
          className="hidden rounded-full bg-[#b11b36] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c62744] md:inline-flex"
          goal="nav_primary_cta"
          href={ctaHref}
          target={ctaHref.startsWith("http") ? "_blank" : undefined}
        >
          {ctaLabel}
        </TrackedLink>

        <div className="flex max-w-[60vw] items-center gap-2 overflow-x-auto md:hidden">
          <LanguageSwitch locale={locale} />
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                item.active
                  ? "border-[#b11b36] bg-[#b11b36]/12 text-[#f4f1ea]"
                  : "border-white/10 text-white/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

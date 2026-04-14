"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [open, setOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(10,10,10,0.88)] px-4 py-3 backdrop-blur-xl md:px-6">

          {/* Logo */}
          <Link href={withLocale(locale, "/")} className="flex items-center gap-3" onClick={() => setOpen(false)}>
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

          {/* Desktop nav links */}
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

          {/* Desktop CTA */}
          <TrackedLink
            className="hidden rounded-full bg-[#b11b36] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c62744] md:inline-flex"
            goal="nav_primary_cta"
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
          >
            {ctaLabel}
          </TrackedLink>

          {/* Mobile right side: language + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch locale={locale} />
            <button
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6 transition hover:bg-white/12"
            >
              {/* Animated burger → X */}
              <span className="sr-only">{open ? "Закрыть" : "Меню"}</span>
              <span className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ${
                    open ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Spacer so drawer sits below the nav pill */}
        <div className="h-20" />

        <div className="mx-4 overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(10,10,10,0.96)] shadow-2xl backdrop-blur-2xl">
          {/* Nav links */}
          <div className="flex flex-col divide-y divide-white/6">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-6 py-4 text-base font-medium tracking-wide transition ${
                  item.active ? "text-white" : "text-white/68 hover:text-white"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                <span className="mr-3 text-[10px] uppercase tracking-[0.3em] text-white/28">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <div className="p-4">
            <TrackedLink
              className="flex w-full items-center justify-center rounded-full bg-[#b11b36] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#c62744]"
              goal="nav_mobile_cta"
              href={ctaHref}
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </TrackedLink>
          </div>
        </div>
      </div>
    </>
  );
}

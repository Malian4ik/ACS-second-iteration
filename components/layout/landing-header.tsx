"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { LandingMobileMenu } from "@/components/layout/landing-mobile-menu";
import { TrackedLink } from "@/components/ui/tracked-link";
import { CONTACTS } from "@/lib/landing-data";

const navItems = [
  { href: "#offers", label: "Предложения" },
  { href: "#rooms", label: "Форматы" },
  { href: "#restaurant", label: "Ресторан" },
  { href: "#visit", label: "Как попасть" }
];

export function LandingHeader() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 24) {
        setIsHidden(false);
      } else if (delta > 8) {
        setIsHidden(true);
      } else if (delta < -8) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 transition-transform duration-300 ease-out md:px-6 ${isHidden ? "-translate-y-[135%]" : "translate-y-0"}`}
    >
      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full border border-white/10 bg-[rgba(10,10,10,0.9)] px-3 py-2 backdrop-blur-xl md:gap-4 md:px-5 md:py-3">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white">
            <Image alt="Avulus logo" className="object-contain p-1" fill sizes="36px" src="/images/avulus-logo-rgb.png" />
          </div>
          <span className="truncate font-[family:var(--font-oswald)] text-xl uppercase tracking-[0.1em] text-white">Avulus</span>
        </a>

        <nav className="hidden min-w-0 items-center justify-center gap-4 text-sm text-white/80 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <TrackedLink
            className="hidden whitespace-nowrap rounded-full bg-[var(--accent-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--accent-red-strong)] sm:inline-flex md:px-5 md:text-sm"
            goal="header_tg"
            href={CONTACTS.telegram}
            target="_blank"
          >
            Telegram
          </TrackedLink>
          <TrackedLink
            className="hidden whitespace-nowrap rounded-full border border-white/16 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)] xl:inline-flex md:px-5 md:text-sm"
            goal="header_call"
            href={CONTACTS.phone}
          >
            Позвонить
          </TrackedLink>
          <LandingMobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}

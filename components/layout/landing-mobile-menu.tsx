"use client";

import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type LandingMobileMenuProps = {
  items: NavItem[];
};

export function LandingMobileMenu({ items }: LandingMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        aria-controls="landing-mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition hover:border-white/28"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span className="text-lg leading-none">{isOpen ? "✕" : "☰"}</span>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/65 backdrop-blur-sm transition ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        id="landing-mobile-menu"
        className={`fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-3xl border border-white/12 bg-[rgba(10,10,10,0.96)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition ${isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
      >
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <a
              key={item.href}
              className="rounded-2xl border border-transparent px-4 py-3 text-sm uppercase tracking-[0.14em] text-white/90 transition hover:border-white/14 hover:bg-white/5"
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

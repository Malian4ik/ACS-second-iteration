"use client";

import { useState } from "react";
import { TrackedLink } from "@/components/ui/tracked-link";
import { DigitalMenuModal } from "@/components/restaurant/digital-menu-modal";
import { menuImages, type Locale } from "@/lib/content";

export function RestaurantMenuActions({ 
  locale, 
  variant = "hero" 
}: { 
  locale: Locale;
  variant?: "hero" | "reserve";
}) {
  const [activeMenuType, setActiveMenuType] = useState<"bar" | "restaurant" | null>(null);

  const labels = {
    ru: {
      bar: "Барное меню",
      restaurant: "Меню кухни"
    },
    en: {
      bar: "Bar Menu",
      restaurant: "Kitchen Menu"
    }
  }[locale];

  const containerClasses = variant === "hero" ? "flex flex-wrap gap-3" : "flex flex-wrap gap-3 mt-4";
  
  const buttonClasses = variant === "hero" 
    ? "inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
    : "inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]";

  return (
    <>
      <div className={containerClasses}>
        <button 
          className={buttonClasses}
          onClick={() => setActiveMenuType("restaurant")}
        >
          {labels.restaurant}
        </button>
        <button 
          className={buttonClasses}
          onClick={() => setActiveMenuType("bar")}
        >
          {labels.bar}
        </button>
      </div>

      <DigitalMenuModal 
        isOpen={activeMenuType !== null} 
        images={activeMenuType ? menuImages[activeMenuType] : []} 
        imageBackgroundColor={activeMenuType === "restaurant" ? "white" : "transparent"}
        onClose={() => setActiveMenuType(null)} 
      />
    </>
  );
}

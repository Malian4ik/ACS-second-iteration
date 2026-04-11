"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TrackedLink } from "@/components/ui/tracked-link";
import { trackGoal } from "@/lib/analytics";
import { contactLinks, getRoomCards, getSharedContent, type Locale } from "@/lib/content";

type FilterKey = "all" | "solo" | "private" | "vip" | "bootcamp";

function getRoomBucket(roomKey: string, fallbackFormat: "solo" | "duo" | "bootcamp"): Exclude<FilterKey, "all"> {
  if (fallbackFormat === "solo") {
    return "solo";
  }

  if (fallbackFormat === "bootcamp") {
    return "bootcamp";
  }

  return roomKey === "duo-premium" ? "vip" : "private";
}

export function RoomsExplorer({ initialFilter, locale }: { initialFilter: FilterKey; locale: Locale }) {
  const c = getSharedContent(locale);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterKey>(initialFilter);
  const roomCards = getRoomCards(locale);
  const visibleRooms =
    activeFilter === "all"
      ? roomCards
      : roomCards.filter((room) => getRoomBucket(room.key, room.format) === activeFilter);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: c.roomsFilterAll },
    { key: "solo", label: c.roomsFilterSolo },
    { key: "private", label: locale === "ru" ? "Privat" : "Privat" },
    { key: "vip", label: "VIP" },
    { key: "bootcamp", label: c.roomsFilterBootcamp }
  ];

  function applyFilter(nextFilter: FilterKey) {
    setActiveFilter(nextFilter);
    trackGoal("rooms_filter", { format: nextFilter });

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextFilter === "all") {
        params.delete("format");
      } else {
        params.set("format", nextFilter);
      }

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    });
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              activeFilter === filter.key
                ? "border-[var(--accent-red)] bg-[var(--accent-red)] text-white"
                : "border-white/15 bg-white/5 text-slate-200 hover:border-[var(--accent-red)] hover:text-white"
            }`}
            onClick={() => applyFilter(filter.key)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {visibleRooms.map((room, index) => (
          <article
            key={room.key}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_90px_rgba(5,8,15,0.35)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={room.title}
                className="object-cover transition duration-700 group-hover:scale-105"
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={room.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent-sand)]">
                {getRoomBucket(room.key, room.format)}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-xs uppercase tracking-[0.26em] text-slate-300">{room.subtitle}</div>
                <h3 className="mt-2 text-3xl font-semibold text-white">{room.title}</h3>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <p className="text-sm leading-7 text-slate-300">
                {locale === "ru" && room.key === "duo-sync"
                  ? "Комфортная приватная комната для двоих или небольшой компании: мягкий диван, приватность, room service и более спокойный вечерний сценарий."
                  : locale === "ru" && room.key === "duo-premium"
                    ? "VIP-комната для более длинной и приватной сессии: мягкая посадка, room service, мини-бар и ощущение отдельного пространства без общего шума."
                    : locale === "ru" && room.key === "bootcamp-squad"
                      ? "Комнатный формат для 5+ человек: командная посадка, совместная игра и понятный сценарий для больших составов."
                      : room.description}
              </p>

              <div className="grid grid-cols-3 gap-3 rounded-[24px] border border-white/10 bg-slate-950/55 p-4 text-sm text-slate-200">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{c.roomsPriceLabel}</div>
                  <div className="mt-2 font-semibold">{room.price}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{c.roomsStayLabel}</div>
                  <div className="mt-2 font-semibold">{room.duration}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{c.roomsCapacityLabel}</div>
                  <div className="mt-2 font-semibold">{room.capacity}</div>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-slate-300">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-red-strong)]"
                  goal={`book_room_${room.format}`}
                  href={contactLinks.telegram}
                  label={room.title}
                  target="_blank"
                >
                  {locale === "ru" ? "Написать в Telegram" : c.roomsOpenBooking}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
                  goal={`book_room_call_${room.format}`}
                  href={contactLinks.call}
                  label={room.title}
                >
                  {locale === "ru" ? "Позвонить" : c.roomsStickyCall}
                </TrackedLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(20,15,15,0.96),rgba(19,37,31,0.82))] p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sand)]">{c.roomsAddonEyebrow}</div>
            <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{c.roomsAddonTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{c.roomsAddonBody}</p>
          </div>
          <TrackedLink
            className="inline-flex items-center justify-center rounded-full border border-[var(--accent-green)]/50 bg-[var(--accent-green)]/12 px-6 py-3 text-sm font-semibold text-[var(--accent-sand)] transition hover:bg-[var(--accent-green)]/20"
            goal="view_menu"
            href={contactLinks.menu}
            label="menu"
            target="_blank"
          >
            {c.roomsAddonCta}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}

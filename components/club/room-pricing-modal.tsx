"use client";

import { useState } from "react";
import Image from "next/image";

import { pricingPeriods, t, type PricingCard } from "@/lib/catalog";
import type { RoomCard } from "@/lib/cms-schema";

/* ─── Room category definitions ─── */

export type RoomCategory = {
  key: string;
  title: string;
  catalogTitle: string;
  accent: string;
  spec: string;
  peripherals: string;
  capacity: string;
  imageUrl: string;
};

export const roomCategories: RoomCategory[] = [
  {
    key: "stream",
    title: "STREAM ROOM",
    catalogTitle: "STREAM",
    accent: "#2f7a65",
    spec: "Intel Core i7-14700F | 32GB DDR5 | RTX 5080 | 240Hz 27\"",
    peripherals: "ASUS ROG Azoth, Logitech G Pro X Superlight 2, HyperX Cloud III Wireless",
    capacity: "1 чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605139142--2026-04-19-162507381.png"
  },
  {
    key: "private",
    title: "PRIVATE",
    catalogTitle: "PRIVATE",
    accent: "#9f2339",
    spec: "Intel Core i5-12400F | 16GB DDR5 | RTX 4060 | 360Hz 24.5\"",
    peripherals: "Dark Project KD87A, Logitech G Pro X, HyperX Cloud II",
    capacity: "2 чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776604578515--2026-04-19-161543667.png"
  },
  {
    key: "private-plus",
    title: "PRIVATE+",
    catalogTitle: "PRIVATE+",
    accent: "#b56b4d",
    spec: "Усиленный private-формат | Больше комфорта | Длинные сессии",
    peripherals: "Подходит для пары, кооператива и камерных вечеров",
    capacity: "2 чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605367623--2026-04-19-162924458.png"
  },
  {
    key: "vip",
    title: "VIP",
    catalogTitle: "VIP",
    accent: "#d8c29a",
    spec: "Премиальный room-based формат | Больше приватности | Статус",
    peripherals: "Для камерных компаний и более премиального опыта",
    capacity: "2-4 чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605693268--2026-04-19-163442606.png"
  },
  {
    key: "super-vip",
    title: "SUPER VIP",
    catalogTitle: "SUPER VIP",
    accent: "#d3a24f",
    spec: "Максимальный private-уровень | Индивидуальный сценарий",
    peripherals: "Премиальная подача и полный контроль пространства",
    capacity: "2-4 чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605609687--2026-04-19-163322052.png"
  },
  {
    key: "bootcamp",
    title: "BOOTCAMP",
    catalogTitle: "PS5",
    accent: "#6f8d8b",
    spec: "Командный формат | 5+ мест | Комфортная посадка",
    peripherals: "Для сквадов, тренировок и длинных командных блоков",
    capacity: "5+ чел",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776606434405--2026-04-19-164708526.png"
  }
];

/* ─── Helpers ─── */

const periodByKey = new Map(pricingPeriods.map((p) => [p.key, p]));

function normalizeTitle(value: string) {
  return value.replace(/\s+/g, "").replace(/\+/g, "+").toUpperCase();
}

function findCard(periodKey: string, catalogTitle: string): PricingCard | undefined {
  const period = periodByKey.get(periodKey);
  return period?.cards.find((c) => normalizeTitle(c.title) === normalizeTitle(catalogTitle));
}

/* ─── Price Row ─── */

function PriceRow({ label, price }: { label: string; price: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-2.5">
      <span className="font-[family:var(--font-oswald)] text-lg uppercase text-white/80 md:text-xl">{label}</span>
      <span className="font-[family:var(--font-oswald)] text-lg uppercase text-[#f5ead3] md:text-xl">
        {price}
      </span>
    </div>
  );
}

/* ─── Period Panel ─── */

function PeriodPanel({
  label,
  dayCard,
  nightCard,
  accent
}: {
  label: string;
  dayCard?: PricingCard;
  nightCard?: PricingCard;
  accent: string;
}) {
  return (
    <div className="flex-1 min-w-[260px]">
      <div
        className="relative overflow-hidden px-6 py-3.5 text-center font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white md:text-4xl"
        style={{
          background: accent,
          clipPath: "polygon(2% 0%, 100% 0%, 98% 45%, 100% 100%, 0% 100%, 1% 55%)"
        }}
      >
        {label}
      </div>

      <div className="bg-[#0c0c0e] p-4 md:p-5">
        {dayCard && dayCard.entries.length > 0 ? (
          <div className="mb-5">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">День</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">04:00 – 17:00</span>
            </div>
            <div className="divide-y divide-white/6">
              {dayCard.entries.map((entry) => (
                <PriceRow key={`day-${t("ru" as const, entry.label)}`} label={t("ru" as const, entry.label)} price={entry.price} />
              ))}
            </div>
          </div>
        ) : null}

        {nightCard && nightCard.entries.length > 0 ? (
          <div className="mb-5">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">Вечер</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">17:00 – 04:00</span>
            </div>
            <div className="divide-y divide-white/6">
              {nightCard.entries.map((entry) => (
                <PriceRow key={`night-${t("ru" as const, entry.label)}`} label={t("ru" as const, entry.label)} price={entry.price} />
              ))}
            </div>
          </div>
        ) : null}

        {nightCard?.packages && nightCard.packages.length > 0 ? (
          <div className="border-t border-white/8 pt-3">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">Ночь</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">23:00 – 11:00</span>
            </div>
            {nightCard.packages.map((pack) => (
              <div key={`pack-${t("ru" as const, pack.label)}`} className="grid grid-cols-[1fr_auto] items-center gap-3 py-2.5">
                <span className="font-[family:var(--font-oswald)] text-base uppercase text-white/70 md:text-lg">
                  {t("ru" as const, pack.label)}
                </span>
                <span className="font-[family:var(--font-oswald)] text-base uppercase md:text-lg" style={{ color: accent }}>
                  {pack.price}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Details Panel (expandable: photo + specs) ─── */

function DetailsPanel({ category, open, onToggle }: { category: RoomCategory; open: boolean; onToggle: () => void }) {
  return (
    <div className="mb-6">
      <button
        className="group flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-left transition hover:border-white/14 hover:bg-white/[0.05]"
        onClick={onToggle}
        type="button"
      >
        <svg
          className={`h-4 w-4 flex-none text-white/50 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-[family:var(--font-oswald)] text-lg uppercase tracking-[0.08em] text-white/70 transition group-hover:text-white">
          Подробнее
        </span>
        <span className="ml-auto text-[11px] uppercase tracking-[0.14em] text-white/30">
          Фото и характеристики
        </span>
      </button>

      <div
        className={`grid transition-all duration-400 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 rounded-xl border border-white/8 bg-white/[0.02] p-5 md:flex-row md:gap-6">
            {/* Room photo */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-lg md:h-[260px] md:w-[380px] md:flex-none">
              <Image
                alt={category.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                src={category.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 font-[family:var(--font-oswald)] text-2xl uppercase text-white/80">
                {category.title}
              </div>
              <div className="absolute top-3 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-[family:var(--font-oswald)] text-[11px] uppercase tracking-wider text-white backdrop-blur-sm">
                {category.capacity}
              </div>
            </div>

            {/* Specs */}
            <div className="flex flex-1 flex-col justify-center gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-2">Характеристики ПК</div>
                <div
                  className="font-[family:var(--font-oswald)] text-lg uppercase leading-snug md:text-xl"
                  style={{ color: category.accent }}
                >
                  {category.spec}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-2">Периферия</div>
                <div className="text-sm leading-6 text-white/60">
                  {category.peripherals}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline Pricing Section ─── */

const categoryToRoomId: Record<string, string> = {
  "stream": "room-stream",
  "private": "room-privat",
  "private-plus": "room-privat-plus",
  "vip": "room-vip",
  "super-vip": "room-super-vip",
  "bootcamp": "room-bootcamp"
};

export function InlineRoomPricing({ cmsCards = [] }: { cmsCards?: RoomCard[] }) {
  const [activeKey, setActiveKey] = useState(roomCategories[0].key);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Find active category
  const activeBase = roomCategories.find((c) => c.key === activeKey) ?? roomCategories[0];
  
  // Overwrite image and capacity with CMS data if available
  const activeCmsId = categoryToRoomId[activeBase.key];
  const activeCmsCard = cmsCards.find(c => c.id === activeCmsId);
  const active = {
    ...activeBase,
    capacity: activeCmsCard?.capacity || activeBase.capacity,
    imageUrl: activeCmsCard?.imageUrl || activeBase.imageUrl
  };

  // Close details when switching tabs
  function selectCategory(key: string) {
    setActiveKey(key);
    setDetailsOpen(false);
  }

  const weekdayDay = findCard("weekday-day", active.catalogTitle);
  const weekdayNight = findCard("weekday-night", active.catalogTitle);
  const weekendDay = findCard("weekend-day", active.catalogTitle);
  const weekendNight = findCard("weekend-night", active.catalogTitle);

  return (
    <div className="mt-8 grid gap-0 xl:grid-cols-[240px_minmax(0,1fr)] xl:items-start">
      {/* ── Left: Vertical tabs (desktop) ── */}
      <div className="hidden xl:block">
        <div className="space-y-1.5">
          {roomCategories.map((cat) => {
            const isActive = cat.key === activeKey;
            return (
              <button
                key={cat.key}
                className="block w-full px-5 py-4 text-left font-[family:var(--font-oswald)] text-xl uppercase leading-none transition-all duration-200 xl:text-2xl"
                onClick={() => selectCategory(cat.key)}
                style={{
                  background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  borderLeft: isActive ? `3px solid ${cat.accent}` : "3px solid transparent",
                  transform: isActive ? "skewX(-2deg)" : "none"
                }}
                type="button"
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: Horizontal scroll tabs ── */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 xl:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {roomCategories.map((cat) => {
          const isActive = cat.key === activeKey;
          return (
            <button
              key={cat.key}
              className="flex-none px-4 py-2.5 font-[family:var(--font-oswald)] text-base uppercase leading-none transition"
              onClick={() => selectCategory(cat.key)}
              style={{
                background: isActive ? cat.accent : "rgba(255,255,255,0.06)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                transform: isActive ? "skewX(-2deg)" : "none"
              }}
              type="button"
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* ── Right: Content area ── */}
      <div>
        {/* Room title + action buttons */}
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-7xl">
            {active.title}
          </h3>
          <div className="flex gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] shadow-[0_2px_16px_rgba(159,35,57,0.3)]"
              href="https://t.me/AVULUSbot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Забронировать
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:border-white/30 hover:text-white"
              href="tel:+74959212221"
            >
              Позвонить
            </a>
          </div>
        </div>

        {/* Expandable details panel (photo + specs) */}
        <DetailsPanel
          category={active}
          open={detailsOpen}
          onToggle={() => setDetailsOpen(!detailsOpen)}
        />

        {/* Pricing panels */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <PeriodPanel accent={active.accent} dayCard={weekdayDay} label="Будни" nightCard={weekdayNight} />
          <PeriodPanel accent={active.accent} dayCard={weekendDay} label="Выходные" nightCard={weekendNight} />
        </div>
      </div>
    </div>
  );
}

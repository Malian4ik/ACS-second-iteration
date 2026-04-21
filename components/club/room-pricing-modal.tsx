import { useState, useCallback, useMemo } from "react";
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
    capacity: "1",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605139142--2026-04-19-162507381.png"
  },
  {
    key: "private",
    title: "PRIVATE",
    catalogTitle: "PRIVATE",
    accent: "#9f2339",
    spec: "Intel Core i5-12400F | 16GB DDR5 | RTX 4060 | 360Hz 24.5\"",
    peripherals: "Dark Project KD87A, Logitech G Pro X, HyperX Cloud II",
    capacity: "2",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776604578515--2026-04-19-161543667.png"
  },
  {
    key: "private-plus",
    title: "PRIVATE+",
    catalogTitle: "PRIVATE+",
    accent: "#b56b4d",
    spec: "Усиленный private-формат | Больше комфорта | Длинные сессии",
    peripherals: "Подходит для пары, кооператива и камерных вечеров",
    capacity: "2",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605367623--2026-04-19-162924458.png"
  },
  {
    key: "vip",
    title: "VIP",
    catalogTitle: "VIP",
    accent: "#d8c29a",
    spec: "Премиальный room-based формат | Больше приватности | Статус",
    peripherals: "Для камерных компаний и более премиального опыта",
    capacity: "2-4",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605693268--2026-04-19-163442606.png"
  },
  {
    key: "super-vip",
    title: "SUPER VIP",
    catalogTitle: "SUPER VIP",
    accent: "#d3a24f",
    spec: "Максимальный private-уровень | Индивидуальный сценарий",
    peripherals: "Премиальная подача и полный контроль пространства",
    capacity: "2-4",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605609687--2026-04-19-163322052.png"
  },
  {
    key: "bootcamp",
    title: "BOOTCAMP",
    catalogTitle: "PS5",
    accent: "#6f8d8b",
    spec: "Командный формат | 5+ мест | Комфортная посадка",
    peripherals: "Для сквадов, тренировок и длинных командных блоков",
    capacity: "5+",
    imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776606434405--2026-04-19-164708526.png"
  }
];

/* ─── Helpers ─── */

function normalizeTitle(value: string) {
  return value.replace(/\s+/g, "").replace(/\+/g, "+").toUpperCase();
}

/* ─── People Icon ─── */

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

/* ─── Collapsible Details Panel ─── */

function DetailsPanelCollapsible({ category }: { category: RoomCategory }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        className="group flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-left transition hover:border-white/14 hover:bg-white/[0.05]"
        onClick={() => setOpen(!open)}
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
              <div className="absolute top-3 left-4 flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-[family:var(--font-oswald)] text-[11px] uppercase tracking-wider text-white backdrop-blur-sm">
                <PeopleIcon className="h-3 w-3" />
                {category.capacity}
              </div>
            </div>
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

/* ─── Category → Room ID mapping ─── */

const categoryToRoomId: Record<string, string> = {
  "stream": "room-stream",
  "private": "room-privat",
  "private-plus": "room-privat-plus",
  "vip": "room-vip",
  "super-vip": "room-super-vip",
  "bootcamp": "room-bootcamp"
};

/* ─── Resolve active category from CMS ─── */

function useActiveCategory(baseCategory: RoomCategory, cmsCards: RoomCard[]) {
  const activeCmsId = categoryToRoomId[baseCategory.key];
  const activeCmsCard = cmsCards.find(c => c.id === activeCmsId);

  return useMemo(() => ({
    ...baseCategory,
    capacity: activeCmsCard?.capacity || baseCategory.capacity,
    imageUrl: activeCmsCard?.imageUrl || baseCategory.imageUrl
  }), [baseCategory, activeCmsCard]);
}

function usePricingCards(catalogTitle: string) {
  const findPeriodCard = (periodKey: string) => {
    const period = pricingPeriods.find(p => p.key === periodKey);
    return period?.cards.find(c => normalizeTitle(c.title) === normalizeTitle(catalogTitle));
  };
  return {
    weekdayDay: findPeriodCard("weekday-day"),
    weekdayNight: findPeriodCard("weekday-night"),
    weekendDay: findPeriodCard("weekend-day"),
    weekendNight: findPeriodCard("weekend-night")
  };
}

/* ─── Colors ─── */

const WEEKDAY_COLOR = "#2f7a65";
const WEEKEND_COLOR = "#9f2339";

/* ─── Unified Pricing Table (Будни + Выходные side by side) ─── */

function UnifiedPricingTable({
  weekdayDay,
  weekdayNight,
  weekendDay,
  weekendNight,
}: {
  weekdayDay?: PricingCard;
  weekdayNight?: PricingCard;
  weekendDay?: PricingCard;
  weekendNight?: PricingCard;
}) {
  return (
    <div className="mt-2 rounded-xl overflow-hidden bg-[#0c0c0e]">
      {/* Header row: Будни / Выходные styled with design character, aligned perfectly to table columns */}
      <div className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] w-full pt-2 px-1">
        <div></div>
        <div className="overflow-hidden" style={{ marginRight: '1px' }}>
          <div
            className="px-2 py-3.5 text-center font-[family:var(--font-oswald)] text-[18px] sm:text-2xl uppercase leading-none text-white shadow-[0_4px_20px_rgba(47,122,101,0.2)] md:text-3xl"
            style={{ background: WEEKDAY_COLOR, clipPath: "polygon(2% 0%, 100% 0%, 98% 45%, 100% 100%, 0% 100%, 1% 55%)" }}
          >
            Будни
          </div>
        </div>
        <div className="overflow-hidden" style={{ marginLeft: '1px' }}>
          <div
            className="px-2 py-3.5 text-center font-[family:var(--font-oswald)] text-[18px] sm:text-2xl uppercase leading-none text-white shadow-[0_4px_20px_rgba(159,35,57,0.2)] md:text-3xl"
            style={{ background: WEEKEND_COLOR, clipPath: "polygon(2% 0%, 100% 0%, 98% 45%, 100% 100%, 0% 100%, 1% 55%)" }}
          >
            Выходные
          </div>
        </div>
      </div>

      <div className="p-3 md:p-5">
        {/* ── День section ── */}
        {weekdayDay && weekdayDay.entries.length > 0 && weekendDay && weekendDay.entries.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-baseline mb-4">
              <div></div>
              <div className="col-span-2 text-center bg-white/[0.03] border-y border-white/5 py-3">
                <span className="font-[family:var(--font-oswald)] text-base sm:text-lg uppercase tracking-[0.18em] text-white font-bold md:text-xl">
                  День 04:00 – 17:00
                </span>
              </div>
            </div>
            <div className="divide-y divide-white/6">
              {weekdayDay.entries.map((entry, i) => {
                const weekendEntry = weekendDay.entries[i];
                return (
                  <div key={`day-${t("ru" as const, entry.label)}`} className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-center gap-1 py-4 hover:bg-white/[0.01] transition-colors md:py-5">
                    <span className="font-[family:var(--font-oswald)] text-left text-lg uppercase text-white/80 md:text-xl md:pl-2">
                      {t("ru" as const, entry.label)}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKDAY_COLOR }}>
                      {entry.price}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKEND_COLOR }}>
                      {weekendEntry?.price ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Вечер section ── */}
        {weekdayNight && weekdayNight.entries.length > 0 && weekendNight && weekendNight.entries.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-baseline mb-4">
              <div></div>
              <div className="col-span-2 text-center bg-white/[0.03] border-y border-white/5 py-3">
                <span className="font-[family:var(--font-oswald)] text-base sm:text-lg uppercase tracking-[0.18em] text-white font-bold md:text-xl">
                  Вечер 17:00 – 04:00
                </span>
              </div>
            </div>
            <div className="divide-y divide-white/6">
              {weekdayNight.entries.map((entry, i) => {
                const weekendEntry = weekendNight.entries[i];
                return (
                  <div key={`night-${t("ru" as const, entry.label)}`} className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-center gap-1 py-4 hover:bg-white/[0.01] transition-colors md:py-5">
                    <span className="font-[family:var(--font-oswald)] text-left text-lg uppercase text-white/80 md:text-xl md:pl-2">
                      {t("ru" as const, entry.label)}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKDAY_COLOR }}>
                      {entry.price}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKEND_COLOR }}>
                      {weekendEntry?.price ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Ночь section (packages) ── */}
        {weekdayNight?.packages && weekdayNight.packages.length > 0 && (
          <div className="pt-2">
            <div className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-baseline mb-4">
              <div></div>
              <div className="col-span-2 text-center bg-white/[0.03] border-y border-white/5 py-3">
                <span className="font-[family:var(--font-oswald)] text-base sm:text-lg uppercase tracking-[0.18em] text-white font-bold md:text-xl">
                  Ночь 23:00 – 11:00
                </span>
              </div>
            </div>
            <div className="divide-y divide-white/6">
              {weekdayNight.packages.map((pack, i) => {
                const weekendPack = weekendNight?.packages?.[i];
                return (
                  <div key={`pack-${t("ru" as const, pack.label)}`} className="grid grid-cols-[110px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] items-center gap-1 py-4 hover:bg-white/[0.01] transition-colors md:py-5">
                    <span className="font-[family:var(--font-oswald)] text-left text-[15px] leading-tight uppercase text-white/60 md:text-lg md:pl-2">
                      {t("ru" as const, pack.label)}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKDAY_COLOR }}>
                      {pack.price}
                    </span>
                    <span className="font-[family:var(--font-oswald)] text-center text-[24px] uppercase font-bold md:text-3xl" style={{ color: WEEKEND_COLOR }}>
                      {weekendPack?.price ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Room Header (title + CTA buttons) ─── */

function RoomHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">
          {title}
        </h3>
      </div>
      <div className="flex gap-3">
        <a
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] shadow-[0_2px_16px_rgba(159,35,57,0.3)]"
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
  );
}

/* ─── Room Content Block ─── */

function RoomContentBlock({
  baseCategory,
  cmsCards = []
}: {
  baseCategory: RoomCategory;
  cmsCards?: RoomCard[];
}) {
  const active = useActiveCategory(baseCategory, cmsCards);
  const { weekdayDay, weekdayNight, weekendDay, weekendNight } = usePricingCards(active.catalogTitle);

  return (
    <div className="flex flex-col mb-16 xl:mb-0">
      <RoomHeader title={active.title} />
      <DetailsPanelCollapsible category={active} />
      <UnifiedPricingTable
        weekdayDay={weekdayDay}
        weekdayNight={weekdayNight}
        weekendDay={weekendDay}
        weekendNight={weekendNight}
      />
    </div>
  );
}

/* ─── Mobile Category Grid (people icons) ─── */

function MobileCategoryGrid({ activeKey, onSelect }: { activeKey: string; onSelect: (key: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {roomCategories.map((cat) => {
        const isActive = cat.key === activeKey;
        return (
          <button
            key={cat.key}
            className="flex flex-col items-center justify-center rounded-lg border border-white/10 p-3 text-center transition-all duration-300"
            onClick={() => onSelect(cat.key)}
            style={{
              background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
              borderColor: isActive ? cat.accent : "rgba(255,255,255,0.1)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.4)"
            }}
            type="button"
          >
            <span className="flex items-center gap-1 mb-1 opacity-50">
              <PeopleIcon className="h-3 w-3" />
              <span className="font-[family:var(--font-oswald)] text-[10px] uppercase leading-none tracking-wider">
                {cat.capacity}
              </span>
            </span>
            <span className="font-[family:var(--font-oswald)] text-xs font-bold uppercase leading-tight">
              {cat.title.replace(" ROOM", "")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Desktop Category Tabs ─── */

function DesktopCategoryTabs({ activeKey, onSelect }: { activeKey: string; onSelect: (key: string) => void }) {
  return (
    <div className="sticky top-24">
      <div className="flex flex-col gap-3">
        {roomCategories.map((cat) => {
          const isActive = cat.key === activeKey;
          return (
            <button
              key={cat.key}
              className="group relative flex w-full items-center justify-between px-8 py-8 text-left font-[family:var(--font-oswald)] text-2xl uppercase transition-all duration-300 xl:py-10 xl:text-3xl font-bold tracking-wide"
              onClick={() => onSelect(cat.key)}
              style={{
                background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                borderLeft: isActive ? `10px solid ${cat.accent}` : "4px solid transparent",
                transform: isActive ? "translateX(12px) skewX(-2deg)" : "none",
                boxShadow: isActive ? `0 0 30px ${cat.accent}15` : "none"
              }}
              type="button"
            >
              <span>{cat.title}</span>
              {isActive && (
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.accent }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── DESKTOP SPECIFIC COMPONENTS (Original PC Layout) ─── */

function PriceRowDesktop({ label, timeRange, price, accent }: { label: string; timeRange?: string; price: string; accent?: string }) {
  return (
    <div className="grid grid-cols-[1.2fr_2fr_0.8fr] items-center gap-4 py-3 md:py-3.5">
      <span className="font-[family:var(--font-oswald)] text-lg uppercase text-white/90 md:text-xl">
        {label}
      </span>
      {timeRange && (
        <span className="font-[family:var(--font-oswald)] text-[13px] tracking-widest text-white/40 text-center md:text-[15px]">
          {timeRange}
        </span>
      )}
      <span 
        className="font-[family:var(--font-oswald)] text-lg uppercase text-right md:text-xl"
        style={{ color: accent || "#f5ead3" }}
      >
        {price}
      </span>
    </div>
  );
}

function PeriodPanelDesktop({
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

      <div className="bg-[#0c0c0e] p-4 md:p-6">
        {dayCard && dayCard.entries.length > 0 ? (
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">День</span>
            </div>
            <div className="divide-y divide-white/6">
              {dayCard.entries.map((entry) => (
                <PriceRowDesktop 
                  key={`day-${t("ru" as const, entry.label)}`} 
                  label={t("ru" as const, entry.label)} 
                  timeRange="04:00 – 17:00"
                  price={entry.price} 
                />
              ))}
            </div>
          </div>
        ) : null}

        {nightCard && nightCard.entries.length > 0 ? (
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">Вечер</span>
            </div>
            <div className="divide-y divide-white/6">
              {nightCard.entries.map((entry) => (
                <PriceRowDesktop 
                  key={`night-${t("ru" as const, entry.label)}`} 
                  label={t("ru" as const, entry.label)} 
                  timeRange="17:00 – 04:00"
                  price={entry.price} 
                />
              ))}
            </div>
          </div>
        ) : null}

        {nightCard?.packages && nightCard.packages.length > 0 ? (
          <div className="border-t border-white/8 pt-5">
            <div className="mb-2">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">Ночь</span>
            </div>
            {nightCard.packages.map((pack) => (
              <PriceRowDesktop 
                key={`pack-${t("ru" as const, pack.label)}`} 
                label={t("ru" as const, pack.label)} 
                timeRange="23:00 – 11:00"
                accent={accent}
                price={pack.price} 
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DetailsPanelDesktop({ category }: { category: RoomCategory }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-5 rounded-xl border border-white/8 bg-white/[0.02] p-5 md:flex-row md:gap-6">
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
          <div className="absolute top-3 left-4 flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-[family:var(--font-oswald)] text-[11px] uppercase tracking-wider text-white backdrop-blur-sm">
            <PeopleIcon className="h-3 w-3" />
            {category.capacity}
          </div>
        </div>
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
  );
}

function RoomContentBlockDesktop({
  baseCategory,
  cmsCards = []
}: {
  baseCategory: RoomCategory;
  cmsCards?: RoomCard[];
}) {
  const active = useActiveCategory(baseCategory, cmsCards);
  const { weekdayDay, weekdayNight, weekendDay, weekendNight } = usePricingCards(active.catalogTitle);

  return (
    <div className="flex flex-col mb-16 xl:mb-0">
      <RoomHeader title={active.title} />
      <DetailsPanelDesktop category={active} />
      <div className="flex flex-col gap-4 lg:flex-row mt-2">
        <PeriodPanelDesktop accent={active.accent} dayCard={weekdayDay} label="Будни" nightCard={weekdayNight} />
        <PeriodPanelDesktop accent={active.accent} dayCard={weekendDay} label="Выходные" nightCard={weekendNight} />
      </div>
    </div>
  );
}

/* ─── Main Export ─── */

export function InlineRoomPricing({ cmsCards = [] }: { cmsCards?: RoomCard[] }) {
  const [activeKey, setActiveKey] = useState(roomCategories[0].key);
  const selectCategory = useCallback((key: string) => setActiveKey(key), []);
  const activeBase = roomCategories.find((c) => c.key === activeKey) ?? roomCategories[0];

  return (
    <>
      {/* ── Mobile ── */}
      <div className="mt-8 flex flex-col gap-8 xl:hidden">
        <MobileCategoryGrid activeKey={activeKey} onSelect={selectCategory} />
        <div className="pt-4 border-t border-white/5">
          <RoomContentBlock baseCategory={activeBase} cmsCards={cmsCards} />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="mt-10 hidden xl:grid gap-12 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <DesktopCategoryTabs activeKey={activeKey} onSelect={selectCategory} />
        <div className="min-h-[500px]">
          <RoomContentBlockDesktop baseCategory={activeBase} cmsCards={cmsCards} />
        </div>
      </div>
    </>
  );
}

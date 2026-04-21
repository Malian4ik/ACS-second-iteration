"use client";

import { useState } from "react";

import { pricingPeriods, t, type PricingCard, type PricingEntry } from "@/lib/catalog";
import type { Locale } from "@/lib/content";

type CategorySummary = {
  title: string;
  accent: string;
  spec: Record<Locale, string>;
  details: Record<Locale, string>;
};

type CategoryPricing = {
  key: string;
  title: string;
  spec: Record<Locale, string>;
  details: Record<Locale, string>;
  accent: string;
  weekdayDay?: PricingCard;
  weekdayNight?: PricingCard;
  weekendDay?: PricingCard;
  weekendNight?: PricingCard;
};

const categorySummaries: CategorySummary[] = [
  {
    title: "PRIVATE",
    accent: "#9f2339",
    spec: {
      ru: "i5-12400F | RTX 4060 | LG 27\" 165HZ",
      en: "i5-12400F | RTX 4060 | LG 27\" 165HZ"
    },
    details: {
      ru: "Периферия: Dark Project KD87A, Logitech G Pro X, HyperX Cloud II",
      en: "Peripherals: Dark Project KD87A, Logitech G Pro X, HyperX Cloud II"
    }
  },
  {
    title: "PRIVATE+",
    accent: "#b56b4d",
    spec: {
      ru: "i5-12400F | RTX 5070 | SAMSUNG 24\" 240HZ",
      en: "i5-12400F | RTX 5070 | SAMSUNG 24\" 240HZ"
    },
    details: {
      ru: "Подходит для пары, кооператива и вечерних блоков без общего зала",
      en: "Best for couples, co-op sessions and longer evening blocks away from the main hall"
    }
  },
  {
    title: "VIP",
    accent: "#d8c29a",
    spec: {
      ru: "AMD RYZEN 7 9800X3D | RTX 4080 SUPER | ALIENWARE 24\" 360HZ",
      en: "AMD RYZEN 7 9800X3D | RTX 4080 SUPER | ALIENWARE 24\" 360HZ"
    },
    details: {
      ru: "Формат для камерных компаний, длинных сессий и более премиального опыта",
      en: "Designed for smaller groups, extended sessions and a more premium in-club experience"
    }
  },
  {
    title: "STREAM",
    accent: "#2f7a65",
    spec: {
      ru: "i5-13600 | RTX 5070 / 4070 SUPER | 2x LG 27\" 165HZ + 1x SAMSUNG 24\" 240HZ",
      en: "i5-13600 | RTX 5070 / 4070 SUPER | 2x LG 27\" 165HZ + 1x SAMSUNG 24\" 240HZ"
    },
    details: {
      ru: "Подходит для стрима, личной игры и тихого режима без лишнего шума",
      en: "Built for streaming, focused solo play and a quieter private setup"
    }
  },
  {
    title: "PS5",
    accent: "#6f8d8b",
    spec: {
      ru: "Консольный формат | Комфортная посадка | Для быстрых и длинных игровых блоков",
      en: "Console format | Comfortable lounge setup | For fast and long gaming blocks"
    },
    details: {
      ru: "Подходит для локальных сессий, вечеров с друзьями и расслабленного формата",
      en: "Best for local sessions, friend groups and a more relaxed room flow"
    }
  },
  {
    title: "SUPER VIP",
    accent: "#d3a24f",
    spec: {
      ru: "i9-14900KF | RTX 5080 | SAMSUNG 27\" 360HZ",
      en: "i9-14900KF | RTX 5080 | SAMSUNG 27\" 360HZ"
    },
    details: {
      ru: "Для самых статусных бронирований, камерных событий и private premium experience",
      en: "For the most elevated bookings, private events and premium room-first experiences"
    }
  }
];

const periodByKey = new Map(pricingPeriods.map((period) => [period.key, period]));

const categories: CategoryPricing[] = categorySummaries.map((summary) => ({
  key: summary.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title: summary.title,
  accent: summary.accent,
  spec: summary.spec,
  details: summary.details,
  weekdayDay: findCard("weekday-day", summary.title),
  weekdayNight: findCard("weekday-night", summary.title),
  weekendDay: findCard("weekend-day", summary.title),
  weekendNight: findCard("weekend-night", summary.title)
}));

function normalizeTitle(value: string) {
  return value.replace(/\s+/g, "").replace(/\+/g, "+").toUpperCase();
}

function findCard(periodKey: string, title: string) {
  const period = periodByKey.get(periodKey);
  return period?.cards.find((card) => normalizeTitle(card.title) === normalizeTitle(title));
}

function formatPrice(price: string, locale: Locale) {
  return locale === "ru" ? `${price} ₽` : `${price} RUB`;
}

function renderPriceRows(entries: PricingEntry[], locale: Locale, accent: string, emphasize = false) {
  return entries.map((entry) => (
    <div
      key={`${t(locale, entry.label)}-${entry.price}`}
      className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[16px] bg-black/18 px-4 py-3"
    >
      <span className="font-[family:var(--font-oswald)] text-xl uppercase leading-none text-white/68 md:text-2xl">
        {t(locale, entry.label)}
      </span>
      <span
        className="font-[family:var(--font-oswald)] text-xl uppercase leading-none md:text-2xl"
        style={{ color: emphasize ? accent : "#f5f0e8" }}
      >
        {formatPrice(entry.price, locale)}
      </span>
    </div>
  ));
}

function PricingColumn({
  locale,
  title,
  time,
  entries,
  packages,
  accent
}: {
  locale: Locale;
  title: string;
  time: string;
  entries: PricingEntry[];
  packages?: PricingEntry[];
  accent: string;
}) {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/8 bg-black/10 p-4 md:p-5">
      <div className="mb-4 grid grid-cols-[1fr_auto] items-start gap-3 border-b border-white/10 pb-4">
        <div
          className="font-[family:var(--font-oswald)] text-xl uppercase leading-[0.95] md:text-2xl"
          style={{ color: accent }}
        >
          {title}
        </div>
        <div className="text-right font-[family:var(--font-oswald)] text-lg uppercase leading-none text-white/60 md:text-xl">
          {time}
        </div>
      </div>

      <div className="space-y-3">{renderPriceRows(entries, locale, accent, title.includes("/") || title.toLowerCase().includes("night"))}</div>

      {packages && packages.length > 0 ? (
        <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
          {packages.map((pack) => (
            <div
              key={`${t(locale, pack.label)}-${pack.price}`}
              className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[18px] border px-4 py-4"
              style={{
                borderColor: `${accent}66`,
                background: "linear-gradient(180deg,rgba(30,21,21,0.96),rgba(18,14,14,0.96))"
              }}
            >
              <span className="font-[family:var(--font-oswald)] text-lg uppercase leading-[1.05] md:text-xl" style={{ color: accent }}>
                {t(locale, pack.label)}
              </span>
              <span className="text-right font-[family:var(--font-oswald)] text-xl uppercase leading-none text-white md:text-2xl">
                {formatPrice(pack.price, locale)}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PeriodPanel({
  locale,
  label,
  dayCard,
  nightCard,
  accent
}: {
  locale: Locale;
  label: string;
  dayCard?: PricingCard;
  nightCard?: PricingCard;
  accent: string;
}) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#181615,#110f0f)] shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
      <div className="rounded-t-[28px] px-6 py-4 text-center font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-[#f7efe4] md:text-4xl" style={{ background: "linear-gradient(90deg,#6c1d2d,#9f2339)" }}>
        {label}
      </div>
      <div className="grid gap-5 p-5 md:p-6">
        {dayCard ? (
          <PricingColumn locale={locale} title={locale === "ru" ? "День" : "Day"} time="08:00 - 20:00" entries={dayCard.entries} accent={accent} />
        ) : null}
        {nightCard ? (
          <PricingColumn
            locale={locale}
            title={locale === "ru" ? "Вечер / ночь" : "Evening / night"}
            time="20:00 - 08:00"
            entries={nightCard.entries}
            packages={nightCard.packages}
            accent={accent}
          />
        ) : null}
      </div>
    </section>
  );
}

export function PricingSection({ locale }: { locale: Locale }) {
  const [activeKey, setActiveKey] = useState(categories[0]?.key ?? "private");
  const activeCategory = categories.find((category) => category.key === activeKey) ?? categories[0];

  return (
    <section className="section-shell py-16" id="pricing">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">{locale === "ru" ? "Тарифы" : "Pricing"}</div>
          <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
            {locale === "ru" ? "Всё в одном экране" : "Everything on one screen"}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/58">
          {locale === "ru"
            ? "Теперь прайс не уходит в длинную ленту вниз: выбираешь формат слева и сразу видишь будни, выходные, день, ночь и пакеты в одном месте."
            : "The price list no longer runs into a long scroll. Pick a format on the left and see weekdays, weekends, day, night and packages in one focused view."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
        <div className="overflow-x-auto xl:overflow-visible">
          <div className="flex gap-3 xl:grid xl:gap-2">
            {categories.map((category) => {
              const isActive = category.key === activeKey;

              return (
                <button
                  key={category.key}
                  className="min-w-[160px] border px-5 py-4 text-left font-[family:var(--font-oswald)] text-xl uppercase leading-none transition hover:border-white/20 xl:min-w-0 xl:text-2xl"
                  onClick={() => setActiveKey(category.key)}
                  style={{
                    background: isActive ? category.accent : "rgba(24,24,26,0.94)",
                    borderColor: isActive ? category.accent : "rgba(255,255,255,0.08)",
                    color: isActive ? "#fff6eb" : "#f5f0e8"
                  }}
                  type="button"
                >
                  {category.title.replace("PRIVATE", locale === "ru" ? "ПРИВАТ" : "PRIVATE")}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 bg-[rgba(24,24,26,0.96)] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] md:px-7" style={{ borderColor: activeCategory.accent }}>
            <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">{activeCategory.title.replace("PRIVATE", locale === "ru" ? "ПРИВАТ" : "PRIVATE")}</div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm md:tracking-[0.22em]" style={{ color: activeCategory.accent }}>
              {activeCategory.spec[locale]}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.14em] text-white/52 md:text-sm md:tracking-[0.18em]">{activeCategory.details[locale]}</div>
          </div>

          <div className="grid gap-6 2xl:grid-cols-2">
            <PeriodPanel
              accent={activeCategory.accent}
              dayCard={activeCategory.weekdayDay}
              label={locale === "ru" ? "Будни" : "Weekdays"}
              locale={locale}
              nightCard={activeCategory.weekdayNight}
            />
            <PeriodPanel
              accent={activeCategory.accent}
              dayCard={activeCategory.weekendDay}
              label={locale === "ru" ? "Выходные" : "Weekends"}
              locale={locale}
              nightCard={activeCategory.weekendNight}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

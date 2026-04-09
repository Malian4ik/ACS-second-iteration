import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, getRestaurantNav, getSharedContent, type Locale } from "@/lib/content";

export function RestaurantPage({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);

  return (
    <div className="pb-28 md:pb-0" id="top">
      <LocaleHtmlController locale={locale} />
      <AvulusNav ctaHref={contactLinks.telegram} ctaLabel={c.restaurantPrimary} items={getRestaurantNav(locale)} locale={locale} />

      <main>
        <section className="section-shell relative overflow-hidden pt-28 md:pt-36">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_72%_22%,rgba(116,16,33,0.34),rgba(116,16,33,0.16)_22%,rgba(116,16,33,0.05)_42%,rgba(9,9,9,0)_68%)]" />
          <div className="brand-orb right-[-8rem] top-12 h-64 w-64 bg-[radial-gradient(circle,rgba(24,104,82,0.42),rgba(24,104,82,0))] md:h-[28rem] md:w-[28rem]" />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-6">
              <div className="eyebrow">{c.restaurantEyebrow}</div>
              <h1 className="max-w-xl font-[family:var(--font-oswald)] text-6xl uppercase leading-[0.88] text-white md:text-8xl">{c.restaurantTitle}</h1>
              <p className="max-w-lg text-sm leading-7 text-white/64">{c.restaurantBody}</p>

              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center bg-[#ba6fff] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
                  goal="restaurant_telegram"
                  href={contactLinks.telegram}
                  target="_blank"
                >
                  {c.restaurantPrimary}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="restaurant_call"
                  href={contactLinks.call}
                >
                  {c.restaurantSecondary}
                </TrackedLink>
              </div>

              <div className="text-xs uppercase tracking-[0.24em] text-[#d7d1c4]">
                {c.venueSchedule} • {c.venueAddress}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[540px] overflow-hidden bg-[#101010]">
                <Image alt="Avulus restaurant interior" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src="/images/restaurant-real-1.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.96))]" />
                <div className="absolute left-6 top-6 border border-white/10 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{c.restaurantHeroBadge}</div>
                <div className="absolute bottom-6 left-6 max-w-sm">
                  <div className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white">{c.restaurantHeroHeadline}</div>
                </div>
              </div>

              <div className="relative min-h-[260px] overflow-hidden bg-[#101010] md:min-h-0">
                <Image alt="Avulus restaurant lounge" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 24vw" src="/images/restaurant-real-2.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.55),rgba(8,8,8,0.94))]" />
                <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-3xl uppercase text-white">{c.restaurantHeroSideTitle}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-10 md:py-14" id="about">
          <p className="max-w-3xl text-base leading-8 text-white/72 md:text-lg md:leading-9">{c.restaurantShortDescription}</p>
        </section>

        <section className="section-shell py-12 md:py-16" id="menu">
          <div>
            <div className="eyebrow">{c.restaurantMenuEyebrow}</div>
            <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">{c.restaurantMenuTitle}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">{c.restaurantMenuBody}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="relative min-h-[320px] overflow-hidden border border-white/10 bg-[#101010]">
              <Image alt="Avulus food" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/dish-main.jpg" />
            </div>
            <div className="relative min-h-[320px] overflow-hidden border border-white/10 bg-[#101010]">
              <Image alt="Avulus drinks" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/dish-drink.jpg" />
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/46">{c.restaurantMenuHint}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              className="inline-flex items-center justify-center bg-[#ba6fff] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
              goal="restaurant_menu_telegram"
              href={contactLinks.telegram}
              target="_blank"
            >
              {c.restaurantPrimary}
            </TrackedLink>
            <TrackedLink
              className="inline-flex items-center justify-center border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
              goal="restaurant_menu_link"
              href={c.restaurantMenuUrl}
              target="_blank"
            >
              {c.restaurantMenuButton}
            </TrackedLink>
          </div>
        </section>

        <section className="section-shell pb-20" id="reserve">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="brand-card p-8 md:p-10">
              <div className="eyebrow">{c.restaurantReserveEyebrow}</div>
              <div className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white md:text-6xl">{c.restaurantReserveTitle}</div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">{c.restaurantReserveBody}</p>
            </div>

            <div className="flex flex-col justify-between gap-4 border border-white/8 bg-[#0f0f10] p-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{c.restaurantDirectActions}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{c.venueAddress}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center bg-[#ba6fff] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
                  goal="restaurant_contact_telegram"
                  href={contactLinks.telegram}
                  target="_blank"
                >
                  Telegram
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="restaurant_contact_call"
                  href={contactLinks.call}
                >
                  {c.contactsPhone}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="restaurant_contact_menu"
                  href={c.restaurantMenuUrl}
                  target="_blank"
                >
                  {c.restaurantMenuButton}
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AvulusFooter locale={locale} />
    </div>
  );
}

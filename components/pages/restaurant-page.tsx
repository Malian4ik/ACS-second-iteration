import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getCmsContent } from "@/lib/cms";
import { contactLinks, getRestaurantNav, getSharedContent, type Locale } from "@/lib/content";
import { RestaurantMenuActions } from "@/components/restaurant/restaurant-menu-actions";

export async function RestaurantPage({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);
  const cms = locale === "ru" ? await getCmsContent() : null;

  return (
    <div className="pb-28 md:pb-0" id="top">
      <LocaleHtmlController locale={locale} />
      <AvulusNav
        ctaHref={contactLinks.telegram}
        ctaLabel={cms?.restaurant?.telegramCtaLabel ?? c.restaurantPrimary}
        items={getRestaurantNav(locale)}
        locale={locale}
      />

      <main>
        <section className="section-shell relative pt-28 md:pt-36">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_72%_22%,rgba(116,16,33,0.34),rgba(116,16,33,0.16)_22%,rgba(116,16,33,0.05)_42%,rgba(9,9,9,0)_68%)]" />
          <div className="brand-orb right-[-8rem] top-12 h-64 w-64 bg-[radial-gradient(circle,rgba(24,104,82,0.42),rgba(24,104,82,0))] md:h-[28rem] md:w-[28rem]" />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-6">
              <div className="eyebrow">{c.restaurantEyebrow}</div>
              <h1 className="max-w-xl font-[family:var(--font-oswald)] text-6xl uppercase leading-[0.88] text-white md:text-8xl">
                {locale === "ru" ? "Р РµСЃС‚РѕСЂР°РЅ РІРЅСѓС‚СЂРё РѕР±С‰РµР№ РЅРѕС‡РЅРѕР№ СЃС†РµРЅС‹ Avulus" : c.restaurantTitle}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-white/64">
                {locale === "ru"
                  ? "Р РµСЃС‚РѕСЂР°РЅ РІРЅСѓС‚СЂРё Avulus. РћС‚РєСЂС‹С‚Рѕ 24/7."
                  : c.restaurantBody}
              </p>
              <p className="max-w-xl text-sm leading-7 text-[var(--accent-sand)]">{cms?.restaurant?.shortDescription}</p>

              <div className="flex flex-wrap gap-3">
                <TrackedLink className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)]" goal="restaurant_telegram" href={contactLinks.telegram} target="_blank">
                  {cms?.restaurant?.telegramCtaLabel ?? c.restaurantPrimary}
                </TrackedLink>
                <TrackedLink className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]" goal="restaurant_call" href={contactLinks.call}>
                  +7 495 921-22-21
                </TrackedLink>
                <RestaurantMenuActions locale={locale} variant="hero" />
              </div>

              <div className="text-xs uppercase tracking-[0.24em] text-[#d7d1c4]">
                {cms?.restaurant?.heroBadge ?? c.restaurantHeroBadge} вЂў {c.venueAddress}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[540px] overflow-hidden bg-[#101010]">
                <Image alt="Avulus restaurant interior" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src={cms?.media?.restaurantHeroImage ?? "/images/restaurant-real-1.jpg"} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.96))]" />
                <div className="absolute left-6 top-6 border border-white/10 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">
                  {cms?.restaurant?.heroBadge ?? c.restaurantHeroBadge}
                </div>
                <div className="absolute bottom-6 left-6 max-w-sm">
                  <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.9] break-words text-white md:text-5xl">
                    {locale === "ru" ? "Р•РґР°, Р±Р°СЂ Рё РїРѕР·РґРЅРёР№ СЂРёС‚Рј" : c.restaurantHeroHeadline}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative min-h-[260px] overflow-hidden bg-[#101010]">
                  <Image alt="Avulus restaurant lounge" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 24vw" src={cms?.media?.restaurantSideImage ?? "/images/restaurant-real-2.jpg"} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.55),rgba(8,8,8,0.94))]" />
                  <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-3xl uppercase text-white">
                    {locale === "ru" ? "Dark lounge" : c.restaurantHeroSideTitle}
                  </div>
                </div>
                <div className="brand-card rounded-[28px] p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{c.restaurantMoodEyebrow}</div>
                  <div className="mt-4 font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.92] text-white">
                    {locale === "ru" ? "РљРѕСЂРѕС‚РєР°СЏ Рё РїРѕРЅСЏС‚РЅР°СЏ СЃС‚СЂР°РЅРёС†Р°" : c.restaurantMoodTitle}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {locale === "ru"
                      ? "РўРѕР»СЊРєРѕ РіР»Р°РІРЅРѕРµ: Р°С‚РјРѕСЃС„РµСЂР°, РµРґР°, Р±Р°СЂ Рё Р±С‹СЃС‚СЂС‹Р№ РєРѕРЅС‚Р°РєС‚."
                      : c.restaurantMoodBody}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-16" id="menu">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">{locale === "ru" ? "Р’РёР·СѓР°Р»СЊРЅРѕРµ РјРµРЅСЋ" : "Visual menu"}</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none break-words text-white md:text-6xl">
                {cms?.restaurant?.visualTitle ?? (locale === "ru" ? "Р•РґР° Рё Р±Р°СЂ" : "Food and bar")}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/58">{cms?.restaurant?.visualBody}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {(cms?.restaurant?.foodVisuals ?? []).map((card) => (
              <article key={card.id} className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#101010]">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image alt={card.title} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 1024px) 100vw, 50vw" src={card.imageUrl} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.44),rgba(8,8,8,0.94))]" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white">{card.title}</div>
                  <p className="text-sm leading-7 text-white/64">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20" id="reserve">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="brand-card p-8 md:p-10">
              <div className="eyebrow">{c.restaurantReserveEyebrow}</div>
              <div className="mt-4 font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.9] break-words text-white md:text-6xl">
                {locale === "ru" ? "РЎРґРµР»Р°Р№ РєРѕРЅС‚Р°РєС‚ Р·Р° РјРёРЅСѓС‚Сѓ" : c.restaurantReserveTitle}
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                {locale === "ru"
                  ? "РќР°РїРёС€РёС‚Рµ РІ Telegram РёР»Рё РїРѕР·РІРѕРЅРёС‚Рµ."
                  : c.restaurantReserveBody}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-[30px] border border-white/8 bg-[#0f0f10] p-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{c.restaurantDirectActions}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{c.venueAddress}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedLink className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)]" goal="restaurant_contact_telegram" href={contactLinks.telegram} target="_blank">
                  {cms?.restaurant?.telegramCtaLabel ?? "Telegram"}
                </TrackedLink>
                <TrackedLink className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]" goal="restaurant_contact_call" href={contactLinks.call}>
                  +7 495 921-22-21
                </TrackedLink>
                <RestaurantMenuActions locale={locale} variant="reserve" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <AvulusFooter locale={locale} />
    </div>
  );
}

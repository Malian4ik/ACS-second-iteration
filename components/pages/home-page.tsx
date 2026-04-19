import Image from "next/image";

import { PromoCarousel } from "@/components/home/promo-carousel";
import { LandingHeader } from "@/components/layout/landing-header";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getCmsContent } from "@/lib/cms";
import type { CtaAlignment, CtaButtonSize, CtaGap, PromoCard, SecondaryCtaTone } from "@/lib/cms-schema";
import { CONTACTS, OFFERS_FALLBACK, RESTAURANT_IMAGES, ROOM_CARDS } from "@/lib/landing-data";

const ctaAlignmentClasses: Record<CtaAlignment, string> = {
  left: "sm:justify-start",
  center: "sm:justify-center",
  right: "sm:justify-end"
};

const ctaGapClasses: Record<CtaGap, string> = {
  tight: "gap-2",
  normal: "gap-3",
  wide: "gap-4"
};

const primaryCtaSizeClasses: Record<CtaButtonSize, string> = {
  compact: "px-6 py-3 text-xs tracking-[0.14em]",
  standard: "px-7 py-4 text-sm tracking-[0.16em]",
  large: "px-8 py-5 text-sm tracking-[0.18em] shadow-[0_22px_54px_rgba(186,34,45,0.34)] md:px-9"
};

const secondaryCtaSizeClasses: Record<CtaButtonSize, string> = {
  compact: "px-5 py-3 text-xs tracking-[0.12em]",
  standard: "px-6 py-3.5 text-xs tracking-[0.14em]",
  large: "px-7 py-4 text-sm tracking-[0.16em]"
};

const secondaryCtaToneClasses: Record<SecondaryCtaTone, string> = {
  outline: "border border-white/16 text-white hover:border-[var(--accent-green)]",
  quiet: "border border-white/10 bg-white/[0.03] text-white/72 hover:border-white/22 hover:text-white"
};

function normalizeOfferCards(cards: PromoCard[]): PromoCard[] {
  return cards.map((card) => {
    const isAllowedCta = card.ctaHref.startsWith("https://t.me/") || card.ctaHref.startsWith("tel:");

    return {
      ...card,
      ctaHref: isAllowedCta ? card.ctaHref : CONTACTS.telegram
    };
  });
}


export async function HomePage() {
  const cms = await getCmsContent();
  const landing = cms.landing;
  const offerCards = normalizeOfferCards(
    cms.home.promoCards.length > 0 ? cms.home.promoCards : OFFERS_FALLBACK
  );
  const restaurantImages = [...landing.restaurantImages, ...RESTAURANT_IMAGES]
    .filter((value, index, array) => Boolean(value) && array.indexOf(value) === index)
    .slice(0, 4);

  const menuLink = landing.restaurantMenuUrl || process.env.NEXT_PUBLIC_MENU_URL || CONTACTS.menuFallback;
  const heroCta = cms.home.heroCta;

  return (
    <div className="pb-24 md:pb-0">
      <LandingHeader />



      <main id="top">
        <section className="section-shell relative overflow-hidden pt-32 md:pt-40">
          <div className="brand-orb left-[-10rem] top-8 h-64 w-64 md:h-96 md:w-96" />
          <div className="brand-orb right-[-8rem] top-20 h-56 w-56 bg-[radial-gradient(circle,rgba(26,90,73,0.34),rgba(26,90,73,0))] md:h-80 md:w-80" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-7xl">
              {landing.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-[#e7dfd0] md:text-2xl">{landing.heroSubtitle}</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
              {landing.heroDescription}
            </p>

            <div className={`mt-8 flex flex-col ${ctaGapClasses[heroCta.gap]} sm:flex-row ${ctaAlignmentClasses[heroCta.alignment]}`}>
              <TrackedLink
                className={`inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] font-semibold uppercase text-white transition hover:bg-[var(--accent-red-strong)] ${primaryCtaSizeClasses[heroCta.primarySize]}`}
                goal="hero_tg"
                href={CONTACTS.telegram}
                target="_blank"
              >
                {cms.home.primaryCtaLabel}
              </TrackedLink>
              <TrackedLink
                className={`inline-flex items-center justify-center rounded-full font-semibold uppercase transition ${secondaryCtaSizeClasses[heroCta.secondarySize]} ${secondaryCtaToneClasses[heroCta.secondaryTone]}`}
                goal="hero_call"
                href={CONTACTS.phone}
              >
                {cms.home.secondaryCtaLabel}
              </TrackedLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {landing.heroBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/14 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#e2d7bf]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="offers" className="section-shell py-16 md:py-20">
          <div className="mb-8 flex flex-col gap-3">
            <p className="eyebrow">Предложения</p>
            <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
              {landing.offersTitle}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-white/62">
              {landing.offersSubtitle}
            </p>
          </div>
          <PromoCarousel cards={offerCards} />
        </section>

        <section id="rooms" className="section-shell py-10 md:py-14">
          <div className="mb-8">
            <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">{landing.roomsTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-white/62">{landing.roomsSubtitle}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {ROOM_CARDS.map((room) => (
              <article key={room.id} className="brand-card overflow-hidden rounded-[28px]">
                <div className="relative aspect-[4/3]">
                  <Image alt={room.title} className="object-cover" fill sizes="(max-width: 1024px) 100vw, 33vw" src={room.image} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.06),rgba(9,9,9,0.58),rgba(9,9,9,0.95))]" />
                  <div className="absolute left-5 bottom-5 right-5">
                    <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.94] text-white">{room.title}</h3>
                    <span className="mt-2 inline-flex rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#e2d7bf]">
                      Вместимость: {room.capacity}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent-sand)]">{room.price}</p>
                  <p className="text-sm leading-7 text-white/66">{room.description}</p>
                  <div className="flex gap-2">
                    <TrackedLink
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--accent-red)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--accent-red-strong)]"
                      goal={`room_${room.id}_tg`}
                      href={CONTACTS.telegram}
                      target="_blank"
                    >
                      Уточнить в Telegram
                    </TrackedLink>
                    <TrackedLink
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/16 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)]"
                      goal={`room_${room.id}_call`}
                      href={CONTACTS.phone}
                    >
                      Позвонить
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="restaurant" className="section-shell py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
            <article className="brand-card rounded-[30px] p-6 md:p-8">
              <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">{landing.restaurantTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {landing.restaurantSubtitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                {landing.restaurantBody}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)]"
                  goal="restaurant_menu"
                  href={menuLink}
                  target="_blank"
                >
                  {landing.restaurantMenuLabel}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--accent-red-strong)]"
                  goal="restaurant_tg"
                  href={CONTACTS.telegram}
                  target="_blank"
                >
                  {landing.restaurantTelegramLabel}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)]"
                  goal="restaurant_call"
                  href={CONTACTS.phone}
                >
                  {landing.restaurantCallLabel}
                </TrackedLink>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {restaurantImages.map((src, index) => (
                <div key={src} className="brand-card relative overflow-hidden rounded-[22px]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={`Restaurant photo ${index + 1}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      src={src}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="visit" className="section-shell pb-20">
          <div className="brand-card rounded-[32px] p-6 md:p-8">
            <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">{landing.contactsTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/62">{landing.contactsAddress}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {landing.contactsBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/14 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#e2d7bf]">{badge}</span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-[var(--accent-sand)]">Отвечаем в Telegram за 1-2 минуты.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--accent-red-strong)]"
                goal="contacts_tg"
                href={CONTACTS.telegram}
                target="_blank"
              >
                {landing.contactsTelegramLabel}
              </TrackedLink>
              <TrackedLink
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)]"
                goal="contacts_vk"
                href={CONTACTS.vk}
                target="_blank"
              >
                {landing.contactsVkLabel}
              </TrackedLink>
              <TrackedLink
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[var(--accent-green)]"
                goal="contacts_call"
                href={CONTACTS.phone}
              >
                {landing.contactsPhoneLabel || CONTACTS.phoneLabel}
              </TrackedLink>
            </div>

            <div className="relative mt-7 overflow-hidden rounded-[24px] border border-white/10">
              <iframe
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={landing.contactsMapUrl}
                title="Карта Avulus"
              />
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/92 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <TrackedLink
            className="flex-1 rounded-full bg-[var(--accent-red)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
            goal="sticky_tg"
            href={CONTACTS.telegram}
            target="_blank"
          >
            Telegram
          </TrackedLink>
          <TrackedLink
            className="flex-1 rounded-full border border-white/18 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
            goal="sticky_call"
            href={CONTACTS.phone}
          >
            Позвонить
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}



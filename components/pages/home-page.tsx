import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, getHomeNav, getSharedContent, type Locale, withLocale } from "@/lib/content";

export function HomePage({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);

  const splitCards = [
    {
      id: "club",
      eyebrow: c.homeCardClubEyebrow,
      title: "Cyberclub",
      body: c.homeCardClubBody,
      image: "/images/cyberclub-team.jpg",
      href: contactLinks.telegram,
      label: c.homeCardClubLabel,
      pageHref: withLocale(locale, "/cyberclub"),
      pageLabel: c.homeCardClubPage
    },
    {
      id: "restaurant",
      eyebrow: c.homeCardRestaurantEyebrow,
      title: "Restaurant",
      body: c.homeCardRestaurantBody,
      image: "/images/restaurant-room.jpg",
      href: contactLinks.telegram,
      label: c.homeCardRestaurantLabel,
      pageHref: withLocale(locale, "/restaurant"),
      pageLabel: c.homeCardRestaurantPage
    }
  ];

  const featureCards = [
    { title: c.featureAlwaysOpenTitle, body: c.featureAlwaysOpenBody },
    { title: c.featureLocationTitle, body: c.venueAddress },
    { title: c.featureContactsTitle, body: c.featureContactsBody }
  ];

  return (
    <div className="pb-28 md:pb-0">
      <LocaleHtmlController locale={locale} />
      <AvulusNav ctaHref={contactLinks.telegram} ctaLabel={c.navBook} items={getHomeNav(locale)} locale={locale} />

      <main>
        <section className="section-shell relative overflow-hidden pt-28 md:pt-36">
          <div className="brand-orb left-[-10rem] top-10 h-64 w-64 md:h-96 md:w-96" />
          <div className="brand-orb right-[-8rem] top-24 h-56 w-56 bg-[radial-gradient(circle,rgba(120,32,152,0.36),rgba(120,32,152,0))] md:h-80 md:w-80" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative h-28 w-28 md:h-36 md:w-36">
              <Image alt="Avulus logo" className="object-contain" fill priority sizes="144px" src="/images/avulus-logo-rgb.png" />
            </div>

            <p className="mt-6 inline-flex border border-[#ba6fff]/55 bg-[#ba6fff]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f0dcff] md:text-sm">
              {c.homeOpenBadge}
            </p>
            <h1 className="mt-5 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-7xl">
              Avulus <span className="text-[#ba6fff]">Cyber Space</span>
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.34em] text-[#d7d1c4] md:text-sm">{c.homeHeroKicker}</p>
            <p className="mt-3 text-sm font-medium text-white/78">{c.homeOpenSupport}</p>

            <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#ba6fff] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#c989ff]"
                goal="hero_book_club"
                href={contactLinks.telegram}
                target="_blank"
              >
                {c.homeBookClub}
              </TrackedLink>
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/18 bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#ba6fff] hover:text-[#e0c6ff]"
                goal="hero_book_restaurant"
                href={contactLinks.telegram}
                target="_blank"
              >
                {c.homeReserveTable}
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="mb-6 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">{c.homeOffersTitle}</div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {c.homeOffersCards.map((offer, index) => (
              <article key={offer.title} className="brand-card rounded-[24px] p-6">
                <h2 className="font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">{offer.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{offer.body}</p>
                <TrackedLink
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-[#ba6fff]/45 bg-black/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f0dcff] transition hover:border-[#ba6fff] hover:bg-[#ba6fff]/10"
                  goal={`home_offer_${index + 1}`}
                  href={contactLinks.telegram}
                  target="_blank"
                >
                  {offer.cta}
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {splitCards.map((card) => (
              <article key={card.id} id={card.id} className="group relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#101010]">
                <div className="absolute inset-0">
                  <Image alt={card.title} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 50vw" src={card.image} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.78)_45%,rgba(7,7,7,0.96))]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{card.eyebrow}</div>
                  <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white md:text-6xl">{card.title}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">{card.body}</p>
                  <TrackedLink
                    className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-[#ba6fff]/45 bg-black/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#f0dcff] transition hover:border-[#ba6fff] hover:bg-[#ba6fff]/10"
                    goal={`split_${card.id}_cta`}
                    href={card.href}
                    target="_blank"
                  >
                    {card.label}
                  </TrackedLink>
                  <TrackedLink
                    className="mt-3 inline-flex w-fit items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
                    goal={`split_${card.id}_page`}
                    href={card.pageHref}
                  >
                    {card.pageLabel}
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-10">
          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <article key={card.title} className="brand-card rounded-[24px] p-6">
                <div className="font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">{card.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-10" id="contact">
          <div className="brand-card rounded-[28px] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">{c.contactsTitle}</div>
                <p className="mt-3 text-sm text-white/62">{c.contactsSubtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedLink className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#e0c6ff]" goal="contact_tg" href={contactLinks.telegram} target="_blank">
                  Telegram
                </TrackedLink>
                <TrackedLink className="inline-flex items-center justify-center rounded-full bg-[#ba6fff] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]" goal="contact_call" href={contactLinks.call}>
                  {c.contactsPhone}
                </TrackedLink>
              </div>
            </div>
            <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-white/62">
              <p>
                <span className="text-white/42">{locale === "ru" ? "Адрес: " : "Address: "}</span>
                {c.venueAddress}
              </p>
              <p>
                <span className="text-white/42">{locale === "ru" ? "Телефон: " : "Phone: "}</span>
                {c.contactsPhone}
              </p>
            </div>
            <p className="mt-4 text-sm text-white/62">{c.contactsOpen247}</p>
            <p className="mt-2 text-sm text-white/62">{c.contactsParking}</p>
          </div>
        </section>

        <section className="section-shell pb-20" id="map">
          <div className="brand-card rounded-[28px] p-6 md:p-8">
            <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">{c.mapTitle}</div>
            <div className="relative mt-6 overflow-hidden rounded-[20px] border border-white/10">
              <iframe
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://yandex.ru/map-widget/v1/?ll=37.648860%2C55.750838&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njc4MjI2NxJG0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCh0LXRgNC10LHRgNGP0L3QuNGH0LXRgdC60LjQuSDQv9C10YDQtdGD0LvQvtC6LCAxMtGBMSIKDcs4FkIVN0ZC&z=16"
                title={c.mapFrameTitle}
              />
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/92 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <TrackedLink className="flex-1 rounded-full bg-[#ba6fff] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-black" goal="sticky_booking" href={contactLinks.telegram} target="_blank">
            Telegram
          </TrackedLink>
          <TrackedLink className="flex-1 rounded-full border border-white/18 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white" goal="sticky_restaurant" href={contactLinks.call}>
            {locale === "ru" ? "Позвонить" : "Call"}
          </TrackedLink>
        </div>
      </div>

      <AvulusFooter locale={locale} />
    </div>
  );
}

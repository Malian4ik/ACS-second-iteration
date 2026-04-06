import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, getHomeNav, getSharedContent, type Locale, withLocale } from "@/lib/content";

export function HomePage({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);
  const isRu = locale === "ru";

  const formatCards = [
    {
      title: isRu ? "Stream / Solo" : "Stream / Solo",
      description: isRu
        ? "Для тех, кому нужен личный ритм: стрим, спокойная игра, длинная сессия без общего зала."
        : "For guests who need a private rhythm: streaming, focused play and longer sessions away from the main hall.",
      audience: isRu ? "1 гость" : "1 guest",
      price: isRu ? "от 290 ₽ / час" : "from 290 RUB / hour",
      image: "/images/club-room-green.webp",
      href: withLocale(locale, "/rooms?format=solo")
    },
    {
      title: isRu ? "Privat / VIP" : "Privat / VIP",
      description: isRu
        ? "Комнаты для пары, кооператива и камерных встреч, когда важны приватность и комфорт."
        : "Rooms for pairs, co-op sessions and intimate evenings where privacy and comfort matter.",
      audience: isRu ? "2-4 гостя" : "2-4 guests",
      price: isRu ? "от 490 ₽ / час" : "from 490 RUB / hour",
      image: "/images/club-room-red.webp",
      href: withLocale(locale, "/rooms?format=duo")
    },
    {
      title: isRu ? "Team / Bootcamp" : "Team / Bootcamp",
      description: isRu
        ? "Формат для сквадов, командных сессий и длинных игровых блоков с прямым переходом в ресторан."
        : "Built for squads, team sessions and longer gaming blocks with an easy handoff into the restaurant.",
      audience: isRu ? "5+ гостей" : "5+ guests",
      price: isRu ? "от 850 ₽ / час" : "from 850 RUB / hour",
      image: "/images/cyberclub-team.jpg",
      href: withLocale(locale, "/rooms?format=bootcamp")
    }
  ];

  const splitCards = [
    {
      id: "club",
      eyebrow: c.homeCardClubEyebrow,
      title: isRu ? "Клуб" : "Club",
      body: c.homeCardClubBody,
      image: "/images/club-room-red.webp",
      href: contactLinks.booking,
      label: c.homeCardClubLabel,
      pageHref: withLocale(locale, "/cyberclub"),
      pageLabel: c.homeCardClubPage
    },
    {
      id: "restaurant",
      eyebrow: c.homeCardRestaurantEyebrow,
      title: isRu ? "Ресторан" : "Restaurant",
      body: c.homeCardRestaurantBody,
      image: "/images/restaurant-real-1.jpg",
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
      <AvulusNav ctaHref={contactLinks.booking} ctaLabel={c.navBook} items={getHomeNav(locale)} locale={locale} />

      <main>
        <section className="section-shell relative overflow-hidden pt-28 md:pt-36">
          <div className="brand-orb left-[-10rem] top-10 h-64 w-64 md:h-96 md:w-96" />
          <div className="brand-orb right-[-8rem] top-24 h-56 w-56 bg-[radial-gradient(circle,rgba(26,90,73,0.34),rgba(26,90,73,0))] md:h-80 md:w-80" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative h-28 w-28 md:h-36 md:w-36">
              <Image alt="Avulus logo" className="object-contain" fill priority sizes="144px" src="/images/avulus-logo-rgb.png" />
            </div>

            <h1 className="mt-6 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-7xl">
              Avulus <span className="text-[var(--accent-sand)]">Cyber Space</span>
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.34em] text-[#d7d1c4] md:text-sm">{c.homeHeroKicker}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64 md:text-base">
              {isRu
                ? "Реальные приватные комнаты, командные форматы, ресторан 24/7 и понятный путь к брони без декоративного шума."
                : "Real private rooms, team formats, a 24/7 restaurant and a clear path to booking without decorative noise."}
            </p>
            <p className="mt-3 text-sm text-white/56">{c.venueSchedule}</p>

            <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--accent-red-strong)]"
                goal="hero_book_club"
                href={contactLinks.booking}
                target="_blank"
              >
                {c.homeBookClub}
              </TrackedLink>
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[rgba(255,244,224,0.18)] bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
                goal="hero_book_restaurant"
                href={contactLinks.telegram}
                target="_blank"
              >
                {c.homeReserveTable}
              </TrackedLink>
            </div>

            <div className="mt-8 grid w-full max-w-4xl gap-3 text-left md:grid-cols-3">
              <div className="brand-card rounded-[28px] p-5">
                <div className="eyebrow">{isRu ? "Форматы" : "Formats"}</div>
                <div className="mt-3 text-base leading-7 text-white/72">
                  {isRu ? "Solo, Privat, VIP, Bootcamp и командные сценарии." : "Solo, Privat, VIP, Bootcamp and team scenarios."}
                </div>
              </div>
              <div className="brand-card rounded-[28px] p-5">
                <div className="eyebrow">{isRu ? "Тарифы" : "Rates"}</div>
                <div className="mt-3 text-base leading-7 text-white/72">
                  {isRu ? "Стартовые цены видны сразу, без длинного поиска по странице." : "Starting prices are visible early, without a long search."}
                </div>
              </div>
              <div className="brand-card rounded-[28px] p-5">
                <div className="eyebrow">{isRu ? "Контакт" : "Contact"}</div>
                <div className="mt-3 text-base leading-7 text-white/72">
                  {isRu ? "Бронь, Telegram, VK и звонок доступны с первого экрана." : "Booking, Telegram, VK and a direct call are available from the first screen."}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-16 md:py-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">{isRu ? "Комнаты и форматы" : "Rooms and formats"}</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
                {isRu ? "Сразу видно, что можно забронировать" : "See what can be booked right away"}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/62">
              {isRu
                ? "Этот блок нужен, чтобы на главной были не абстрактные обещания, а реальные сценарии: кто приходит, какой формат выбирает и от какой цены начинается вход."
                : "This block replaces abstract promises with real scenarios: who comes in, which format they choose and where pricing starts."}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {formatCards.map((card) => (
              <article key={card.title} className="brand-card overflow-hidden rounded-[30px]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image alt={card.title} className="object-cover" fill sizes="(max-width: 1024px) 100vw, 33vw" src={card.image} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.08),rgba(9,9,9,0.44),rgba(9,9,9,0.96))]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#e8dcc7]">
                    {card.audience}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.94] text-white">{card.title}</div>
                    <div className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-sand)]">{card.price}</div>
                  </div>
                </div>
                <div className="space-y-5 p-6">
                  <p className="text-sm leading-7 text-white/66">{card.description}</p>
                  <TrackedLink
                    className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(255,244,224,0.16)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-red)] hover:bg-[rgba(159,35,57,0.1)]"
                    goal={`home_format_${card.title}`}
                    href={card.href}
                  >
                    {isRu ? "Смотреть формат" : "View format"}
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-8">
          <div className="grid gap-6 md:grid-cols-2">
            {splitCards.map((card) => (
              <article key={card.id} id={card.id} className="group relative min-h-[520px] overflow-hidden rounded-[34px] bg-[#101010]">
                <div className="absolute inset-0">
                  <Image alt={card.title} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 50vw" src={card.image} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.78)_45%,rgba(7,7,7,0.96))]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{card.eyebrow}</div>
                  <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white md:text-6xl">{card.title}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">{card.body}</p>
                  <TrackedLink
                    className={`mt-6 inline-flex w-fit items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                      card.id === "club"
                        ? "border-[rgba(159,35,57,0.55)] bg-[rgba(159,35,57,0.16)] text-white hover:bg-[rgba(159,35,57,0.28)]"
                        : "border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.14)] text-white hover:bg-[rgba(26,90,73,0.26)]"
                    }`}
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
              <article key={card.title} className="brand-card rounded-[28px] p-6">
                <div className="font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">{card.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-10" id="contact">
          <div className="brand-card rounded-[32px] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">{c.contactsTitle}</div>
                <p className="mt-3 text-sm text-white/62">{c.contactsSubtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedLink className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)]" goal="contact_call" href={contactLinks.call}>
                  +7 495 921-22-21
                </TrackedLink>
                <TrackedLink className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-red)] hover:text-[var(--accent-sand)]" goal="contact_tg" href={contactLinks.telegram} target="_blank">
                  Telegram
                </TrackedLink>
                <TrackedLink className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]" goal="contact_vk" href={contactLinks.vk} target="_blank">
                  VK
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-20" id="map">
          <div className="brand-card rounded-[32px] p-6 md:p-8">
            <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">{c.mapTitle}</div>
            <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/10">
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
          <TrackedLink className="flex-1 rounded-full bg-[var(--accent-red)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white" goal="sticky_booking" href={contactLinks.booking} target="_blank">
            {c.stickyClub}
          </TrackedLink>
          <TrackedLink className="flex-1 rounded-full border border-white/18 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white" goal="sticky_restaurant" href={contactLinks.telegram} target="_blank">
            {c.stickyRestaurant}
          </TrackedLink>
        </div>
      </div>

      <AvulusFooter locale={locale} />
    </div>
  );
}

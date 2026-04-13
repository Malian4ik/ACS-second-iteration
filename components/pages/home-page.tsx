import Image from "next/image";

import { PromoCarousel } from "@/components/home/promo-carousel";
import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getCmsContent } from "@/lib/cms";
import {
  contactLinks,
  getHomeNav,
  getSharedContent,
  type Locale
} from "@/lib/content";

/* ─────────────────────────────────────────────
   Room card data (section 3)
───────────────────────────────────────────── */
const roomCards = [
  {
    key: "stream",
    title: "Stream",
    capacity: "1 чел",
    description: "Одно место, свой монитор, тишина. Для игры или стрима.",
    priceDay: "от 290 ₽/час",
    priceNight: "от 330 ₽/час",
    image: "/images/club-room-green.webp"
  },
  {
    key: "privat",
    title: "Privat",
    capacity: "2 чел",
    description: "Отдельная комната на двоих. TV, диван, тихо.",
    priceDay: "от 490 ₽/час",
    priceNight: "от 590 ₽/час",
    image: "/images/cyberclub-card.jpg"
  },
  {
    key: "privat-plus",
    title: "Privat+",
    capacity: "2 чел",
    description: "Больше пространства для длинного вечера вдвоём. Диван, минибар.",
    priceDay: "от 690 ₽/час",
    priceNight: "от 790 ₽/час",
    image: "/images/cyberclub-vip.jpg"
  },
  {
    key: "vip",
    title: "VIP",
    capacity: "2–4 чел",
    description: "Большая приватная комната. Диван, минибар, румсервис из ресторана. Можно провести ночь с комфортом.",
    priceDay: "от 890 ₽/час",
    priceNight: "от 990 ₽/час",
    image: "/images/club-room-red.webp"
  },
  {
    key: "super-vip",
    title: "Super VIP",
    capacity: "2–4 чел",
    description: "Максимум приватности и места. Свой вход, полный сервис, тишина. Для тех, кому важно, чтобы никто не мешал.",
    priceDay: "По запросу",
    priceNight: "По запросу",
    image: "/images/cyberclub-vip.jpg"
  },
  {
    key: "bootcamp",
    title: "Bootcamp",
    capacity: "5+ чел",
    description: "Комната для команды. 5 и больше мест за одним столом. Длинные сессии, тренировки, турниры.",
    priceDay: "от 850 ₽/час",
    priceNight: "от 850 ₽/час",
    image: "/images/cyberclub-team.jpg"
  }
];

/* ─────────────────────────────────────────────
   Restaurant photos (section 4)
───────────────────────────────────────────── */
const restaurantPhotos = [
  { src: "/images/dish-burger.jpg", alt: "Кухня Avulus" },
  { src: "/images/dish-cocktail.jpg", alt: "Бар и коктейли" },
  { src: "/images/dish-ramen.jpg", alt: "Горячие блюда" },
  { src: "/images/dish-snack.jpg", alt: "Закуски" }
];

/* ─────────────────────────────────────────────
   Page component
───────────────────────────────────────────── */
export async function HomePage({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);
  const isRu = locale === "ru";
  const cms = isRu ? await getCmsContent() : null;
  const promoCards = cms?.home.promoCards ?? [];

  return (
    <div className="pb-28 md:pb-0">
      <LocaleHtmlController locale={locale} />
      <AvulusNav
        ctaHref={contactLinks.telegram}
        ctaLabel={cms?.home.primaryCtaLabel ?? "Написать в Telegram"}
        items={getHomeNav(locale)}
        locale={locale}
      />

      <main>
        {/* ═══════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════ */}
        <section className="section-shell relative pt-28 pb-16 md:pt-36 md:pb-20">
          {/* background orbs */}
          <div className="brand-orb left-1/2 top-0 h-80 w-[120vw] -translate-x-1/2 md:-translate-x-0 md:left-[-10rem] md:top-10 md:h-96 md:w-96" />
          <div className="brand-orb right-[-8rem] top-24 h-56 w-56 bg-[radial-gradient(circle,rgba(26,90,73,0.34),rgba(26,90,73,0))] md:h-80 md:w-80" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo */}
            <div className="relative h-24 w-24 md:h-32 md:w-32">
              <Image
                alt="Avulus logo"
                className="object-contain"
                fill
                priority
                sizes="128px"
                src="/images/avulus-logo-rgb.png"
              />
            </div>

            {/* Heading */}
            <h1 className="mt-6 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-7xl">
              Avulus <span className="text-[var(--accent-sand)]">Cyber Space</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm uppercase tracking-[0.26em] text-[#d7d1c4] md:text-base">
              {isRu ? "Клуб и ресторан 24/7 в центре Москвы" : "Club & restaurant 24/7 in central Moscow"}
            </p>

            {/* Tagline */}
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60 md:text-base">
              {isRu
                ? "Приватные игровые комнаты, кухня и бар — круглосуточно."
                : "Private gaming rooms, kitchen and bar — around the clock."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--accent-red)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--accent-red-strong)]"
                goal="hero_telegram"
                href={contactLinks.telegram}
                target="_blank"
              >
                {isRu ? "Написать в Telegram" : "Message on Telegram"}
              </TrackedLink>
              <TrackedLink
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[rgba(255,244,224,0.18)] bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
                goal="hero_phone"
                href={contactLinks.call}
              >
                {isRu ? "Позвонить" : "Call"}
              </TrackedLink>
            </div>

            {/* Badge pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["24/7", isRu ? "Центр Москвы" : "Central Moscow", isRu ? "Бесплатная парковка" : "Free parking"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 — ОФФЕРЫ (CMS-driven)
        ═══════════════════════════════════════ */}
        <section className="section-shell pb-16 md:pb-20" id="offers">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">{isRu ? "Актуальные офферы" : "Current offers"}</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">
                {cms?.home.promoTitle ?? (isRu ? "Спецпредложения" : "Special offers")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              {cms?.home.promoSubtitle ??
                (isRu
                  ? "Актуальные форматы. Каждая карточка ведет в Telegram."
                  : "Current formats. Each card leads straight to Telegram.")}
            </p>
          </div>
          <PromoCarousel cards={promoCards} />
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 — КОМНАТЫ
        ═══════════════════════════════════════ */}
        <section className="section-shell py-16 md:py-20" id="rooms">
          {/* Section header */}
          <div className="mb-10">
            <div className="eyebrow">{isRu ? "Комнаты" : "Rooms"}</div>
            <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">
              {isRu ? "Комнаты" : "Rooms"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/58">
              {isRu
                ? "Выбирайте формат, пишите в Telegram — забронируем."
                : "Pick your format, message us on Telegram — we'll book it."}
            </p>
          </div>

          {/* Room cards grid */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roomCards.map((room) => (
              <article
                key={room.key}
                className="brand-card group overflow-hidden rounded-[30px]"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    alt={room.title}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={room.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.05),rgba(9,9,9,0.42),rgba(9,9,9,0.94))]" />

                  {/* Capacity badge */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/48 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#e8dcc7]">
                    {room.capacity}
                  </div>

                  {/* Title + price overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.94] text-white">
                      {room.title}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="space-y-4 p-5">
                  <p className="text-sm leading-6 text-white/62">{room.description}</p>

                  {/* Day / night pricing */}
                  <div className="flex gap-4 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="uppercase tracking-[0.2em] text-white/40">
                        {isRu ? "День" : "Day"}
                      </span>
                      <span className="font-semibold text-[var(--accent-sand)]">
                        {room.priceDay}
                      </span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="flex flex-col gap-0.5">
                      <span className="uppercase tracking-[0.2em] text-white/40">
                        {isRu ? "Ночь" : "Night"}
                      </span>
                      <span className="font-semibold text-[var(--accent-sand)]">
                        {room.priceNight}
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2 pt-1">
                    <TrackedLink
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[rgba(159,35,57,0.18)] border border-[rgba(159,35,57,0.40)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(159,35,57,0.30)]"
                      goal={`room_tg_${room.key}`}
                      href={contactLinks.telegram}
                      target="_blank"
                    >
                      Telegram
                    </TrackedLink>
                    <TrackedLink
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/12 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/28 hover:text-white"
                      goal={`room_call_${room.key}`}
                      href={contactLinks.call}
                    >
                      {isRu ? "Позвонить" : "Call"}
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pricing note */}
          <p className="mt-6 text-center text-xs text-white/38">
            {isRu
              ? "Подробный прайс — в Telegram. Тарифы зависят от дня недели и времени суток."
              : "Full pricing in Telegram. Rates vary by day and time."}
          </p>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 — РЕСТОРАН
        ═══════════════════════════════════════ */}
        <section className="section-shell py-16 md:py-20" id="restaurant">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">{isRu ? "Ресторан" : "Restaurant"}</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">
                {isRu ? "Ресторан и бар" : "Restaurant & bar"}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">
                {isRu
                  ? "Кухня, коктейли и румсервис в комнаты клуба. Открыты 24/7."
                  : "Kitchen, cocktails and room service to club rooms. Open 24/7."}
              </p>
            </div>
          </div>

          {/* Body text */}
          <p className="mb-8 max-w-2xl text-sm leading-7 text-white/62">
            {isRu
              ? "Полноценный ресторан внутри Avulus. Можно зайти отдельно или заказать еду прямо в комнату. Работаем круглосуточно — завтрак в 6 утра, ужин в 3 ночи, без разницы."
              : "A full restaurant inside Avulus. You can come in separately or order food straight to your room. Open around the clock — breakfast at 6am, dinner at 3am, no problem."}
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {restaurantPhotos.map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[3/4] overflow-hidden rounded-[22px] border border-white/8"
              >
                <Image
                  alt={photo.alt}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  src={photo.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,6,6,0.72))]" />
                <div className="absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.22em] text-white/72">
                  {photo.alt}
                </div>
              </div>
            ))}
          </div>

          {/* Restaurant CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              className="inline-flex items-center justify-center rounded-full border border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.16)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(26,90,73,0.28)]"
              goal="restaurant_menu"
              href={contactLinks.menu}
              target="_blank"
            >
              {isRu ? "Посмотреть меню" : "View menu"}
            </TrackedLink>
            <TrackedLink
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/28 hover:text-white"
              goal="restaurant_call"
              href={contactLinks.call}
            >
              {isRu ? "Позвонить" : "Call"}
            </TrackedLink>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 — КОНТАКТЫ
        ═══════════════════════════════════════ */}
        <section className="section-shell py-16 pb-24 md:py-20" id="contact">
          <div className="brand-card rounded-[32px] p-6 md:p-10">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              {/* ── LEFT: info column ── */}
              <div className="flex flex-col gap-7">

                {/* Eyebrow */}
                <div className="eyebrow">{isRu ? "Контакты" : "Contacts"}</div>

                {/* Big heading */}
                <h2 className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-6xl">
                  {isRu ? (
                    <>Приходите<br />в Avulus</>
                  ) : (
                    <>Come to<br />Avulus</>
                  )}
                </h2>

                {/* Info rows */}
                <div className="flex flex-col gap-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(159,35,57,0.38)] bg-[rgba(159,35,57,0.14)]">
                      <svg className="h-4 w-4 text-[var(--accent-sand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="mb-0.5 text-[10px] uppercase tracking-[0.26em] text-white/38">
                        {isRu ? "Адрес" : "Address"}
                      </div>
                      <div className="text-sm leading-6 text-white/80">{c.venueAddress}</div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(159,35,57,0.38)] bg-[rgba(159,35,57,0.14)]">
                      <svg className="h-4 w-4 text-[var(--accent-sand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="mb-0.5 text-[10px] uppercase tracking-[0.26em] text-white/38">
                        {isRu ? "Часы работы" : "Hours"}
                      </div>
                      <div className="text-sm leading-6 text-white/80">
                        {isRu ? "Ежедневно, 24/7" : "Daily, 24/7"}
                      </div>
                    </div>
                  </div>

                  {/* Parking */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(159,35,57,0.38)] bg-[rgba(159,35,57,0.14)]">
                      <svg className="h-4 w-4 text-[var(--accent-sand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div>
                      <div className="mb-0.5 text-[10px] uppercase tracking-[0.26em] text-white/38">
                        {isRu ? "Парковка" : "Parking"}
                      </div>
                      <div className="text-sm leading-6 text-white/80">
                        {isRu ? "Бесплатная парковка рядом" : "Free parking nearby"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hint */}
                <div>
                  <p className="text-sm font-semibold text-[var(--accent-sand)]">
                    {isRu ? "Ответим за 2 минуты" : "We reply within 2 minutes"}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {isRu ? "Поможем выбрать формат" : "We'll help you pick the right format"}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <TrackedLink
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)]"
                    goal="contact_tg"
                    href={contactLinks.telegram}
                    target="_blank"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    {isRu ? "Написать в Telegram" : "Message on Telegram"}
                  </TrackedLink>
                  <TrackedLink
                    className="inline-flex items-center gap-2 rounded-full border border-white/16 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/30 hover:text-white"
                    goal="contact_call"
                    href={contactLinks.call}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                    </svg>
                    {isRu ? "Позвонить" : "Call"}
                  </TrackedLink>
                </div>
              </div>

              {/* ── RIGHT: map ── */}
              <div className="relative overflow-hidden rounded-[22px] border border-white/10">
                <iframe
                  className="h-[380px] w-full md:h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://yandex.ru/map-widget/v1/?ll=37.648335%2C55.750049&mode=search&oid=244165336383&ol=biz&z=16"
                  title={c.mapFrameTitle}
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/92 px-2 py-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-1.5 text-xs">
          <TrackedLink
            className="flex-1 rounded-full bg-[var(--accent-red)] px-2 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="sticky_telegram"
            href={contactLinks.telegram}
            target="_blank"
          >
            Telegram
          </TrackedLink>
          <TrackedLink
            className="flex-1 rounded-full border border-white/18 px-2 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="sticky_call"
            href={contactLinks.call}
          >
            {isRu ? "Звонок" : "Call"}
          </TrackedLink>
        </div>
      </div>

      <AvulusFooter locale={locale} />
    </div>
  );
}

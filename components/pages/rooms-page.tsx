import { AvulusFooter } from "@/components/layout/avulus-footer";
import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { RoomsExplorer } from "@/components/rooms/rooms-explorer";
import { TrackedLink } from "@/components/ui/tracked-link";
import {
  contactLinks,
  getContactOptions,
  getRoomsNav,
  getSharedContent,
  type Locale
} from "@/lib/content";

type RoomsPageProps = {
  locale: Locale;
  searchParams?: {
    format?: string;
  };
};

export function RoomsPage({ locale, searchParams }: RoomsPageProps) {
  const c = getSharedContent(locale);
  const contactOptions = getContactOptions(locale);
  const requestedFilter = searchParams?.format;
  const initialFilter =
    requestedFilter === "solo" ||
    requestedFilter === "private" ||
    requestedFilter === "vip" ||
    requestedFilter === "bootcamp"
      ? requestedFilter
      : "all";

  return (
    <div className="pb-24 md:pb-0">
      <LocaleHtmlController locale={locale} />
      <AvulusNav
        ctaHref={contactLinks.telegram}
        ctaLabel={locale === "ru" ? "Написать в Telegram" : "Write in Telegram"}
        items={getRoomsNav(locale)}
        locale={locale}
      />

      <main className="section-shell space-y-16 pt-32 md:pt-36">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="eyebrow">{c.roomsEyebrow}</div>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold break-words leading-[0.96] tracking-[-0.05em] text-white md:text-6xl">
              {c.roomsTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{c.roomsBody}</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(159,35,57,0.16),rgba(26,90,73,0.16))] p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sand)]">{c.roomsPanelEyebrow}</div>
            <p className="mt-3 text-base leading-7 text-slate-300">
              {locale === "ru"
                ? "Bootcamp — формат для 5+ человек. Privat и VIP — про комфорт и приватность."
                : c.roomsPanelBody}
            </p>
            <TrackedLink
              className="mt-6 inline-flex rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-red-strong)]"
              goal="rooms_team_cta"
              href={contactLinks.telegram}
              target="_blank"
            >
              {c.roomsPanelCta}
            </TrackedLink>
          </div>
        </section>

        <section>
          <RoomsExplorer initialFilter={initialFilter} locale={locale} />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {c.howItWorks.map((item) => (
            <article key={item.step} className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sand)]">{item.step}</div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(25,16,16,0.94),rgba(15,28,24,0.92))] p-6 md:p-10" id="contact-options">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="eyebrow">{c.roomsContactEyebrow}</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">{c.roomsContactTitle}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">{c.roomsContactBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {contactOptions.map((option) => (
                <TrackedLink
                  key={option.label}
                  className="rounded-[28px] border border-white/10 bg-slate-950/45 p-6 transition hover:border-[var(--accent-green)]/60 hover:bg-slate-950/65"
                  goal={option.goal}
                  href={option.href}
                  label={option.label}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-[var(--accent-sand)]">{option.label}</div>
                  <div className="mt-4 text-lg font-semibold text-white">{option.description}</div>
                  <div className="mt-5 text-sm font-semibold text-[var(--accent-sand)]">{c.roomsOpenNow}</div>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/92 px-2 py-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-1.5 text-[11px]">
          <TrackedLink
            className="flex-1 rounded-full bg-[var(--accent-red)] px-1.5 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="rooms_sticky_telegram"
            href={contactLinks.telegram}
            target="_blank"
          >
            {c.roomsStickyTelegram}
          </TrackedLink>
          <TrackedLink
            className="flex-1 rounded-full border border-white/15 px-1.5 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="rooms_sticky_call"
            href={contactLinks.call}
          >
            {c.roomsStickyCall}
          </TrackedLink>
          <TrackedLink
            className="flex-1 rounded-full border border-[var(--accent-green)]/40 px-1.5 py-2 text-center font-semibold uppercase tracking-wider text-[var(--accent-sand)]"
            goal="rooms_sticky_booking"
            href={contactLinks.booking}
            target="_blank"
          >
            {locale === "ru" ? "Бронь" : "Booking"}
          </TrackedLink>
        </div>
      </div>

      <AvulusFooter locale={locale} />
    </div>
  );
}

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
    requestedFilter === "solo" || requestedFilter === "duo" || requestedFilter === "bootcamp"
      ? requestedFilter
      : "all";

  return (
    <div className="pb-24 md:pb-0">
      <LocaleHtmlController locale={locale} />
      <AvulusNav ctaHref={contactLinks.booking} ctaLabel={c.navBook} items={getRoomsNav(locale)} locale={locale} />

      <main className="section-shell space-y-16 pt-32 md:pt-36">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="eyebrow">{c.roomsEyebrow}</div>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white md:text-6xl">
              {c.roomsTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{c.roomsBody}</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">{c.roomsPanelEyebrow}</div>
            <p className="mt-3 text-base leading-7 text-slate-300">{c.roomsPanelBody}</p>
            <TrackedLink
              className="mt-6 inline-flex rounded-full bg-fuchsia-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-300"
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
              <div className="text-xs uppercase tracking-[0.3em] text-fuchsia-200">{item.step}</div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(20,10,34,0.92),rgba(8,22,38,0.92))] p-6 md:p-10" id="contact-options">
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
                  className="rounded-[28px] border border-white/10 bg-slate-950/45 p-6 transition hover:border-cyan-300/40 hover:bg-slate-950/65"
                  goal={option.goal}
                  href={option.href}
                  label={option.label}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-cyan-200">{option.label}</div>
                  <div className="mt-4 text-lg font-semibold text-white">{option.description}</div>
                  <div className="mt-5 text-sm font-semibold text-fuchsia-200">{c.roomsOpenNow}</div>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/92 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <TrackedLink
            className="flex-1 rounded-full bg-fuchsia-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
            goal="rooms_sticky_telegram"
            href={contactLinks.telegram}
            target="_blank"
          >
            {c.roomsStickyTelegram}
          </TrackedLink>
          <TrackedLink
            className="flex-1 rounded-full border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white"
            goal="rooms_sticky_vk"
            href={contactLinks.vk}
            target="_blank"
          >
            {c.roomsStickyVk}
          </TrackedLink>
          <TrackedLink
            className="rounded-full border border-cyan-300/30 px-4 py-3 text-center text-sm font-semibold text-cyan-100"
            goal="rooms_sticky_call"
            href={contactLinks.call}
          >
            {c.roomsStickyCall}
          </TrackedLink>
        </div>
      </div>

      <AvulusFooter locale={locale} />
    </div>
  );
}

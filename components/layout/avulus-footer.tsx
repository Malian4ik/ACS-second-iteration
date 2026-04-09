import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, getSharedContent, type Locale } from "@/lib/content";

export function AvulusFooter({ locale }: { locale: Locale }) {
  const c = getSharedContent(locale);

  return (
    <footer className="border-t border-white/10 bg-[#080808] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-[#d9d1c0]">Avulus Cyber Space</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{c.footerBlurb}</p>
          <p className="mt-3 text-sm text-white/45">{c.venueAddress}</p>
          <p className="mt-1 text-sm text-white/45">{c.venueSchedule}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/72">
          <TrackedLink className="transition hover:text-white" goal="footer_telegram" href={contactLinks.telegram} target="_blank">
            Telegram
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_call" href={contactLinks.call}>
            {c.footerCall}
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_privacy" href={contactLinks.privacy}>
            {c.footerPrivacy}
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_terms" href={contactLinks.terms}>
            {c.footerTerms}
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_cookies" href={contactLinks.cookies}>
            {c.footerCookies}
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}

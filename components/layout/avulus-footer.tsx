import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, venueAddress, venueSchedule } from "@/lib/site-data";

export function AvulusFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-[#d9d1c0]">Avulus Cyber Space</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
            Флагманский cyberclub и ресторан в центре Москвы. Приватные комнаты, сильные игровые зоны и круглосуточный ритм большого города.
          </p>
          <p className="mt-3 text-sm text-white/45">{venueAddress}</p>
          <p className="mt-1 text-sm text-white/45">{venueSchedule}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/72">
          <TrackedLink className="transition hover:text-white" goal="footer_booking" href={contactLinks.booking} target="_blank">
            Бронь клуба
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_telegram" href={contactLinks.telegram} target="_blank">
            Telegram
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_vk" href={contactLinks.vk} target="_blank">
            VK
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_call" href={contactLinks.call}>
            Позвонить
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_privacy" href={contactLinks.privacy}>
            Privacy
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_terms" href={contactLinks.terms}>
            Terms
          </TrackedLink>
          <TrackedLink className="transition hover:text-white" goal="footer_cookies" href={contactLinks.cookies}>
            Cookies
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}

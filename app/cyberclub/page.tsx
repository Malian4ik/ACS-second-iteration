import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { clubZones, contactLinks, venueAddress, venueSchedule } from "@/lib/site-data";

const navItems = [
  { label: "Hero", href: "#top" },
  { label: "Zones", href: "#zones" },
  { label: "Book", href: "#book" }
];

const clubNotes = [
  "Приватные комнаты и премиальные зоны вместо шумного общего ощущения.",
  "Сильные игровые конфиги, ночной ритм и room-based опыт.",
  "Место, куда приходят не на час, а на целый вечер."
];

export default function CyberClubPage() {
  return (
    <div className="pb-28 md:pb-0" id="top">
      <AvulusNav ctaHref={contactLinks.booking} ctaLabel="Забронировать" items={navItems} />

      <main>
        <section className="section-shell relative overflow-hidden pt-28 md:pt-36">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_72%_20%,rgba(111,52,163,0.28),rgba(111,52,163,0.14)_24%,rgba(111,52,163,0.05)_44%,rgba(9,9,9,0)_70%)]" />
          <div className="brand-orb left-[-10rem] top-4 h-64 w-64 md:h-[28rem] md:w-[28rem]" />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-6">
              <div className="eyebrow">Cyberclub</div>
              <h1 className="max-w-xl font-[family:var(--font-oswald)] text-6xl uppercase leading-[0.88] text-white md:text-8xl">
                A flagship gaming space in the center of Moscow
              </h1>
              <p className="max-w-lg text-sm leading-7 text-white/64">
                Avulus built its club around private rooms, strong hardware and the atmosphere of a place you want to stay
                in late into the night.
              </p>

              <div className="space-y-3">
                {clubNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 text-sm leading-7 text-white/74">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#ba6fff]" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center bg-[#ba6fff] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
                  goal="cyberclub_booking"
                  href={contactLinks.booking}
                  target="_blank"
                >
                  Забронировать комп
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="cyberclub_hardware"
                  href={contactLinks.hardware}
                  target="_blank"
                >
                  Фото и железо
                </TrackedLink>
              </div>

              <div className="text-xs uppercase tracking-[0.24em] text-[#d7d1c4]">
                {venueSchedule}  •  {venueAddress}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[540px] overflow-hidden bg-[#101010]">
                <Image alt="Avulus club green zone" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src="/images/club-room-green.webp" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.96))]" />
                <div className="absolute left-6 top-6 border border-white/10 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">
                  Stream / Privat
                </div>
                <div className="absolute bottom-6 left-6 max-w-sm">
                  <div className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white">Private by design</div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative min-h-[260px] overflow-hidden bg-[#101010]">
                  <Image alt="Avulus club red zone" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 24vw" src="/images/club-room-red.webp" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.55),rgba(8,8,8,0.94))]" />
                  <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-3xl uppercase text-white">VIP rooms</div>
                </div>
                <div className="brand-card p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">Club mood</div>
                  <div className="mt-4 font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.92] text-white">
                    Less arcade. More capital city night.
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    Avulus should feel premium, private and atmospheric before the guest even starts comparing specs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-16" id="zones">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Zones</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
                Formats with status
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/58">
              Каждая зона должна ощущаться как отдельный уровень клуба, а не просто как еще один набор столов.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clubZones.map((zone, index) => (
              <article key={zone.name} className="group overflow-hidden border border-white/8 bg-[#0f0f10]">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    alt={zone.name}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    priority={index < 2}
                    sizes="(max-width: 1280px) 50vw, 33vw"
                    src={index % 3 === 0 ? "/images/club-room-red.webp" : index % 2 === 0 ? "/images/cyberclub-team.jpg" : "/images/club-room-green.webp"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">{zone.capacity}</div>
                  <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white">{zone.name}</h3>
                  <p className="text-sm leading-7 text-white/62">{zone.hardware}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20" id="book">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="brand-card p-8 md:p-10">
              <div className="eyebrow">Booking</div>
              <div className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white md:text-6xl">
                Reserve the room before someone else takes your night
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                Быстрый сценарий для клуба должен закрываться без лишних переходов: открыть бронь, выбрать формат, приехать.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 border border-white/8 bg-[#0f0f10] p-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">Direct actions</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{venueAddress}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center bg-[#ba6fff] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
                  goal="cyberclub_contact_booking"
                  href={contactLinks.booking}
                  target="_blank"
                >
                  Открыть бронь
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="cyberclub_contact_call"
                  href={contactLinks.call}
                >
                  +7 495 921-22-21
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AvulusFooter />
    </div>
  );
}

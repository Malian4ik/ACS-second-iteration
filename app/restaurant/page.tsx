import Image from "next/image";

import { AvulusFooter } from "@/components/layout/avulus-footer";
import { AvulusNav } from "@/components/layout/avulus-nav";
import { TrackedLink } from "@/components/ui/tracked-link";
import { contactLinks, venueAddress, venueSchedule } from "@/lib/site-data";

const navItems = [
  { label: "Hero", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "Reserve", href: "#reserve" }
];

const menuCards = [
  { title: "Breakfast", body: "Завтраки и спокойное начало дня в центре Москвы." },
  { title: "Kitchen", body: "Пицца, паста, street food, бар и полноценное ночное меню." },
  { title: "Cocktails", body: "Авторские и классические коктейли для длинного вечернего ритма." }
];

const atmosphereNotes = [
  "Можно приехать только ради ресторана, без брони клуба.",
  "Темный интерьер и ночная подача работают как самостоятельная точка притяжения.",
  "Ресторан живет в ритме большого города и не выключается ночью."
];

export default function RestaurantPage() {
  return (
    <div className="pb-28 md:pb-0" id="top">
      <AvulusNav ctaHref={contactLinks.telegram} ctaLabel="Reserve" items={navItems} />

      <main>
        <section className="section-shell relative overflow-hidden pt-28 md:pt-36">
          <div className="brand-orb right-[-8rem] top-12 h-64 w-64 bg-[radial-gradient(circle,rgba(24,104,82,0.42),rgba(24,104,82,0))] md:h-[28rem] md:w-[28rem]" />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-6">
              <div className="eyebrow">Restaurant</div>
              <h1 className="max-w-xl font-[family:var(--font-oswald)] text-6xl uppercase leading-[0.88] text-white md:text-8xl">
                A restaurant that lives beyond the club
              </h1>
              <p className="max-w-lg text-sm leading-7 text-white/64">
                Avulus restaurant should feel like an independent night destination with its own pace, menu and reason to
                arrive.
              </p>

              <div className="space-y-3">
                {atmosphereNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 text-sm leading-7 text-white/74">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#ba6fff]" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex items-center justify-center bg-[#ba6fff] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#c989ff]"
                  goal="restaurant_telegram"
                  href={contactLinks.telegram}
                  target="_blank"
                >
                  Зарезервировать стол
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="restaurant_vk"
                  href={contactLinks.vk}
                  target="_blank"
                >
                  Написать в VK
                </TrackedLink>
              </div>

              <div className="text-xs uppercase tracking-[0.24em] text-[#d7d1c4]">
                {venueSchedule}  •  {venueAddress}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[540px] overflow-hidden bg-[#101010]">
                <Image alt="Avulus restaurant interior" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src="/images/restaurant-real-1.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.96))]" />
                <div className="absolute left-6 top-6 border border-white/10 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">
                  Open 24/7
                </div>
                <div className="absolute bottom-6 left-6 max-w-sm">
                  <div className="font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white">Come for dinner. Stay for the night.</div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative min-h-[260px] overflow-hidden bg-[#101010]">
                  <Image alt="Avulus restaurant lounge" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 24vw" src="/images/restaurant-real-2.jpg" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.55),rgba(8,8,8,0.94))]" />
                  <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-3xl uppercase text-white">Dark lounge</div>
                </div>
                <div className="brand-card p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7d1c4]">Restaurant mood</div>
                  <div className="mt-4 font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.92] text-white">
                    Not an add-on. A destination.
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    Подача должна ощущаться как самостоятельный ресторанный бренд внутри Avulus, а не как приложение к клубу.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-16" id="menu">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Menu</div>
              <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
                All-day and all-night
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/58">
              Меню должно читаться не как список категорий, а как уверенное обещание длинного и полноценного вечера.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {menuCards.map((card) => (
              <article key={card.title} className="brand-card p-6">
                <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white">{card.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden border border-white/8 bg-[#101010]">
              <Image alt="Avulus cocktails" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/dish-cocktail.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.94))]" />
              <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-4xl uppercase text-white">Cocktails</div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden border border-white/8 bg-[#101010]">
              <Image alt="Avulus kitchen" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="/images/dish-burger.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.46),rgba(8,8,8,0.94))]" />
              <div className="absolute bottom-5 left-5 font-[family:var(--font-oswald)] text-4xl uppercase text-white">Kitchen</div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-20" id="reserve">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="brand-card p-8 md:p-10">
              <div className="eyebrow">Reserve</div>
              <div className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.9] text-white md:text-6xl">
                Reserve the table while the mood is still there
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                Для ресторана сценарий должен быть еще проще, чем для клуба: написать, подтвердить стол и приехать.
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
                  goal="restaurant_contact_telegram"
                  href={contactLinks.telegram}
                  target="_blank"
                >
                  Telegram
                </TrackedLink>
                <TrackedLink
                  className="inline-flex items-center justify-center border border-white/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#ba6fff] hover:text-[#ecd5ff]"
                  goal="restaurant_contact_call"
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

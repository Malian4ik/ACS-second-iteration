import { pricingPeriods, t } from "@/lib/catalog";
import type { Locale } from "@/lib/content";

export function PricingSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-shell py-16" id="pricing">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">{locale === "ru" ? "Тарифы" : "Pricing"}</div>
          <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
            {locale === "ru" ? "Выбери свой ритм" : "Choose your pace"}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/58">
          {locale === "ru"
            ? "Тарифная сетка должна считываться сразу: какой формат, какое время и во сколько обойдется твой вечер."
            : "The pricing grid should answer the core question instantly: which format fits, what time slot it covers and what the night will cost."}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {pricingPeriods.map((period) => (
          <section key={period.key} className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,19,0.94),rgba(10,10,10,0.94))] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.32)] md:p-7">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex w-fit rounded-[20px] bg-black px-5 py-3 font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white md:text-4xl">
                {t(locale, period.label)}
              </div>
              <div className="inline-flex w-fit rounded-[20px] bg-black px-5 py-3 font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white md:text-4xl">
                {period.time}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {period.cards.map((card) => (
                <article key={`${period.key}-${card.title}`} className="rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(255,255,255,0)_55%),linear-gradient(180deg,#171717,#0d0d0d)] p-5">
                  <h3 className="bg-[linear-gradient(180deg,#ffffff,#8e8e8e)] bg-clip-text font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-transparent md:text-6xl">
                    {card.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {card.entries.map((entry) => (
                      <div key={`${card.title}-${t(locale, entry.label)}`} className="grid grid-cols-[118px_1fr] gap-3">
                        <div className="rounded-[18px] border border-white/8 bg-black px-4 py-3 text-center font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">
                          {t(locale, entry.label)}
                        </div>
                        <div className="rounded-[18px] border border-white/8 bg-black px-4 py-3 text-right font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">
                          {entry.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {card.packages && card.packages.length > 0 ? (
                    <div className="mt-5 space-y-3 border-t border-white/8 pt-5">
                      {card.packages.map((pack) => (
                        <div key={`${card.title}-${t(locale, pack.label)}`} className="grid grid-cols-[1fr_160px] gap-3">
                          <div className="rounded-[18px] border border-white/8 bg-black px-4 py-3 font-[family:var(--font-oswald)] text-2xl uppercase leading-none text-white">
                            {t(locale, pack.label)}
                          </div>
                          <div className="rounded-[18px] border border-white/8 bg-black px-4 py-3 text-right font-[family:var(--font-oswald)] text-3xl uppercase leading-none text-white">
                            {pack.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

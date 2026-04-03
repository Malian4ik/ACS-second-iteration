import { restaurantMenu, t } from "@/lib/catalog";
import type { Locale } from "@/lib/content";

export function MenuSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-shell py-16" id="menu">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">{locale === "ru" ? "Меню" : "Menu"}</div>
          <h2 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none text-white md:text-6xl">
            {locale === "ru" ? "Полная подача" : "Full menu selection"}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/58">
          {locale === "ru"
            ? "Реальное меню ресторана на странице: от завтраков и кухни до бара и авторских коктейлей."
            : "The actual restaurant menu, on-page: from breakfast and kitchen to the bar and signature cocktails."}
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        {restaurantMenu.map((category) => (
          <article key={t(locale, category.title)} className="brand-card rounded-[28px] p-6 md:p-7">
            <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-5xl">
              {t(locale, category.title)}
            </h3>

            <div className="mt-6 space-y-4">
              {category.items.map((item) => (
                <div key={`${t(locale, category.title)}-${t(locale, item.name)}`} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-medium text-white">{t(locale, item.name)}</div>
                    <div className="shrink-0 font-[family:var(--font-oswald)] text-2xl uppercase leading-none text-white">
                      {item.price}
                    </div>
                  </div>
                  {item.details ? (
                    <div className="mt-1 text-sm leading-6 text-white/46">{t(locale, item.details)}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { CmsContent, PromoCard } from "@/lib/cms-schema";

type Props = {
  initialContent: CmsContent;
  storageMode: "blob" | "local";
};

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-sand)]">{eyebrow}</div>
      <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">{body}</p>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  multiline = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--accent-green)]";

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/50">{label}</span>
      {multiline ? (
        <textarea className={`${className} min-h-[120px] resize-y`} onChange={(event) => onChange(event.target.value)} value={value} />
      ) : (
        <input className={className} onChange={(event) => onChange(event.target.value)} value={value} />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File | null) {
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    setIsUploading(false);

    if (!response.ok) {
      setError("Не удалось загрузить изображение.");
      return;
    }

    const data = (await response.json()) as { url: string };
    onChange(data.url);
  }

  return (
    <div className="space-y-3 rounded-[24px] border border-white/10 bg-black/20 p-4">
      <TextInput label={label} onChange={onChange} value={value} />
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--accent-green)]">
          {isUploading ? "Загрузка..." : "Загрузить файл"}
          <input className="hidden" onChange={(event) => void handleUpload(event.target.files?.[0] ?? null)} type="file" />
        </label>
        <span className="text-xs text-white/44">На проде изображения хранятся во внешнем storage, а не в public/uploads.</span>
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={label} className="h-36 w-full rounded-2xl object-cover" src={value} />
      ) : null}
      {error ? <div className="text-sm text-[#ff7a7a]">{error}</div> : null}
    </div>
  );
}

export function AdminDashboard({ initialContent, storageMode }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<CmsContent>(initialContent);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const promoCards = useMemo(() => content.home.promoCards, [content.home.promoCards]);

  function updatePromoCard(id: string, patch: Partial<PromoCard>) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        promoCards: current.home.promoCards.map((card) => (card.id === id ? { ...card, ...patch } : card))
      }
    }));
  }

  async function handleSave() {
    setIsSaving(true);
    setStatus("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    setIsSaving(false);

    if (!response.ok) {
      setStatus("Не удалось сохранить контент.");
      return;
    }

    setStatus("Сохранено. Изменения можно сразу проверять на сайте.");
    router.refresh();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#07090d] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-sand)]">Admin panel</div>
            <h1 className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-none md:text-6xl">
              ACS second iteration
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
              Управление текстами, акциями и изображениями для сайта. Режим хранения сейчас:{" "}
              <span className="text-white">{storageMode === "blob" ? "Vercel Blob" : "локальный fallback"}</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              onClick={() => void handleSave()}
              type="button"
            >
              {isSaving ? "Сохраняем..." : "Сохранить"}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)]"
              onClick={() => void handleLogout()}
              type="button"
            >
              Выйти
            </button>
          </div>
        </div>

        {status ? <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">{status}</div> : null}

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle
            body="Самые важные поля первого экрана: 24/7, поддерживающая строка, CTA и быстрые офферы под героем."
            eyebrow="Homepage"
            title="Главная страница"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Поддерживающая строка в hero" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, heroSupport: value } }))} value={content.home.heroSupport} />
            <TextInput label="Строка статуса под hero" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, heroStatusLine: value } }))} value={content.home.heroStatusLine} />
            <TextInput label="Primary CTA" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, primaryCtaLabel: value } }))} value={content.home.primaryCtaLabel} />
            <TextInput label="Secondary CTA" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, secondaryCtaLabel: value } }))} value={content.home.secondaryCtaLabel} />
            <TextInput label="Tertiary CTA" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, tertiaryCtaLabel: value } }))} value={content.home.tertiaryCtaLabel} />
            <TextInput label="Contacts: режим работы" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, contactsOpenLine: value } }))} value={content.home.contactsOpenLine} />
            <TextInput label="Contacts: парковка" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, contactsParkingLine: value } }))} value={content.home.contactsParkingLine} />
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle
            body="Новый промо-блок идет сразу под hero и ведет в Telegram. Держим офферы короткими, конкретными и легко обновляемыми."
            eyebrow="Promo"
            title="Спецпредложения"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Заголовок секции" onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, promoTitle: value } }))} value={content.home.promoTitle} />
            <TextInput label="Подзаголовок секции" multiline onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, promoSubtitle: value } }))} value={content.home.promoSubtitle} />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {promoCards.map((card) => (
              <div key={card.id} className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-sand)]">{card.id}</div>
                <TextInput label="Заголовок" onChange={(value) => updatePromoCard(card.id, { title: value })} value={card.title} />
                <TextInput label="Описание" multiline onChange={(value) => updatePromoCard(card.id, { description: value })} value={card.description} />
                <TextInput label="CTA label" onChange={(value) => updatePromoCard(card.id, { ctaLabel: value })} value={card.ctaLabel} />
                <TextInput label="CTA href" onChange={(value) => updatePromoCard(card.id, { ctaHref: value })} value={card.ctaHref} />
                <ImageField label="Изображение оффера" onChange={(value) => updatePromoCard(card.id, { imageUrl: value })} value={card.imageUrl} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle
            body="Ресторанная страница намеренно упрощается: короткое описание, визуалы еды и бара, Telegram CTA и отдельная кнопка полного меню."
            eyebrow="Restaurant"
            title="Ресторан"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Короткое описание" multiline onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, shortDescription: value } }))} value={content.restaurant.shortDescription} />
            <TextInput label="Hero badge" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, heroBadge: value } }))} value={content.restaurant.heroBadge} />
            <TextInput label="Заголовок визуального блока" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, visualTitle: value } }))} value={content.restaurant.visualTitle} />
            <TextInput label="Описание визуального блока" multiline onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, visualBody: value } }))} value={content.restaurant.visualBody} />
            <TextInput label="Кнопка меню" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, menuButtonLabel: value } }))} value={content.restaurant.menuButtonLabel} />
            <TextInput label="Telegram CTA" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, telegramCtaLabel: value } }))} value={content.restaurant.telegramCtaLabel} />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {content.restaurant.foodVisuals.map((card) => (
              <div key={card.id} className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-sand)]">{card.id}</div>
                <TextInput label="Заголовок" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, foodVisuals: current.restaurant.foodVisuals.map((item) => (item.id === card.id ? { ...item, title: value } : item)) } }))} value={card.title} />
                <TextInput label="Описание" multiline onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, foodVisuals: current.restaurant.foodVisuals.map((item) => (item.id === card.id ? { ...item, description: value } : item)) } }))} value={card.description} />
                <ImageField label="Изображение" onChange={(value) => setContent((current) => ({ ...current, restaurant: { ...current.restaurant, foodVisuals: current.restaurant.foodVisuals.map((item) => (item.id === card.id ? { ...item, imageUrl: value } : item)) } }))} value={card.imageUrl} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle
            body="Ключевые изображения сайта можно заменить своими загрузками без редактирования кода."
            eyebrow="Media"
            title="Основные изображения"
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <ImageField label="Главная: карточка клуба" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, homeClubCardImage: value } }))} value={content.media.homeClubCardImage} />
            <ImageField label="Главная: карточка ресторана" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, homeRestaurantCardImage: value } }))} value={content.media.homeRestaurantCardImage} />
            <ImageField label="Ресторан: hero" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, restaurantHeroImage: value } }))} value={content.media.restaurantHeroImage} />
            <ImageField label="Ресторан: side image" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, restaurantSideImage: value } }))} value={content.media.restaurantSideImage} />
            <ImageField label="Клуб: hero" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, clubHeroImage: value } }))} value={content.media.clubHeroImage} />
            <ImageField label="Клуб: side image" onChange={(value) => setContent((current) => ({ ...current, media: { ...current.media, clubSideImage: value } }))} value={content.media.clubSideImage} />
          </div>
        </section>
      </div>
    </div>
  );
}

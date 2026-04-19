"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { CmsContent, CtaAlignment, CtaButtonSize, CtaGap, PromoCard, SecondaryCtaTone } from "@/lib/cms-schema";

type Props = {
  initialContent: CmsContent;
  storageMode: "blob" | "local";
};

function SectionTitle({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white">{title}</h2>
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
        <textarea className={`${className} min-h-[110px] resize-y`} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/50">{label}</span>
      <select
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--accent-green)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0b0f15] text-white">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ArrayEditor({
  label,
  values,
  onChange,
  minItems = 0
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  minItems?: number;
}) {
  const totalItems = Math.max(values.length, minItems);
  const visibleValues = Array.from({ length: totalItems }, (_, index) => values[index] ?? "");

  return (
    <div className="space-y-2">
      <span className="block text-xs uppercase tracking-[0.22em] text-white/50">{label}</span>
      {visibleValues.map((value, index) => (
        <input
          key={`${label}-${index}`}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--accent-green)]"
          value={value}
          onChange={(event) => {
            const next = [...visibleValues];
            next[index] = event.target.value;
            onChange(next);
          }}
        />
      ))}
    </div>
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
    if (!file) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
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
      <TextInput label={label} value={value} onChange={onChange} />
      <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--accent-green)]">
        {isUploading ? "Загрузка..." : "Загрузить файл"}
        <input className="hidden" type="file" onChange={(event) => void handleUpload(event.target.files?.[0] ?? null)} />
      </label>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt={label} className="h-32 w-full rounded-xl object-cover" />
      ) : null}
      {error ? <p className="text-xs text-[#ff7a7a]">{error}</p> : null}
    </div>
  );
}

export function AdminDashboard({ initialContent, storageMode }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<CmsContent>(initialContent);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const promoCards = useMemo(() => content.home.promoCards, [content.home.promoCards]);

  function updateHeroCta(patch: Partial<CmsContent["home"]["heroCta"]>) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        heroCta: {
          ...current.home.heroCta,
          ...patch
        }
      }
    }));
  }

  function updatePromoCard(id: string, patch: Partial<PromoCard>) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        promoCards: current.home.promoCards.map((card) => (card.id === id ? { ...card, ...patch } : card))
      }
    }));
  }

  function addPromoCard() {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : `${Date.now()}`;
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        promoCards: [
          ...current.home.promoCards,
          {
            id,
            title: "Новый оффер",
            description: "Короткое описание предложения.",
            ctaLabel: "Написать в Telegram",
            ctaHref: "https://t.me/AVULUSbot",
            imageUrl: "/images/club-room-red.webp"
          }
        ]
      }
    }));
  }

  function removePromoCard(id: string) {
    setContent((current) => {
      if (current.home.promoCards.length <= 1) return current;
      return {
        ...current,
        home: {
          ...current.home,
          promoCards: current.home.promoCards.filter((card) => card.id !== id)
        }
      };
    });
  }

  async function handleSave() {
    setStatus("");
    setIsSaving(true);
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    setIsSaving(false);

    if (!response.ok) {
      setStatus("Не удалось сохранить изменения.");
      return;
    }

    setStatus("Сохранено. Обнови сайт, чтобы проверить результат.");
    router.refresh();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#07090d] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-sand)]">Admin</div>
              <h1 className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-none md:text-6xl">
                Avulus One Page
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
                Управление контентом одностраничного сайта. Режим хранения: <span className="text-white">{storageMode === "blob" ? "Vercel Blob" : "локально"}</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => void handleSave()}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Сохраняем..." : "Сохранить"}
              </button>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[var(--accent-green)]"
              >
                Выйти
              </button>
            </div>
          </div>
          {status ? <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">{status}</p> : null}
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle title="Hero" body="Первый экран: заголовок, подзаголовок, описание и бейджи." />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Заголовок" value={content.landing.heroTitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, heroTitle: value } }))} />
            <TextInput label="Подзаголовок" value={content.landing.heroSubtitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, heroSubtitle: value } }))} />
            <TextInput label="Описание" multiline value={content.landing.heroDescription} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, heroDescription: value } }))} />
            <ArrayEditor label="Бейджи (3 значения)" values={content.landing.heroBadges} onChange={(next) => setContent((current) => ({ ...current, landing: { ...current.landing, heroBadges: next } }))} />
          </div>
          <div className="rounded-[28px] border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/5 p-5">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-sand)]">CTA первого экрана</p>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Пресеты держат кнопки ровно: главная красная CTA остается первой по весу, вторичная не перетягивает внимание.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <TextInput label="Основная CTA" value={content.home.primaryCtaLabel} onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, primaryCtaLabel: value } }))} />
              <TextInput label="Вторичная CTA" value={content.home.secondaryCtaLabel} onChange={(value) => setContent((current) => ({ ...current, home: { ...current.home, secondaryCtaLabel: value } }))} />
              <SelectInput
                label="Выравнивание группы"
                value={content.home.heroCta.alignment}
                onChange={(value) => updateHeroCta({ alignment: value as CtaAlignment })}
                options={[
                  { value: "center", label: "По центру" },
                  { value: "left", label: "Слева" },
                  { value: "right", label: "Справа" }
                ]}
              />
              <SelectInput
                label="Размер основной CTA"
                value={content.home.heroCta.primarySize}
                onChange={(value) => updateHeroCta({ primarySize: value as CtaButtonSize })}
                options={[
                  { value: "large", label: "Крупная" },
                  { value: "standard", label: "Стандартная" },
                  { value: "compact", label: "Компактная" }
                ]}
              />
              <SelectInput
                label="Размер вторичной CTA"
                value={content.home.heroCta.secondarySize}
                onChange={(value) => updateHeroCta({ secondarySize: value as CtaButtonSize })}
                options={[
                  { value: "compact", label: "Компактная" },
                  { value: "standard", label: "Стандартная" },
                  { value: "large", label: "Крупная" }
                ]}
              />
              <SelectInput
                label="Стиль вторичной CTA"
                value={content.home.heroCta.secondaryTone}
                onChange={(value) => updateHeroCta({ secondaryTone: value as SecondaryCtaTone })}
                options={[
                  { value: "quiet", label: "Тихая" },
                  { value: "outline", label: "Контурная" }
                ]}
              />
              <SelectInput
                label="Отступ между CTA"
                value={content.home.heroCta.gap}
                onChange={(value) => updateHeroCta({ gap: value as CtaGap })}
                options={[
                  { value: "normal", label: "Нормальный" },
                  { value: "tight", label: "Плотный" },
                  { value: "wide", label: "Широкий" }
                ]}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle title="Офферы" body="Заголовки секции и карточки карусели. Эти карточки показываются на главной без деплоя." />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Заголовок секции" value={content.landing.offersTitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, offersTitle: value } }))} />
            <TextInput label="Подзаголовок секции" multiline value={content.landing.offersSubtitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, offersSubtitle: value } }))} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={addPromoCard} className="inline-flex items-center justify-center rounded-full border border-[var(--accent-green)]/40 bg-[var(--accent-green)]/12 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-sand)] transition hover:bg-[var(--accent-green)]/18">
              Добавить карточку
            </button>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {promoCards.map((card) => (
              <div key={card.id} className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-sand)]">{card.id}</span>
                  <button
                    type="button"
                    onClick={() => removePromoCard(card.id)}
                    disabled={promoCards.length <= 1}
                    className="inline-flex items-center justify-center rounded-full border border-[#7b3030] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff9a9a] transition hover:bg-[#7b3030]/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Удалить
                  </button>
                </div>
                <TextInput label="Заголовок" value={card.title} onChange={(value) => updatePromoCard(card.id, { title: value })} />
                <TextInput label="Описание" multiline value={card.description} onChange={(value) => updatePromoCard(card.id, { description: value })} />
                <TextInput label="Текст кнопки" value={card.ctaLabel} onChange={(value) => updatePromoCard(card.id, { ctaLabel: value })} />
                <TextInput label="Ссылка кнопки" value={card.ctaHref} onChange={(value) => updatePromoCard(card.id, { ctaHref: value })} />
                <ImageField label="Изображение оффера" value={card.imageUrl} onChange={(value) => updatePromoCard(card.id, { imageUrl: value })} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#0f131a,#0b0f15)] p-6 md:p-8">
          <SectionTitle title="Секции страницы" body="Редактирование заголовков и текстов для комнат, ресторана и контактов." />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Комнаты: заголовок" value={content.landing.roomsTitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, roomsTitle: value } }))} />
            <TextInput label="Комнаты: подзаголовок" value={content.landing.roomsSubtitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, roomsSubtitle: value } }))} />
            <TextInput label="Ресторан: заголовок" value={content.landing.restaurantTitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantTitle: value } }))} />
            <TextInput label="Ресторан: подзаголовок" value={content.landing.restaurantSubtitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantSubtitle: value } }))} />
            <TextInput label="Ресторан: основной текст" multiline value={content.landing.restaurantBody} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantBody: value } }))} />
            <TextInput label="Ссылка меню (внешняя)" value={content.landing.restaurantMenuUrl} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantMenuUrl: value } }))} />
            <TextInput label="Кнопка меню" value={content.landing.restaurantMenuLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantMenuLabel: value } }))} />
            <TextInput label="Кнопка Telegram" value={content.landing.restaurantTelegramLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantTelegramLabel: value } }))} />
            <TextInput label="Кнопка звонка" value={content.landing.restaurantCallLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantCallLabel: value } }))} />
          </div>
          <ArrayEditor label="Ресторан: 4 изображения" minItems={4} values={content.landing.restaurantImages} onChange={(next) => setContent((current) => ({ ...current, landing: { ...current.landing, restaurantImages: next } }))} />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Контакты: заголовок" value={content.landing.contactsTitle} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsTitle: value } }))} />
            <TextInput label="Контакты: адрес" value={content.landing.contactsAddress} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsAddress: value } }))} />
            <TextInput label="Контакты: Telegram label" value={content.landing.contactsTelegramLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsTelegramLabel: value } }))} />
            <TextInput label="Контакты: VK label" value={content.landing.contactsVkLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsVkLabel: value } }))} />
            <TextInput label="Контакты: Phone label" value={content.landing.contactsPhoneLabel} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsPhoneLabel: value } }))} />
            <TextInput label="Контакты: карта (embed URL)" multiline value={content.landing.contactsMapUrl} onChange={(value) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsMapUrl: value } }))} />
          </div>
          <ArrayEditor label="Контакты: бейджи" values={content.landing.contactsBadges} onChange={(next) => setContent((current) => ({ ...current, landing: { ...current.landing, contactsBadges: next } }))} />
        </section>
      </div>
    </div>
  );
}

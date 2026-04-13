"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { LandingPageRenderer } from "@/components/pages/landing-page-renderer";
import type { BlockType, CmsBlock, CmsContent, OfferCard, RestaurantPhoto, RoomCard } from "@/lib/cms-schema";

type Props = {
  initialContent: CmsContent;
  storageMode: "blob" | "local";
};

type Selection = {
  blockId: string;
  itemId?: string;
};

function uid(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now()}`;
}

function moveItem<T>(list: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function createOffer(): OfferCard {
  return {
    id: uid("offer"),
    title: "Новый оффер",
    description: "Короткое описание предложения.",
    imageUrl: "/images/club-room-red.webp",
    cta: { label: "Написать в Telegram", href: "https://t.me/AVULUSbot" }
  };
}

function createRoom(): RoomCard {
  return {
    id: uid("room"),
    title: "Новая комната",
    capacity: "2 чел",
    dayPrice: "от 500 ₽/час",
    nightPrice: "от 600 ₽/час",
    description: "Короткое описание формата.",
    imageUrl: "/images/cyberclub-card.jpg",
    telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
    callCta: { label: "Позвонить", href: "tel:+74959212221" }
  };
}

function createPhoto(): RestaurantPhoto {
  return {
    id: uid("photo"),
    imageUrl: "/images/dish-burger.jpg",
    alt: "Фото ресторана"
  };
}

function createBlock(type: BlockType): CmsBlock {
  if (type === "hero") {
    return {
      id: uid("hero"),
      type: "hero",
      enabled: true,
      title: "Avulus Cyber Space",
      subtitle: "Клуб и ресторан 24/7 в центре Москвы",
      description: "Приватные игровые комнаты, кухня и бар — круглосуточно.",
      badges: ["24/7", "Центр Москвы", "Бесплатная парковка"],
      primaryCta: { label: "Написать в Telegram", href: "https://t.me/AVULUSbot" },
      secondaryCta: { label: "Позвонить", href: "tel:+74959212221" }
    };
  }
  if (type === "offers") {
    return {
      id: uid("offers"),
      type: "offers",
      enabled: true,
      title: "Офферы",
      subtitle: "Короткие предложения с быстрым переходом в Telegram.",
      emptyStateTitle: "Офферов пока нет",
      emptyStateDescription: "Добавьте первую карточку оффера.",
      cards: []
    };
  }
  if (type === "rooms") {
    return {
      id: uid("rooms"),
      type: "rooms",
      enabled: true,
      title: "Комнаты",
      subtitle: "Выбирайте формат, пишите в Telegram — забронируем.",
      pricingHint: "Подробный прайс уточняйте в Telegram.",
      cards: []
    };
  }
  if (type === "restaurant") {
    return {
      id: uid("restaurant"),
      type: "restaurant",
      enabled: true,
      title: "Ресторан и бар",
      subtitle: "Кухня, коктейли и румсервис в комнаты клуба. Открыты 24/7.",
      description: "Полноценный ресторан внутри Avulus.",
      photos: [],
      menuCta: { label: "Посмотреть меню", href: "https://vk.me/avuluscyberspace" },
      telegramCta: { label: "Забронировать стол в TG", href: "https://t.me/AVULUSbot" },
      callCta: { label: "Позвонить", href: "tel:+74959212221" }
    };
  }
  return {
    id: uid("contacts"),
    type: "contacts",
    enabled: true,
    title: "Контакты",
    subtitle: "Приезжайте в Avulus — ответим быстро и поможем с бронью.",
    address: "Москва, Серебрянический переулок, 12с1",
    mapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.648335%2C55.750049&mode=search&oid=244165336383&ol=biz&z=16",
    badges: ["24/7", "Бесплатная парковка"],
    links: [
      { id: uid("link"), label: "Telegram", href: "https://t.me/AVULUSbot" },
      { id: uid("link"), label: "VK", href: "https://vk.me/avuluscyberspace" },
      { id: uid("link"), label: "Позвонить", href: "tel:+74959212221" }
    ]
  };
}

function Input({
  label,
  value,
  onChange,
  multiline = false
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  multiline?: boolean;
}) {
  const className = "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none";
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      {multiline ? (
        <textarea className={`${className} min-h-[96px]`} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function ImageInput({
  label,
  value,
  onChange,
  onUpload,
  isUploading,
  error
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Input label={label} value={value} onChange={onChange} />
      <div className="flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) {
                return;
              }
              void onUpload(file);
              event.currentTarget.value = "";
            }}
          />
          {isUploading ? "Загрузка..." : "Загрузить файл"}
        </label>
        <span className="text-xs text-white/55">или вставьте ссылку вручную</span>
      </div>
      {error ? <div className="text-xs text-[#ff9a9a]">{error}</div> : null}
    </div>
  );
}

function StringListEditor({
  label,
  values,
  onChange,
  placeholder
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <button
            key={`${item}-${index}`}
            className="rounded-full border border-white/16 px-3 py-1 text-xs text-white/85"
            type="button"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          >
            {item} ×
          </button>
        ))}
      </div>
      <input
        className="w-full rounded-full border border-white/14 bg-black/30 px-3 py-2 text-sm text-white outline-none"
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key !== "Enter") {
            return;
          }
          event.preventDefault();
          const input = event.currentTarget;
          const value = input.value.trim();
          if (!value) {
            return;
          }
          onChange([...values, value]);
          input.value = "";
        }}
      />
    </div>
  );
}

function blockLabel(type: BlockType) {
  if (type === "hero") return "Hero";
  if (type === "offers") return "Офферы";
  if (type === "rooms") return "Комнаты";
  if (type === "restaurant") return "Ресторан";
  return "Контакты";
}

export function AdminDashboard({ initialContent, storageMode }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<CmsContent>(initialContent);
  const [selection, setSelection] = useState<Selection>({ blockId: initialContent.blocks[0]?.id ?? "" });
  const [dragBlockId, setDragBlockId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingByField, setUploadingByField] = useState<Record<string, boolean>>({});
  const [uploadErrorByField, setUploadErrorByField] = useState<Record<string, string>>({});
  const selectedBlock = useMemo(() => content.blocks.find((block) => block.id === selection.blockId), [content.blocks, selection.blockId]);

  function setBlock(blockId: string, updater: (block: CmsBlock) => CmsBlock) {
    setContent((current) => ({
      ...current,
      blocks: current.blocks.map((block) => (block.id === blockId ? updater(block) : block))
    }));
  }

  function setHero(blockId: string, updater: (block: Extract<CmsBlock, { type: "hero" }>) => Extract<CmsBlock, { type: "hero" }>) {
    setBlock(blockId, (block) => (block.type === "hero" ? updater(block) : block));
  }

  function setOffers(blockId: string, updater: (block: Extract<CmsBlock, { type: "offers" }>) => Extract<CmsBlock, { type: "offers" }>) {
    setBlock(blockId, (block) => (block.type === "offers" ? updater(block) : block));
  }

  function setRooms(blockId: string, updater: (block: Extract<CmsBlock, { type: "rooms" }>) => Extract<CmsBlock, { type: "rooms" }>) {
    setBlock(blockId, (block) => (block.type === "rooms" ? updater(block) : block));
  }

  function setRestaurant(blockId: string, updater: (block: Extract<CmsBlock, { type: "restaurant" }>) => Extract<CmsBlock, { type: "restaurant" }>) {
    setBlock(blockId, (block) => (block.type === "restaurant" ? updater(block) : block));
  }

  function setContacts(blockId: string, updater: (block: Extract<CmsBlock, { type: "contacts" }>) => Extract<CmsBlock, { type: "contacts" }>) {
    setBlock(blockId, (block) => (block.type === "contacts" ? updater(block) : block));
  }

  function addBlock(type: BlockType) {
    const block = createBlock(type);
    setContent((current) => ({ ...current, blocks: [...current.blocks, block] }));
    setSelection({ blockId: block.id });
  }

  function removeBlock(blockId: string) {
    setContent((current) => {
      const next = current.blocks.filter((block) => block.id !== blockId);
      return next.length > 0 ? { ...current, blocks: next } : current;
    });
    if (selection.blockId === blockId) {
      const nextBlock = content.blocks.find((block) => block.id !== blockId);
      if (nextBlock) {
        setSelection({ blockId: nextBlock.id });
      }
    }
  }

  function moveBlock(blockId: string, direction: -1 | 1) {
    const index = content.blocks.findIndex((block) => block.id === blockId);
    setContent((current) => ({ ...current, blocks: moveItem(current.blocks, index, index + direction) }));
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
    setStatus(response.ok ? "Сохранено." : "Не удалось сохранить.");
    if (response.ok) {
      router.refresh();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleImageUpload(fieldKey: string, file: File, onUploaded: (url: string) => void) {
    if (!file.type.startsWith("image/")) {
      setUploadErrorByField((current) => ({ ...current, [fieldKey]: "Выберите файл изображения." }));
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setUploadErrorByField((current) => ({ ...current, [fieldKey]: "Файл слишком большой. Максимум 12MB." }));
      return;
    }

    setUploadingByField((current) => ({ ...current, [fieldKey]: true }));
    setUploadErrorByField((current) => ({ ...current, [fieldKey]: "" }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;

      if (!response.ok || !payload?.url) {
        const message = payload?.error ? `Ошибка загрузки: ${payload.error}` : "Не удалось загрузить файл.";
        throw new Error(message);
      }

      onUploaded(payload.url);
      setUploadErrorByField((current) => ({ ...current, [fieldKey]: "" }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось загрузить файл.";
      setUploadErrorByField((current) => ({ ...current, [fieldKey]: message }));
    } finally {
      setUploadingByField((current) => ({ ...current, [fieldKey]: false }));
    }
  }

  return (
    <div className="min-h-screen bg-[#07090d] px-4 py-8 text-white">
      <div className="mx-auto max-w-[1640px] space-y-6">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[var(--accent-sand)]">Admin CMS</div>
              <h1 className="mt-3 font-[family:var(--font-oswald)] text-5xl uppercase leading-none">Avulus Cyber Space</h1>
              <p className="mt-3 text-sm text-white/65">Блочная CMS с live preview. Хранилище: {storageMode === "blob" ? "Vercel Blob" : "local fallback"}.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full bg-[var(--accent-red)] px-5 py-2 text-sm font-semibold" type="button" disabled={isSaving} onClick={() => void handleSave()}>
                {isSaving ? "Сохраняем..." : "Сохранить"}
              </button>
              <button className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold" type="button" onClick={() => void handleLogout()}>
                Выйти
              </button>
            </div>
          </div>
        </div>

        {status ? <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">{status}</div> : null}

        <div className="grid gap-6 xl:grid-cols-[520px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Блоки</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["hero", "offers", "rooms", "restaurant", "contacts"] as BlockType[]).map((type) => (
                  <button key={type} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold" type="button" onClick={() => addBlock(type)}>
                    + {blockLabel(type)}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {content.blocks.map((block) => (
                  <button
                    key={block.id}
                    className={`w-full rounded-2xl border px-4 py-3 text-left ${selection.blockId === block.id ? "border-[var(--accent-green)] bg-white/10" : "border-white/10 bg-black/20"}`}
                    type="button"
                    draggable
                    onDragStart={() => setDragBlockId(block.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (!dragBlockId || dragBlockId === block.id) return;
                      const from = content.blocks.findIndex((item) => item.id === dragBlockId);
                      const to = content.blocks.findIndex((item) => item.id === block.id);
                      setContent((current) => ({ ...current, blocks: moveItem(current.blocks, from, to) }));
                      setDragBlockId(null);
                    }}
                    onClick={() => setSelection({ blockId: block.id })}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{blockLabel(block.type)}</div>
                        <div className="text-xs text-white/50">{block.id}</div>
                      </div>
                      <div className="text-xs text-white/50">{block.enabled ? "ON" : "OFF"}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Редактор блока</div>
              {!selectedBlock ? <div className="mt-3 text-sm text-white/60">Выберите блок</div> : null}
              {selectedBlock ? (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div>
                      <div className="text-sm font-semibold">{blockLabel(selectedBlock.type)}</div>
                      <div className="text-xs text-white/50">{selectedBlock.id}</div>
                    </div>
                    <label className="text-sm">
                      <input
                        type="checkbox"
                        checked={selectedBlock.enabled}
                        onChange={(event) => setBlock(selectedBlock.id, (block) => ({ ...block, enabled: event.target.checked }))}
                      />{" "}
                      Включен
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button className="rounded-full border border-white/15 px-3 py-1 text-xs" type="button" onClick={() => moveBlock(selectedBlock.id, -1)}>Вверх</button>
                    <button className="rounded-full border border-white/15 px-3 py-1 text-xs" type="button" onClick={() => moveBlock(selectedBlock.id, 1)}>Вниз</button>
                    <button className="rounded-full border border-[#7b3030] px-3 py-1 text-xs text-[#ff9a9a]" type="button" onClick={() => removeBlock(selectedBlock.id)}>Удалить</button>
                  </div>

                  {selectedBlock.type === "hero" ? (
                    <>
                      <Input label="Заголовок" value={selectedBlock.title} onChange={(value) => setHero(selectedBlock.id, (block) => ({ ...block, title: value }))} />
                      <Input label="Подзаголовок" value={selectedBlock.subtitle} onChange={(value) => setHero(selectedBlock.id, (block) => ({ ...block, subtitle: value }))} />
                      <Input label="Описание" multiline value={selectedBlock.description} onChange={(value) => setHero(selectedBlock.id, (block) => ({ ...block, description: value }))} />
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input
                          label="CTA 1 (красная): текст"
                          value={selectedBlock.primaryCta.label}
                          onChange={(value) =>
                            setHero(selectedBlock.id, (block) => ({
                              ...block,
                              primaryCta: { ...block.primaryCta, label: value }
                            }))
                          }
                        />
                        <Input
                          label="CTA 1 (красная): ссылка"
                          value={selectedBlock.primaryCta.href}
                          onChange={(value) =>
                            setHero(selectedBlock.id, (block) => ({
                              ...block,
                              primaryCta: { ...block.primaryCta, href: value }
                            }))
                          }
                        />
                        <Input
                          label="CTA 2 (темная): текст"
                          value={selectedBlock.secondaryCta.label}
                          onChange={(value) =>
                            setHero(selectedBlock.id, (block) => ({
                              ...block,
                              secondaryCta: { ...block.secondaryCta, label: value }
                            }))
                          }
                        />
                        <Input
                          label="CTA 2 (темная): ссылка"
                          value={selectedBlock.secondaryCta.href}
                          onChange={(value) =>
                            setHero(selectedBlock.id, (block) => ({
                              ...block,
                              secondaryCta: { ...block.secondaryCta, href: value }
                            }))
                          }
                        />
                      </div>
                      <StringListEditor
                        label="Бейджи Hero"
                        values={selectedBlock.badges}
                        placeholder="Введите бейдж и нажмите Enter"
                        onChange={(values) =>
                          setHero(selectedBlock.id, (block) => ({
                            ...block,
                            badges: values
                          }))
                        }
                      />
                    </>
                  ) : null}

                  {selectedBlock.type === "offers" ? (
                    <>
                      <Input label="Заголовок" value={selectedBlock.title} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, title: value }))} />
                      <Input label="Подзаголовок" multiline value={selectedBlock.subtitle} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, subtitle: value }))} />
                      <button className="rounded-full border border-white/15 px-3 py-2 text-xs" type="button" onClick={() => setOffers(selectedBlock.id, (block) => ({ ...block, cards: [...block.cards, createOffer()] }))}>+ Оффер</button>
                      <div className="space-y-2">
                        {selectedBlock.cards.map((card, index) => (
                          <button key={card.id} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left" type="button" onClick={() => setSelection({ blockId: selectedBlock.id, itemId: card.id })}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{card.title}</span>
                              <span className="text-xs text-white/50">{index + 1}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {selection.itemId ? (
                        <>
                          {(() => {
                            const card = selectedBlock.cards.find((item) => item.id === selection.itemId);
                            if (!card) return null;
                            return (
                              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-3">
                                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Карточка оффера</div>
                                <Input label="Заголовок" value={card.title} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, title: value } : item) }))} />
                                <Input label="Описание" multiline value={card.description} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, description: value } : item) }))} />
                                <ImageInput
                                  label="Изображение URL"
                                  value={card.imageUrl}
                                  onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, imageUrl: value } : item) }))}
                                  onUpload={(file) =>
                                    handleImageUpload(`offers-${card.id}`, file, (url) =>
                                      setOffers(selectedBlock.id, (block) => ({
                                        ...block,
                                        cards: block.cards.map((item) => item.id === card.id ? { ...item, imageUrl: url } : item)
                                      }))
                                    )
                                  }
                                  isUploading={Boolean(uploadingByField[`offers-${card.id}`])}
                                  error={uploadErrorByField[`offers-${card.id}`]}
                                />
                                <Input label="CTA текст" value={card.cta.label} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, cta: { ...item.cta, label: value } } : item) }))} />
                                <Input label="CTA ссылка" value={card.cta.href} onChange={(value) => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, cta: { ...item.cta, href: value } } : item) }))} />
                                <div className="grid grid-cols-3 gap-2">
                                  <button className="rounded-full border border-white/15 px-2 py-1 text-xs" type="button" onClick={() => {
                                    const index = selectedBlock.cards.findIndex((item) => item.id === card.id);
                                    setOffers(selectedBlock.id, (block) => ({ ...block, cards: moveItem(block.cards, index, index - 1) }));
                                  }}>Вверх</button>
                                  <button className="rounded-full border border-white/15 px-2 py-1 text-xs" type="button" onClick={() => {
                                    const index = selectedBlock.cards.findIndex((item) => item.id === card.id);
                                    setOffers(selectedBlock.id, (block) => ({ ...block, cards: moveItem(block.cards, index, index + 1) }));
                                  }}>Вниз</button>
                                  <button className="rounded-full border border-[#7b3030] px-2 py-1 text-xs text-[#ff9a9a]" type="button" onClick={() => setOffers(selectedBlock.id, (block) => ({ ...block, cards: block.cards.filter((item) => item.id !== card.id) }))}>Удалить</button>
                                </div>
                              </div>
                            );
                          })()}
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {selectedBlock.type === "rooms" ? (
                    <>
                      <Input label="Заголовок" value={selectedBlock.title} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, title: value }))} />
                      <Input label="Подзаголовок" multiline value={selectedBlock.subtitle} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, subtitle: value }))} />
                      <button className="rounded-full border border-white/15 px-3 py-2 text-xs" type="button" onClick={() => setRooms(selectedBlock.id, (block) => ({ ...block, cards: [...block.cards, createRoom()] }))}>+ Комната</button>
                      <div className="space-y-2">
                        {selectedBlock.cards.map((card) => (
                          <button key={card.id} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left" type="button" onClick={() => setSelection({ blockId: selectedBlock.id, itemId: card.id })}>
                            <div className="text-sm">{card.title}</div>
                          </button>
                        ))}
                      </div>
                      {selection.itemId ? (
                        <>
                          {(() => {
                            const card = selectedBlock.cards.find((item) => item.id === selection.itemId);
                            if (!card) return null;
                            return (
                              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-3">
                                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Карточка комнаты</div>
                                <Input label="Название" value={card.title} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, title: value } : item) }))} />
                                <Input label="Вместимость" value={card.capacity} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, capacity: value } : item) }))} />
                                <Input label="Цена день" value={card.dayPrice} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, dayPrice: value } : item) }))} />
                                <Input label="Цена ночь" value={card.nightPrice} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, nightPrice: value } : item) }))} />
                                <Input label="Описание" multiline value={card.description} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, description: value } : item) }))} />
                                <ImageInput
                                  label="Изображение URL"
                                  value={card.imageUrl}
                                  onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, imageUrl: value } : item) }))}
                                  onUpload={(file) =>
                                    handleImageUpload(`rooms-${card.id}`, file, (url) =>
                                      setRooms(selectedBlock.id, (block) => ({
                                        ...block,
                                        cards: block.cards.map((item) => item.id === card.id ? { ...item, imageUrl: url } : item)
                                      }))
                                    )
                                  }
                                  isUploading={Boolean(uploadingByField[`rooms-${card.id}`])}
                                  error={uploadErrorByField[`rooms-${card.id}`]}
                                />
                                <Input label="Telegram CTA текст" value={card.telegramCta.label} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, telegramCta: { ...item.telegramCta, label: value } } : item) }))} />
                                <Input label="Telegram CTA ссылка" value={card.telegramCta.href} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, telegramCta: { ...item.telegramCta, href: value } } : item) }))} />
                                <Input label="Звонок CTA текст" value={card.callCta.label} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, callCta: { ...item.callCta, label: value } } : item) }))} />
                                <Input label="Звонок CTA ссылка" value={card.callCta.href} onChange={(value) => setRooms(selectedBlock.id, (block) => ({ ...block, cards: block.cards.map((item) => item.id === card.id ? { ...item, callCta: { ...item.callCta, href: value } } : item) }))} />
                              </div>
                            );
                          })()}
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {selectedBlock.type === "restaurant" ? (
                    <>
                      <Input label="Заголовок" value={selectedBlock.title} onChange={(value) => setRestaurant(selectedBlock.id, (block) => ({ ...block, title: value }))} />
                      <Input label="Подзаголовок" multiline value={selectedBlock.subtitle} onChange={(value) => setRestaurant(selectedBlock.id, (block) => ({ ...block, subtitle: value }))} />
                      <Input label="Описание" multiline value={selectedBlock.description} onChange={(value) => setRestaurant(selectedBlock.id, (block) => ({ ...block, description: value }))} />
                      <button className="rounded-full border border-white/15 px-3 py-2 text-xs" type="button" onClick={() => setRestaurant(selectedBlock.id, (block) => ({ ...block, photos: [...block.photos, createPhoto()] }))}>+ Фото</button>
                      {selection.itemId ? (
                        <>
                          {(() => {
                            const photo = selectedBlock.photos.find((item) => item.id === selection.itemId);
                            if (!photo) return null;
                            return (
                              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-3">
                                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Фото</div>
                                <Input label="Alt/подпись" value={photo.alt} onChange={(value) => setRestaurant(selectedBlock.id, (block) => ({ ...block, photos: block.photos.map((item) => item.id === photo.id ? { ...item, alt: value } : item) }))} />
                                <ImageInput
                                  label="URL"
                                  value={photo.imageUrl}
                                  onChange={(value) => setRestaurant(selectedBlock.id, (block) => ({ ...block, photos: block.photos.map((item) => item.id === photo.id ? { ...item, imageUrl: value } : item) }))}
                                  onUpload={(file) =>
                                    handleImageUpload(`restaurant-${photo.id}`, file, (url) =>
                                      setRestaurant(selectedBlock.id, (block) => ({
                                        ...block,
                                        photos: block.photos.map((item) => item.id === photo.id ? { ...item, imageUrl: url } : item)
                                      }))
                                    )
                                  }
                                  isUploading={Boolean(uploadingByField[`restaurant-${photo.id}`])}
                                  error={uploadErrorByField[`restaurant-${photo.id}`]}
                                />
                              </div>
                            );
                          })()}
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {selectedBlock.type === "contacts" ? (
                    <>
                      <Input label="Заголовок" value={selectedBlock.title} onChange={(value) => setContacts(selectedBlock.id, (block) => ({ ...block, title: value }))} />
                      <Input label="Подзаголовок" multiline value={selectedBlock.subtitle} onChange={(value) => setContacts(selectedBlock.id, (block) => ({ ...block, subtitle: value }))} />
                      <Input label="Адрес" value={selectedBlock.address} onChange={(value) => setContacts(selectedBlock.id, (block) => ({ ...block, address: value }))} />
                      <Input label="Карта (iframe src)" value={selectedBlock.mapEmbedUrl} onChange={(value) => setContacts(selectedBlock.id, (block) => ({ ...block, mapEmbedUrl: value }))} />
                    </>
                  ) : null}
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Глобальные настройки</div>
              <div className="mt-4 space-y-3">
                <Input label="Название проекта" value={content.site.projectName} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, projectName: value } }))} />
                <Input label="Подпись бренда" value={content.site.brandSubtitle} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, brandSubtitle: value } }))} />
                <Input label="CTA в шапке: текст" value={content.site.navCta.label} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, navCta: { ...current.site.navCta, label: value } } }))} />
                <Input label="CTA в шапке: ссылка" value={content.site.navCta.href} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, navCta: { ...current.site.navCta, href: value } } }))} />
                <Input label="Sticky Telegram: текст" value={content.site.stickyTelegramCta.label} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, stickyTelegramCta: { ...current.site.stickyTelegramCta, label: value } } }))} />
                <Input label="Sticky Telegram: ссылка" value={content.site.stickyTelegramCta.href} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, stickyTelegramCta: { ...current.site.stickyTelegramCta, href: value } } }))} />
                <Input label="Sticky звонок: текст" value={content.site.stickyCallCta.label} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, stickyCallCta: { ...current.site.stickyCallCta, label: value } } }))} />
                <Input label="Sticky звонок: ссылка" value={content.site.stickyCallCta.href} onChange={(value) => setContent((current) => ({ ...current, site: { ...current.site, stickyCallCta: { ...current.site.stickyCallCta, href: value } } }))} />
              </div>
            </section>
          </aside>

          <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Live preview</div>
            <div className="mt-3 overflow-hidden rounded-[20px] border border-white/10">
              <LandingPageRenderer
                content={content}
                previewMode
                selectedBlockId={selection.blockId}
                selectedItemId={selection.itemId}
                onSelectBlock={(blockId) => setSelection({ blockId })}
                onSelectItem={(blockId, itemId) => setSelection({ blockId, itemId })}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

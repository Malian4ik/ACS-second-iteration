"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";

import { TrackedLink } from "@/components/ui/tracked-link";
import type {
  CmsBlock,
  CmsContent,
  ContactsBlock,
  HeroBlock,
  OffersBlock,
  RestaurantBlock,
  RoomsBlock
} from "@/lib/cms-schema";

type LandingRendererProps = {
  content: CmsContent;
  previewMode?: boolean;
  selectedBlockId?: string;
  selectedItemId?: string;
  onSelectBlock?: (blockId: string) => void;
  onSelectItem?: (blockId: string, itemId: string) => void;
};

type MenuDoc = {
  id: string;
  label: string;
  kind: "images" | "embed";
  embedUrl: string;
  sourceUrl: string;
  images?: string[];
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:") || href.startsWith("mailto:");
}

function normalizeMenuEmbedUrl(rawUrl: string) {
  const value = rawUrl.trim();
  if (!value) {
    return "";
  }

  const googleDoc = value.match(/docs\.google\.com\/document\/d\/([^/]+)/i);
  if (googleDoc?.[1]) {
    return `https://docs.google.com/document/d/${googleDoc[1]}/preview`;
  }

  const googleDriveFile = value.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (googleDriveFile?.[1]) {
    return `https://drive.google.com/file/d/${googleDriveFile[1]}/preview`;
  }

  const googleDriveOpenId = value.match(/[?&]id=([^&]+)/i);
  if (value.includes("drive.google.com") && googleDriveOpenId?.[1]) {
    return `https://drive.google.com/file/d/${googleDriveOpenId[1]}/preview`;
  }

  const googleDriveUcId = value.match(/drive\.google\.com\/uc\?(?:export=download&)?id=([^&]+)/i);
  if (googleDriveUcId?.[1]) {
    return `https://drive.google.com/file/d/${googleDriveUcId[1]}/preview`;
  }

  return value;
}

function ActionLink({
  className,
  href,
  label,
  goal,
  previewMode
}: {
  className: string;
  href: string;
  label: string;
  goal: string;
  previewMode?: boolean;
}) {
  if (previewMode) {
    return (
      <a
        className={className}
        href={href}
        onClick={(event) => event.preventDefault()}
      >
        {label}
      </a>
    );
  }

  return (
    <TrackedLink
      className={className}
      goal={goal}
      href={href}
      target={isExternalHref(href) ? "_blank" : undefined}
    >
      {label}
    </TrackedLink>
  );
}

function blockShellClass({ selected, previewMode }: { selected: boolean; previewMode?: boolean }) {
  if (!previewMode) {
    return "";
  }

  return selected
    ? "ring-2 ring-[var(--accent-green)] ring-offset-2 ring-offset-[#07090d]"
    : "ring-1 ring-transparent hover:ring-white/25";
}

function renderHeroBlock({
  block,
  previewMode,
  selected,
  onSelectBlock
}: {
  block: HeroBlock;
  previewMode?: boolean;
  selected: boolean;
  onSelectBlock?: (blockId: string) => void;
}) {
  return (
    <section
      className={`section-shell relative pt-28 pb-16 md:pt-36 md:pb-20 ${blockShellClass({ selected, previewMode })}`}
      id={block.id}
      onClick={previewMode ? () => onSelectBlock?.(block.id) : undefined}
    >
      <div className="brand-orb left-1/2 top-0 h-80 w-[120vw] -translate-x-1/2 md:-translate-x-0 md:left-[-10rem] md:top-10 md:h-96 md:w-96" />
      <div className="brand-orb right-[-8rem] top-24 h-56 w-56 bg-[radial-gradient(circle,rgba(26,90,73,0.34),rgba(26,90,73,0))] md:h-80 md:w-80" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          <Image
            alt="Avulus logo"
            className="object-contain"
            fill
            priority
            sizes="128px"
            src="/Sublogo/Avulus-Sublogo-Red-CMYK.gif"
          />
        </div>

        {/* Brand kicker — small text above the main headline */}
        <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-white/40 md:text-xs">{block.subtitle}</p>

        <h1 className="mt-4 font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.94] text-white md:text-6xl lg:text-7xl">
          {block.title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">{block.description}</p>

        <div className="mt-8 flex w-full max-w-[34rem] flex-col items-stretch gap-3 sm:flex-row pb-6">
          <div className="relative flex flex-1 flex-col">
            <ActionLink
              className="inline-flex h-full w-full items-center justify-center rounded-[32px] bg-[var(--accent-red)] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--accent-red-strong)]"
              goal="hero_primary"
              href={block.primaryCta.href}
              label={block.primaryCta.label}
              previewMode={previewMode}
            />
            <span className="absolute -bottom-6 left-0 right-0 hidden text-center text-[11px] tracking-wide text-white/38 sm:block">отвечаем за 1–2 минуты</span>
          </div>
          <div className="flex flex-1 flex-col">
            <ActionLink
              className="inline-flex h-full w-full items-center justify-center rounded-[32px] border border-[rgba(255,244,224,0.18)] bg-transparent px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
              goal="hero_secondary"
              href={block.secondaryCta.href}
              label={block.secondaryCta.label}
              previewMode={previewMode}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {block.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderOffersBlock({
  block,
  previewMode,
  selected,
  selectedItemId,
  onSelectBlock,
  onSelectItem
}: {
  block: OffersBlock;
  previewMode?: boolean;
  selected: boolean;
  selectedItemId?: string;
  onSelectBlock?: (blockId: string) => void;
  onSelectItem?: (blockId: string, itemId: string) => void;
}) {
  return (
    <section
      className={`section-shell pb-16 md:pb-20 ${blockShellClass({ selected, previewMode })}`}
      id={block.id}
      onClick={previewMode ? () => onSelectBlock?.(block.id) : undefined}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Предложения</div>
          <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">
            {block.title}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-white/55">{block.subtitle}</p>
      </div>

      {block.cards.length === 0 ? (
        <article className="brand-card rounded-[30px] p-8">
          <h3 className="font-[family:var(--font-oswald)] text-3xl uppercase text-white">{block.emptyStateTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">{block.emptyStateDescription}</p>
        </article>
      ) : (
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {block.cards.map((card) => (
            <article
              key={card.id}
              className={`group flex min-h-[30rem] min-w-[86%] snap-start flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0f1115] md:min-w-[48%] xl:min-w-[31%] ${
                previewMode && selectedItemId === card.id ? "ring-2 ring-[var(--accent-green)]" : ""
              }`}
              data-editor-item-id={card.id}
              onClick={
                previewMode
                  ? (event) => {
                      event.stopPropagation();
                      onSelectItem?.(block.id, card.id);
                    }
                  : undefined
              }
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  alt={card.title}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 86vw, (max-width: 1280px) 48vw, 31vw"
                  src={card.imageUrl}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.05),rgba(7,7,7,0.4),rgba(7,7,7,0.94))]" />
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6">
                <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.92] text-white">{card.title}</h3>
                <p className="flex-1 text-sm leading-7 text-white/66">{card.description}</p>
                <ActionLink
                  className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(26,90,73,0.26)]"
                  goal={`offer_${card.id}`}
                  href={card.cta.href}
                  label={card.cta.label}
                  previewMode={previewMode}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function renderRoomsBlock({
  block,
  previewMode,
  selected,
  selectedItemId,
  onSelectBlock,
  onSelectItem
}: {
  block: RoomsBlock;
  previewMode?: boolean;
  selected: boolean;
  selectedItemId?: string;
  onSelectBlock?: (blockId: string) => void;
  onSelectItem?: (blockId: string, itemId: string) => void;
}) {
  return (
    <section
      className={`section-shell py-16 md:py-20 ${blockShellClass({ selected, previewMode })}`}
      id={block.id}
      onClick={previewMode ? () => onSelectBlock?.(block.id) : undefined}
    >
      <div className="mb-10">
        <div className="eyebrow">Игровые комнаты</div>
        <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">{block.title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/58">{block.subtitle}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {block.cards.map((room) => (
          <article
            key={room.id}
            className={`brand-card group overflow-hidden rounded-[30px] ${
              previewMode && selectedItemId === room.id ? "ring-2 ring-[var(--accent-green)]" : ""
            }`}
            onClick={
              previewMode
                ? (event) => {
                    event.stopPropagation();
                    onSelectItem?.(block.id, room.id);
                  }
                : undefined
            }
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={room.title}
                className="object-cover transition duration-700 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src={room.imageUrl}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.05),rgba(9,9,9,0.42),rgba(9,9,9,0.94))]" />

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/48 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#e8dcc7] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                {room.capacity}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.94] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{room.title}</div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm leading-6 text-white/62">{room.description}</p>

              <div className="flex gap-4 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="uppercase tracking-[0.2em] text-white/40">День</span>
                  <span className="font-semibold text-[var(--accent-sand)]">{room.dayPrice}</span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col gap-0.5">
                  <span className="uppercase tracking-[0.2em] text-white/40">Ночь</span>
                  <span className="font-semibold text-[var(--accent-sand)]">{room.nightPrice}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <ActionLink
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[rgba(159,35,57,0.18)] border border-[rgba(159,35,57,0.40)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(159,35,57,0.30)]"
                  goal={`room_tg_${room.id}`}
                  href={room.telegramCta.href}
                  label={room.telegramCta.label}
                  previewMode={previewMode}
                />
                <ActionLink
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/12 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/28 hover:text-white"
                  goal={`room_call_${room.id}`}
                  href={room.callCta.href}
                  label={room.callCta.label}
                  previewMode={previewMode}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-white/38">{block.pricingHint}</p>
    </section>
  );
}

function renderRestaurantBlock({
  block,
  previewMode,
  selected,
  selectedItemId,
  onSelectBlock,
  onSelectItem,
  onOpenMenu
}: {
  block: RestaurantBlock;
  previewMode?: boolean;
  selected: boolean;
  selectedItemId?: string;
  onSelectBlock?: (blockId: string) => void;
  onSelectItem?: (blockId: string, itemId: string) => void;
  onOpenMenu?: (title: string, docs: MenuDoc[]) => void;
}) {
  const foodImages = block.foodMenuImages.map((item) => item.trim()).filter(Boolean);
  const barImages = block.barMenuImages.map((item) => item.trim()).filter(Boolean);
  const cocktailsImages = block.cocktailsMenuImages.map((item) => item.trim()).filter(Boolean);

  const menuDocs: MenuDoc[] = [];

  if (foodImages.length > 0) {
    menuDocs.push({
      id: "food",
      label: "Кухня",
      kind: "images",
      embedUrl: foodImages[0],
      sourceUrl: foodImages[0],
      images: foodImages
    });
  } else if (block.foodMenuUrl.trim()) {
    menuDocs.push({
      id: "food",
      label: "Кухня",
      kind: "embed",
      sourceUrl: block.foodMenuUrl.trim(),
      embedUrl: normalizeMenuEmbedUrl(block.foodMenuUrl)
    });
  }

  if (barImages.length > 0) {
    menuDocs.push({
      id: "bar",
      label: "Бар",
      kind: "images",
      embedUrl: barImages[0],
      sourceUrl: barImages[0],
      images: barImages
    });
  } else if (block.barMenuUrl.trim()) {
    menuDocs.push({
      id: "bar",
      label: "Бар",
      kind: "embed",
      sourceUrl: block.barMenuUrl.trim(),
      embedUrl: normalizeMenuEmbedUrl(block.barMenuUrl)
    });
  }

  if (cocktailsImages.length > 0) {
    menuDocs.push({
      id: "cocktails",
      label: "Коктейли",
      kind: "images",
      embedUrl: cocktailsImages[0],
      sourceUrl: cocktailsImages[0],
      images: cocktailsImages
    });
  } else if (block.cocktailsMenuUrl.trim()) {
    menuDocs.push({
      id: "cocktails",
      label: "Коктейли",
      kind: "embed",
      sourceUrl: block.cocktailsMenuUrl.trim(),
      embedUrl: normalizeMenuEmbedUrl(block.cocktailsMenuUrl)
    });
  }

  if (menuDocs.length === 0) {
    const legacyMenu = normalizeMenuEmbedUrl(block.menuEmbedUrl);
    if (legacyMenu) {
      menuDocs.push({ id: "menu", label: "Меню", kind: "embed", sourceUrl: block.menuEmbedUrl.trim(), embedUrl: legacyMenu });
    }
  }

  return (
    <section
      className={`section-shell py-16 md:py-20 ${blockShellClass({ selected, previewMode })}`}
      id={block.id}
      onClick={previewMode ? () => onSelectBlock?.(block.id) : undefined}
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">Клуб + бар</div>
          <h2 className="mt-3 font-[family:var(--font-oswald)] text-4xl uppercase leading-none text-white md:text-6xl">{block.title}</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">{block.subtitle}</p>
        </div>
      </div>

      <p className="mb-8 max-w-2xl text-sm leading-7 text-white/62">{block.description}</p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {block.photos.map((photo) => (
          <div
            key={photo.id}
            className={`group relative aspect-[3/4] overflow-hidden rounded-[22px] border border-white/8 ${
              previewMode && selectedItemId === photo.id ? "ring-2 ring-[var(--accent-green)]" : ""
            }`}
            onClick={
              previewMode
                ? (event) => {
                    event.stopPropagation();
                    onSelectItem?.(block.id, photo.id);
                  }
                : undefined
            }
          >
            <Image
              alt={photo.alt}
              className="object-cover transition duration-700 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              src={photo.imageUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,6,6,0.72))]" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {menuDocs.length > 0 ? (
          <button
            className="inline-flex items-center justify-center rounded-full border border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.16)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(26,90,73,0.28)]"
            type="button"
            onClick={(event) => {
              if (previewMode) {
                event.preventDefault();
                return;
              }
              onOpenMenu?.(block.menuCta.label, menuDocs);
            }}
          >
            {block.menuCta.label}
          </button>
        ) : (
          <ActionLink
            className="inline-flex items-center justify-center rounded-full border border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.16)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(26,90,73,0.28)]"
            goal="restaurant_menu"
            href={block.menuCta.href}
            label={block.menuCta.label}
            previewMode={previewMode}
          />
        )}
        <ActionLink
          className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/28 hover:text-white"
          goal="restaurant_tg"
          href={block.telegramCta.href}
          label={block.telegramCta.label}
          previewMode={previewMode}
        />
        <ActionLink
          className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/28 hover:text-white"
          goal="restaurant_call"
          href={block.callCta.href}
          label={block.callCta.label}
          previewMode={previewMode}
        />
      </div>

      {/* PDF menu downloads */}
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/65 transition hover:border-white/22 hover:text-white"
          href="/menu/menu_kitchen.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" /></svg>
          Меню кухни (PDF)
        </a>
        <a
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/65 transition hover:border-white/22 hover:text-white"
          href="/menu/menu_bar.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" /></svg>
          Меню бара (PDF)
        </a>
        <a
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/65 transition hover:border-white/22 hover:text-white"
          href="/menu/menu_cocktails.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" /></svg>
          Коктейльная карта (PDF)
        </a>
      </div>
    </section>
  );
}

function renderContactsBlock({
  block,
  previewMode,
  selected,
  onSelectBlock
}: {
  block: ContactsBlock;
  previewMode?: boolean;
  selected: boolean;
  onSelectBlock?: (blockId: string) => void;
}) {
  return (
    <section
      className={`section-shell py-16 pb-24 md:py-20 ${blockShellClass({ selected, previewMode })}`}
      id={block.id}
      onClick={previewMode ? () => onSelectBlock?.(block.id) : undefined}
    >
      <div className="brand-card rounded-[32px] p-6 md:p-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-7">
            <div>
              <div className="eyebrow">Как попасть</div>
              <h2 className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-[0.92] text-white md:text-6xl">{block.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/62">{block.subtitle}</p>
            </div>

            <div className="text-sm leading-7 text-white/80">{block.address}</div>

            <div className="flex flex-wrap gap-2">
              {block.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {block.links.map((link) => {
                const isTelegram = link.id === "contact-telegram" || link.href.includes("t.me");
                return (
                  <ActionLink
                    key={link.id}
                    className={isTelegram
                      ? "inline-flex items-center justify-center rounded-full bg-[var(--accent-red)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] shadow-[0_4px_20px_rgba(159,35,57,0.35)]"
                      : "inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/30 hover:text-white"
                    }
                    goal={`contact_${link.id}`}
                    href={link.href}
                    label={link.label}
                    previewMode={previewMode}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-white/10">
            <iframe
              className="h-[380px] w-full md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={block.mapEmbedUrl}
              title="Карта Avulus"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function renderBlock({
  block,
  previewMode,
  selected,
  selectedItemId,
  onSelectBlock,
  onSelectItem,
  onOpenMenu
}: {
  block: CmsBlock;
  previewMode?: boolean;
  selected: boolean;
  selectedItemId?: string;
  onSelectBlock?: (blockId: string) => void;
  onSelectItem?: (blockId: string, itemId: string) => void;
  onOpenMenu?: (title: string, docs: MenuDoc[]) => void;
}) {
  switch (block.type) {
    case "hero":
      return renderHeroBlock({ block, previewMode, selected, onSelectBlock });
    case "offers":
      return renderOffersBlock({ block, previewMode, selected, selectedItemId, onSelectBlock, onSelectItem });
    case "rooms":
      return renderRoomsBlock({ block, previewMode, selected, selectedItemId, onSelectBlock, onSelectItem });
    case "restaurant":
      return renderRestaurantBlock({ block, previewMode, selected, selectedItemId, onSelectBlock, onSelectItem, onOpenMenu });
    case "contacts":
      return renderContactsBlock({ block, previewMode, selected, onSelectBlock });
    default:
      return null;
  }
}

export function LandingPageRenderer({
  content,
  previewMode,
  selectedBlockId,
  selectedItemId,
  onSelectBlock,
  onSelectItem
}: LandingRendererProps) {
  const visibleBlocks = content.blocks.filter((block) => block.enabled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuModal, setMenuModal] = useState<{ title: string; docs: MenuDoc[]; activeId: string; activeImageIndex: number } | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll direction tracking — hide nav on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current + 8) {
        setNavVisible(false);
        setMobileOpen(false);
      } else if (currentY < lastScrollY.current - 8) {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close on desktop resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="pb-16 md:pb-0">
      {!previewMode ? (
        <>
          {/* ── Nav bar ── */}
          <nav className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 transition-transform duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="relative mx-auto flex max-w-7xl items-center justify-between md:rounded-full md:border md:border-white/10 md:bg-[rgba(10,10,10,0.88)] md:px-6 md:py-3 md:backdrop-blur-xl">

              {/* Mobile logo (clickable to open menu) */}
              <button className="flex items-center md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Открыть меню">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur transition active:scale-95">
                  <Image alt="Avulus logo" className="object-contain p-1.5" fill sizes="44px" src="/Sublogo/Avulus-Sublogo-Red-CMYK.gif" />
                </div>
              </button>

              {/* Desktop Logo */}
              <a className="hidden md:flex flex-1 items-center gap-3" href="#top">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white">
                  <Image alt="Avulus logo" className="object-contain p-1" fill sizes="36px" src="/Sublogo/Avulus-Sublogo-Red-CMYK.gif" />
                </div>
                <div className="hidden xl:block">
                  <div className="font-[family:var(--font-oswald)] text-2xl uppercase leading-none tracking-[0.16em] text-white">{content.site.projectName}</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">{content.site.brandSubtitle}</div>
                </div>
              </a>

              {/* Desktop nav links */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex md:flex-1 justify-center">
                {content.site.navigationItems.map((item) => (
                  <a key={item.id} className="text-sm font-medium text-white/68 transition hover:text-white" href={`#${item.blockId}`}>
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden items-center justify-end md:flex md:flex-1">
                <ActionLink
                  className="rounded-full bg-[#b11b36] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c62744] inline-flex"
                  goal="nav_primary"
                  href={content.site.navCta.href}
                  label={content.site.navCta.label}
                  previewMode={previewMode}
                />
              </div>

            </div>
          </nav>

          {/* ── Mobile backdrop ── */}
          <div
            aria-hidden="true"
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={() => setMobileOpen(false)}
          />

          {/* ── Mobile drawer ── */}
          <div className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="h-20" />
            <div className="mx-4 overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(10,10,10,0.96)] shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col divide-y divide-white/6">
                {content.site.navigationItems.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.blockId}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-6 py-4 text-base font-medium text-white/68 transition hover:text-white"
                  >
                    <span className="mr-3 text-[10px] uppercase tracking-[0.3em] text-white/28">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="p-4">
                <ActionLink
                  className="flex w-full items-center justify-center rounded-full bg-[#b11b36] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#c62744]"
                  goal="nav_mobile_cta"
                  href={content.site.navCta.href}
                  label={content.site.navCta.label}
                  previewMode={previewMode}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <main id="top">
        {visibleBlocks.map((block) => (
          <Fragment key={block.id}>
            {renderBlock({
              block,
              previewMode,
              selected: selectedBlockId === block.id,
              selectedItemId,
              onSelectBlock,
              onSelectItem,
              onOpenMenu: (title, docs) =>
                setMenuModal({
                  title,
                  docs,
                  activeId: docs[0]?.id ?? "menu",
                  activeImageIndex: 0
                })
            })}
          </Fragment>
        ))}
      </main>

      {menuModal && !previewMode ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 px-3 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[24px] border border-white/12 bg-[#0b0e14] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">{menuModal.title}</div>
                {menuModal.docs.length > 1
                  ? menuModal.docs.map((doc) => (
                      <button
                        key={doc.id}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                          doc.id === menuModal.activeId
                            ? "border-[rgba(26,90,73,0.8)] bg-[rgba(26,90,73,0.25)] text-white"
                            : "border-white/16 text-white/80 hover:border-white/28 hover:text-white"
                        }`}
                        type="button"
                        onClick={() => setMenuModal((current) => (current ? { ...current, activeId: doc.id, activeImageIndex: 0 } : current))}
                      >
                        {doc.label}
                      </button>
                    ))
                  : null}
              </div>
              <button
                className="rounded-full border border-white/16 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:border-white/28 hover:text-white"
                type="button"
                onClick={() => setMenuModal(null)}
              >
                Закрыть
              </button>
            </div>
            {(() => {
              const activeDoc = menuModal.docs.find((doc) => doc.id === menuModal.activeId) ?? menuModal.docs[0];
              if (!activeDoc) {
                return null;
              }

              if (activeDoc.kind === "images" && activeDoc.images && activeDoc.images.length > 0) {
                const imageIndex = Math.min(menuModal.activeImageIndex, activeDoc.images.length - 1);
                const activeImage = activeDoc.images[imageIndex];
                return (
                  <div className="bg-[#0a0d13] p-4">
                    <div className="relative mx-auto flex h-[70vh] items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-black/35">
                      <Image
                        alt={`${menuModal.title} ${activeDoc.label}`}
                        className="h-full w-full object-contain"
                        fill
                        sizes="100vw"
                        src={activeImage}
                      />
                      {activeDoc.images.length > 1 ? (
                        <>
                          <button
                            className="absolute left-3 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                            type="button"
                            onClick={() =>
                              setMenuModal((current) =>
                                current
                                  ? {
                                      ...current,
                                      activeImageIndex: current.activeImageIndex > 0 ? current.activeImageIndex - 1 : activeDoc.images!.length - 1
                                    }
                                  : current
                              )
                            }
                          >
                            Назад
                          </button>
                          <button
                            className="absolute right-3 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                            type="button"
                            onClick={() =>
                              setMenuModal((current) =>
                                current
                                  ? {
                                      ...current,
                                      activeImageIndex: current.activeImageIndex < activeDoc.images!.length - 1 ? current.activeImageIndex + 1 : 0
                                    }
                                  : current
                              )
                            }
                          >
                            Вперед
                          </button>
                        </>
                      ) : null}
                    </div>
                    {activeDoc.images.length > 1 ? (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                        {activeDoc.images.map((imageUrl, index) => (
                          <button
                            key={imageUrl}
                            className={`relative h-16 w-24 flex-none overflow-hidden rounded-lg border ${
                              index === imageIndex ? "border-[var(--accent-green)]" : "border-white/20"
                            }`}
                            type="button"
                            onClick={() => setMenuModal((current) => (current ? { ...current, activeImageIndex: index } : current))}
                          >
                            <Image alt={`${activeDoc.label} ${index + 1}`} className="object-cover" fill sizes="96px" src={imageUrl} />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <>
                  <iframe className="h-[74vh] w-full bg-white" src={activeDoc.embedUrl} title={`${menuModal.title} — ${activeDoc.label}`} />
                </>
              );
            })()}
          </div>
        </div>
      ) : null}

      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/92 px-2 py-2.5 backdrop-blur transition-transform duration-300 md:hidden ${navVisible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto flex max-w-xl gap-1.5 text-xs">
          <ActionLink
            className="flex-1 rounded-full bg-[var(--accent-red)] px-2 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="sticky_telegram"
            href={content.site.stickyTelegramCta.href}
            label={content.site.stickyTelegramCta.label}
            previewMode={previewMode}
          />
          <ActionLink
            className="flex-1 rounded-full border border-white/18 px-2 py-2 text-center font-semibold uppercase tracking-wider text-white"
            goal="sticky_call"
            href={content.site.stickyCallCta.href}
            label={content.site.stickyCallCta.label}
            previewMode={previewMode}
          />
        </div>
      </div>
    </div>
  );
}

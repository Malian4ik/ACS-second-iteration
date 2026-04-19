import fs from "node:fs/promises";
import path from "node:path";

import { get, put } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

import { defaultCmsContent } from "@/lib/cms-default";
import type {
  CtaAlignment,
  CtaButtonSize,
  CtaGap,
  CmsBlock,
  CmsContent,
  HeroCtaLayout,
  LegacyCmsContent,
  OfferCard,
  RestaurantPhoto,
  RoomCard,
  SecondaryCtaTone
} from "@/lib/cms-schema";

const CMS_BLOB_PATH = "cms/site-content.json";
const LOCAL_CMS_FILE = path.join(process.cwd(), "content", "cms.local.json");

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeCta(value: unknown, fallback: { label: string; href: string }) {
  if (!isObject(value)) {
    return fallback;
  }

  return {
    label: asString(value.label, fallback.label),
    href: asString(value.href, fallback.href)
  };
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item) => asString(item)).filter(Boolean);
}

function pickOption<T extends string>(value: unknown, fallback: T, allowed: readonly T[]) {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : fallback;
}

function normalizeHeroCtaLayout(value: unknown, fallback: HeroCtaLayout): HeroCtaLayout {
  const input = isObject(value) ? value : {};

  return {
    alignment: pickOption<CtaAlignment>(input.alignment, fallback.alignment, ["left", "center", "right"]),
    primarySize: pickOption<CtaButtonSize>(input.primarySize, fallback.primarySize, ["compact", "standard", "large"]),
    secondarySize: pickOption<CtaButtonSize>(input.secondarySize, fallback.secondarySize, ["compact", "standard", "large"]),
    secondaryTone: pickOption<SecondaryCtaTone>(input.secondaryTone, fallback.secondaryTone, ["outline", "quiet"]),
    gap: pickOption<CtaGap>(input.gap, fallback.gap, ["tight", "normal", "wide"])
  };
}

function normalizeOfferCards(value: unknown, fallback: OfferCard[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .map((item, index) => {
      if (!isObject(item)) {
        return null;
      }

      return {
        id: asString(item.id, `offer-${index + 1}`),
        title: asString(item.title, "Новый оффер"),
        description: asString(item.description, ""),
        imageUrl: asString(item.imageUrl, "/images/club-room-red.webp"),
        cta: normalizeCta(item.cta, {
          label: "Написать в Telegram",
          href: "https://t.me/AVULUSbot"
        })
      };
    })
    .filter((card): card is OfferCard => Boolean(card));
}

function normalizeRoomCards(value: unknown, fallback: RoomCard[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .map((item, index) => {
      if (!isObject(item)) {
        return null;
      }

      return {
        id: asString(item.id, `room-${index + 1}`),
        title: asString(item.title, "Комната"),
        capacity: asString(item.capacity, ""),
        dayPrice: asString(item.dayPrice, ""),
        nightPrice: asString(item.nightPrice, ""),
        description: asString(item.description, ""),
        imageUrl: asString(item.imageUrl, "/images/cyberclub-card.jpg"),
        telegramCta: normalizeCta(item.telegramCta, {
          label: "Telegram",
          href: "https://t.me/AVULUSbot"
        }),
        callCta: normalizeCta(item.callCta, {
          label: "Позвонить",
          href: "tel:+74959212221"
        })
      };
    })
    .filter((card): card is RoomCard => Boolean(card));
}

function normalizeRestaurantPhotos(value: unknown, fallback: RestaurantPhoto[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .map((item, index) => {
      if (!isObject(item)) {
        return null;
      }

      return {
        id: asString(item.id, `photo-${index + 1}`),
        imageUrl: asString(item.imageUrl, "/images/dish-burger.jpg"),
        alt: asString(item.alt, "Фото ресторана")
      };
    })
    .filter((photo): photo is RestaurantPhoto => Boolean(photo));
}

function normalizeBlock(block: unknown, defaults: CmsBlock): CmsBlock {
  if (!isObject(block)) {
    return defaults;
  }

  const enabled = typeof block.enabled === "boolean" ? block.enabled : defaults.enabled;
  const id = asString(block.id, defaults.id);

  switch (defaults.type) {
    case "hero":
      return {
        ...defaults,
        id,
        enabled,
        title: asString(block.title, defaults.title),
        subtitle: asString(block.subtitle, defaults.subtitle),
        description: asString(block.description, defaults.description),
        badges: normalizeStringArray(block.badges, defaults.badges),
        primaryCta: normalizeCta(block.primaryCta, defaults.primaryCta),
        secondaryCta: normalizeCta(block.secondaryCta, defaults.secondaryCta),
        ctaLayout: normalizeHeroCtaLayout(block.ctaLayout, defaults.ctaLayout)
      };
    case "offers":
      return {
        ...defaults,
        id,
        enabled,
        title: asString(block.title, defaults.title),
        subtitle: asString(block.subtitle, defaults.subtitle),
        emptyStateTitle: asString(block.emptyStateTitle, defaults.emptyStateTitle),
        emptyStateDescription: asString(block.emptyStateDescription, defaults.emptyStateDescription),
        cards: normalizeOfferCards(block.cards, defaults.cards)
      };
    case "rooms":
      return {
        ...defaults,
        id,
        enabled,
        title: asString(block.title, defaults.title),
        subtitle: asString(block.subtitle, defaults.subtitle),
        pricingHint: asString(block.pricingHint, defaults.pricingHint),
        cards: normalizeRoomCards(block.cards, defaults.cards)
      };
    case "restaurant":
      {
        const legacyMenuEmbedUrl = asString(block.menuEmbedUrl, defaults.menuEmbedUrl);
        const foodMenuUrl = asString(block.foodMenuUrl, legacyMenuEmbedUrl || defaults.foodMenuUrl);
        const barMenuUrl = asString(block.barMenuUrl, defaults.barMenuUrl);
        const cocktailsMenuUrl = asString(block.cocktailsMenuUrl, defaults.cocktailsMenuUrl);
        const foodMenuImages = normalizeStringArray(block.foodMenuImages, defaults.foodMenuImages);
        const barMenuImages = normalizeStringArray(block.barMenuImages, defaults.barMenuImages);
        const cocktailsMenuImages = normalizeStringArray(block.cocktailsMenuImages, defaults.cocktailsMenuImages);

      return {
        ...defaults,
        id,
        enabled,
        eyebrow: asString(block.eyebrow, defaults.eyebrow),
        title: asString(block.title, defaults.title),
        subtitle: asString(block.subtitle, defaults.subtitle),
        description: asString(block.description, defaults.description),
        photos: normalizeRestaurantPhotos(block.photos, defaults.photos),
        menuEmbedUrl: legacyMenuEmbedUrl,
        foodMenuUrl,
        barMenuUrl,
        cocktailsMenuUrl,
        foodMenuImages,
        barMenuImages,
        cocktailsMenuImages,
        menuCta: normalizeCta(block.menuCta, defaults.menuCta),
        telegramCta: normalizeCta(block.telegramCta, defaults.telegramCta),
        callCta: normalizeCta(block.callCta, defaults.callCta)
      };
      }
    case "contacts":
      return {
        ...defaults,
        id,
        enabled,
        title: asString(block.title, defaults.title),
        subtitle: asString(block.subtitle, defaults.subtitle),
        address: asString(block.address, defaults.address),
        mapEmbedUrl: asString(block.mapEmbedUrl, defaults.mapEmbedUrl),
        badges: normalizeStringArray(block.badges, defaults.badges),
        links: Array.isArray(block.links)
          ? block.links
              .map((item, index) => {
                if (!isObject(item)) {
                  return null;
                }
                return {
                  id: asString(item.id, `link-${index + 1}`),
                  label: asString(item.label, "Ссылка"),
                  href: asString(item.href, "#")
                };
              })
              .filter((item): item is { id: string; label: string; href: string } => Boolean(item))
          : defaults.links
      };
    default:
      return defaults;
  }
}

function migrateLegacyContent(input: LegacyCmsContent): CmsContent {
  const migrated = structuredClone(defaultCmsContent);

  if (input.home?.primaryCtaLabel) {
    migrated.site.navCta.label = input.home.primaryCtaLabel;
  }

  const heroBlock = migrated.blocks.find((block) => block.type === "hero");
  if (heroBlock?.type === "hero") {
    heroBlock.primaryCta.label = input.home?.primaryCtaLabel ?? heroBlock.primaryCta.label;
    heroBlock.secondaryCta.label = input.home?.secondaryCtaLabel ?? heroBlock.secondaryCta.label;
  }

  const offersBlock = migrated.blocks.find((block) => block.type === "offers");
  if (offersBlock?.type === "offers") {
    offersBlock.title = input.home?.promoTitle ?? offersBlock.title;
    offersBlock.subtitle = input.home?.promoSubtitle ?? offersBlock.subtitle;

    if (Array.isArray(input.home?.promoCards) && input.home.promoCards.length > 0) {
      offersBlock.cards = input.home.promoCards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        imageUrl: card.imageUrl,
        cta: {
          label: card.ctaLabel,
          href: card.ctaHref
        }
      }));
    }
  }

  const restaurantBlock = migrated.blocks.find((block) => block.type === "restaurant");
  if (restaurantBlock?.type === "restaurant") {
    restaurantBlock.description = input.restaurant?.shortDescription ?? restaurantBlock.description;
    restaurantBlock.menuCta.label = input.restaurant?.menuButtonLabel ?? restaurantBlock.menuCta.label;
    restaurantBlock.telegramCta.label = input.restaurant?.telegramCtaLabel ?? restaurantBlock.telegramCta.label;

    if (Array.isArray(input.restaurant?.foodVisuals) && input.restaurant.foodVisuals.length > 0) {
      restaurantBlock.photos = input.restaurant.foodVisuals.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        alt: item.title || "Фото ресторана"
      }));
    }
  }

  return migrated;
}

function mergeCmsContent(input: unknown): CmsContent {
  if (!isObject(input)) {
    return structuredClone(defaultCmsContent);
  }

  // v1 -> v2 migration
  if ("home" in input || "restaurant" in input) {
    return migrateLegacyContent(input as LegacyCmsContent);
  }

  const defaults = structuredClone(defaultCmsContent);

  const siteInput = isObject(input.site) ? input.site : {};

  defaults.site = {
    projectName: asString(siteInput.projectName, defaults.site.projectName),
    brandSubtitle: asString(siteInput.brandSubtitle, defaults.site.brandSubtitle),
    navigationItems: Array.isArray(siteInput.navigationItems)
      ? siteInput.navigationItems
          .map((item, index) => {
            if (!isObject(item)) {
              return null;
            }
            return {
              id: asString(item.id, `nav-${index + 1}`),
              label: asString(item.label, "Раздел"),
              blockId: asString(item.blockId, defaults.site.navigationItems[0]?.blockId ?? "")
            };
          })
          .filter((item): item is { id: string; label: string; blockId: string } => Boolean(item))
      : defaults.site.navigationItems,
    navCta: normalizeCta(siteInput.navCta, defaults.site.navCta),
    stickyTelegramCta: normalizeCta(siteInput.stickyTelegramCta, defaults.site.stickyTelegramCta),
    stickyCallCta: normalizeCta(siteInput.stickyCallCta, defaults.site.stickyCallCta)
  };

  const inputBlocks = Array.isArray(input.blocks) ? input.blocks : [];
  const defaultByType = new Map(defaults.blocks.map((block) => [block.type, block]));

  const normalizedBlocks: CmsBlock[] = inputBlocks
    .map((item) => {
      if (!isObject(item)) {
        return null;
      }

      const type = asString(item.type) as CmsBlock["type"];
      const fallback = defaultByType.get(type);
      if (!fallback) {
        return null;
      }

      return normalizeBlock(item, fallback);
    })
    .filter((block): block is CmsBlock => Boolean(block));

  // Ensure every required block type exists at least once
  const existingTypes = new Set(normalizedBlocks.map((block) => block.type));
  for (const defaultBlock of defaults.blocks) {
    if (!existingTypes.has(defaultBlock.type)) {
      normalizedBlocks.push(defaultBlock);
    }
  }

  return {
    version: 2,
    site: defaults.site,
    blocks: normalizedBlocks
  };
}

async function readLocalCmsFile() {
  try {
    const raw = await fs.readFile(LOCAL_CMS_FILE, "utf-8");
    return mergeCmsContent(JSON.parse(raw));
  } catch {
    return structuredClone(defaultCmsContent);
  }
}

async function writeLocalCmsFile(content: CmsContent) {
  await fs.mkdir(path.dirname(LOCAL_CMS_FILE), { recursive: true });
  await fs.writeFile(LOCAL_CMS_FILE, `${JSON.stringify(content, null, 2)}\n`, "utf-8");
}

async function readBlobCmsFile() {
  try {
    const blob = await get(CMS_BLOB_PATH, { access: "public" });
    if (!blob || blob.statusCode !== 200) {
      return structuredClone(defaultCmsContent);
    }

    const text = await new Response(blob.stream).text();
    return mergeCmsContent(JSON.parse(text));
  } catch {
    return structuredClone(defaultCmsContent);
  }
}

async function backupCurrentBlobCmsFile() {
  try {
    const blob = await get(CMS_BLOB_PATH, { access: "public" });
    if (!blob || blob.statusCode !== 200) {
      return;
    }

    const text = await new Response(blob.stream).text();
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await put(`cms/backups/${stamp}.json`, text, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: "application/json"
    });
  } catch {
    // best effort
  }
}

async function writeBlobCmsFile(content: CmsContent) {
  await backupCurrentBlobCmsFile();
  await put(CMS_BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  });
}

export async function getCmsContent() {
  noStore();
  return hasBlobToken() ? readBlobCmsFile() : readLocalCmsFile();
}

export async function saveCmsContent(content: CmsContent) {
  const merged = mergeCmsContent(content);

  if (hasBlobToken()) {
    await writeBlobCmsFile(merged);
    return merged;
  }

  await writeLocalCmsFile(merged);
  return merged;
}

export function getCmsStorageMode() {
  return hasBlobToken() ? "blob" : "local";
}

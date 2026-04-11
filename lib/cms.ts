import fs from "node:fs/promises";
import path from "node:path";

import { get, put } from "@vercel/blob";

import { defaultCmsContent } from "@/lib/cms-default";
import type { CmsContent } from "@/lib/cms-schema";

const CMS_BLOB_PATH = "cms/site-content.json";
const LOCAL_CMS_FILE = path.join(process.cwd(), "content", "cms.local.json");

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function mergeCmsContent(input: Partial<CmsContent> | undefined): CmsContent {
  return {
    ...defaultCmsContent,
    ...input,
    home: {
      ...defaultCmsContent.home,
      ...input?.home,
      promoCards: input?.home?.promoCards ?? defaultCmsContent.home.promoCards
    },
    restaurant: {
      ...defaultCmsContent.restaurant,
      ...input?.restaurant,
      foodVisuals: input?.restaurant?.foodVisuals ?? defaultCmsContent.restaurant.foodVisuals
    },
    club: {
      ...defaultCmsContent.club,
      ...input?.club
    },
    media: {
      ...defaultCmsContent.media,
      ...input?.media
    }
  };
}

async function readLocalCmsFile() {
  try {
    const raw = await fs.readFile(LOCAL_CMS_FILE, "utf-8");
    return mergeCmsContent(JSON.parse(raw) as Partial<CmsContent>);
  } catch {
    return defaultCmsContent;
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
      return defaultCmsContent;
    }

    const text = await new Response(blob.stream).text();
    return mergeCmsContent(JSON.parse(text) as Partial<CmsContent>);
  } catch {
    return defaultCmsContent;
  }
}

async function writeBlobCmsFile(content: CmsContent) {
  await put(CMS_BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  });
}

export async function getCmsContent() {
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

import fs from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "FILE_REQUIRED" }, { status: 400 });
  }

  const safeName = `${Date.now()}-${sanitizeFileName(file.name)}`;

  if (hasBlobToken()) {
    const uploaded = await put(`cms/uploads/${safeName}`, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || "application/octet-stream"
    });

    return NextResponse.json({ ok: true, url: uploaded.url, storage: "blob" });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safeName), buffer);

  return NextResponse.json({ ok: true, url: `/uploads/${safeName}`, storage: "local" });
}

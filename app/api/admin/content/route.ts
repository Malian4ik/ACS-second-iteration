import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { findCmsEncodingIssues } from "@/lib/cms-encoding-guard";
import { getCmsContent, getCmsStorageMode, saveCmsContent } from "@/lib/cms";
import type { CmsContent } from "@/lib/cms-schema";

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/restaurant");
  revalidatePath("/rooms");
  revalidatePath("/cyberclub");
  revalidatePath("/en");
  revalidatePath("/en/restaurant");
  revalidatePath("/en/rooms");
  revalidatePath("/en/cyberclub");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const content = await getCmsContent();
  return NextResponse.json({ content, storage: getCmsStorageMode() });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { content } = (await request.json()) as { content?: CmsContent };

  if (!content) {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const encodingIssues = findCmsEncodingIssues(content);
  if (encodingIssues.length > 0) {
    return NextResponse.json(
      {
        error: "SUSPECT_ENCODING",
        issues: encodingIssues.slice(0, 10)
      },
      { status: 400 }
    );
  }

  const saved = await saveCmsContent(content);
  revalidateSite();

  return NextResponse.json({ ok: true, content: saved, storage: getCmsStorageMode() });
}

import type { CmsContent } from "@/lib/cms-schema";

type EncodingIssue = {
  path: string;
  value: string;
  reason: string;
};

function shouldFlagString(value: string) {
  if (!value) {
    return null;
  }

  if (value.includes("\uFFFD")) {
    return "contains replacement characters";
  }

  if (/\?{3,}/.test(value)) {
    return "contains repeated question marks";
  }

  return null;
}

function walk(input: unknown, path: string, issues: EncodingIssue[]) {
  if (typeof input === "string") {
    const reason = shouldFlagString(input);
    if (reason) {
      issues.push({ path, value: input, reason });
    }
    return;
  }

  if (Array.isArray(input)) {
    input.forEach((item, index) => walk(item, `${path}[${index}]`, issues));
    return;
  }

  if (input && typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      walk(value, path ? `${path}.${key}` : key, issues);
    }
  }
}

export function findCmsEncodingIssues(content: CmsContent) {
  const issues: EncodingIssue[] = [];
  walk(content, "", issues);
  return issues;
}

import crypto from "node:crypto";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "acs_admin_session";

function getPassword() {
  return process.env.ADMIN_PANEL_PASSWORD ?? "";
}

export function isAdminPasswordConfigured() {
  return Boolean(getPassword());
}

function signPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthenticated() {
  const password = getPassword();

  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === signPassword(password);
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionValue() {
  return signPassword(getPassword());
}

export function isValidAdminPassword(password: string) {
  const expected = getPassword();
  return Boolean(expected) && password === expected;
}

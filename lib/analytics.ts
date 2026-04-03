declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "");

export function trackGoal(goal: string, payload?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  if (Number.isFinite(metrikaId) && metrikaId > 0 && typeof window.ym === "function") {
    window.ym(metrikaId, "reachGoal", goal, payload);
  }
}

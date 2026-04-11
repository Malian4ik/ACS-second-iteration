"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ needsSetup = false }: { needsSetup?: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Неверный пароль администратора.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#07090d] px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#10141c,#0b0f15)] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="text-xs uppercase tracking-[0.32em] text-[var(--accent-sand)]">Admin</div>
        <h1 className="mt-4 font-[family:var(--font-oswald)] text-5xl uppercase leading-none">Панель сайта</h1>
        <p className="mt-4 text-sm leading-7 text-white/62">
          Простая панель для управления текстами, спецпредложениями и изображениями на сайте.
        </p>

        {needsSetup ? (
          <div className="mt-8 rounded-2xl border border-[rgba(255,190,120,0.18)] bg-[rgba(255,190,120,0.06)] px-4 py-4 text-sm leading-7 text-white/76">
            Для входа задай переменную окружения <code>ADMIN_PANEL_PASSWORD</code>. Для постоянного хранения
            текстов и фото на Vercel также нужен <code>BLOB_READ_WRITE_TOKEN</code>.
          </div>
        ) : null}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Пароль</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent-green)]"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите ADMIN_PANEL_PASSWORD"
              type="password"
              value={password}
              disabled={needsSetup}
            />
          </label>

          {error ? <div className="text-sm text-[#ff7a7a]">{error}</div> : null}

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--accent-red-strong)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting || needsSetup}
            type="submit"
          >
            {needsSetup ? "Нужна настройка env" : isSubmitting ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

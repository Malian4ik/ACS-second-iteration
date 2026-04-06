# Avulus Cyber Space Frontend

Фронтенд нового сайта Avulus на Next.js. Текущая версия строится вокруг двух основных задач:

- быстро объяснить продукт на главной;
- показать комнаты, форматы и тарифы на `/rooms`;
- довести пользователя до брони, Telegram, VK или звонка без лишних шагов.

## Стек

- Next.js
- TypeScript
- Tailwind CSS

## Запуск

```bash
npm install
npm run dev
```

Локально сайт открывается на `http://localhost:3000`.

## Основные маршруты

- `/` — главная
- `/rooms` — выбор формата и комнаты
- `/cyberclub` — подробная страница клуба
- `/restaurant` — подробная страница ресторана

## Структура проекта

```text
app/
  cyberclub/
  restaurant/
  rooms/
components/
  analytics/
  club/
  layout/
  pages/
  restaurant/
  rooms/
  ui/
docs/
  figma-handoff.md
  review-checklist-ru.md
  site-structure-ru.md
lib/
  analytics.ts
  catalog.ts
  content.ts
public/
  images/
```

## Где что редактировать

- Контент, названия разделов, локализация и карточки комнат: `lib/content.ts`
- Тарифы клуба: `lib/catalog.ts`
- Аналитика кликов: `lib/analytics.ts`
- Главные страницы:
  - `components/pages/home-page.tsx`
  - `components/pages/rooms-page.tsx`
  - `components/pages/cyberclub-page.tsx`
  - `components/pages/restaurant-page.tsx`

## Документация по проекту

В папке `docs/` лежат файлы, которые задают рамку проекта:

- `docs/site-structure-ru.md` — структура сайта, обязательные разделы и продуктовая логика
- `docs/review-checklist-ru.md` — что смотреть на каждом ревью
- `docs/figma-handoff.md` — что переносить в Figma и в каком виде

## Ассеты

Все изображения лежат в `public/images/`.

Для текущей версии особенно важны реальные фото:

- `club-room-green.webp`
- `club-room-red.webp`
- `restaurant-real-1.jpg`
- `restaurant-real-2.jpg`
- `cyberclub-team.jpg`
- `cyberclub-vip.jpg`

## Аналитика

Для Яндекс Метрики используется переменная окружения:

```bash
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

Если переменная не задана, сайт работает без инициализации Метрики.

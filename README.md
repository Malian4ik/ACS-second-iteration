# Avulus Cyber Space Frontend

High-conversion Next.js landing funnel for Avulus Cyber Space. The site is built around two core routes:

- `/` for fast product understanding and split user flow
- `/rooms` for format selection and messenger-first conversion

## Stack

- Next.js
- TypeScript
- Tailwind CSS

## How to install

```bash
npm install
```

## How to run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available routes

- `/`
- `/rooms`

Legacy routes redirect into the new funnel:

- `/cyberclub` -> `/rooms`
- `/restaurant` -> `/#restaurant`

## Project structure

```text
app/
  cyberclub/
  restaurant/
  rooms/
components/
  analytics/
  layout/
  rooms/
  ui/
docs/
  figma-handoff.md
lib/
  analytics.ts
  site-data.ts
  stitch-site.ts
public/
  images/
```

## Main editing points

- Funnel content, room data, nav items, and CTA targets live in `lib/site-data.ts`.
- Click analytics helpers live in `lib/analytics.ts`.
- Yandex Metrika bootstrapping lives in `components/analytics/yandex-metrika.tsx`.
- The Figma transfer brief is in `docs/figma-handoff.md`.

## How to configure CTA links

Edit the `contactLinks` object in `lib/site-data.ts`:

- `telegram`
- `whatsapp`
- `call`
- `menu`
- `privacy`
- `terms`
- `cookies`

## How to configure analytics

Set an environment variable before running or deploying:

```bash
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

If the variable is missing, the site still works, but Yandex Metrika will not initialize.

Tracked events include:

- hero and section CTA clicks
- room filter clicks
- messenger clicks
- call clicks
- scroll depth milestones via Yandex Metrika goals

## Where to replace assets

All page visuals are local and live in `public/images/`.

Current files used by the funnel include:

- `hero-main.jpg`
- `cyberclub-card.jpg`
- `cyberclub-vip.jpg`
- `cyberclub-team.jpg`
- `restaurant-card.jpg`
- `restaurant-room.jpg`

Replace those files in place, or update the image paths inside `lib/site-data.ts`.

## Figma handoff

Use `docs/figma-handoff.md` as the source of truth for moving this funnel into Figma. It lists:

- page structure
- section order
- component inventory
- UX changes from the old version
- visual direction and token guidance

## Notes

- The old Stitch source data is still preserved in `lib/stitch-site.ts` for reference.
- The current implementation is optimized around clarity, CTA visibility, and mobile messenger conversion.

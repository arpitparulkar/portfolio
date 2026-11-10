# Arpit Parulkar — Portfolio

A cinematic, responsive single-page portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. All visual artwork is CSS-based; no stock or remote images are required.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. For a production build, run `npm run build`, then `npm run start`.

## Edit the content

- **Projects:** edit the `projects` array in `projects.js`. The `id` value maps each card to its matching case-study anchor. Replace `TBC` with each project's actual year when known.
- **Contact and personal links:** edit `src/data/site.ts`. The supplied email is configured; add verified social and resume URLs when available. Empty values intentionally remain unlinked.
- **Portrait:** replace `public/images/arpit-portrait-v2.png` with an optimized transparent portrait to update the hero and About photo.
- **Page copy and sections:** edit `src/app/page.tsx`.
- **Visual system and responsive behavior:** edit `src/app/globals.css`.

The portfolio is frontend-only and does not require a database or backend service.

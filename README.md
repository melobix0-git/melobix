# Melobix Portfolio

Personal portfolio site. Five pages, each with its own visual theme — dark neon,
monochrome, warm earthy, glassmorphism and cyberpunk — sharing one navigation,
one type system and one component set.

**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Wouter

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script            | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR |
| `npm run build`   | Type-check and build to `dist/`    |
| `npm run preview` | Serve the production build locally |
| `npm run check`   | Type-check only                    |
| `npm run format`  | Format the codebase with Prettier  |

## Project structure

```
.
├── index.html            # Vite entry
├── public/               # Static assets served as-is (favicon, robots.txt)
└── src/
    ├── main.tsx          # React root
    ├── App.tsx           # Routes + per-route theme sync
    ├── index.css         # Tailwind, theme variables, animations
    ├── components/       # Layout, Navigation, Footer, SectionHeading, ErrorBoundary
    ├── pages/            # Home, Projects, About, Services, Contact, NotFound
    ├── data/             # Site config, nav links, projects, services, pricing
    ├── hooks/            # useDocumentTitle
    └── lib/              # themes.ts — route → theme mapping
```

## How theming works

Each route maps to a theme name in `src/lib/themes.ts`. On navigation the name
is written to `<html data-theme="…">`, and `src/index.css` defines a set of CSS
variables (`--bg`, `--card`, `--accent1…4`, `--text`, `--muted`, `--border`)
for every theme. Components only ever reference those variables, so a page can
change its entire look without touching component code.

## Scroll motion

All scroll effects run through one shared `requestAnimationFrame` loop
(`src/lib/scroll.ts`) and write CSS variables/transforms directly, so
scrolling never re-renders React. Every effect is disabled or frozen under
`prefers-reduced-motion`.

| Component        | Effect                                                         |
| ---------------- | -------------------------------------------------------------- |
| `Reveal`         | On-enter entrances: up, rise, flip, pop, zoom, clip wipes, scan |
| `SplitText`      | Word/char staggered reveal (mask, blur, flip)                  |
| `ScrubText`      | Words light up as the paragraph scrolls past (scroll-scrubbed) |
| `Parallax`       | Depth layers (element- or page-scroll driven)                  |
| `ScrollExit`     | Hero lifts, fades, scales/blurs as it scrolls away             |
| `ScrollTrack`    | Oversized type band locked to scroll                           |
| `StackCards`     | Sticky stacking deck                                           |
| `ScrollTimeline` | Timeline spine that fills with scroll                          |
| `Marquee`        | `reactive` prop: speeds up / reverses / skews with velocity    |

Each page uses a mix that matches its theme:

- **Home (neon):** parallax mesh, hero exit, velocity marquee, 3D flip cards, staggered parallax grid, neon scrubbed CTA
- **Projects (monochrome):** character-mask hero, curtain-wipe cards (replay on filter), scroll-locked outlined type bands
- **About (earthy):** organic parallax, self-reading story, growing timeline, flip framework grid, springy skill chips
- **Services (glass):** frosted-focus cards, hero that mists over, sticky process deck, fanned pricing
- **Contact (matrix):** CRT scan-in channels, form fields that "boot" in sequence, decoding headings

## Next-page portal

Every page ends with `NextPage` (mounted in `Layout`), a big card linking
to the next page in the nav order (Contact loops back to Home). It renders
in the **destination's** theme by setting `data-theme` on the card, which
scopes that theme's CSS variables. It also carries that page's signature
details: neon orbs and the MB blob, a fanned deck of project logos, the
portrait in a warm arch, frosted service chips, or live Matrix rain.
Clicking plays a circular wipe in the next theme (`src/lib/pageTransition.ts`)
before the route changes. Copy lives in `src/data/nextPage.ts`.

## Contact form

The form validates client-side and then either:

- POSTs JSON to `VITE_FORM_ENDPOINT` if it's set (see `.env.example`), or
- opens the visitor's mail client with a pre-filled message.

Pricing cards on `/services` link to `/contact?plan=…`, which pre-fills the message.

## Deploying

`npm run build` produces a static site in `dist/`. Because routing is
client-side, configure your host to serve `index.html` for unknown paths
(Netlify: `_redirects` with `/* /index.html 200`; Vercel: a rewrite rule).

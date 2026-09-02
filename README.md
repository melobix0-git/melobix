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

## Contact form

The form validates client-side and then either:

- POSTs JSON to `VITE_FORM_ENDPOINT` if it's set (see `.env.example`), or
- opens the visitor's mail client with a pre-filled message.

Pricing cards on `/services` link to `/contact?plan=…`, which pre-fills the message.

## Deploying

`npm run build` produces a static site in `dist/`. Because routing is
client-side, configure your host to serve `index.html` for unknown paths
(Netlify: `_redirects` with `/* /index.html 200`; Vercel: a rewrite rule).

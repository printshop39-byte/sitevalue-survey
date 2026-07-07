# SiteValue — Survey & Site Valuation SaaS (Prototype)

An enterprise-grade, responsive front-end prototype for a **Survey & Site
Valuation** platform aimed at engineering and valuation firms. Built with
**Next.js 15 (App Router)**, **Tailwind CSS**, and **shadcn/ui**.

> This is a **UI prototype only** — there is no backend. All data is served
> from mock JSON/TypeScript in `lib/mock-data.ts`.

## Features / Pages

| Route | Page | Notes |
|-------|------|-------|
| `/login` | **Login** | Split-screen enterprise sign-in (any credentials work) |
| `/dashboard` | **Dashboard** | KPIs, valuation trend, status donut, activity feed |
| `/sites` | **Site List** | Search, status/type filters, table & grid views |
| `/sites/[id]` | **Site Details** | Hero, valuation build-up, inspection findings, surveyor |
| `/sites/[id]/photos` | **Photo Gallery** | Category filter + full-screen lightbox |
| `/sites/[id]/documents` | **Documents** | Filterable document register |
| `/print/[id]` | **Print Preview** | A4 valuation report with print/PDF styling |
| `/map`, `/reports`, `/settings` | Supporting views |  |

## Tech

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 3 with CSS-variable theming (light/dark ready)
- shadcn/ui component primitives (hand-included under `components/ui`)
- lucide-react icons
- Zero charting dependencies — charts are lightweight inline SVG

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. You'll land on the login screen — sign in
(any values) to enter the workspace.

## Project structure

```
app/
  login/              # Login page
  (app)/              # Authenticated shell (sidebar + topbar)
    dashboard/
    sites/            # list + [id] detail, photos, documents
    map/ reports/ settings/
  print/[id]/         # Standalone print report (no shell)
components/
  ui/                 # shadcn primitives
  ...                 # app-shell, charts, site-hero, gallery, etc.
lib/
  mock-data.ts        # all seed data
  types.ts  utils.ts
```

## Notes

- Images use `picsum.photos` placeholders (see `next.config.mjs`).
- The design uses an engineering-blue primary with a dark slate navigation
  rail for a professional, enterprise feel.
- Replace `lib/mock-data.ts` with real API calls to make it production-bound.

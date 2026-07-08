# Client Demo — Release Notes

**Product:** Survey & Site Valuation Management System
**Vendor:** K D SOFT — KEDAR DINGANKAR DME
**Version:** 1.0 (Prototype V1 — Frozen for Client Demo)
**Build:** Next.js 15 · React 19 · Tailwind · fully static (no backend)
**Status:** ✅ `npm run build` passes with zero errors and zero warnings

---

## Demo credentials

| Role | Email | Password | Sees |
|------|-------|----------|------|
| **Super Admin** | `admin@kdsoft.in` | `Admin@123` | Dashboard · New Site · Site Map · Upload Documents · Staff Management · Print Preview |
| **Staff** | `staff1@kdsoft.in` | `Staff@123` | Dashboard · Sites · Upload Documents · Print |

Both accounts are pre-filled on the login screen with one-click **Use** chips. Any other credentials are rejected. There is no real authentication — this is a mock session stored in the browser only.

### Suggested 10–15 min demo flow
1. **Login as Admin** → 2. **Dashboard** → 3. **New Site** (create a record) → 4. **Site Map** → 5. **Upload Documents** → 6. **Staff Management** (add a staff member) → 7. **Print Preview** → 8. **Logout**.
9. **Login as Staff** → show the shorter menu (no Staff Management) to demonstrate role-based access.

---

## Features included

**Access & roles**
- Mock authentication with two roles (Super Admin, Staff)
- Role-based navigation — admin-only pages are hidden from staff
- Locked demo navigation (sidebar exposes only the pages in the demo script)
- Session persists across refresh; sign-out clears it

**Core workspace**
- Portfolio Dashboard — KPI cards with sparklines, valuation trend, status distribution, valuation-by-type, recent sites, team activity
- Sites — searchable/filterable list (table & grid views) with realistic Maharashtra assets (Mumbai Port, Kolhapur MIDC, Pune Ring Road, Sangli, Satara, Nashik, Nagpur MIHAN, Chh. Sambhajinagar)
- Site detail — hero, quick facts, workflow timeline, valuation breakdown, inspection findings, embedded map, attached records
- **Create New Site** — multi-section form with validation and a simulated save
- **Interactive Map** — Leaflet with OpenStreetMap tiles (auto-fallback when no Google Maps key), markers sized by valuation
- **Upload Documents** — drag-and-drop with file previews, remove, and simulated upload success (Photos / PDF / DWG / Estimate)
- Photo gallery (lightbox) and document list per site

**Administration**
- **Staff Management** — team table (Name, Email, Mobile, Role/Designation, Access, Status, Action) with activate/deactivate, remove, and an **Add Staff** dialog (validation incl. password match)
- Company Profile, User Access matrix, Settings (reachable by URL; kept out of the locked demo nav)

**Reporting**
- **A4 Print Preview** — letterhead, confidential banner, property particulars, executive summary, valuation build-up, condition assessment, photographic record, sign-off, and a repeating footer: *Confidential · Prepared by: K D SOFT · Client Demo Version · Printed by · Printed on · Version*

**Branding & polish**
- K D SOFT logo/favicon, browser title, sidebar & login branding (Version 1.0 · Prepared for Client Demo)
- Branded loading screen after login; branded 404 page
- App footer: *© 2026 K D SOFT · Survey & Site Valuation Management System*
- **DEMO MODE** badge in the header; **About** dialog
- **Bilingual UI** — English (default) / Marathi toggle across the whole app
- Empty states and loading skeletons throughout
- Responsive — verified on iPhone SE, iPhone 14, iPad, 1366×768, 1920×1080

---

## Features intentionally deferred (not in V1)

These are represented in the UI but not wired to real systems, by design for the demo:

- **Real backend / database** — all data is in-memory mock data; nothing is persisted server-side
- **Real authentication & user management** — no password reset, SSO, sessions, or server-side authorization
- **Real file storage** — uploaded files are previewed locally and are not sent anywhere
- **Export / Download actions** — buttons are present for layout; report export is via the browser Print dialog
- **Search bar & notifications** — header affordances shown for context; not functional
- **Google Maps provider** — OpenStreetMap is used; Google can be enabled later via an API key
- **Editing of existing sites/records** — creation and viewing are demonstrated; full edit flows are deferred
- **Persistent settings** — changing settings/notifications shows a confirmation but does not persist

---

## Known limitations

- **State is per-session and in-memory.** Created sites, added staff, uploads, and status toggles reset on a full page reload. Language choice and login session persist via `localStorage`.
- **Requires internet at runtime** for map tiles (OpenStreetMap) and placeholder cover images.
- **Not for production valuation use** — figures are illustrative; each report carries a demonstration-only disclaimer.
- **Free-text report content** (site summaries, inspection notes) is in English in both language modes; UI chrome and fixed vocabulary are fully translated.
- **Role enforcement is client-side** (appropriate for a no-backend demo, not a security boundary).

---

## Deployment notes

- Deploys as a static Next.js app (e.g., Vercel). Works identically on any device after deployment.
- If hosting on Vercel, keep **Deployment Protection disabled** so the client can open the shared URL without a Vercel login, and share the production domain (not a preview/branch URL).

_Prototype V1 is frozen. No new features will be added in this version._

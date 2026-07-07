# services/

Data-access boundary. UI components and pages call functions here instead of
touching data sources directly. Currently backed by mock data in
`lib/mock-data.ts`.

When the backend is approved, replace each function body with a Supabase call
(auth, database, storage). The public function signatures should stay stable so
the UI does not need to change.

Planned services:
- `sites-service.ts` ✅ (mock)
- `photos-service.ts` — upload / list site photos (Supabase Storage)
- `documents-service.ts` — upload / version documents
- `reports-service.ts` — generate / stamp print reports
- `auth-service.ts` — sign in / session (Supabase Auth)

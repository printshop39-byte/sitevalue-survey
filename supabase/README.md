# supabase/

Reserved for backend implementation — **not yet started**.

Do not add Supabase (Auth / Database / RLS / Storage) until the client has
signed off on the workflow in the prototype.

Planned contents once approved:

```
supabase/
  config.toml            # local dev config
  migrations/            # SQL migrations (tables, RLS policies)
  seed.sql               # seed data
  functions/             # edge functions (report generation, etc.)
```

Planned tables (draft): `sites`, `photos`, `documents`, `timeline_events`,
`reports`, `profiles`. Storage buckets: `site-photos`, `site-documents`.

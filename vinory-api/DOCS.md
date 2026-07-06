# Vinory API

Runs the Vinory REST API (Fastify + Drizzle) as a Home Assistant add-on. The
database is external (e.g. Supabase) — this add-on is stateless, so there's
no volume to manage and no database to run alongside it.

## Installation

1. Supervisor → Add-on Store → ⋮ → Repositories → add
   `https://github.com/sebbalex/vinory`.
2. Install **Vinory API** from the store.
3. Open the **Configuration** tab and set at least:
   - `database_url` — PostgreSQL connection string.
   - `jwt_secret` — 32+ characters, e.g. `openssl rand -base64 32`.
4. Start the add-on. Check the **Log** tab for
   `Vinory API listening on 0.0.0.0:3000 [production]`.

## Updating

Handled entirely by Supervisor: when a new version is published, the add-on
shows "Update available" in the Store. No SSH, no manual `docker pull`.

## Database migrations

This add-on does not run migrations automatically. After the first install,
and after any schema change, run the SQL files in `apps/api/migrations/`
against `database_url` from a machine that can reach the database (e.g.
`psql $DATABASE_URL -f apps/api/migrations/000X_*.sql`, applied in order).

## Options reference

See `translations/en.yaml` for a description of every option, or the
Configuration tab in the UI, which renders the same text.

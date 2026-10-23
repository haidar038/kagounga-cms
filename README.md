# Kagounga CMS — Payload 3 + Postgres

Admin + API untuk konten `new-kagounga`. Status M14: koleksi `users` (role admin/editor) + `media` (S3/R2 kondisional) + `categories` + `products` (localized en/id + page copy + B2B) + `posts` (Lexical localized) + `stockist-cities` (copy localized + `points[]` nested). REST-only — GraphQL dimatikan (D-030).

## Syarat
- Node >= 20.18.1, pnpm ^9 (repo pakai `pnpm-lock.yaml`).
- Postgres 16 lokal atau via Docker.

## Setup cepat
1. `cp .env.example .env`, isi `DATABASE_URL` + `PAYLOAD_SECRET` (wajib — config fail-fast tanpa itu).
   - Lokal tanpa Docker: `postgresql://postgres:postgres@localhost:5432/kagounga_cms`
   - Via compose (hostname service): `postgresql://postgres:postgres@postgres:5432/kagounga_cms`
2. Install + jalan:
   - `pnpm install && pnpm dev`
   - Buka `http://localhost:3000/admin`, buat admin pertama via UI.
3. Via Docker (butuh Docker terinstall):
   - `docker compose up --build` (service `payload` + `postgres`)

## Env
| Key | Contoh | Guna |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/kagounga_cms` | koneksi Postgres |
| `PAYLOAD_SECRET` | random 32+ char | sign cookie/JWT — **wajib**, fail-fast |
| `NEXT_PUBLIC_CMS_URL` | `http://localhost:3000` | base URL dipakai frontend |
| `CORS_ORIGIN` | `http://localhost:3000,http://localhost:5173` | origin frontend + admin (koma bila >1) |
| `S3_BUCKET` + `S3_*` | — | media persisten R2/S3; kosong = disk lokal |
| `RESEND_API_KEY` + `RESEND_*` | — | email transaksional; kosong = console |
| `KGA_FRONTEND_DIR` | `../new-kagounga` | sumber data seed lintas-repo (D-033) |

## Peringatan DB prod
`.env` lokal bisa menunjuk **DB prod** lewat pooler Supabase — cek sebelum dev/seed.
Override `DATABASE_URL` ke Postgres lokal untuk pekerjaan dev. Migration/seed prod
hanya dengan backup + niat. Seed prod wajib `NODE_ENV=production`; tanpa itu
Payload dev-push ke prod.

## API smoke
- `GET http://localhost:3000/api/media?limit=1` → publik, expect `{docs,totalDocs,...}`.
- `GET http://localhost:3000/api/products?where[status][equals]=published&depth=1&locale=all` → 8 produk.
- `GET http://localhost:3000/api/graphql` → 404 (D-030).
- Admin: `http://localhost:3000/admin` (`/` redirect ke situ).

## Skrip
- `dev` / `build` / `start` — Next + Payload.
- `generate:types` — regen `src/payload-types.ts` tiap ubah koleksi.
- `generate:importmap` — regen admin import map.
- `seed:products` / `seed:products:id` — seed katalog EN + locale ID (idempoten; sumber ID: `$KGA_FRONTEND_DIR/src/locales/id/catalog.json` atau argumen path).
- `seed:posts` — seed berita dari `$KGA_FRONTEND_DIR/src/data/news.json` (atau argumen path).
- `seed:stockists` — seed 5 kota / 19 titik (idempoten, skip existing).
- `seed:admin` — promote user ke admin.
- `test:int` (vitest, butuh Postgres) / `test:e2e` (playwright, butuh `pnpm dev` + browser) / `test` = keduanya.

## Catatan
- `next.config.ts` pakai `output:'standalone'` kondisional (non-Vercel; sinkron `Dockerfile`).
- `payload.config.ts` baca `CORS_ORIGIN` → `cors` + `csrf`.
- Migrasi: `20261024_000000_baseline` = squash replayable dari DB kosong (D-035); file migrasi lama dipertahankan sebagai sejarah. `src/seed/backfill-units.ts` hanya untuk upgrade DB yang berjalan dari before-baseline (lihat `docs/RUNBOOK-RUNTIME.md` root monorepo).

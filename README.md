# Kagounga CMS — Payload 3 + Postgres

Admin + API untuk konten `new-kagounga` (target M2 Produk, M3 Berita). Status M3: koleksi `users` + `media` + `categories` + `products` + `posts` (localization en/id), konverter Lexical↔markdown, seed produk + berita siap (`bun run seed:products`, `bun run seed:posts`, butuh Postgres).

## Syarat
- Node >= 20.18.1, bun 1.x (repo pakai `bun.lock`; `pnpm` opsional).
- Postgres 16 lokal atau via Docker.

## Setup cepat
1. `cp .env.example .env`, isi `DATABASE_URL` + `PAYLOAD_SECRET`.
   - Lokal tanpa Docker: `postgresql://postgres:postgres@localhost:5432/kagounga_cms`
   - Via compose (hostname service): `postgresql://postgres:postgres@postgres:5432/kagounga_cms`
2. Install + jalan:
   - `bun install && bun run dev` (atau `npm install && npm run dev`)
   - Buka `http://localhost:3000/admin`, buat admin pertama via UI.
3. Via Docker (butuh Docker terinstall):
   - `docker compose up --build` (service `payload` + `postgres`)

## Env
| Key | Contoh | Guna |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/kagounga_cms` | koneksi Postgres |
| `PAYLOAD_SECRET` | random 32+ char | sign cookie/JWT |
| `NEXT_PUBLIC_CMS_URL` | `http://localhost:3000` | base URL dipakai frontend |
| `CORS_ORIGIN` | `http://localhost:5173` | origin frontend (koma bila >1) |

## Peringatan DB prod
`.env` lokal saat ini menunjuk **DB prod** lewat pooler, bukan localhost.
Sebelum `dev`/seed, pastikan target: override `DATABASE_URL` ke Postgres lokal
untuk pekerjaan dev. Migration/seed prod hanya dengan backup + niat.
Seed prod wajib `NODE_ENV=production`; tanpa itu Payload dev-push ke prod.

## API smoke (M1)
- `GET http://localhost:3000/api/media?limit=1` → publik, expect `{docs,totalDocs,...}`.
- `GET http://localhost:3000/api/users` → butuh login (expect 401).
- Admin: `http://localhost:3000/admin`.

## Skrip
- `dev` / `build` / `start` — Next + Payload.
- `generate:types` — regen `src/payload-types.ts` tiap ubah koleksi.
- `generate:importmap` — regen admin import map.
- `seed:products` / `seed:products:id` — backfill page copy produk (jalankan dengan `NODE_ENV=production` untuk prod).
- `test:int` (vitest) / `test:e2e` (playwright, butuh `pnpm dev` + browser).

## Catatan M1
- `next.config.ts` pakai `output:'standalone'` (sinkron `Dockerfile`).
- `payload.config.ts` baca `CORS_ORIGIN` → `cors` + `csrf`.
- Koleksi Produk/Posts menyusul M2–M3 (`docs/INTEGRATION-MAP.md` di root).

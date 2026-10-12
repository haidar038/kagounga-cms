import 'dotenv/config'
import { readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

/** Ambil driver `pg` dari store pnpm tanpa menambah dependency baru. */
function loadPg(): any {
  const rootRequire = createRequire(`${process.cwd()}/package.json`)
  try {
    return rootRequire('pg')
  } catch {
    const dir = readdirSync(`${process.cwd()}/node_modules/.pnpm`).find((d) => d.startsWith('pg@'))
    if (!dir) throw new Error('driver pg tidak ditemukan di node_modules/.pnpm')
    return rootRequire(path.join(process.cwd(), 'node_modules/.pnpm', dir, 'node_modules/pg'))
  }
}

/**
 * Backfill satu kali SEBELUM migrasi enum dropdown (20261012_034025).
 * Tanpa ini `USING col::enum` gagal untuk nilai lama ("/ box", "/ pak",
 * "/ kotak", "/ unit", "Tidak termasuk"). Raw SQL agar jalan saat kolom
 * masih varchar — Payload local API tak bisa boot dalam keadaan ini.
 * Idempoten, aman diulang. Jalan: `pnpm run backfill:units`.
 */
async function main(): Promise<void> {
  const { Client } = loadPg()
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  try {
    // Kolom baru (023059) mungkin belum ada bila migrasi itu belum jalan —
    // lewati saja, migrasi + backfill ulang nanti menangani sisanya.
    const cols = await client.query(
      `SELECT column_name, udt_name FROM information_schema.columns
       WHERE table_name = 'products_locales'`,
    )
    const have = new Set(cols.rows.map((r: { column_name: string }) => r.column_name))
    const udtOf = (col: string): string | null => {
      const row = cols.rows.find((r: { column_name: string }) => r.column_name === col) as
        | { udt_name: string }
        | undefined
      const udt = row?.udt_name ?? ''
      return udt.startsWith('enum_products_') ? `"public"."${udt}"` : null
    }
    const counts: Record<string, number | string> = {}
    // Cast ::text agar jalan baik saat kolom masih varchar (pre-migrasi)
    // maupun sudah enum (post-migrasi). Assign text -> enum valid otomatis.
    const stripWord = (col: string) =>
      `CASE TRIM(BOTH FROM regexp_replace((${col})::text, '^\\s*/\\s*', '')) WHEN 'kotak' THEN 'box' WHEN 'pak' THEN 'pack' ELSE TRIM(BOTH FROM regexp_replace((${col})::text, '^\\s*/\\s*', '')) END`
    for (const col of ['per', 'moq_unit', 'wholesale_per']) {
      if (!have.has(col)) {
        counts[col] = 'kolom belum ada, dilewati'
        continue
      }
      // Post-migrasi kolom bertipe enum: hasil text perlu cast eksplisit.
      const cast = udtOf(col) ? `::${udtOf(col)}` : ''
      const r = await client.query(
        `UPDATE products_locales SET ${col} = (${stripWord(col)})${cast} WHERE ${col} IS NOT NULL`,
      )
      counts[col] = r.rowCount ?? 0
    }
    if (!have.has('shipping')) {
      counts.shipping = 'kolom belum ada, dilewati'
    } else {
      const cast = udtOf('shipping') ? `::${udtOf('shipping')}` : ''
      const r = await client.query(
        `UPDATE products_locales SET shipping = ('Excluded')${cast} WHERE (shipping)::text = 'Tidak termasuk'`,
      )
      counts.shipping = r.rowCount ?? 0
    }
    console.log(counts)
    const checks: Record<string, string[]> = {
      per: ['box', 'pack', 'pouch', 'unit'],
      moq_unit: ['box', 'boxes', 'pack', 'packs', 'pouch', 'pouches', 'unit', 'units'],
      wholesale_per: ['box', 'boxes', 'pack', 'packs', 'pouch', 'pouches', 'unit', 'units'],
      shipping: ['Excluded', 'Included'],
    }
    let leftover = 0
    for (const [col, opts] of Object.entries(checks)) {
      if (!have.has(col)) continue
      const bad = await client.query(
        `SELECT id, ${col} FROM products_locales WHERE ${col} IS NOT NULL AND ${col} NOT IN (${opts.map((o) => `'${o}'`).join(',')})`,
      )
      for (const row of bad.rows) console.warn('tak dikenal, edit manual:', JSON.stringify(row))
      leftover += bad.rowCount ?? 0
    }
    console.log(`selesai, ${leftover} baris perlu edit manual`)
  } finally {
    await client.end()
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
